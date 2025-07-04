const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes 
app.use('/api/posts', postRoutes);

const dbUser = process.env.MONGO_INITDB_ROOT_USERNAME || 'admin'; 
const dbPassword = process.env.MONGO_INITDB_ROOT_PASSWORD || 'password'; 
const dbHost = 'mongo'; 
const dbPort = '27017';
const dbName = 'postdb';

const dbURI = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const dbOptions = {
  authSource: 'admin', 
  user: dbUser,
  pass: dbPassword,
  // Other recommended options
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbURI, dbOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Post Service is running!');
});

app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something broke!');
}); 