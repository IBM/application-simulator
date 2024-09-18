import { Component,OnInit } from '@angular/core';

import { CommonHttpService } from '../../services/common-http.service';
import { BaseMultipleRecordsResp } from '../../models/base-multiple-records-resp';
import { GetDatasetsResp } from 'src/app/models/datasets-resp';
import { MessageService } from 'src/app/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-admin-datasets',
  templateUrl: './admin-datasets.component.html',
  styleUrls: ['./admin-datasets.component.scss']
})
export class AdminDatasetsComponent implements OnInit {

  public datasetsList:BaseMultipleRecordsResp<GetDatasetsResp>;

  constructor(private commonHttpSvc:CommonHttpService, private msgSvc: MessageService, private commonSvc: CommonService) {}
  
  ngOnInit(): void {
    this.getDatasets();
  }

  private getDatasets(): void {
    this.commonHttpSvc.getDatasets().subscribe({next:(resp:BaseMultipleRecordsResp<GetDatasetsResp>) => {
      this.datasetsList = resp;
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

  public onDeleteClick(dataset: String): void {
    this.msgSvc.infoMessage("Deletion of dataset "+dataset+" in progress.");
    this.deleteDataset(dataset);
  }

  private deleteDataset(dataset: String): void {
    this.commonHttpSvc.deleteDataset(dataset).subscribe({next:(resp: any) => {
      this.msgSvc.successMessage("Dataset "+dataset+" deleted succesfully.");
      this.getDatasets();
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

}
