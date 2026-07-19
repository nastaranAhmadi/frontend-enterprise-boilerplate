export type OrderPrepMode = 'cooked' | 'raw';
export type OrderServiceMode = 'dineIn' | 'takeaway';
export type OrderSeating = 'reserve' | 'wait';
export type OrderPickupMode = 'self' | 'send';
export type OrderPaymentMethod = 'card' | 'wallet';
export type OrderDeliveryState = 'packing' | 'onTheWay' | 'delivered';

export type OrderStepId =
  | 'login'
  | 'prepMode'
  | 'quantity'
  | 'serviceMode'
  | 'seating'
  | 'reservation'
  | 'pickupMode'
  | 'address'
  | 'branch'
  | 'payment'
  | 'receipt';

export type OrderStepPathInput = {
  isLoggedIn: boolean;
  prepMode: OrderPrepMode;
  serviceMode: OrderServiceMode;
  seating: OrderSeating;
  pickupMode: OrderPickupMode;
  paid: boolean;
};

/** Builds the visible step list from current order choices. */
export const buildOrderSteps = ({
  isLoggedIn,
  prepMode,
  serviceMode,
  seating,
  pickupMode,
  paid,
}: OrderStepPathInput): OrderStepId[] => {
  if (!isLoggedIn) {
    return ['login'];
  }

  if (paid) {
    return ['receipt'];
  }

  const steps: OrderStepId[] = ['prepMode', 'quantity'];

  if (prepMode === 'raw') {
    steps.push('address', 'payment', 'receipt');
    return steps;
  }

  steps.push('serviceMode');

  if (serviceMode === 'dineIn') {
    steps.push('seating');
    if (seating === 'reserve') {
      steps.push('reservation');
    }
  } else {
    steps.push('pickupMode');
    if (pickupMode === 'send') {
      steps.push('address');
    }
  }

  steps.push('branch', 'payment', 'receipt');
  return steps;
};
