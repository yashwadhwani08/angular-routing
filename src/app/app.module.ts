import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [ServersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
