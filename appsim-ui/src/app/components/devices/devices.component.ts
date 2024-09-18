import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BaseMultipleRecordsResp } from 'src/app/models/base-multiple-records-resp';
import { DeviceBaseResp } from 'src/app/models/device-base-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  public devices: BaseMultipleRecordsResp<DeviceBaseResp>;

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
    this.getDevices();
  }

  private getDevices() {
    this.commonHttpSvc.getDevices(this.pagination.pageSize, this.pagination.pageNumber).subscribe({next: (resp: BaseMultipleRecordsResp<DeviceBaseResp>) => {
      this.devices = resp;
      this.calculatePagination();
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

  private calculatePagination() {
    this.pagination.totalRecords = Number(this.devices.result.pagination.capacity);
    this.pagination.numberOfPages = Math.ceil(this.pagination.totalRecords / this.pagination.pageSize);
    this.calculateStartAndEndIndex(); 
  }

  public incrementPageNumber(): void {
    this.pagination.pageNumber = this.pagination.pageNumber + 1;
    this.calculateStartAndEndIndex();
    this.getDevices();
  }

  public decrementPageNumber(): void {
    this.pagination.pageNumber = this.pagination.pageNumber - 1;
    this.calculateStartAndEndIndex();
    this.getDevices();
  }

  public goToPageNumber(): void {
    this.getDevices();
  }

  public calculateStartAndEndIndex() {
    this.pagination.endRecordIndex = this.pagination.pageNumber * this.pagination.pageSize;
    this.pagination.startRecordIndex = this.pagination.endRecordIndex - (this.pagination.pageSize - 1);
  }

}
