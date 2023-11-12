import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // This snapshot approach is non-reactive, only runs/updated once the component is initilaized so when changing queryParams/fragment whilst on the component this would change the URL but the component won't be rerendered (reinitialized)
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    // we can use this observable approach to reactive retrieval of queryParams and fragment
    this.route.queryParams.subscribe((queryParam: object)=>{console.log(queryParam['allowEdit'])});
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }
}
