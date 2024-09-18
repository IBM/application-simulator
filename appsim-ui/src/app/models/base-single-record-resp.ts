export interface BaseSingleRecordResp<T> {
    output: T;
    result: {
        pagination: {
            capacity: number;
        }
    }
}