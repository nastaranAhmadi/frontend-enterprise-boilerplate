import {
  type ChangeEvent,
  type DragEvent,
  forwardRef,
  type KeyboardEvent,
  useId,
  useRef,
  useState,
} from 'react';

import {
  FILE_INPUT_HIDDEN_INPUT_CLASS,
  FILE_INPUT_HINT_CLASS,
  FILE_INPUT_ICON_CLASS,
  FILE_INPUT_ITEM_ACTIONS_CLASS,
  FILE_INPUT_ITEM_BODY_CLASS,
  FILE_INPUT_ITEM_CONTENT_CLASS,
  FILE_INPUT_ITEM_ICON_CLASS,
  FILE_INPUT_ITEM_META_CLASS,
  FILE_INPUT_ITEM_NAME_CLASS,
  FILE_INPUT_LIST_CLASS,
  FILE_INPUT_PROGRESS_BAR_CLASS,
  FILE_INPUT_PROGRESS_TRACK_CLASS,
  FILE_INPUT_REMOVE_BUTTON_CLASS,
  FILE_INPUT_RETRY_BUTTON_CLASS,
  FILE_INPUT_SUBTITLE_CLASS,
  FILE_INPUT_TITLE_CLASS,
  getFileInputDropzoneClassName,
  getFileInputItemClassName,
  getFileInputRootClassName,
  getFileInputStatusClassName,
} from './FileInput.styles';
import type { FileInputProps, FileUploadItem } from './FileInput.types';
import { formatFileSize, matchesAccept } from './FileInput.utils';

const DefaultUploadIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
    <path
      d="M10 3.333v10M6.667 7.5 10 3.333 13.333 7.5M4.167 16.667h11.666"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const DefaultFileIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 16 16">
    <path
      d="M9.333 1.333H4.667A1.333 1.333 0 0 0 3.333 2.667v10.666A1.333 1.333 0 0 0 4.667 14.667h6.666A1.333 1.333 0 0 0 12.667 13.333V5.333L9.333 1.333Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M9.333 1.333v4h4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
  </svg>
);

const getStatusLabel = (item: FileUploadItem): string => {
  if (item.status === 'uploading') {
    return `Uploading… ${String(item.progress ?? 0)}%`;
  }

  if (item.status === 'complete') {
    return 'Complete';
  }

  if (item.status === 'failed') {
    return item.error ?? 'Upload failed';
  }

  return 'Pending';
};

const partitionFiles = ({
  fileList,
  accept,
  maxSize,
}: {
  fileList: FileList;
  accept?: string;
  maxSize?: number;
}): { accepted: File[]; rejected: File[]; reason: 'type' | 'size' | null } => {
  const accepted: File[] = [];
  const rejected: File[] = [];
  let reason: 'type' | 'size' | null = null;

  Array.from(fileList).forEach((file) => {
    if (!matchesAccept(file, accept)) {
      rejected.push(file);
      reason = 'type';
      return;
    }

    if (maxSize !== undefined && file.size > maxSize) {
      rejected.push(file);
      reason = 'size';
      return;
    }

    accepted.push(file);
  });

  return { accepted, rejected, reason };
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(props, ref) {
    const {
      accept,
      className,
      disabled = false,
      files = [],
      hint,
      id,
      invalid = false,
      maxSize,
      multiple = true,
      onFileRemove,
      onFileRetry,
      onFilesAdd,
      onFilesReject,
      progressVariant = 'bar',
      size = 'medium',
      subtitle = 'or drag and drop',
      title = 'Click to upload and attach files',
      'aria-describedby': ariaDescribedBy,
      ...rootProps
    } = props;

    const generatedId = useId();
    const resolvedId = id ?? generatedId;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [dragging, setDragging] = useState(false);

    const openFileDialog = () => {
      if (disabled) {
        return;
      }

      inputRef.current?.click();
    };

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0 || disabled) {
        return;
      }

      const { accepted, rejected, reason } = partitionFiles({ fileList, accept, maxSize });

      if (accepted.length > 0) {
        onFilesAdd?.(accepted);
      }

      if (rejected.length > 0 && reason) {
        onFilesReject?.(rejected, reason);
      }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      handleFiles(event.target.files);
      event.target.value = '';
    };

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!disabled) {
        setDragging(true);
      }
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragging(false);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragging(false);

      if (disabled) {
        return;
      }

      handleFiles(event.dataTransfer.files);
    };

    const handleDropzoneKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openFileDialog();
      }
    };

    const setInputRef = (node: HTMLInputElement | null) => {
      inputRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    return (
      <div className={getFileInputRootClassName({ className })} {...rootProps}>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          className={getFileInputDropzoneClassName({
            size,
            disabled,
            invalid,
            dragging,
          })}
          onClick={openFileDialog}
          onKeyDown={handleDropzoneKeyDown}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <span className={FILE_INPUT_ICON_CLASS}>
            <DefaultUploadIcon />
          </span>
          <p className={FILE_INPUT_TITLE_CLASS}>
            {title} <span className={FILE_INPUT_SUBTITLE_CLASS}>{subtitle}</span>
          </p>
          {hint ? <p className={FILE_INPUT_HINT_CLASS}>{hint}</p> : null}
        </div>

        <input
          ref={setInputRef}
          id={resolvedId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className={FILE_INPUT_HIDDEN_INPUT_CLASS}
          onChange={handleInputChange}
          aria-invalid={invalid || undefined}
          aria-describedby={ariaDescribedBy}
        />

        {files.length > 0 ? (
          <ul className={FILE_INPUT_LIST_CLASS} aria-live="polite">
            {files.map((item) => {
              const progress = item.progress ?? 0;

              return (
                <li key={item.id} className={getFileInputItemClassName({ status: item.status })}>
                  {progressVariant === 'fill' && item.status === 'uploading' ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 start-0 bg-primary/10 transition-[width] duration-normal"
                      style={{ width: `${String(progress)}%` }}
                    />
                  ) : null}

                  <div className={FILE_INPUT_ITEM_BODY_CLASS}>
                    <span className={FILE_INPUT_ITEM_ICON_CLASS}>
                      <DefaultFileIcon />
                    </span>

                    <div className={FILE_INPUT_ITEM_CONTENT_CLASS}>
                      <span className={FILE_INPUT_ITEM_NAME_CLASS}>{item.name}</span>
                      <span className={FILE_INPUT_ITEM_META_CLASS}>
                        {formatFileSize(item.size)}
                      </span>
                      <span className={getFileInputStatusClassName({ status: item.status })}>
                        {getStatusLabel(item)}
                      </span>
                    </div>

                    <div className={FILE_INPUT_ITEM_ACTIONS_CLASS}>
                      {item.status === 'failed' && onFileRetry ? (
                        <button
                          type="button"
                          className={FILE_INPUT_RETRY_BUTTON_CLASS}
                          onClick={(event) => {
                            event.stopPropagation();
                            onFileRetry(item.id);
                          }}
                        >
                          Try again
                        </button>
                      ) : null}

                      {onFileRemove ? (
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          className={FILE_INPUT_REMOVE_BUTTON_CLASS}
                          onClick={(event) => {
                            event.stopPropagation();
                            onFileRemove(item.id);
                          }}
                        >
                          ×
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {progressVariant === 'bar' && item.status === 'uploading' ? (
                    <div className={FILE_INPUT_PROGRESS_TRACK_CLASS} aria-hidden="true">
                      <div
                        className={FILE_INPUT_PROGRESS_BAR_CLASS}
                        style={{ width: `${String(progress)}%` }}
                      />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  },
);

FileInput.displayName = 'FileInput';
