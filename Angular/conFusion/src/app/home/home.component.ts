import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseURL } from '../shared/baseurl';

import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  baseURLOfFeaturedDishImage = baseURL;
  baseURLOfFeaturedLeaderImage = baseURL;

  dishErrMess: string = "";

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService) { 

    this.dish = {
      id:         "",
      name:       "",
      image:      "",
      category:   "",
      featured:   false,
      label:      "",
      price:      "",
      description:"",
      comments:   []
    };

    this.promotion = {
      id:         "",
      name:       "",
      image:      "",
      label:      "",
      price:      "",
      featured:   false,
      description:""
    };

    this.leader = {
      id:           "",
      name:         "",
      image:        "",
      designation:  "",
      abbr:         "",
      featured:     false,
      description:  ""
    };

    this.baseURLOfFeaturedDishImage = baseURL;
  }

  ngOnInit() {
    /*this.dish = */ //this.dishservice.getFeaturedDish().then( dish => this.dish = dish);
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
      dishErrMess => this.dishErrMess = <any>dishErrMess);
    /*this.promotion = */ //this.promotionservice.getFeaturedPromotion().then( promotion => this.promotion = promotion);
    this.promotionservice.getFeaturedPromotion().subscribe( promotion => this.promotion = promotion);
    /*this.leader = */ //this.leaderservice.getFeaturedLeader().then( leader => this.leader = leader);
    this.leaderservice.getFeaturedLeader().subscribe( leader => this.leader = leader);
  }

}
