module.exports = app;
// External variables
const express = require("express");
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.set('strictQuery', false);
require("dotenv").config();
const MongoURI = process.env.MONGO_URI ;
const {patientRegister} = require("./Routes/userController");
const {createPharmacistReq,searchMedicine} = require("./Routes/pharmacistController");
const {addAdmin,viewPatientDet, PatientDetailsResults} = require("./Routes/adminController");
const cors = require('cors');
var cookies = require("cookie-parser");

const fs = require('fs');

//App variables
const app = express();
const path = require("path");
app.use(express.static('uploads'));


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("views", path.join(__dirname, "Views"));

const admin = require("./Routers/adminRoute");
const pharmacist = require("./Routers/pharmacistRoute");
const patient = require("./Routers/patientRoute");
const auth = require("./Routers/authRoute");
const cart = require("./Routers/cartRoute");
const order = require("./Routers/orderRoute");




app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())
app.use(cookies());

const corsOptions = {
  origin: 'http://localhost:3001',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};


app.use(cors(corsOptions));






// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
})
.catch(err => console.log(err));


// Root route for health check or friendly message
app.get('/', (_req, res) => res.json({ msg: 'medi-cart API is awake 🚀' }));

// Routes
app.use("/auth",auth);
app.use("/pharmacist",pharmacist)
app.use("/admin",admin)
app.use("/patient",patient)
app.use("/cart",cart);
app.use("/order",order)





