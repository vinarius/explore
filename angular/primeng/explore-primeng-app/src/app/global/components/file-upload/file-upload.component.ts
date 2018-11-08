import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  myUploader(e){
    console.log('myUploader successfully fired');
    console.log(e);

    //create a new file reader instance
    let fileReader = new FileReader();
    fileReader.readAsText(e[0]);
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }
  }

}
