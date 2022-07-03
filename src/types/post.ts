import { Category } from "./category";
import { User } from "./user";

export interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url: string;
    status: string;
    user: User;
    category: Category;
    tags: Array<{
        readonly name: string;
        readonly slug: string;
    }>;
    created_at: string | null;
    updated_at: string | null;
}

export interface ListPost {
    page: number;
    limit: number;
    sort_direction: string;
    sort_by: string;
    q: string;
}

export interface CreatePost {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image?: string | null;
    status: string;
    category_id: number;
    tags: Array<{
        readonly name: string;
        readonly slug: string;
    }>;
}

export interface CreatePostFormik extends Omit<CreatePost, 'image'> {
    image: File | null;
}

export interface UpdatePost extends CreatePost { }

export interface UpdatePostFormik extends CreatePostFormik { }
