import { SpeedDial as SpeedDialRoot, SpeedDialAction } from './SpeedDial';

export const SpeedDial = Object.assign(SpeedDialRoot, { Action: SpeedDialAction });
export { SpeedDialAction };
export type { SpeedDialActionProps, SpeedDialDirection, SpeedDialProps } from './SpeedDial.types';
