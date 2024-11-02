const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const common = require("./CommonService");
const userRoutes = require("./Routes/userRoutes");

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin if different
  credentials: true, // Allow cookies for cross-origin requests (if needed)
}));

// Body Parser Middleware
app.use(express.json());

// Connect to MongoDB (with error handling)
mongoose.connect(common.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    // Handle connection errors gracefully (e.g., display error message to user)
  });

// Error Handling Middleware (catch-all)
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  // You can customize the response based on the error type or code
  res.status(err.status || 500).send({ error: err.message || 'Internal Server Error' });
});

// Routes (including error handling)
app.get('/', (req, res) => {
  try {
    res.send('Backend is Connected');
  } catch (err) {
    console.error('Error in GET / route:', err);
    res.status(err.status || 500).send({ error: err.message || 'Internal Server Error' });
  }
});

// Mount user routes
app.use("/api", userRoutes);

// Start the server
app.listen(common.PORT, () => {
  console.log(`Server is running at http://localhost:${common.PORT}`);
});
