import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
import { AuthenticationService} from '../_services/index';
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private auth: AuthenticationService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //// console.log("this.auth.isAuthenticated() =  "+this.auth.isAuthenticated());
    //console.log("localStorage.getItem('currentUser') =  "+localStorage.getItem('currentUser'));
        if (localStorage.getItem('currentUser') && this.auth.isAuthenticated() ) {
            // logged in so return true
    //console.log("Dans True");
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}