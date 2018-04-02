

import { HttpModule } from '@angular/http'
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
 
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
 
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import {  ErrorInterceptorProvider, TokenInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { NavBarComponent  } from './nav/navbar.component';
 
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        NavBarComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
         {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
       },
        ErrorInterceptorProvider
    ],
    bootstrap: [AppComponent]
})
 
export class AppModule { }


// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';


// import { AppComponent } from './app.component';


// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
