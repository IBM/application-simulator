import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseSingleRecordResp } from 'src/app/models/base-single-record-resp';
import { ServiceRequestResp } from 'src/app/models/service-request-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss']
})
export class ServiceRequestComponent implements OnInit {

  public serviceRequest: ServiceRequestResp;

  constructor(private activatedRouter: ActivatedRoute, private commonSvc: CommonService, private commonHttpSvc: CommonHttpService) { }

  ngOnInit(): void {
    let id = this.activatedRouter.snapshot.paramMap.get('id');
    if(id === null) {
      this.commonSvc.handleError(new Error("Service Request id is missing."));
    } else {
      this.getServiceRequestById(id);
    }
  }

  private getServiceRequestById(id: string): void {
    this.commonHttpSvc.getServiceRequestById(id).subscribe({next: (resp: BaseSingleRecordResp<ServiceRequestResp>) => {
      this.serviceRequest = resp.output;
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

}
