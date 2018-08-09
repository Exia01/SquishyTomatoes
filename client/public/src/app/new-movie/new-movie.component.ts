import { ReviewService } from './../review.service';
import { Router } from '@angular/router';
import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  public movie: any;
  public newReview: any;
  public errors;
  public cdata;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private reviewService: ReviewService
  ) {
    this.movie = {
      title: ''
    };
    this.newReview = {
      reviewer_name: '',
      rating: '',
      review: ''
    };
  }

  ngOnInit() {}

  validate(data) {
    const errors = [];
    if (data.error || data.message) {
      errors.push(data.message);
      for (const error in data.error) errors.push(data.error[error].message);
      return errors;
    } else {
      return false;
    }
  }

  // this.reviewService.create(this.reviewService, data => {
  //   this.errors = this.validate(data);}


  create() {
    this.movieService.create(this.movie, data => {
      this.errors = this.validate(data);
      // console.log('this is from the movie service', data);
      // console.log(data._id);

      this.newReview.movie = data._id;

      // console.log('review.movie', this.newReview.movie);

      this.reviewService.create(this.newReview, x => {
        // console.log('This is from the review service', data);
        this.errors = this.validate(x);

        // console.log(this.errors);
        if (!this.errors) this.router.navigateByUrl('movies');
      });
    });
  }
}
