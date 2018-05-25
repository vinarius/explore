import { Component, OnInit } from '@angular/core';

import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  showExtended: boolean = true;
  loaded: boolean = false;
  enableAdd: boolean = true;
  showUserForm: boolean = false;

  constructor() { }

  ngOnInit() {

    setTimeout(()=>{
      this.users = [
        {
          firstName: 'John',
          lastName: 'Doe',
          age: 24,
          address: {
              street: '50 Main St',
              city: 'Boston',
              state: 'MA'
          },
          image: "https://picsum.photos/200/?random?image=0",
          isActive: true,
          registered: new Date('01/02/2018 08:30:00'),
          hide: true
        },
        {
          firstName: 'Karen',
          lastName: 'Williams',
          age: 30,
          address: {
              street: '42 Jackson St',
              city: 'Miami',
              state: 'FL'
          },
          image: "https://picsum.photos/200/?random?image=1",
          isActive: false,
          registered: new Date('03/11/2017 06:20:00'),
          hide: true
        },
        {
          firstName: 'Doug',
          lastName: 'Smith',
          age: 42,
          address: {
              street: '750 Northbrook Ln',
              city: 'Austin',
              state: 'TX'
          },
          image: "https://picsum.photos/200/?random?image=2",
          isActive: true,
          registered: new Date('11/02/2016 05:20:00'),
          hide: true
        }
      ];

      this.loaded = true;
    }, 1500);
    
  } // end of ngOnInit()

  addUser(user: User){
    this.users.push(user);
  }

  toggleHide(user: User){
    user.hide = !user.hide;
  }

  onSubmit(e){
    e.preventDefault();
    console.log('onSubmit() fired');
    console.log(e);
  }

}
