-- Stroikefy Demo Data Seed
-- Run this after creating the schema to populate with demo data
-- NOTE (idempotency): To avoid duplicate demo rows run a TRUNCATE before seeding, e.g.:
--   TRUNCATE TABLE documents, folders, stock_movements, order_items, orders, inventory_items, budget_categories, budgets, expenses, invoice_items, invoices, attendance, time_entries, tasks, employee_projects, projects, employees, users RESTART IDENTITY CASCADE;
-- Or adapt INSERTs to use `ON CONFLICT DO NOTHING` for unique columns like users(email) / inventory_items(sku) / invoices(invoice_number).

-- =====================================================
-- USERS
-- =====================================================
INSERT INTO users (id, email, name, avatar, role, phone, department, created_at, last_login) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@stroikefy.com', 'Algirdas Petrauskas', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'admin', '+370 5 123-0101', 'Vadyba', '2023-01-15T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440002', 'manager@stroikefy.com', 'Rasa Jankauskaite', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', 'manager', '+370 5 123-0102', 'Operacijos', '2023-02-20T00:00:00Z', '2024-03-19T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440003', 'supervisor@stroikefy.com', 'Jonas Kuzminskas', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'supervisor', '+370 5 123-0103', 'Statyba', '2023-03-10T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440004', 'accountant@stroikefy.com', 'Laima Zukiene', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'accountant', '+370 5 123-0104', 'Finansai', '2023-04-05T00:00:00Z', '2024-03-18T00:00:00Z');

-- Additional user accounts for demo (employees)
INSERT INTO users (id, email, name, avatar, role, phone, department, created_at, last_login) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'mindaugas.liekis@stroikefy.com', 'Mindaugas Liekis', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 'user', '+370 652 12345', 'Inžinerija', '2021-03-15T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440011', 'kestutis.metalas@stroikefy.com', 'Kestutis Metalas', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'user', '+370 612 23456', 'Statyba', '2020-07-22T00:00:00Z', '2024-03-19T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440012', 'vytautas.elektras@stroikefy.com', 'Vytautas Elektras', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', 'user', '+370 634 34567', 'Elektra', '2019-11-10T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440013', 'vidmantas.vamzdiu@stroikefy.com', 'Vidmantas Vamzdiu', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'user', '+370 645 45678', 'Santechnika', '2022-01-08T00:00:00Z', '2024-03-17T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440014', 'audrius.stiklas@stroikefy.com', 'Audrius Stiklas', 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face', 'user', '+370 656 56789', 'Apdaila', '2023-06-15T00:00:00Z', '2024-03-16T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440015', 'saulius.tiltai@stroikefy.com', 'Saulius Tiltai', 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=150&h=150&fit=crop&crop=face', 'manager', '+370 667 67890', 'Infrastruktūra', '2018-04-20T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440016', 'gintare.sauga@stroikefy.com', 'Gintare Sauga', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face', 'supervisor', '+370 678 78901', 'Sauga', '2021-09-01T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440017', 'tomas.beton@stroikefy.com', 'Tomas Beton', NULL, 'user', NULL, 'Statyba', '2022-05-10T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440018', 'user@stroikefy.com', 'Demo User', NULL, 'user', NULL, NULL, '2024-01-01T00:00:00Z', '2024-03-20T00:00:00Z');

-- =====================================================
-- EMPLOYEES
-- =====================================================
INSERT INTO employees (id, employee_id, name, email, phone, avatar, position, department, type, status, hire_date, salary, skills, certifications, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship, address_street, address_city, address_state, address_zip, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'EMP-2024-001', 'Mindaugas Liekis', 'mindaugas.liekis@stroikefy.com', '+370 652 12345', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 'Vyriausiasis Inžinierius', 'Inžinerija', 'full-time', 'active', '2021-03-15', 4200, ARRAY['Statybinė inžinerija', 'Projektų vadyba', 'AutoCAD'], ARRAY['Profesinė licencija', 'OSHA 30'], 'Daina Liekiene', '+370 652 12346', 'Žmona', 'Vilniaus g. 45', 'Vilnius', 'Vilnius', 'LT-01101', '2021-03-15T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440011', 'EMP-2024-002', 'Kestutis Metalas', 'kestutis.metalas@stroikefy.com', '+370 612 23456', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'Plieno Darbų Vedėjas', 'Statyba', 'full-time', 'active', '2020-07-22', 3500, ARRAY['Plieno Gamyba', 'Suvirinimas', 'Saugumo Vadyba'], ARRAY['AWS CWI', 'OSHA 30'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-07-22T00:00:00Z', '2024-03-19T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440012', 'EMP-2024-003', 'Vytautas Elektras', 'vytautas.elektras@stroikefy.com', '+370 634 34567', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', 'Magistras Elektrikas', 'Elektra', 'full-time', 'active', '2019-11-10', 3800, ARRAY['Elektros Sistemos', 'PLC Programavimas', 'Kodekso Atitiktis'], ARRAY['Magistro Elektro Licencija', 'NFPA 70E'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-11-10T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440013', 'EMP-2024-004', 'Vidmantas Vamzdiu', 'vidmantas.vamzdiu@stroikefy.com', '+370 645 45678', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'Santechnikos Vedėjas', 'Santechnika', 'full-time', 'active', '2022-01-08', 3200, ARRAY['Santechnikos Sistemos', 'Brėžinių Skaitymas', 'Komandos Vadyba'], ARRAY['Žandybos Santechnikas', 'OSHA 10'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-08T00:00:00Z', '2024-03-17T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440014', 'EMP-2024-005', 'Audrius Stiklas', 'audrius.stiklas@stroikefy.com', '+370 656 56789', 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face', 'Stiklo Montavimo Specialistas', 'Apdaila', 'contractor', 'active', '2023-06-15', 2700, ARRAY['Stiklo Montavimas', 'Užuolaidos Sienos', 'Hermetikai'], ARRAY['IGMA Sertifikuotas'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-06-15T00:00:00Z', '2024-03-16T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440015', 'EMP-2024-006', 'Saulius Tiltai', 'saulius.tiltai@stroikefy.com', '+370 667 67890', 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=150&h=150&fit=crop&crop=face', 'Tiltų Statybos Vadovas', 'Infrastruktūra', 'full-time', 'active', '2018-04-20', 4500, ARRAY['Tiltų Statyba', 'Sunki Technika', 'Saugumo Protokolai'], ARRAY['Profesinė licencija', 'OSHA 30', 'Pirmoji Pagalba'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-04-20T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440016', 'EMP-2024-007', 'Gintare Sauga', 'gintare.sauga@stroikefy.com', '+370 678 78901', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face', 'Saugumo Vadovė', 'Sauga', 'full-time', 'active', '2021-09-01', 3600, ARRAY['Saugumo Vadyba', 'Rizikos Vertinimas', 'Mokymai'], ARRAY['CSP', 'OSHA 500', 'Pirmosios Pagalbos Instruktorė'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-09-01T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440017', 'EMP-2024-008', 'Tomas Beton', 'tomas.beton@stroikefy.com', NULL, NULL, 'Betono Specialistas', 'Statyba', 'full-time', 'on-leave', '2022-05-10', 3000, ARRAY['Betono Darbai', 'Formos Statimas', 'Kokybės Kontrolė'], ARRAY['ACI Sertifikatas'], NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-10T00:00:00Z', '2024-03-10T00:00:00Z');

-- =====================================================
-- PROJECTS
-- =====================================================
INSERT INTO projects (id, name, description, status, priority, start_date, end_date, budget, spent, progress, manager_id, manager_name, client_name, client_contact, location_address, location_city, location_lat, location_lng, team_size, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '15 aukštų moderni biurų pastatai su požemine aikštele ir stogo patikimomis paslaugomis.', 'in-progress', 'high', '2024-01-15', '2025-06-30', 12500000, 4200000, 34, '550e8400-e29b-41d4-a716-446655440002', 'Rasa Jankauskaite', 'Vilniaus Miesto Plėtra', 'kontaktai@vilniauplėtra.lt', 'Gedimino pr. 1', 'Vilnius', 54.6872, 25.2797, 45, '2024-01-10T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440021', 'Nerio Kranto Gyvenamasis Bokštas', 'Prabangūs 25 aukštų gyvenamasis pastatas su 200 vienetų ir prestižinėmis paslaugomis.', 'in-progress', 'critical', '2023-09-01', '2025-03-31', 28000000, 15400000, 55, '550e8400-e29b-41d4-a716-446655440002', 'Rasa Jankauskaite', 'Nerio Kranto Savininkai', 'info@neriotkranto.lt', 'Lazdynų g. 15', 'Vilnius', 54.7223, 25.2899, 78, '2023-08-15T00:00:00Z', '2024-03-19T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440022', 'Žaliųjų Slėnių Prekybos Centras', 'Šiuolaikinis prekybos centras su 150 mažmeninės prekybo vietomis ir pramogų zonu.', 'planning', 'medium', '2024-06-01', '2026-12-31', 45000000, 500000, 5, '550e8400-e29b-41d4-a716-446655440003', 'Jonas Kuzminskas', 'Žaliųjų Slėnių Grupė', 'projektai@žslėniai.lt', 'Kalnu g. 45', 'Kaunas', 54.8973, 23.9131, 12, '2024-02-01T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440023', 'Jachtų Tilto Renovacija', 'Pilna istorinio jachtų tilto renovacija ir struktūriniai tobuliniai.', 'in-progress', 'high', '2024-02-01', '2024-11-30', 8500000, 2800000, 42, '550e8400-e29b-41d4-a716-446655440003', 'Jonas Kuzminskas', 'Klaipėdos Savivaldybė', 'transport@klaipėda.lt', 'Jachtų Tiltas', 'Klaipėda', 55.7033, 21.1524, 35, '2024-01-20T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440024', 'Technologijų Parko Kampusas', 'Šiuolaikinis technologijų kampusas su 5 pastatais, statymo kompleksu ir žaliais plotais.', 'on-hold', 'medium', '2024-03-01', '2026-06-30', 65000000, 3200000, 8, '550e8400-e29b-41d4-a716-446655440002', 'Rasa Jankauskaite', 'TechGigant Ltd.', 'statyba@techgigant.lt', 'Inovacijos g. 10', 'Vilnius', 54.7295, 25.3045, 25, '2024-02-15T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440025', 'Bendruomenės Ligoninės Plėtra', 'Naujo sparno su 100 lovų ir šiuolaikinėmis medicininėmis saugyklomis pridėjimas.', 'completed', 'critical', '2022-06-01', '2024-02-28', 32000000, 31500000, 100, '550e8400-e29b-41d4-a716-446655440002', 'Rasa Jankauskaite', 'Vilniaus Universiteto Ligoninė', 'admin@vul.lt', 'Sveikatos a. 8', 'Vilnius', 54.6872, 25.2847, 0, '2022-05-15T00:00:00Z', '2024-02-28T00:00:00Z');

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
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440020', 'Pagrindo kasinėjimas', 'Pagrindinės pagrindo kasinėjimas', 'completed', 'high', '550e8400-e29b-41d4-a716-446655440010', 'Mindaugas Liekis', '2024-02-15', 240, 256, '2024-01-15T00:00:00Z', '2024-02-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440020', 'Plieninės konstrukcijos montavimas', 'Pagrindinės plieninės konstrukcijos montavimas 1-5 aukštams', 'in-progress', 'high', '550e8400-e29b-41d4-a716-446655440011', 'Kestutis Metalas', '2024-04-30', 480, 220, '2024-02-16T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440020', 'Elektros laidų montavimas', 'Elektros laidų montavimas 1-3 aukštams', 'todo', 'medium', '550e8400-e29b-41d4-a716-446655440012', 'Vytautas Elektras', '2024-05-15', 160, 0, '2024-03-01T00:00:00Z', '2024-03-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440021', 'Santechnika grubūs 10-15 aukštuose', 'Gyvenamųjų vienetų santechnikos apirašymas', 'in-progress', 'high', '550e8400-e29b-41d4-a716-446655440013', 'Vidmantas Vamzdiu', '2024-04-10', 320, 180, '2024-02-01T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440021', 'Langų montavimas 1-10 aukštuose', 'Visų langų montavimas apatiniuose aukštuose', 'review', 'medium', '550e8400-e29b-41d4-a716-446655440014', 'Audrius Stiklas', '2024-03-25', 200, 195, '2024-02-15T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440035', '550e8400-e29b-41d4-a716-446655440023', 'Tilto paviršiaus remontas', 'Pagrindinės tilto dalies taisymas ir persidengimas', 'in-progress', 'urgent', '550e8400-e29b-41d4-a716-446655440015', 'Saulius Tiltai', '2024-04-30', 400, 150, '2024-02-20T00:00:00Z', '2024-03-19T00:00:00Z');

-- =====================================================
-- TIME ENTRIES
-- =====================================================
INSERT INTO time_entries (id, employee_id, employee_name, project_id, project_name, task_id, task_name, date, start_time, end_time, break_minutes, total_hours, description, status, approved_by, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440010', 'Mindaugas Liekis', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '550e8400-e29b-41d4-a716-446655440031', 'Plieninės konstrukcijos montavimas', '2024-03-20', '07:00', '16:00', 60, 8, 'Plieno rėmo montavimo priežiūra 3 aukštui', 'approved', 'Rasa Jankauskaite', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440011', 'Kestutis Metalas', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '550e8400-e29b-41d4-a716-446655440031', 'Plieninės konstrukcijos montavimas', '2024-03-20', '06:30', '15:30', 45, 8.25, 'Plieninių sijų suvirinimas ir montavimas', 'approved', 'Rasa Jankauskaite', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440012', 'Vytautas Elektras', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '550e8400-e29b-41d4-a716-446655440032', 'Elektros laidų montavimas', '2024-03-20', '08:00', '17:00', 60, 8, 'Elektros planavimas ir medžiagų paruošimas', 'pending', NULL, '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440043', '550e8400-e29b-41d4-a716-446655440013', 'Vidmantas Vamzdiu', '550e8400-e29b-41d4-a716-446655440021', 'Nerio Kranto Gyvenamasis Bokštas', '550e8400-e29b-41d4-a716-446655440033', 'Santechnika grubūs 10-15 aukštuose', '2024-03-20', '07:00', '16:30', 60, 8.5, 'Santechnikos montavimas 1201-1205 vienetams', 'approved', 'Rasa Jankauskaite', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440044', '550e8400-e29b-41d4-a716-446655440015', 'Saulius Tiltai', '550e8400-e29b-41d4-a716-446655440023', 'Jachtų Tilto Renovacija', '550e8400-e29b-41d4-a716-446655440035', 'Tilto paviršiaus remontas', '2024-03-20', '05:00', '14:00', 45, 8.25, 'Anksti pamaina dėl tilto remonto - skyrius B', 'pending', NULL, '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440046', '550e8400-e29b-41d4-a716-446655440016', 'Gintare Sauga', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '550e8400-e29b-41d4-a716-446655440030', 'Pagrindo kasinėjimas', '2024-03-20', '07:30', '12:30', 15, 4.75, 'Safety oversight and audit', 'approved', 'Algirdas Petrauskas', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440047', '550e8400-e29b-41d4-a716-446655440017', 'Tomas Beton', '550e8400-e29b-41d4-a716-446655440023', 'Jachtų Tilto Renovacija', '550e8400-e29b-41d4-a716-446655440035', 'Tilto paviršiaus remontas', '2024-03-19', '08:00', '16:00', 60, 8, 'Formwork installation and curing', 'approved', 'Saulius Tiltai', '2024-03-19T00:00:00Z');

-- =====================================================
-- ATTENDANCE
-- =====================================================
INSERT INTO attendance (id, employee_id, employee_name, date, check_in, check_out, status, notes) VALUES
('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440010', 'Mindaugas Liekis', '2024-03-20', '07:00', '16:00', 'present', NULL),
('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440011', 'Kestutis Metalas', '2024-03-20', '06:30', '15:30', 'present', NULL),
('550e8400-e29b-41d4-a716-446655440052', '550e8400-e29b-41d4-a716-446655440012', 'Vytautas Elektras', '2024-03-20', '08:15', '17:00', 'late', 'Eismo sąlygos - pranešta vadovui'),
('550e8400-e29b-41d4-a716-446655440053', '550e8400-e29b-41d4-a716-446655440013', 'Vidmantas Vamzdiu', '2024-03-20', '07:00', '16:30', 'present', NULL),
('550e8400-e29b-41d4-a716-446655440054', '550e8400-e29b-41d4-a716-446655440014', 'Audrius Stiklas', '2024-03-20', '07:30', '12:00', 'half-day', 'Suplanuota pusė dienos'),
('550e8400-e29b-41d4-a716-446655440055', '550e8400-e29b-41d4-a716-446655440015', 'Saulius Tiltai', '2024-03-20', '05:00', '14:00', 'present', NULL),
('550e8400-e29b-41d4-a716-446655440056', '550e8400-e29b-41d4-a716-446655440016', 'Gintare Sauga', '2024-03-20', '08:00', '17:00', 'present', NULL),
('550e8400-e29b-41d4-a716-446655440057', '550e8400-e29b-41d4-a716-446655440017', 'Tomas Beton', '2024-03-20', NULL, NULL, 'leave', 'Patvirtinta medicininė atostoga');

-- =====================================================
-- INVOICES
-- =====================================================
INSERT INTO invoices (id, invoice_number, type, status, project_id, project_name, client_name, client_email, client_address, subtotal, tax, total, issue_date, due_date, paid_date, notes, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440060', 'INV-2024-001', 'outgoing', 'paid', '550e8400-e29b-41d4-a716-446655440025', 'Bendruomenės Ligoninės Plėtra', 'Vilniaus Universiteto Ligoninė', 'saskaitos@vul.lt', 'Sveikatos a. 8, Vilnius, LT-08101', 5850000, 0, 5850000, '2024-02-28', '2024-03-28', '2024-03-15', 'Galutinis mokėjimas už užbaigtą projektą', '2024-02-28T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440061', 'INV-2024-002', 'outgoing', 'sent', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', 'Vilniaus Miesto Plėtra', 'ap@vilniausplėtra.lt', 'Gedimino pr. 1, Vilnius, LT-01103', 1650000, 0, 1650000, '2024-03-01', '2024-03-31', NULL, 'Mėnesio pažangos mokėjimas', '2024-03-01T00:00:00Z', '2024-03-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440062', 'INV-2024-003', 'outgoing', 'overdue', '550e8400-e29b-41d4-a716-446655440021', 'Nerio Kranto Gyvenamasis Bokštas', 'Nerio Kranto Savininkai', 'finance@neriotkranto.lt', 'Lazdynų g. 15, Vilnius, LT-10103', 2800000, 0, 2800000, '2024-02-01', '2024-03-01', NULL, 'VĖLUOJA - Prašome sumokėti nedelsiant', '2024-02-01T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440063', 'INV-2024-004', 'incoming', 'paid', NULL, NULL, 'Plieno Tiekimas UAB', 'uzsakymai@plienotiekimas.lt', NULL, 292500, 23400, 315900, '2024-03-10', '2024-04-10', '2024-03-18', NULL, '2024-03-10T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440064', 'INV-2024-005', 'incoming', 'sent', NULL, NULL, 'Betono Šeimininkai UAB', 'saskaitos@betono-šeimininkai.lt', NULL, 206000, 16480, 222480, '2024-03-15', '2024-04-15', NULL, NULL, '2024-03-15T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440065', 'INV-2024-006', 'outgoing', 'draft', '550e8400-e29b-41d4-a716-446655440023', 'Jachtų Tilto Renovacija', 'Klaipėdos Savivaldybė', 'ap@klaipėda.lt', NULL, 950000, 0, 950000, '2024-03-20', '2024-04-20', NULL, 'Projektas - laukiant patvirtinimo', '2024-03-20T00:00:00Z', '2024-03-20T00:00:00Z');

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
('550e8400-e29b-41d4-a716-446655440090', 'Plieninės armatūros strypai', 45000, 'materials', 'approved', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '550e8400-e29b-41d4-a716-446655440010', 'Mindaugas Liekis', '2024-03-15', 'Rasa Jankauskaite', '2024-03-16', NULL, '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440091', 'Kasinėtuve nuomos - 2 savaitės', 12500, 'equipment', 'approved', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '550e8400-e29b-41d4-a716-446655440011', 'Kestutis Metalas', '2024-03-10', 'Rasa Jankauskaite', '2024-03-11', NULL, '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440092', 'Saugos įrangos pirkimas', 3500, 'other', 'approved', NULL, NULL, '550e8400-e29b-41d4-a716-446655440016', 'Gintare Sauga', '2024-03-12', 'Algirdas Petrauskas', '2024-03-12', 'Šalmai, liemenės ir saugos akiniai', '2024-03-12T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440093', 'Betono siurblio paslaugos', 8200, 'labor', 'pending', '550e8400-e29b-41d4-a716-446655440021', 'Nerio Kranto Gyvenamasis Bokštas', '550e8400-e29b-41d4-a716-446655440013', 'Vidmantas Vamzdiu', '2024-03-18', NULL, NULL, NULL, '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440094', 'Statybos leidimo atnaujinimas', 2500, 'permits', 'approved', '550e8400-e29b-41d4-a716-446655440023', 'Jachtų Tilto Renovacija', '550e8400-e29b-41d4-a716-446655440015', 'Saulius Tiltai', '2024-03-05', 'Rasa Jankauskaite', '2024-03-06', NULL, '2024-03-05T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440095', 'Medžiagų gabenimas - 3 kelionės', 4800, 'transportation', 'pending', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '550e8400-e29b-41d4-a716-446655440011', 'Kestutis Metalas', '2024-03-19', NULL, NULL, NULL, '2024-03-19T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440096', 'Mėnesio statybvietės draudimo mokestis', 15000, 'insurance', 'reimbursed', NULL, NULL, '550e8400-e29b-41d4-a716-446655440010', 'Mindaugas Liekis', '2024-03-01', 'Algirdas Petrauskas', '2024-03-02', NULL, '2024-03-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440097', 'Elektros priemonės', 6700, 'materials', 'rejected', '550e8400-e29b-41d4-a716-446655440022', 'Žaliųjų Slėnių Prekybos Centras', '550e8400-e29b-41d4-a716-446655440012', 'Vytautas Elektras', '2024-03-08', NULL, NULL, 'Atmesta - projektas sustabdytas', '2024-03-08T00:00:00Z');

-- =====================================================
-- BUDGETS
-- =====================================================
INSERT INTO budgets (id, project_id, project_name, total_budget, allocated, spent, remaining, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440020', 'Downtown Office Complex', 12500000, 11000000, 4200000, 8300000, '2024-01-10T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440021', 'Riverside Residential Tower', 28000000, 26500000, 15400000, 12600000, '2023-08-15T00:00:00Z', '2024-03-19T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440023', 'Harbor Bridge Renovation', 8500000, 8200000, 2800000, 5700000, '2024-01-20T00:00:00Z', '2024-03-18T00:00:00Z');

-- Additional budgets for demo completeness
INSERT INTO budgets (id, project_id, project_name, total_budget, allocated, spent, remaining, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440022', 'Žaliųjų Slėnių Prekybos Centras', 45000000, 2000000, 500000, 1950000, '2024-03-01T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440024', 'Technologijų Parko Kampusas', 65000000, 10000000, 3200000, 6800000, '2024-03-01T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440025', 'Bendruomenės Ligoninės Plėtra', 32000000, 32000000, 31500000, 500000, '2022-06-01T00:00:00Z', '2024-02-28T00:00:00Z');

-- =====================================================
-- BUDGET CATEGORIES
-- =====================================================
INSERT INTO budget_categories (id, budget_id, name, allocated, spent) VALUES
('550e8400-e29b-41d4-a716-446655440110', '550e8400-e29b-41d4-a716-446655440100', 'medžiagos', 4500000, 1800000),
('550e8400-e29b-41d4-a716-446655440111', '550e8400-e29b-41d4-a716-446655440100', 'darba', 3500000, 1400000),
('550e8400-e29b-41d4-a716-446655440112', '550e8400-e29b-41d4-a716-446655440100', 'įranga', 1500000, 520000),
('550e8400-e29b-41d4-a716-446655440113', '550e8400-e29b-41d4-a716-446655440100', 'leidimai', 200000, 180000),
('550e8400-e29b-41d4-a716-446655440114', '550e8400-e29b-41d4-a716-446655440100', 'draudimas', 300000, 150000),
('550e8400-e29b-41d4-a716-446655440115', '550e8400-e29b-41d4-a716-446655440100', 'kita', 1000000, 150000),
('550e8400-e29b-41d4-a716-446655440116', '550e8400-e29b-41d4-a716-446655440101', 'medžiagos', 10000000, 6200000),
('550e8400-e29b-41d4-a716-446655440117', '550e8400-e29b-41d4-a716-446655440101', 'darba', 9000000, 5100000),
('550e8400-e29b-41d4-a716-446655440118', '550e8400-e29b-41d4-a716-446655440101', 'įranga', 3500000, 2100000),
('550e8400-e29b-41d4-a716-446655440119', '550e8400-e29b-41d4-a716-446655440101', 'leidimai', 500000, 450000),
('550e8400-e29b-41d4-a716-446655440120', '550e8400-e29b-41d4-a716-446655440101', 'draudimas', 500000, 350000),
('550e8400-e29b-41d4-a716-446655440121', '550e8400-e29b-41d4-a716-446655440101', 'kita', 3000000, 1200000),
('550e8400-e29b-41d4-a716-446655440122', '550e8400-e29b-41d4-a716-446655440102', 'medžiagos', 2500000, 900000),
('550e8400-e29b-41d4-a716-446655440123', '550e8400-e29b-41d4-a716-446655440102', 'darba', 3000000, 1100000),
('550e8400-e29b-41d4-a716-446655440124', '550e8400-e29b-41d4-a716-446655440102', 'įranga', 1500000, 500000),
('550e8400-e29b-41d4-a716-446655440125', '550e8400-e29b-41d4-a716-446655440102', 'leidimai', 200000, 150000),
('550e8400-e29b-41d4-a716-446655440126', '550e8400-e29b-41d4-a716-446655440102', 'kita', 1000000, 150000),
('550e8400-e29b-41d4-a716-446655440127', '550e8400-e29b-41d4-a716-446655440103', 'medžiagos', 2000000, 500000),
('550e8400-e29b-41d4-a716-446655440128', '550e8400-e29b-41d4-a716-446655440103', 'darba', 900000, 200000),
('550e8400-e29b-41d4-a716-446655440129', '550e8400-e29b-41d4-a716-446655440104', 'medžiagos', 10000000, 3200000),
('550e8400-e29b-41d4-a716-446655440200', '550e8400-e29b-41d4-a716-446655440104', 'įranga', 3000000, 800000),
('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440105', 'kita', 500000, 400000);

-- =====================================================
-- INVENTORY ITEMS
-- =====================================================
INSERT INTO inventory_items (id, sku, name, description, category, unit, quantity, min_quantity, max_quantity, unit_price, total_value, location, supplier, supplier_contact, last_restocked, stock_status, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440130', 'STL-BEAM-001', 'Plieninė I-Sija (W10x22)', 'Plati flanšo plieninė sija, 20ft ilgio', 'construction-materials', 'komadas', 145, 50, 300, 450, 65250, 'Sandėlis A - 1 skyrius', 'Plieno Tiekimas UAB', 'uzsakymai@plienotiekimas.lt', '2024-03-10', 'in-stock', '2023-06-15T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440131', 'CON-RDY-001', 'Paruoštas Betonas', 'Aukšto stiprumo paruoštas betonas, 4000 PSI', 'construction-materials', 'kubinis jadas', 0, 100, 500, 145, 0, 'Nėra - Pristatymas pagal pareikalavimą', 'Betono Šeimininkai UAB', 'uzsakymai@betono-šeimininkai.lt', NULL, 'ordered', '2023-06-15T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440132', 'ELC-WIRE-001', 'Elektros Laidai (12 AWG)', 'THHN variniai laidai, 500 pėdų ritė', 'electrical', 'ritė', 28, 30, 100, 185, 5180, 'Sandėlis B - 3 skyrius', 'Elektros Tiekimas UAB', 'pardavimas@elektrostiekimas.lt', '2024-02-20', 'low-stock', '2023-07-01T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440133', 'PLB-PIPE-001', 'PVC Vamzydis (4 coliai)', 'Tvarkaraštis 40 PVC vamzydis, 10 pėdų ilgio', 'plumbing', 'komadas', 320, 100, 500, 25, 8000, 'Sandėlis A - 4 skyrius', 'SantechnikaPro Tiekimas', 'uzsakymai@santechnika-pro.lt', '2024-03-05', 'in-stock', '2023-06-20T00:00:00Z', '2024-03-05T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440134', 'SAF-HARD-001', 'Saugos Šalmas (OSHA Sertifikuotas)', 'Tipo 1 klasės E saugos šalmas', 'safety-gear', 'komadas', 85, 50, 200, 35, 2975, 'Sandėlis B - 1 skyrius', 'Saugos Pirma Įranga', 'uzsakymai@saugospirma.lt', '2024-03-12', 'in-stock', '2023-06-15T00:00:00Z', '2024-03-12T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440135', 'TLS-DRILL-001', 'Bevielė Gręžimo Mašina (DeWalt)', '20V MAX bevielė gręžimo / vedimo rinkinys', 'tools', 'komadas', 12, 10, 30, 180, 2160, 'Įrankių Šopa A', 'Įrankių Šeimininkai Sandėlis', 'pardavimas@įrankiųšeimininkai.lt', '2024-01-15', 'in-stock', '2023-08-01T00:00:00Z', '2024-01-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440136', 'FIN-PAINT-001', 'Vidaus Dažai (5 gal)', 'Prem atsparumo lateksinis vidaus dažai, balti', 'finishing', 'kibiras', 0, 20, 100, 175, 0, 'Sandėlis B - 5 skyrius', 'Spalvų Pro Dažai', 'uzsakymai@spalvupro.lt', NULL, 'out-of-stock', '2023-09-01T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440137', 'EQP-SCAF-001', 'Paveido Rėmas', 'Plieninė paveido rėma, 5x5 pėdos', 'equipment', 'komadas', 48, 30, 100, 120, 5760, 'Įrengimų Kieme', 'Statybos Įrengimų Nuomos', 'pardavimas@statybosįrenginiųnuoma.lt', '2024-02-28', 'in-stock', '2023-06-15T00:00:00Z', '2024-02-28T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440138', 'SAF-VEST-001', 'Aukštos Matomumo Liemenė', 'ANSI Klasė 2 saugos liemenė, oranžine spalva', 'safety-gear', 'komadas', 120, 50, 200, 18, 2160, 'Sandėlis B - 1 skyrius', 'Saugos Pirma Įranga', 'uzsakymai@saugospirma.lt', '2024-03-12', 'in-stock', '2023-06-15T00:00:00Z', '2024-03-12T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440139', 'CON-REBAR-001', 'Armatūra (#4)', '60 laipsnis sustiprinimo strypas, 20 pėdų', 'construction-materials', 'komadas', 520, 200, 1000, 15, 7800, 'Sandėlis A - 2 skyrius', 'Plieno Tiekimas UAB', 'uzsakymai@plienotiekimas.lt', '2024-03-08', 'in-stock', '2023-06-15T00:00:00Z', '2024-03-08T00:00:00Z');

-- =====================================================
-- ORDERS
-- =====================================================
INSERT INTO orders (id, order_number, status, supplier, supplier_email, project_id, project_name, subtotal, tax, shipping, total, requested_by, approved_by, order_date, expected_delivery, actual_delivery, notes, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440140', 'ORD-2024-001', 'delivered', 'Plieno Tiekimas UAB', 'uzsakymai@plienotiekimas.lt', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', 49500, 3960, 1200, 54660, 'Mindaugas Liekis', 'Rasa Jankauskaite', '2024-03-05', '2024-03-10', '2024-03-10', NULL, '2024-03-03T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440141', 'ORD-2024-002', 'shipped', 'Elektros Tiekimas UAB', 'pardavimas@elektrostiekimas.lt', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', 9250, 740, 150, 10140, 'Vytautas Elektras', 'Rasa Jankauskaite', '2024-03-15', '2024-03-22', NULL, NULL, '2024-03-14T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440142', 'ORD-2024-003', 'pending', 'Spalvų Pro Dažai', 'uzsakymai@spalvupro.lt', '550e8400-e29b-41d4-a716-446655440021', 'Nerio Kranto Gyvenamasis Bokštas', 8750, 700, 200, 9650, 'Vidmantas Vamzdiu', NULL, NULL, NULL, NULL, 'Skubiau - reikalinga 15 aukštui baigyti', '2024-03-18T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440143', 'ORD-2024-004', 'approved', 'Betono Šeimininkai UAB', 'uzsakymai@betono-šeimininkai.lt', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', 29000, 2320, 0, 31320, 'Kestutis Metalas', 'Rasa Jankauskaite', NULL, '2024-03-25', NULL, 'Pristatymas suplanuotas 6 val. ryto', '2024-03-19T00:00:00Z', '2024-03-20T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440144', 'ORD-2024-005', 'draft', 'Saugos Pirma Įranga', 'uzsakymai@saugospirma.lt', NULL, NULL, 2650, 212, 50, 2912, 'Gintare Sauga', NULL, NULL, NULL, NULL, 'Saugos įranga naujiems darbuotojams', '2024-03-20T00:00:00Z', '2024-03-20T00:00:00Z');

-- =====================================================
-- ORDER ITEMS
-- =====================================================
INSERT INTO order_items (id, order_id, inventory_item_id, name, sku, quantity, unit_price, total) VALUES
('550e8400-e29b-41d4-a716-446655440150', '550e8400-e29b-41d4-a716-446655440140', '550e8400-e29b-41d4-a716-446655440130', 'Plieninė I-Sija (W10x22)', 'STL-BEAM-001', 100, 450, 45000),
('550e8400-e29b-41d4-a716-446655440151', '550e8400-e29b-41d4-a716-446655440140', '550e8400-e29b-41d4-a716-446655440139', 'Armatūra (#4)', 'CON-REBAR-001', 300, 15, 4500),
('550e8400-e29b-41d4-a716-446655440152', '550e8400-e29b-41d4-a716-446655440141', '550e8400-e29b-41d4-a716-446655440132', 'Elektros Laidai (12 AWG)', 'ELC-WIRE-001', 50, 185, 9250),
('550e8400-e29b-41d4-a716-446655440153', '550e8400-e29b-41d4-a716-446655440142', '550e8400-e29b-41d4-a716-446655440136', 'Vidaus Dažai (5 gal)', 'FIN-PAINT-001', 50, 175, 8750),
('550e8400-e29b-41d4-a716-446655440154', '550e8400-e29b-41d4-a716-446655440143', '550e8400-e29b-41d4-a716-446655440131', 'Paruoštas Betonas', 'CON-RDY-001', 200, 145, 29000),
('550e8400-e29b-41d4-a716-446655440155', '550e8400-e29b-41d4-a716-446655440144', '550e8400-e29b-41d4-a716-446655440134', 'Saugos Šalmas (OSHA Sertifikuotas)', 'SAF-HARD-001', 50, 35, 1750),
('550e8400-e29b-41d4-a716-446655440156', '550e8400-e29b-41d4-a716-446655440144', '550e8400-e29b-41d4-a716-446655440138', 'Aukštos Matomumo Liemenė', 'SAF-VEST-001', 50, 18, 900);

-- =====================================================
-- STOCK MOVEMENTS
-- =====================================================
INSERT INTO stock_movements (id, inventory_item_id, item_name, type, quantity, previous_quantity, new_quantity, project_id, project_name, reason, performed_by, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440160', '550e8400-e29b-41d4-a716-446655440130', 'Plieninė I-Sija (W10x22)', 'in', 100, 45, 145, NULL, NULL, 'Užsakymas ORD-2024-001 pristatytas', 'Mindaugas Liekis', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440161', '550e8400-e29b-41d4-a716-446655440139', 'Armatūra (#4)', 'in', 300, 220, 520, NULL, NULL, 'Užsakymas ORD-2024-001 pristatytas', 'Mindaugas Liekis', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440162', '550e8400-e29b-41d4-a716-446655440130', 'Plieninė I-Sija (W10x22)', 'out', 25, 145, 120, '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', 'Naudota 3 aukšto konstrukcijoms', 'Kestutis Metalas', '2024-03-12T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440163', '550e8400-e29b-41d4-a716-446655440132', 'Elektros Laidai (12 AWG)', 'out', 10, 38, 28, '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '1-2 aukštų elektros instaliacija', 'Vytautas Elektras', '2024-03-14T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440164', '550e8400-e29b-41d4-a716-446655440134', 'Saugos Šalmas (OSHA Sertifikuotas)', 'in', 25, 60, 85, NULL, NULL, 'Saugos įrangos papildymas', 'Gintare Sauga', '2024-03-12T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440165', '550e8400-e29b-41d4-a716-446655440136', 'Vidaus Dažai (5 gal)', 'out', 15, 15, 0, '550e8400-e29b-41d4-a716-446655440021', 'Nerio Kranto Gyvenamasis Bokštas', 'Naudota 14 aukšto dažymui', 'Audrius Stiklas', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440166', '550e8400-e29b-41d4-a716-446655440133', 'PVC Vamzydis (4 coliai)', 'transfer', 50, 370, 320, '550e8400-e29b-41d4-a716-446655440021', 'Nerio Kranto Gyvenamasis Bokštas', 'Perkeltas į projekto vietą', 'Vidmantas Vamzdiu', '2024-03-15T00:00:00Z');

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
('550e8400-e29b-41d4-a716-446655440180', 'Centro Vilniaus Biurų Kompleksas - Pagrindinis Sutartis', 'contract', 'pdf', 2450000, '/documents/contract-001.pdf', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '550e8400-e29b-41d4-a716-446655440170', '550e8400-e29b-41d4-a716-446655440001', 'Algirdas Petrauskas', ARRAY['sutartis', 'pagrindinė', 'pasirašyta'], 'Pagrindinė statybos sutartis su Vilniaus Miesto Plėtra', 3, '2024-01-10T00:00:00Z', '2024-01-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440181', 'Statybos Leidimas - Centro Vilniaus Biurai', 'permit', 'pdf', 1200000, '/documents/permit-001.pdf', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '550e8400-e29b-41d4-a716-446655440171', '550e8400-e29b-41d4-a716-446655440002', 'Rasa Jankauskaite', ARRAY['leidimas', 'patvirtintas', 'savivaldybė'], 'Savivaldybės statybos leidimas', 1, '2024-01-08T00:00:00Z', '2024-01-08T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440182', 'Grindų Planai - 1-5 Lygiai', 'blueprint', 'dwg', 15800000, '/documents/blueprint-001.dwg', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '550e8400-e29b-41d4-a716-446655440172', '550e8400-e29b-41d4-a716-446655440001', 'Algirdas Petrauskas', ARRAY['planai', 'grindys', 'autocad'], 'Detalūs grindų planai 1-5 lygiams', 5, '2024-01-12T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440183', 'Saugumo Tikrinimo Ataskaita - 2024 m. kovas', 'safety', 'pdf', 890000, '/documents/safety-001.pdf', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '550e8400-e29b-41d4-a716-446655440173', '550e8400-e29b-41d4-a716-446655440003', 'Jonas Kuzminskas', ARRAY['sauga', 'tikrinimas', 'ataskaita'], 'Mėnesio saugumo tikrinimo ataskaita', 1, '2024-03-15T00:00:00Z', '2024-03-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440184', 'Statybvietės Pažangos Nuotrauka - 12 savaitė', 'photo', 'jpg', 4500000, '/documents/photo-001.jpg', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', '550e8400-e29b-41d4-a716-446655440174', '550e8400-e29b-41d4-a716-446655440003', 'Jonas Kuzminskas', ARRAY['nuotrauka', 'pažanga', 'oras'], 'Drono nuotrauka rodanti statybos pažangą', 1, '2024-03-18T00:00:00Z', '2024-03-18T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440185', '2024 m. I ketvirčio Finansinis Ataskaita', 'report', 'xlsx', 2100000, '/documents/report-001.xlsx', NULL, NULL, '550e8400-e29b-41d4-a716-446655440175', '550e8400-e29b-41d4-a716-446655440004', 'Laima Zukiene', ARRAY['finansai', 'ketvirtinis', 'ataskaita'], 'Pirmojo ketvirčio finansinis santrauka', 2, '2024-03-01T00:00:00Z', '2024-03-05T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440186', 'Nerio Bokšto - Subrangovų Sutartis', 'contract', 'pdf', 1850000, '/documents/contract-002.pdf', '550e8400-e29b-41d4-a716-446655440021', 'Nerio Kranto Gyvenamasis Bokštas', '550e8400-e29b-41d4-a716-446655440170', '550e8400-e29b-41d4-a716-446655440002', 'Rasa Jankauskaite', ARRAY['sutartis', 'subranga', 'santechnika'], 'Santechnikos subrangovo sutartis', 1, '2023-09-15T00:00:00Z', '2023-09-15T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440187', 'OSHA Atitikties Sertifikatas', 'certification', 'pdf', 560000, '/documents/cert-001.pdf', NULL, NULL, '550e8400-e29b-41d4-a716-446655440173', '550e8400-e29b-41d4-a716-446655440001', 'Algirdas Petrauskas', ARRAY['osha', 'atitiktis', 'sertifikatas'], 'Bendrovės OSHA atitikties sertifikatas', 1, '2024-01-02T00:00:00Z', '2024-01-02T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440188', 'Medžiagos Kvitas - Plieno Pristatymas', 'receipt', 'pdf', 320000, '/documents/receipt-001.pdf', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', NULL, '550e8400-e29b-41d4-a716-446655440003', 'Jonas Kuzminskas', ARRAY['kvitas', 'medžiagos', 'plienas'], 'Plieninių sijų pristatymo kvitas', 1, '2024-03-10T00:00:00Z', '2024-03-10T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440189', 'Sąskaita - INV-2024-002', 'invoice', 'pdf', 450000, '/documents/invoice-001.pdf', '550e8400-e29b-41d4-a716-446655440020', 'Centro Vilniaus Biurų Kompleksas', NULL, '550e8400-e29b-41d4-a716-446655440004', 'Laima Zukiene', ARRAY['sąskaita', 'klientas', 'pažangos-mokėjimas'], 'Vasario pažangos mokėjimo sąskaita', 1, '2024-03-01T00:00:00Z', '2024-03-01T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440190', 'Žaliųjų Slėnių - Pamatų Planai', 'blueprint', 'dwg', 9800000, '/documents/blueprint-002.dwg', '550e8400-e29b-41d4-a716-446655440022', 'Žaliųjų Slėnių Prekybos Centras', '550e8400-e29b-41d4-a716-446655440172', '550e8400-e29b-41d4-a716-446655440002', 'Rasa Jankauskaite', ARRAY['planai', 'pamatai', 'autocad'], 'Pamatų planai ir gręžimo sekcija', 1, '2024-03-05T00:00:00Z', '2024-03-05T00:00:00Z'),
('550e8400-e29b-41d4-a716-446655440191', 'Technoparko - Leidinys', 'permit', 'pdf', 1250000, '/documents/permit-002.pdf', '550e8400-e29b-41d4-a716-446655440024', 'Technologijų Parko Kampusas', '550e8400-e29b-41d4-a716-446655440171', '550e8400-e29b-41d4-a716-446655440002', 'Rasa Jankauskaite', ARRAY['leidimas', 'technologijos', 'savivaldybė'], 'Statybos leidimas - Technoparkas', 1, '2024-03-10T00:00:00Z', '2024-03-10T00:00:00Z');
