import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { AllComponent } from './all/all.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { NewReviewComponent } from './new-review/new-review.component';


const routes: Routes = [
    { path: '',component: AllComponent },
    { path: 'add_restaurant',component: NewComponent },
    { path: 'edit_restaurant/:id',component: EditComponent },
    { path: 'restaurant_review/:id',component: ReviewsComponent },
    { path: 'restaurant_review/new/:id',component: NewReviewComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
