'use client';

import React, { useState } from 'react';
import { Card, CardHeader, Button, Badge, Input, Select, Tabs, Table, Modal, ModalFooter, Progress, EmptyState, Textarea } from '@/components/ui';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { mockInvoices, mockExpenses, mockBudgets, mockProjects } from '@/data';
import { INVOICE_STATUS_COLORS, EXPENSE_STATUS_COLORS, Invoice, Expense, Budget } from '@/types';
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CreditCard,
  Receipt,
  PieChart,
  Building,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [invoiceFilter, setInvoiceFilter] = useState<string>('all');
  const [expenseFilter, setExpenseFilter] = useState<string>('all');
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showNewExpenseModal, setShowNewExpenseModal] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'invoices', label: 'Invoices', count: mockInvoices.length },
    { id: 'expenses', label: 'Expenses', count: mockExpenses.length },
    { id: 'budgets', label: 'Budgets' },
  ];

  const invoiceStatusOptions = [
    { value: 'all', label: 'All Invoices' },
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const expenseStatusOptions = [
    { value: 'all', label: 'All Expenses' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'reimbursed', label: 'Reimbursed' },
  ];

  const filteredInvoices = mockInvoices.filter(inv => 
    invoiceFilter === 'all' || inv.status === invoiceFilter
  );

  const filteredExpenses = mockExpenses.filter(exp => 
    expenseFilter === 'all' || exp.status === expenseFilter
  );

  // Calculate stats
  const totalInvoiced = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const totalPending = mockInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.total, 0);
  const totalExpenses = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalBudget = mockBudgets.reduce((sum, b) => sum + b.total, 0);
  const totalSpent = mockBudgets.reduce((sum, b) => sum + b.spent, 0);

  // Chart data
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 85000, expenses: 52000 },
    { month: 'Feb', revenue: 92000, expenses: 48000 },
    { month: 'Mar', revenue: 78000, expenses: 55000 },
    { month: 'Apr', revenue: 110000, expenses: 62000 },
    { month: 'May', revenue: 125000, expenses: 58000 },
    { month: 'Jun', revenue: 118000, expenses: 65000 },
  ];

  const expenseCategoryData = [
    { name: 'Materials', value: 45000, color: '#ec751a' },
    { name: 'Labor', value: 35000, color: '#3b82f6' },
    { name: 'Equipment', value: 15000, color: '#10b981' },
    { name: 'Transportation', value: 8000, color: '#f59e0b' },
    { name: 'Other', value: 5000, color: '#8b5cf6' },
  ];

  const invoiceColumns = [
    {
      key: 'number',
      header: 'Invoice #',
      render: (invoice: Invoice) => (
        <span className="font-medium text-surface-900 dark:text-white">{invoice.invoiceNumber}</span>
      ),
    },
    {
      key: 'client',
      header: 'Client',
      render: (invoice: Invoice) => invoice.clientName,
    },
    {
      key: 'project',
      header: 'Project',
      render: (invoice: Invoice) => {
        const project = mockProjects.find(p => p.id === invoice.projectId);
        return project?.name || '-';
      },
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (invoice: Invoice) => formatCurrency(invoice.total),
    },
    {
      key: 'date',
      header: 'Date',
      render: (invoice: Invoice) => formatDate(invoice.issueDate),
    },
    {
      key: 'due',
      header: 'Due',
      render: (invoice: Invoice) => formatDate(invoice.dueDate),
    },
    {
      key: 'status',
      header: 'Status',
      render: (invoice: Invoice) => (
        <Badge variant="custom" className={INVOICE_STATUS_COLORS[invoice.status]}>
          {invoice.status}
        </Badge>
      ),
    },
  ];

  const expenseColumns = [
    {
      key: 'description',
      header: 'Description',
      render: (expense: Expense) => (
        <span className="font-medium text-surface-900 dark:text-white">{expense.description}</span>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (expense: Expense) => (
        <Badge variant="outline">{expense.category}</Badge>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (expense: Expense) => formatCurrency(expense.amount),
    },
    {
      key: 'date',
      header: 'Date',
      render: (expense: Expense) => formatDate(expense.date),
    },
    {
      key: 'submittedBy',
      header: 'Submitted By',
      render: (expense: Expense) => expense.submittedBy,
    },
    {
      key: 'status',
      header: 'Status',
      render: (expense: Expense) => (
        <Badge variant="custom" className={EXPENSE_STATUS_COLORS[expense.status]}>
          {expense.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Finance</h1>
          <p className="text-surface-500">Manage invoices, expenses, and budgets</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowNewInvoiceModal(true)}>
            New Invoice
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">Total Revenue</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{formatCurrency(totalInvoiced)}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">Received</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{formatCurrency(totalPaid)}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
              <Receipt className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">Pending</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{formatCurrency(totalPending)}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">Expenses</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{formatCurrency(totalExpenses)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue vs Expenses Chart */}
            <Card>
              <CardHeader title="Revenue vs Expenses" />
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" stroke="var(--color-text-secondary)" />
                    <YAxis stroke="var(--color-text-secondary)" tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenue"
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.2} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="expenses" 
                      name="Expenses"
                      stroke="#ef4444" 
                      fill="#ef4444" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Expense Categories */}
            <Card>
              <CardHeader title="Expenses by Category" />
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={expenseCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {expenseCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Invoices */}
            <Card>
              <CardHeader 
                title="Recent Invoices" 
                action={
                  <button 
                    onClick={() => setActiveTab('invoices')}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    View all
                  </button>
                }
              />
              <div className="space-y-3">
                {mockInvoices.slice(0, 5).map(invoice => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30">
                        <ArrowUpRight className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-surface-900 dark:text-white">{invoice.clientName}</p>
                        <p className="text-sm text-surface-500">{invoice.invoiceNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-surface-900 dark:text-white">{formatCurrency(invoice.total)}</p>
                      <Badge variant="custom" className={INVOICE_STATUS_COLORS[invoice.status]} size="sm">
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Expenses */}
            <Card>
              <CardHeader 
                title="Recent Expenses" 
                action={
                  <button 
                    onClick={() => setActiveTab('expenses')}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    View all
                  </button>
                }
              />
              <div className="space-y-3">
                {mockExpenses.slice(0, 5).map(expense => (
                  <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30">
                        <ArrowDownRight className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-surface-900 dark:text-white">{expense.description}</p>
                        <p className="text-sm text-surface-500">{expense.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">-{formatCurrency(expense.amount)}</p>
                      <Badge variant="custom" className={EXPENSE_STATUS_COLORS[expense.status]} size="sm">
                        {expense.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <Select
                options={invoiceStatusOptions}
                value={invoiceFilter}
                onChange={setInvoiceFilter}
                className="w-40"
              />
            </div>
            <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowNewInvoiceModal(true)}>
              New Invoice
            </Button>
          </div>

          {filteredInvoices.length > 0 ? (
            <Card className="p-0 overflow-hidden">
              <Table columns={invoiceColumns} data={filteredInvoices} />
            </Card>
          ) : (
            <EmptyState
              icon={FileText}
              title="No invoices found"
              description="Create your first invoice to get started"
              action={
                <Button onClick={() => setShowNewInvoiceModal(true)} leftIcon={<Plus className="h-4 w-4" />}>
                  New Invoice
                </Button>
              }
            />
          )}
        </div>
      )}

      {/* Expenses Tab */}
      {activeTab === 'expenses' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <Select
                options={expenseStatusOptions}
                value={expenseFilter}
                onChange={setExpenseFilter}
                className="w-40"
              />
            </div>
            <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowNewExpenseModal(true)}>
              Add Expense
            </Button>
          </div>

          {filteredExpenses.length > 0 ? (
            <Card className="p-0 overflow-hidden">
              <Table columns={expenseColumns} data={filteredExpenses} />
            </Card>
          ) : (
            <EmptyState
              icon={Receipt}
              title="No expenses found"
              description="Record your first expense"
              action={
                <Button onClick={() => setShowNewExpenseModal(true)} leftIcon={<Plus className="h-4 w-4" />}>
                  Add Expense
                </Button>
              }
            />
          )}
        </div>
      )}

      {/* Budgets Tab */}
      {activeTab === 'budgets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <div className="text-center">
                <p className="text-sm text-surface-500 mb-1">Total Budget</p>
                <p className="text-3xl font-bold text-surface-900 dark:text-white">{formatCurrency(totalBudget)}</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-sm text-surface-500 mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-red-600">{formatCurrency(totalSpent)}</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-sm text-surface-500 mb-1">Remaining</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(totalBudget - totalSpent)}</p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockBudgets.map(budget => {
              const project = mockProjects.find(p => p.id === budget.projectId);
              const percentage = (budget.spent / budget.total) * 100;
              const isOverBudget = percentage > 100;
              
              return (
                <Card key={budget.id}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-surface-900 dark:text-white">{project?.name || 'Project Budget'}</h3>
                      <p className="text-sm text-surface-500">{budget.period}</p>
                    </div>
                    <Badge variant={isOverBudget ? 'danger' : percentage > 80 ? 'warning' : 'success'}>
                      {isOverBudget ? 'Over Budget' : percentage > 80 ? 'Near Limit' : 'On Track'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-500">Spent</span>
                      <span className="font-medium text-surface-900 dark:text-white">
                        {formatCurrency(budget.spent)} / {formatCurrency(budget.total)}
                      </span>
                    </div>
                    <Progress value={Math.min(percentage, 100)} variant={isOverBudget ? 'danger' : percentage > 80 ? 'warning' : 'primary'} />
                    
                    <div className="pt-3 border-t border-surface-200 dark:border-surface-700">
                      <p className="text-sm text-surface-500 mb-2">Categories</p>
                      {budget.categories.slice(0, 3).map((cat, idx) => (
                        <div key={idx} className="flex justify-between text-sm mb-1">
                          <span className="text-surface-600 dark:text-surface-400">{cat.name}</span>
                          <span className="text-surface-900 dark:text-white">
                            {formatCurrency(cat.spent)} / {formatCurrency(cat.allocated)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* New Invoice Modal */}
      <Modal
        isOpen={showNewInvoiceModal}
        onClose={() => setShowNewInvoiceModal(false)}
        title="Create New Invoice"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Invoice Number" placeholder="INV-001" />
            <Select
              label="Project"
              options={mockProjects.map(p => ({ value: p.id, label: p.name }))}
              placeholder="Select project"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Client Name" placeholder="Client name" />
            <Input label="Client Email" type="email" placeholder="client@example.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Issue Date" type="date" />
            <Input label="Due Date" type="date" />
          </div>
          <Textarea label="Description" placeholder="Invoice description..." />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Subtotal" type="number" placeholder="0.00" leftIcon={<DollarSign className="h-4 w-4" />} />
            <Input label="Tax (%)" type="number" placeholder="10" />
          </div>
        </form>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowNewInvoiceModal(false)}>Cancel</Button>
          <Button>Create Invoice</Button>
        </ModalFooter>
      </Modal>

      {/* New Expense Modal */}
      <Modal
        isOpen={showNewExpenseModal}
        onClose={() => setShowNewExpenseModal(false)}
        title="Add New Expense"
        size="md"
      >
        <form className="space-y-4">
          <Input label="Description" placeholder="Expense description" />
          <Select
            label="Category"
            options={[
              { value: 'materials', label: 'Materials' },
              { value: 'labor', label: 'Labor' },
              { value: 'equipment', label: 'Equipment' },
              { value: 'transportation', label: 'Transportation' },
              { value: 'other', label: 'Other' },
            ]}
            placeholder="Select category"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Amount" type="number" placeholder="0.00" leftIcon={<DollarSign className="h-4 w-4" />} />
            <Input label="Date" type="date" />
          </div>
          <Select
            label="Project"
            options={mockProjects.map(p => ({ value: p.id, label: p.name }))}
            placeholder="Select project (optional)"
          />
          <Input label="Receipt URL" type="url" placeholder="https://..." />
        </form>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowNewExpenseModal(false)}>Cancel</Button>
          <Button>Add Expense</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
