'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { studentData } from "@/lib/data";
import { format } from 'date-fns';

export function StatCards() {
  const { totalFees, paidAmount, pendingAmount, nextDueDate } = studentData.dashboardStats;

  const stats = [
    { title: "Total Fees", value: `₹ ${totalFees.toLocaleString('en-IN')}` },
    { title: "Amount Paid", value: `₹ ${paidAmount.toLocaleString('en-IN')}` },
    { title: "Pending Dues", value: `₹ ${pendingAmount.toLocaleString('en-IN')}` },
    { title: "Next Due Date", value: format(new Date(nextDueDate), 'dd MMM, yyyy') },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
