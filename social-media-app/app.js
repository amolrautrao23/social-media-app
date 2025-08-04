import './config/env.js'
import express from 'express';
import sequelize from './config/db.js';
import './models/index.js'
import routes from './routes/index.js'
// Load environment variables

const app = express();

// Middleware to parse JSON
app.use(express.json());
// Sync database
sequelize.sync()
.then(() => {
  console.log('Database synchronized successfully');
})
.catch((error) => {
  console.error('Error synchronizing database:', error);
});

app.use("/",routes);
// Get port from .env or use default 6000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
