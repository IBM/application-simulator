import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseMultipleRecordsResp } from '../models/base-multiple-records-resp';
import { BaseSingleRecordResp } from '../models/base-single-record-resp';
import { CustomerBaseResp } from '../models/customer-base-resp';
import { CustomerResp } from '../models/customer-resp';
import { DeviceBaseResp } from '../models/device-base-resp';
import { DeviceResp } from '../models/device-resp';
import { LoggedInUser } from '../models/loggedin-user-resp';
import { LoginReq } from '../models/login-req';
import { ProductBaseResp } from '../models/product-base-resp';
import { ProductResp } from '../models/product-resp';
import { PurchaseOrderBaseResp } from '../models/purchase-order-base-resp';
import { PurchaseOrderResp } from '../models/purchase-order-resp';
import { SalesOrderBaseResp } from '../models/sales-order-base-resp';
import { SalesOrderResp } from '../models/sales-order-resp';
import { ServiceRequestBaseResp } from '../models/service-request-base-resp';
import { ServiceRequestResp } from '../models/service-request-resp';
import { BaseReq } from '../models/base-req';
import { RequestAccessReq } from '../models/request-access-req';
import { BaseReqResp } from '../models/base-req-resp';
import { RequestAccessReqResp } from '../models/request-access-req-resp';
import { LoginReqResp } from '../models/login-req-resp';
import { AccessRequestResp } from '../models/access-request-resp';
import { AccessRequestRejectReqResp } from '../models/access-request-reject-req-resp';
import { AccessRequestApproveReqResp } from '../models/access-request-approve-req-resp';
import { AccessRequestReq } from '../models/access-request-req';
import { GetDatasetsResp } from '../models/datasets-resp';
import { ResetDatasetRsp } from '../models/reset-dataset-resp';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  private LOGIN_URL: string = '/appsim/login';
  private LOGOUT_URL = '/appsim/logout';
  private SERVICE_REQUESTS_URL = "/appsim/servicerequests";
  private CUSTOMERS_URL = "/appsim/customers";
  private REQUESTACCESS_URL = "/appsim/accessrequests";
  private DEVICES_URL = "/appsim/devices";
  private PURCHASE_ORDERS_URL = "/appsim/purchaseorders";
  private SALES_ORDERS_URL = "/appsim/salesorders";
  private PRODUCTS_URL = "/appsim/products";
  private LOGGEDIN_USER = "/appsim/login/user";
  private DOWNLOAD_DATASET="/appsim/datasets/export";
  private UPLOAD_DATASET="/appsim/datasets/import";
  private ACCESS_REQUESTS='/appsim/accessrequests';
  private GET_DATASETS='/appsim/datasets';
  private RESET_DATASET='/appsim/datasets/reset';

  private httpOptions = {
    headers: new HttpHeaders({
      "X-wM-AdminUI": "true"
    }),
  };

  constructor(private http: HttpClient, private router: Router) { }

  public resetDataset():Observable<BaseReqResp<ResetDatasetRsp>>{
    return this.http.get<BaseReqResp<ResetDatasetRsp>>(this.RESET_DATASET,this.httpOptions);
  }

  public getDatasets(): Observable<BaseMultipleRecordsResp<GetDatasetsResp>>{
    return this.http.get<BaseMultipleRecordsResp<GetDatasetsResp>>(this.GET_DATASETS, this.httpOptions);
  }

  public deleteDataset(dataset: String): any {
    return this.http.delete<any>(this.GET_DATASETS + "/" + dataset, this.httpOptions);
  }

  public requestAcess(reqBody: BaseReq<RequestAccessReq>): Observable<BaseReqResp<RequestAccessReqResp>> {
    return this.http.post<BaseReqResp<RequestAccessReqResp>>(this.REQUESTACCESS_URL, reqBody);
  }

  public loginUser(reqBody: LoginReq): Observable<LoginReqResp> {
    return this.http.post<LoginReqResp>(this.LOGIN_URL, reqBody);
  }

  public logoutUser(): Observable<string> {
    return this.http.post<string>(this.LOGOUT_URL, "{}");
  }

  public getLoggedInUser(): Observable<BaseSingleRecordResp<LoggedInUser>> {
    return this.http.get<BaseSingleRecordResp<LoggedInUser>>(this.LOGGEDIN_USER, this.httpOptions);
  }

  public getServiceRequests(pageSize: number, pageNumber: number): Observable<BaseMultipleRecordsResp<ServiceRequestBaseResp>> {
    let offset = 1;
    if(pageNumber > 1) {
      offset = (pageNumber * pageSize) - 9;
    }
    let requestUrl: string = this.SERVICE_REQUESTS_URL + "?limit=" + pageSize + "&offset=" + offset;
    return this.http.get<BaseMultipleRecordsResp<ServiceRequestBaseResp>>(requestUrl, this.httpOptions);
  }

  public getServiceRequestById(id: string): Observable<BaseSingleRecordResp<ServiceRequestResp>> {
    return this.http.get<BaseSingleRecordResp<ServiceRequestResp>>(this.SERVICE_REQUESTS_URL + "/" + id, this.httpOptions);
  }

  public getCustomers(pageSize: number, pageNumber: number): Observable<BaseMultipleRecordsResp<CustomerBaseResp>> {
    let offset = 1;
    if(pageNumber > 1) {
      offset = (pageNumber * pageSize) - 9;
    }
    let requestUrl: string = this.CUSTOMERS_URL + "?limit=" + pageSize + "&offset=" + offset;
    return this.http.get<BaseMultipleRecordsResp<CustomerBaseResp>>(requestUrl, this.httpOptions);
  }

  public getCustomerById(id: string): Observable<BaseSingleRecordResp<CustomerResp>> {
    return this.http.get<BaseSingleRecordResp<CustomerResp>>(this.CUSTOMERS_URL + "/" + id, this.httpOptions);
  }

  public getDevices(pageSize: number, pageNumber: number): Observable<BaseMultipleRecordsResp<DeviceBaseResp>> {
    let offset = 1;
    if(pageNumber > 1) {
      offset = (pageNumber * pageSize) - 9;
    }
    let requestUrl: string = this.DEVICES_URL + "?limit=" + pageSize + "&offset=" + offset;
    return this.http.get<BaseMultipleRecordsResp<DeviceBaseResp>>(requestUrl, this.httpOptions);
  }

  public getDeviceById(id: string): Observable<BaseSingleRecordResp<DeviceResp>> {
    return this.http.get<BaseSingleRecordResp<DeviceResp>>(this.DEVICES_URL + "/" + id, this.httpOptions);
  }

  public getProducts(pageSize: number, pageNumber: number): Observable<BaseMultipleRecordsResp<ProductBaseResp>> {
    let offset = 1;
    if(pageNumber > 1) {
      offset = (pageNumber * pageSize) - 9;
    }
    let requestUrl: string = this.PRODUCTS_URL + "?limit=" + pageSize + "&offset=" + offset;
    return this.http.get<BaseMultipleRecordsResp<ProductBaseResp>>(requestUrl, this.httpOptions);
  }

  public getProductById(id: string): Observable<BaseSingleRecordResp<ProductResp>> {
    return this.http.get<BaseSingleRecordResp<ProductResp>>(this.PRODUCTS_URL + "/" + id, this.httpOptions);
  }

  public getPurchaseOrders(pageSize: number, pageNumber: number): Observable<BaseMultipleRecordsResp<PurchaseOrderBaseResp>> {
    let offset = 1;
    if(pageNumber > 1) {
      offset = (pageNumber * pageSize) - 9;
    }
    let requestUrl: string = this.PURCHASE_ORDERS_URL + "?limit=" + pageSize + "&offset=" + offset;
    return this.http.get<BaseMultipleRecordsResp<PurchaseOrderBaseResp>>(requestUrl, this.httpOptions);
  }

  public getPurchaseOrderById(id: string): Observable<BaseSingleRecordResp<PurchaseOrderResp>> {
    return this.http.get<BaseSingleRecordResp<PurchaseOrderResp>>(this.PURCHASE_ORDERS_URL + "/" + id, this.httpOptions);
  }

  public getSalesOrders(pageSize: number, pageNumber: number): Observable<BaseMultipleRecordsResp<SalesOrderBaseResp>> {
    let offset = 1;
    if(pageNumber > 1) {
      offset = (pageNumber * pageSize) - 9;
    }
    let requestUrl: string 
    = this.SALES_ORDERS_URL + "?limit=" + pageSize + "&offset=" + offset;
    return this.http.get<BaseMultipleRecordsResp<SalesOrderBaseResp>>(requestUrl, this.httpOptions);
  }

  public getSalesOrderById(id: string): Observable<BaseSingleRecordResp<SalesOrderResp>> {
    return this.http.get<BaseSingleRecordResp<SalesOrderResp>>(this.SALES_ORDERS_URL + "/" + id, this.httpOptions);
  }

  public downloadDataset(){
    return this.http.get(this.DOWNLOAD_DATASET,
    {
      headers:this.httpOptions.headers,
      observe:'response',
      responseType:'blob'
    });
  }

  public uploadDataset(file: File): Observable<any> {
    return this.http.post<any>(this.UPLOAD_DATASET, file, this.httpOptions);
  }

  public getAccessRequests(): Observable<BaseMultipleRecordsResp<AccessRequestResp>> {
    return this.http.get<BaseMultipleRecordsResp<AccessRequestResp>>(this.ACCESS_REQUESTS, this.httpOptions);
  }

  public approveAccessRequest(id: string, datasetName: string): Observable<BaseReqResp<AccessRequestApproveReqResp>>{
    let requestBody: AccessRequestReq = {
      status: "approved",
      datasetName: datasetName
    };
    return this.http.patch<BaseReqResp<AccessRequestApproveReqResp>>(this.ACCESS_REQUESTS + "/" + id, requestBody, this.httpOptions);
  }

  public rejectAccessRequest(id: string): Observable<BaseReqResp<AccessRequestRejectReqResp>>{
    let requestBody: AccessRequestReq = {
      status: "rejected"
    };
    return this.http.patch<BaseReqResp<AccessRequestRejectReqResp>>(this.ACCESS_REQUESTS + "/" + id, requestBody, this.httpOptions);
  }

}