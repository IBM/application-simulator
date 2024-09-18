import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { CommonLocalStorageService } from './common-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router, private msgSvc: MessageService, private lsSvc: CommonLocalStorageService) { }

  private redirectToLoginPage() {
    this.router.navigate(['/login']);
  }

  public handleError(error: Error | HttpErrorResponse) {
    if(error instanceof Error) {

    } else {
      if(error.status === 401) {
        this.lsSvc.removeUser();
        this.msgSvc.errorMessage("Invalid credentials or session has timed out.");
        this.redirectToLoginPage();
      } else {
        this.msgSvc.errorMessage(error.error.errors[0].title);
      }
    }
  }
  
}