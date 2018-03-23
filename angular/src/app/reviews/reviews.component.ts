import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
    restaurant_id: any;
    restaurant_name: any;
    reviews: any;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

  ngOnInit() {
    this._route.params.subscribe( params => {
        this.restaurant_id = params['id'];
    });
    this.getReviewsfromRestaurant(this.restaurant_id)
  }


  getReviewsfromRestaurant(restaurant_id) {
      // console.log("from reviews component", id);
      let observable = this._httpService.findRestaurant(this.restaurant_id);
      observable.subscribe(data => {
          console.log("from reviews component", data)
          console.log(data['data']['name']);
          this.restaurant_name = data['data']['name'];
          console.log(data['data']['reviews'])
          this.reviews = data['data']['reviews']
      })
  }

  addReview(restaurant_id) {
      this._router.navigate(['/restaurant_review/new/' + this.restaurant_id])
  }



}
