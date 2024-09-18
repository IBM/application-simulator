import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseSingleRecordResp } from 'src/app/models/base-single-record-resp';
import { PurchaseOrderResp } from 'src/app/models/purchase-order-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {

  public purchaseOrder: PurchaseOrderResp;

  constructor(private activatedRouter: ActivatedRoute, private commonSvc: CommonService, private commonHttpSvc: CommonHttpService) { }

  ngOnInit(): void {
    let id = this.activatedRouter.snapshot.paramMap.get('id');
    if(id === null) {

    } else {
      this.getPurchaseOrderById(id);
    }
  }

  private getPurchaseOrderById(id: string): void {
    this.commonHttpSvc.getPurchaseOrderById(id).subscribe({next: (resp: BaseSingleRecordResp<PurchaseOrderResp>) => {
      this.purchaseOrder = resp.output;
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

}
