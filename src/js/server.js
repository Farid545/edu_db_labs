const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Function to add a new item to the 'content' table
async function addItem(title, description, status) {
  const query = 'INSERT INTO content (title, description, status) VALUES (?, ?, ?)';
  const values = [title, description, status];

  try {
    const [result] = await connection.promise().execute(query, values);
    return result.insertId; // Return the ID of the newly inserted item
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
}

// Function to remove an item from the 'content' table by ID
async function removeItem(idContent) {
  const query = 'DELETE FROM content WHERE idContent = ?';

  try {
    const [result] = await connection.promise().execute(query, [idContent]);
    return result.affectedRows > 0; // Return true if a row was deleted
  } catch (error) {
    console.error('Error removing item:', error);
    throw error;
  }
}

// Function to update an item in the 'content' table by ID
async function updateItem(idContent, title, description, status) {
  const query = 'UPDATE content SET title = ?, description = ?, status = ? WHERE idContent = ?';
  const values = [title, description, status, idContent];

  try {
    const [result] = await connection.promise().execute(query, values);
    return result.affectedRows > 0; // Return true if a row was updated
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
}

// Function to get all items from the 'content' table
async function getAllItems() {
  const query = 'SELECT * FROM content';

  try {
    const [rows] = await connection.promise().query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

async function getItemById(idContent) {
    const query = 'SELECT * FROM content WHERE idContent = ?';
  
    try {
      const [rows] = await connection.promise().query(query, [idContent]);
      return rows[0]; // Return the first (and only) row
    } catch (error) {
      console.error('Error fetching item by ID:', error);
      throw error;
    }
  }
  
app.post('/getbyid', async (req, res) => {
const { idContent } = req.body;

try {
    const item = await getItemById(idContent);
    res.json(item);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

app.post('/add', async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const newItemId = await addItem(title, description, status);
    res.json({ success: true, idContent: newItemId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/remove', async (req, res) => {
  const { idContent } = req.body;

  try {
    const itemRemoved = await removeItem(idContent);
    res.json({ success: itemRemoved });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/update', async (req, res) => {
  const { idContent, title, description, status } = req.body;

  try {
    const itemUpdated = await updateItem(idContent, title, description, status);
    res.json({ success: itemUpdated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/show', async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.on('close', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection:', err);
    } else {
      console.log('MySQL connection closed');
    }
  });
});

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});

process.on('SIGINT', () => {
  app.emit('close');
  process.exit(0);
});
