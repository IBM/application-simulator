import { AddressResp } from "./address-resp";
import { CustomerBaseResp } from "./customer-base-resp";

export interface CustomerResp extends CustomerBaseResp {
    address: AddressResp;
}