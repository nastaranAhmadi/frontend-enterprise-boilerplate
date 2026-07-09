const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const RADIO_GROUP_OPTIONS_CLASS = 'flex flex-col gap-sm';

export const getRadioGroupOptionsClassName = ({ className }: { className?: string }): string =>
  joinClassNames(RADIO_GROUP_OPTIONS_CLASS, className);
