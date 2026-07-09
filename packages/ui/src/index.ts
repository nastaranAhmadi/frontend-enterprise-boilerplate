import type { ReactNode } from 'react';

export type UiInfrastructureProps = {
  children?: ReactNode;
};

export interface DesignSystemProviderComponent {
  (props: UiInfrastructureProps): ReactNode;
}

export { Button } from './components/base/Button';
export { ErrorMessage } from './components/base/ErrorMessage';
export { HelperText } from './components/base/HelperText';
export { Input } from './components/base/Input';
export { Label } from './components/base/Label';
