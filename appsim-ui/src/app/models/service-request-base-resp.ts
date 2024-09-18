export interface ServiceRequestBaseResp {
    id: string;
    costOfRepair: number;
    customerId: string;
    demoId: string;
    description: string;
    deviceId: string;
    emergencyRepair: boolean;
    endDate: string;
    isSLABreached: boolean;
    parentRequestId: string;
    personnelId: string;
    processTypeId: string;
    requestType: string;
    result: string;
    severityId: string;
    startDate: string;
    statusId: string;
    visitCount: number;
}
