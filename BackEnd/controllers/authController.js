const db = require('../config/db');

// Handle signup
exports.signup = (req, res) => {
  const { name, email, phone, address, password } = req.body;

  // Check if user already exists
  db.query('SELECT * FROM Customer WHERE Email = ?', [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Log the specific error
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'User already registered' });
    }

    // Insert new user
    db.query(
      'INSERT INTO Customer (Name, Email, Phone, Address, password) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, address, password],
      (err, results) => {
        if (err) {
          console.error('Database insert error:', err); // Log the specific error
          return res.status(500).json({ success: false, message: 'Database error' });
        }
        return res.status(201).json({ success: true, message: 'User registered successfully' });
      }
    );
  });
};

// Handle login
exports.login = (req, res) => {
    const { email, password, role } = req.body;
  
    // Determine the table based on role
    const table = role === 'customer' ? 'Customer' : 'Employee';
  
    // Query to find the user
    const query = `SELECT * FROM ${table} WHERE Email = ? AND password = ?`;
  
    // Log the query parameters for debugging
    console.log('Logging in with:', { email, password, role });
  
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Database query error:', err); // Log the specific error
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      console.log('Query results:', results);
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
      // Assuming login is successful, send a success response
      return res.status(200).json({ success: true, message: 'Login successful', role });
    });
  };
// New function to fetch customer ID by email
  exports.getCustomerIdByEmail = (req, res) => {
    const { email } = req.query;
  
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
  
    db.query('SELECT Cus_ID FROM Customer WHERE Email = ?', [email], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ success: false, message: 'Database error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }
  
      return res.status(200).json({ success: true, cus_id: results[0].Cus_ID });
    });
  };