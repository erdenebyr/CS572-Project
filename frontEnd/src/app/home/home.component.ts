import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../_services';
import { User, Tweet } from '../_models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { error } from 'protractor';

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
 
  isOn = true;

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService, 
    private snackBar: MatSnackBar,
    private userService: UserService,
    private formBuilder: FormBuilder,) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // console.log("HOME : " + this.currentUser);
  
    // this.snackBar.open("Welcome " + this.currentUser["_username"], "", {duration: 3000});
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  goToProfile(){
    // this.router.navigate(['/profile']);
    
  }
}
