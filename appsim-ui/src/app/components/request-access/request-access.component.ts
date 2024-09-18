import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseReq } from 'src/app/models/base-req';
import { BaseReqResp } from 'src/app/models/base-req-resp';
import { RequestAccessReq } from 'src/app/models/request-access-req';
import { RequestAccessReqResp } from 'src/app/models/request-access-req-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonService } from 'src/app/services/common.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.scss']
})
export class RequestAccessComponent implements OnInit {

  public requestAccessForm: FormGroup;

  public submitDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private commonSvc: CommonService, private commonHttpSvc: CommonHttpService, private msgSvc: MessageService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.requestAccessForm = this.formBuilder.group({
      email: ['', Validators.required],
      purpose: ['', Validators.required]
    });
  }

  public requestAcess(): void {
    this.submitDisabled = true;
    let reqBody: BaseReq<RequestAccessReq> = {
      input: {
        email: this.requestAccessForm.controls['email'].value,
        purpose: this.requestAccessForm.controls['purpose'].value
      }
    };
    this.commonHttpSvc.requestAcess(reqBody).subscribe({next: (resp: BaseReqResp<RequestAccessReqResp>) => {
      if(resp.output.status === "Success") {
        this.msgSvc.successMessage("Request submitted successfully!");
      } else {
        this.msgSvc.errorMessage("Request submission failed! "+resp.output.status);
      }
      this.initializeForm();
      this.submitDisabled = false;
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
      this.initializeForm();
      this.submitDisabled = false;
    }});
  }

}
