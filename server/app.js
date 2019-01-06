var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var transactionsRouter = require('./routes/transactions');
var itemsRouter = require('./routes/items');

var app = express();
mongoose.connect('mongodb://localhost/membership');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);
app.use('/items', itemsRouter);

module.exports = app;

// HOLIDAY TASK
// Buatlah enpoint RESTFUL API yang memenuhi spesifikasi berikut ini:
// Secara umum API yang akan digunakan utk membuat aplikasi membership yang mengumpulkan poin.

// 1. API User register, login, my profile, edit my profile (DONE)
// 2. API yang mencatat transaksi pembelian user (DONE)
// 3. API untuk melihat detail transaksi user, dia membeli item apa saja, jumlah dan harga nya berapa (DONE)
// 4. Setiap User melakukan pembelian kelipatan 100,000 maka dia akan mendapatkan point(DONE)
// 5. API untuk CRUD reward items, dimana ini akan berisi item2 apa saja yang dapat ditukar oleh point dan jumlah point nya berapa (DONE)
// 6. API User Points, dimana API ini akan mengembalikan jumlah
// point yang telah dimiliki user dan suggestions barang apa saja yang
// bisa ditukar user sesuai dengan point yang dimiliki (DONE)

// RELEASE 2 (optional)
// Membuat aplikasi client untuk API di atas