import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../_services';
import { User, Tweet, TimelineTweet } from '../_models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { error } from 'protractor';
import { TweetService } from '../_services/tweet.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  postForm: FormGroup;
  loading = false;
  submitted = false;

  tweetList: Array<TimelineTweet>;
 
  isOn = true;

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService, 
    private snackBar: MatSnackBar,
    private userService: UserService,
    private tweetService: TweetService,
    private formBuilder: FormBuilder,) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // console.log("HOME : " + this.currentUser);
  
    // this.snackBar.open("Welcome " + this.currentUser["_username"], "", {duration: 3000});
  }

  ngOnInit(): void {
    this.renderTimeline();
  }

  renderTimeline(){
    this.tweetService.getTimeline().subscribe(res => {
      console.dir(res);
      var list = [];
      res["data"].forEach(user => {
        user.tweets.forEach(tweet => {
          var tweetObj = tweet;
          tweetObj.username = user.username;
          list.push(tweetObj);
        });
      });
      this.tweetList = list;
      console.log(this.tweetList);
    }, error => this.snackBar.open(error.status, "", {duration: 2000}));
  }

  

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  goToProfile(){
    this.isOn = false;
  }
}
