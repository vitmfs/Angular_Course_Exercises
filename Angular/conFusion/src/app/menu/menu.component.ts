import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
//
import { DishdetailComponent} from '../dishdetail/dishdetail.component'
//
import { DISHES } from '../shared/dishes'
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';

import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes:       Dish[]  = DISHES;
  selectedDish: Dish    = DISHES[0];

  baseURLOfImages = baseURL;

  errMess: string = "";

  constructor(private dishService: DishService/*,
    @Inject('baseURL') private baseURLP*/) { 

    }

  ngOnInit(): void {
    //this.dishes = this.dishService.getDishes();
    // this.dishService.getDishes()
    //   .then(dishes => this.dishes = dishes);
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
