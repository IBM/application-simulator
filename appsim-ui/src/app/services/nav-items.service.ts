import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NavItemsService {

  public adminNavigationItems = [{
    label: 'Home',
    route: '/admin-home',
    iconClass: 'dlt-icon-home'
  },
  {
    label: 'Access Requests',
    route: '/access-requests',
    iconClass: 'dlt-icon-env-permission'
  },
  {
    label: 'Datasets',
    route: '/get-datasets',
    iconClass: 'dlt-icon-database'
  }
];

  public userNavigationItems = [{
      label: 'Home',
      route: '/',
      iconClass: 'dlt-icon-home'
    }, {
      label: 'Customers',
      route: '/customers',
      iconClass: 'dlt-icon-management'
    }, {
      label: 'Devices',
      route: '/devices',
      iconClass: 'dlt-icon-devices'
    }, {
      label: 'Products',
      route: '/products',
      iconClass: 'dlt-icon-product'
    }, {
      label: 'Purchase Orders',
      route: '/purchaseorders',
      iconClass: 'dlt-icon-invoice'
    }, {
      label: 'Sales Orders',
      route: '/salesorders',
      iconClass: 'dlt-icon-price-tag'
    }, {
      label: 'Service Requests',
      route: '/servicerequests',
      iconClass: 'dlt-icon-note'
    }
  ];
  navigationItems:any=[];

  

  constructor() { }
  
  getNavItems(){
    return this.navigationItems;
  }

  setNavItems(isAdmin:boolean){
    if(isAdmin){
      this.navigationItems=this.adminNavigationItems;
    }
    else{
      this.navigationItems=this.userNavigationItems;
    }
  }
}
