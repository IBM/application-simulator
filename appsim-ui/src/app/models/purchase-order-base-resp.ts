export interface PurchaseOrderBaseResp {
    id: string;
    PODate: string;
    customerId: string;
    shippingAddressId: string;
    total: number;
    purchaseOrderItemCount: 1;
    demoId: string;
}