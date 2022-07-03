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

export interface UpdateCategory extends CreateCategory { }

export interface CreateCategoryFormik extends CreateCategory { }

export interface UpdateCategoryFormik extends UpdateCategory { }
