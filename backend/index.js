const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const routers = require('./src/routers/index.js');
const app = express();

dotenv.config();

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
  (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Mongo conectado');
  }
});
  
app.use(cors());

app.use(express.json());
app.use('/employees', routers);

app.listen(process.env.PORT, () => {
  console.log('Servidor conectado.');
});