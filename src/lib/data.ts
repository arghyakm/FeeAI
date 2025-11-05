export type Payment = {
  id: string;
  date: string;
  amount: number;
  method: 'Online' | 'Bank Transfer' | 'Cash';
  status: 'Completed' | 'Pending' | 'Failed';
  transactionId: string;
};

export type FeeBreakdownItem = {
  item: string;
  amount: number;
};

export type StudentData = {
  dashboardStats: {
    totalFees: number;
    paidAmount: number;
    pendingAmount: number;
    nextDueDate: string;
  };
  paymentHistory: Payment[];
  feeBreakdown: FeeBreakdownItem[];
  paymentTrend: { month: string; paid: number }[];
};

export const studentData: StudentData = {
  dashboardStats: {
    totalFees: 250000,
    paidAmount: 175000,
    pendingAmount: 75000,
    nextDueDate: '2024-08-15',
  },
  paymentHistory: [
    { id: '1', date: '2024-05-20', amount: 50000, method: 'Online', status: 'Completed', transactionId: 'TXN1234567890' },
    { id: '2', date: '2024-02-15', amount: 50000, method: 'Bank Transfer', status: 'Completed', transactionId: 'TXN2345678901' },
    { id: '3', date: '2023-11-10', amount: 50000, method: 'Online', status: 'Completed', transactionId: 'TXN3456789012' },
    { id: '4', date: '2023-08-05', amount: 25000, method: 'Online', status: 'Completed', transactionId: 'TXN4567890123' },
    { id: '5', date: '2023-07-01', amount: 25000, method: 'Cash', status: 'Failed', transactionId: 'N/A' },
  ],
  feeBreakdown: [
    { item: 'Tuition Fee', amount: 180000 },
    { item: 'Library Fee', amount: 10000 },
    { item: 'Lab Fee', amount: 20000 },
    { item: 'Examination Fee', amount: 15000 },
    { item: 'Student Welfare Fund', amount: 5000 },
    { item: 'Other Miscellaneous', amount: 20000 },
  ],
  paymentTrend: [
    { month: 'Jan', paid: 25000 },
    { month: 'Feb', paid: 30000 },
    { month: 'Mar', paid: 45000 },
    { month: 'Apr', paid: 20000 },
    { month: 'May', paid: 50000 },
    { month: 'Jun', paid: 15000 },
  ]
};
