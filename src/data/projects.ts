import { Project, Task } from '@/types';

export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'Downtown Office Complex',
    description: 'A 15-story modern office building with underground parking and rooftop amenities.',
    status: 'in-progress',
    priority: 'high',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2025-06-30'),
    budget: 12500000,
    spent: 4200000,
    progress: 34,
    managerId: '2',
    managerName: 'Sarah Williams',
    clientName: 'MetroCity Developments',
    clientContact: 'contact@metrocity.com',
    location: {
      address: '123 Main Street',
      city: 'New York',
      lat: 40.7128,
      lng: -74.006,
    },
    teamSize: 45,
    tasks: [],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: 'proj-002',
    name: 'Riverside Residential Tower',
    description: 'Luxury 25-floor residential building with 200 units and premium amenities.',
    status: 'in-progress',
    priority: 'critical',
    startDate: new Date('2023-09-01'),
    endDate: new Date('2025-03-31'),
    budget: 28000000,
    spent: 15400000,
    progress: 55,
    managerId: '2',
    managerName: 'Sarah Williams',
    clientName: 'Riverside Properties LLC',
    clientContact: 'info@riversideprops.com',
    location: {
      address: '456 River Road',
      city: 'New York',
      lat: 40.7282,
      lng: -73.7949,
    },
    teamSize: 78,
    tasks: [],
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-03-19'),
  },
  {
    id: 'proj-003',
    name: 'Green Valley Shopping Mall',
    description: 'Modern shopping mall with 150 retail spaces and entertainment zone.',
    status: 'planning',
    priority: 'medium',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2026-12-31'),
    budget: 45000000,
    spent: 500000,
    progress: 5,
    managerId: '3',
    managerName: 'Mike Chen',
    clientName: 'Valley Retail Group',
    clientContact: 'projects@valleyretail.com',
    location: {
      address: '789 Valley Boulevard',
      city: 'Los Angeles',
      lat: 34.0522,
      lng: -118.2437,
    },
    teamSize: 12,
    tasks: [],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: 'proj-004',
    name: 'Harbor Bridge Renovation',
    description: 'Complete renovation and structural upgrade of the historic harbor bridge.',
    status: 'in-progress',
    priority: 'high',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-11-30'),
    budget: 8500000,
    spent: 2800000,
    progress: 42,
    managerId: '3',
    managerName: 'Mike Chen',
    clientName: 'City Department of Transportation',
    clientContact: 'transport@citygov.com',
    location: {
      address: 'Harbor Bridge',
      city: 'San Francisco',
      lat: 37.7749,
      lng: -122.4194,
    },
    teamSize: 35,
    tasks: [],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-18'),
  },
  {
    id: 'proj-005',
    name: 'Tech Park Campus',
    description: 'Modern tech campus with 5 buildings, parking structure, and green spaces.',
    status: 'on-hold',
    priority: 'medium',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2026-06-30'),
    budget: 65000000,
    spent: 3200000,
    progress: 8,
    managerId: '2',
    managerName: 'Sarah Williams',
    clientName: 'TechGiant Inc.',
    clientContact: 'construction@techgiant.com',
    location: {
      address: '1000 Innovation Drive',
      city: 'Austin',
      lat: 30.2672,
      lng: -97.7431,
    },
    teamSize: 25,
    tasks: [],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-10'),
  },
  {
    id: 'proj-006',
    name: 'Community Hospital Expansion',
    description: 'Adding a new wing with 100 beds and modern medical facilities.',
    status: 'completed',
    priority: 'critical',
    startDate: new Date('2022-06-01'),
    endDate: new Date('2024-02-28'),
    budget: 32000000,
    spent: 31500000,
    progress: 100,
    managerId: '2',
    managerName: 'Sarah Williams',
    clientName: 'City Health Services',
    clientContact: 'admin@cityhealth.org',
    location: {
      address: '500 Health Avenue',
      city: 'Chicago',
      lat: 41.8781,
      lng: -87.6298,
    },
    teamSize: 0,
    tasks: [],
    createdAt: new Date('2022-05-15'),
    updatedAt: new Date('2024-02-28'),
  },
];

export const mockTasks: Task[] = [
  {
    id: 'task-001',
    projectId: 'proj-001',
    title: 'Foundation excavation',
    description: 'Complete excavation for the main building foundation',
    status: 'completed',
    priority: 'high',
    assigneeId: 'emp-001',
    assigneeName: 'John Smith',
    dueDate: new Date('2024-02-15'),
    estimatedHours: 240,
    actualHours: 256,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: 'task-002',
    projectId: 'proj-001',
    title: 'Steel framework installation',
    description: 'Install main steel framework for floors 1-5',
    status: 'in-progress',
    priority: 'high',
    assigneeId: 'emp-002',
    assigneeName: 'Robert Johnson',
    dueDate: new Date('2024-04-30'),
    estimatedHours: 480,
    actualHours: 220,
    createdAt: new Date('2024-02-16'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: 'task-003',
    projectId: 'proj-001',
    title: 'Electrical conduit installation',
    description: 'Install electrical conduits for floors 1-3',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'emp-003',
    assigneeName: 'David Lee',
    dueDate: new Date('2024-05-15'),
    estimatedHours: 160,
    actualHours: 0,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: 'task-004',
    projectId: 'proj-002',
    title: 'Plumbing rough-in floors 10-15',
    description: 'Complete plumbing rough-in for residential units',
    status: 'in-progress',
    priority: 'high',
    assigneeId: 'emp-004',
    assigneeName: 'Michael Brown',
    dueDate: new Date('2024-04-10'),
    estimatedHours: 320,
    actualHours: 180,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-18'),
  },
  {
    id: 'task-005',
    projectId: 'proj-002',
    title: 'Window installation floors 1-10',
    description: 'Install all windows for lower floors',
    status: 'review',
    priority: 'medium',
    assigneeId: 'emp-005',
    assigneeName: 'James Wilson',
    dueDate: new Date('2024-03-25'),
    estimatedHours: 200,
    actualHours: 195,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: 'task-006',
    projectId: 'proj-004',
    title: 'Bridge deck repair',
    description: 'Repair and resurface main bridge deck',
    status: 'in-progress',
    priority: 'urgent',
    assigneeId: 'emp-006',
    assigneeName: 'Thomas Anderson',
    dueDate: new Date('2024-04-30'),
    estimatedHours: 400,
    actualHours: 150,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-03-19'),
  },
];

// Add tasks to projects
mockProjects.forEach(project => {
  project.tasks = mockTasks.filter(task => task.projectId === project.id);
});

export const getProjects = (filters?: { status?: string; priority?: string; employee_id?: string }) => {
  let filtered = [...mockProjects];

  if (filters?.status) {
    filtered = filtered.filter(p => p.status === filters.status);
  }

  if (filters?.priority) {
    filtered = filtered.filter(p => p.priority === filters.priority);
  }

  if (filters?.employee_id) {
    filtered = filtered.filter(p => p.managerId === filters.employee_id);
  }

  return filtered;
};

export const getProject = (id: string) => {
  return mockProjects.find(p => p.id === id);
};

export const getTasks = (filters?: { project_id?: string; status?: string; assignee_id?: string }) => {
  let filtered = [...mockTasks];

  if (filters?.project_id) {
    filtered = filtered.filter(t => t.projectId === filters.project_id);
  }

  if (filters?.status) {
    filtered = filtered.filter(t => t.status === filters.status);
  }

  if (filters?.assignee_id) {
    filtered = filtered.filter(t => t.assigneeId === filters.assignee_id);
  }

  return filtered;
};

export const recentProjects = mockProjects.slice(0, 5);
export const recentTasks = mockTasks.slice(0, 5);
