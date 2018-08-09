import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies/movies.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full'},
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/new', component: NewMovieComponent },
  { path: 'movies/:id', component: MovieComponent },
  // { path: 'movies/:id/edit', component: EditComponent },
  // { path: 'movies/:id', component: ReviewComponent },
  { path: 'movies/:id/review', component: ReviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
