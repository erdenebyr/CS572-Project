const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const actionController = require('../controllers/actionController')
const homeController = require('../controllers/homeController')
const adminController = require('../controllers/adminController')
const loginController = require('../controllers/loginController')
const { parse_json } = require('../middlewares/parseBody');

router.post('/action', checkAuth, parse_json, actionController.doAction);
router.post('/signup', parse_json, loginController.signup);
router.post('/login', parse_json, loginController.login);
router.get('/home', checkAuth, parse_json, homeController.getHome);
router.get('/search/:username', checkAuth, parse_json, homeController.searchUser);

router.get('/:username', checkAuth, parse_json, userController.getProfile)
router.get('/:username/:tweetid', checkAuth, parse_json, userController.getTweetDetial)
router.get('/:username/followers', checkAuth, parse_json, userController.getFollowers)
router.get('/:username/following', checkAuth, parse_json, userController.getFollowing)
router.post('/:username', checkAuth, parse_json, userController.editProfile)

router.post('/adminaction', checkAuth, parse_json, adminController.doAction)

module.exports = router;