import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';

@Component({
    selector: 'app-user',
    // template: '<h2>John Doe</h2>'
    templateUrl: './user.component.html'
})

export class UserComponent {

    user: User;

    constructor() {

    }

    ngOnInit(){
        this.user = {
            firstName: 'John',
            lastName: 'Smith',
            age: 30,
            address: {
                street: '50 Main St',
                city: 'Boston',
                state: 'MA'
            },
            image: ''
        }
    }
}