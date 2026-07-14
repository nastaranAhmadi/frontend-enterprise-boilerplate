import type { FileInputProps, FileUploadItemStatus } from './FileInput.types';

type FileInputSize = NonNullable<FileInputProps['size']>;

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const FILE_INPUT_ROOT_CLASS = 'flex w-full flex-col gap-sm font-sans';

export const FILE_INPUT_DROPZONE_BASE_CLASS =
  'relative flex w-full flex-col items-center justify-center gap-xs rounded-md border border-dashed border-border bg-background px-md py-lg text-center transition-colors duration-normal';

export const FILE_INPUT_DROPZONE_INTERACTIVE_CLASS =
  'cursor-pointer hover:border-primary hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

export const FILE_INPUT_DROPZONE_DRAGGING_CLASS = 'border-primary bg-muted/50';

export const FILE_INPUT_DROPZONE_DISABLED_CLASS = 'cursor-not-allowed opacity-50';

export const FILE_INPUT_DROPZONE_INVALID_CLASS = 'border-error';

export const FILE_INPUT_HIDDEN_INPUT_CLASS = 'sr-only';

export const FILE_INPUT_ICON_CLASS =
  'inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground';

export const FILE_INPUT_TITLE_CLASS = 'text-sm font-medium text-foreground';

export const FILE_INPUT_SUBTITLE_CLASS = 'text-sm text-primary';

export const FILE_INPUT_HINT_CLASS = 'text-sm text-muted-foreground';

export const FILE_INPUT_LIST_CLASS = 'flex flex-col gap-sm';

export const FILE_INPUT_ITEM_BASE_CLASS =
  'relative overflow-hidden rounded-md border border-border bg-background';

export const FILE_INPUT_ITEM_BODY_CLASS = 'flex items-center gap-sm px-md py-sm';

export const FILE_INPUT_ITEM_ICON_CLASS =
  'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground';

export const FILE_INPUT_ITEM_CONTENT_CLASS = 'flex min-w-0 flex-1 flex-col gap-0.5';

export const FILE_INPUT_ITEM_NAME_CLASS = 'truncate text-sm font-medium text-foreground';

export const FILE_INPUT_ITEM_META_CLASS = 'text-xs text-muted-foreground';

export const FILE_INPUT_ITEM_ACTIONS_CLASS = 'flex shrink-0 items-center gap-xs';

export const FILE_INPUT_ITEM_STATUS_CLASS = 'text-xs font-medium';

export const FILE_INPUT_PROGRESS_TRACK_CLASS = 'h-1 w-full bg-muted';

export const FILE_INPUT_PROGRESS_BAR_CLASS = 'h-full bg-primary transition-[width] duration-normal';

export const FILE_INPUT_RETRY_BUTTON_CLASS =
  'cursor-pointer border-0 bg-transparent p-0 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export const FILE_INPUT_REMOVE_BUTTON_CLASS =
  'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-muted-foreground transition-colors duration-normal hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const DROPZONE_SIZE_CLASS_MAP: Record<FileInputSize, string> = {
  small: 'px-sm py-md',
  medium: 'px-md py-lg',
  large: 'px-lg py-xl',
};

const STATUS_TEXT_CLASS_MAP: Record<FileUploadItemStatus, string> = {
  pending: 'text-muted-foreground',
  uploading: 'text-primary',
  complete: 'text-success',
  failed: 'text-error',
};

export const getFileInputRootClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(FILE_INPUT_ROOT_CLASS, className);

export const getFileInputDropzoneClassName = ({
  size,
  disabled,
  invalid,
  dragging,
  className,
}: {
  size?: FileInputProps['size'];
  disabled?: boolean;
  invalid?: boolean;
  dragging?: boolean;
  className?: string;
}): string => {
  const resolvedSize: FileInputSize = size === 'small' || size === 'large' ? size : 'medium';

  return joinClassNames(
    FILE_INPUT_DROPZONE_BASE_CLASS,
    DROPZONE_SIZE_CLASS_MAP[resolvedSize],
    !disabled && FILE_INPUT_DROPZONE_INTERACTIVE_CLASS,
    dragging && FILE_INPUT_DROPZONE_DRAGGING_CLASS,
    disabled && FILE_INPUT_DROPZONE_DISABLED_CLASS,
    invalid && FILE_INPUT_DROPZONE_INVALID_CLASS,
    className,
  );
};

export const getFileInputItemClassName = ({ status }: { status: FileUploadItemStatus }): string =>
  joinClassNames(FILE_INPUT_ITEM_BASE_CLASS, status === 'failed' && 'border-error');

export const getFileInputStatusClassName = ({ status }: { status: FileUploadItemStatus }): string =>
  joinClassNames(FILE_INPUT_ITEM_STATUS_CLASS, STATUS_TEXT_CLASS_MAP[status]);
