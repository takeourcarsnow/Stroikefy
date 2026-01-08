'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, Button, Badge, Input, Select, Avatar, Modal, ModalFooter, Table, EmptyState } from '@/components/ui';
import { cn, formatDate, formatCurrency } from '@/lib/utils';
import { useEmployees, useTimeEntries } from '@/hooks/data-hooks';
import { EMPLOYEE_STATUS_COLORS, Employee, EmployeeStatus, TimeEntry } from '@/types';
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Download,
  Upload,
  MoreVertical,
  User,
  Briefcase,
  DollarSign,
} from 'lucide-react';
import { useTranslation } from '@/hooks';

export default function WorkforcePage() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const { data: employees = [], isLoading: employeesLoading } = useEmployees();
  const { data: timeEntries = [], isLoading: timeEntriesLoading } = useTimeEntries();

  const isLoading = employeesLoading || timeEntriesLoading;

  if (isLoading) {
    return <div>Loading workforce data...</div>;
  }

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'on-leave', label: 'On Leave' },
    { value: 'sick', label: 'Sick' },
    { value: 'terminated', label: 'Terminated' },
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'Construction', label: 'Construction' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Management', label: 'Management' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Safety', label: 'Safety' },
    { value: 'Logistics', label: 'Logistics' },
  ];

  const filteredEmployees = (employees || []).filter((employee: Employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const tableColumns = [
    {
      key: 'name',
      header: t('workforce.table.employee'),
      render: (employee: Employee) => (
        <div className="flex items-center gap-3">
          <Avatar src={employee.avatar} name={employee.name} size="sm" />
          <div>
            <Link 
              href={`/workforce/${employee.id}`}
              className="font-medium text-surface-900 dark:text-white hover:text-primary-600"
            >
              {employee.name}
            </Link>
            <p className="text-xs text-surface-500">{employee.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'position',
      header: t('workforce.table.position'),
      render: (employee: Employee) => (
        <div>
          <p className="text-surface-900 dark:text-white">{employee.position}</p>
          <p className="text-xs text-surface-500">{employee.department}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('workforce.table.status'),
      render: (employee: Employee) => (
        <Badge variant="custom" className={EMPLOYEE_STATUS_COLORS[employee.status as keyof typeof EMPLOYEE_STATUS_COLORS]}>
          {employee.status.replace('-', ' ')}
        </Badge>
      ),
    },
    {
      key: 'phone',
      header: t('workforce.table.phone'),
      render: (employee: Employee) => (
        <span className="text-surface-600 dark:text-surface-400">{employee.phone}</span>
      ),
    },
    {
      key: 'hourlyRate',
      header: t('workforce.table.rate'),
      render: (employee: Employee) => {
        const hourlyRate = employee.salary / 2080;
        return (
          <span className="font-medium text-surface-900 dark:text-white">
            {formatCurrency(hourlyRate)}/hr
          </span>
        );
      },
    },
    {
      key: 'hireDate',
      header: t('workforce.table.hireDate'),
      render: (employee: Employee) => (
        <span className="text-surface-600 dark:text-surface-400">
          {formatDate(employee.hireDate)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (employee: Employee) => (
        <Link
          href={`/workforce/${employee.id}`}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          {t('common.view')}
        </Link>
      ),
    },
  ];

  // Stats
  const activeCount = (employees || []).filter((e: Employee) => e.status === 'active').length;
  const onLeaveCount = (employees || []).filter((e: Employee) => e.status === 'on-leave').length;
  const totalHours = (timeEntries || []).reduce((sum: number, entry: TimeEntry) => sum + entry.totalHours, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">{t('navigation.workforce')}</h1>
          <p className="text-surface-500">{t('workforce.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Upload className="h-4 w-4" />}>
            {t('common.import')}
          </Button>
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            {t('common.export')}
          </Button>
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowAddModal(true)}>
            {t('workforce.newEmployee')}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 mx-auto mb-3">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-surface-900 dark:text-white">{employees.length}</h3>
          <p className="text-sm text-surface-500">{t('workforce.stats.totalEmployees')}</p>
        </Card>
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-3">
            <Briefcase className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-surface-900 dark:text-white">{activeCount}</h3>
          <p className="text-sm text-surface-500">{t('workforce.stats.active')}</p>
        </Card>
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mx-auto mb-3">
            <Calendar className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-surface-900 dark:text-white">{onLeaveCount}</h3>
          <p className="text-sm text-surface-500">{t('workforce.stats.onLeave')}</p>
        </Card>
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mx-auto mb-3">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-surface-900 dark:text-white">{totalHours.toFixed(0)}h</h3>
          <p className="text-sm text-surface-500">{t('workforce.stats.hoursThisWeek')}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={t('workforce.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full sm:w-40"
            />
            <Select
              options={departmentOptions}
              value={departmentFilter}
              onChange={setDepartmentFilter}
              className="w-full sm:w-48"
            />
            <div className="flex border border-surface-200 dark:border-surface-700 rounded-lg">
              <button
                className={cn(
                  'p-2 rounded-l-lg',
                  viewMode === 'grid' 
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30' 
                    : 'text-surface-500 hover:text-surface-700'
                )}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                className={cn(
                  'p-2 rounded-r-lg',
                  viewMode === 'list' 
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30' 
                    : 'text-surface-500 hover:text-surface-700'
                )}
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Employees List/Grid */}
      {filteredEmployees.length === 0 ? (
        <EmptyState
          icon={<User />}
          title={t('workforce.noEmployees.title')}
          description={t('workforce.noEmployees.description')}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEmployees.map((employee: Employee) => (
            <Card key={employee.id} className="hover:shadow-md transition-shadow">
              <div className="text-center">
                <Avatar 
                  src={employee.avatar} 
                  name={employee.name} 
                  size="xl" 
                  className="mx-auto mb-4"
                />
                <Link 
                  href={`/workforce/${employee.id}`}
                  className="text-lg font-semibold text-surface-900 dark:text-white hover:text-primary-600"
                >
                  {employee.name}
                </Link>
                <p className="text-surface-500 mb-2">{employee.position}</p>
                <Badge variant="custom" className={EMPLOYEE_STATUS_COLORS[employee.status as keyof typeof EMPLOYEE_STATUS_COLORS]}>
                  {employee.status.replace('-', ' ')}
                </Badge>
                
                <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-surface-500">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-surface-500">
                    <Phone className="h-4 w-4" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-surface-500">
                    <DollarSign className="h-4 w-4" />
                    <span>{formatCurrency(employee.salary / 2080)}/hr</span>
                  </div>
                </div>

                <Link 
                  href={`/workforce/${employee.id}`}
                  className="mt-4 block w-full text-center py-2 border border-surface-200 dark:border-surface-700 rounded-lg text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800"
                >
                  {t('workforce.table.viewProfile')}
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-0 overflow-hidden">
          <Table columns={tableColumns} data={filteredEmployees} />
        </Card>
      )}

      {/* Add Employee Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={t('workforce.addEmployee.title')}
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('workforce.addEmployee.firstName')} placeholder="John" />
            <Input label={t('workforce.addEmployee.lastName')} placeholder="Doe" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('workforce.addEmployee.email')} type="email" placeholder="john@example.com" />
            <Input label={t('workforce.addEmployee.phone')} type="tel" placeholder="+1 234 567 890" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('workforce.addEmployee.position')} placeholder="Site Supervisor" />
            <Select
              label={t('workforce.addEmployee.department')}
              options={departmentOptions.filter(d => d.value !== 'all')}
              placeholder={t('workforce.addEmployee.department')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('workforce.addEmployee.hourlyRate')} type="number" placeholder="35" leftIcon={<DollarSign className="h-4 w-4" />} />
            <Input label={t('workforce.addEmployee.hireDate')} type="date" />
          </div>
          <Input label={t('workforce.addEmployee.address')} placeholder="123 Main St, City, State" />
        </form>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowAddModal(false)}>{t('common.cancel')}</Button>
          <Button>{t('workforce.addEmployee.submit')}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
