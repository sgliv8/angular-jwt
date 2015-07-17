var express = require('express');
var faker = require('faker');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var jwtSercet = 'fdsfafdhoijiafd/3uk';

var user = {
	username: 'jayemily',
	password: 'p'
};

var app = express();

//app.use(cors());

app.use(bodyParser.json());
//app.use(expressJwt({secret: expressJwt}).unless({path:['/login']}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/random-user', function(req, res){
	var user = faker.helpers.userCard();
	user.avatar = faker.image.avatar();
	res.json(user);
});

app.get('/', function(req, res){
	res.redirect(index);
});

app.get('/login', function(req, res){
	res.render(index);
});

app.get('/me', function(req, res){
	res.send(user);
	//res.send(req.user);
});

app.post('/login', authenticate, function(req, res){
	var token = jwt.sign({
		username: user.username
	}, jwtSercet);
	res.send({
		token: token,
		user: user
	});
});


app.listen(3000, function(){
	console.log("App listening on localhost:3000");
});

// UTIL FUNCTIONS

function authenticate(req, res, next){
	var body = req.body;

	if(!body.username || !body.password){
		res.status(400).end('Must provide username or password');
	}

	if( body.username !== user.username || body.password !== user.password){
		res.status(401).end('Username or password incorrect');
	}

	next();
}