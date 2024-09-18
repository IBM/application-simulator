import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BaseMultipleRecordsResp } from 'src/app/models/base-multiple-records-resp';
import { ProductBaseResp } from 'src/app/models/product-base-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: BaseMultipleRecordsResp<ProductBaseResp>;

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
    this.getProducts();
  }

  private getProducts() {
    this.commonHttpSvc.getProducts(this.pagination.pageSize, this.pagination.pageNumber).subscribe({next: (resp: BaseMultipleRecordsResp<ProductBaseResp>) => {
      this.products = resp;
      this.calculatePagination();
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

  private calculatePagination() {
    this.pagination.totalRecords = Number(this.products.result.pagination.capacity);
    this.pagination.numberOfPages = Math.ceil(this.pagination.totalRecords / this.pagination.pageSize);
    this.calculateStartAndEndIndex(); 
  }

  public incrementPageNumber(): void {
    this.pagination.pageNumber = this.pagination.pageNumber + 1;
    this.calculateStartAndEndIndex();
    this.getProducts();
  }

  public decrementPageNumber(): void {
    this.pagination.pageNumber = this.pagination.pageNumber - 1;
    this.calculateStartAndEndIndex();
    this.getProducts();
  }

  public goToPageNumber(): void {
    this.getProducts();
  }

  public calculateStartAndEndIndex() {
    this.pagination.endRecordIndex = this.pagination.pageNumber * this.pagination.pageSize;
    this.pagination.startRecordIndex = this.pagination.endRecordIndex - (this.pagination.pageSize - 1);
  }

}
