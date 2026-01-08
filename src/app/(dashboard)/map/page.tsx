'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, Button, Badge, Input, Select, Modal, ModalFooter } from '@/components/ui';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { useProjects } from '@/hooks/data-hooks';
import { PROJECT_STATUS_COLORS, Project } from '@/types';
import {
  Search,
  Filter,
  List,
  MapPin,
  Building,
  Calendar,
  DollarSign,
  Users,
  ExternalLink,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize,
  Navigation,
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the map to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

export default function MapPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showProjectList, setShowProjectList] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const { data: projects = [], isLoading } = useProjects();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'planning', label: 'Planning' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
  ];

  const filteredProjects = (projects || []).filter((project: Project) => {
    return statusFilter === 'all' || project.status === statusFilter;
  });

  // Default center (New York)
  const defaultCenter: [number, number] = [40.7128, -74.006];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Site Map</h1>
          <p className="text-surface-500">View all construction sites on the map</p>
        </div>
        <div className="flex gap-2">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-40"
          />
          <Button 
            variant={showProjectList ? 'primary' : 'outline'}
            leftIcon={<List className="h-4 w-4" />}
            onClick={() => setShowProjectList(!showProjectList)}
          >
            {showProjectList ? 'Hide List' : 'Show List'}
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Project List Sidebar */}
        {showProjectList && (
          <Card className="w-80 flex-shrink-0 flex flex-col overflow-hidden">
            <CardHeader title="Projects" description={`${filteredProjects.length} sites`} />
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {filteredProjects.map((project: Project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={cn(
                    'w-full p-3 rounded-lg text-left transition-colors',
                    selectedProject?.id === project.id
                      ? 'bg-primary-50 dark:bg-primary-900/30 border border-primary-500'
                      : 'bg-surface-50 dark:bg-surface-800/50 hover:bg-surface-100 dark:hover:bg-surface-700/50'
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-surface-900 dark:text-white truncate pr-2">
                      {project.name}
                    </h4>
                    <Badge variant="custom" className={PROJECT_STATUS_COLORS[project.status]} size="sm">
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-surface-500">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="truncate">{project.location.city}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Map */}
        <Card className="flex-1 p-0 overflow-hidden relative">
          {isClient ? (
            <>
              <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossOrigin=""
              />
              <MapContainer
                center={selectedProject 
                  ? [selectedProject.location.lat, selectedProject.location.lng] 
                  : defaultCenter
                }
                zoom={selectedProject ? 14 : 11}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredProjects.map((project: Project) => (
                  <Marker
                    key={project.id}
                    position={[project.location.lat, project.location.lng]}
                    eventHandlers={{
                      click: () => setSelectedProject(project),
                    }}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <h3 className="font-semibold text-surface-900">{project.name}</h3>
                        <p className="text-sm text-surface-500 mb-2">{project.location.address}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-surface-500">Status</span>
                            <span className="font-medium capitalize">{project.status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-surface-500">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-surface-500">Budget</span>
                            <span className="font-medium">{formatCurrency(project.budget)}</span>
                          </div>
                        </div>
                        <a
                          href={`/projects/${project.id}`}
                          className="mt-3 block w-full text-center py-1.5 bg-primary-600 text-white rounded text-sm font-medium hover:bg-primary-700"
                        >
                          View Project
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </>
          ) : (
            <div className="h-full flex items-center justify-center bg-surface-100 dark:bg-surface-800">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-surface-400 mx-auto mb-4" />
                <p className="text-surface-500">Loading map...</p>
              </div>
            </div>
          )}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
            <button className="p-2 bg-white dark:bg-surface-800 rounded-lg shadow-md hover:bg-surface-50 dark:hover:bg-surface-700">
              <ZoomIn className="h-5 w-5 text-surface-600 dark:text-surface-400" />
            </button>
            <button className="p-2 bg-white dark:bg-surface-800 rounded-lg shadow-md hover:bg-surface-50 dark:hover:bg-surface-700">
              <ZoomOut className="h-5 w-5 text-surface-600 dark:text-surface-400" />
            </button>
            <button className="p-2 bg-white dark:bg-surface-800 rounded-lg shadow-md hover:bg-surface-50 dark:hover:bg-surface-700">
              <Maximize className="h-5 w-5 text-surface-600 dark:text-surface-400" />
            </button>
            <button className="p-2 bg-white dark:bg-surface-800 rounded-lg shadow-md hover:bg-surface-50 dark:hover:bg-surface-700">
              <Layers className="h-5 w-5 text-surface-600 dark:text-surface-400" />
            </button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-surface-800 rounded-lg shadow-md p-3 z-[1000]">
            <h4 className="text-sm font-medium text-surface-900 dark:text-white mb-2">Status Legend</h4>
            <div className="space-y-1">
              {[
                { status: 'planning', color: 'bg-yellow-500' },
                { status: 'in-progress', color: 'bg-blue-500' },
                { status: 'on-hold', color: 'bg-orange-500' },
                { status: 'completed', color: 'bg-green-500' },
              ].map((item: { status: string; color: string }) => (
                <div key={item.status} className="flex items-center gap-2 text-sm">
                  <span className={cn('w-3 h-3 rounded-full', item.color)} />
                  <span className="text-surface-600 dark:text-surface-400 capitalize">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Selected Project Details */}
        {selectedProject && (
          <Card className="w-80 flex-shrink-0 overflow-hidden">
            <div className="space-y-4">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                    {selectedProject.name}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-surface-400 hover:text-surface-600"
                  >
                    ×
                  </button>
                </div>
                <Badge variant="custom" className={PROJECT_STATUS_COLORS[selectedProject.status]}>
                  {selectedProject.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-surface-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      {selectedProject.location.address}
                    </p>
                    <p className="text-sm text-surface-500">{selectedProject.location.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-surface-400" />
                  <div>
                    <p className="text-sm text-surface-500">Client</p>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      {selectedProject.clientName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-surface-400" />
                  <div>
                    <p className="text-sm text-surface-500">Timeline</p>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      {formatDate(selectedProject.startDate)} - {formatDate(selectedProject.endDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-surface-400" />
                  <div>
                    <p className="text-sm text-surface-500">Budget</p>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      {formatCurrency(selectedProject.budget)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-surface-400" />
                  <div>
                    <p className="text-sm text-surface-500">Team Size</p>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      {selectedProject.teamSize} members
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-200 dark:border-surface-700">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-surface-500">Progress</span>
                  <span className="font-medium text-surface-900 dark:text-white">{selectedProject.progress}%</span>
                </div>
                <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>
              </div>

              <a
                href={`/projects/${selectedProject.id}`}
                className="flex items-center justify-center gap-2 w-full py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                View Project
                <ExternalLink className="h-4 w-4" />
              </a>

              <button className="flex items-center justify-center gap-2 w-full py-2 border border-surface-200 dark:border-surface-700 rounded-lg font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                <Navigation className="h-4 w-4" />
                Get Directions
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
