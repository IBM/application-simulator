import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseSingleRecordResp } from 'src/app/models/base-single-record-resp';
import { DeviceResp } from 'src/app/models/device-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  public device: DeviceResp;

  constructor(private activatedRouter: ActivatedRoute, private commonSvc: CommonService, private commonHttpSvc: CommonHttpService) { }

  ngOnInit(): void {
    let id = this.activatedRouter.snapshot.paramMap.get('id');
    if(id === null) {

    } else {
      this.getDeviceById(id);
    }
  }

  private getDeviceById(id: string): void {
    this.commonHttpSvc.getDeviceById(id).subscribe({next: (resp: BaseSingleRecordResp<DeviceResp>) => {
      this.device = resp.output;
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

}
