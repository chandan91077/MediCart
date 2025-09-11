/*  src/App.js  */
require('dotenv').config();
const express      = require('express');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
const path         = require('path');

const app = express();

/* ---------- middleware ---------- */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('uploads'));

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));

/* ---------- DB ---------- */
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

/* ---------- routes ---------- */
app.get('/', (_req, res) => res.json({ msg: 'medi-cart API is awake 🚀' }));

app.use('/auth',       require('./Routers/authRoute'));
app.use('/pharmacist', require('./Routers/pharmacistRoute'));
app.use('/admin',      require('./Routers/adminRoute'));
app.use('/patient',    require('./Routers/patientRoute'));
app.use('/cart',       require('./Routers/cartRoute'));
app.use('/order',      require('./Routers/orderRoute'));

/* ---------- export ---------- */
module.exports = app;
