import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/auth/model/session';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/services/global';
import { HelperService } from 'src/app/services/helpers.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';
import { SessionService } from 'src/app/auth/services/session.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.page.html',
  styleUrls: ['./form-profile.page.scss'],
})
export class FormProfilePage implements OnInit {
  public formProfile: FormGroup;
  isSubmitted = false;
  showPassword = false;
  passwordToggleIcon = 'eye';
  mostrar = false;
  imagePreview: any = '';
  public session: Session;
  selectedFile: File = null;
  public url: string;

  constructor(
    private userService: UserService,
    public route: ActivatedRoute,
    private sessionService: SessionService,
    private authService: AuthService,
    public alertController: AlertController,
    public toastService: ToastService,
    public router: Router
  ) {
    this.session = this.sessionService.getSession();
    this.url = GLOBAL.url;
  }

  async doAlert() {
    const alert = await this.alertController.create({
      header: 'ELIMINAR CUENTA',
      message:
        'Desea eliminar su cuenta permanentemente.No podra volvr a recuperarla.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            this.userService._delete(this.session.user._id).subscribe({
              next: (data) => {
                this.authService.logout();
                console.log('Confirm Okay');
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
        },
      ],
    });
    (await alert).present();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  ngOnInit() {
    this.formProfile = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      gender: new FormControl('', []),
      address: new FormControl('', []),
      phone: new FormControl('', []),
      image: new FormControl('', []),
    });

    this.userService.get(this.session.user._id).subscribe({
      next: (data) => {
        this.formProfile.setValue({
          name: data.user.name,
          surname: data.user.surname,
          gender: data.user.gender ? data.user.gender : '',
          address: data.user.address ? data.user.address : '',
          phone: data.user.phone ? data.user.phone : '',
          image: data.user.image ? data.user.image : '',
        });

        let user = User.adapt(this.session.user);
        //this.sessionService.updateUser(user)
      },
    });
  }

  onDestroy() {
    this.formProfile.reset();
  }

  updateProfile() {
    let user = new User(
      this.session.user._id,
      this.formProfile.controls['name'].value,
      this.formProfile.controls['surname'].value,
      this.session.user.email,
      this.session.user.role,
      this.formProfile.controls['image'].value,
      this.formProfile.controls['gender'].value,
      this.formProfile.controls['address'].value,
      this.formProfile.controls['phone'].value
    );

    this.userService.update(user).subscribe({
      next: (data) => {
        this.sessionService.updateUser(data.user);
        this.toastService.show(
          ToastType.success,
          'Perfil actualizado correctamente'
        );
        this.router.navigate(['/dashboard-business']);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  get name() {
    return this.formProfile.get('name');
  }
  get surname() {
    return this.formProfile.get('surname');
  }
  get password() {
    return this.formProfile.get('password');
  }
  get gender() {
    return this.formProfile.get('gender');
  }
  get address() {
    return this.formProfile.get('address');
  }
  get phone() {
    return this.formProfile.get('phone');
  }

  changeImage(event: any) {
    this.formProfile.patchValue({
      image: event,
    });
  }
}
