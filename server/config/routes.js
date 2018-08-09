const path = require("path");
const mongoose = require('mongoose');

let MovieController = require("../controllers/MovieController.js");
let ReviewController = require("../controllers/ReviewController.js");

module.exports = function(app) {
  app.get("/api/movies", MovieController.display_all);
  app.post("/api/movies", MovieController.create);
  app.get("/api/movies/:id", MovieController.find_movie);
  app.delete("/api/movies/:id", MovieController.delete);
  app.put("/api/movies/:id", MovieController.update);

  app.post("/api/movies/:id/reviews", ReviewController.create);
  app.get("/api/reviews/:id",ReviewController.find);
  // if we dont hit ay of our backend routes, serve our Angular App
  app.all("*", (req, res, next)=> {
    res.sendFile(path.resolve("./client/public/dist/public/index.html"));
  });
}
