import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: { id: number; name: string };

  constructor(private route: ActivatedRoute) {}
  // This route here, is a JS object with a lot of metadata about this currently loaded route.
  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };

    // for fetching route parameters reactively, we can use the route object, instead of 'snapashot', we can use 'params' property itslef on the route

    // Difference between params propertry on snapshot and on the route itself: Params when used on the route is an observable. Observables are a feature added by some other third party package, not by Angular but heavily used by Angular which allow you to easily work with asynchronous tasks. Here, in this case it is an asynchronous task, because the parameteres of your currently loaded route might change at some point in the future if user clicks this link, but we don't know when, when don't know if, we don't know how long it will take, hence we can't block our code and wait for this to happen here, maybe it might never happen. So an observable is an easy way to subscribe to some event which might happen in the future to then execute some code when it happens without having to wait for it now.

    // Params is one such observable, we can observe it and we do so by subscribe() method. subscribe can take free functions you pass here as arguments, the first one is important, it will be fired whenever new data is sent fruited observable, in other words whenever the parameters chnage in this use case, then the first argument (the function) is executed. Params will hold the parameters you define in the route as properties.

    //this code will be executed only when the parameters change post initialization.
    this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }
}
