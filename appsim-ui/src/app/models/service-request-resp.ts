import { BaseReferenceResp } from "./base-reference-resp";
import { CustomerResp } from "./customer-resp";
import { DeviceResp } from "./device-resp";
import { PersonnelBaseResp } from "./personnel-base-resp";
import { ServiceRequestBaseResp } from "./service-request-base-resp";

export interface ServiceRequestResp extends ServiceRequestBaseResp {
    device: DeviceResp;
    personnel: PersonnelBaseResp;
    requestStatus: BaseReferenceResp;
    processType: BaseReferenceResp;
    serviceRequestType: BaseReferenceResp;
    severity: BaseReferenceResp;
    customer: CustomerResp;
}