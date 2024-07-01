const express = require("express"); // Importing Express framework
const bodyParser = require("body-parser"); // Middleware to parse request bodies
const emailRoutes = require("./apiRoutes"); // Importing email routes

const app = express(); // Creating an Express application
const port = 5000; // Port number for server

app.use(bodyParser.json()); // Parsing incoming JSON requests

// Routes
app.use("/api", emailRoutes); // Mounting email routes under /api prefix

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Logging server start-up message
});
