import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    restaurant_id: any;
    current_restaurant: any;
    name: any;
    cuisine: any;
    errors: any;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

  ngOnInit() {
      this._route.params.subscribe( params => {
          this.restaurant_id = params['id'];
      });
      this.getRestaurantEdit(this.restaurant_id);
  }

  getRestaurantEdit(restaurant_id) {
      let observable = this._httpService.findRestaurant(this.restaurant_id);
      observable.subscribe(data => {
          console.log('getting restaurant info', data);
          this.current_restaurant= data['data']
          this.name= data['data']['name']
          this.cuisine= data['data']['cuisine']
          // console.log(data['data'])
      })
  }

  submitEdit() {
      console.log("about to submit the edit...")
      let observable = this._httpService.submitEdit(this.restaurant_id, this.name, this.cuisine);
      observable.subscribe(data => {
          console.log(data);
            if (data['errors']) {
                console.log(data['errors']);
                this.errors = data['errors'];
            }
            else {
                console.log("Author successfully updated", data)
                this._router.navigate(['/'])
            }
      })
  }


}
