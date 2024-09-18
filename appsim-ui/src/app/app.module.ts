import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { HomeComponent } from './components/home/home.component';
import { ServiceRequestsComponent } from './components/service-requests/service-requests.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HttpClientModule } from '@angular/common/http';
import { DevicesComponent } from './components/devices/devices.component';
import { DeviceComponent } from './components/device/device.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { SalesOrdersComponent } from './components/sales-orders/sales-orders.component';
import { SalesOrderComponent } from './components/sales-order/sales-order.component';
import { RequestAccessComponent } from './components/request-access/request-access.component';
import { MessageComponent } from './components/message/message.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AccessRequestsComponent } from './components/access-requests/access-requests.component';
import { AdminDatasetsComponent } from './components/admin-datasets/admin-datasets.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SideNavigationComponent,
    HomeComponent,
    ServiceRequestsComponent,
    ServiceRequestComponent,
    CustomersComponent,
    CustomerComponent,
    DevicesComponent,
    DeviceComponent,
    ProductsComponent,
    ProductComponent,
    PurchaseOrdersComponent,
    PurchaseOrderComponent,
    SalesOrdersComponent,
    SalesOrderComponent,
    RequestAccessComponent,
    MessageComponent,
    AdminHomeComponent,
    AccessRequestsComponent,
    AdminDatasetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
