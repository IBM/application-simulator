export interface SalesOrderBaseResp {
    id: string;
    customerId: string;
    statusId: string;
    totalValue: number;
    orderDate: string;
    shipDate: string;
    isUrgent: boolean;
    currencyId: string;
    processTypeId: string;
    orderItemCount: number;
    demoId: string;
}