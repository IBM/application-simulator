import { AddressResp } from "./address-resp";
import { BaseReferenceResp } from "./base-reference-resp";
import { LocationBaseResp } from "./location-base-resp";

export interface LocationResp extends LocationBaseResp {
    region: BaseReferenceResp;
    locationType: BaseReferenceResp;
    address: AddressResp;
}