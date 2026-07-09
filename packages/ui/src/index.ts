import type { ReactNode } from 'react';

export type UiInfrastructureProps = {
  children?: ReactNode;
};

export interface DesignSystemProviderComponent {
  (props: UiInfrastructureProps): ReactNode;
}

export { Button } from './components/base/Button';
