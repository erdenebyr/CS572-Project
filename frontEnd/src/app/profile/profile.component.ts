import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService, UserService } from '../_services';
import { User } from '../_models';
import { HomeComponent} from '../home/home.component'

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

  constructor(private userService: UserService, private home: HomeComponent) { }

  async ngOnInit() {
    await this.userService.getPersonalInfo(this.home.currentUser["_username"]).subscribe(res => {
      this.username = res["data"]["username"];
      this.email = res["data"]["email"];
      this.followers = res["data"]["followers"].length;
      this.following = res["data"]["following"].length;
    }, err =>{
      console.log(err);
    });
    
  }

}
