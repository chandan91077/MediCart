require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3001' }));
app.use(express.json());

app.get('/', (_req, res) => res.json({ msg: 'medi-cart API is awake 🚀' }));

module.exports = app;
