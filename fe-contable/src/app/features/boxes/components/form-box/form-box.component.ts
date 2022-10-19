import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { Box, stateTypes } from '../../models/box';
import { BoxService } from '../../service/box.service';

@Component({
  selector: 'app-form-box',
  templateUrl: './form-box.component.html',
  styleUrls: ['./form-box.component.scss'],
})
export class FormBoxComponent implements OnInit {
  private box: Box;
  public formBox: FormGroup;

  @Output() handleSubmit = new EventEmitter<any>();

  constructor(
    public boxService: BoxService,
    public businessService: BusinessService
  ) {
    this.box = new Box('', '', '', '', stateTypes.close, 0, 0);
    this.formBox = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      image: new FormControl(''),
    });
  }

  ngOnInit() {}

  ngAfterContentInit() {
    this.formBox.setValue({
      name: this.box.name,
      image: this.box.image ? this.box.image : '',
    });
  }

  changeImage(event: any) {
    this.formBox.patchValue({
      image: event,
    });
  }

  createProduct() {
    this.box.name = this.formBox.controls.name.value;
    this.box.idBusiness = this.businessService.getBusinessId();
    this.boxService.add(this.box).subscribe({
      next: (data) => {
        this.handleSubmit.emit(data);
      },
    });
  }
}
