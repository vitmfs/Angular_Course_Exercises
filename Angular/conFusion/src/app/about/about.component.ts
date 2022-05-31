import { Component, OnInit } from '@angular/core';

import { Leader } from '../shared/leader';
//import { LEADERS } from '../shared/leaders'
import { LeaderService } from '../services/leader.service';

import { flyInOut, expand } from '../animations/app.animation';

import { baseURL } from '../shared/baseurl';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];

  baseURLOfImages = baseURL;

  constructor(private leaderService: LeaderService) { 
    this.leaders = [];
  }

  ngOnInit(): void {
    /*this.leaders = */ //this.leaderService.getLeaders().then( leaders => this.leaders = leaders);
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);
  }

}
