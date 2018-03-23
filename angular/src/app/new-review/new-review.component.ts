import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit {
    restaurant_id: any;
    customer: any;
    star: any;
    cont: any;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this._route.params.subscribe( params => {
            this.restaurant_id = params['id'];
        });
    }

    addReview() {
        console.log("Review will be submitted...")
        let observable = this._httpService.addReview(this.restaurant_id, this.customer, this.star, this.cont);
        observable.subscribe(data => {
            console.log("got data back from post, addReview", data)
        })
        this._router.navigate(['/restaurant_review/' + this.restaurant_id])
    }

    cancel() {
        this._router.navigate(['/restaurant_review/' + this.restaurant_id])
    }


}
