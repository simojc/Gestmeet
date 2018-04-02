import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import {Observable} from 'rxjs/Rx';
import {  AuthenticationService } from './authentication.service'

//import { appConfig } from '../app.config';
import { User } from '../_models/user';
 
@Injectable()
export class UserService {
    currentUser: User;
    constructor(private http: HttpClient, private http2:Http, private auth: AuthenticationService) { 
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    private endpointUrl ="http://localhost/~simojc/phpapi/public/api/"
    
    getAll() {
        return this.http.get<User[]>(this.endpointUrl + 'users');
    }

    getUsers(): Observable<User[]> {
        let headers = new Headers();
        headers.append('x-access-token', this.auth.getToken());
       // console.log("this.auth.getToken() = "+this.auth.getToken())
        return this.http2.get(this.endpointUrl + 'users', {headers: headers})
            .map((response: Response) => <User[]>response.json())
           // .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error)
      }

    getById(_id: string) {
        return this.http.get(this.endpointUrl + 'users/' + _id);
    }
 
    create(user: User) {
        return this.http.post(this.endpointUrl + 'signup', user);
    }
 
    update(user: User) {
        return this.http.put(this.endpointUrl + '/users/' + user.id, user);
    }
 
    delete(_id: string) {
        return this.http.delete(this.endpointUrl + '/users/' + _id);
    }
}