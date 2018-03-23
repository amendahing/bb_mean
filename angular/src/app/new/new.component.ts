import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
    newRestaurant: any;
    cuisine: any;
    errors: any;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

  ngOnInit() {

  }

  addRestaurant() {
    console.log(this.newRestaurant, this.cuisine)
    let observable = this._httpService.addRestaurant(this.newRestaurant, this.cuisine)
    observable.subscribe(data => {
        console.log(data);
        if (data['message']) {
            console.log("hit an error")
            console.log(data['message'])
            this.errors = data['message']
        }
        else {
            console.log("Success!")
            this._router.navigate(['/']);
        }
    })
  }

}
