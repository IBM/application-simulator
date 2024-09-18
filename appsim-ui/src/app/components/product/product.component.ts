import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseSingleRecordResp } from 'src/app/models/base-single-record-resp';
import { ProductResp } from 'src/app/models/product-resp';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public product: ProductResp;

  constructor(private activatedRouter: ActivatedRoute, private commonSvc: CommonService, private commonHttpSvc: CommonHttpService) { }

  ngOnInit(): void {
    let id = this.activatedRouter.snapshot.paramMap.get('id');
    if(id === null) {

    } else {
      this.getProductById(id);
    }
  }

  private getProductById(id: string): void {
    this.commonHttpSvc.getProductById(id).subscribe({next: (resp: BaseSingleRecordResp<ProductResp>) => {
      this.product = resp.output;
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

}
