import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AlertService, AuthenticationService } from '../_services/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
styles: [`
em {float:right; color: #E05C65; padding-left: 10px;}
    .error input {background-color: #E05C65;}
    .error :: -webkik-input-placeholder {color: #999;} 
    .error :: -moz-placeholder {color: #999;} 
    .error : -moz-placeholder {color: #999;} 
    .error : ms-input-placeholder {color: #999;} 			
`],
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthenticationService,
        private alertService: AlertService) { }
 
    ngOnInit() {
        // reset login status
        this.auth.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
    login() {
        this.loading = true;
        this.auth.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    //console.log("debut login component  ..... "+" this.returnUrl= "+this.returnUrl)
                    
                    this.router.navigate([this.returnUrl]);
                    this.alertService.success(' login successful', true);
                    this.loading = false;
                   // console.log("Fin login component .....")
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}