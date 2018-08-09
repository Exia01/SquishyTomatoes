// Require our database and use our Movie Model
const Review = require('mongoose').model('Review');
const Movie = require('mongoose').model('Movie');

class ReviewController {
// ------- Find One Review METHOD ------------------ //
    find(req,res){
        Review.findOne({_id:req.params.id})
        .populate({
            model:"Movie",
            path:"movie"
        })
        .exec((err,review)=>{
            if(review){
                return res.json(review);
            }else{
                return res.json({
                    errors:err,
                    message:"Failed to populate movie for review."
                });
            }
        })
    }
// ------- display_all METHOD ------------------ //

  display_all(req, res) {
    Review.find( {} )
    .populate({
//--- our Foreign Key association
      model:'Movie',
      path: 'movie'
    })
// ---- once .populate() knows what we want to reference and where to find that blueprint we 'execute' the following function... which is our callback or error.
    .exec((err, data) => {
      if(reviews) {
        // return all tasks as JSON OBJECTS
        return res.json(reviews);
			} else {
				return res.json( {
          "error":err,
          "message":"Something went terribly terribly wrong!",
        });
			}
    });
  }

// ------- create METHOD ------------------ //


  create(req, res) {
    
    let review = new Review(req.body);
    review.movie = req.params.id;
    // console.log('this is working')
//----  save review to DB ------
    review.save(err=> {
      if(err) {
        return res.json({
          "error":err.errors,
          "message":"Failed to create review"
        });
      } else {
        //-----  find the associated Movie  ------
        Movie.findOne( {_id:req.params.id}, (err, movie)=> {
          if(movie) {
          // put the ID of this review into the 'reviews' array in the this movie(_id) instance
            console.log(review);
            movie.reviews.push(review._id);

            movie.save(err=>{
                if(err){
                    return res.json("GO fix your problems");
                }else{
                    return res.json(review);
                }
            });
          } else {
            // console.log("Movie not found", err);
            return res.json({
              "error":err,
              "message":"Failed to find Movie with id:" + req.params.id
            });
          }
        });
      }
    });

  }

// ------- end of Controller ------------------ //

}  // end of ReviewController()

// export our ReviewController()
module.exports = new ReviewController();
