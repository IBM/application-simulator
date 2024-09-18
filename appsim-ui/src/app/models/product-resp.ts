import { BaseReferenceResp } from "./base-reference-resp";
import { CurrencyResp } from "./currency-resp";
import { ImageResp } from "./image-resp";
import { ProductBaseResp } from "./product-base-resp";

export interface ProductResp extends ProductBaseResp {
    manufacturer: BaseReferenceResp;
    productType: BaseReferenceResp;
    UOMType: BaseReferenceResp;
    currency: CurrencyResp;
    image: ImageResp;
}