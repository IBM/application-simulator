import { BaseReferenceResp } from "./base-reference-resp";
import { CurrencyResp } from "./currency-resp";
import { CustomerResp } from "./customer-resp";
import { SalesOrderBaseResp } from "./sales-order-base-resp";

export interface SalesOrderResp extends SalesOrderBaseResp {
    currency: CurrencyResp;
    salesOrderStatus: BaseReferenceResp;
    customer: CustomerResp;
}