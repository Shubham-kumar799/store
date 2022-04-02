const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const { readdirSync } = require('fs');

const PORT = process.env.PORT || 8000;

const app = express();

//APPLYING MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());
app.use(helmet());

// CONNECTING TO DATABASE
mongoose
  .connect(process.env.MONGO_CONNECTION_URI)
  .then(() => console.log('db connected 😁'))
  .catch(error => console.log('error connecting db 😐', error));

//ROUTES
readdirSync('./routes').map(r => app.use('/api', require(`./routes/${r}`)));

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
