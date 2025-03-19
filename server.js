const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve admin dashboard from the dist/admin directory
app.use('/admin', express.static(path.join(__dirname, 'dist/admin')));

// Special route handling for admin dashboard SPA
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/admin/index.html'));
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`Admin dashboard available at http://localhost:${port}/admin/`);
});
