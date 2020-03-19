import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService, UserService } from '../_services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @Input() username;
  @Input() email;
  @Input() bday;
  
  updateForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private profile: ProfileComponent,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.dir(this.profile.username);
    this.updateForm = this.formBuilder.group({
      username: [this.profile.username, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required],
      dateofbirth: ['', [Validators.required]]
  });

  // console.dir(this.currentUser + ": FROM PROFILE EDIT");
  // console.dir(this.userService.getPersonalInfo(this.currentUser));
  
  }
}
