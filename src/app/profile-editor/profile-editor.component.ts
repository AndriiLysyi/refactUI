import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationErrors, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {
  profileEditorForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getById(this.userService.getCurrentUserId())
      .pipe(first())
      .subscribe(
        data => {
          this.profileEditorForm.patchValue(data[0]);
          this.loading = false;
          console.log(data);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

    this.profileEditorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });


  }

  // convenience getter for easy access to form fields
  get f() { return this.profileEditorForm.controls; }


  passwordMatchValidator(control: FormGroup): ValidationErrors | null {
    console.log('comp  ' + control.get('password').value + '___' + '' + control.get('confirmpassword').value);
    return control.get('password').value === control.get('confirmpassword').value
      ? null : { 'mismatch': true };
  }

  matchPassword(): boolean {
    return this.profileEditorForm.getError("mismatch");
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileEditorForm.invalid) {
      console.log('invalid');
      return;
    }
    const tempUser: User = {
      id: this.userService.getCurrentUserId(),
      firstName: this.profileEditorForm.value.firstName,
      lastName: this.profileEditorForm.value.lastName,
      password: this.profileEditorForm.value.password,
      email: this.profileEditorForm.value.email,
      authToken: '',
      role: ''
    };

    console.log(tempUser);
    console.log("OKKKK");
    this.loading = true;
    // this.userService.getById(this.userService.getCurrentUserId())
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.profileEditorForm.patchValue(data);
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     });
  }
}
