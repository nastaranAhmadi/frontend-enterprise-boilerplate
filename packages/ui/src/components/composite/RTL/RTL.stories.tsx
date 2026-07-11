import type { ReactElement } from 'react';

import { RtlDecorator } from '../../../storybook/decorators/RtlDecorator';
import { Button } from '../../base/Button';
import { Input } from '../../base/Input';
import { Label } from '../../base/Label';
import { Radio } from '../../base/Radio';
import { Switch } from '../../base/Switch';
import { CheckboxField } from '../CheckboxField';
import { FormField } from '../FormField';
import { RadioGroup } from '../RadioGroup';
import { SelectField } from '../SelectField';
import { TextareaField } from '../TextareaField';

const SearchIcon = () => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-block',
      width: 14,
      height: 14,
      borderRadius: 999,
      border: '2px solid currentColor',
    }}
  />
);

const RtlShowcase = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    <FormField
      id="rtl-name"
      label="نام و نام خانوادگی"
      name="fullName"
      placeholder="مثلاً مریم احمدی"
      required
      helperText="همان‌طور که در مدارک شناسایی شما ثبت شده است."
    />

    <FormField
      id="rtl-email"
      label="ایمیل"
      name="email"
      type="email"
      placeholder="you@example.com"
      required
    />

    <Input
      aria-label="جستجو"
      placeholder="جستجو…"
      startAdornment={<SearchIcon />}
      endAdornment={<SearchIcon />}
    />

    <SelectField
      id="rtl-role"
      label="نقش"
      name="role"
      required
      helperText="نقش اصلی خود را انتخاب کنید."
    >
      <option value="">انتخاب نقش</option>
      <option value="designer">طراح</option>
      <option value="engineer">مهندس</option>
      <option value="manager">مدیر</option>
    </SelectField>

    <TextareaField
      id="rtl-bio"
      label="درباره من"
      name="bio"
      rows={3}
      placeholder="کمی درباره خودتان بنویسید"
      helperText="اختیاری — خلاصه‌ای کوتاه از پروفایل شما."
    />

    <RadioGroup
      name="rtl-plan"
      label="طرح اشتراک"
      helperText="بعداً می‌توانید تغییر دهید."
      defaultValue="pro"
      required
    >
      <Radio value="free" label="رایگان" />
      <Radio value="pro" label="حرفه‌ای" />
      <Radio value="team" label="تیمی" />
    </RadioGroup>

    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Switch id="rtl-notifications" name="notifications" defaultChecked />
      <Label htmlFor="rtl-notifications">اعلان‌های محصول را برای من ایمیل کن</Label>
    </div>

    <CheckboxField
      id="rtl-terms"
      name="terms"
      label="قوانین و سیاست حریم خصوصی را می‌پذیرم"
      required
      helperText="برای ایجاد حساب الزامی است."
    />

    <Button type="button" fullWidth>
      ایجاد حساب
    </Button>
  </div>
);

const meta = {
  title: 'Composite/RTL',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'RTL layout verification for form controls. Components mirror under dir="rtl" and Switch uses logical positioning.',
      },
    },
  },
  decorators: [RtlDecorator],
};

export default meta;

type RtlStory = {
  render?: () => ReactElement;
};

export const FormControls: RtlStory = {
  render: () => <RtlShowcase />,
};

export const SwitchStates: RtlStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Switch id="rtl-switch-off" aria-label="خاموش" />
        <Label htmlFor="rtl-switch-off">خاموش</Label>
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Switch id="rtl-switch-on" defaultChecked aria-label="روشن" />
        <Label htmlFor="rtl-switch-on">روشن</Label>
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Switch id="rtl-switch-disabled" defaultChecked disabled aria-label="غیرفعال" />
        <Label htmlFor="rtl-switch-disabled" disabled>
          غیرفعال
        </Label>
      </div>
    </div>
  ),
};
