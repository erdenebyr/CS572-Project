import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})



export class EditProfileComponent implements OnInit {
  editForm: FormGroup; 
  isSubmitted  =  false; 
  constructor(private formBuilder: FormBuilder) { }
ngOnInit(){
  this.editForm = this.formBuilder.group({
    FirstName: [''],
    LastName: [''],
    Phone: [''],
    Email: ['', [Validators.required, Validators.email]],
  });
}
get formControls() { return this.editForm.controls; }

edit(){
  console.log(this.editForm.value);
  this.isSubmitted = true;
  if(this.editForm.invalid){
    return;
  }
}
}
