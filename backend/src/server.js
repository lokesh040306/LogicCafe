import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const PORT = env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } 
  catch(error) {
    console.error('❌ Failed to start server', error);
    // Exit process with failure
    process.exit(1);
  }
};

startServer();
