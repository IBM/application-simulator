import { HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseSingleRecordResp } from 'src/app/models/base-single-record-resp';
import { LoggedInUser } from 'src/app/models/loggedin-user-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonLocalStorageService } from 'src/app/services/common-local-storage.service';
import { CommonService } from 'src/app/services/common.service';
import { MessageService } from 'src/app/services/message.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
 
  public selectedDatasetFile: FileList | null;
  public disableReset:boolean=false;
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

  public resetDataset():void{
    this.disableReset=!this.disableReset;
    this.msgSvc.infoMessage("Dataset reset is in progress.");
    this.commonHttpSvc.resetDataset().subscribe({next: (response)=>{
      this.msgSvc.successMessage("Dataset reset was successful!");
      this.disableReset=!this.disableReset;
    },
    error: (error: HttpErrorResponse)=>{
      this.commonSvc.handleError(error);
      this.disableReset=!this.disableReset;
    }})
  }

  public downloadDataset():void{
    this.commonHttpSvc.downloadDataset().subscribe(response=>{
      let fileName:string=<string>(response.headers.get('content-disposition')?.split(';')[1].split('=')[1])?.replace(/['"]+/g, '');
      let blob:Blob=response.body as Blob;
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(a.href);
    })
  }
  
  public selectDataset(event: any): void {
    this.selectedDatasetFile = event.target.files;
  }

  public uploadDataset(): void {    
    if (this.selectedDatasetFile) {
      const file: File | null = this.selectedDatasetFile.item(0);
      if (file) {
        this.msgSvc.infoMessage("Uploading dataset...");
        this.commonHttpSvc.uploadDataset(file).subscribe({            
          next: (response: HttpResponse<any>) => {
            this.msgSvc.successMessage("Dataset uploaded successfully!");
          },
          error: (err: HttpErrorResponse) => {
            this.commonSvc.handleError(err);
          }
        });
      } else {
        this.msgSvc.errorMessage("Dataset is not selected.");
      }
    }
  }
  
}