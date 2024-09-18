import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserLocalStorage } from 'src/app/models/user-local-storage';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonLocalStorageService } from 'src/app/services/common-local-storage.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loggedInUser: UserLocalStorage = {
    username: ""
  };

  public helpModalVisible = false;

  constructor(private commonSvc: CommonService, private commonHttpSvc: CommonHttpService, private commonLSSvc: CommonLocalStorageService) { }

  ngOnInit(): void {
    this.loggedInUser = this.commonLSSvc.getUser();
  }

  public logout() {
    this.commonHttpSvc.logoutUser().subscribe({next: (resp: string) => {
      this.commonLSSvc.removeUser();
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }})
  }

  public toggleHelpModal(): void {
    this.helpModalVisible = !this.helpModalVisible;
  }

}
