const router = require('express').Router();
let User = require('../models/user.model');  //require mongoose model

router.route('/').get((req, res) => {
  User.find()  // find returns a promise
    .then(users => res.json(users))  // return the users if successful
    .catch(err => res.status(400).json('Error: ' + err));  // or return error
});


router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;