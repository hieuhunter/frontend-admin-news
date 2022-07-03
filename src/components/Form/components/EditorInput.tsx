import { Editor, IAllProps } from '@tinymce/tinymce-react';
import imageService from 'src/services/imageService';
import classNames from 'classnames';

type Props = {
    className?: string;
    onChangeCustom: (field: string, value: string, shouldValidate?: boolean) => void;
    name: string;
    value: string;
    tempName?: string;
    label?: string;
    horizontal?: boolean;
    placeholder?: string;
    error?: string;
    touched?: boolean;
} & IAllProps

const EditorInputFormComponent: React.FC<Props> = ({ className, onChangeCustom, name, value, tempName, label, horizontal = false, placeholder, error, touched, ...props }) => {
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
                <Editor
                    {...props}
                    onEditorChange={(a, editor) => {
                        onChangeCustom(name, editor.getContent());
                        tempName && localStorage.setItem(tempName, editor.getContent());
                    }}
                    apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                    value={value}
                    init={{
                        setup: (editor) => {
                            editor.on('init', (e) => {
                                tempName && editor.setContent(localStorage.getItem(tempName) || '');
                            });
                        },
                        images_upload_handler: (blobInfo, progress): Promise<string> => {
                            console.log(blobInfo, progress);
                            return new Promise<string>((resolve, reject) => {
                                imageService
                                    .upload({
                                        image: blobInfo
                                    })
                                    .then((response) => {
                                        return resolve(response.data.data.image_url);
                                    })
                                    .catch((error) => {
                                        return reject(error);
                                    })
                                    .finally(() => { });
                            });
                        },
                        toolbar_sticky: true,
                        height: 666,
                        toolbar_mode: 'sliding',
                        plugins: [
                            'preview',
                            'importcss',
                            'searchreplace',
                            'autolink',
                            'autosave',
                            'save',
                            'directionality',
                            'code',
                            'visualblocks',
                            'visualchars',
                            'fullscreen',
                            'image',
                            'link',
                            'media',
                            'template',
                            'codesample',
                            'table',
                            'charmap',
                            'pagebreak',
                            'nonbreaking',
                            'anchor',
                            'insertdatetime',
                            'advlist',
                            'lists',
                            'wordcount',
                            'help',
                            'quickbars',
                            'emoticons'
                        ],
                        menubar: 'file edit view insert format tools table help',
                        toolbar:
                            'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl'
                    }}
                />
            </div>
            {error && touched && <div className="text-red-700 mt-1 text-sm">{error}</div>}
        </div>
    );
};

export default EditorInputFormComponent;
