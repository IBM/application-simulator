import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BaseMultipleRecordsResp } from 'src/app/models/base-multiple-records-resp';
import { CustomerBaseResp } from 'src/app/models/customer-base-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customers: BaseMultipleRecordsResp<CustomerBaseResp>;

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
    this.getCustomers();
  }

  private getCustomers() {
    this.commonHttpSvc.getCustomers(this.pagination.pageSize, this.pagination.pageNumber).subscribe({next: (resp: BaseMultipleRecordsResp<CustomerBaseResp>) => {
      this.customers = resp;
      this.calculatePagination();
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

  private calculatePagination() {
    this.pagination.totalRecords = Number(this.customers.result.pagination.capacity);
    this.pagination.numberOfPages = Math.ceil(this.pagination.totalRecords / this.pagination.pageSize);
    this.calculateStartAndEndIndex(); 
  }

  public incrementPageNumber(): void {
    this.pagination.pageNumber = this.pagination.pageNumber + 1;
    this.calculateStartAndEndIndex();
    this.getCustomers();
  }

  public decrementPageNumber(): void {
    this.pagination.pageNumber = this.pagination.pageNumber - 1;
    this.calculateStartAndEndIndex();
    this.getCustomers();
  }

  public goToPageNumber(): void {
    this.getCustomers();
  }

  public calculateStartAndEndIndex() {
    this.pagination.endRecordIndex = this.pagination.pageNumber * this.pagination.pageSize;
    this.pagination.startRecordIndex = this.pagination.endRecordIndex - (this.pagination.pageSize - 1);
  }

}
