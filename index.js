//console.log(process.env);
require('dotenv').config();

var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');


var userRoute = require('./routes/users.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');
var apiProductRoute = require('./api/routes/product.route');


var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');
var csurf = require('csurf');

// settings
var port = 3000
var app = express();

mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json()); 
app.use(cookieParser('cbhasbhcbhs12233'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);


app.set('view engine', 'pug');
app.set('views', './views')

app.use(express.static('public'));

//app.use(csurf({ cookie: true }));


// direction-7-
app.get('/', function (req, res) {
	res.render('index', {
		name: 'CB02',
	});	
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);
app.use('/api/product', apiProductRoute);
app.use('/api/product', apiProductRoute);

app.listen(port, function () {
	console.log('Server listening on port ' + port)
});

