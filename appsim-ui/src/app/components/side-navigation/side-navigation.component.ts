import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {

  public selectedRoute = "/";

  public isCollapsed: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd) {
        if(event.url.includes('servicerequests')) {
          this.selectedRoute = "/servicerequests"
        } else {
          this.selectedRoute = event.url;
        }
      }
    });
  }

  public toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
