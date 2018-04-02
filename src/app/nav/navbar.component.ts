
import { Component , OnInit} from '@angular/core'

import { AlertService, AuthenticationService } from '../_services/index';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'nav-bar',
	templateUrl: './navbar.component.html',
  styles:[`
		.nav.navbar-navbar {font-size: 15px;}
    #searchForm {margin-right: 100px;}
		@media (max-width: 1200px) {#searchForm {display:none}}
		li > a.active { color: #F97924; }
	`]
})


export class NavBarComponent implements OnInit {
  searchTerm: string = ""
   returnUrl: string;
  //foundSessions: ISession[]

   constructor(private auth: AuthenticationService,
         private route: ActivatedRoute,
     private router: Router,) {

  }

   ngOnInit() {
            // get return url from route parameters or default to '/'
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        }

  // searchSessions(searchTerm) {
  //   this.eventService.searchSessions(searchTerm).subscribe(sessions => {
  //     this.foundSessions = sessions
  //      console.log(this.foundSessions)
  //   })



  logout() {
     this.auth.logout()
      this.router.navigate(['login'])
  }

}
