import { FormikHelpers } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import ButtonComponent from 'src/components/Button/components';
import CardComponent from 'src/components/Card/components';
import FormComponent from 'src/components/Form/components';
import * as routeConstant from 'src/constants/route';
import errorHandler from 'src/helpers/errorHandler';
import toastify from 'src/helpers/toastify';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import useLockedScroll from 'src/hooks/useLockedScroll';
import imageService from 'src/services/imageService';
import {
    postCreateDataRequestAction,
    postCreateLoadingRequestAction,
    postListDataRequestAction,
    postListLoadingRequestAction,
    postListPaginationTotalRequestAction
} from 'src/store/post/actions';
import { selectPostCreate, selectPostList } from 'src/store/post/selectors';
import { Image } from 'src/types/image';
import { CreatePostFormik } from 'src/types/post';
import postService from 'src/services/postService';

const NewListPostComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const postList = useAppSelector(selectPostList);
    const postCreate = useAppSelector(selectPostCreate);
    const [imageUpload, setImageUpload] = useState({ loading: false });

    const initialValues: CreatePostFormik = {
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        status: '',
        category_id: 0,
        tags: [],
        image: null
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('The first name is required.').max(20, 'The first name must not be greater than 20 characters.'),
        slug: Yup.string().required('The last name is required.').max(20, 'The last name must not be greater than 20 characters.'),
        excerpt: Yup.string().required('Email is required.'),
        content: Yup.string()
            .required('The post name is required.')
            .min(3, 'The post name must be at least 3 characters.')
            .max(20, 'The post name must not be greater than 20 characters.'),
        image: Yup.string()
            .required('The password is required.')
            .min(6, 'The password must be at least 6 characters.')
            .max(66, 'The password must not be greater than 66 characters.'),
        status: Yup.string()
            .required('The password confirmation is required.')
            .test('passwords-match', 'The password confirmation does not match.', function (value) {
                return this.parent.password === value;
            })
    });

    const onSubmit = (values: CreatePostFormik, formikHelpers: FormikHelpers<CreatePostFormik>) => {
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
                dispatch(postCreateLoadingRequestAction(true));
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
                    .create(payload)
                    .then((response) => {
                        toastify.success('Post created successfully.');
                        dispatch(postCreateDataRequestAction(response.data.data));
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
                        dispatch(postCreateLoadingRequestAction(false));
                    });
            })
            .catch(
                errorHandler(undefined, (validationError) => {
                    formikHelpers.setErrors(validationError.response?.data?.errors);
                })
            )
            .finally(() => { });
    };

    useLockedScroll();

    return (
        <div className="h-full w-full fixed overflow-x-hidden overflow-y-auto z-50 top-0 left-0">
            <div className="min-h-full flex items-center py-8 sm:px-16 bg-gray-900/50 z-40 justify-center">
                <CardComponent
                    className="max-w-5xl z-50"
                    title="New post"
                    onClickClose={() => navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_POST}`)}
                >
                    <FormComponent<CreatePostFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {(props) => (
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                    <FormComponent.Input
                                        id="first_name"
                                        type="text"
                                        label="First name"
                                        placeholder="Enter first name"
                                        error={props.errors.title}
                                        touched={props.touched.title}
                                        {...props.getFieldProps('first_name')}
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                    <FormComponent.Input
                                        id="last_name"
                                        type="text"
                                        label="Last name"
                                        placeholder="Enter last name"
                                        error={props.errors.title}
                                        touched={props.touched.title}
                                        {...props.getFieldProps('last_name')}
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                    <FormComponent.Input
                                        id="post_name"
                                        type="text"
                                        label="Post name"
                                        placeholder="Enter post name"
                                        error={props.errors.title}
                                        touched={props.touched.title}
                                        autoComplete="postname"
                                        {...props.getFieldProps('post_name')}
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                    <FormComponent.Input
                                        id="email"
                                        type="text"
                                        label="Email"
                                        placeholder="Enter email"
                                        error={props.errors.title}
                                        touched={props.touched.title}
                                        {...props.getFieldProps('email')}
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                    <FormComponent.Input
                                        id="password"
                                        type="password"
                                        label="Password"
                                        placeholder="Enter password"
                                        error={props.errors.title}
                                        touched={props.touched.title}
                                        autoComplete="new-password"
                                        {...props.getFieldProps('password')}
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                    <FormComponent.Input
                                        id="password_confirmation"
                                        type="password"
                                        label="Password confirmation"
                                        placeholder="Enter password confirmation"
                                        error={props.errors.title}
                                        touched={props.touched.title}
                                        autoComplete="new-password"
                                        {...props.getFieldProps('password_confirmation')}
                                    />
                                </div>
                                {/*      <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                    <FormComponent.Select
                                        id="role"
                                        label="Role"
                                        options={[
                                            {
                                                value: postConstant.POST_ROLE_MEMBER,
                                                label: 'Member'
                                            },
                                            {
                                                value: postConstant.POST_ROLE_MODERATOR,
                                                label: 'Moderator'
                                            },
                                            {
                                                value: postConstant.POST_ROLE_ADMIN,
                                                label: 'Admin'
                                            },
                                            {
                                                value: postConstant.POST_ROLE_OWNER,
                                                label: 'Owner'
                                            }
                                        ]}
                                        error={props.errors.role}
                                        touched={props.touched.role}
                                        {...props.getFieldProps('role')}
                                    />
                                </div> */}
                                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                    <FormComponent.Toggle
                                        id="title"
                                        label="title"
                                        error={props.errors.title}
                                        touched={props.touched.title}
                                        {...props.getFieldProps('actived')}
                                    />
                                </div>
                                <div className="col-span-12">
                                    <FormComponent.Image
                                        id="image"
                                        label="Avatar"
                                        error={props.errors.image}
                                        touched={props.touched.image}
                                        onChangeFile={props.setFieldValue}
                                        onBlurFile={props.setFieldTouched}
                                        canDelete
                                        {...props.getFieldProps('image')}
                                    />
                                </div>
                                <div className="col-span-12 flex flex-row-reverse">
                                    <ButtonComponent
                                        className="ml-4"
                                        type="submit"
                                        loading={imageUpload.loading || postCreate.loading}
                                        disabled={imageUpload.loading || postCreate.loading}
                                    >
                                        {imageUpload.loading ? 'Uploading' : postCreate.loading ? 'Creating' : 'Create'}
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
                </CardComponent>
            </div>
        </div>
    );
};

export default NewListPostComponent;
