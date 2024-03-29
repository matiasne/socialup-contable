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
import { AlertController, NavParams, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Business } from 'src/app/features/business/models/business';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/services/global';
import { HelperService } from 'src/app/services/helpers.service';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';

@Component({
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss'],
})
export class BusinessPage implements OnInit {
  public title: 'Perfil BUSINESS';
  public businessId: string = '';
  public user: User;
  public priority: string;

  public dbData: any;

  public token: any;
  public imagePreview: any = '';
  public mostrar = false;

  session: Session;

  constructor(
    public toastService: ToastService,
    public businessService: BusinessService,
    public activateRoute: ActivatedRoute,
    public router: Router,
    public alertController: AlertController
  ) {
    if (this.activateRoute.snapshot.params.businessId) {
      this.businessId = this.activateRoute.snapshot.params.businessId;
    }
  }
  ngOnInit() {}

  public filesToUpload: Array<File>;

  submit(data) {
    this.router.navigate(['/select-user-business']);
  }
}
