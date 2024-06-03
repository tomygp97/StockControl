const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// routes
const productRouter = require('./routes/porductRouter');
//TODO const costRouter = require('./routes/costRouter');
//TODO const saleRouter = require('./routes/saleRouter');


const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola mundo desde StockControl!');
});

app.use('/products', productRouter);
//TODO app.use('/costs', costRouter);
//TODO app.use('/sales', saleRouter);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.log('Error conectando a MongoDB', err))
;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});