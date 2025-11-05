'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table";
import { studentData } from "@/lib/data";

export function FeeBreakdown() {
  const { feeBreakdown, dashboardStats } = studentData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fee Structure</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feeBreakdown.map((item) => (
              <TableRow key={item.item}>
                <TableCell>{item.item}</TableCell>
                <TableCell className="text-right">₹ {item.amount.toLocaleString('en-IN')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
           <TableFooter>
            <TableRow className="font-bold text-lg">
              <TableCell>Total Fees</TableCell>
              <TableCell className="text-right">₹ {dashboardStats.totalFees.toLocaleString('en-IN')}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
