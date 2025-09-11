// api/index.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3001' }));
app.use(express.json());

/* health check – REQUIRED */
app.get('/', (_req, res) => res.json({ msg: 'medi-cart API is awake 🚀' }));

/* example route */
app.get('/hello', (_req, res) => res.json({ hello: 'world' }));

module.exports = app;   // ← DO NOT .listen()