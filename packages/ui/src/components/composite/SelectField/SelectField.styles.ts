const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const SELECT_FIELD_ROOT_CLASS = 'flex flex-col gap-1';

export const getSelectFieldClassName = ({ className }: { className?: string }): string =>
  joinClassNames(SELECT_FIELD_ROOT_CLASS, className);
