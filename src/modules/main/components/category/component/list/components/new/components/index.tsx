import { FormikHelpers } from 'formik';
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
import categoryService from 'src/services/categoryService';
import {
    categoryCreateDataRequestAction,
    categoryCreateLoadingRequestAction,
    categoryListDataRequestAction,
    categoryListLoadingRequestAction,
    categoryListPaginationTotalRequestAction
} from 'src/store/category/actions';
import { selectCategoryCreate, selectCategoryList } from 'src/store/category/selectors';
import { CreateCategoryFormik } from 'src/types/category';

const NewListCategoryComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const categoryList = useAppSelector(selectCategoryList);
    const categoryCreate = useAppSelector(selectCategoryCreate);

    const initialValues: CreateCategoryFormik = {
        name: '',
        slug: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('The name is required.').max(255, 'The name must not be greater than 255 characters.'),
        slug: Yup.string().max(255, 'The slug must not be greater than 255 characters.').nullable()
    });

    const onSubmit = (values: CreateCategoryFormik, formikHelpers: FormikHelpers<CreateCategoryFormik>) => {
        dispatch(categoryCreateLoadingRequestAction(true));
        const payload = {
            name: values.name,
            slug: values.slug
        };
        categoryService
            .create(payload)
            .then((response) => {
                toastify.success('Category created successfully.');
                dispatch(categoryCreateDataRequestAction(response.data.data));
                formikHelpers.resetForm();
                dispatch(categoryListLoadingRequestAction(true));
                const payload = {
                    page: categoryList.pagination.page,
                    limit: categoryList.pagination.limit,
                    q: categoryList.filter.q,
                    sort_by: categoryList.filter.sort_by,
                    sort_direction: categoryList.filter.sort_direction
                };
                categoryService
                    .list(payload)
                    .then((response) => {
                        dispatch(categoryListDataRequestAction(response.data.data));
                        dispatch(categoryListPaginationTotalRequestAction(response.data.pagination.total));
                    })
                    .catch(errorHandler())
                    .finally(() => {
                        dispatch(categoryListLoadingRequestAction(false));
                    });
            })
            .catch(
                errorHandler(undefined, (validationError) => {
                    formikHelpers.setErrors(validationError.response?.data?.errors);
                })
            )
            .finally(() => {
                dispatch(categoryCreateLoadingRequestAction(false));
            });
    };

    useLockedScroll();

    return (
        <div className="h-full w-full fixed overflow-x-hidden overflow-y-auto z-50 top-0 left-0">
            <div className="min-h-full flex items-center py-8 sm:px-14 bg-gray-900/50 z-40 justify-center">
                <CardComponent
                    className="max-w-5xl z-50"
                    title="New categories"
                    onClickClose={() => navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_CATEGORY}`)}
                >
                    <FormComponent<CreateCategoryFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {(props) => (
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 md:col-span-6 lg">
                                    <FormComponent.Input
                                        id="name"
                                        type="text"
                                        label="name"
                                        placeholder="Enter name"
                                        error={props.errors.name}
                                        touched={props.touched.name}
                                        {...props.getFieldProps('name')}
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
                                <div className="col-span-12 flex flex-row-reverse">
                                    <ButtonComponent
                                        className="ml-4"
                                        type="submit"
                                        loading={categoryCreate.loading}
                                        disabled={categoryCreate.loading}
                                    >
                                        {categoryCreate.loading ? 'Creating' : 'Create'}
                                    </ButtonComponent>
                                    <ButtonComponent
                                        styleType="light"
                                        onClick={() => navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_CATEGORY}`)}
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

export default NewListCategoryComponent;
