-- Stroikefy Database Schema for Supabase
-- Run this in your Supabase SQL Editor to create all necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'supervisor', 'accountant', 'user')),
    phone VARCHAR(50),
    department VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

-- =====================================================
-- PROJECTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'planning' CHECK (status IN ('planning', 'in-progress', 'on-hold', 'completed', 'cancelled')),
    priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(15, 2) DEFAULT 0,
    spent DECIMAL(15, 2) DEFAULT 0,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    manager_id UUID REFERENCES users(id),
    manager_name VARCHAR(255),
    client_name VARCHAR(255),
    client_contact VARCHAR(255),
    location_address VARCHAR(500),
    location_city VARCHAR(100),
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    team_size INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TASKS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'review', 'completed')),
    priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assignee_id UUID REFERENCES employees(id),
    assignee_name VARCHAR(255),
    due_date DATE,
    estimated_hours DECIMAL(8, 2) DEFAULT 0,
    actual_hours DECIMAL(8, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- EMPLOYEES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    avatar VARCHAR(500),
    position VARCHAR(255),
    department VARCHAR(100),
    type VARCHAR(50) DEFAULT 'full-time' CHECK (type IN ('full-time', 'part-time', 'contractor')),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on-leave', 'terminated')),
    hire_date DATE,
    salary DECIMAL(12, 2) DEFAULT 0,
    skills TEXT[],
    certifications TEXT[],
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(50),
    emergency_contact_relationship VARCHAR(100),
    address_street VARCHAR(255),
    address_city VARCHAR(100),
    address_state VARCHAR(50),
    address_zip VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- EMPLOYEE_PROJECTS (Junction table)
-- =====================================================
CREATE TABLE IF NOT EXISTS employee_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(employee_id, project_id)
);

-- =====================================================
-- TIME ENTRIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS time_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    employee_name VARCHAR(255),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    project_name VARCHAR(255),
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    task_name VARCHAR(255),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_minutes INTEGER DEFAULT 0,
    total_hours DECIMAL(5, 2) DEFAULT 0,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    approved_by VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ATTENDANCE TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    employee_name VARCHAR(255),
    date DATE NOT NULL,
    check_in TIME,
    check_out TIME,
    status VARCHAR(50) DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'half-day', 'leave')),
    notes TEXT,
    UNIQUE(employee_id, date)
);

-- =====================================================
-- INVOICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(50) CHECK (type IN ('incoming', 'outgoing')),
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    project_name VARCHAR(255),
    client_name VARCHAR(255),
    client_email VARCHAR(255),
    client_address TEXT,
    subtotal DECIMAL(15, 2) DEFAULT 0,
    tax DECIMAL(15, 2) DEFAULT 0,
    total DECIMAL(15, 2) DEFAULT 0,
    issue_date DATE,
    due_date DATE,
    paid_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INVOICE ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity DECIMAL(10, 2) DEFAULT 1,
    unit_price DECIMAL(15, 2) DEFAULT 0,
    total DECIMAL(15, 2) DEFAULT 0
);

-- =====================================================
-- EXPENSES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    description TEXT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    category VARCHAR(50) CHECK (category IN ('materials', 'labor', 'equipment', 'permits', 'insurance', 'transportation', 'other')),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'reimbursed')),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    project_name VARCHAR(255),
    employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    employee_name VARCHAR(255),
    date DATE NOT NULL,
    approved_by VARCHAR(255),
    approved_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BUDGETS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    project_name VARCHAR(255),
    total_budget DECIMAL(15, 2) DEFAULT 0,
    allocated DECIMAL(15, 2) DEFAULT 0,
    spent DECIMAL(15, 2) DEFAULT 0,
    remaining DECIMAL(15, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BUDGET CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS budget_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    budget_id UUID REFERENCES budgets(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    allocated DECIMAL(15, 2) DEFAULT 0,
    spent DECIMAL(15, 2) DEFAULT 0
);

-- =====================================================
-- INVENTORY ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) CHECK (category IN ('construction-materials', 'electrical', 'plumbing', 'safety-gear', 'tools', 'finishing', 'equipment')),
    unit VARCHAR(50),
    quantity INTEGER DEFAULT 0,
    min_quantity INTEGER DEFAULT 0,
    max_quantity INTEGER DEFAULT 0,
    unit_price DECIMAL(12, 2) DEFAULT 0,
    total_value DECIMAL(15, 2) DEFAULT 0,
    location VARCHAR(255),
    supplier VARCHAR(255),
    supplier_contact VARCHAR(255),
    last_restocked DATE,
    stock_status VARCHAR(50) DEFAULT 'in-stock' CHECK (stock_status IN ('in-stock', 'low-stock', 'out-of-stock', 'ordered')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ORDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'shipped', 'delivered', 'cancelled')),
    supplier VARCHAR(255),
    supplier_email VARCHAR(255),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    project_name VARCHAR(255),
    subtotal DECIMAL(15, 2) DEFAULT 0,
    tax DECIMAL(15, 2) DEFAULT 0,
    shipping DECIMAL(15, 2) DEFAULT 0,
    total DECIMAL(15, 2) DEFAULT 0,
    requested_by VARCHAR(255),
    approved_by VARCHAR(255),
    order_date DATE,
    expected_delivery DATE,
    actual_delivery DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ORDER ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    inventory_item_id UUID REFERENCES inventory_items(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(50),
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(12, 2) DEFAULT 0,
    total DECIMAL(15, 2) DEFAULT 0
);

-- =====================================================
-- STOCK MOVEMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS stock_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventory_item_id UUID REFERENCES inventory_items(id) ON DELETE CASCADE,
    item_name VARCHAR(255),
    type VARCHAR(50) CHECK (type IN ('in', 'out', 'transfer', 'adjustment')),
    quantity INTEGER NOT NULL,
    previous_quantity INTEGER,
    new_quantity INTEGER,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    project_name VARCHAR(255),
    reason TEXT,
    performed_by VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- FOLDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS folders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    color VARCHAR(20) DEFAULT '#3b82f6',
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    documents_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- DOCUMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('contract', 'permit', 'blueprint', 'safety', 'photo', 'report', 'certification', 'receipt', 'invoice', 'other')),
    file_type VARCHAR(20),
    file_size INTEGER DEFAULT 0,
    url TEXT,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    project_name VARCHAR(255),
    folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    uploaded_by_name VARCHAR(255),
    tags TEXT[],
    description TEXT,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_manager ON projects(manager_id);
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_time_entries_employee ON time_entries(employee_id);
CREATE INDEX idx_time_entries_project ON time_entries(project_id);
CREATE INDEX idx_time_entries_date ON time_entries(date);
CREATE INDEX idx_attendance_employee ON attendance(employee_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_project ON invoices(project_id);
CREATE INDEX idx_expenses_status ON expenses(status);
CREATE INDEX idx_expenses_project ON expenses(project_id);
CREATE INDEX idx_inventory_items_category ON inventory_items(category);
CREATE INDEX idx_inventory_items_status ON inventory_items(stock_status);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_documents_project ON documents(project_id);
CREATE INDEX idx_documents_folder ON documents(folder_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users to read all data
CREATE POLICY "Allow read access for all authenticated users" ON users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON projects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON employees FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON employee_projects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON time_entries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON attendance FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON invoices FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON invoice_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON expenses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON budgets FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON budget_categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON inventory_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON order_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON stock_movements FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON folders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for all authenticated users" ON documents FOR SELECT TO authenticated USING (true);

-- Allow anon users to read (for demo purposes)
CREATE POLICY "Allow anon read access" ON users FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON projects FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON tasks FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON employees FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON employee_projects FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON time_entries FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON attendance FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON invoices FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON invoice_items FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON expenses FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON budgets FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON budget_categories FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON inventory_items FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON orders FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON order_items FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON stock_movements FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON folders FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon read access" ON documents FOR SELECT TO anon USING (true);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON employees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON budgets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_items_updated_at BEFORE UPDATE ON inventory_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_folders_updated_at BEFORE UPDATE ON folders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
