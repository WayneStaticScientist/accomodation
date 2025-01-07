import Image from "next/image";
import { Button } from "primereact/button";
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, ItemTemplateOptions } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { SyntheticEvent, useRef, useState } from "react";
import { IoIosImages } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";

export default function UploadDropDown({ fileUploadRef }: { fileUploadRef?: React.RefObject<FileUpload | null> | null }) {
    const toast = useRef<Toast>(null);
    const [totalSize, setTotalSize] = useState(0);

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        let _totalSize = totalSize;
        const files = e.files;

        Object.keys(files).forEach((key, i) => {
            _totalSize += files[i].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateRemove = (file: object, callback: (event: SyntheticEvent<Element, Event>) => void) => {
        const d = file as { name: string, objectURL: string, size: number }
        setTotalSize(totalSize - d.size);
        const syntheticEvent = {
            nativeEvent: new Event('remove'),
            isDefaultPrevented: () => false,
            isPropagationStopped: () => false,
            persist: () => { }
        } as SyntheticEvent<Element, Event>;
        callback(syntheticEvent);
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file: object, props: ItemTemplateOptions) => {
        const d = file as { name: string, objectURL: string, size: number }
        return (
            <div className="flex align-items-center flex-wrap bg-background">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <Image alt={d.name} role="presentation" src={d.objectURL} width={100} height={100} />
                    <span className="flex flex-column text-left ml-3">
                        {d.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(d, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column ">
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5 flex justify-center w-full gap-x-3">
                    <IoIosImages /> Drag and Drop Images Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: <RiImageAddFill className="mr-1" />, iconOnly: false, className: ' ' };
    const cancelOptions = { icon: <IoClose />, iconOnly: false, className: 'bg-[#ff000040] p-3 text-foreground' };

    return (
        <div className="">
            <Toast ref={toast}></Toast>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
            <FileUpload className="bg-background p-4 rounded-lg shadow-inner" ref={fileUploadRef} multiple accept="image/*" maxFileSize={1024 * 3 * 1024}
                onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} cancelOptions={cancelOptions} />
        </div>
    )
}
