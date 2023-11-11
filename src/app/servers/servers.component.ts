import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  onReload() {
    // this.router.navigate(['/servers'])

    // Understanding how we can work with relative paths in the navigate method by defining relative to what this path should be loaded, default is root URL
    
    // We get an error now:
    // ERROR Error: Uncaught (in promise): Error: NG04002: Cannot match any routes. URL Segment: 'servers/servers', since it is looking for the path localhost:4200/servers/servers (which doesn't exist)

    this.router.navigate(['servers'],{relativeTo: this.activatedRoute});
  }
  public servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }
}
