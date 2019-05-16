#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate web_view;
extern crate open;
extern crate url;
extern crate calamine;
#[macro_use]
extern crate failure;
extern crate strsim;

use failure::Error;
use calamine::{Reader, Ods, Xls, Xlsx, Xlsb};
use url::form_urlencoded;
use std::io::{Read, Seek, Cursor};
use std::path::Path;
use std::ffi::OsStr;

const TITLE: &str = "Link Mailer";
const SIZE: (i32, i32) = (600, 800);
const RESIZABLE: bool = false;
const DEBUG: bool = true;

const INITIAL_TEMPLATE: &str = "Base Template";

macro_rules! css {
    ($path:expr) => ( inline_style(include_str!($path)) );
}

macro_rules! js {
    ($path:expr) => ( inline_script(include_str!($path)) );
}

fn main() {
    let styles = css!("spectre.min.css") +
        &css!("spectre-exp.min.css") +
        &css!("spectre-icons.min.css") +
        &css!("main.css");

    let scripts = js!("main.js");

    let root_html = format!(
        include_str!("main.html"),
        styles = styles,
        scripts = scripts
    );

    let user_data = UserData::new(INITIAL_TEMPLATE);
    let mut links = Vec::new();

    let init_cb = |_webview| {};
    let mut needs_refresh = true;

    web_view::run(
        TITLE,
        web_view::Content::Html(root_html),
        Some(SIZE),
        RESIZABLE,
        DEBUG,
        init_cb,
        |webview, arg, user_data: &mut UserData| {
            use Cmd::*;

            match serde_json::from_str(arg).unwrap() {
                init => {
                    user_data.generate_email_preview(&links);
                },

                log { text } => println!("{}", text),

                updateTemplate { text } => {
                    user_data.set_email_template(&links, text);
                    needs_refresh = true;
                },

                updateInput { text } => {
                    user_data.set_form_input(&links, text);
                    needs_refresh = true;
                },

                mail => {
                    let mut protocol = String::from("mailto://?");
                    let mut serializer = form_urlencoded::Serializer::new(protocol);
                    serializer.append_pair("subject", "Subject");

                    if let Some(ref preview) = user_data.email_preview {
                        serializer.append_pair("body", &preview);
                    }

                    let encoded = serializer.finish();
                    open::that(encoded).expect("Failed to launch mail client");
                },

                loadLinks { path, input } => {
                    if let Some(ext) = get_extension_from_path(&path) {
                        let bytes = Cursor::new(input);
                        links = load_links(ext, bytes).unwrap();
                        user_data.generate_email_preview(&links);
                        needs_refresh = true;
                    }
                }
            };

            if needs_refresh {
                needs_refresh = false;
                render(webview, user_data);
            }
        },
        user_data
    );
}

fn get_extension_from_path(path: &str) -> Option<&str> {
    Path::new(path).extension().and_then(OsStr::to_str)
}

enum Spreadsheet<B: Read + Seek> {
    Xls(Xls<B>),
    Xlsx(Xlsx<B>),
    Xlsb(Xlsb<B>),
    Ods(Ods<B>)
}

impl<B: Read + Seek> Spreadsheet<B> {
    fn new(ext: &str, buffer: B) -> Result<Self, Error> {
        Ok(match ext {
            "xls" | "xla" => Spreadsheet::Xls(Xls::new(buffer)?),
            "xlsx" | "xlsm" | "xlam" => Spreadsheet::Xlsx(Xlsx::new(buffer)?),
            "xlsb" => Spreadsheet::Xlsb(Xlsb::new(buffer)?),
            "ods" => Spreadsheet::Ods(Ods::new(buffer)?),
            _ => return Err(failure::err_msg("Unknown spreadsheet type"))
        })
    }

    fn sheet(&mut self, name: &str) -> Option<Result<calamine::Range<calamine::DataType>, Error>> {
        macro_rules! read_inner {
            ($inner:expr) => {
                $inner.worksheet_range(name).map(|r| r.map_err(|e| e.into()))
            }
        };

        match self {
            &mut Spreadsheet::Xls(ref mut inner) => read_inner!(inner),
            &mut Spreadsheet::Xlsx(ref mut inner) => read_inner!(inner),
            &mut Spreadsheet::Xlsb(ref mut inner) => read_inner!(inner),
            &mut Spreadsheet::Ods(ref mut inner) => read_inner!(inner)
        }
    }
}

fn load_links<R: Read + Seek>(ext: &str, bytes: R) -> Result<Vec<Link>, Error> {
    use calamine::DataType;
    let title = DataType::String(String::from("Title"));
    let url = DataType::String(String::from("Url"));

    let mut spreadsheet = Spreadsheet::new(ext, bytes)?;

    let sheet = spreadsheet
        .sheet("Sheet1")
        .ok_or(SpreadsheetError::MissingSheet)??;

    let mut rows = sheet.rows();
    let first_row = rows.next().ok_or(SpreadsheetError::MissingRow)?;

    let title_index = first_row
        .iter()
        .position(|c| c == &title)
        .ok_or(SpreadsheetError::MissingTitleHeader)?;

    let url_index = first_row
        .iter()
        .position(|c| c == &url)
        .ok_or(SpreadsheetError::MissingUrlHeader)?;

    let mut links = Vec::new();

    for row in rows {
        let mut title: String;
        let mut url: String;

        if let Some(DataType::String(inner)) = row.get(title_index) {
            title = inner.clone();
        } else {
            return Err(SpreadsheetError::MissingTitle.into());
        }

        if let Some(DataType::String(inner)) = row.get(url_index) {
            url = inner.clone();
        } else {
            return Err(SpreadsheetError::MissingUrl.into());
        }

        links.push(Link { title, url });
    }

    Ok(links)
}

#[derive(Debug, Fail)]
enum SpreadsheetError {
    #[fail(display = "Unable to locate Sheet1 in the Spreadsheet")]
    MissingSheet,
    #[fail(display = "Unable to locate the first row of the Spreadsheet")]
    MissingRow,
    #[fail(display = "Unable to locate the Title column of the Spreadsheet")]
    MissingTitleHeader,
    #[fail(display = "Unable to locate the Url column of the Spreadsheet")]
    MissingUrlHeader,
    #[fail(display = "The row did not contain any usable title")]
    MissingTitle,
    #[fail(display = "The row did not contain any usable url")]
    MissingUrl
}

#[derive(Debug, Serialize)]
struct UserData {
    spreadsheet_path: Option<String>,
    email_template: String,
    form_data: String,
    email_preview: Option<String>
}

impl UserData {
    fn new(email_template: &str) -> Self {
        UserData {
            spreadsheet_path: None,
            email_template: String::from(email_template),
            form_data: String::new(),
            email_preview: None
        }
    }

    fn set_email_template(&mut self, links: &Vec<Link>, template: String) {
        self.email_template = template;
        self.generate_email_preview(links);
    }

    fn set_form_input(&mut self, links: &Vec<Link>, input: String) {
        self.form_data = input;
        self.generate_email_preview(links);
    }

    fn generate_email_preview(&mut self, links: &Vec<Link>) {
        let links = self.compute_matching_links(links);

        self.email_preview = Some(format!("{links}\n{message}",
            links = inline_links(&links), message = self.email_template
        ));
    }

    fn compute_matching_links(&self, links: &Vec<Link>) -> Vec<Link> {
        let mut computed_links = Vec::new();

        for line in self.form_data.lines() {
            let link = links.iter().min_by_key(|link| {
                strsim::levenshtein(&line.to_lowercase(), &link.title.to_lowercase())
            });

            if let Some(link) = link {
                computed_links.push(link.clone());
            }
        }

        computed_links
    }
}

#[derive(Clone)]
struct Link {
    title: String,
    url: String
}

#[allow(non_camel_case_types)]
#[derive(Deserialize)]
#[serde(tag = "cmd")]
pub enum Cmd {
    init,
    log { text: String },
    updateTemplate { text: String },
    updateInput { text: String },
    loadLinks { path: String, input: Vec<u8> },
    mail
}

fn inline_links(links: &Vec<Link>) -> String {
    let mut content = String::new();

    for link in links.iter() {
        content.push_str(&inline_link(link));
    }

    content
}

fn inline_link(link: &Link) -> String {
    format!("{}: {}\n", link.title, link.url)
}

fn inline_style(string: &str) -> String {
    format!(r#"<style type="text/css">{}</style>"#, string)
}

fn inline_script(string: &str) -> String {
    format!(r#"<script type="text/javascript">{}</script>"#, string)
}

fn render<'a, T>(webview: &mut web_view::WebView<'a, T>, user_data: &UserData) {
    webview.eval(&format!("rpc.render({})", serde_json::to_string(user_data).unwrap()));
}
