const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// allow reading the .env file
dotenv.config();

// IMPORT MODELS
require('./models/User');
require('./models/Item');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () =>
  console.log('connect to mongoDB!')
);

app.use(bodyParser.json());

//IMPORT ROUTES
require('./routes/userRoutes')(app);
require('./routes/itemRoutes')(app);
require('./routes/transRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});