import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { User }               from '../model/user';
import { UserService }        from '../user.service';

@Component({
    selector: 'my-user-detail',
    templateUrl: 'app/user/detail/user-detail.component.html',
    styleUrls: ['app/user/detail/user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
    @Input() user: User;
    @Output() close = new EventEmitter();
    error: any;
    sub: any;
    navigated = false; // true if navigated here

    constructor(
        private userService: UserService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['email'] !== undefined) {

                this.navigated = true;

                this.userService
                    .getSingle(params['email'])
                    .subscribe((data: User) => this.user = data,
                    error => console.log(error),
                    () => console.log('Get user details completed'));

            } else {
                this.navigated = false;
                this.user = new User();
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private save() {
        console.log("not yet implemented");
    }

    private goBack(savedUser: User = null) {
        this.close.emit(savedUser);
        if (this.navigated) { window.history.back(); }
    }
}