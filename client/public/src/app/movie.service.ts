import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  create(movie, cb) {
    this.http.post('/api/movies', movie).subscribe(data => cb(data));
  }
  all(cb) {
    this.http.get('/api/movies').subscribe(data => cb(data));
  }
  findById(id, cb) {
    this.http.get('/api/movies/' + id).subscribe(data => cb(data));
  }
  destroy(movie, cb) {
    this.http.delete('/api/movies/' + movie._id).subscribe(data => cb(data));
  }
  update(movie, cb) {
    this.http
      .put('/api/movies/' + movie._id, movie)
      .subscribe(data => cb(data));
  }
}
