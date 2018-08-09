// Require our database and use our Movie Model
const Movie = require('mongoose').model('Movie');

class MovieController {

// ------- display_all METHOD ------------------ //

  display_all(req, res) {
    Movie.find( {} )
      .populate({
//---- our Foreign Key association
        model:'Review',
        path: 'reviews'
      })
// ---- once .populate() knows what we want to reference and where to find that blueprint we 'execute' the following function... which is our callback or error.
      .exec((err, data) => {
        if(data) {
          // return all tasks as JSON OBJECTS
          return res.json(data);
  			} else {
  				return res.json( {
            "error":err,
            "message":"Unable to exec movie.",
          });
  			}
      });
  }

// ------- findById METHOD ------------------ //


  find_movie(req, res) {
      Movie.findOne({_id:req.params.id})
      .populate({
          path:"reviews",
          model:"Review"
      })
      .exec((err,data)=>{
          if(data){
              return res.json(data);
          }else{
              return res.json({
                "error":err,
                "message":"Failed to find Movie" + req.params.id
              });
          }
      })
  }

// ------- create METHOD ------------------ //


  create(req, res) {
    let movie = new Movie(req.body);

    movie.save(err=> {
      if(err) {
        // console.log("Something went wrong", err);
        return res.json({
          "error":err.errors,
          "message":"Failed to create Movie"
        });
      } else {
        // console.log("Movie created successfully");
        return res.json(movie);
      }
    });
  }


// ------- update METHOD ------------------ //

  update(req, res) {

    Movie.findOne({_id: req.params.id}, (err, movie)=> {
      if(movie){
        // if the field was updated, update it. If not changed, save what we had before
        movie.name = req.body.name || movie.name;
        movie.cuisine = req.body.cuisine || movie.cuisine;

        movie.save( err=> {
          if(err) {
            console.log("Movie did not save", err);
            return res.json({
              "error":err.errors,
              "message":"Failed to update Movie" + req.params.id
            });
          } else {
            console.log("Movie updated successfully");
            return res.json(movie);
          }
        });

      } else {
        // console.log("Something went sideways", err);
        return res.json({
          "error":err,
          "message":"Failed to find Movie" + req.params.id
        });
      }

    });

  }


// ------- destroy METHOD ------------------ //

  delete(req, res) {
    Movie.findOne({_id: req.params.id}, (err, movie)=> {
      if(movie){

        Movie.remove( {_id:req.params.id}, function(err) {
          // console.log("Found: ", movie);

          if(err) {
            console.log("Something went sideways", err);
            return res.json({
              "error":err,
              "message":"Failed to remove Movie" + req.params.id
            });
          } else {
            return res.json(movie);
          }
        });

      } else {
        return res.json({
          "error":err,
          "message":"Failed to find Movie" + req.params.id
        });
      }
    });
  }



// ------- end of Controller ------------------ //

}  // end of MovieController()

// export our MovieController()
module.exports = new MovieController();
