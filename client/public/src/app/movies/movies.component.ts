import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public movies: any;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.all(data => {
      this.movies = data;
    });
  }
}
