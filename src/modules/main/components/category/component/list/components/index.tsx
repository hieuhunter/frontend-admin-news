import { Fragment, useCallback, useState } from 'react';
import FilterListCategoryComponent from './filter';
import BadgeComponent from 'src/components/Badge/components';
import BlockUIComponent from 'src/components/BlockUI/components';
import BreadcrumbComponent from 'src/components/Breadcrumb/components';
import CardComponent from 'src/components/Card/components';
import { EditIconComponent, TrashIconComponent } from 'src/components/Icon/components';
import LinkComponent from 'src/components/Link/components';
import { TableLoadingComponent } from 'src/components/Loading/components';
import ModalComponent from 'src/components/Modal/components';
import PaginationComponent from 'src/components/Pagination/components';
import TableComponent from 'src/components/Table/components';
import * as routeConstant from 'src/constants/route';
import errorHandler from 'src/helpers/errorHandler';
import time from 'src/helpers/time';
import toastify from 'src/helpers/toastify';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import useOnceEffect from 'src/hooks/useOnceEffect';
import useUpdateEffect from 'src/hooks/useUpdateEffect';
import categoryService from 'src/services/categoryService';
import {
	categoryDeleteDataRequestAction,
	categoryDeleteLoadingRequestAction,
	categoryListDataRequestAction,
	categoryListLoadingRequestAction,
	categoryListPaginationLimitRequestAction,
	categoryListPaginationPageRequestAction,
	categoryListPaginationTotalRequestAction
} from 'src/store/category/actions';
import { selectCategoryDelete, selectCategoryList } from 'src/store/category/selectors';
import ListCategoryRouter from './router';
import { Category } from 'src/types/category';

const ListCategoryComponent = () => {
	const [id, setId] = useState<number | null>(null);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useAppDispatch();
	const categoryList = useAppSelector(selectCategoryList);
	const categoryDelete = useAppSelector(selectCategoryDelete);

	const onChangePage = (page: number) => {
		dispatch(categoryListPaginationPageRequestAction(page));
	};

	const onChangeLimit = (limit: number) => {
		dispatch(categoryListPaginationPageRequestAction(1));
		dispatch(categoryListPaginationLimitRequestAction(limit));
	};

	const onClickDelete = (id: number) => {
		dispatch(categoryDeleteLoadingRequestAction(true));
		categoryService
			.delete(id)
			.then((response) => {
				toastify.success('User deleted successfully.');
				dispatch(categoryDeleteDataRequestAction(response.data.data));
				categoryListDataCallback();
			})
			.catch(errorHandler())
			.finally(() => {
				dispatch(categoryDeleteLoadingRequestAction(false));
			});
	};

	const categoryListDataCallback = useCallback(() => {
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
	}, [dispatch, categoryList.filter.q, categoryList.filter.sort_by, categoryList.filter.sort_direction, categoryList.pagination.limit, categoryList.pagination.page]);

	useOnceEffect(() => {
		categoryListDataCallback();
	});

	useUpdateEffect(() => {
		categoryListDataCallback();
	}, [categoryListDataCallback]);

	return (
		<Fragment>
			<BreadcrumbComponent className="mb-4">List Categorys</BreadcrumbComponent>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<CardComponent title="List categorys">
						<div className="relative">
							<FilterListCategoryComponent />
							{categoryList.loading ? (
								<TableLoadingComponent />
							) : (
								<TableComponent>
									<TableComponent.Thead>
										<TableComponent.Tr>
											<TableComponent.Th>Image</TableComponent.Th>
											<TableComponent.Th className='w-[20%]'>Title</TableComponent.Th>
											<TableComponent.Th className='w-[30%]'>Excerpt</TableComponent.Th>
											<TableComponent.Th>Categories</TableComponent.Th>
											<TableComponent.Th>Updated at</TableComponent.Th>
											<TableComponent.Th>Created at</TableComponent.Th>
											<TableComponent.Th>
												<span className="sr-only">Action</span>
											</TableComponent.Th>
										</TableComponent.Tr>
									</TableComponent.Thead>
									<TableComponent.Tbody>
										{!categoryList.data.length ? (
											<TableComponent.Tr>
												<TableComponent.Td className="text-center" colSpan={6}>
													No data.
												</TableComponent.Td>
											</TableComponent.Tr>
										) : (
											categoryList.data.map((categorys) => (
												<TableComponent.Tr key={categorys.id}>
													<TableComponent.Td>
														<div className="flex items-center">
															<div className="flex-shrink-0 h-10 w-10">
																<img className="h-10 w-10 rounded-full" src={categorys.name} alt='' />
															</div>
															{/* <div className="ml-4">
																<div className="text-sm font-medium text-gray-900">
																	{categorys.title}
																</div>
																<div className="text-sm text-gray-500">{categorys.excerpt}</div>
															</div> */}
														</div>
													</TableComponent.Td>
													<TableComponent.Td>
														{categorys.name}
													</TableComponent.Td>
													<TableComponent.Td>
														{categorys.name}
													</TableComponent.Td>
													<TableComponent.Td>{categorys.name}</TableComponent.Td>
													<TableComponent.Td className="whitespace-nowrap">{time.ago(categorys.updated_at)}</TableComponent.Td>
													<TableComponent.Td className="whitespace-nowrap">{time.format(categorys.created_at)}</TableComponent.Td>
													<TableComponent.Td>
														<div className="flex items-center">
															<LinkComponent
																to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_POST}/${categorys.id}/${routeConstant.ROUTE_NAME_MAIN_POST_EDIT}`}
																className="text-indigo-600 hover:text-indigo-900 mr-2"
															>
																<EditIconComponent className="h-5 w-5" />
															</LinkComponent>
															<button
																type="button"
																className="text-red-600 hover:text-red-900"
																onClick={() => {
																	setId(categorys.id);
																	setShowModal(true);
																}}
															>
																<TrashIconComponent className="h-5 w-5" />
															</button>
														</div>
													</TableComponent.Td>
												</TableComponent.Tr>
											))
										)}
									</TableComponent.Tbody>
								</TableComponent>
							)}
							<PaginationComponent
								page={categoryList.pagination.page}
								limit={categoryList.pagination.limit}
								total={categoryList.pagination.total}
								onChangePage={onChangePage}
								onChangeLimit={onChangeLimit}
							/>
							<BlockUIComponent blocked={categoryDelete.loading} />
						</div>
					</CardComponent>
				</div>
			</div>
			<ModalComponent
				title="Do you want to delete this categorys?"
				show={showModal}
				setShow={setShowModal}
				onClick={() => id && onClickDelete(id)}
				styleType="danger"
			/>
			<ListCategoryRouter />
		</Fragment>
	);
};

export default ListCategoryComponent;
