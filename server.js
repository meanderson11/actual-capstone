const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());



app.use('/api/v1', transactions);


const PORT = process.env.PORT || 4001;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));