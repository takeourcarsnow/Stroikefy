import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@stroikefy.com',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    phone: '+1 555-0101',
    department: 'Management',
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date('2024-03-20'),
  },
  {
    id: '2',
    email: 'manager@stroikefy.com',
    name: 'Sarah Williams',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    role: 'manager',
    phone: '+1 555-0102',
    department: 'Operations',
    createdAt: new Date('2023-02-20'),
    lastLogin: new Date('2024-03-19'),
  },
  {
    id: '3',
    email: 'supervisor@stroikefy.com',
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'supervisor',
    phone: '+1 555-0103',
    department: 'Construction',
    createdAt: new Date('2023-03-10'),
    lastLogin: new Date('2024-03-20'),
  },
  {
    id: '4',
    email: 'accountant@stroikefy.com',
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'accountant',
    phone: '+1 555-0104',
    department: 'Finance',
    createdAt: new Date('2023-04-05'),
    lastLogin: new Date('2024-03-18'),
  },
];

export const currentUser: User = mockUsers[0];
