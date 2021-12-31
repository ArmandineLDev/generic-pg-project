require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./app/router');

const app = express();

app.use(express.json());
app.use(cors('*'));
app.use(router);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});