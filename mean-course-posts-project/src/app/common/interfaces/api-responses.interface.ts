export interface JSONData<T> {
    data: T;
    message: string;
}

export interface DeleteOne {
    n: number;
    ok: number;
    deletedCount: number;
}
