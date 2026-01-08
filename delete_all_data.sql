-- Nuclear option: TRUNCATE all tables with CASCADE to delete everything
-- This automatically handles foreign key constraints and is much faster

TRUNCATE TABLE stock_movements CASCADE;
TRUNCATE TABLE order_items CASCADE;
TRUNCATE TABLE invoice_items CASCADE;
TRUNCATE TABLE budget_categories CASCADE;
TRUNCATE TABLE employee_projects CASCADE;
TRUNCATE TABLE time_entries CASCADE;
TRUNCATE TABLE attendance CASCADE;
TRUNCATE TABLE tasks CASCADE;
TRUNCATE TABLE expenses CASCADE;
TRUNCATE TABLE invoices CASCADE;
TRUNCATE TABLE budgets CASCADE;
TRUNCATE TABLE orders CASCADE;
TRUNCATE TABLE documents CASCADE;
TRUNCATE TABLE folders CASCADE;
TRUNCATE TABLE inventory_items CASCADE;
TRUNCATE TABLE employees CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE users CASCADE;

SELECT 'All data nuked successfully' as status;
