'use client';

import { Button, FormField, Radio, RadioGroup } from '@enterprise/ui';
import { useEffect, useMemo, useState } from 'react';

import { mockMenuBranches } from '@/_mocks/menu/branches';
import {
  buildOrderSteps,
  type OrderDeliveryState,
  type OrderPaymentMethod,
  type OrderPickupMode,
  type OrderPrepMode,
  type OrderSeating,
  type OrderServiceMode,
  type OrderStepId,
} from '@/features/menu/components/build-order-steps';
import type { FoodOrderStepperLabels } from '@/features/menu/get-menu-order-labels';

/** Flip `isLoggedIn` to `false` to preview the login gate. */
const getMockSession = (): { isLoggedIn: boolean; phone: string } => ({
  isLoggedIn: true,
  phone: '+81 90 1234 5678',
});

const READINESS_MINUTES = 18;
const MOCK_ORDER_ID = 'SN-1042';
const CURRENT_DELIVERY_STATE: OrderDeliveryState = 'packing';
const DEFAULT_BRANCH_ID = mockMenuBranches[0]?.id ?? 'shibuya';

type FoodOrderStepperProps = {
  labels: FoodOrderStepperLabels;
  dishName: string;
};

const StepMarker = ({
  index,
  isComplete,
  isActive,
  isPending,
}: {
  index: number;
  isComplete: boolean;
  isActive: boolean;
  isPending: boolean;
}) => (
  <span className="relative z-10 flex shrink-0 flex-col items-center">
    {isComplete ? (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none">
          <path
            d="M5 10.5 8.5 14 15 6.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    ) : null}
    {isActive ? (
      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary">
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
      </span>
    ) : null}
    {isPending ? (
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-xs font-medium text-muted-foreground">
        {index + 1}
      </span>
    ) : null}
  </span>
);

export const FoodOrderStepper = ({ labels, dishName }: FoodOrderStepperProps) => {
  const session = getMockSession();
  const [activeIndex, setActiveIndex] = useState(0);
  const [prepMode, setPrepMode] = useState<OrderPrepMode>('cooked');
  const [quantity, setQuantity] = useState(1);
  const [serviceMode, setServiceMode] = useState<OrderServiceMode>('dineIn');
  const [seating, setSeating] = useState<OrderSeating>('wait');
  const [pickupMode, setPickupMode] = useState<OrderPickupMode>('self');
  const [partySize, setPartySize] = useState(2);
  const [reserveTime, setReserveTime] = useState('');
  const [phone, setPhone] = useState(session.isLoggedIn ? session.phone : '');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [branchId, setBranchId] = useState(DEFAULT_BRANCH_ID);
  const [paymentMethod, setPaymentMethod] = useState<OrderPaymentMethod>('card');
  const [note, setNote] = useState('');
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps = useMemo(
    () =>
      buildOrderSteps({
        isLoggedIn: session.isLoggedIn,
        prepMode,
        serviceMode,
        seating,
        pickupMode,
        paid,
      }),
    [session.isLoggedIn, prepMode, serviceMode, seating, pickupMode, paid],
  );

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, Math.max(steps.length - 1, 0)));
  }, [steps]);

  const selectedBranch = mockMenuBranches.find((branch) => branch.id === branchId);
  const activeStepId = steps[activeIndex] ?? 'prepMode';
  const formattedAddress = [addressLine, city, postal].filter(Boolean).join(', ');

  const needsAddress = prepMode === 'raw' || (serviceMode === 'takeaway' && pickupMode === 'send');

  const validateStep = (stepId: OrderStepId): boolean => {
    if (stepId === 'address') {
      return Boolean(addressLine.trim() && city.trim() && postal.trim() && phone.trim());
    }
    if (stepId === 'reservation') {
      return Boolean(reserveTime.trim() && partySize >= 1);
    }
    if (stepId === 'branch') {
      return Boolean(branchId);
    }
    if (stepId === 'payment') {
      return !needsAddress || Boolean(phone.trim());
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep(activeStepId)) {
      setError(labels.validationRequired);
      return;
    }
    setError(null);
    setActiveIndex((index) => Math.min(index + 1, steps.length - 1));
  };

  const goBack = () => {
    setError(null);
    setActiveIndex((index) => Math.max(index - 1, 0));
  };

  const pay = () => {
    if (!validateStep('payment')) {
      setError(labels.validationRequired);
      return;
    }
    setError(null);
    setPaid(true);
    setActiveIndex(0);
  };

  if (!session.isLoggedIn) {
    return (
      <section className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-surface p-md sm:p-lg">
        <h2 className="text-lg font-semibold text-foreground">{labels.title}</h2>
        <div className="mt-lg rounded-xl border border-border bg-background p-md">
          <p className="text-base font-medium text-foreground">{labels.loginTitle}</p>
          <p className="mt-xs text-sm text-muted-foreground">{labels.loginBody}</p>
          <Button type="button" variant="filled" size="small" className="mt-md">
            {labels.loginCta}
          </Button>
        </div>
      </section>
    );
  }

  const renderStepBody = (stepId: OrderStepId) => {
    switch (stepId) {
      case 'prepMode':
        return (
          <div className="space-y-sm">
            <RadioGroup
              name="prep-mode"
              label={labels.steps.prepMode.title}
              value={prepMode}
              onChange={(event) => {
                setPrepMode(event.target.value as OrderPrepMode);
                setActiveIndex(0);
              }}
            >
              <Radio value="cooked" label={labels.prepModes.cooked} />
              <Radio value="raw" label={labels.prepModes.raw} />
            </RadioGroup>
            <p className="text-xs text-muted-foreground">{labels.prepHints[prepMode]}</p>
          </div>
        );

      case 'quantity':
        return (
          <div>
            <p className="mb-xs text-sm font-medium text-foreground">{labels.quantityLabel}</p>
            <div className="inline-flex items-center gap-sm rounded-lg border border-border bg-surface px-sm py-xs">
              <Button
                type="button"
                variant="ghost"
                size="small"
                className="h-8 w-8 rounded-md px-0"
                aria-label={labels.decreaseQty}
                onClick={() => {
                  setQuantity((value) => Math.max(1, value - 1));
                }}
              >
                −
              </Button>
              <span className="min-w-8 text-center tabular-nums">{quantity}</span>
              <Button
                type="button"
                variant="ghost"
                size="small"
                className="h-8 w-8 rounded-md px-0"
                aria-label={labels.increaseQty}
                onClick={() => {
                  setQuantity((value) => value + 1);
                }}
              >
                +
              </Button>
            </div>
          </div>
        );

      case 'serviceMode':
        return (
          <RadioGroup
            name="service-mode"
            label={labels.steps.serviceMode.title}
            value={serviceMode}
            onChange={(event) => {
              setServiceMode(event.target.value as OrderServiceMode);
            }}
          >
            <Radio value="dineIn" label={labels.serviceModes.dineIn} />
            <Radio value="takeaway" label={labels.serviceModes.takeaway} />
          </RadioGroup>
        );

      case 'seating':
        return (
          <RadioGroup
            name="seating"
            label={labels.steps.seating.title}
            value={seating}
            onChange={(event) => {
              setSeating(event.target.value as OrderSeating);
            }}
          >
            <Radio value="reserve" label={labels.seating.reserve} />
            <Radio value="wait" label={labels.seating.wait} />
          </RadioGroup>
        );

      case 'reservation':
        return (
          <div className="space-y-md">
            <div>
              <p className="mb-xs text-sm font-medium text-foreground">{labels.partySizeLabel}</p>
              <div className="inline-flex items-center gap-sm rounded-lg border border-border bg-surface px-sm py-xs">
                <Button
                  type="button"
                  variant="ghost"
                  size="small"
                  className="h-8 w-8 rounded-md px-0"
                  aria-label={labels.decreaseQty}
                  onClick={() => {
                    setPartySize((value) => Math.max(1, value - 1));
                  }}
                >
                  −
                </Button>
                <span className="min-w-8 text-center tabular-nums">{partySize}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="small"
                  className="h-8 w-8 rounded-md px-0"
                  aria-label={labels.increaseQty}
                  onClick={() => {
                    setPartySize((value) => value + 1);
                  }}
                >
                  +
                </Button>
              </div>
            </div>
            <FormField
              label={labels.reserveTimeLabel}
              type="time"
              value={reserveTime}
              onChange={(event) => {
                setReserveTime(event.target.value);
              }}
            />
            <FormField
              label={labels.phoneLabel}
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
        );

      case 'pickupMode':
        return (
          <RadioGroup
            name="pickup-mode"
            label={labels.steps.pickupMode.title}
            value={pickupMode}
            onChange={(event) => {
              setPickupMode(event.target.value as OrderPickupMode);
            }}
          >
            <Radio value="self" label={labels.pickupModes.self} />
            <Radio value="send" label={labels.pickupModes.send} />
          </RadioGroup>
        );

      case 'address':
        return (
          <div className="space-y-md">
            <FormField
              label={labels.addressLineLabel}
              value={addressLine}
              onChange={(event) => {
                setAddressLine(event.target.value);
              }}
            />
            <FormField
              label={labels.cityLabel}
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
            <FormField
              label={labels.postalLabel}
              value={postal}
              onChange={(event) => {
                setPostal(event.target.value);
              }}
            />
            <FormField
              label={labels.phoneLabel}
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
        );

      case 'branch':
        return (
          <RadioGroup
            name="branch"
            label={labels.branchLabel}
            value={branchId}
            onChange={(event) => {
              setBranchId(event.target.value);
            }}
          >
            {mockMenuBranches.map((branch) => (
              <Radio
                key={branch.id}
                value={branch.id}
                label={`${branch.name} — ${branch.address}`}
              />
            ))}
          </RadioGroup>
        );

      case 'payment':
        return (
          <div className="space-y-md">
            <dl className="space-y-xs text-sm">
              <div className="flex justify-between gap-md">
                <dt className="text-muted-foreground">{labels.summaryDish}</dt>
                <dd className="font-medium text-foreground">{dishName}</dd>
              </div>
              <div className="flex justify-between gap-md">
                <dt className="text-muted-foreground">{labels.summaryPrep}</dt>
                <dd className="text-foreground">{labels.prepModes[prepMode]}</dd>
              </div>
              <div className="flex justify-between gap-md">
                <dt className="text-muted-foreground">{labels.summaryQty}</dt>
                <dd className="text-foreground">× {quantity}</dd>
              </div>
              {prepMode === 'cooked' ? (
                <>
                  <div className="flex justify-between gap-md">
                    <dt className="text-muted-foreground">{labels.summaryService}</dt>
                    <dd className="text-foreground">{labels.serviceModes[serviceMode]}</dd>
                  </div>
                  {serviceMode === 'dineIn' ? (
                    <div className="flex justify-between gap-md">
                      <dt className="text-muted-foreground">{labels.summarySeating}</dt>
                      <dd className="text-foreground">{labels.seating[seating]}</dd>
                    </div>
                  ) : (
                    <div className="flex justify-between gap-md">
                      <dt className="text-muted-foreground">{labels.summaryPickup}</dt>
                      <dd className="text-foreground">{labels.pickupModes[pickupMode]}</dd>
                    </div>
                  )}
                  {selectedBranch ? (
                    <div className="flex justify-between gap-md">
                      <dt className="text-muted-foreground">{labels.summaryBranch}</dt>
                      <dd className="text-end text-foreground">{selectedBranch.name}</dd>
                    </div>
                  ) : null}
                </>
              ) : null}
              {formattedAddress ? (
                <div className="flex justify-between gap-md">
                  <dt className="text-muted-foreground">{labels.summaryAddress}</dt>
                  <dd className="text-end text-foreground">{formattedAddress}</dd>
                </div>
              ) : null}
              {phone ? (
                <div className="flex justify-between gap-md">
                  <dt className="text-muted-foreground">{labels.summaryPhone}</dt>
                  <dd className="text-foreground">{phone}</dd>
                </div>
              ) : null}
            </dl>

            <RadioGroup
              name="payment-method"
              label={labels.summaryPayment}
              value={paymentMethod}
              onChange={(event) => {
                setPaymentMethod(event.target.value as OrderPaymentMethod);
              }}
            >
              <Radio value="card" label={labels.paymentMethods.card} />
              <Radio value="wallet" label={labels.paymentMethods.wallet} />
            </RadioGroup>

            <FormField
              label={labels.noteLabel}
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
              }}
            />
          </div>
        );

      case 'receipt':
        return (
          <div className="space-y-md">
            <div>
              <p className="text-base font-medium text-foreground">{labels.receiptTitle}</p>
              <p className="mt-xs text-sm text-muted-foreground">
                {labels.receiptOrderId.replace('{id}', MOCK_ORDER_ID)}
              </p>
            </div>

            <dl className="space-y-xs text-sm">
              <div className="flex justify-between gap-md">
                <dt className="text-muted-foreground">{labels.summaryDish}</dt>
                <dd className="font-medium text-foreground">
                  {dishName} × {quantity}
                </dd>
              </div>
              <div className="flex justify-between gap-md">
                <dt className="text-muted-foreground">{labels.summaryPrep}</dt>
                <dd className="text-foreground">{labels.prepModes[prepMode]}</dd>
              </div>
              <div className="flex justify-between gap-md">
                <dt className="text-muted-foreground">{labels.summaryPayment}</dt>
                <dd className="text-foreground">{labels.paymentMethods[paymentMethod]}</dd>
              </div>
            </dl>

            {prepMode === 'raw' ? (
              <div>
                <p className="mb-xs text-sm font-medium text-foreground">
                  {labels.deliveryStateLabel}
                </p>
                <ul className="space-y-xs text-sm">
                  {(Object.keys(labels.deliveryStates) as OrderDeliveryState[]).map((state) => {
                    const isCurrent = state === CURRENT_DELIVERY_STATE;
                    return (
                      <li
                        key={state}
                        className={isCurrent ? 'font-medium text-primary' : 'text-muted-foreground'}
                      >
                        {labels.deliveryStates[state]}
                        {isCurrent ? ' ·' : ''}
                      </li>
                    );
                  })}
                </ul>
                {formattedAddress ? (
                  <p className="mt-sm text-sm text-muted-foreground">{formattedAddress}</p>
                ) : null}
              </div>
            ) : (
              <div className="space-y-sm">
                <div>
                  <p className="text-sm font-medium text-foreground">{labels.readinessLabel}</p>
                  <p className="mt-xs text-2xl font-semibold tabular-nums text-foreground">
                    {labels.readinessMinutes.replace('{minutes}', String(READINESS_MINUTES))}
                  </p>
                </div>
                {selectedBranch ? (
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {labels.branchLocationLabel}
                    </p>
                    <p className="mt-xs text-sm text-foreground">{selectedBranch.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedBranch.address}</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="flex h-full min-w-0 flex-col self-start rounded-2xl border border-border bg-surface p-md sm:p-lg">
      <h2 className="text-lg font-semibold text-foreground">{labels.title}</h2>

      <ol className="relative mt-lg flex flex-col gap-0">
        {steps.map((stepId, index) => {
          const step =
            stepId === 'login'
              ? { title: labels.loginTitle, description: labels.loginBody }
              : labels.steps[stepId];
          const isComplete = index < activeIndex || (paid && stepId !== 'receipt');
          const isActive = index === activeIndex;
          const isPending = index > activeIndex;

          return (
            <li key={`${stepId}-${String(index)}`} className="relative flex gap-md pb-lg last:pb-0">
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={[
                    'absolute start-[0.94rem] top-8 h-[calc(100%-1.25rem)] w-px',
                    isComplete ? 'bg-primary' : 'border-s border-dashed border-border',
                  ].join(' ')}
                />
              ) : null}

              <StepMarker
                index={index}
                isComplete={isComplete && !isActive}
                isActive={isActive}
                isPending={isPending}
              />

              <div className="min-w-0 flex-1 pt-0.5">
                <p
                  className={[
                    'text-sm font-semibold',
                    isActive
                      ? 'text-primary'
                      : isPending
                        ? 'text-muted-foreground'
                        : 'text-foreground',
                  ].join(' ')}
                >
                  {step.title}
                </p>
                <p
                  className={[
                    'text-xs',
                    isActive ? 'text-primary/80' : 'text-muted-foreground',
                  ].join(' ')}
                >
                  {step.description}
                </p>

                {isActive ? (
                  <div className="mt-md space-y-md rounded-xl border border-border bg-background p-md">
                    {renderStepBody(stepId)}

                    {error ? <p className="text-sm text-error">{error}</p> : null}

                    {stepId !== 'receipt' ? (
                      <div className="flex flex-wrap gap-sm pt-xs">
                        {activeIndex > 0 ? (
                          <Button type="button" variant="outlined" size="small" onClick={goBack}>
                            {labels.back}
                          </Button>
                        ) : null}
                        {stepId === 'payment' ? (
                          <Button type="button" variant="filled" size="small" onClick={pay}>
                            {labels.payNow}
                          </Button>
                        ) : (
                          <Button type="button" variant="filled" size="small" onClick={goNext}>
                            {labels.continue}
                          </Button>
                        )}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
