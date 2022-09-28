import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user';
import { HelperService } from 'src/app/services/helpers.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [UserService, HelperService],
})
export class RegisterPage implements OnInit {
  public title: 'REGISTRATE';
  public formData: FormGroup;
  public isSubmitted: boolean;
  public showPassword: boolean;
  public passwordToggleIcon = 'eye';
  public user_register: User;

  constructor(private authService: AuthService, private router: Router) {}
  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  ngOnInit() {
    // this.priority = this.route.snapshot.paramMap.get('priority');

    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(
          /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/
        ),
      ]),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      validpassword: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  onDestroy() {
    this.formData.reset();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.formData.valid) {
      let email = this.formData.controls['email'].value;
      let password = this.formData.controls['password'].value;
      let name = this.formData.controls['name'].value;
      let surname = this.formData.controls['surname'].value;
      this.authService.register(name, surname, email, password).subscribe({
        next: (data: any) => {
          let user: User = data.user;
          this.user_register = user;
        },
        error: (err) => {
          console.log(err);
          if (err.status == 400) {
            alert(err.error.message);
          }
        },
        complete: () => {
          this.router.navigate(['/login']);
        },
      });
    } else {
    }
  }
  onResetForm() {
    throw new Error('Method not implemented.');
  }

  isMatching() {
    let password = this.formData.controls.password.value;
    let validpassword = this.formData.controls.validpassword.value;

    if (password != validpassword) {
      return true;
    } else return false;
  }

  userRegister(formRegister: NgForm) {}
  get name() {
    return this.formData.get('name');
  }
  get surname() {
    return this.formData.get('surname');
  }
  get password() {
    return this.formData.get('password');
  }
  get validpassword() {
    return this.formData.get('validpassword');
  }
  get email() {
    return this.formData.get('email');
  }
}
