const express = require('express');
const router = express.Router();
const {createNewUser, getUser} = require('../controllers/users');

router.route('/').post(createNewUser);
router.route('/:id').get(getUser);

module.exports = router;