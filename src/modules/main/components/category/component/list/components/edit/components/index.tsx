import { FormikHelpers } from 'formik';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import ButtonComponent from 'src/components/Button/components';
import CardComponent from 'src/components/Card/components';
import FormComponent from 'src/components/Form/components';
import { SpinLoadingComponent } from 'src/components/Loading/components';
import * as routeConstant from 'src/constants/route';
import * as postConstant from 'src/constants/post';
import errorHandler from 'src/helpers/errorHandler';
import * as localStorageConstant from 'src/constants/localStorage';
import toastify from 'src/helpers/toastify';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import useLockedScroll from 'src/hooks/useLockedScroll';
import useOnceEffect from 'src/hooks/useOnceEffect';
import useUpdateEffect from 'src/hooks/useUpdateEffect';
import imageService from 'src/services/imageService';
import categoryService from 'src/services/categoryService';
import CreatableSelect from 'react-select/creatable';
import postService from 'src/services/postService';
import { Category } from 'src/types/category';
import {
    postListDataRequestAction,
    postListLoadingRequestAction,
    postListPaginationTotalRequestAction,
    postShowDataRequestAction,
    postShowLoadingRequestAction,
    postUpdateDataRequestAction,
    postUpdateLoadingRequestAction
} from 'src/store/post/actions';
import { selectPostList, selectPostShow, selectPostUpdate } from 'src/store/post/selectors';
import { Image } from 'src/types/image';
import { UpdatePostFormik } from 'src/types/post';
import _ from 'lodash';

const EditListCategoryComponent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useAppDispatch();
    const postList = useAppSelector(selectPostList);
    const postShow = useAppSelector(selectPostShow);
    const postUpdate = useAppSelector(selectPostUpdate);
    const [imageUpload, setImageUpload] = useState({ loading: false });
    const [categories, setCategories] = useState<{
        data: Category[],
        loading: boolean
    }>({
        data: [],
        loading: true
    });

    const initialValues: UpdatePostFormik = {
        title: postShow.data.title || '',
        slug: postShow.data.slug || '',
        excerpt: postShow.data.excerpt || '',
        content: postShow.data.content || '',
        status: postShow.data.status || postConstant.POST_STATUS_PUBLISH,
        category_id: postShow.data.category?.id || 0,
        tags: postShow.data.tags,
        image: null
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('The title is required.').max(255, 'The title must not be greater than 255 characters.'),
        slug: Yup.string().max(255, 'The slug must not be greater than 255 characters.').nullable(),
        excerpt: Yup.string().max(666, 'The excerpt must not be greater than 666 characters.').nullable(),
        content: Yup.string()
            .required('The content is required.')
            .max(60000, 'The content must not be greater than 60000 characters.'),
        category_id: Yup.number().positive('The category must be select').required('The category is required.'),
        tags: Yup.array()
            .required('The tags is required.')
            .min(1, 'The tags must not be less than 1.')
            .max(66, 'The tags must not be greater than 20.')
            .of(
                Yup.object().shape({
                    name: Yup.string().required().max(66, 'The tag name must not be greater than 66 characters.'),
                    slug: Yup.string().required().max(66, 'The tag slug must not be greater than 66 characters.')
                })
            ),
        status: Yup.string()
            .required('The status is required.')
            .oneOf(
                [
                    postConstant.POST_STATUS_DRAFT,
                    postConstant.POST_STATUS_PENDING,
                    postConstant.POST_STATUS_PUBLISH,
                    postConstant.POST_STATUS_TRASH
                ],
                'The status invalid.'
            )
    });

    const onSubmit = (values: UpdatePostFormik, formikHelpers: FormikHelpers<UpdatePostFormik>) => {
        new Promise<Image | null>((resolve, reject) => {
            if (!values.image) {
                return resolve(null);
            }
            setImageUpload({ loading: true });
            imageService
                .upload({
                    image: values.image
                })
                .then((response) => {
                    return resolve(response.data.data);
                })
                .catch((error) => {
                    return reject(error);
                })
                .finally(() => {
                    setImageUpload({ loading: false });
                });
        })
            .then((result) => {
                dispatch(postUpdateLoadingRequestAction(true));
                const payload = {
                    title: values.title,
                    slug: values.slug,
                    excerpt: values.excerpt,
                    content: values.content,
                    category_id: values.category_id,
                    tags: values.tags,
                    status: values.status,
                    ...(result && {
                        image: result.image_name
                    })
                };
                postService
                    .update(Number(params.postId), payload)
                    .then((response) => {
                        toastify.success('User updated successfully.');
                        dispatch(postUpdateDataRequestAction(response.data.data));
                        dispatch(postListLoadingRequestAction(true));
                        const payload = {
                            page: postList.pagination.page,
                            limit: postList.pagination.limit,
                            q: postList.filter.q,
                            sort_by: postList.filter.sort_by,
                            sort_direction: postList.filter.sort_direction
                        };
                        postService
                            .list(payload)
                            .then((response) => {
                                dispatch(postListDataRequestAction(response.data.data));
                                dispatch(postListPaginationTotalRequestAction(response.data.pagination.total));
                            })
                            .catch(errorHandler())
                            .finally(() => {
                                dispatch(postListLoadingRequestAction(false));
                            });
                    })
                    .catch(
                        errorHandler(undefined, (validationError) => {
                            formikHelpers.setErrors(validationError.response?.data?.errors);
                        })
                    )
                    .finally(() => {
                        dispatch(postUpdateLoadingRequestAction(false));
                    });
            })
            .catch(
                errorHandler(undefined, (validationError) => {
                    formikHelpers.setErrors(validationError.response?.data?.errors);
                })
            )
            .finally(() => { });
    };

    const postShowDataCallback = useCallback(() => {
        dispatch(postShowLoadingRequestAction(true));
        postService
            .show(Number(params.postId))
            .then((response) => {
                dispatch(postShowDataRequestAction(response.data.data));
            })
            .catch(errorHandler())
            .finally(() => {
                dispatch(postShowLoadingRequestAction(false));
            });
    }, [dispatch, params.postId]);

    useOnceEffect(() => {
        postShowDataCallback();
    });

    useUpdateEffect(() => {
        postShowDataCallback();
    }, [postShowDataCallback]);


    useLockedScroll();

    useOnceEffect(() => {
        setCategories((prevState) => ({
            ...prevState,
            loading: true
        }));
        categoryService
            .list()
            .then((response) => {
                setCategories((prevState) => ({
                    ...prevState,
                    data: response.data.data
                }));
            })
            .catch(errorHandler())
            .finally(() => {
                setCategories((prevState) => ({
                    ...prevState,
                    loading: false
                }));
            });

    });

    return (
        <div className="h-full w-full fixed overflow-x-hidden overflow-y-auto z-50 top-0 left-0">
            <div className="min-h-full flex items-center py-8 sm:px-14 bg-gray-900/50 z-40 justify-center">
                <CardComponent
                    className="max-w-5xl z-50"
                    title="Edit post"
                    onClickClose={() => navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`)}
                >
                    {postShow.loading ? (
                        <SpinLoadingComponent />
                    ) : !postShow.data.id ? (
                        <div className="flex justify-center">Not found.</div>
                    ) : (
                        <FormComponent<UpdatePostFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
                            {(props) => (
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12">
                                        <FormComponent.Image
                                            id="image"
                                            label="Image"
                                            error={props.errors.image}
                                            touched={props.touched.image}
                                            onChangeFile={props.setFieldValue}
                                            onBlurFile={props.setFieldTouched}
                                            imgUrl={postShow.data.image_url}
                                            {...props.getFieldProps('image')}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg">
                                        <FormComponent.Input
                                            id="title"
                                            type="text"
                                            label="Title"
                                            placeholder="Enter Title"
                                            error={props.errors.title}
                                            touched={props.touched.title}
                                            {...props.getFieldProps('title')}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg">
                                        <FormComponent.Input
                                            id="slug"
                                            type="text"
                                            label="Slug"
                                            placeholder="Enter slug"
                                            error={props.errors.slug}
                                            touched={props.touched.slug}
                                            {...props.getFieldProps('slug')}
                                        />
                                    </div>
                                    <div className="col-span-12 md ">
                                        <FormComponent.Textarea
                                            id="excerpt"
                                            label="Excerpt"
                                            placeholder="Enter excerpt"
                                            error={props.errors.excerpt}
                                            touched={props.touched.excerpt}
                                            rows={4}
                                            autoComplete="excerpt"
                                            {...props.getFieldProps('excerpt')}
                                        />
                                    </div>
                                    <div className="col-span-12 md">
                                        <FormComponent.EditorInput
                                            id="content"
                                            name="content"
                                            label="Content"
                                            placeholder="Enter content"
                                            onChangeCustom={props.setFieldValue}
                                            value={props.values.content}
                                            error={props.errors.content}
                                            touched={props.touched.content}
                                            tempName={localStorageConstant.LOCAL_STORAGE_EDITOR_CONTENT}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg">
                                        <FormComponent.Select
                                            id="category_id"
                                            label="Category"
                                            options={categories.data.map((category) => ({
                                                value: category.id,
                                                label: category.name,
                                            }))}
                                            error={props.errors.category_id}
                                            touched={props.touched.category_id}
                                            loading={categories.loading}
                                            mustSelect
                                            {...props.getFieldProps('category_id')}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg">
                                        <div>
                                            <label htmlFor="tags" className='inline-block font-medium text-gray-600 mb-1'>
                                                Tags
                                            </label>
                                            <div className="relative">
                                                <CreatableSelect
                                                    id="tags"
                                                    name="tags"
                                                    isClearable
                                                    isMulti
                                                    placeholder="Choose tags"
                                                    onChange={(value) => props.setFieldValue('tags', value)}
                                                    onBlur={() => props.setFieldTouched('tags', true)}
                                                    value={props.values.tags}
                                                    getNewOptionData={(inputValue, optionLabel) => ({
                                                        name: inputValue,
                                                        slug: inputValue
                                                    })}
                                                    getOptionLabel={(option) => option.name}
                                                    getOptionValue={(option) => option.slug}
                                                />
                                            </div>
                                            {props.errors.tags && props.touched.tags && (
                                                <div className="text-red-700 mt-1 text-sm">
                                                    {_.isString(props.errors.tags) && props.errors.tags}
                                                    {_.isArray(props.errors.tags) &&
                                                        props.errors.tags.map((tag) => (_.isString(tag) ? tag : tag?.name))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg">
                                        <FormComponent.Select
                                            id="status"
                                            label="status"
                                            options={[
                                                {
                                                    value: postConstant.POST_STATUS_PUBLISH,
                                                    label: 'Publish'
                                                },
                                                {
                                                    value: postConstant.POST_STATUS_DRAFT,
                                                    label: 'Draft'
                                                },
                                                {
                                                    value: postConstant.POST_STATUS_PENDING,
                                                    label: 'Pending'
                                                },
                                                {
                                                    value: postConstant.POST_STATUS_TRASH,
                                                    label: 'Trash'
                                                }
                                            ]}
                                            error={props.errors.status}
                                            touched={props.touched.status}
                                            {...props.getFieldProps('status')}
                                        />
                                    </div>
                                    <div className="col-span-12 flex flex-row-reverse">
                                        <ButtonComponent
                                            className="ml-4"
                                            type="submit"
                                            loading={imageUpload.loading || postUpdate.loading}
                                            disabled={imageUpload.loading || postUpdate.loading}
                                        >
                                            {imageUpload.loading ? 'Uploading' : postUpdate.loading ? 'Updating' : 'Update'}
                                        </ButtonComponent>
                                        <ButtonComponent
                                            styleType="light"
                                            onClick={() => navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_POST}`)}
                                        >
                                            Cancel
                                        </ButtonComponent>
                                    </div>
                                </div>
                            )}
                        </FormComponent>
                    )}
                </CardComponent>
            </div>
        </div>
    );
};

export default EditListCategoryComponent;
