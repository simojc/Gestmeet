
import { Injectable , Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent
} from '@angular/common/http';
import {  AuthenticationService } from '../_services/index';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable()
 export class TokenInterceptor implements HttpInterceptor {
  
//   private endpointUrl ="http://localhost/~simojc/phpapi/public/api/"
//   isRefreshingToken: boolean = false;
//   tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

//   constructor(private router: Router, private injector: Injector) {

//   }

//   addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
//       return req.clone({ setHeaders: { Authorization: `Bearer ${token}`}})
//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

//       return next.handle(this.addToken(req, localStorage.getItem('token')))

//           .catch(error => {

//               if (error instanceof HttpErrorResponse) {

//                   switch ((<HttpErrorResponse>error).status) {
//                       case 400:
//                           return this.handle400Error(error);
//                       case 401:
//                           return this.handle401Error(req, next);
//                   }

//               } else {

//                   return Observable.throw(error);
//               }
//           });
//   }

//   handle401Error(req: HttpRequest<any>, next: HttpHandler) {

//       if (!this.isRefreshingToken) {
//           this.isRefreshingToken = true;

//           // Reset here so that the following requests wait until the token
//           // comes back from the refreshToken call.
//           this.tokenSubject.next(null);
//           let token = localStorage.getItem('token');
//           const http = this.injector.get(HttpClient);

//           return http.post<any>(this.endpointUrl + "token/refresh", {},
//               {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)})
//               .switchMap((data: string) => {

//               if (data["token"]) {
//                       this.tokenSubject.next(data["token"]);
//                       return next.handle(this.addToken(req, data["token"]));
//                   }

//                   // If we don't get a new token, we are in trouble so logout.
//                   return this.logoutUser();
//               })
//               .catch(error => {
//                   // If there is an exception calling 'refreshToken', bad news so logout.
//                   return this.logoutUser();
//               })
//               .finally(() => {
//                   this.isRefreshingToken = false;
//               });

//       } else {

//           return this.tokenSubject
//               .filter(token => token != null)
//               .take(1)
//               .switchMap(token => {
//                   return next.handle(this.addToken(req, token));
//               });
//       }
//   }

//   logoutUser() {
//       // Route to the login page (implementation up to you)
//       localStorage.removeItem('currentUser');
//       localStorage.removeItem('token');

//       this.router.navigate(['/login']);

//       return Observable.throw("Error Logout");
//   }

//   handle400Error(error) {
//       if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
//           // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
//           return this.logoutUser();
//       }

//       return Observable.throw(error);

//     }


  constructor(public auth: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}