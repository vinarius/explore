import { Component, OnInit } from '@angular/core';

import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  user: User = {
    firstName: '',
    lastName: '',
    email: ''
  };
  showExtended: boolean = true;
  loaded: boolean = false;
  enableAdd: boolean = false;
  showUserForm: boolean = false;

  constructor() { }

  ngOnInit() {

    setTimeout(()=>{
      this.users = [
        {
          firstName: 'John',
          lastName: 'Doe',
          age: 24,
          email: '',
          isActive: true,
          registered: new Date('01/02/2018 08:30:00'),
          hide: true
        },
        {
          firstName: 'Karen',
          lastName: 'Williams',
          age: 30,
          email: '',
          isActive: false,
          registered: new Date('03/11/2017 06:20:00'),
          hide: true
        },
        {
          firstName: 'Doug',
          lastName: 'Smith',
          age: 42,
          email: '',
          isActive: true,
          registered: new Date('11/02/2016 05:20:00'),
          hide: true
        }
      ];

      this.loaded = true;
    }, 1500);
    
  } // end of ngOnInit()

  addUser(){
    this.user.isActive = true;
    this.user.registered = new Date();
    this.users.unshift(this.user);
  }

  toggleHide(user: User){
    user.hide = !user.hide;
  }

  onSubmit(e){
    console.log('onSubmit() fired');
    console.log(e);
    this.addUser();
  }

}
