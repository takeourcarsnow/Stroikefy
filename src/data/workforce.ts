import { Employee, TimeEntry, Attendance } from '@/types';

export const mockEmployees: Employee[] = [
  {
    id: 'emp-001',
    employeeId: 'EMP-2024-001',
    name: 'John Smith',
    email: 'john.smith@stroikefy.com',
    phone: '+1 555-1001',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    position: 'Senior Site Engineer',
    department: 'Engineering',
    type: 'full-time',
    status: 'active',
    hireDate: new Date('2021-03-15'),
    salary: 85000,
    projectIds: ['proj-001', 'proj-002'],
    skills: ['Structural Engineering', 'Project Management', 'AutoCAD'],
    certifications: ['PE License', 'OSHA 30'],
    emergencyContact: {
      name: 'Mary Smith',
      phone: '+1 555-1002',
      relationship: 'Spouse',
    },
    address: {
      street: '123 Oak Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
    createdAt: new Date('2021-03-15'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: 'emp-002',
    employeeId: 'EMP-2024-002',
    name: 'Robert Johnson',
    email: 'robert.j@stroikefy.com',
    phone: '+1 555-1003',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    position: 'Steel Works Supervisor',
    department: 'Construction',
    type: 'full-time',
    status: 'active',
    hireDate: new Date('2020-07-22'),
    salary: 72000,
    projectIds: ['proj-001'],
    skills: ['Steel Fabrication', 'Welding', 'Safety Management'],
    certifications: ['AWS CWI', 'OSHA 30'],
    createdAt: new Date('2020-07-22'),
    updatedAt: new Date('2024-03-19'),
  },
  {
    id: 'emp-003',
    employeeId: 'EMP-2024-003',
    name: 'David Lee',
    email: 'david.lee@stroikefy.com',
    phone: '+1 555-1004',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    position: 'Master Electrician',
    department: 'Electrical',
    type: 'full-time',
    status: 'active',
    hireDate: new Date('2019-11-10'),
    salary: 78000,
    projectIds: ['proj-001', 'proj-004'],
    skills: ['Electrical Systems', 'PLC Programming', 'Code Compliance'],
    certifications: ['Master Electrician License', 'NFPA 70E'],
    createdAt: new Date('2019-11-10'),
    updatedAt: new Date('2024-03-18'),
  },
  {
    id: 'emp-004',
    employeeId: 'EMP-2024-004',
    name: 'Michael Brown',
    email: 'michael.b@stroikefy.com',
    phone: '+1 555-1005',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    position: 'Plumbing Foreman',
    department: 'Plumbing',
    type: 'full-time',
    status: 'active',
    hireDate: new Date('2022-01-08'),
    salary: 68000,
    projectIds: ['proj-002'],
    skills: ['Plumbing Systems', 'Blueprint Reading', 'Team Leadership'],
    certifications: ['Journeyman Plumber', 'OSHA 10'],
    createdAt: new Date('2022-01-08'),
    updatedAt: new Date('2024-03-17'),
  },
  {
    id: 'emp-005',
    employeeId: 'EMP-2024-005',
    name: 'James Wilson',
    email: 'james.w@stroikefy.com',
    phone: '+1 555-1006',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
    position: 'Glass Installation Specialist',
    department: 'Finishing',
    type: 'contractor',
    status: 'active',
    hireDate: new Date('2023-06-15'),
    salary: 55000,
    projectIds: ['proj-002'],
    skills: ['Glass Installation', 'Curtain Walls', 'Sealants'],
    certifications: ['IGMA Certified'],
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2024-03-16'),
  },
  {
    id: 'emp-006',
    employeeId: 'EMP-2024-006',
    name: 'Thomas Anderson',
    email: 'thomas.a@stroikefy.com',
    phone: '+1 555-1007',
    avatar: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=150&h=150&fit=crop&crop=face',
    position: 'Bridge Construction Lead',
    department: 'Infrastructure',
    type: 'full-time',
    status: 'active',
    hireDate: new Date('2018-04-20'),
    salary: 92000,
    projectIds: ['proj-004'],
    skills: ['Bridge Construction', 'Heavy Equipment', 'Safety Protocols'],
    certifications: ['PE License', 'OSHA 30', 'First Aid'],
    createdAt: new Date('2018-04-20'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: 'emp-007',
    employeeId: 'EMP-2024-007',
    name: 'Sarah Martinez',
    email: 'sarah.m@stroikefy.com',
    phone: '+1 555-1008',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    position: 'Safety Manager',
    department: 'Safety',
    type: 'full-time',
    status: 'active',
    hireDate: new Date('2021-09-01'),
    salary: 75000,
    projectIds: ['proj-001', 'proj-002', 'proj-004'],
    skills: ['Safety Management', 'Risk Assessment', 'Training'],
    certifications: ['CSP', 'OSHA 500', 'First Aid Instructor'],
    createdAt: new Date('2021-09-01'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: 'emp-008',
    employeeId: 'EMP-2024-008',
    name: 'Kevin Park',
    email: 'kevin.p@stroikefy.com',
    phone: '+1 555-1009',
    position: 'Concrete Specialist',
    department: 'Construction',
    type: 'full-time',
    status: 'on-leave',
    hireDate: new Date('2022-05-10'),
    salary: 62000,
    projectIds: ['proj-001'],
    skills: ['Concrete Work', 'Form Setting', 'Quality Control'],
    certifications: ['ACI Certification'],
    createdAt: new Date('2022-05-10'),
    updatedAt: new Date('2024-03-10'),
  },
];

export const mockTimeEntries: TimeEntry[] = [
  {
    id: 'time-001',
    employeeId: 'emp-001',
    employeeName: 'John Smith',
    projectId: 'proj-001',
    projectName: 'Downtown Office Complex',
    taskId: 'task-002',
    taskName: 'Steel framework installation',
    date: new Date('2024-03-20'),
    startTime: '07:00',
    endTime: '16:00',
    breakMinutes: 60,
    totalHours: 8,
    description: 'Supervised steel frame installation for floor 3',
    status: 'approved',
    approvedBy: 'Sarah Williams',
    createdAt: new Date('2024-03-20'),
  },
  {
    id: 'time-002',
    employeeId: 'emp-002',
    employeeName: 'Robert Johnson',
    projectId: 'proj-001',
    projectName: 'Downtown Office Complex',
    taskId: 'task-002',
    taskName: 'Steel framework installation',
    date: new Date('2024-03-20'),
    startTime: '06:30',
    endTime: '15:30',
    breakMinutes: 45,
    totalHours: 8.25,
    description: 'Welding and assembly of steel beams',
    status: 'approved',
    approvedBy: 'Sarah Williams',
    createdAt: new Date('2024-03-20'),
  },
  {
    id: 'time-003',
    employeeId: 'emp-003',
    employeeName: 'David Lee',
    projectId: 'proj-001',
    projectName: 'Downtown Office Complex',
    date: new Date('2024-03-20'),
    startTime: '08:00',
    endTime: '17:00',
    breakMinutes: 60,
    totalHours: 8,
    description: 'Electrical planning and material prep',
    status: 'pending',
    createdAt: new Date('2024-03-20'),
  },
  {
    id: 'time-004',
    employeeId: 'emp-004',
    employeeName: 'Michael Brown',
    projectId: 'proj-002',
    projectName: 'Riverside Residential Tower',
    taskId: 'task-004',
    taskName: 'Plumbing rough-in floors 10-15',
    date: new Date('2024-03-20'),
    startTime: '07:00',
    endTime: '16:30',
    breakMinutes: 60,
    totalHours: 8.5,
    description: 'Installed plumbing for units 1201-1205',
    status: 'approved',
    approvedBy: 'Sarah Williams',
    createdAt: new Date('2024-03-20'),
  },
  {
    id: 'time-005',
    employeeId: 'emp-006',
    employeeName: 'Thomas Anderson',
    projectId: 'proj-004',
    projectName: 'Harbor Bridge Renovation',
    taskId: 'task-006',
    taskName: 'Bridge deck repair',
    date: new Date('2024-03-20'),
    startTime: '05:00',
    endTime: '14:00',
    breakMinutes: 45,
    totalHours: 8.25,
    description: 'Early shift for deck repair - section B',
    status: 'pending',
    createdAt: new Date('2024-03-20'),
  },
];

export const mockAttendance: Attendance[] = [
  {
    id: 'att-001',
    employeeId: 'emp-001',
    employeeName: 'John Smith',
    date: new Date('2024-03-20'),
    checkIn: '07:00',
    checkOut: '16:00',
    status: 'present',
  },
  {
    id: 'att-002',
    employeeId: 'emp-002',
    employeeName: 'Robert Johnson',
    date: new Date('2024-03-20'),
    checkIn: '06:30',
    checkOut: '15:30',
    status: 'present',
  },
  {
    id: 'att-003',
    employeeId: 'emp-003',
    employeeName: 'David Lee',
    date: new Date('2024-03-20'),
    checkIn: '08:15',
    checkOut: '17:00',
    status: 'late',
    notes: 'Traffic delay - notified supervisor',
  },
  {
    id: 'att-004',
    employeeId: 'emp-004',
    employeeName: 'Michael Brown',
    date: new Date('2024-03-20'),
    checkIn: '07:00',
    checkOut: '16:30',
    status: 'present',
  },
  {
    id: 'att-005',
    employeeId: 'emp-005',
    employeeName: 'James Wilson',
    date: new Date('2024-03-20'),
    checkIn: '07:30',
    checkOut: '12:00',
    status: 'half-day',
    notes: 'Scheduled half day',
  },
  {
    id: 'att-006',
    employeeId: 'emp-006',
    employeeName: 'Thomas Anderson',
    date: new Date('2024-03-20'),
    checkIn: '05:00',
    checkOut: '14:00',
    status: 'present',
  },
  {
    id: 'att-007',
    employeeId: 'emp-007',
    employeeName: 'Sarah Martinez',
    date: new Date('2024-03-20'),
    checkIn: '08:00',
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'att-008',
    employeeId: 'emp-008',
    employeeName: 'Kevin Park',
    date: new Date('2024-03-20'),
    status: 'leave',
    notes: 'Approved medical leave',
  },
];

export const getEmployees = (filters?: { status?: string; department?: string; project_id?: string }) => {
  let filtered = [...mockEmployees];

  if (filters?.status) {
    filtered = filtered.filter(e => e.status === filters.status);
  }

  if (filters?.department) {
    filtered = filtered.filter(e => e.department === filters.department);
  }

  if (filters?.project_id) {
    filtered = filtered.filter(e => e.projectIds.includes(filters.project_id!));
  }

  return filtered;
};

export const getEmployee = (id: string) => {
  return mockEmployees.find(e => e.id === id);
};

export const getTimeEntries = (filters?: { employee_id?: string; project_id?: string; date_range?: { start: string; end: string } }) => {
  let filtered = [...mockTimeEntries];

  if (filters?.employee_id) {
    filtered = filtered.filter(t => t.employeeId === filters.employee_id);
  }

  if (filters?.project_id) {
    filtered = filtered.filter(t => t.projectId === filters.project_id);
  }

  if (filters?.date_range) {
    const start = new Date(filters.date_range.start);
    const end = new Date(filters.date_range.end);
    filtered = filtered.filter(t => t.date >= start && t.date <= end);
  }

  return filtered;
};

export const getAttendance = (date?: string) => {
  if (date) {
    const targetDate = new Date(date);
    return mockAttendance.filter(a => a.date.toDateString() === targetDate.toDateString());
  }
  return mockAttendance;
};
