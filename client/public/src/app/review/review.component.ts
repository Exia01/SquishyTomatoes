import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  public newReview;
  public errors;
  public movie;

  constructor(
    private reviewService: ReviewService,
    private movieservice: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.newReview = {
      reviewer_name: '',
      rating: '',
      review: ''
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieservice.findById(params.id, data => {
        this.movie = data;
      });
    });
    this.route.params.subscribe(params => (this.newReview.movie = params.id));
    // console.log(this.newReview.movie);
  }
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

  create() {
    this.reviewService.create(this.newReview, data => {
      // console.log(data);
      this.errors = this.validate(data);
      if (!this.errors) {
        this.router.navigate(['movies']);
      }
    });
  }
}
