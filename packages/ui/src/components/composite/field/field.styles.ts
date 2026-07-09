const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const FIELD_ROOT_CLASS = 'flex flex-col gap-1';

export const getFieldRootClassName = ({ className }: { className?: string }): string =>
  joinClassNames(FIELD_ROOT_CLASS, className);
