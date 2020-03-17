import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { User } from '../_models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService, 
    private snackBar: MatSnackBar) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser);
  
    // this.snackBar.open("Welcome " + this.currentUser["_username"], "", {duration: 3000});
  }

  ngOnInit(): void {
    
    // this.currentUser["_username"]
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  goToProfile(){
    this.router.navigate(['/profile']);
  }
}
