var express = require('express');

var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

var controller = require('../controllers/users.controller');
var validate = require('../validate/users.validate');
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/', controller.index);

router.get('/cookie', function (req, res, next) {
	res.cookie('user-id', 12345);
	res.send('Hello');
});

router.get('/create', controller.getCreate);

router.post('/create',
 upload.single('avatar'),
 validate.postCreate,
 controller.postCreate
);

router.get('/search', controller.searchUser);

router.get('/:id', controller.viewUser);


module.exports = router;