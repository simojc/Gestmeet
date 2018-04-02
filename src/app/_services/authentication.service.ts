import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Http,  RequestOptions , Headers} from '@angular/http'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from '../_models/user';
import { tokenNotExpired } from 'angular2-jwt';

 
//import { appConfig } from '../app.config';
 
@Injectable()
export class AuthenticationService {

    public currentUser: User
    constructor(private http: HttpClient, private http_sr: Http) { }

    private endpointUrl ="http://localhost/~simojc/phpapi/public/api/"
 
    login(email: string, password: string) {
        return this.http.post<any>(this.endpointUrl + 'login', { email: email, password: password })
            .map(res => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    console.log("Dans le service JSON.stringify(user) :" + JSON.stringify(res.token))
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(res.user));
                    localStorage.setItem('token', JSON.stringify(res.token));
                    this.currentUser = res.user;
                   // console.log("Dans le service currentUser email :" + JSON.stringify(this.currentUser.email))                  
                }
 
                return res;
            });
    }

   
    public getToken(): string {
        return localStorage.getItem('token');
      }
    
      public isAuthenticated(): boolean {
        // get the token
        const token = this.getToken();
        // return a boolean reflecting 
        // whether or not the token is expired
        return tokenNotExpired();
        //var bool = jwtHelper.isTokenExpired(token);
        //return tokenNotExpired(null, token);
      }

isAuthenticated_old() {
    return !!this.currentUser
    ///  retourne True si current User est rensigné (c-d-d si la propriété n'est pas vide)
  }
  
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}