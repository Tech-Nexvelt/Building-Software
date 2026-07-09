-- Create Database Schema for Nexvelt POS Dashboard

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bills Table
CREATE TABLE bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_no TEXT NOT NULL UNIQUE,
  customer_name TEXT DEFAULT 'Walk-in Customer',
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'Paid',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bill Items Table
CREATE TABLE bill_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id UUID REFERENCES bills(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dashboard Activity Table
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mock Data Seeding (May 2025 context based on UI)

INSERT INTO products (id, name, category, price, stock) VALUES
  ('a1b2c3d4-1234-5678-90ab-cdef12345678', 'Cappuccino', 'Beverages', 120.00, 50),
  ('b2c3d4e5-1234-5678-90ab-cdef12345678', 'Chocolate Brownie', 'Desserts', 80.00, 20),
  ('c3d4e5f6-1234-5678-90ab-cdef12345678', 'Veg Sandwich', 'Food', 150.00, 30);

-- Generate mock bills for recent activity
INSERT INTO bills (id, bill_no, customer_name, total_amount, status, created_at) VALUES
  ('d4e5f6a1-1234-5678-90ab-cdef12345678', 'INV-00125', 'Walk-in Customer', 493.50, 'Paid', NOW() - INTERVAL '2 hours'),
  ('e5f6a1b2-1234-5678-90ab-cdef12345678', 'INV-00124', 'Rahul Sharma', 875.00, 'Paid', NOW() - INTERVAL '3 hours'),
  ('f6a1b2c3-1234-5678-90ab-cdef12345678', 'INV-00123', 'Priya Patel', 210.00, 'Paid', NOW() - INTERVAL '4 hours'),
  ('12345678-1234-5678-90ab-cdef12345678', 'INV-00122', 'Walk-in Customer', 620.00, 'Paid', NOW() - INTERVAL '5 hours'),
  ('23456789-1234-5678-90ab-cdef12345678', 'INV-00121', 'Amit Verma', 350.00, 'Paid', NOW() - INTERVAL '6 hours');

-- Generate mock activity log
INSERT INTO activities (title, description, type, created_at) VALUES
  ('New bill created', 'INV-00125 for ₹493.50', 'bill', NOW() - INTERVAL '2 hours'),
  ('Payment received', '₹875.00 via Cash', 'payment', NOW() - INTERVAL '3 hours'),
  ('New product added', 'Chocolate Brownie', 'product', NOW() - INTERVAL '4 hours'),
  ('Stock updated', 'Cappuccino Powder', 'stock', NOW() - INTERVAL '5 hours'),
  ('New user added', 'Rahul as Cashier', 'user', NOW() - INTERVAL '6 hours');
