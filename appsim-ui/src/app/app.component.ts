import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonLocalStorageService } from 'src/app/services/common-local-storage.service';
import { NavItemsService } from './services/nav-items.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Application Simulator';
  
  public hideHeaderAndSideMenu: boolean = true;

  public selectedRoute = "/";

  public isCollapsed: boolean = false;

  loggedInUser: any;

  constructor(private router: Router,private navItems:NavItemsService,private commonLSSvc: CommonLocalStorageService) {}

  ngOnInit(): void {
    this.router.events.subscribe({next: (e) => {
      if(e instanceof NavigationEnd) {
        if(e.url === "/login" || e.url === "/requestaccess") {
          this.hideHeaderAndSideMenu = true;
        } else {
          this.hideHeaderAndSideMenu = false;
          this.selectedRoute = e.url;
        }
      }
    }});
  }
  public getItems(){
    this.navItems.setNavItems(this.isAdmin());
    return this.navItems.getNavItems();
  }
  public isAdmin(){
    this.loggedInUser = this.commonLSSvc.getUser();
    if(this.loggedInUser.username === "admin_asuser")
    {
      return true;
    }
    else return false;
  }
  public toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
