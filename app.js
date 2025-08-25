import './config/env.js';
import express from 'express';
import sequelize from './config/db.js';
import './models/index.js';
import routes from './routes/index.js';
import { fileURLToPath } from 'url';
import cors from 'cors';
import path from 'path';
import verifyToken from './middlewares/verifyToken.js';
import cookieParser from 'cookie-parser';
// Load environment variables

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  cors({
    origin: 'http://localhost:3000', // React app URL
    credentials: true, // allow cookies
  })
);
// Serve static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Sync database
sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

app.use('/', routes);
// Get port from .env or use default 6000
const PORT = process.env.PORT || 6000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
