import { PaymentForm } from "@/components/payment/payment-form";

export default function PayPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <h1 className="font-headline text-3xl font-bold">Make a Payment</h1>
      <div className="flex justify-center">
        <PaymentForm />
      </div>
    </div>
  );
}
