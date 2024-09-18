import { AddressBaseRef } from "./address-base-resp";
import { BaseReferenceResp } from "./base-reference-resp";

export interface AddressResp extends AddressBaseRef {
    country: BaseReferenceResp;
}