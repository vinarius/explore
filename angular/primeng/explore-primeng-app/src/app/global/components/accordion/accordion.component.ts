import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  index: number = 0;

  openNext(){
    this.index = (this.index === 2) ? 0 : this.index + 1;
  }

  openPrev(){
    this.index = (this.index === 0) ? 2 : this.index - 1;
  }

}
