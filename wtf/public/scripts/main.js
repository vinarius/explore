$(document).ready(function () {

    window.addEventListener("resize", () => {
        if (window.innerWidth < 500) {
            $(".mobileExpandedParagraphContent").addClass("d-none");
            $("#expandParagraphSpan").text('wheels turning...').addClass("mobileExpandTrigger purpleText");
            $("#linksDiv > div").addClass("margin15");
            $(".mobileBr").removeClass('d-none');
        } else {
            $(".mobileExpandedParagraphContent").removeClass("d-none");
            $("#expandParagraphSpan").text('wheels turning').removeClass("mobileExpandTrigger purpleText");
            $("#linksDiv > div").removeClass("margin15");
            $(".mobileBr").addClass('d-none');
        }
    });

    if (window.innerWidth < 500) {
        $(".mobileExpandedParagraphContent").addClass("d-none");
        $("#expandParagraphSpan").text('wheels turning...').addClass("mobileExpandTrigger purpleText");
        $("#linksDiv > div").addClass("margin15");
        $(".mobileBr").removeClass('d-none');
        $("nav").removeClass("navBarShowing").addClass("navBarCollapsed");
        $("#navMainLinks > div.navBarULShowing").removeClass("navBarULShowing").addClass("d-none");
        $("#navBarCollapsedIcons").removeClass("d-none").addClass("d-flex flex-column justify-content-around align-items-center");
        $("main").removeClass("mainNavShowing").addClass("mainNavCollapsed");
        $("#navIconsDiv > a > div").addClass("d-none");
        $("#collapseParagraphSpan").click(function () {
            if ($("#collapseParagraphSpan").hasClass("purpleText")) {
                $("#collapseParagraphSpan").removeClass("purpleText");
                $(".mobileExpandedParagraphContent").addClass("d-none");
                $("#expandParagraphSpan").text("wheels turning...").addClass("mobileExpandTrigger purpleText");
            }
        });
    }

    $(".mobileExpandTrigger").click(function () {
        $("#expandParagraphSpan").text("wheels turning").removeClass("purpleText");
        $(".mobileExpandedParagraphContent").removeClass("d-none");
        $("#collapseParagraphSpan").addClass("purpleText");
    });

    //fade in carousel at start
    setTimeout(function () {
        $(".heightTemp").removeClass("heightTemp").addClass("d-none");
        $(".heightTemp2").removeClass("heightTemp2").addClass("d-none");
        $("#carouselDiv:hidden:first").fadeIn(1000).addClass("d-flex");
        $("#linksDiv:hidden:first").fadeIn(1000).addClass("d-flex");
    }, 1500);

    // Leave A Message Fixed Right Bottom Side
    $("#leaveAMessageTitleID").click(function () {
        if ($("#leaveAMessage").hasClass("leaveAMessageCollapsed")) {
            $("#leaveAMessage").removeClass("leaveAMessageCollapsed");
            $("#leaveAMessage").addClass("leaveAMessageExpanded");
            $("#leaveAMessageTitleID").removeClass("leaveAMessageCollapsedTitle");
            $("#leaveAMessageTitleID").addClass("leaveAMessageExpandedTitle");
            $("#leaveAMessageExpandedContent").removeClass("d-none");
            $("#leaveAMessageExpandedContent").addClass("d-flex flex-column align-items-center justify-content-around setHeightTo100");
        } else {
            $("#leaveAMessage").removeClass("leaveAMessageExpanded");
            $("#leaveAMessage").addClass("leaveAMessageCollapsed");
            $("#leaveAMessageTitleID").removeClass("leaveAMessageExpandedTitle");
            $("#leaveAMessageTitleID").addClass("leaveAMessageCollapsedTitle");
            $("#leaveAMessageExpandedContent").addClass("d-none");
            $("#leaveAMessageExpandedContent").removeClass("d-flex flex-column align-items-center justify-content-around setHeightTo100");
        }
    });

    // Navigation Bar Fixed Left Side
    $("#navBarIcon").click(function () {
        if (window.innerWidth > 500) {
            if ($("#navBar").hasClass("navBarShowing")) {
                $("#navBar").removeClass("navBarShowing");
                $("#navBar").addClass("navBarCollapsed");
                $("#navMainLinks > div.navBarULShowing").removeClass("navBarULShowing").addClass("d-none");
                $("#navIconsDiv > a > div").removeClass("navBarConnectLinkShowing").addClass("d-none");
                $("#navBarCollapsedIcons").removeClass("d-none").addClass("d-flex flex-column justify-content-around align-items-center");
                $("main").removeClass("mainNavShowing").addClass("mainNavCollapsed");
            } else {
                $("#navBar").removeClass("navBarCollapsed");
                $("#navBar").addClass("navBarShowing");
                $("#navMainLinks > div.d-none").removeClass("d-none").addClass("navBarULShowing");
                $("#navConnectP").removeClass("d-none");
                $("#navIconsDiv > a > div").removeClass("d-none").addClass("navBarConnectLinkShowing");
                $("#navBarCollapsedIcons").removeClass("d-flex flex-column justify-content-around align-items-center").addClass("d-none");
                $("main").removeClass("mainNavCollapsed").addClass("mainNavShowing");
            }
        } else {
            if ($("#navBar").hasClass("navBarShowing")) {
                $("#navBar").removeClass("navBarShowing");
                $("#navBar").addClass("navBarCollapsed");
                $("#navMainLinks > div.navBarULShowing").removeClass("navBarULShowing").addClass("d-none");
                $("#navIconsDiv > a > div").removeClass("navBarConnectLinkShowing").addClass("d-none");
                $("#navBarCollapsedIcons").removeClass("d-none").addClass("d-flex flex-column justify-content-around align-items-center");
            } else {
                $("#navBar").removeClass("navBarCollapsed");
                $("#navBar").addClass("navBarShowing");
                $("#navMainLinks > div.d-none").removeClass("d-none").addClass("navBarULShowing");
                $("#navConnectP").removeClass("d-none");
                $("#navIconsDiv > a > div").removeClass("d-none").addClass("navBarConnectLinkShowing");
                $("#navBarCollapsedIcons").removeClass("d-flex flex-column justify-content-around align-items-center").addClass("d-none");
            }
        }
    });

    //Click Connect With Us Icon to Open Leave A Message Tab
    $("#navBarCollapsedIcons > a > i.fa-commenting-o").click(() => {
        if ($("#leaveAMessage").hasClass("leaveAMessageCollapsed")) {
            $("#leaveAMessage").removeClass("leaveAMessageCollapsed");
            $("#leaveAMessage").addClass("leaveAMessageExpanded");
            $("#leaveAMessageTitleID").removeClass("leaveAMessageCollapsedTitle");
            $("#leaveAMessageTitleID").addClass("leaveAMessageExpandedTitle");
            $("#leaveAMessageExpandedContent").removeClass("d-none");
            $("#leaveAMessageExpandedContent").addClass("d-flex flex-column align-items-center justify-content-around setHeightTo100");
        }
    });

    //Click Connect With Us Link to Open Leave A Message Tab
    $("#navConnectWithUs").click(() => {
        if ($("#leaveAMessage").hasClass("leaveAMessageCollapsed")) {
            $("#leaveAMessage").removeClass("leaveAMessageCollapsed");
            $("#leaveAMessage").addClass("leaveAMessageExpanded");
            $("#leaveAMessageTitleID").removeClass("leaveAMessageCollapsedTitle");
            $("#leaveAMessageTitleID").addClass("leaveAMessageExpandedTitle");
            $("#leaveAMessageExpandedContent").removeClass("d-none");
            $("#leaveAMessageExpandedContent").addClass("d-flex flex-column align-items-center justify-content-around setHeightTo100");
        }
    });

    //Form handler ajax call
    $("#leaveAMessageSubmit").click((evt) => {
        var testForm = document.getElementById('messageForm');
        //prevent form submission
        evt.preventDefault();
        evt.stopPropagation();
        $.ajax({
            url: '/',
            type: 'POST',
            data: {
                userMessageName: testForm.userMessageName.value,
                userMessageEmail: testForm.userMessageEmail.value,
                userMessageComment: testForm.userMessageComment.value
            },
            success: () => {
                $("#messageForm > input").fadeOut();
                $("#messageForm > textarea").fadeOut();
                $("#messageForm > div").fadeOut();
                setTimeout(function () {
                    $("#successMessage").addClass('d-flex').removeClass('d-none');
                }, 1000);
            }
        });
    });

    //set footer to bottom of page if not enough content
    {
        function footerAutoHeight() {
            $("main").css('min-height', 0);
            $("main").css('min-height', (
                $(document).height() -
                $('footer').height()
            ));
        }
        //on page load
        footerAutoHeight();
        //on resize bind of function
        window.addEventListener('resize', () => {
            footerAutoHeight();
        });
    }

}); //end of doc ready