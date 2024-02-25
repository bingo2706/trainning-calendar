export type GetApiResponseType<T> = {
    errCode: number;
    data: T;
};
export type PayloadType<T> = {
    type: string;
    payload: T;
};
