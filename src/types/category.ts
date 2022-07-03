export interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface CreateCategory {
    name: string;
    slug: string;
}

export interface ListCategory {
    page: number;
    limit: number;
    sort_direction: string;
    sort_by: string;
    q: string;
}

export interface UpdateCategory extends CreateCategory { }

export interface CreateCategoryFormik extends CreateCategory { }

export interface UpdateCategoryFormik extends UpdateCategory { }
