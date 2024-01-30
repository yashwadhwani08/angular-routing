import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // This snapshot approach is non-reactive, only runs/updated once the component is initilaized so when changing queryParams/fragment whilst on the component this would change the URL but the component won't be rerendered (reinitialized)
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    console.log(this.route.snapshot.params['id']);

    // we can use this observable approach to reactive retrieval of queryParams and fragment
    this.route.queryParams.subscribe((queryParam: Params) => {
      console.log(queryParam['allowEdit']);
      this.allowEdit = queryParam['allowEdit'] === '1' ? true : false;
    });
    this.route.fragment.subscribe((fragment: string) => {
      console.log(fragment);
    });
    // this.server = this.serversService.getServer(1);
    this.server = this.serversService.getServer(
      +this.route.snapshot.params['id']
    );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.params.subscribe((params: Params) => {
      console.log('Params subscribe called in edit server!');
      this.server = this.serversService.getServer(+params['id']);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });

    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean>{
    // Here you provide the actual logic deciding whether you are alowed to leave or not. This logic will be run whenever the canDeactivateGuard is checked by the @angular/router
    if(!this.allowEdit){
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved){
      return confirm('Do you want to discard the changes?');
    }else{
      return true;
    }
  };
}
