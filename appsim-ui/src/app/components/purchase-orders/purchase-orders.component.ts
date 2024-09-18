import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BaseMultipleRecordsResp } from 'src/app/models/base-multiple-records-resp';
import { PurchaseOrderBaseResp } from 'src/app/models/purchase-order-base-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {

  public purchaseOrders: BaseMultipleRecordsResp<PurchaseOrderBaseResp>;

  public pagination = {
    totalRecords: 0,
    numberOfPages: 0,
    pageSize: 10,
    pageNumber: 1,
    startRecordIndex: 1,
    endRecordIndex:10
  };

  constructor(private commonSvc: CommonService, private commonHttpSvc: CommonHttpService) {}

  ngOnInit(): void {
    this.getPurchaseOrders();
  }

  private getPurchaseOrders() {
    this.commonHttpSvc.getPurchaseOrders(this.pagination.pageSize, this.pagination.pageNumber).subscribe({next: (resp: BaseMultipleRecordsResp<PurchaseOrderBaseResp>) => {
      this.purchaseOrders = resp;
      this.calculatePagination();
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

  private calculatePagination() {
    this.pagination.totalRecords = Number(this.purchaseOrders.result.pagination.capacity);
    this.pagination.numberOfPages = Math.ceil(this.pagination.totalRecords / this.pagination.pageSize);
    this.calculateStartAndEndIndex(); 
  }

  public incrementPageNumber(): void {
    this.pagination.pageNumber = this.pagination.pageNumber + 1;
    this.calculateStartAndEndIndex();
    this.getPurchaseOrders();
  }

  public decrementPageNumber(): void {
    this.pagination.pageNumber = this.pagination.pageNumber - 1;
    this.calculateStartAndEndIndex();
    this.getPurchaseOrders();
  }

  public goToPageNumber(): void {
    this.getPurchaseOrders();
  }

  public calculateStartAndEndIndex() {
    this.pagination.endRecordIndex = this.pagination.pageNumber * this.pagination.pageSize;
    this.pagination.startRecordIndex = this.pagination.endRecordIndex - (this.pagination.pageSize - 1);
  }

}
