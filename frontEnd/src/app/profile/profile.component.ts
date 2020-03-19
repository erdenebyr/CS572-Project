import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService, UserService } from '../_services';
import { User, TimelineTweet } from '../_models';
import { HomeComponent} from '../home/home.component'
import { TweetService } from '../_services/tweet.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public username:string; 
  public email: string;
  public followers: number;
  public following: number;
  tweetList: Array<TimelineTweet>;

  constructor(private userService: UserService, private home: HomeComponent, private tweetService : TweetService, private snackBar: MatSnackBar,) { }

  async ngOnInit() {
    
    this.userService.getPersonalInfo(this.home.currentUser["_username"]).subscribe(res => {
      this.username = res["data"]["username"];
      this.email = res["data"]["email"];
      this.followers = res["data"]["followers"].length;
      this.following = res["data"]["following"].length;
    }, err =>{
      console.log(err);
    });
    
    this.renderMyTweets(this.home.currentUser["_username"]);
  }

  renderMyTweets(username: String){
    this.tweetService.getMyTweets(username).subscribe(res => {
      console.dir(res);
      var list = [];
      var data = res["data"];
      data.tweets.forEach(tweet => {
        var tweetObj = tweet;
        tweetObj.username = data.username;
        list.push(tweetObj);
      });
      this.tweetList = list;
      console.log(this.tweetList);
    }, error => this.snackBar.open(error.status, "", {duration: 2000}));
  }

}
