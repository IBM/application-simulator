export interface DeviceBaseResp {
    id: string;
    parentDeviceId: string;
    deviceCategoryId: string;
    modelId: string;
    serialNumber: string;
    customerId: string;
    personnelId: string;
    deviceStatusId: string;
    productId: string;
    locationId: string;
    manufactureDate: string;
    manufacturerId: string;
    demoId: string;
    monitoring: {
        repairCount: number;
        failureCount: number;
        runTime: number;
        plannedDowntime: number;
        netTime: number;
        runningPercent: number;
        failurePrediction: number;
        unplannedDowntime: number;
        unitsProduced: number;
        maxCapacity: number;
        numberOfStops: number;
        predictedDowntime: number;
        nextScheduledMaintenance: string;
        uomTypeId: string;
    }
}