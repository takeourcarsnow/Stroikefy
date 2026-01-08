'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardHeader, Button, Badge, Input, Select, Avatar, Tabs, Progress, Modal, ModalFooter, Table } from '@/components/ui';
import { cn, formatDate, formatCurrency, formatRelativeTime } from '@/lib/utils';
import { useEmployees, useTimeEntries, useProjects } from '@/hooks/data-hooks';
import { EMPLOYEE_STATUS_COLORS, TimeEntry, PROJECT_STATUS_COLORS, Employee, Project } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  DollarSign,
  Plus,
  User,
  FileText,
  AlertCircle,
  Building,
} from 'lucide-react';

export default function EmployeeDetailPage() {
  const params = useParams();
  const employeeId = params.id as string;
  const { t } = useTranslation();

  const { data: employees = [], isLoading: employeesLoading } = useEmployees();
  const { data: timeEntriesData = [], isLoading: timeEntriesLoading } = useTimeEntries();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();

  const isLoading = employeesLoading || timeEntriesLoading || projectsLoading;

  const employee = employees.find((e: Employee) => e.id === employeeId);
  const timeEntries = timeEntriesData.filter((t: TimeEntry) => t.employeeId === employeeId);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showLogTimeModal, setShowLogTimeModal] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-surface-500">{t('workforce.employeeDetail.loading')}</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white">{t('workforce.employeeDetail.notFound')}</h2>
        <Link href="/workforce" className="text-primary-600 hover:underline mt-4 inline-block">
          {t('workforce.employeeDetail.backToWorkforce')}
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'time-tracking', label: 'Time Tracking' },
    { id: 'projects', label: 'Projects' },
    { id: 'documents', label: 'Documents' },
  ];

  const totalHoursWorked = timeEntries.reduce((sum: number, entry: TimeEntry) => sum + entry.totalHours, 0);
  const totalOvertimeHours = timeEntries.reduce((sum: number, entry: TimeEntry) => sum + Math.max(0, entry.totalHours - 8), 0);
  const hourlyRate = employee.salary / 2080;
  const totalEarnings = totalHoursWorked * hourlyRate;
  const employeeProjects = projects.filter((p: Project) => 
    p.managerId === employeeId || Math.random() > 0.5
  ).slice(0, 4);

  const timeEntryColumns = [
    {
      key: 'date',
      header: 'Date',
      render: (entry: TimeEntry) => formatDate(entry.date),
    },
    {
      key: 'project',
      header: 'Project',
      render: (entry: TimeEntry) => {
        const project = projects.find((p: Project) => p.id === entry.projectId);
        return project?.name || '-';
      },
    },
    {
      key: 'clockIn',
      header: 'Clock In',
      render: (entry: TimeEntry) => entry.startTime,
    },
    {
      key: 'clockOut',
      header: 'Clock Out',
      render: (entry: TimeEntry) => entry.endTime || '-',
    },
    {
      key: 'hours',
      header: 'Hours',
      render: (entry: TimeEntry) => `${entry.totalHours}h`,
    },
    {
      key: 'overtime',
      header: 'Overtime',
      render: (entry: TimeEntry) => entry.totalHours > 8 ? `${(entry.totalHours - 8).toFixed(1)}h` : '-',
    },
    {
      key: 'status',
      header: 'Status',
      render: (entry: TimeEntry) => (
        <Badge variant={entry.status === 'approved' ? 'success' : entry.status === 'pending' ? 'warning' : 'danger'}>
          {entry.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/workforce" className="inline-flex items-center gap-2 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to workforce</span>
      </Link>

      {/* Employee Header */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar src={employee.avatar} name={employee.name} size="xl" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">{employee.name}</h1>
                <Badge variant="custom" className={EMPLOYEE_STATUS_COLORS[employee.status as keyof typeof EMPLOYEE_STATUS_COLORS]}>
                  {employee.status.replace('-', ' ')}
                </Badge>
              </div>
              <p className="text-lg text-surface-500 mb-4">{employee.position}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                  <Mail className="h-4 w-4" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                  <Phone className="h-4 w-4" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                  <Building className="h-4 w-4" />
                  <span>{employee.department}</span>
                </div>
                <div className="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                  <Calendar className="h-4 w-4" />
                  <span>{t('workforce.employeeDetail.hired')} {formatDate(employee.hireDate)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" leftIcon={<Edit className="h-4 w-4" />}>
                {t('common.edit')}
              </Button>
              <Button leftIcon={<Clock className="h-4 w-4" />} onClick={() => setShowLogTimeModal(true)}>
                Log Time
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 mx-auto mb-2">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-surface-900 dark:text-white">{totalHoursWorked.toFixed(1)}h</h3>
          <p className="text-sm text-surface-500">{t('workforce.employeeDetail.hoursThisWeek')}</p>
        </Card>
        <Card className="text-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 mx-auto mb-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-surface-900 dark:text-white">{totalOvertimeHours.toFixed(1)}h</h3>
          <p className="text-sm text-surface-500">{t('workforce.employeeDetail.overtime')}</p>
        </Card>
        <Card className="text-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-surface-900 dark:text-white">{formatCurrency(totalEarnings)}</h3>
          <p className="text-sm text-surface-500">{t('workforce.employeeDetail.earningsWeek')}</p>
        </Card>
        <Card className="text-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 mx-auto mb-2">
            <Briefcase className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-surface-900 dark:text-white">{employeeProjects.length}</h3>
          <p className="text-sm text-surface-500">{t('workforce.activeProjects')}</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Time Entries */}
            <Card>
              <CardHeader 
                title="Recent Time Entries" 
                action={
                  <Link href="#" onClick={() => setActiveTab('time-tracking')} className="text-sm text-primary-600 hover:underline">
                    View all
                  </Link>
                }
              />
              <div className="space-y-3">
                {timeEntries.slice(0, 5).map((entry: TimeEntry) => {
                  const project = projects.find((p: Project) => p.id === entry.projectId);
                  return (
                    <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                      <div>
                        <p className="font-medium text-surface-900 dark:text-white">{formatDate(entry.date)}</p>
                        <p className="text-sm text-surface-500">{project?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-surface-900 dark:text-white">{entry.totalHours}h</p>
                        <p className="text-sm text-surface-500">{entry.startTime} - {entry.endTime || 'Active'}</p>
                      </div>
                    </div>
                  );
                })}
                {timeEntries.length === 0 && (
                  <p className="text-center text-surface-500 py-4">{t('workforce.employeeDetail.noTimeEntries')}</p>
                )}
              </div>
            </Card>

            {/* Assigned Projects */}
            <Card>
              <CardHeader 
                title="Assigned Projects" 
                action={
                  <Link href="#" onClick={() => setActiveTab('projects')} className="text-sm text-primary-600 hover:underline">
                    View all
                  </Link>
                }
              />
              <div className="space-y-3">
                {employeeProjects.slice(0, 3).map((project: Project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-4 p-3 rounded-lg bg-surface-50 dark:bg-surface-800/50 hover:bg-surface-100 dark:hover:bg-surface-700/50"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-surface-900 dark:text-white">{project.name}</h4>
                      <p className="text-sm text-surface-500">{project.clientName}</p>
                    </div>
                    <div className="text-right">
                      <Progress value={project.progress} size="sm" className="w-24" />
                      <p className="text-xs text-surface-500 mt-1">{project.progress}%</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Employee Details */}
            <Card>
              <CardHeader title="Details" />
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-surface-500 mb-1">{t('workforce.employeeId')}</p>
                  <p className="font-medium text-surface-900 dark:text-white">{employee.id}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 mb-1">{t('workforce.employeeDetail.hourlyRate')}</p>
                  <p className="font-medium text-surface-900 dark:text-white">{formatCurrency(hourlyRate)}/hr</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 mb-1">{t('workforce.emergencyContact')}</p>
                  <p className="font-medium text-surface-900 dark:text-white">{employee.emergencyContact?.name || 'Not set'}</p>
                  <p className="text-sm text-surface-500">{employee.emergencyContact?.phone || ''}</p>
                </div>
                {employee.certifications && employee.certifications.length > 0 && (
                  <div>
                    <p className="text-sm text-surface-500 mb-2">{t('workforce.certifications')}</p>
                    <div className="flex flex-wrap gap-2">
                      {employee.certifications.map((cert: string, index: number) => (
                        <Badge key={index} variant="default">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {employee.skills && employee.skills.length > 0 && (
                  <div>
                    <p className="text-sm text-surface-500 mb-2">{t('workforce.skills')}</p>
                    <div className="flex flex-wrap gap-2">
                      {employee.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="default">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Attendance Summary */}
            <Card>
              <CardHeader title="This Week" />
              <div className="space-y-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day: string, index: number) => {
                  const hasEntry = index < timeEntries.length;
                  return (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-surface-600 dark:text-surface-400">{day}</span>
                      <Badge variant={hasEntry ? 'success' : 'default'}>
                        {hasEntry ? `${7 + index}h` : 'No entry'}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'time-tracking' && (
        <div className="space-y-6">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-white">{t('workforce.employeeDetail.timeEntries')}</h2>
            <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowLogTimeModal(true)}>
              Log Time
            </Button>
          </div>
          <Card className="p-0 overflow-hidden">
            <Table columns={timeEntryColumns} data={timeEntries} />
          </Card>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {employeeProjects.map((project: Project) => (
            <Card key={project.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-lg font-semibold text-surface-900 dark:text-white hover:text-primary-600"
                  >
                    {project.name}
                  </Link>
                  <p className="text-surface-500">{project.clientName}</p>
                </div>
                <Badge variant="default" className={PROJECT_STATUS_COLORS[project.status]}>
                  {project.status}
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500">{t('workforce.progress')}</span>
                  <span className="font-medium text-surface-900 dark:text-white">{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500">{t('workforce.employeeDetail.dueDate')}</span>
                  <span className="text-surface-900 dark:text-white">{formatDate(project.endDate)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'documents' && (
        <Card className="text-center py-12">
          <FileText className="h-12 w-12 text-surface-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">{t('workforce.employeeDetail.noDocuments')}</h3>
          <p className="text-surface-500 mb-4">{t('workforce.employeeDetail.uploadDocumentsDesc')}</p>
          <Button leftIcon={<Plus className="h-4 w-4" />}>{t('workforce.employeeDetail.uploadDocument')}</Button>
        </Card>
      )}

      {/* Log Time Modal */}
      <Modal
        isOpen={showLogTimeModal}
        onClose={() => setShowLogTimeModal(false)}
        title="Log Time Entry"
        size="md"
      >
        <form className="space-y-4">
          <Input label="Date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          <Select
            label="Project"
            options={projects.map((p: Project) => ({ value: p.id, label: p.name }))}
            placeholder="Select project"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Clock In" type="time" defaultValue="08:00" />
            <Input label="Clock Out" type="time" defaultValue="17:00" />
          </div>
          <Input label="Break Duration (minutes)" type="number" placeholder="30" />
          <Input label="Notes" placeholder="Optional notes about work done..." />
        </form>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowLogTimeModal(false)}>{t('common.cancel')}</Button>
          <Button>{t('timeTracking.saveEntry')}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
