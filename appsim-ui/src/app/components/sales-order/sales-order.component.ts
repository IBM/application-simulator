import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseSingleRecordResp } from 'src/app/models/base-single-record-resp';
import { SalesOrderResp } from 'src/app/models/sales-order-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class SalesOrderComponent implements OnInit {

  public salesOrder: SalesOrderResp;

  constructor(private activatedRouter: ActivatedRoute, private commonSvc: CommonService, private commonHttpSvc: CommonHttpService) { }

  ngOnInit(): void {
    let id = this.activatedRouter.snapshot.paramMap.get('id');
    if(id === null) {

    } else {
      this.getSalesOrderById(id);
    }
  }

  private getSalesOrderById(id: string): void {
    this.commonHttpSvc.getSalesOrderById(id).subscribe({next: (resp: BaseSingleRecordResp<SalesOrderResp>) => {
      this.salesOrder = resp.output;
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

}
