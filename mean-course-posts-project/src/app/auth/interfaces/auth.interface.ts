export interface AuthData {
    userName: string;
    password: string;
}

export interface AuthUserData {
    _id: string;
    userName: string;
    password: string;
    date: string;
    __v?: number;
}

export interface LoginRes {
    token: string;
    expiresIn: number;
    authorisedUserId: string;
}
