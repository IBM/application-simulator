export interface BaseMultipleRecordsResp<T> {
    output: T[];
    result: {
        pagination: {
            capacity: number;
        }
    }
}