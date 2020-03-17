import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../_services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private snackBar: MatSnackBar
    ) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', Validators.required],
            dateofbirth: ['', [Validators.required]]
        });
        console.log(this.registerForm.value);
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        this.alertService.clear();

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    // this.alertService.success('Registration successful', true);
                    this.snackBar.open("Success.", "", {duration: 2000});
                    this.router.navigate(['/login']);
                },
                error => {
                    // this.alertService.error(error);
                    // this.snackBar.open(error["statusText"], "", {duration: 2000});
                    if(error["status"] === "500")
                        this.snackBar.open("Username already exists", "", {duration: 2000});
                    else
                        this.snackBar.open(error["statusText"], "", {duration: 2000});
                    this.loading = false;
                });
    }

    email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'email must xxx@xxx.xxx';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
}
