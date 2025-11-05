import { StatCards } from "@/components/dashboard/stat-cards";
import { PaymentsChart } from "@/components/dashboard/payments-chart";
import { RecentPayments } from "@/components/dashboard/recent-payments";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <h1 className="font-headline text-3xl font-bold">Dashboard</h1>
      <StatCards />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PaymentsChart />
        </div>
        <div>
          <RecentPayments />
        </div>
      </div>
    </div>
  );
}
