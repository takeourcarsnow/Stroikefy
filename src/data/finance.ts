import { Invoice, Expense, Budget } from '@/types';

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2024-001',
    type: 'outgoing',
    status: 'paid',
    projectId: 'proj-006',
    projectName: 'Community Hospital Expansion',
    clientName: 'City Health Services',
    clientEmail: 'billing@cityhealth.org',
    clientAddress: '500 Health Avenue, Chicago, IL 60601',
    items: [
      { id: 'item-001', description: 'Final Construction Payment', quantity: 1, unitPrice: 5000000, total: 5000000 },
      { id: 'item-002', description: 'Change Order #15 - Additional ICU Units', quantity: 1, unitPrice: 850000, total: 850000 },
    ],
    subtotal: 5850000,
    tax: 0,
    total: 5850000,
    issueDate: new Date('2024-02-28'),
    dueDate: new Date('2024-03-28'),
    paidDate: new Date('2024-03-15'),
    notes: 'Final payment for completed project',
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2024-002',
    type: 'outgoing',
    status: 'sent',
    projectId: 'proj-001',
    projectName: 'Downtown Office Complex',
    clientName: 'MetroCity Developments',
    clientEmail: 'ap@metrocity.com',
    clientAddress: '123 Main Street, New York, NY 10001',
    items: [
      { id: 'item-003', description: 'Progress Payment - February 2024', quantity: 1, unitPrice: 1200000, total: 1200000 },
      { id: 'item-004', description: 'Steel Materials', quantity: 1, unitPrice: 450000, total: 450000 },
    ],
    subtotal: 1650000,
    tax: 0,
    total: 1650000,
    issueDate: new Date('2024-03-01'),
    dueDate: new Date('2024-03-31'),
    notes: 'Monthly progress payment',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2024-003',
    type: 'outgoing',
    status: 'overdue',
    projectId: 'proj-002',
    projectName: 'Riverside Residential Tower',
    clientName: 'Riverside Properties LLC',
    clientEmail: 'finance@riversideprops.com',
    clientAddress: '456 River Road, New York, NY 10002',
    items: [
      { id: 'item-005', description: 'Progress Payment - January 2024', quantity: 1, unitPrice: 2800000, total: 2800000 },
    ],
    subtotal: 2800000,
    tax: 0,
    total: 2800000,
    issueDate: new Date('2024-02-01'),
    dueDate: new Date('2024-03-01'),
    notes: 'OVERDUE - Please remit payment immediately',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-2024-004',
    type: 'incoming',
    status: 'paid',
    clientName: 'Steel Supply Co.',
    clientEmail: 'orders@steelsupply.com',
    items: [
      { id: 'item-006', description: 'Structural Steel Beams', quantity: 500, unitPrice: 450, total: 225000 },
      { id: 'item-007', description: 'Steel Plates', quantity: 200, unitPrice: 320, total: 64000 },
      { id: 'item-008', description: 'Delivery Fee', quantity: 1, unitPrice: 3500, total: 3500 },
    ],
    subtotal: 292500,
    tax: 23400,
    total: 315900,
    issueDate: new Date('2024-03-10'),
    dueDate: new Date('2024-04-10'),
    paidDate: new Date('2024-03-18'),
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-18'),
  },
  {
    id: 'inv-005',
    invoiceNumber: 'INV-2024-005',
    type: 'incoming',
    status: 'sent',
    clientName: 'Concrete Masters Inc.',
    clientEmail: 'billing@concretemasters.com',
    items: [
      { id: 'item-009', description: 'Ready-Mix Concrete (cubic yards)', quantity: 1200, unitPrice: 145, total: 174000 },
      { id: 'item-010', description: 'Pumping Service', quantity: 40, unitPrice: 800, total: 32000 },
    ],
    subtotal: 206000,
    tax: 16480,
    total: 222480,
    issueDate: new Date('2024-03-15'),
    dueDate: new Date('2024-04-15'),
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: 'inv-006',
    invoiceNumber: 'INV-2024-006',
    type: 'outgoing',
    status: 'draft',
    projectId: 'proj-004',
    projectName: 'Harbor Bridge Renovation',
    clientName: 'City Department of Transportation',
    clientEmail: 'ap@citygov.com',
    items: [
      { id: 'item-011', description: 'Progress Payment - March 2024', quantity: 1, unitPrice: 950000, total: 950000 },
    ],
    subtotal: 950000,
    tax: 0,
    total: 950000,
    issueDate: new Date('2024-03-20'),
    dueDate: new Date('2024-04-20'),
    notes: 'Draft - pending approval',
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
];

export const mockExpenses: Expense[] = [
  {
    id: 'exp-001',
    description: 'Steel reinforcement bars',
    amount: 45000,
    category: 'materials',
    status: 'approved',
    projectId: 'proj-001',
    projectName: 'Downtown Office Complex',
    employeeId: 'emp-001',
    employeeName: 'John Smith',
    date: new Date('2024-03-15'),
    approvedBy: 'Sarah Williams',
    approvedAt: new Date('2024-03-16'),
    createdAt: new Date('2024-03-15'),
  },
  {
    id: 'exp-002',
    description: 'Excavator rental - 2 weeks',
    amount: 12500,
    category: 'equipment',
    status: 'approved',
    projectId: 'proj-001',
    projectName: 'Downtown Office Complex',
    employeeId: 'emp-002',
    employeeName: 'Robert Johnson',
    date: new Date('2024-03-10'),
    approvedBy: 'Sarah Williams',
    approvedAt: new Date('2024-03-11'),
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'exp-003',
    description: 'Safety equipment purchase',
    amount: 3500,
    category: 'other',
    status: 'approved',
    employeeId: 'emp-007',
    employeeName: 'Sarah Martinez',
    date: new Date('2024-03-12'),
    approvedBy: 'Alex Johnson',
    approvedAt: new Date('2024-03-12'),
    notes: 'Hard hats, vests, and safety glasses',
    createdAt: new Date('2024-03-12'),
  },
  {
    id: 'exp-004',
    description: 'Concrete pump service',
    amount: 8200,
    category: 'labor',
    status: 'pending',
    projectId: 'proj-002',
    projectName: 'Riverside Residential Tower',
    employeeId: 'emp-004',
    employeeName: 'Michael Brown',
    date: new Date('2024-03-18'),
    createdAt: new Date('2024-03-18'),
  },
  {
    id: 'exp-005',
    description: 'Building permit renewal',
    amount: 2500,
    category: 'permits',
    status: 'approved',
    projectId: 'proj-004',
    projectName: 'Harbor Bridge Renovation',
    employeeId: 'emp-006',
    employeeName: 'Thomas Anderson',
    date: new Date('2024-03-05'),
    approvedBy: 'Sarah Williams',
    approvedAt: new Date('2024-03-06'),
    createdAt: new Date('2024-03-05'),
  },
  {
    id: 'exp-006',
    description: 'Material transport - 3 trips',
    amount: 4800,
    category: 'transportation',
    status: 'pending',
    projectId: 'proj-001',
    projectName: 'Downtown Office Complex',
    employeeId: 'emp-002',
    employeeName: 'Robert Johnson',
    date: new Date('2024-03-19'),
    createdAt: new Date('2024-03-19'),
  },
  {
    id: 'exp-007',
    description: 'Monthly site insurance premium',
    amount: 15000,
    category: 'insurance',
    status: 'reimbursed',
    employeeId: 'emp-001',
    employeeName: 'John Smith',
    date: new Date('2024-03-01'),
    approvedBy: 'Alex Johnson',
    approvedAt: new Date('2024-03-02'),
    createdAt: new Date('2024-03-01'),
  },
  {
    id: 'exp-008',
    description: 'Electrical supplies',
    amount: 6700,
    category: 'materials',
    status: 'rejected',
    projectId: 'proj-003',
    projectName: 'Green Valley Shopping Mall',
    employeeId: 'emp-003',
    employeeName: 'David Lee',
    date: new Date('2024-03-08'),
    notes: 'Rejected - project on hold',
    createdAt: new Date('2024-03-08'),
  },
];

export const mockBudgets: Budget[] = [
  {
    id: 'budget-001',
    projectId: 'proj-001',
    projectName: 'Downtown Office Complex',
    totalBudget: 12500000,
    allocated: 11000000,
    spent: 4200000,
    remaining: 8300000,
    categories: [
      { name: 'materials', allocated: 4500000, spent: 1800000 },
      { name: 'labor', allocated: 3500000, spent: 1400000 },
      { name: 'equipment', allocated: 1500000, spent: 520000 },
      { name: 'permits', allocated: 200000, spent: 180000 },
      { name: 'insurance', allocated: 300000, spent: 150000 },
      { name: 'other', allocated: 1000000, spent: 150000 },
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: 'budget-002',
    projectId: 'proj-002',
    projectName: 'Riverside Residential Tower',
    totalBudget: 28000000,
    allocated: 26500000,
    spent: 15400000,
    remaining: 12600000,
    categories: [
      { name: 'materials', allocated: 10000000, spent: 6200000 },
      { name: 'labor', allocated: 9000000, spent: 5100000 },
      { name: 'equipment', allocated: 3500000, spent: 2100000 },
      { name: 'permits', allocated: 500000, spent: 450000 },
      { name: 'insurance', allocated: 500000, spent: 350000 },
      { name: 'other', allocated: 3000000, spent: 1200000 },
    ],
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-03-19'),
  },
  {
    id: 'budget-003',
    projectId: 'proj-004',
    projectName: 'Harbor Bridge Renovation',
    totalBudget: 8500000,
    allocated: 8200000,
    spent: 2800000,
    remaining: 5700000,
    categories: [
      { name: 'materials', allocated: 2500000, spent: 900000 },
      { name: 'labor', allocated: 3000000, spent: 1100000 },
      { name: 'equipment', allocated: 1500000, spent: 500000 },
      { name: 'permits', allocated: 200000, spent: 150000 },
      { name: 'other', allocated: 1000000, spent: 150000 },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-18'),
  },
];

export const getInvoices = (filters?: { status?: string; type?: string }) => {
  let filtered = [...mockInvoices];

  if (filters?.status) {
    filtered = filtered.filter(i => i.status === filters.status);
  }

  if (filters?.type) {
    filtered = filtered.filter(i => i.type === filters.type);
  }

  return filtered;
};

export const getExpenses = (filters?: { status?: string; category?: string }) => {
  let filtered = [...mockExpenses];

  if (filters?.status) {
    filtered = filtered.filter(e => e.status === filters.status);
  }

  if (filters?.category) {
    filtered = filtered.filter(e => e.category === filters.category);
  }

  return filtered;
};

export const getBudgets = () => {
  return mockBudgets;
};

export const getMonthlyRevenue = () => {
  // Mock monthly revenue data
  return [
    { month: 'Jan', revenue: 1200000 },
    { month: 'Feb', revenue: 1350000 },
    { month: 'Mar', revenue: 1180000 },
    { month: 'Apr', revenue: 1420000 },
    { month: 'May', revenue: 1380000 },
    { month: 'Jun', revenue: 1520000 },
    { month: 'Jul', revenue: 1450000 },
    { month: 'Aug', revenue: 1580000 },
    { month: 'Sep', revenue: 1620000 },
    { month: 'Oct', revenue: 1480000 },
    { month: 'Nov', revenue: 1550000 },
    { month: 'Dec', revenue: 1680000 },
  ];
};

export const getProjectStatusDistribution = () => {
  const projects = mockBudgets.length;
  const completed = mockBudgets.filter(b => b.spent >= b.allocated * 0.95).length;
  const inProgress = projects - completed;
  
  return [
    { name: 'Completed', value: completed, color: '#10b981' },
    { name: 'In Progress', value: inProgress, color: '#3b82f6' },
  ];
};
