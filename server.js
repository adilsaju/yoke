// import bodyParser from 'body-parser';
// import jsonwebtoken from 'jsonwebtoken';
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { addData } = require('./scripts/data-create');
const studentRoute = require('./routes/studentRoute');
const jwt = require('jsonwebtoken');

// const bodyParser = require('body-parser')

// const login = require('./routes/login')
const errorHandler = require('./middlewares/errorMiddleware');

const port = process.env.PORT || 5001;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () =>
  console.error('connected to database')
);

// addData()

//middleware
app.use(express.json());
// app.disable('view cache');

//router
app.use('/', studentRoute);

// app.use("/login", login)

//error handler middleware
app.use(errorHandler);
// app.use(bodyParser()) // support encoded bodies
// bodyParser.json([])

app.listen(port, () => {
  console.log('server started');
});

//**body parse setup */
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

//**JWT Set up */
app.use((req, res) => {
  //**authenticate email */
  const studentEmail = Student.studentModel.findOne({
    email: req.body.email,
  });
  const studentUser = { email: studentEmail };

  accessTolken = jwt.sign(
    studentUser,
    process.env.ACCESS_TOKEN_SECRET
  );
  res.json({ accessTolken: accessTolken });

  //** middleware */
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, studentUser) => {
        if (err) return res.sendStatus(403);
        req.studentUser = studentUser;
        next();
      }
    );
  }
});
