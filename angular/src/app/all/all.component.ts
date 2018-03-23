import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})

export class AllComponent implements OnInit {
    restaurants: any;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

  ngOnInit() {
      this.getRestaurants();
  }

  getRestaurants() {
      let observable = this._httpService.getRestaurants()
      observable.subscribe(data => {
          console.log("List of Restaurants", data)
          // console.log(data['data'][0]['name'])
          this.restaurants = data['data'];
      })
  }

  readReviews(id) {
      console.log("clicked read reviews!", id);
      this._router.navigate(['restaurant_review/'+id]);
  }

  showEdit(id) {
      console.log("about to update this bish..", id)
      this._router.navigate(['edit_restaurant/'+id]);
  }

  deleteRest(id){
      // console.log("Deleting restaurant...", id);
      let observable = this._httpService.deleteRest(id);
      observable.subscribe(data => {
          console.log("restaurat has been deleted")
      })
      this.getRestaurants()
  }

}
