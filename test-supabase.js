const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qaxmuywlomycaqgufqth.supabase.co';
const supabaseKey = 'sb_publishable_m14345nEVHuE8CgMHE-zTg_eyRCbRdH';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');
  
  try {
    // Test 1: Check projects table
    console.log('📊 Testing: Fetching projects...');
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, name, status')
      .limit(1);
    
    if (projectsError) {
      console.log('❌ Projects Error:', projectsError.message);
      console.log('   Code:', projectsError.code);
    } else {
      console.log('✅ Projects Success! Found:', projects.length, 'records');
    }

    // Test 2: Check employees table
    console.log('\n📊 Testing: Fetching employees...');
    const { data: employees, error: employeesError } = await supabase
      .from('employees')
      .select('id, name, status')
      .limit(1);
    
    if (employeesError) {
      console.log('❌ Employees Error:', employeesError.message);
      console.log('   Code:', employeesError.code);
    } else {
      console.log('✅ Employees Success! Found:', employees.length, 'records');
    }

    // Test 3: Check inventory_items table
    console.log('\n📊 Testing: Fetching inventory_items...');
    const { data: inventory, error: inventoryError } = await supabase
      .from('inventory_items')
      .select('id, name')
      .limit(1);
    
    if (inventoryError) {
      console.log('❌ Inventory Error:', inventoryError.message);
      console.log('   Code:', inventoryError.code);
    } else {
      console.log('✅ Inventory Success! Found:', inventory.length, 'records');
    }

    // Test 4: Check invoices table
    console.log('\n📊 Testing: Fetching invoices...');
    const { data: invoices, error: invoicesError } = await supabase
      .from('invoices')
      .select('id, status')
      .limit(1);
    
    if (invoicesError) {
      console.log('❌ Invoices Error:', invoicesError.message);
      console.log('   Code:', invoicesError.code);
    } else {
      console.log('✅ Invoices Success! Found:', invoices.length, 'records');
    }

    console.log('\n' + '='.repeat(50));
    console.log('🎯 DIAGNOSIS:');
    console.log('='.repeat(50));
    
    const errors = [projectsError, employeesError, inventoryError, invoicesError].filter(Boolean);
    
    if (errors.length === 0) {
      console.log('✅ All tables accessible! RLS appears to be disabled correctly.');
    } else if (errors.every(e => e.code === 'PGRST116' || e.message.includes('401'))) {
      console.log('❌ RLS STILL ENABLED - 401 Unauthorized errors on all tables');
      console.log('   Action: Run the SQL to disable RLS in Supabase SQL Editor');
    } else {
      console.log('⚠️  Mixed results - some tables accessible, some not');
      errors.forEach(e => console.log('   -', e.message));
    }

  } catch (error) {
    console.log('❌ Connection Error:', error.message);
  }
}

testConnection();
