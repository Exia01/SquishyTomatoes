import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  private restaurant;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: MovieService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantService.findById(params.id, data => {
        this.restaurant = data;
      });
    });
  }

  update() {
    this.restaurantService.update(this.restaurant, data => {
      if (data.errors) {
      } else {
        this.router.navigateByUrl('/restaurants');
      }
    });
  }
}
