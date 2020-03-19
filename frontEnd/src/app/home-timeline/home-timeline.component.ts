import { Component, OnInit, Input } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { User } from '../_models/user';
import { TimelineTweet } from '../_models';

@Component({
  selector: 'timeline',
  templateUrl: './home-timeline.component.html',
  styleUrls: ['./home-timeline.component.css']
})
export class HomeTimelineComponent implements OnInit {
  @Input() item;

  constructor() { 
    
  }

  ngOnInit(): void {
    // console.dir(this.item.username);
  }



}
