const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const CHECKBOX_FIELD_CONTROL_ROW_CLASS = 'inline-flex items-start gap-sm';

export const getCheckboxFieldControlRowClassName = ({
  className,
}: {
  className?: string;
}): string => joinClassNames(CHECKBOX_FIELD_CONTROL_ROW_CLASS, className);
