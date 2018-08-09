import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { ReviewComponent } from './review/review.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies/movies.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ReviewService } from './review.service';
import { MovieService } from './movie.service';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    DetailComponent,
    ReviewComponent,
    NewMovieComponent,
    MovieComponent,
    MoviesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ReviewService, MovieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
