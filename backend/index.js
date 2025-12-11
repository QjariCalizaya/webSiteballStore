const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(5000, () => console.log('Backend corriendo en puerto 5000'));