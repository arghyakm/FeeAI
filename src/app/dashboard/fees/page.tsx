import { FeeBreakdown } from "@/components/fees/fee-breakdown";
import { InstallmentCalculator } from "@/components/fees/installment-calculator";

export default function FeesPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <h1 className="font-headline text-3xl font-bold">Fee Details</h1>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <FeeBreakdown />
        </div>
        <div className="lg:col-span-2">
          <InstallmentCalculator />
        </div>
      </div>
    </div>
  );
}
