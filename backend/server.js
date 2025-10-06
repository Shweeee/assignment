require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const jobsRouter = require('./routes/jobs');

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
app.use('/api/jobs', jobsRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_jobs';

connectDB(MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch(err => {
  console.error('DB connect error', err);
});
