import { Fragment, useCallback, useState } from 'react';
import FilterListPostComponent from './filter';
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
import postService from 'src/services/postService';
import {
	postDeleteDataRequestAction,
	postDeleteLoadingRequestAction,
	postListDataRequestAction,
	postListLoadingRequestAction,
	postListPaginationLimitRequestAction,
	postListPaginationPageRequestAction,
	postListPaginationTotalRequestAction
} from 'src/store/post/actions';
import { selectPostDelete, selectPostList } from 'src/store/post/selectors';
import ListPostRouter from './router';
import { Category } from 'src/types/category';

const ListPostComponent = () => {
	const [id, setId] = useState<number | null>(null);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useAppDispatch();
	const postList = useAppSelector(selectPostList);
	const postDelete = useAppSelector(selectPostDelete);

	const onChangePage = (page: number) => {
		dispatch(postListPaginationPageRequestAction(page));
	};

	const onChangeLimit = (limit: number) => {
		dispatch(postListPaginationPageRequestAction(1));
		dispatch(postListPaginationLimitRequestAction(limit));
	};

	const onClickDelete = (id: number) => {
		dispatch(postDeleteLoadingRequestAction(true));
		postService
			.delete(id)
			.then((response) => {
				toastify.success('User deleted successfully.');
				dispatch(postDeleteDataRequestAction(response.data.data));
				postListDataCallback();
			})
			.catch(errorHandler())
			.finally(() => {
				dispatch(postDeleteLoadingRequestAction(false));
			});
	};

	const postListDataCallback = useCallback(() => {
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
	}, [dispatch, postList.filter.q, postList.filter.sort_by, postList.filter.sort_direction, postList.pagination.limit, postList.pagination.page]);

	useOnceEffect(() => {
		postListDataCallback();
	});

	useUpdateEffect(() => {
		postListDataCallback();
	}, [postListDataCallback]);

	return (
		<Fragment>
			<BreadcrumbComponent className="mb-4">List Posts</BreadcrumbComponent>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<CardComponent title="List posts">
						<div className="relative">
							<FilterListPostComponent />
							{postList.loading ? (
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
										{!postList.data.length ? (
											<TableComponent.Tr>
												<TableComponent.Td className="text-center" colSpan={6}>
													No data.
												</TableComponent.Td>
											</TableComponent.Tr>
										) : (
											postList.data.map((posts) => (
												<TableComponent.Tr key={posts.id}>
													<TableComponent.Td>
														<div className="flex items-center">
															<div className="flex-shrink-0 h-10 w-10">
																<img className="h-10 w-10 rounded-full" src={posts.image_url} alt='' />
															</div>
															{/* <div className="ml-4">
																<div className="text-sm font-medium text-gray-900">
																	{posts.title}
																</div>
																<div className="text-sm text-gray-500">{posts.excerpt}</div>
															</div> */}
														</div>
													</TableComponent.Td>
													<TableComponent.Td>
														{posts.title}
													</TableComponent.Td>
													<TableComponent.Td>
														{posts.excerpt}
													</TableComponent.Td>
													<TableComponent.Td>{posts.category.name}</TableComponent.Td>
													<TableComponent.Td className="whitespace-nowrap">{time.ago(posts.updated_at)}</TableComponent.Td>
													<TableComponent.Td className="whitespace-nowrap">{time.format(posts.created_at)}</TableComponent.Td>
													<TableComponent.Td>
														<div className="flex items-center">
															<LinkComponent
																to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_POST}/${posts.id}/${routeConstant.ROUTE_NAME_MAIN_POST_EDIT}`}
																className="text-indigo-600 hover:text-indigo-900 mr-2"
															>
																<EditIconComponent className="h-5 w-5" />
															</LinkComponent>
															<button
																type="button"
																className="text-red-600 hover:text-red-900"
																onClick={() => {
																	setId(posts.id);
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
								page={postList.pagination.page}
								limit={postList.pagination.limit}
								total={postList.pagination.total}
								onChangePage={onChangePage}
								onChangeLimit={onChangeLimit}
							/>
							<BlockUIComponent blocked={postDelete.loading} />
						</div>
					</CardComponent>
				</div>
			</div>
			<ModalComponent
				title="Do you want to delete this posts?"
				show={showModal}
				setShow={setShowModal}
				onClick={() => id && onClickDelete(id)}
				styleType="danger"
			/>
			<ListPostRouter />
		</Fragment>
	);
};

export default ListPostComponent;
