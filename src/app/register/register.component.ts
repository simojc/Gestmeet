import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { AlertService, UserService } from '../_services/index';
 
@Component({
    moduleId: module.id,
    styles: [`
    em {float:right; color: #E05C65; padding-left: 10px;}
        .error input {background-color: #E05C65;}
        .error :: -webkik-input-placeholder {color: #999;} 
        .error :: -moz-placeholder {color: #999;} 
        .error : -moz-placeholder {color: #999;} 
        .error : ms-input-placeholder {color: #999;} 			
    `],
    templateUrl: 'register.component.html'
})
 
export class RegisterComponent {
    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }
 
    register() {
    console.log("this.model.name:  " + this.model.name)
    console.log("this.model.email:  " + this.model.email)
    console.log("this.model.password:  " + this.model.password)
    console.log("this.model.groupe_id:  " + this.model.groupe_id)
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.loading = false;
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}