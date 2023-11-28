// Angular feature to run some code before a route is loaded, is called 'guards'. It guards certain actions like navigating to a route or away from it.
// We implement this feature as a service.

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

// AuthGuard needs to implement canActivate, which forces to have canActiavte method, which takes two arguements, route and state of the router

// using injectable to be able to inject the auth-service into this AuthGuard.
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}

    // Angular  should execute this code before a route is loaded, so Angular will give us the data of the arguements passed here. We simply need to be able to handle the data.

    // canActivate returns an Observable, which wraps a boolean so in the end it will resolve to a true or false value. Alternatively, this route returns a promise also returning a boolean in the end or it returns just a boolean

    // Hence, canActivate can run both asynchronously (returning an observable or a promise; some code which might take a couple of seconds to finish, because we use a timeout in there or reach out to a server; hence asynchronously) or synchronously (returning a boolean; we might have some guards which execute some code which runs completely on the client; hence synchronously)

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

    // Here, we wish to check if the user is loggedIn or not. So on the isAuthenticated, method we want to handle tat promise using 'then()'

    // isAuthenticated() is a promise in the end hence returning a Promise, becuase if you return something inside of the promise, it will give us back another promise, hence we are returning a promise which gives us back true or simply navigates us away, cancelling the old navigation.

    // this is how we are able to control access to whatever is controlled by the canActivate guard here. To use this guard, in the app-routing.module define, which route(s) should be protected by this guard. 

    return this.authService.isAuthenticated().then(
        (authenticated: boolean) => {
            if(authenticated){
                return true;
            } else{
                // navigate away; since we don't want to allow the user to access to the route he wanted to go to originally

                this.router.navigate(['/']);
            }
        }
    )

  };
}
