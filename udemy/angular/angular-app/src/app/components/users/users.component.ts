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
          image: "https://picsum.photos/600/?random?image=0"
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
          image: "https://picsum.photos/600/?random?image=1"
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
          image: "https://picsum.photos/600/?random?image=2"
        }
      ];

      this.loaded = true;
    }, 2000);
    

    this.showExtended = true;
    
  }

}
