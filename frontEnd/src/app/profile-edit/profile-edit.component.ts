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
  
  updateForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private profile: ProfileComponent,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  
    this.updateForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required],
  });
  }

  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.updateForm.invalid) {
            return;
    }

    this.userService.updatePersonalInfo(this.updateForm.value)
            .subscribe(
                data => {
                    this.snackBar.open("Successfully updated.", "", {duration: 2000});
                },
                error => {
                    this.snackBar.open(error["status"] + " : Could not update. Try again later", "", {duration: 2000});
                    this.loading = false;
                });
  }
}
