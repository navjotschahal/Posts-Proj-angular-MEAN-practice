export interface Post {
    id: string;
    title: string;
    content: string;
    photoPath: string;
    creator: string;
}

export interface PostRes {
    content: string;
    title: string;
    __v: number;
    _id: string;
    photoPath: string;
    creator: string;
}

export interface PostData {
    posts: PostRes[];
    totalPosts: number;
}
