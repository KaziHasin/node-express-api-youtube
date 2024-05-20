const express = require('express');
const app = express();
const cors = require('cors')
const products = require('./routes/products');
const notFound = require('./middleware/not-found');
const errorHandling = require('./middleware/error-handling');
require("dotenv").config();
const port = process.env.PORT || 4000;
const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
} else {

    app.get('/', (req, res) => {
        res.send("Node App");
    });

    app.use('/api/products', products);
}


app.use(notFound);
app.use(errorHandling);


app.listen(port, () => { console.log(`The app running port ${port}`); })

