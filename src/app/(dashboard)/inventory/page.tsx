'use client';

import React, { useState } from 'react';
import { Card, CardHeader, Button, Badge, Input, Select, Tabs, Table, Modal, ModalFooter, Progress, EmptyState, Textarea } from '@/components/ui';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { mockInventoryItems, mockOrders } from '@/data';
import { STOCK_STATUS_COLORS, ORDER_STATUS_COLORS, InventoryItem, Order } from '@/types';
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Package,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Truck,
  Box,
  History,
  DollarSign,
} from 'lucide-react';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const tabs = [
    { id: 'inventory', label: 'Inventory', count: mockInventoryItems.length },
    { id: 'orders', label: 'Orders', count: mockOrders.length },
    { id: 'low-stock', label: 'Low Stock', count: mockInventoryItems.filter(i => i.stockStatus === 'low-stock' || i.stockStatus === 'out-of-stock').length },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'materials', label: 'Materials' },
    { value: 'tools', label: 'Tools' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'safety', label: 'Safety' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'plumbing', label: 'Plumbing' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'ordered', label: 'On Order' },
  ];

  const filteredItems = mockInventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.stockStatus === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const lowStockItems = mockInventoryItems.filter(i => i.stockStatus === 'low-stock' || i.stockStatus === 'out-of-stock');

  // Stats
  const totalItems = mockInventoryItems.length;
  const totalValue = mockInventoryItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const lowStockCount = lowStockItems.length;
  const pendingOrders = mockOrders.filter(o => o.status === 'pending' || o.status === 'approved').length;

  const inventoryColumns = [
    {
      key: 'name',
      header: 'Item',
      render: (item: InventoryItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-surface-100 dark:bg-surface-800 rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-surface-400" />
          </div>
          <div>
            <p className="font-medium text-surface-900 dark:text-white">{item.name}</p>
            <p className="text-xs text-surface-500">{item.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (item: InventoryItem) => (
        <Badge variant="default">{item.category}</Badge>
      ),
    },
    {
      key: 'quantity',
      header: 'Quantity',
      render: (item: InventoryItem) => (
        <div>
          <span className="font-medium text-surface-900 dark:text-white">{item.quantity}</span>
          <span className="text-surface-500"> {item.unit}</span>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Unit Price',
      render: (item: InventoryItem) => formatCurrency(item.unitPrice),
    },
    {
      key: 'value',
      header: 'Total Value',
      render: (item: InventoryItem) => formatCurrency(item.quantity * item.unitPrice),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: InventoryItem) => (
        <Badge variant="custom" className={STOCK_STATUS_COLORS[item.stockStatus]}>
          {item.stockStatus.replace('-', ' ')}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (item: InventoryItem) => (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => {
            setSelectedItem(item);
            setShowOrderModal(true);
          }}
        >
          Order
        </Button>
      ),
    },
  ];

  const orderColumns = [
    {
      key: 'orderNumber',
      header: 'Order #',
      render: (order: Order) => (
        <span className="font-medium text-surface-900 dark:text-white">{order.orderNumber}</span>
      ),
    },
    {
      key: 'items',
      header: 'Items',
      render: (order: Order) => `${order.items.length} items`,
    },
    {
      key: 'supplier',
      header: 'Supplier',
      render: (order: Order) => order.supplier,
    },
    {
      key: 'total',
      header: 'Total',
      render: (order: Order) => formatCurrency(order.total),
    },
    {
      key: 'orderDate',
      header: 'Order Date',
      render: (order: Order) => (order.orderDate ? formatDate(order.orderDate) : '-'),
    },
    {
      key: 'expectedDelivery',
      header: 'Expected Delivery',
      render: (order: Order) => order.expectedDelivery ? formatDate(order.expectedDelivery) : '-',
    },
    {
      key: 'status',
      header: 'Status',
      render: (order: Order) => (
        <Badge variant="custom" className={ORDER_STATUS_COLORS[order.status]}>
          {order.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Inventory</h1>
          <p className="text-surface-500">Manage stock and orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Upload className="h-4 w-4" />}>
            Import
          </Button>
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowAddItemModal(true)}>
            Add Item
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <Package className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">Total Items</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{totalItems}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">Total Value</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{formatCurrency(totalValue)}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">Low Stock</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{lowStockCount}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">Pending Orders</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{pendingOrders}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <Card>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search inventory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" />}
                />
              </div>
              <div className="flex gap-2">
                <Select
                  options={categoryOptions}
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                  className="w-40"
                />
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  className="w-40"
                />
              </div>
            </div>
          </Card>

          {filteredItems.length > 0 ? (
            <Card className="p-0 overflow-hidden">
              <Table columns={inventoryColumns} data={filteredItems} />
            </Card>
          ) : (
            <EmptyState
              icon={<Package />}
              title="No items found"
              description="Try adjusting your search or add new inventory items"
              action={
                <Button onClick={() => setShowAddItemModal(true)} leftIcon={<Plus className="h-4 w-4" />}>
                  Add Item
                </Button>
              }
            />
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button leftIcon={<ShoppingCart className="h-4 w-4" />} onClick={() => setShowOrderModal(true)}>
              New Order
            </Button>
          </div>

          {mockOrders.length > 0 ? (
            <Card className="p-0 overflow-hidden">
              <Table columns={orderColumns} data={mockOrders} />
            </Card>
          ) : (
            <EmptyState
              icon={<ShoppingCart />}
              title="No orders yet"
              description="Create your first order to restock inventory"
              action={
                <Button onClick={() => setShowOrderModal(true)} leftIcon={<Plus className="h-4 w-4" />}>
                  New Order
                </Button>
              }
            />
          )}
        </div>
      )}

      {/* Low Stock Tab */}
      {activeTab === 'low-stock' && (
        <div className="space-y-4">
          {lowStockItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockItems.map(item => (
                <Card key={item.id} className="border-l-4 border-l-red-500">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-surface-900 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-surface-500">{item.sku}</p>
                      </div>
                    </div>
                    <Badge variant="custom" className={STOCK_STATUS_COLORS[item.stockStatus]}>
                      {item.stockStatus.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-surface-500">Current Stock</span>
                      <span className="font-medium text-red-600">{item.quantity} {item.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Minimum Level</span>
                      <span className="font-medium text-surface-900 dark:text-white">{item.minQuantity} {item.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Reorder Quantity</span>
                      <span className="font-medium text-surface-900 dark:text-white">{item.maxQuantity} {item.unit}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        setSelectedItem(item);
                        setShowOrderModal(true);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Reorder Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <Box className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">All stocked up!</h3>
              <p className="text-surface-500">No items are running low on stock</p>
            </Card>
          )}
        </div>
      )}

      {/* Add Item Modal */}
      <Modal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        title="Add Inventory Item"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Item Name" placeholder="Steel Beam" />
            <Input label="SKU" placeholder="STL-001" />
          </div>
          <Textarea label="Description" placeholder="Item description..." />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              options={categoryOptions.filter(c => c.value !== 'all')}
              placeholder="Select category"
            />
            <Input label="Unit" placeholder="pcs, kg, m, etc." />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Quantity" type="number" placeholder="0" />
            <Input label="Min Quantity" type="number" placeholder="10" />
            <Input label="Reorder Qty" type="number" placeholder="50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Unit Price" type="number" placeholder="0.00" leftIcon={<DollarSign className="h-4 w-4" />} />
            <Input label="Location" placeholder="Warehouse A, Shelf 3" />
          </div>
          <Input label="Supplier" placeholder="Supplier name" />
        </form>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowAddItemModal(false)}>Cancel</Button>
          <Button>Add Item</Button>
        </ModalFooter>
      </Modal>

      {/* Order Modal */}
      <Modal
        isOpen={showOrderModal}
        onClose={() => {
          setShowOrderModal(false);
          setSelectedItem(null);
        }}
        title={selectedItem ? `Order ${selectedItem.name}` : 'New Order'}
        size="md"
      >
        <form className="space-y-4">
          {selectedItem ? (
            <>
              <div className="p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-primary-600" />
                  <div>
                    <h4 className="font-semibold text-surface-900 dark:text-white">{selectedItem.name}</h4>
                    <p className="text-sm text-surface-500">{selectedItem.sku}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-surface-500">Current Stock</p>
                  <p className="font-medium text-surface-900 dark:text-white">{selectedItem.quantity} {selectedItem.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500">Suggested Qty</p>
                  <p className="font-medium text-surface-900 dark:text-white">{selectedItem.maxQuantity} {selectedItem.unit}</p>
                </div>
              </div>
            </>
          ) : (
            <Select
              label="Item"
              options={mockInventoryItems.map(i => ({ value: i.id, label: i.name }))}
              placeholder="Select item to order"
            />
          )}
          
          <Input 
            label="Quantity" 
            type="number" 
            placeholder={selectedItem?.maxQuantity?.toString() || "0"} 
            defaultValue={selectedItem?.maxQuantity}
          />
          <Input label="Supplier" placeholder={selectedItem?.supplier || "Supplier name"} defaultValue={selectedItem?.supplier} />
          <Input label="Expected Delivery Date" type="date" />
          <Textarea label="Notes" placeholder="Order notes..." />
        </form>
        <ModalFooter>
          <Button variant="ghost" onClick={() => {
            setShowOrderModal(false);
            setSelectedItem(null);
          }}>Cancel</Button>
          <Button>Place Order</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
