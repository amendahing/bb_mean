import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  addRestaurant(newRestaurant, cuisine){
      return this._http.post('/restaurants/new', {restaurant: newRestaurant, cuisine})
  }

  getRestaurants(){
      return this._http.get('/restaurants')
  }

  deleteRest(id){
      return this._http.delete('/restaurants/delete/'+id);
  }

  findRestaurant(restaurant_id) {
      return this._http.get('/restaurants/'+restaurant_id)
  }

  addReview(restaurant_id, customer, star, cont){
      console.log("hit the srevice", restaurant_id);
      return this._http.put('/restaurant_review/new/'+restaurant_id, {customer: customer, star, cont})
  }

  submitEdit(id, nameEdit, cuisine) {
       return this._http.put('/restaurants/update/'+id, {name: nameEdit, cuisine})
  }

}
