export interface JSONData<T> {
    data: T;
    message: string;
}

export interface DeleteOne {
    n: number;
    ok: number;
    deletedCount: number;
}

export interface ModifiedOne {
    n: number;
    ok: number;
    nModified: number;
}
