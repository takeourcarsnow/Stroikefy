// Inventory Item Types
export type InventoryCategory = 
  | 'construction-materials' 
  | 'tools' 
  | 'equipment' 
  | 'safety-gear' 
  | 'electrical' 
  | 'plumbing' 
  | 'finishing' 
  | 'other';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'ordered';

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: InventoryCategory;
  unit: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  unitPrice: number;
  totalValue: number;
  location: string;
  supplier?: string;
  supplierContact?: string;
  lastRestocked?: Date;
  stockStatus: StockStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export type OrderStatus = 'draft' | 'pending' | 'approved' | 'ordered' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  supplier: string;
  supplierEmail?: string;
  projectId?: string;
  projectName?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  requestedBy: string;
  approvedBy?: string;
  orderDate?: Date;
  expectedDelivery?: Date;
  actualDelivery?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  inventoryItemId: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Stock Movement
export type MovementType = 'in' | 'out' | 'transfer' | 'adjustment';

export interface StockMovement {
  id: string;
  inventoryItemId: string;
  itemName: string;
  type: MovementType;
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  projectId?: string;
  projectName?: string;
  reason: string;
  performedBy: string;
  createdAt: Date;
}

// Status colors
export const STOCK_STATUS_COLORS: Record<StockStatus, string> = {
  'in-stock': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'low-stock': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'out-of-stock': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'ordered': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  'draft': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
  'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'approved': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'ordered': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'shipped': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  'delivered': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export const INVENTORY_CATEGORY_LABELS: Record<InventoryCategory, string> = {
  'construction-materials': 'Construction Materials',
  'tools': 'Tools',
  'equipment': 'Equipment',
  'safety-gear': 'Safety Gear',
  'electrical': 'Electrical',
  'plumbing': 'Plumbing',
  'finishing': 'Finishing Materials',
  'other': 'Other',
};
