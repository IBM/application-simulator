import { AddressResp } from "./address-resp";
import { CustomerResp } from "./customer-resp";
import { PurchaseOrderBaseResp } from "./purchase-order-base-resp";

export interface PurchaseOrderResp extends PurchaseOrderBaseResp {
    customer: CustomerResp;
    address: AddressResp;
}