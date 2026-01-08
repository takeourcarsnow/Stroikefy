'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Badge, Input, Select, Progress, Avatar, AvatarGroup } from '@/components/ui';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { useProjects } from '@/hooks/data-hooks';
import { PROJECT_STATUS_COLORS, PRIORITY_COLORS, ProjectStatus, ProjectPriority, Project } from '@/types';
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  MoreVertical,
  ArrowUpRight,
} from 'lucide-react';

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const { data: projects = [], isLoading, error } = useProjects();

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error loading projects: {error.message}</div>;
  }

  const filteredProjects = projects.filter((project: Project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'planning', label: 'Planning' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Projects</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">
            Manage and track all your construction projects
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          New Project
        </Button>
      </div>

      {/* Filters */}
      <Card padding="md">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full sm:w-44"
            />
            <Select
              options={priorityOptions}
              value={priorityFilter}
              onChange={setPriorityFilter}
              className="w-full sm:w-44"
            />
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="md"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="md"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project: Project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="custom" className={PROJECT_STATUS_COLORS[project.status]}>
                      {project.status.replace('-', ' ')}
                    </Badge>
                    <Badge variant="custom" className={PRIORITY_COLORS[project.priority]}>
                      {project.priority}
                    </Badge>
                  </div>
                  <button
                    className="p-1 rounded hover:bg-surface-100 dark:hover:bg-surface-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreVertical className="h-4 w-4 text-surface-400" />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-surface-500 dark:text-surface-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{project.location.address}, {project.location.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-surface-600 dark:text-surface-400">Progress</span>
                    <span className="text-sm font-medium text-surface-900 dark:text-white">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} size="sm" />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-surface-200 dark:border-surface-700">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-surface-400" />
                    <span className="text-sm font-medium text-surface-900 dark:text-white">
                      {formatCurrency(project.spent)}
                    </span>
                    <span className="text-sm text-surface-500">/ {formatCurrency(project.budget)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-surface-400" />
                    <span className="text-sm text-surface-600 dark:text-surface-400">{project.teamSize}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-700">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-surface-500">Project</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-surface-500">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-surface-500">Progress</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-surface-500">Budget</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-surface-500">Timeline</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-surface-500">Team</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-surface-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-700">
                {filteredProjects.map((project: Project) => (
                  <tr key={project.id} className="hover:bg-surface-50 dark:hover:bg-surface-800/50">
                    <td className="px-6 py-4">
                      <div>
                        <Link 
                          href={`/projects/${project.id}`}
                          className="font-medium text-surface-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {project.name}
                        </Link>
                        <p className="text-sm text-surface-500 mt-0.5">{project.clientName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="custom" className={PROJECT_STATUS_COLORS[project.status]}>
                        {project.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32">
                        <Progress value={project.progress} size="sm" showLabel />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-surface-900 dark:text-white">
                          {formatCurrency(project.spent)}
                        </p>
                        <p className="text-sm text-surface-500">of {formatCurrency(project.budget)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-surface-900 dark:text-white">{formatDate(project.startDate)}</p>
                        <p className="text-surface-500">{formatDate(project.endDate)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-surface-400" />
                        <span className="text-sm text-surface-600 dark:text-surface-400">{project.teamSize}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/projects/${project.id}`}>
                        <Button variant="ghost" size="sm">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <Card className="text-center py-12">
          <div className="mb-4 p-4 rounded-full bg-surface-100 dark:bg-surface-800 inline-block">
            <Search className="h-8 w-8 text-surface-400" />
          </div>
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">No projects found</h3>
          <p className="text-surface-500 dark:text-surface-400 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="secondary" onClick={() => { setSearchQuery(''); setStatusFilter('all'); setPriorityFilter('all'); }}>
            Clear filters
          </Button>
        </Card>
      )}
    </div>
  );
}
