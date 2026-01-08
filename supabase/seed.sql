-- Stroikefy Demo Data Seed
-- Run this after creating the schema to populate with demo data

-- =====================================================
-- USERS
-- =====================================================
INSERT INTO users (id, email, name, avatar, role, phone, department, created_at, last_login) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@stroikefy.com', 'Alex Johnson', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'admin', '+1 555-0101', 'Management', '2023-01-15T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440002', 'manager@stroikefy.com', 'Sarah Williams', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', 'manager', '+1 555-0102', 'Operations', '2023-02-20T00:00:00Z', '2024-03-19T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440003', 'supervisor@stroikefy.com', 'Mike Chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'supervisor', '+1 555-0103', 'Construction', '2023-03-10T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440004', 'accountant@stroikefy.com', 'Emily Davis', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'accountant', '+1 555-0104', 'Finance', '2023-04-05T00:00:00Z', '2024-03-18T00:00:00Z');

-- =====================================================
-- EMPLOYEES
-- =====================================================
INSERT INTO employees (id, employee_id, name, email, phone, avatar, position, department, type, status, hire_date, salary, skills, certifications, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship, address_street, address_city, address_state, address_zip, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'EMP-2024-001', 'John Smith', 'john.smith@stroikefy.com', '+1 555-1001', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 'Senior Site Engineer', 'Engineering', 'full-time', 'active', '2021-03-15', 85000, ARRAY['Structural Engineering', 'Project Management', 'AutoCAD'], ARRAY['PE License', 'OSHA 30'], 'Mary Smith', '+1 555-1002', 'Spouse', '123 Oak Street', 'New York', 'NY', '10001', '2021-03-15T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440011', 'EMP-2024-002', 'Robert Johnson', 'robert.j@stroikefy.com', '+1 555-1003', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'Steel Works Supervisor', 'Construction', 'full-time', 'active', '2020-07-22', 72000, ARRAY['Steel Fabrication', 'Welding', 'Safety Management'], ARRAY['AWS CWI', 'OSHA 30'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-07-22T00:00:00Z', '2024-03-19T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440012', 'EMP-2024-003', 'David Lee', 'david.lee@stroikefy.com', '+1 555-1004', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', 'Master Electrician', 'Electrical', 'full-time', 'active', '2019-11-10', 78000, ARRAY['Electrical Systems', 'PLC Programming', 'Code Compliance'], ARRAY['Master Electrician License', 'NFPA 70E'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-11-10T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440013', 'EMP-2024-004', 'Michael Brown', 'michael.b@stroikefy.com', '+1 555-1005', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'Plumbing Foreman', 'Plumbing', 'full-time', 'active', '2022-01-08', 68000, ARRAY['Plumbing Systems', 'Blueprint Reading', 'Team Leadership'], ARRAY['Journeyman Plumber', 'OSHA 10'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-08T00:00:00Z', '2024-03-17T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440014', 'EMP-2024-005', 'James Wilson', 'james.w@stroikefy.com', '+1 555-1006', 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face', 'Glass Installation Specialist', 'Finishing', 'contractor', 'active', '2023-06-15', 55000, ARRAY['Glass Installation', 'Curtain Walls', 'Sealants'], ARRAY['IGMA Certified'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-06-15T00:00:00Z', '2024-03-16T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440015', 'EMP-2024-006', 'Thomas Anderson', 'thomas.a@stroikefy.com', '+1 555-1007', 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=150&h=150&fit=crop&crop=face', 'Bridge Construction Lead', 'Infrastructure', 'full-time', 'active', '2018-04-20', 92000, ARRAY['Bridge Construction', 'Heavy Equipment', 'Safety Protocols'], ARRAY['PE License', 'OSHA 30', 'First Aid'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-04-20T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440016', 'EMP-2024-007', 'Sarah Martinez', 'sarah.m@stroikefy.com', '+1 555-1008', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face', 'Safety Manager', 'Safety', 'full-time', 'active', '2021-09-01', 75000, ARRAY['Safety Management', 'Risk Assessment', 'Training'], ARRAY['CSP', 'OSHA 500', 'First Aid Instructor'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-09-01T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440017', 'EMP-2024-008', 'Kevin Park', 'kevin.p@stroikefy.com', NULL, NULL, 'Concrete Specialist', 'Construction', 'full-time', 'on-leave', '2022-05-10', 62000, ARRAY['Concrete Work', 'Form Setting', 'Quality Control'], ARRAY['ACI Certification'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-10T00:00:00Z', '2024-03-10T00:00:00Z');

-- =====================================================
-- PROJECTS
-- =====================================================
INSERT INTO projects (id, name, description, status, priority, start_date, end_date, budget, spent, progress, manager_id, manager_name, client_name, client_contact, location_address, location_city, location_lat, location_lng, team_size, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', 'A 15-story modern office building with underground parking and rooftop amenities.', 'in-progress', 'high', '2024-01-15', '2025-06-30', 12500000, 4200000, 34, '550e8400-e29b-41d4-a716-446655440002', 'Sarah Williams', 'MetroCity Developments', 'contact@metrocity.com', '123 Main Street', 'New York', 40.7128, -74.006, 45, '2024-01-10T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440021', 'Riverside Residential Tower', 'Luxury 25-floor residential building with 200 units and premium amenities.', 'in-progress', 'critical', '2023-09-01', '2025-03-31', 28000000, 15400000, 55, '550e8400-e29b-41d4-a716-446655440002', 'Sarah Williams', 'Riverside Properties LLC', 'info@riversideprops.com', '456 River Road', 'New York', 40.7282, -73.7949, 78, '2023-08-15T00:00:00Z', '2024-03-19T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440022', 'Green Valley Shopping Mall', 'Modern shopping mall with 150 retail spaces and entertainment zone.', 'planning', 'medium', '2024-06-01', '2026-12-31', 45000000, 500000, 5, '550e8400-e29b-41d4-a716-446655440003', 'Mike Chen', 'Valley Retail Group', 'projects@valleyretail.com', '789 Valley Boulevard', 'Los Angeles', 34.0522, -118.2437, 12, '2024-02-01T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440023', 'Harbor Bridge Renovation', 'Complete renovation and structural upgrade of the historic harbor bridge.', 'in-progress', 'high', '2024-02-01', '2024-11-30', 8500000, 2800000, 42, '550e8400-e29b-41d4-a716-446655440003', 'Mike Chen', 'City Department of Transportation', 'transport@citygov.com', 'Harbor Bridge', 'San Francisco', 37.7749, -122.4194, 35, '2024-01-20T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440024', 'Tech Park Campus', 'Modern tech campus with 5 buildings, parking structure, and green spaces.', 'on-hold', 'medium', '2024-03-01', '2026-06-30', 65000000, 3200000, 8, '550e8400-e29b-41d4-a716-446655440002', 'Sarah Williams', 'TechGiant Inc.', 'construction@techgiant.com', '1000 Innovation Drive', 'Austin', 30.2672, -97.7431, 25, '2024-02-15T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440025', 'Community Hospital Expansion', 'Adding a new wing with 100 beds and modern medical facilities.', 'completed', 'critical', '2022-06-01', '2024-02-28', 32000000, 31500000, 100, '550e8400-e29b-41d4-a716-446655440002', 'Sarah Williams', 'City Health Services', 'admin@cityhealth.org', '500 Health Avenue', 'Chicago', 41.8781, -87.6298, 0, '2022-05-15T00:00:00Z', '2024-02-28T00:00:00Z');

-- =====================================================
-- EMPLOYEE PROJECTS
-- =====================================================
INSERT INTO employee_projects (employee_id, project_id, assigned_at) VALUES
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440020', '2024-01-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440021', '2023-09-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440020', '2024-01-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440020', '2024-01-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440023', '2024-02-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440021', '2023-09-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440021', '2023-09-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440023', '2024-02-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440020', '2024-01-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440021', '2023-09-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440023', '2024-02-01T00:00:00Z');

-- =====================================================
-- TASKS
-- =====================================================
INSERT INTO tasks (id, project_id, title, description, status, priority, assignee_id, assignee_name, due_date, estimated_hours, actual_hours, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440020', 'Foundation excavation', 'Complete excavation for the main building foundation', 'completed', 'high', '550e8400-e29b-41d4-a716-446655440010', 'John Smith', '2024-02-15', 240, 256, '2024-01-15T00:00:00Z', '2024-02-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440020', 'Steel framework installation', 'Install main steel framework for floors 1-5', 'in-progress', 'high', '550e8400-e29b-41d4-a716-446655440011', 'Robert Johnson', '2024-04-30', 480, 220, '2024-02-16T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440020', 'Electrical conduit installation', 'Install electrical conduits for floors 1-3', 'todo', 'medium', '550e8400-e29b-41d4-a716-446655440012', 'David Lee', '2024-05-15', 160, 0, '2024-03-01T00:00:00Z', '2024-03-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440021', 'Plumbing rough-in floors 10-15', 'Complete plumbing rough-in for residential units', 'in-progress', 'high', '550e8400-e29b-41d4-a716-446655440013', 'Michael Brown', '2024-04-10', 320, 180, '2024-02-01T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440021', 'Window installation floors 1-10', 'Install all windows for lower floors', 'review', 'medium', '550e8400-e29b-41d4-a716-446655440014', 'James Wilson', '2024-03-25', 200, 195, '2024-02-15T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440035', '550e8400-e29b-41d4-a716-446655440023', 'Bridge deck repair', 'Repair and resurface main bridge deck', 'in-progress', 'urgent', '550e8400-e29b-41d4-a716-446655440015', 'Thomas Anderson', '2024-04-30', 400, 150, '2024-02-20T00:00:00Z', '2024-03-19T00:00:00Z');

-- =====================================================
-- TIME ENTRIES
-- =====================================================
INSERT INTO time_entries (id, employee_id, employee_name, project_id, project_name, task_id, task_name, date, start_time, end_time, break_minutes, total_hours, description, status, approved_by, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440010', 'John Smith', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', '550e8400-e29b-41d4-a716-446655440031', 'Steel framework installation', '2024-03-20', '07:00', '16:00', 60, 8, 'Supervised steel frame installation for floor 3', 'approved', 'Sarah Williams', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440011', 'Robert Johnson', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', '550e8400-e29b-41d4-a716-446655440031', 'Steel framework installation', '2024-03-20', '06:30', '15:30', 45, 8.25, 'Welding and assembly of steel beams', 'approved', 'Sarah Williams', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440012', 'David Lee', '550e8400-e29b-41d4-a716-446655440020', NULL, NULL, '2024-03-20', '08:00', '17:00', 60, 8, 'Electrical planning and material prep', 'pending', NULL, '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440043', '550e8400-e29b-41d4-a716-446655440013', 'Michael Brown', '550e8400-e29b-41d4-a716-446655440021', 'Riverside Residential Tower', '550e8400-e29b-41d4-a716-446655440033', 'Plumbing rough-in floors 10-15', '2024-03-20', '07:00', '16:30', 60, 8.5, 'Installed plumbing for units 1201-1205', 'approved', 'Sarah Williams', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440044', '550e8400-e29b-41d4-a716-446655440015', 'Thomas Anderson', '550e8400-e29b-41d4-a716-446655440023', 'Harbor Bridge Renovation', '550e8400-e29b-41d4-a716-446655440035', 'Bridge deck repair', '2024-03-20', '05:00', '14:00', 45, 8.25, 'Early shift for deck repair - section B', 'pending', NULL, '2024-03-20T00:00:00Z');

-- =====================================================
-- ATTENDANCE
-- =====================================================
INSERT INTO attendance (id, employee_id, employee_name, date, check_in, check_out, status, notes) VALUES
('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440010', 'John Smith', '2024-03-20', '07:00', '16:00', 'present', NULL),
('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440011', 'Robert Johnson', '2024-03-20', '06:30', '15:30', 'present', NULL),
('550e8400-e29b-41d4-a716-446655440052', '550e8400-e29b-41d4-a716-446655440012', 'David Lee', '2024-03-20', '08:15', '17:00', 'late', 'Traffic delay - notified supervisor'),
('550e8400-e29b-41d4-a716-446655440053', '550e8400-e29b-41d4-a716-446655440013', 'Michael Brown', '2024-03-20', '07:00', '16:30', 'present', NULL),
('550e8400-e29b-41d4-a716-446655440054', '550e8400-e29b-41d4-a716-446655440014', 'James Wilson', '2024-03-20', '07:30', '12:00', 'half-day', 'Scheduled half day'),
('550e8400-e29b-41d4-a716-446655440055', '550e8400-e29b-41d4-a716-446655440015', 'Thomas Anderson', '2024-03-20', '05:00', '14:00', 'present', NULL),
('550e8400-e29b-41d4-a716-446655440056', '550e8400-e29b-41d4-a716-446655440016', 'Sarah Martinez', '2024-03-20', '08:00', '17:00', 'present', NULL),
('550e8400-e29b-41d4-a716-446655440057', '550e8400-e29b-41d4-a716-446655440017', 'Kevin Park', '2024-03-20', NULL, NULL, 'leave', 'Approved medical leave');

-- =====================================================
-- INVOICES
-- =====================================================
INSERT INTO invoices (id, invoice_number, type, status, project_id, project_name, client_name, client_email, client_address, subtotal, tax, total, issue_date, due_date, paid_date, notes, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440060', 'INV-2024-001', 'outgoing', 'paid', '550e8400-e29b-41d4-a716-446655440025', 'Community Hospital Expansion', 'City Health Services', 'billing@cityhealth.org', '500 Health Avenue, Chicago, IL 60601', 5850000, 0, 5850000, '2024-02-28', '2024-03-28', '2024-03-15', 'Final payment for completed project', '2024-02-28T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440061', 'INV-2024-002', 'outgoing', 'sent', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', 'MetroCity Developments', 'ap@metrocity.com', '123 Main Street, New York, NY 10001', 1650000, 0, 1650000, '2024-03-01', '2024-03-31', NULL, 'Monthly progress payment', '2024-03-01T00:00:00Z', '2024-03-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440062', 'INV-2024-003', 'outgoing', 'overdue', '550e8400-e29b-41d4-a716-446655440021', 'Riverside Residential Tower', 'Riverside Properties LLC', 'finance@riversideprops.com', '456 River Road, New York, NY 10002', 2800000, 0, 2800000, '2024-02-01', '2024-03-01', NULL, 'OVERDUE - Please remit payment immediately', '2024-02-01T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440063', 'INV-2024-004', 'incoming', 'paid', NULL, NULL, 'Steel Supply Co.', 'orders@steelsupply.com', NULL, 292500, 23400, 315900, '2024-03-10', '2024-04-10', '2024-03-18', NULL, '2024-03-10T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440064', 'INV-2024-005', 'incoming', 'sent', NULL, NULL, 'Concrete Masters Inc.', 'billing@concretemasters.com', NULL, 206000, 16480, 222480, '2024-03-15', '2024-04-15', NULL, NULL, '2024-03-15T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440065', 'INV-2024-006', 'outgoing', 'draft', '550e8400-e29b-41d4-a716-446655440023', 'Harbor Bridge Renovation', 'City Department of Transportation', 'ap@citygov.com', NULL, 950000, 0, 950000, '2024-03-20', '2024-04-20', NULL, 'Draft - pending approval', '2024-03-20T00:00:00Z', '2024-03-20T00:00:00Z');

-- =====================================================
-- INVOICE ITEMS
-- =====================================================
INSERT INTO invoice_items (id, invoice_id, description, quantity, unit_price, total) VALUES
('550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440060', 'Final Construction Payment', 1, 5000000, 5000000),
('550e8400-e29b-41d4-a716-446655440071', '550e8400-e29b-41d4-a716-446655440060', 'Change Order #15 - Additional ICU Units', 1, 850000, 850000),
('550e8400-e29b-41d4-a716-446655440072', '550e8400-e29b-41d4-a716-446655440061', 'Progress Payment - February 2024', 1, 1200000, 1200000),
('550e8400-e29b-41d4-a716-446655440073', '550e8400-e29b-41d4-a716-446655440061', 'Steel Materials', 1, 450000, 450000),
('550e8400-e29b-41d4-a716-446655440074', '550e8400-e29b-41d4-a716-446655440062', 'Progress Payment - January 2024', 1, 2800000, 2800000),
('550e8400-e29b-41d4-a716-446655440075', '550e8400-e29b-41d4-a716-446655440063', 'Structural Steel Beams', 500, 450, 225000),
('550e8400-e29b-41d4-a716-446655440076', '550e8400-e29b-41d4-a716-446655440063', 'Steel Plates', 200, 320, 64000),
('550e8400-e29b-41d4-a716-446655440077', '550e8400-e29b-41d4-a716-446655440063', 'Delivery Fee', 1, 3500, 3500),
('550e8400-e29b-41d4-a716-446655440078', '550e8400-e29b-41d4-a716-446655440064', 'Ready-Mix Concrete (cubic yards)', 1200, 145, 174000),
('550e8400-e29b-41d4-a716-446655440079', '550e8400-e29b-41d4-a716-446655440064', 'Pumping Service', 40, 800, 32000),
('550e8400-e29b-41d4-a716-446655440080', '550e8400-e29b-41d4-a716-446655440065', 'Progress Payment - March 2024', 1, 950000, 950000);

-- =====================================================
-- EXPENSES
-- =====================================================
INSERT INTO expenses (id, description, amount, category, status, project_id, project_name, employee_id, employee_name, date, approved_by, approved_at, notes, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440090', 'Steel reinforcement bars', 45000, 'materials', 'approved', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', '550e8400-e29b-41d4-a716-446655440010', 'John Smith', '2024-03-15', 'Sarah Williams', '2024-03-16', NULL, '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440091', 'Excavator rental - 2 weeks', 12500, 'equipment', 'approved', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', '550e8400-e29b-41d4-a716-446655440011', 'Robert Johnson', '2024-03-10', 'Sarah Williams', '2024-03-11', NULL, '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440092', 'Safety equipment purchase', 3500, 'other', 'approved', NULL, NULL, '550e8400-e29b-41d4-a716-446655440016', 'Sarah Martinez', '2024-03-12', 'Alex Johnson', '2024-03-12', 'Hard hats, vests, and safety glasses', '2024-03-12T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440093', 'Concrete pump service', 8200, 'labor', 'pending', '550e8400-e29b-41d4-a716-446655440021', 'Riverside Residential Tower', '550e8400-e29b-41d4-a716-446655440013', 'Michael Brown', '2024-03-18', NULL, NULL, NULL, '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440094', 'Building permit renewal', 2500, 'permits', 'approved', '550e8400-e29b-41d4-a716-446655440023', 'Harbor Bridge Renovation', '550e8400-e29b-41d4-a716-446655440015', 'Thomas Anderson', '2024-03-05', 'Sarah Williams', '2024-03-06', NULL, '2024-03-05T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440095', 'Material transport - 3 trips', 4800, 'transportation', 'pending', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', '550e8400-e29b-41d4-a716-446655440011', 'Robert Johnson', '2024-03-19', NULL, NULL, NULL, '2024-03-19T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440096', 'Monthly site insurance premium', 15000, 'insurance', 'reimbursed', NULL, NULL, '550e8400-e29b-41d4-a716-446655440010', 'John Smith', '2024-03-01', 'Alex Johnson', '2024-03-02', NULL, '2024-03-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440097', 'Electrical supplies', 6700, 'materials', 'rejected', '550e8400-e29b-41d4-a716-446655440022', 'Green Valley Shopping Mall', '550e8400-e29b-41d4-a716-446655440012', 'David Lee', '2024-03-08', NULL, NULL, 'Rejected - project on hold', '2024-03-08T00:00:00Z');

-- =====================================================
-- BUDGETS
-- =====================================================
INSERT INTO budgets (id, project_id, project_name, total_budget, allocated, spent, remaining, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', 12500000, 11000000, 4200000, 8300000, '2024-01-10T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440021', 'Riverside Residential Tower', 28000000, 26500000, 15400000, 12600000, '2023-08-15T00:00:00Z', '2024-03-19T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440023', 'Harbor Bridge Renovation', 8500000, 8200000, 2800000, 5700000, '2024-01-20T00:00:00Z', '2024-03-18T00:00:00Z');

-- =====================================================
-- BUDGET CATEGORIES
-- =====================================================
INSERT INTO budget_categories (id, budget_id, name, allocated, spent) VALUES
('550e8400-e29b-41d4-a716-446655440110', '550e8400-e29b-41d4-a716-446655440100', 'materials', 4500000, 1800000),
('550e8400-e29b-41d4-a716-446655440111', '550e8400-e29b-41d4-a716-446655440100', 'labor', 3500000, 1400000),
('550e8400-e29b-41d4-a716-446655440112', '550e8400-e29b-41d4-a716-446655440100', 'equipment', 1500000, 520000),
('550e8400-e29b-41d4-a716-446655440113', '550e8400-e29b-41d4-a716-446655440100', 'permits', 200000, 180000),
('550e8400-e29b-41d4-a716-446655440114', '550e8400-e29b-41d4-a716-446655440100', 'insurance', 300000, 150000),
('550e8400-e29b-41d4-a716-446655440115', '550e8400-e29b-41d4-a716-446655440100', 'other', 1000000, 150000),
('550e8400-e29b-41d4-a716-446655440116', '550e8400-e29b-41d4-a716-446655440101', 'materials', 10000000, 6200000),
('550e8400-e29b-41d4-a716-446655440117', '550e8400-e29b-41d4-a716-446655440101', 'labor', 9000000, 5100000),
('550e8400-e29b-41d4-a716-446655440118', '550e8400-e29b-41d4-a716-446655440101', 'equipment', 3500000, 2100000),
('550e8400-e29b-41d4-a716-446655440119', '550e8400-e29b-41d4-a716-446655440101', 'permits', 500000, 450000),
('550e8400-e29b-41d4-a716-446655440120', '550e8400-e29b-41d4-a716-446655440101', 'insurance', 500000, 350000),
('550e8400-e29b-41d4-a716-446655440121', '550e8400-e29b-41d4-a716-446655440101', 'other', 3000000, 1200000),
('550e8400-e29b-41d4-a716-446655440122', '550e8400-e29b-41d4-a716-446655440102', 'materials', 2500000, 900000),
('550e8400-e29b-41d4-a716-446655440123', '550e8400-e29b-41d4-a716-446655440102', 'labor', 3000000, 1100000),
('550e8400-e29b-41d4-a716-446655440124', '550e8400-e29b-41d4-a716-446655440102', 'equipment', 1500000, 500000),
('550e8400-e29b-41d4-a716-446655440125', '550e8400-e29b-41d4-a716-446655440102', 'permits', 200000, 150000),
('550e8400-e29b-41d4-a716-446655440126', '550e8400-e29b-41d4-a716-446655440102', 'other', 1000000, 150000);

-- =====================================================
-- INVENTORY ITEMS
-- =====================================================
INSERT INTO inventory_items (id, sku, name, description, category, unit, quantity, min_quantity, max_quantity, unit_price, total_value, location, supplier, supplier_contact, last_restocked, stock_status, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440130', 'STL-BEAM-001', 'Steel I-Beam (W10x22)', 'Wide flange steel beam, 20ft length', 'construction-materials', 'piece', 145, 50, 300, 450, 65250, 'Warehouse A - Section 1', 'Steel Supply Co.', 'orders@steelsupply.com', '2024-03-10', 'in-stock', '2023-06-15T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440131', 'CON-RDY-001', 'Ready-Mix Concrete', 'High-strength ready-mix concrete, 4000 PSI', 'construction-materials', 'cubic yard', 0, 100, 500, 145, 0, 'N/A - Delivered on demand', 'Concrete Masters Inc.', 'orders@concretemasters.com', NULL, 'ordered', '2023-06-15T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440132', 'ELC-WIRE-001', 'Electrical Wire (12 AWG)', 'THHN copper wire, 500ft spool', 'electrical', 'spool', 28, 30, 100, 185, 5180, 'Warehouse B - Section 3', 'ElectroSupply Inc.', 'sales@electrosupply.com', '2024-02-20', 'low-stock', '2023-07-01T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440133', 'PLB-PIPE-001', 'PVC Pipe (4 inch)', 'Schedule 40 PVC pipe, 10ft length', 'plumbing', 'piece', 320, 100, 500, 25, 8000, 'Warehouse A - Section 4', 'PlumbPro Supplies', 'orders@plumbpro.com', '2024-03-05', 'in-stock', '2023-06-20T00:00:00Z', '2024-03-05T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440134', 'SAF-HARD-001', 'Hard Hat (OSHA Approved)', 'Type 1 Class E safety hard hat', 'safety-gear', 'piece', 85, 50, 200, 35, 2975, 'Warehouse B - Section 1', 'SafetyFirst Equipment', 'orders@safetyfirst.com', '2024-03-12', 'in-stock', '2023-06-15T00:00:00Z', '2024-03-12T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440135', 'TLS-DRILL-001', 'Cordless Drill (DeWalt)', '20V MAX cordless drill/driver kit', 'tools', 'piece', 12, 10, 30, 180, 2160, 'Tool Shed A', 'ToolMaster Depot', 'sales@toolmaster.com', '2024-01-15', 'in-stock', '2023-08-01T00:00:00Z', '2024-01-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440136', 'FIN-PAINT-001', 'Interior Paint (5 gal)', 'Premium latex interior paint, white', 'finishing', 'bucket', 0, 20, 100, 175, 0, 'Warehouse B - Section 5', 'ColorPro Paints', 'orders@colorpro.com', NULL, 'out-of-stock', '2023-09-01T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440137', 'EQP-SCAF-001', 'Scaffolding Frame', 'Steel scaffolding frame, 5x5 ft', 'equipment', 'piece', 48, 30, 100, 120, 5760, 'Equipment Yard', 'BuildEquip Rentals', 'sales@buildequip.com', '2024-02-28', 'in-stock', '2023-06-15T00:00:00Z', '2024-02-28T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440138', 'SAF-VEST-001', 'High-Visibility Vest', 'ANSI Class 2 safety vest, orange', 'safety-gear', 'piece', 120, 50, 200, 18, 2160, 'Warehouse B - Section 1', 'SafetyFirst Equipment', 'orders@safetyfirst.com', '2024-03-12', 'in-stock', '2023-06-15T00:00:00Z', '2024-03-12T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440139', 'CON-REBAR-001', 'Rebar (#4)', 'Grade 60 reinforcement bar, 20ft', 'construction-materials', 'piece', 520, 200, 1000, 15, 7800, 'Warehouse A - Section 2', 'Steel Supply Co.', 'orders@steelsupply.com', '2024-03-08', 'in-stock', '2023-06-15T00:00:00Z', '2024-03-08T00:00:00Z');

-- =====================================================
-- ORDERS
-- =====================================================
INSERT INTO orders (id, order_number, status, supplier, supplier_email, project_id, project_name, subtotal, tax, shipping, total, requested_by, approved_by, order_date, expected_delivery, actual_delivery, notes, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440140', 'ORD-2024-001', 'delivered', 'Steel Supply Co.', 'orders@steelsupply.com', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', 49500, 3960, 1200, 54660, 'John Smith', 'Sarah Williams', '2024-03-05', '2024-03-10', '2024-03-10', NULL, '2024-03-03T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440141', 'ORD-2024-002', 'shipped', 'ElectroSupply Inc.', 'sales@electrosupply.com', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', 9250, 740, 150, 10140, 'David Lee', 'Sarah Williams', '2024-03-15', '2024-03-22', NULL, NULL, '2024-03-14T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440142', 'ORD-2024-003', 'pending', 'ColorPro Paints', 'orders@colorpro.com', '550e8400-e29b-41d4-a716-446655440021', 'Riverside Residential Tower', 8750, 700, 200, 9650, 'Michael Brown', NULL, NULL, NULL, NULL, 'Urgent - needed for floor 15 finishing', '2024-03-18T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440143', 'ORD-2024-004', 'approved', 'Concrete Masters Inc.', 'orders@concretemasters.com', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', 29000, 2320, 0, 31320, 'Robert Johnson', 'Sarah Williams', NULL, '2024-03-25', NULL, 'Delivery scheduled for 6 AM', '2024-03-19T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440144', 'ORD-2024-005', 'draft', 'SafetyFirst Equipment', 'orders@safetyfirst.com', NULL, NULL, 2650, 212, 50, 2912, 'Sarah Martinez', NULL, NULL, NULL, NULL, 'Safety equipment for new hires', '2024-03-20T00:00:00Z', '2024-03-20T00:00:00Z');

-- =====================================================
-- ORDER ITEMS
-- =====================================================
INSERT INTO order_items (id, order_id, inventory_item_id, name, sku, quantity, unit_price, total) VALUES
('550e8400-e29b-41d4-a716-446655440150', '550e8400-e29b-41d4-a716-446655440140', '550e8400-e29b-41d4-a716-446655440130', 'Steel I-Beam (W10x22)', 'STL-BEAM-001', 100, 450, 45000),
('550e8400-e29b-41d4-a716-446655440151', '550e8400-e29b-41d4-a716-446655440140', '550e8400-e29b-41d4-a716-446655440139', 'Rebar (#4)', 'CON-REBAR-001', 300, 15, 4500),
('550e8400-e29b-41d4-a716-446655440152', '550e8400-e29b-41d4-a716-446655440141', '550e8400-e29b-41d4-a716-446655440132', 'Electrical Wire (12 AWG)', 'ELC-WIRE-001', 50, 185, 9250),
('550e8400-e29b-41d4-a716-446655440153', '550e8400-e29b-41d4-a716-446655440142', '550e8400-e29b-41d4-a716-446655440136', 'Interior Paint (5 gal)', 'FIN-PAINT-001', 50, 175, 8750),
('550e8400-e29b-41d4-a716-446655440154', '550e8400-e29b-41d4-a716-446655440143', '550e8400-e29b-41d4-a716-446655440131', 'Ready-Mix Concrete', 'CON-RDY-001', 200, 145, 29000),
('550e8400-e29b-41d4-a716-446655440155', '550e8400-e29b-41d4-a716-446655440144', '550e8400-e29b-41d4-a716-446655440134', 'Hard Hat (OSHA Approved)', 'SAF-HARD-001', 50, 35, 1750),
('550e8400-e29b-41d4-a716-446655440156', '550e8400-e29b-41d4-a716-446655440144', '550e8400-e29b-41d4-a716-446655440138', 'High-Visibility Vest', 'SAF-VEST-001', 50, 18, 900);

-- =====================================================
-- STOCK MOVEMENTS
-- =====================================================
INSERT INTO stock_movements (id, inventory_item_id, item_name, type, quantity, previous_quantity, new_quantity, project_id, project_name, reason, performed_by, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440160', '550e8400-e29b-41d4-a716-446655440130', 'Steel I-Beam (W10x22)', 'in', 100, 45, 145, NULL, NULL, 'Order ORD-2024-001 delivered', 'John Smith', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440161', '550e8400-e29b-41d4-a716-446655440139', 'Rebar (#4)', 'in', 300, 220, 520, NULL, NULL, 'Order ORD-2024-001 delivered', 'John Smith', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440162', '550e8400-e29b-41d4-a716-446655440130', 'Steel I-Beam (W10x22)', 'out', 25, 145, 120, '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', 'Used for floor 3 framing', 'Robert Johnson', '2024-03-12T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440163', '550e8400-e29b-41d4-a716-446655440132', 'Electrical Wire (12 AWG)', 'out', 10, 38, 28, '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', 'Wiring for floors 1-2', 'David Lee', '2024-03-14T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440164', '550e8400-e29b-41d4-a716-446655440134', 'Hard Hat (OSHA Approved)', 'in', 25, 60, 85, NULL, NULL, 'Safety equipment restock', 'Sarah Martinez', '2024-03-12T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440165', '550e8400-e29b-41d4-a716-446655440136', 'Interior Paint (5 gal)', 'out', 15, 15, 0, '550e8400-e29b-41d4-a716-446655440021', 'Riverside Residential Tower', 'Used for floor 14 painting', 'James Wilson', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440166', '550e8400-e29b-41d4-a716-446655440133', 'PVC Pipe (4 inch)', 'transfer', 50, 370, 320, '550e8400-e29b-41d4-a716-446655440021', 'Riverside Residential Tower', 'Transferred to project site', 'Michael Brown', '2024-03-15T00:00:00Z');

-- =====================================================
-- FOLDERS
-- =====================================================
INSERT INTO folders (id, name, color, project_id, documents_count, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440170', 'Contracts', '#8b5cf6', NULL, 12, '2023-06-15T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440171', 'Permits & Licenses', '#22c55e', NULL, 8, '2023-06-15T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440172', 'Blueprints', '#3b82f6', '550e8400-e29b-41d4-a716-446655440020', 24, '2024-01-10T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440173', 'Safety Documents', '#ef4444', NULL, 15, '2023-06-20T00:00:00Z', '2024-03-12T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440174', 'Project Photos', '#06b6d4', '550e8400-e29b-41d4-a716-446655440020', 156, '2024-01-15T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440175', 'Financial Reports', '#f97316', NULL, 18, '2023-06-15T00:00:00Z', '2024-03-01T00:00:00Z');

-- =====================================================
-- DOCUMENTS
-- =====================================================
INSERT INTO documents (id, name, type, file_type, file_size, url, project_id, project_name, folder_id, uploaded_by, uploaded_by_name, tags, description, version, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440180', 'Downtown Office Complex - Main Contract', 'contract', 'pdf', 2450000, '/documents/contract-001.pdf', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', '550e8400-e29b-41d4-a716-446655440170', '550e8400-e29b-41d4-a716-446655440001', 'Alex Johnson', ARRAY['contract', 'main', 'signed'], 'Main construction contract with MetroCity Developments', 3, '2024-01-10T00:00:00Z', '2024-01-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440181', 'Building Permit - Downtown Office', 'permit', 'pdf', 1200000, '/documents/permit-001.pdf', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', '550e8400-e29b-41d4-a716-446655440171', '550e8400-e29b-41d4-a716-446655440002', 'Sarah Williams', ARRAY['permit', 'approved', 'city'], 'City building permit for construction', 1, '2024-01-08T00:00:00Z', '2024-01-08T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440182', 'Floor Plans - Levels 1-5', 'blueprint', 'dwg', 15800000, '/documents/blueprint-001.dwg', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', '550e8400-e29b-41d4-a716-446655440172', '550e8400-e29b-41d4-a716-446655440001', 'Alex Johnson', ARRAY['blueprint', 'floor-plans', 'autocad'], 'Detailed floor plans for levels 1 through 5', 5, '2024-01-12T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440183', 'Safety Inspection Report - March 2024', 'safety', 'pdf', 890000, '/documents/safety-001.pdf', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', '550e8400-e29b-41d4-a716-446655440173', '550e8400-e29b-41d4-a716-446655440003', 'Mike Chen', ARRAY['safety', 'inspection', 'report'], 'Monthly safety inspection report', 1, '2024-03-15T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440184', 'Site Progress Photo - Week 12', 'photo', 'jpg', 4500000, '/documents/photo-001.jpg', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', '550e8400-e29b-41d4-a716-446655440174', '550e8400-e29b-41d4-a716-446655440003', 'Mike Chen', ARRAY['photo', 'progress', 'aerial'], 'Drone photo showing construction progress', 1, '2024-03-18T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440185', 'Q1 2024 Financial Report', 'report', 'xlsx', 2100000, '/documents/report-001.xlsx', NULL, NULL, '550e8400-e29b-41d4-a716-446655440175', '550e8400-e29b-41d4-a716-446655440004', 'Emily Davis', ARRAY['financial', 'quarterly', 'report'], 'First quarter financial summary', 2, '2024-03-01T00:00:00Z', '2024-03-05T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440186', 'Riverside Tower - Subcontractor Agreement', 'contract', 'pdf', 1850000, '/documents/contract-002.pdf', '550e8400-e29b-41d4-a716-446655440021', 'Riverside Residential Tower', '550e8400-e29b-41d4-a716-446655440170', '550e8400-e29b-41d4-a716-446655440002', 'Sarah Williams', ARRAY['contract', 'subcontractor', 'plumbing'], 'Plumbing subcontractor agreement', 1, '2023-09-15T00:00:00Z', '2023-09-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440187', 'OSHA Compliance Certificate', 'certification', 'pdf', 560000, '/documents/cert-001.pdf', NULL, NULL, '550e8400-e29b-41d4-a716-446655440173', '550e8400-e29b-41d4-a716-446655440001', 'Alex Johnson', ARRAY['osha', 'compliance', 'certificate'], 'Company OSHA compliance certification', 1, '2024-01-02T00:00:00Z', '2024-01-02T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440188', 'Material Receipt - Steel Delivery', 'receipt', 'pdf', 320000, '/documents/receipt-001.pdf', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', NULL, '550e8400-e29b-41d4-a716-446655440003', 'Mike Chen', ARRAY['receipt', 'materials', 'steel'], 'Delivery receipt for steel beams', 1, '2024-03-10T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440189', 'Invoice - INV-2024-002', 'invoice', 'pdf', 450000, '/documents/invoice-001.pdf', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', NULL, '550e8400-e29b-41d4-a716-446655440004', 'Emily Davis', ARRAY['invoice', 'client', 'progress-payment'], 'February progress payment invoice', 1, '2024-03-01T00:00:00Z', '2024-03-01T00:00:00Z');
