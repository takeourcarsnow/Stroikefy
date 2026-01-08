import * as XLSX from 'xlsx';

export interface ExcelImportResult<T> {
  data: T[];
  errors: string[];
  totalRows: number;
  successRows: number;
}

export function parseExcelFile<T>(
  file: File,
  mapRow: (row: Record<string, unknown>, index: number) => T | null,
  validateRow?: (row: Record<string, unknown>, index: number) => string | null
): Promise<ExcelImportResult<T>> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);
        
        const results: T[] = [];
        const errors: string[] = [];
        
        jsonData.forEach((row, index) => {
          // Validate row if validator provided
          if (validateRow) {
            const error = validateRow(row, index + 2); // +2 for header and 0-index
            if (error) {
              errors.push(`Row ${index + 2}: ${error}`);
              return;
            }
          }
          
          // Map row to target type
          const mapped = mapRow(row, index);
          if (mapped) {
            results.push(mapped);
          } else {
            errors.push(`Row ${index + 2}: Failed to parse row`);
          }
        });
        
        resolve({
          data: results,
          errors,
          totalRows: jsonData.length,
          successRows: results.length,
        });
      } catch (error) {
        reject(new Error('Failed to parse Excel file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
}

export function exportToExcel<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  sheetName: string = 'Sheet1'
): void {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

// Employee import mapping
export function mapEmployeeRow(row: Record<string, unknown>): {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  type: string;
  salary: number;
} | null {
  if (!row['Name'] || !row['Email']) return null;
  
  return {
    name: String(row['Name'] || ''),
    email: String(row['Email'] || ''),
    phone: String(row['Phone'] || ''),
    position: String(row['Position'] || ''),
    department: String(row['Department'] || ''),
    type: String(row['Type'] || 'full-time').toLowerCase(),
    salary: Number(row['Salary']) || 0,
  };
}

// Inventory import mapping
export function mapInventoryRow(row: Record<string, unknown>): {
  sku: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  quantity: number;
  minQuantity: number;
  unitPrice: number;
  location: string;
  supplier: string;
} | null {
  if (!row['SKU'] || !row['Name']) return null;
  
  return {
    sku: String(row['SKU'] || ''),
    name: String(row['Name'] || ''),
    description: String(row['Description'] || ''),
    category: String(row['Category'] || 'other').toLowerCase().replace(' ', '-'),
    unit: String(row['Unit'] || 'piece'),
    quantity: Number(row['Quantity']) || 0,
    minQuantity: Number(row['Min Quantity']) || 0,
    unitPrice: Number(row['Unit Price']) || 0,
    location: String(row['Location'] || ''),
    supplier: String(row['Supplier'] || ''),
  };
}

// Task import mapping
export function mapTaskRow(row: Record<string, unknown>): {
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  estimatedHours: number;
  assigneeName: string;
} | null {
  if (!row['Title']) return null;
  
  return {
    title: String(row['Title'] || ''),
    description: String(row['Description'] || ''),
    priority: String(row['Priority'] || 'medium').toLowerCase(),
    dueDate: row['Due Date'] ? new Date(String(row['Due Date'])) : new Date(),
    estimatedHours: Number(row['Estimated Hours']) || 0,
    assigneeName: String(row['Assignee'] || ''),
  };
}

// Get sample Excel template data
export function getSampleTemplateData(type: 'employees' | 'inventory' | 'tasks'): Record<string, unknown>[] {
  switch (type) {
    case 'employees':
      return [
        { Name: 'John Doe', Email: 'john@example.com', Phone: '+1 555-0100', Position: 'Engineer', Department: 'Engineering', Type: 'Full-time', Salary: 75000 },
        { Name: 'Jane Smith', Email: 'jane@example.com', Phone: '+1 555-0101', Position: 'Supervisor', Department: 'Construction', Type: 'Full-time', Salary: 65000 },
      ];
    case 'inventory':
      return [
        { SKU: 'MAT-001', Name: 'Steel Beam', Description: 'Standard steel beam 10ft', Category: 'Construction Materials', Unit: 'piece', Quantity: 100, 'Min Quantity': 20, 'Unit Price': 250, Location: 'Warehouse A', Supplier: 'Steel Co.' },
        { SKU: 'TLS-001', Name: 'Power Drill', Description: 'Cordless power drill', Category: 'Tools', Unit: 'piece', Quantity: 15, 'Min Quantity': 5, 'Unit Price': 150, Location: 'Tool Shed', Supplier: 'Tool Depot' },
      ];
    case 'tasks':
      return [
        { Title: 'Foundation Work', Description: 'Complete foundation for building A', Priority: 'High', 'Due Date': '2024-04-15', 'Estimated Hours': 80, Assignee: 'John Smith' },
        { Title: 'Electrical Wiring', Description: 'Install wiring for floor 1', Priority: 'Medium', 'Due Date': '2024-04-20', 'Estimated Hours': 40, Assignee: 'David Lee' },
      ];
    default:
      return [];
  }
}

export function downloadSampleTemplate(type: 'employees' | 'inventory' | 'tasks'): void {
  const data = getSampleTemplateData(type);
  exportToExcel(data, `${type}_template`, 'Template');
}
