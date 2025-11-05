'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { studentData } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function InstallmentCalculator() {
  const [tenure, setTenure] = useState('3');
  const [monthlyInstallment, setMonthlyInstallment] = useState<number | null>(null);
  const pendingAmount = studentData.dashboardStats.pendingAmount;
  const { toast } = useToast();

  const calculateInstallment = () => {
    const numTenure = parseInt(tenure, 10);
    if (numTenure > 0) {
      setMonthlyInstallment(pendingAmount / numTenure);
    }
  };

  const handleDownloadChallan = () => {
    toast({
      title: "Challan Download",
      description: "Your challan download will start shortly.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <h3 className="text-md font-semibold mb-2">Installment Calculator</h3>
            <div className="flex items-end gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="tenure">Select Tenure (Months)</Label>
                <Select value={tenure} onValueChange={setTenure}>
                  <SelectTrigger id="tenure">
                    <SelectValue placeholder="Select tenure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Months</SelectItem>
                    <SelectItem value="6">6 Months</SelectItem>
                    <SelectItem value="9">9 Months</SelectItem>
                    <SelectItem value="12">12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={calculateInstallment}>Calculate</Button>
            </div>
            {monthlyInstallment !== null && (
              <div className="mt-4 rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">Monthly Installment</p>
                <p className="text-2xl font-bold">
                  ₹ {monthlyInstallment.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            )}
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2">Download Fee Challan</h3>
           <p className="text-sm text-muted-foreground mb-3">Download a copy of your fee challan for your records.</p>
          <Button onClick={handleDownloadChallan}>Download Your Challan</Button>
        </div>
      </CardContent>
    </Card>
  );
}
