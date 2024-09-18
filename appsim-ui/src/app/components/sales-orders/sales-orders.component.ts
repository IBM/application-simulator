import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BaseMultipleRecordsResp } from 'src/app/models/base-multiple-records-resp';
import { SalesOrderBaseResp } from 'src/app/models/sales-order-base-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sales-orders',
  templateUrl: './sales-orders.component.html',
  styleUrls: ['./sales-orders.component.scss']
})
export class SalesOrdersComponent implements OnInit {

  public salesOrders: BaseMultipleRecordsResp<SalesOrderBaseResp>;

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
    this.getSalesOrders();
  }

  private getSalesOrders() {
    this.commonHttpSvc.getSalesOrders(this.pagination.pageSize, this.pagination.pageNumber).subscribe({next: (resp: BaseMultipleRecordsResp<SalesOrderBaseResp>) => {
      this.salesOrders = resp;
      this.calculatePagination();
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

  private calculatePagination() {
    this.pagination.totalRecords = Number(this.salesOrders.result.pagination.capacity);
    this.pagination.numberOfPages = Math.ceil(this.pagination.totalRecords / this.pagination.pageSize);
    this.calculateStartAndEndIndex(); 
  }

  public incrementPageNumber(): void {
    this.pagination.pageNumber = this.pagination.pageNumber + 1;
    this.calculateStartAndEndIndex();
    this.getSalesOrders();
  }

  public decrementPageNumber(): void {
    this.pagination.pageNumber = this.pagination.pageNumber - 1;
    this.calculateStartAndEndIndex();
    this.getSalesOrders();
  }

  public goToPageNumber(): void {
    this.getSalesOrders();
  }

  public calculateStartAndEndIndex() {
    this.pagination.endRecordIndex = this.pagination.pageNumber * this.pagination.pageSize;
    this.pagination.startRecordIndex = this.pagination.endRecordIndex - (this.pagination.pageSize - 1);
  }

}
