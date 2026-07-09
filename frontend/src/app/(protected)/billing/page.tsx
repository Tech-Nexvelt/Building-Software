import { BillingLayout } from '@/modules/billing/components/BillingLayout';

export const metadata = {
  title: 'Billing — Nexvelt POS',
};

export default function BillingPage() {
  return (
    <div className="h-full w-full bg-gray-50 overflow-hidden">
      <BillingLayout />
    </div>
  );
}
