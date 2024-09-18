import { Component, OnInit } from '@angular/core';
import { BaseMultipleRecordsResp } from '../../models/base-multiple-records-resp';
import { HttpErrorResponse } from '@angular/common/http';
import { AccessRequestResp } from '../../models/access-request-resp';
import { CommonHttpService } from '../../services/common-http.service';
import { CommonService } from '../../services/common.service';
import { MessageService } from 'src/app/services/message.service';
import { AccessRequestRejectReqResp } from 'src/app/models/access-request-reject-req-resp';
import { BaseReqResp } from 'src/app/models/base-req-resp';
import { AccessRequestApproveReqResp } from 'src/app/models/access-request-approve-req-resp';
import { GetDatasetsResp } from 'src/app/models/datasets-resp';

@Component({
  selector: 'app-access-requests',
  templateUrl: './access-requests.component.html',
  styleUrls: ['./access-requests.component.scss']
})
export class AccessRequestsComponent implements OnInit {

  public accessRequests: BaseMultipleRecordsResp<AccessRequestResp>;

  public approvedDatasetCredentials: AccessRequestApproveReqResp= {
    username: "",
    password: "",
    message: ""
  };
  public credentialsModalVisible: boolean = false;
  public approveAccessModalVisible: boolean = false;
  
  public datasetList: GetDatasetsResp[];
  public isDatasetExists: boolean = false;
  public datasetName: string = "";

  public accessRequestId: string;
  
  constructor(private commonSvc: CommonService, private commonHttpSvc: CommonHttpService, private msgSvc: MessageService) { }

  ngOnInit(): void {
    this.getAccessRequests();
    this.getDatasets();
  }

  private getAccessRequests(): void {
    this.commonHttpSvc.getAccessRequests().subscribe({next: (resp: BaseMultipleRecordsResp<AccessRequestResp>) => {
      this.accessRequests = resp;
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

  private getDatasets(): void {
    this.commonHttpSvc.getDatasets().subscribe({next:(resp: BaseMultipleRecordsResp<GetDatasetsResp>) => {
      this.datasetList = resp.output;
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

  public rejectRequest(id: string): void {
    this.msgSvc.infoMessage("Reject access request in progress.");
    this.commonHttpSvc.rejectAccessRequest(id).subscribe({next: (resp: BaseReqResp<AccessRequestRejectReqResp>)=>{
      this.msgSvc.successMessage("Access request rejected.");
      this.getAccessRequests();
    },error:(error: HttpErrorResponse)=> {
      this.commonSvc.handleError(error);
    }});
  }

  public approveClicked(id: string): void {
    this.accessRequestId = id;
    this.datasetName = "";
    this.toggleApproveAccessRequestModal();
  }

  public approveRequest(datasetName: string): void {
    this.msgSvc.infoMessage("Approve access request in progress.");
    if(datasetName){
      this.commonHttpSvc.approveAccessRequest(this.accessRequestId, datasetName).subscribe({next: (resp: BaseReqResp<AccessRequestApproveReqResp>) => {
      this.approvedDatasetCredentials = resp.output;
      this.msgSvc.successMessage("Access request approved.");
      this.toggleApproveAccessRequestModal();
      this.toggleCredentialsModal();
      this.getAccessRequests();
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
    }       
  }

  public toggleCredentialsModal(): void {
    this.credentialsModalVisible = !this.credentialsModalVisible;
  }

  public toggleApproveAccessRequestModal(): void {
    this.approveAccessModalVisible = !this.approveAccessModalVisible;
  }

  public validateDatasetName(datasetName: string): void {
    this.isDatasetExists=false;
    this.datasetList.forEach((dataset: GetDatasetsResp) => {
      if(dataset.name === datasetName) {
        this.isDatasetExists = true;
      }
    });
  }

}
