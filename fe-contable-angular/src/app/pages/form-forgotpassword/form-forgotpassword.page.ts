import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Session } from 'protractor';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user';
import { HelperService } from 'src/app/shared/services/helpers.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-form-forgotpassword',
  templateUrl: './form-forgotpassword.page.html',
  styleUrls: ['./form-forgotpassword.page.scss'],
  providers: [UserService, HelperService],
})
export class FormForgotpasswordPage implements OnInit {
  public formForgotPassword: FormGroup;
  isSubmited: boolean;
  show: boolean = false;
  time;
  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.formForgotPassword = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  onDestroy() {
    this.formForgotPassword.reset();
  }
  onReset() {
    this.isSubmited = true;
    if (this.formForgotPassword.valid) {
      let email = this.formForgotPassword.controls['email'].value;

      this.authService.resetPassword(email).subscribe({
        next: (data: any) => {},
        error: (err) => {
          console.log(err);
          if (err.status == 400) {
            alert(err.error.message);
          }
        },
        complete: () => {},
      });
    } else {
    }
  }
  get email() {
    return this.formForgotPassword.get('email');
  }
}
