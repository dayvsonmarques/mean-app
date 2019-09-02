let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./db');

//Connecting MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully!');
  },
  error => {
    console.log('Could not connected to database: ', error);
  });

//Set up express js port
const studentRoute = require('../backend/routes/student.routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// Setting up static directory
app.use(express.static(path.join(__dirname, 'dist/angular-firebase-crud')));
//app.use('/', express.static(path.join(__dirname, 'dist/angular-firebase-crud')));

// RESTful API root
app.use('http://localhost:4000/api', studentRoute);

//Create port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Connected to port' + port);
});

//Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-firebase-crud/index.html'));
});

//error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
