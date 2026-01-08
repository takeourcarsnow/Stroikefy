'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Button, Badge, Input, Select, Modal, ModalFooter, Table } from '@/components/ui';
import { cn, formatDate, formatCurrency } from '@/lib/utils';
import { mockEmployees, mockProjects, mockTimeEntries } from '@/data';
import { TimeEntry, TimeEntryStatus } from '@/types';
import {
  Play,
  Pause,
  Square,
  Clock,
  Calendar,
  User,
  DollarSign,
  TrendingUp,
  Plus,
  Download,
  Filter,
  BarChart3,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function TimeTrackingPage() {
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!selectedProject) {
      alert('Please select a project first');
      return;
    }
    setIsTracking(true);
  };

  const pauseTimer = () => {
    setIsTracking(false);
  };

  const stopTimer = () => {
    setIsTracking(false);
    // Would save the time entry here
    setElapsedTime(0);
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const filteredEntries = mockTimeEntries.filter(entry => 
    statusFilter === 'all' || entry.status === statusFilter
  );

  // Stats
  const totalHoursToday = mockTimeEntries
    .filter(e => e.date === selectedDate)
    .reduce((sum, e) => sum + e.totalHours, 0);

  const totalHoursWeek = mockTimeEntries.reduce((sum, e) => sum + e.totalHours, 0);
  const totalOvertimeWeek = mockTimeEntries.reduce((sum, e) => sum + e.overtimeHours, 0);
  const pendingApproval = mockTimeEntries.filter(e => e.status === 'pending').length;

  // Weekly chart data
  const weeklyData = [
    { day: 'Mon', hours: 8.5, overtime: 0.5 },
    { day: 'Tue', hours: 9, overtime: 1 },
    { day: 'Wed', hours: 8, overtime: 0 },
    { day: 'Thu', hours: 8.5, overtime: 0.5 },
    { day: 'Fri', hours: 7.5, overtime: 0 },
    { day: 'Sat', hours: 0, overtime: 0 },
    { day: 'Sun', hours: 0, overtime: 0 },
  ];

  const timeEntryColumns = [
    {
      key: 'date',
      header: 'Date',
      render: (entry: TimeEntry) => formatDate(entry.date),
    },
    {
      key: 'employee',
      header: 'Employee',
      render: (entry: TimeEntry) => {
        const employee = mockEmployees.find(e => e.id === entry.employeeId);
        return employee?.name || '-';
      },
    },
    {
      key: 'project',
      header: 'Project',
      render: (entry: TimeEntry) => {
        const project = mockProjects.find(p => p.id === entry.projectId);
        return project?.name || '-';
      },
    },
    {
      key: 'time',
      header: 'Time',
      render: (entry: TimeEntry) => `${entry.clockIn} - ${entry.clockOut || 'Active'}`,
    },
    {
      key: 'hours',
      header: 'Hours',
      render: (entry: TimeEntry) => (
        <div>
          <span className="font-medium">{entry.totalHours}h</span>
          {entry.overtimeHours > 0 && (
            <span className="text-orange-600 ml-2">(+{entry.overtimeHours}h OT)</span>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (entry: TimeEntry) => (
        <Badge 
          variant={
            entry.status === 'approved' ? 'success' : 
            entry.status === 'pending' ? 'warning' : 
            'danger'
          }
        >
          {entry.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (entry: TimeEntry) => (
        <div className="flex gap-2">
          {entry.status === 'pending' && (
            <>
              <Button variant="ghost" size="sm">Approve</Button>
              <Button variant="ghost" size="sm" className="text-red-600">Reject</Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Time Tracking</h1>
          <p className="text-surface-500">Track and manage work hours</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowAddModal(true)}>
            Add Entry
          </Button>
        </div>
      </div>

      {/* Timer Card */}
      <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-lg font-medium text-primary-100 mb-2">Current Session</h2>
            <div className="text-5xl font-mono font-bold mb-4">{formatTime(elapsedTime)}</div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Select
                options={mockProjects.map(p => ({ value: p.id, label: p.name }))}
                value={selectedProject}
                onChange={setSelectedProject}
                placeholder="Select project"
                className="w-full sm:w-64 bg-white/10 border-white/20 text-white placeholder-white/60"
              />
              <div className="flex gap-2">
                {!isTracking ? (
                  <Button 
                    onClick={startTimer}
                    className="bg-white text-primary-600 hover:bg-white/90"
                    leftIcon={<Play className="h-5 w-5" />}
                  >
                    Start
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={pauseTimer}
                      className="bg-white/20 hover:bg-white/30"
                      leftIcon={<Pause className="h-5 w-5" />}
                    >
                      Pause
                    </Button>
                    <Button 
                      onClick={stopTimer}
                      className="bg-red-500 hover:bg-red-600"
                      leftIcon={<Square className="h-5 w-5" />}
                    >
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          {isTracking && (
            <div className="w-full lg:w-48 p-4 bg-white/10 rounded-xl text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 animate-pulse" />
              <p className="text-sm text-primary-100">Tracking active</p>
              <p className="font-medium">
                {mockProjects.find(p => p.id === selectedProject)?.name || 'No project'}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">Today</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{totalHoursToday}h</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">This Week</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{totalHoursWeek}h</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">Overtime</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{totalOvertimeWeek}h</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">Pending</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{pendingApproval}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly Chart */}
      <Card>
        <CardHeader title="Weekly Hours" description="Hours worked this week" />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-text-secondary)" />
              <YAxis stroke="var(--color-text-secondary)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="hours" name="Regular" fill="#ec751a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="overtime" name="Overtime" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Time Entries */}
      <Card>
        <CardHeader 
          title="Time Entries" 
          description="All logged time entries"
          action={
            <div className="flex gap-2">
              <Input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-40"
              />
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                className="w-36"
              />
            </div>
          }
        />
        <div className="overflow-x-auto">
          <Table columns={timeEntryColumns} data={filteredEntries} />
        </div>
      </Card>

      {/* Add Entry Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Time Entry"
        size="md"
      >
        <form className="space-y-4">
          <Select
            label="Employee"
            options={mockEmployees.map(e => ({ value: e.id, label: e.name }))}
            placeholder="Select employee"
          />
          <Select
            label="Project"
            options={mockProjects.map(p => ({ value: p.id, label: p.name }))}
            placeholder="Select project"
          />
          <Input label="Date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Clock In" type="time" defaultValue="08:00" />
            <Input label="Clock Out" type="time" defaultValue="17:00" />
          </div>
          <Input label="Break Duration (minutes)" type="number" placeholder="30" />
          <Input label="Notes" placeholder="Optional notes..." />
        </form>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button>Save Entry</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
