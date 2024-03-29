import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/features/business/models/business';
import { ToastType } from 'src/app/models/toast.enum';
import { User } from 'src/app/models/user';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ToastService } from 'src/app/services/toast.service';
import { SessionService } from 'src/app/auth/services/session.service';

@Component({
  selector: 'socialup-form-business',
  templateUrl: './form-business.component.html',
  styleUrls: ['./form-business.component.scss'],
})
export class FormBusinessComponent implements OnInit {
  @Input() businessId: string;
  private business: Business;
  @Input() user: User;
  @Output() handleSubmit = new EventEmitter<any>();

  public formBusiness: FormGroup;
  public isSubmitted = false;
  public isEditing: boolean = false;
  public buttonLabel = 'Crear Empresa';
  public FormGroup: FormControl;

  constructor(
    public sessionService: SessionService,
    public businessService: BusinessService,
    public toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.business = new Business('', '', '', '', '', '', '', '');

    this.formBusiness = new FormGroup({
      name: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      address: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      category: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/
          ),
        ])
      ),
      phone: new FormControl('', Validators.compose([Validators.required])),
      image: new FormControl(''),
    });
  }

  ngOnInit() {
    console.log(this.businessId);
    if (this.businessId) {
      this.buttonLabel = 'Editar Empresa';
      this.isEditing = true;
      this.businessService.get(this.businessId).subscribe({
        next: (business) => {
          this.business = business;

          this.formBusiness.setValue({
            name: this.business.name,
            address: this.business.address,
            category: this.business.category,
            email: this.business.email,
            phone: this.business.phone,
            image: this.business.image ? this.business.image : '',
          });
        },
      });
    } else {
      this.isEditing = false;
    }
  }
  updateProfileBusinesses() {
    this.businessService.update(this.business).subscribe({
      next: (data) => {
        this.business = data;
        this.toastService.show(
          ToastType.success,
          'Se ha actualizaddo el prodcuto correctamente'
        );
        this.handleSubmit.emit(data);
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.formBusiness.valid) {
      this.business.name = this.formBusiness.controls.name.value;
      this.business.image = this.formBusiness.controls.image.value;
      this.business.category = this.formBusiness.controls.category.value;
      this.business.address = this.formBusiness.controls.address.value;
      this.business.email = this.formBusiness.controls.email.value;
      this.business.phone = this.formBusiness.controls.phone.value;
      this.save();
      this.formBusiness.reset();
    } else {
      this.toastService.show(
        ToastType.error,
        'Por Favor complete todo los campos'
      );
    }
  }

  createBusiness() {
    if (this.formBusiness.valid) {
      let idUser = this.sessionService.getUserData()._id;
      let business = new Business(
        '',
        this.formBusiness.controls['name'].value,
        this.formBusiness.controls['image'].value,
        this.formBusiness.controls['category'].value,
        this.formBusiness.controls['address'].value,
        this.formBusiness.controls['email'].value,
        this.formBusiness.controls['phone'].value,
        idUser
      );
      this.businessService.register(business).subscribe({
        next: (data) => {
          this.toastService.show(
            ToastType.success,
            'Se ha creado el negocio correctamente'
          );
          this.handleSubmit.emit(data);
        },
      });
    }
  }
  save() {
    if (this.isEditing) {
      this.updateProfileBusinesses();
    } else {
      this.createBusiness();
    }
  }
  changeImage(event: any) {
    this.formBusiness.patchValue({
      image: event,
    });
  }
}
