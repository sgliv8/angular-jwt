var express = require('express');
var faker = require('faker');
var cors = require('cors');
var path = require('path');


var app = express();

//app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/random-user', function(req, res){
	var user = faker.helpers.userCard();
	user.avatar = faker.image.avatar();
	res.json(user);
});

app.listen(3000, function(){
	console.log("App listening on localhost:3000");
});