// registration.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Number: ['', Validators.required],
      password: ['', Validators.required],
      userRole: ['', Validators.required]
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    console.log(form.value);

    if (this.registrationForm.invalid) {
      return;
    }


    const u: User = {
      UserId: 0,
      Email: form.value.email,
      Password: form.value.password,
      Username: form.value.username,
      MobileNumber: form.value.mobilenumber,
      UserRole: form.value.userrole
    }


    // this.authService.register(this.registrationForm.value).subscribe(

    this.authService.register(u).subscribe(
      data => {
        console.log('Registration successful', data);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration error', error);
      }
    );
  }
}
