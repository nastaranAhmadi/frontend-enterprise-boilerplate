import type { Locale } from '@/config/site';
import type { OrderStepId } from '@/features/menu/components/build-order-steps';
import { createT } from '@/i18n/t';

export type FoodOrderStepperLabels = {
  title: string;
  loginTitle: string;
  loginBody: string;
  loginCta: string;
  steps: Record<
    Exclude<OrderStepId, 'login'>,
    {
      title: string;
      description: string;
    }
  >;
  prepModes: {
    cooked: string;
    raw: string;
  };
  prepHints: {
    cooked: string;
    raw: string;
  };
  serviceModes: {
    dineIn: string;
    takeaway: string;
  };
  seating: {
    reserve: string;
    wait: string;
  };
  pickupModes: {
    self: string;
    send: string;
  };
  quantityLabel: string;
  decreaseQty: string;
  increaseQty: string;
  partySizeLabel: string;
  reserveTimeLabel: string;
  phoneLabel: string;
  addressLineLabel: string;
  cityLabel: string;
  postalLabel: string;
  noteLabel: string;
  branchLabel: string;
  paymentMethods: {
    card: string;
    wallet: string;
  };
  payNow: string;
  continue: string;
  back: string;
  summaryDish: string;
  summaryPrep: string;
  summaryQty: string;
  summaryService: string;
  summarySeating: string;
  summaryPickup: string;
  summaryBranch: string;
  summaryAddress: string;
  summaryPhone: string;
  summaryPayment: string;
  receiptTitle: string;
  receiptOrderId: string;
  readinessLabel: string;
  readinessMinutes: string;
  branchLocationLabel: string;
  deliveryStateLabel: string;
  deliveryStates: {
    packing: string;
    onTheWay: string;
    delivered: string;
  };
  validationRequired: string;
};

export const getMenuOrderLabels = (locale: Locale): FoodOrderStepperLabels => {
  const t = createT(locale);

  return {
    title: t('menuDetail.order.title'),
    loginTitle: t('menuDetail.order.loginTitle'),
    loginBody: t('menuDetail.order.loginBody'),
    loginCta: t('menuDetail.order.loginCta'),
    steps: {
      prepMode: {
        title: t('menuDetail.order.steps.prepMode.title'),
        description: t('menuDetail.order.steps.prepMode.description'),
      },
      quantity: {
        title: t('menuDetail.order.steps.quantity.title'),
        description: t('menuDetail.order.steps.quantity.description'),
      },
      serviceMode: {
        title: t('menuDetail.order.steps.serviceMode.title'),
        description: t('menuDetail.order.steps.serviceMode.description'),
      },
      seating: {
        title: t('menuDetail.order.steps.seating.title'),
        description: t('menuDetail.order.steps.seating.description'),
      },
      reservation: {
        title: t('menuDetail.order.steps.reservation.title'),
        description: t('menuDetail.order.steps.reservation.description'),
      },
      pickupMode: {
        title: t('menuDetail.order.steps.pickupMode.title'),
        description: t('menuDetail.order.steps.pickupMode.description'),
      },
      address: {
        title: t('menuDetail.order.steps.address.title'),
        description: t('menuDetail.order.steps.address.description'),
      },
      branch: {
        title: t('menuDetail.order.steps.branch.title'),
        description: t('menuDetail.order.steps.branch.description'),
      },
      payment: {
        title: t('menuDetail.order.steps.payment.title'),
        description: t('menuDetail.order.steps.payment.description'),
      },
      receipt: {
        title: t('menuDetail.order.steps.receipt.title'),
        description: t('menuDetail.order.steps.receipt.description'),
      },
    },
    prepModes: {
      cooked: t('menuDetail.order.prepModes.cooked'),
      raw: t('menuDetail.order.prepModes.raw'),
    },
    prepHints: {
      cooked: t('menuDetail.order.prepHints.cooked'),
      raw: t('menuDetail.order.prepHints.raw'),
    },
    serviceModes: {
      dineIn: t('menuDetail.order.serviceModes.dineIn'),
      takeaway: t('menuDetail.order.serviceModes.takeaway'),
    },
    seating: {
      reserve: t('menuDetail.order.seating.reserve'),
      wait: t('menuDetail.order.seating.wait'),
    },
    pickupModes: {
      self: t('menuDetail.order.pickupModes.self'),
      send: t('menuDetail.order.pickupModes.send'),
    },
    quantityLabel: t('menuDetail.order.quantityLabel'),
    decreaseQty: t('menuDetail.order.decreaseQty'),
    increaseQty: t('menuDetail.order.increaseQty'),
    partySizeLabel: t('menuDetail.order.partySizeLabel'),
    reserveTimeLabel: t('menuDetail.order.reserveTimeLabel'),
    phoneLabel: t('menuDetail.order.phoneLabel'),
    addressLineLabel: t('menuDetail.order.addressLineLabel'),
    cityLabel: t('menuDetail.order.cityLabel'),
    postalLabel: t('menuDetail.order.postalLabel'),
    noteLabel: t('menuDetail.order.noteLabel'),
    branchLabel: t('menuDetail.order.branchLabel'),
    paymentMethods: {
      card: t('menuDetail.order.paymentMethods.card'),
      wallet: t('menuDetail.order.paymentMethods.wallet'),
    },
    payNow: t('menuDetail.order.payNow'),
    continue: t('menuDetail.order.continue'),
    back: t('menuDetail.order.back'),
    summaryDish: t('menuDetail.order.summaryDish'),
    summaryPrep: t('menuDetail.order.summaryPrep'),
    summaryQty: t('menuDetail.order.summaryQty'),
    summaryService: t('menuDetail.order.summaryService'),
    summarySeating: t('menuDetail.order.summarySeating'),
    summaryPickup: t('menuDetail.order.summaryPickup'),
    summaryBranch: t('menuDetail.order.summaryBranch'),
    summaryAddress: t('menuDetail.order.summaryAddress'),
    summaryPhone: t('menuDetail.order.summaryPhone'),
    summaryPayment: t('menuDetail.order.summaryPayment'),
    receiptTitle: t('menuDetail.order.receiptTitle'),
    receiptOrderId: t('menuDetail.order.receiptOrderId'),
    readinessLabel: t('menuDetail.order.readinessLabel'),
    readinessMinutes: t('menuDetail.order.readinessMinutes'),
    branchLocationLabel: t('menuDetail.order.branchLocationLabel'),
    deliveryStateLabel: t('menuDetail.order.deliveryStateLabel'),
    deliveryStates: {
      packing: t('menuDetail.order.deliveryStates.packing'),
      onTheWay: t('menuDetail.order.deliveryStates.onTheWay'),
      delivered: t('menuDetail.order.deliveryStates.delivered'),
    },
    validationRequired: t('menuDetail.order.validationRequired'),
  };
};
