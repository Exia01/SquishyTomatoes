import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public movie;
  public errors;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieService.findById(params.id, data => {
        this.movie = data;
        // console.log(this.movie);
      });
    });
  }
  destroy(movie) {
    const errors = [];
    this.movieService.destroy(movie, data => {
        this.router.navigateByUrl('movies');
      });
  }
}
