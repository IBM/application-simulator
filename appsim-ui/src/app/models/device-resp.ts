import { BaseReferenceResp } from "./base-reference-resp";
import { CustomerResp } from "./customer-resp";
import { DeviceBaseResp } from "./device-base-resp";
import { LocationResp } from "./location-resp";
import { PersonnelBaseResp } from "./personnel-base-resp";
import { ProductResp } from "./product-resp";

export interface DeviceResp extends DeviceBaseResp {
    customer: CustomerResp;
    personnel: PersonnelBaseResp;
    product: ProductResp;
    location: LocationResp;
    deviceCategory: BaseReferenceResp;
    model: BaseReferenceResp;
    deviceStatus: BaseReferenceResp;
    manufacturer: BaseReferenceResp;
}