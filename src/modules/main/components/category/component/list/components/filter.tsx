import FormComponent from 'src/components/Form/components';
import * as filterConstant from 'src/constants/filter';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import useDebouncedCallback from 'src/hooks/useDebouncedCallback';
import {
	postListFilterQRequestAction,
	postListFilterQTempRequestAction,
	postListFilterSortByRequestAction,
	postListFilterSortDirectionRequestAction
} from 'src/store/post/actions';
import { selectPostList } from 'src/store/post/selectors';

const FilterListCategoryComponent = () => {
	const dispatch = useAppDispatch();
	const postList = useAppSelector(selectPostList);

	const postListFilterQDebouncedCallback = useDebouncedCallback((nextValue: string) => dispatch(postListFilterQRequestAction(nextValue)));

	const onChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(postListFilterSortByRequestAction(event.target.value));
	};

	const onChangeSortDirection = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(postListFilterSortDirectionRequestAction(event.target.value));
	};

	const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(postListFilterQTempRequestAction(event.target.value));
		postListFilterQDebouncedCallback(event.target.value);
	};

	return (
		<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
			<div className="flex sm:items-center flex-col sm:flex-row mb-4 md:mb-0">
				<FormComponent.Select
					className="mr-0 sm:mr-4 mb-4 sm:mb-0 sm:w-36 min-w-full sm:min-w-0"
					label="Sort by"
					onChange={onChangeSortBy}
					value={postList.filter.sort_by}
					name="sort_by"
					id="sort_by"
					options={[
						{
							value: 'title',
							label: 'Title'
						},
						{
							value: 'slug ',
							label: 'Slug'
						},
						{
							value: 'excerpt',
							label: 'Excerpt'
						},
						{
							value: 'content',
							label: 'Content'
						},
						{
							value: 'status',
							label: 'Status'
						},
						{
							value: 'updated_at',
							label: 'Updated at'
						},
						{
							value: 'created_at',
							label: 'Created at'
						}
					]}
				/>
				<FormComponent.Select
					className="sm:w-36 min-w-full sm:min-w-0"
					label="Sort direction"
					onChange={onChangeSortDirection}
					value={postList.filter.sort_direction}
					name="sort_direction"
					id="sort_direction"
					options={[
						{
							value: filterConstant.FILTER_SORT_DIRECTION_ASC,
							label: 'Ascending'
						},
						{
							value: filterConstant.FILTER_SORT_DIRECTION_DESC,
							label: 'Descending'
						}
					]}
				/>
			</div>
			<div className="flex sm:items-center flex-col sm:flex-row">
				<FormComponent.Input
					className="min-w-full sm:w-72 sm:min-w-0"
					label="Search"
					type="text"
					placeholder="Enter keyword"
					onChange={onChangeSearch}
					value={postList.filter.q_temp}
					name="q"
					id="q"
				/>
			</div>
		</div>
	);
};

export default FilterListCategoryComponent;
