import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BaseSingleRecordResp } from 'src/app/models/base-single-record-resp';
import { LoggedInUser } from 'src/app/models/loggedin-user-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonLocalStorageService } from 'src/app/services/common-local-storage.service';
import { CommonService } from 'src/app/services/common.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;

  public loggedInUser: LoggedInUser = {
    username: ""
  };
  constructor(private commonSvc: CommonService, private commonHttpSvc: CommonHttpService, private commonLSSvc: CommonLocalStorageService, private msgSvc: MessageService) { }

  ngOnInit(): void {
    this.getLoggedInUser();
  }
  private getLoggedInUser() {
    this.commonHttpSvc.getLoggedInUser().subscribe({next: (resp: BaseSingleRecordResp<LoggedInUser>) => {
      this.loggedInUser = this.commonLSSvc.getUser();
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }
}