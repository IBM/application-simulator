import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DeviceComponent } from './components/device/device.component';
import { DevicesComponent } from './components/devices/devices.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';
import { RequestAccessComponent } from './components/request-access/request-access.component';
import { SalesOrderComponent } from './components/sales-order/sales-order.component';
import { SalesOrdersComponent } from './components/sales-orders/sales-orders.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component';
import { ServiceRequestsComponent } from './components/service-requests/service-requests.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component'
import { AccessRequestsComponent } from './components/access-requests/access-requests.component';
import { AdminDatasetsComponent } from './components/admin-datasets/admin-datasets.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'servicerequests', component: ServiceRequestsComponent },
  { path: 'servicerequests/:id', component: ServiceRequestComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/:id', component: CustomerComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'devices/:id', component: DeviceComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'purchaseorders', component: PurchaseOrdersComponent },
  { path: 'purchaseorders/:id', component: PurchaseOrderComponent },
  { path: 'salesorders', component: SalesOrdersComponent },
  { path: 'salesorders/:id', component: SalesOrderComponent },
  { path: 'requestaccess', component: RequestAccessComponent },
  { path: 'admin-home',component: AdminHomeComponent},
  { path: 'access-requests',component: AccessRequestsComponent},
  { path: 'get-datasets',component: AdminDatasetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
