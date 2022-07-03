import classNames from 'classnames';
import CreatableSelect from 'react-select/creatable';

type Props = {
	className?: string;
	onChangeCustom: (field: string, value: string, shouldValidate?: boolean) => void;
	onBlurCustom: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
	name: string;
	label?: string;
	horizontal?: boolean;
	error?: string;
	touched?: boolean;
} & CreatableSelect;

const CreatableSelectFormComponent = ({ className, onChangeCustom, onBlurCustom, name, label, horizontal = false, error, touched = false, ...props }: Props) => {
	return (
		<div
			className={classNames(
				{
					'flex items-center': horizontal
				},
				className
			)}
		>
			{label && (
				<label htmlFor={name} className={classNames('inline-block font-medium text-gray-600', horizontal ? 'mr-1' : 'mb-1')}>
					{label}
				</label>
			)}
			<div className="relative">
				<CreatableSelect
					{...props}
					name={name}
					isClearable
					isMulti
					/* onChange={(value) => onChangeCustom(name, value)}
					onBlur={() => onBlurCustom(name, true)}

					getNewOptionData={(inputValue, optionLabel) => ({
						name: inputValue,
						slug: inputValue
					})}
					getOptionLabel={(option) => option.name}
					getOptionValue={(option) => option.slug} */
				/>
			</div>
			{error && touched && <div className="text-red-700 mt-1 text-sm">{error}</div>}
		</div>
	);
};

export default CreatableSelectFormComponent;
