'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { studentData, Payment } from "@/lib/data";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function RecentPayments() {
  const recentPayments = studentData.paymentHistory.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
        <CardDescription>A list of your last 5 transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPayments.map((payment: Payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{format(new Date(payment.date), 'dd MMM, yyyy')}</TableCell>
                <TableCell>₹ {payment.amount.toLocaleString('en-IN')}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell className="text-right">
                  <Badge 
                    variant={payment.status === 'Completed' ? 'default' : 'destructive'}
                    className={cn(payment.status === 'Completed' && 'bg-green-600 dark:bg-green-700')}
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
