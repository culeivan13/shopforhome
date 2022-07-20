const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("db connection is successful"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);

app.listen(process.env.PORT || 3000, () => console.log("server is running"));