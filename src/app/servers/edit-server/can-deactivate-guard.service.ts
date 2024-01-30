// Angular feature to check if a user is allowed to naviagte away from a route

import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// An interface is simply a contract, which can be imported by some other class which forces this class to provide some logic.

// In this case, this interface will require one thing from the component which implements it, this component should have a canDeactivate method.

export interface CanComponentDeactivate {
  // The return is similar to canActivate-guard
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}


// we need our guard service to implememt CanDeactivate from angular/router and it wraps our own interface which forces some component or some class to implememt the CanDeactivate method.

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate>{

    // this canDeactivate method, will be called by the @angular/router once we try to leave a route. This method has the component on which we are currently on as an argument and this component needs to be of type CanComponentDeactivate, which means it need to be a component which has the interface CanComponentDeactivate implemented, hence a component which has a canDeactivate method. We also need to know the current-route and the router-state (similar to canActivate) and also we can have the information of the nextState (optional argument); which route we want to go, this will be called in the end when we want to leave a route.

    canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        // we are calling canDeactivate() method on the component we are currently on
        return component.canDeactivate();
    }
}
