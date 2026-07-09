const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const FORM_FIELD_ROOT_CLASS = 'flex flex-col gap-1';

export const getFormFieldClassName = ({ className }: { className?: string }): string =>
  joinClassNames(FORM_FIELD_ROOT_CLASS, className);
