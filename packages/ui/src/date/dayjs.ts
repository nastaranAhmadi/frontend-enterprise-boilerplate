import 'dayjs/locale/en';
import 'dayjs/locale/fa';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import jalaliday from 'jalaliday/dayjs';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(jalaliday);

export type { Dayjs } from 'dayjs';

/** Configured Day.js instance — import this instead of raw `dayjs` inside the UI package. */
export { dayjs };
