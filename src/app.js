require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require("cors");
const blog = require('./model/blog.model');
const product = require('./model/product.model');
const category = require('./model/Category.model');
const blogRouter = require('./routes/blogRouter');
const productRouter = require('./routes/productRouter');
const authRouter = require('./routes/authRouter');
const connectDB = require('./db/db');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://profound-vacherin-d01521.netlify.app','https://playful-gaufre-08ccd5.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/blogs', blogRouter);
app.use('/api/products', productRouter); 
app.use('/api/auth', authRouter);   
module.exports = app;