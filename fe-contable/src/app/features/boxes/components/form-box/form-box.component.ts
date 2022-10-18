import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-box',
  templateUrl: './form-box.component.html',
  styleUrls: ['./form-box.component.scss'],
})
export class FormBoxComponent implements OnInit {
  public formBox: FormGroup;
  constructor() {
    this.formBox = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      image: new FormControl(''),
    });
  }

  ngOnInit() {}

  changeImage(event: any) {
    this.formBox.patchValue({
      image: event,
    });
  }
}
