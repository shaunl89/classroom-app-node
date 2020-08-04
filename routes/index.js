const express = require('express')
const router = express.Router();

const registerController = require('../controllers/registerController')
const suspendController = require('../controllers/suspendController')
const commonstudentsController = require('../controllers/commonstudentsController')
const notificationsController = require('../controllers/notificationsController')

// register students to teacher
router.post('/register', registerController)

// get students under teachers
router.get('/commonstudents', commonstudentsController)

// suspend student
router.post('/suspend', suspendController)

// get students who can receive notification
router.post('/retrievefornotifications', notificationsController)

module.exports = router