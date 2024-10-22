require("dotenv").config();
const mysql = require("mysql2");

// Create a MySQL connection using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "db", // Default to service name for Docker
  user: process.env.DB_USER, // Use 'root' for MySQL
  password: process.env.DB_PASSWORD, // Use root password
  database: process.env.DB_DATABASE, // Use the specified database
  port: process.env.DB_PORT || 3306, // Default to 3306 if not set
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Handle connection errors
connection.on("error", (err) => {
  console.error("MySQL connection error:", err);
});

// Export the connection for use in other modules
module.exports = connection;
