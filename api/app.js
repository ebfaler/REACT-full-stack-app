'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');


// Import cors library
const cors = require('cors');

//importing routes
const userRoutes = require('./routes/user-routes');
const courseRoutes = require('./routes/course-routes');

//importing sequelize instance
const { sequelize } = require('./models/index');

//authenticate connection to the database
sequelize
  .authenticate()
  .then(
    () => {
      console.log('Connection to the database successful!');
    }
  )
  .catch(
    (error) => {
      console.log(`Error connecting to the database: Error: ${error} `);
    }
  );


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();


// Enable all CORS Requests
app.use(cors());

//setting up app for json
app.use(express.json())

// adding routes.
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
