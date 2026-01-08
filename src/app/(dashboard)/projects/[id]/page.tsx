'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardHeader, Button, Badge, Input, Select, Progress, Avatar, Tabs, Modal, ModalFooter, Textarea } from '@/components/ui';
import { cn, formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils';
import { useProjects, useTasks, useEmployees } from '@/hooks/data-hooks';
import { PROJECT_STATUS_COLORS, TASK_STATUS_COLORS, PRIORITY_COLORS, Task, TaskStatus, Project } from '@/types';
import {
  ArrowLeft,
  Plus,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Edit,
  MoreVertical,
  CheckCircle,
  Circle,
  AlertCircle,
  FileText,
  MessageSquare,
} from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: allTasks = [], isLoading: tasksLoading } = useTasks();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();

  const isLoading = projectsLoading || tasksLoading || employeesLoading;

  const project = projects.find((p: Project) => p.id === projectId);
  const tasks = allTasks.filter((t: Task) => t.projectId === projectId);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [taskFilter, setTaskFilter] = useState<string>('all');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-surface-500">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Project not found</h2>
        <Link href="/projects" className="text-primary-600 hover:underline mt-4 inline-block">
          Back to projects
        </Link>
      </div>
    );
  }

  const filteredTasks = tasks.filter((t: Task) => taskFilter === 'all' || t.status === taskFilter);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tasks', label: 'Tasks', count: tasks.length },
    { id: 'team', label: 'Team' },
    { id: 'documents', label: 'Documents' },
    { id: 'finances', label: 'Finances' },
  ];

  const taskStatusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'review', label: 'In Review' },
    { value: 'completed', label: 'Completed' },
  ];

  const getTaskIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'review':
        return <AlertCircle className="h-5 w-5 text-purple-500" />;
      default:
        return <Circle className="h-5 w-5 text-surface-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/projects" className="inline-flex items-center gap-2 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to projects</span>
      </Link>

      {/* Project Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">{project.name}</h1>
            <Badge variant="custom" className={PROJECT_STATUS_COLORS[project.status as keyof typeof PROJECT_STATUS_COLORS]}>
              {project.status.replace('-', ' ')}
            </Badge>
            <Badge variant="custom" className={PRIORITY_COLORS[project.priority as keyof typeof PRIORITY_COLORS]}>
              {project.priority}
            </Badge>
          </div>
          <p className="text-surface-500 dark:text-surface-400">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Edit className="h-4 w-4" />}>
            Edit
          </Button>
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowNewTaskModal(true)}>
            Add Task
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="flex items-center justify-center gap-2 text-surface-500 mb-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Duration</span>
          </div>
          <p className="text-lg font-semibold text-surface-900 dark:text-white">
            {formatDate(project.startDate, { month: 'short', day: 'numeric' })} - {formatDate(project.endDate, { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </Card>
        
        <Card className="text-center">
          <div className="flex items-center justify-center gap-2 text-surface-500 mb-2">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm">Budget</span>
          </div>
          <p className="text-lg font-semibold text-surface-900 dark:text-white">
            {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
          </p>
          <Progress value={(project.spent / project.budget) * 100} size="sm" className="mt-2" />
        </Card>
        
        <Card className="text-center">
          <div className="flex items-center justify-center gap-2 text-surface-500 mb-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">Team Size</span>
          </div>
          <p className="text-lg font-semibold text-surface-900 dark:text-white">{project.teamSize} members</p>
        </Card>
        
        <Card className="text-center">
          <div className="flex items-center justify-center gap-2 text-surface-500 mb-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Location</span>
          </div>
          <p className="text-lg font-semibold text-surface-900 dark:text-white truncate">{project.location.city}</p>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-surface-900 dark:text-white">Project Progress</h3>
          <span className="text-2xl font-bold text-primary-600">{project.progress}%</span>
        </div>
        <Progress value={project.progress} size="lg" />
      </Card>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Tasks */}
            <Card>
              <CardHeader 
                title="Recent Tasks" 
                action={
                  <Link href="#" onClick={() => setActiveTab('tasks')} className="text-sm text-primary-600 hover:underline">
                    View all
                  </Link>
                }
              />
              <div className="space-y-3">
                {tasks.slice(0, 5).map((task: Task) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                    {getTaskIcon(task.status)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-surface-900 dark:text-white truncate">{task.title}</h4>
                      <p className="text-sm text-surface-500">Due {formatDate(task.dueDate)}</p>
                    </div>
                    <Badge variant="custom" className={TASK_STATUS_COLORS[task.status]}>
                      {task.status}
                    </Badge>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <p className="text-center text-surface-500 py-4">No tasks yet</p>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Project Details */}
            <Card>
              <CardHeader title="Project Details" />
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-surface-500 mb-1">Client</p>
                  <p className="font-medium text-surface-900 dark:text-white">{project.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 mb-1">Project Manager</p>
                  <div className="flex items-center gap-2">
                    <Avatar name={project.managerName} size="sm" />
                    <span className="font-medium text-surface-900 dark:text-white">{project.managerName}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-surface-500 mb-1">Location</p>
                  <p className="font-medium text-surface-900 dark:text-white">{project.location.address}</p>
                  <p className="text-sm text-surface-500">{project.location.city}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 mb-1">Contact</p>
                  <p className="font-medium text-surface-900 dark:text-white">{project.clientContact || 'Not provided'}</p>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader title="Timeline" />
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-surface-500">Start Date</span>
                  <span className="font-medium text-surface-900 dark:text-white">{formatDate(project.startDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-surface-500">End Date</span>
                  <span className="font-medium text-surface-900 dark:text-white">{formatDate(project.endDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-surface-500">Last Updated</span>
                  <span className="font-medium text-surface-900 dark:text-white">{formatRelativeTime(project.updatedAt)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Select
              options={taskStatusOptions}
              value={taskFilter}
              onChange={setTaskFilter}
              className="w-full sm:w-48"
            />
            <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowNewTaskModal(true)}>
              Add Task
            </Button>
          </div>

          <div className="space-y-3">
            {filteredTasks.map((task: Task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  {getTaskIcon(task.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-surface-900 dark:text-white">{task.title}</h3>
                      <Badge variant="custom" className={PRIORITY_COLORS[task.priority]} size="sm">
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-surface-500 dark:text-surface-400 mb-3">{task.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-surface-500">
                      {task.assigneeName && (
                        <div className="flex items-center gap-2">
                          <Avatar name={task.assigneeName} size="xs" />
                          <span>{task.assigneeName}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due {formatDate(task.dueDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{task.actualHours}/{task.estimatedHours}h</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="custom" className={TASK_STATUS_COLORS[task.status]}>
                    {task.status}
                  </Badge>
                </div>
              </Card>
            ))}

            {filteredTasks.length === 0 && (
              <Card className="text-center py-12">
                <Circle className="h-12 w-12 text-surface-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">No tasks found</h3>
                <p className="text-surface-500 mb-4">Create your first task to get started</p>
                <Button onClick={() => setShowNewTaskModal(true)} leftIcon={<Plus className="h-4 w-4" />}>
                  Add Task
                </Button>
              </Card>
            )}
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <Card>
          <CardHeader title="Team Members" description={`${project.teamSize} members assigned to this project`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.slice(0, 6).map((employee: any) => (
              <div key={employee.id} className="flex items-center gap-3 p-4 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                <Avatar src={employee.avatar} name={employee.name} size="lg" />
                <div>
                  <h4 className="font-medium text-surface-900 dark:text-white">{employee.name}</h4>
                  <p className="text-sm text-surface-500">{employee.position}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'documents' && (
        <Card className="text-center py-12">
          <FileText className="h-12 w-12 text-surface-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">No documents yet</h3>
          <p className="text-surface-500 mb-4">Upload documents related to this project</p>
          <Button leftIcon={<Plus className="h-4 w-4" />}>Upload Document</Button>
        </Card>
      )}

      {activeTab === 'finances' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Budget Overview" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-surface-500">Total Budget</span>
                <span className="text-xl font-bold text-surface-900 dark:text-white">{formatCurrency(project.budget)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-500">Spent</span>
                <span className="text-xl font-bold text-red-600">{formatCurrency(project.spent)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-500">Remaining</span>
                <span className="text-xl font-bold text-green-600">{formatCurrency(project.budget - project.spent)}</span>
              </div>
              <Progress value={(project.spent / project.budget) * 100} size="lg" showLabel />
            </div>
          </Card>

          <Card>
            <CardHeader title="Budget by Category" />
            <div className="space-y-3">
              {[
                { name: 'Materials', spent: project.spent * 0.4, budget: project.budget * 0.35 },
                { name: 'Labor', spent: project.spent * 0.35, budget: project.budget * 0.3 },
                { name: 'Equipment', spent: project.spent * 0.15, budget: project.budget * 0.2 },
                { name: 'Other', spent: project.spent * 0.1, budget: project.budget * 0.15 },
              ].map((category: { name: string; spent: number; budget: number }) => (
                <div key={category.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-surface-700 dark:text-surface-300">{category.name}</span>
                    <span className="text-surface-500">{formatCurrency(category.spent)} / {formatCurrency(category.budget)}</span>
                  </div>
                  <Progress value={(category.spent / category.budget) * 100} size="sm" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* New Task Modal */}
      <Modal
        isOpen={showNewTaskModal}
        onClose={() => setShowNewTaskModal(false)}
        title="Create New Task"
        size="lg"
      >
        <form className="space-y-4">
          <Input label="Task Title" placeholder="Enter task title" />
          <Textarea label="Description" placeholder="Describe the task..." />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority"
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'urgent', label: 'Urgent' },
              ]}
              placeholder="Select priority"
            />
            <Select
              label="Assignee"
              options={employees.map((e: any) => ({ value: e.id, label: e.name }))}
              placeholder="Select assignee"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Due Date" type="date" />
            <Input label="Estimated Hours" type="number" placeholder="0" />
          </div>
        </form>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowNewTaskModal(false)}>Cancel</Button>
          <Button>Create Task</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
