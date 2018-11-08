import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-button',
  templateUrl: './ng-button.component.html',
  styleUrls: ['./ng-button.component.css']
})
export class NgButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  handleClick(e){
    console.log('handle click fired');
  }

}
