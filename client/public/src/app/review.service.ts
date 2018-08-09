import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  create(review, cb) {
    console.log(review.movie);
    this.http
      .post('/api/movies/' + review.movie + '/reviews', review)
      .subscribe(data => cb(data));
  }
}
