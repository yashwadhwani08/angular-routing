import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'servers',
    component: ServersComponent,
    children: [
      // The remaining path and the component to load on that path has to mentioned within the children array in the parent route. To load the children route, we need another router-outlet, because the one used in app.component.html is responsible fpr top-level routes, not their children. The outlet in this case, would be created/put inside servers-component template.

      // Using parameters in route for dynamic data in route

      { path: ':id/edit', component: EditServerComponent },
      { path: ':id', component: ServerComponent },
    ],
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }],
  },
  { path: 'not-found', component: PageNotFoundComponent },

  // Redirecting route

  //To specify all the URLs/routes which are not covered by your app is by using '**' route. It is called the wildcard route, which means catch all paths  you don't know. Order is important. This wildcard route should be the last one in the array of routes! Routes get parsed from top to bottom here.
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  //   To add app-routing-module back to app.module.ts, we need to use exports array, Exports array tells Angular what should be accessible from this module if this module were to be added to the imports of another module. Here we want, RouterModule to be accessible. We don't add forRoot() because we have already configured it in imports, added our own routes to it. Now, we simply export this configured RouterModule
  exports: [RouterModule],
})
export class AppRoutingModule {}
