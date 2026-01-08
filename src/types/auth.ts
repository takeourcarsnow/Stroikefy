// User & Auth Types
export type UserRole = 'admin' | 'manager' | 'supervisor' | 'worker' | 'accountant' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  department?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Role Permissions
export interface RolePermissions {
  canViewDashboard: boolean;
  canManageProjects: boolean;
  canManageWorkforce: boolean;
  canManageFinance: boolean;
  canManageInventory: boolean;
  canManageDocuments: boolean;
  canViewReports: boolean;
  canManageSettings: boolean;
  canApproveOrders: boolean;
  canExportData: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  admin: {
    canViewDashboard: true,
    canManageProjects: true,
    canManageWorkforce: true,
    canManageFinance: true,
    canManageInventory: true,
    canManageDocuments: true,
    canViewReports: true,
    canManageSettings: true,
    canApproveOrders: true,
    canExportData: true,
  },
  manager: {
    canViewDashboard: true,
    canManageProjects: true,
    canManageWorkforce: true,
    canManageFinance: true,
    canManageInventory: true,
    canManageDocuments: true,
    canViewReports: true,
    canManageSettings: false,
    canApproveOrders: true,
    canExportData: true,
  },
  supervisor: {
    canViewDashboard: true,
    canManageProjects: true,
    canManageWorkforce: true,
    canManageFinance: false,
    canManageInventory: true,
    canManageDocuments: true,
    canViewReports: true,
    canManageSettings: false,
    canApproveOrders: false,
    canExportData: false,
  },
  worker: {
    canViewDashboard: true,
    canManageProjects: false,
    canManageWorkforce: false,
    canManageFinance: false,
    canManageInventory: false,
    canManageDocuments: false,
    canViewReports: false,
    canManageSettings: false,
    canApproveOrders: false,
    canExportData: false,
  },
  accountant: {
    canViewDashboard: true,
    canManageProjects: false,
    canManageWorkforce: false,
    canManageFinance: true,
    canManageInventory: false,
    canManageDocuments: true,
    canViewReports: true,
    canManageSettings: false,
    canApproveOrders: true,
    canExportData: true,
  },
  viewer: {
    canViewDashboard: true,
    canManageProjects: false,
    canManageWorkforce: false,
    canManageFinance: false,
    canManageInventory: false,
    canManageDocuments: false,
    canViewReports: true,
    canManageSettings: false,
    canApproveOrders: false,
    canExportData: false,
  },
};
