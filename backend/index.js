const app = require('./src/app');
const { connectDB } = require('./src/config/db');

const PORT = process.env.PORT || 4000;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    // Try to connect to MongoDB but start server regardless
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server error:', err);
    process.exit(1);
  }
};

startServer();
