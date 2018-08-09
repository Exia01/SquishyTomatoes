// import our requirements
let mongoose = require('mongoose');
let fs = require('fs');
let path = require('path');

// tell our config file where to find our MODEL schema (blueprint)
let models = path.join(__dirname, '../models');

// connect (and possibly create a new) to our DATABASE
mongoose.connect('mongodb://localhost/movies');

//
fs.readdirSync(models).forEach(function (file) {
	if (file.indexOf('.js') >= 0) {
		require(models + '/' + file);
	}
});