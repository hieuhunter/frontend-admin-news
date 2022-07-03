import { AxiosResponse } from 'axios';

import config from 'src/config';
import http from 'src/helpers/http';
import { ResponseData, ResponseDataPagination } from 'src/types/response';
import { CreatePost, ListPost, UpdatePost, Post } from 'src/types/post';

const postService = {
    list: (params?: ListPost): Promise<AxiosResponse<ResponseDataPagination<Post[]>>> => {
        return http.get<ResponseDataPagination<Post[]>>({
            url: config.API.END_POINT.POST,
            params: params
        });
    },
    show: (id: number): Promise<AxiosResponse<ResponseData<Post>>> => {
        return http.get<ResponseData<Post>>({
            url: `${config.API.END_POINT.POST}/${id}`
        });
    },
    create: (data: CreatePost): Promise<AxiosResponse<ResponseData<Post>>> => {
        return http.post<ResponseData<Post>>({
            url: config.API.END_POINT.POST,
            data: data
        });
    },
    update: (id: number, data: UpdatePost): Promise<AxiosResponse<ResponseData<Post>>> => {
        return http.put<ResponseData<Post>>({
            url: `${config.API.END_POINT.POST}/${id}`,
            data: data
        });
    },
    delete: (id: number): Promise<AxiosResponse<ResponseData<Post>>> => {
        return http.delete<ResponseData<Post>>({
            url: `${config.API.END_POINT.POST}/${id}`
        });
    }
};

export default postService;
