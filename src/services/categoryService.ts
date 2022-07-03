import { AxiosResponse } from 'axios';

import config from 'src/config';
import http from 'src/helpers/http';
import { ResponseData, ResponseDataPagination } from 'src/types/response';
import { CreateCategory, ListCategory, UpdateCategory, Category } from 'src/types/category';

const categoryService = {
    list: (params?: ListCategory): Promise<AxiosResponse<ResponseDataPagination<Category[]>>> => {
        return http.get<ResponseDataPagination<Category[]>>({
            url: config.API.END_POINT.CATEGORY,
            params: params
        });
    },
    show: (id: number): Promise<AxiosResponse<ResponseData<Category>>> => {
        return http.get<ResponseData<Category>>({
            url: `${config.API.END_POINT.CATEGORY}/${id}`
        });
    },
    create: (data: CreateCategory): Promise<AxiosResponse<ResponseData<Category>>> => {
        return http.post<ResponseData<Category>>({
            url: config.API.END_POINT.CATEGORY,
            data: data
        });
    },
    update: (id: number, data: UpdateCategory): Promise<AxiosResponse<ResponseData<Category>>> => {
        return http.put<ResponseData<Category>>({
            url: `${config.API.END_POINT.CATEGORY}/${id}`,
            data: data
        });
    },
    delete: (id: number): Promise<AxiosResponse<ResponseData<Category>>> => {
        return http.delete<ResponseData<Category>>({
            url: `${config.API.END_POINT.CATEGORY}/${id}`
        });
    }
};

export default categoryService;
