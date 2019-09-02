const express = require('express');
const app = express();
const studentRoutes = express.Router();

//Student Model
let Student = require('../model/Student');

//Add Student
studentRoutes.route('/add-student').post((res, req, next) => {
  Student.create(req, body, (error, data) => {
    if(error) {
      return next( error );
    } else {
      res.json( data );
    }
  });
});

//Get All Students
studentRoutes.route('/').get((req, res) => {
  Student.find((error, data) => {
    if(error) {
      return next(error);
    }else {
      res.json(data);
    }
  });
});

//Get Single Student
studentRoute.route('/read-student/:id').get((req, res) => {
  Student.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update student
studentRoute.route('/update-student/:id').put((req, res, next) => {
  Student.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data)
      console.log('Student successfully updated!');
    }
  });
});

studentRoute.route('/delete-student/:id').delete((req, res, next) => {
  Student.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  });
});

module.exports = studentRoute;
