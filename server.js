const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const path       = require('path');
const PORT = 8000;

const app = express();

// allow our APP to use bodyParser and parse return OBJECTS as JSON OBJECTS
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

// serves up our Angular App
app.use(express.static(path.join(__dirname, '/client/public/dist/public')));

// connect to our Mongo database
require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

app.listen(PORT, ()=> {
  console.log("Listening on PORT:" + PORT);
});
