import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService, UserService } from '../_services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'home-tweet',
  templateUrl: './home-tweet.component.html',
  styleUrls: ['./home-tweet.component.css']
})
export class HomeTweetComponent implements OnInit {
  @Input() currentUser;
  
  postForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private snackBar: MatSnackBar,
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      action: ['tweet'],
      tweet: ['']
    })
  }

  onPostTweet(tweet) {
    this.submitted = true;
    // this.alertService.clear();

    if (tweet.value.length <= 0) {
        this.snackBar.open("Wrte something to tweet!", "", {duration: 2000})
        return;
    }

    this.loading = true;
    this.postForm.value["tweet"] = tweet.value;
    this.userService.postTweet(this.postForm.value)
        .subscribe((res) => {
          this.snackBar.open(res["message"], "", {duration: 2000})
          tweet.value="";
        }, err => {
          // console.log(err);
          this.snackBar.open("Could not tweet. Try again later.", "", {duration: 2000})
        });
  }

}
