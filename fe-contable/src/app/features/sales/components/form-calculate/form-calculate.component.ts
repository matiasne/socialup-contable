import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Business } from 'src/app/features/business/models/business';
import { DiscountType } from '../../models/discount';
import { Sale } from '../../models/sale';

@Component({
  selector: 'app-form-calculate',
  templateUrl: './form-calculate.component.html',
  styleUrls: ['./form-calculate.component.scss'],
})
export class FormCalculateComponent implements OnInit {
  public discountTypes = DiscountType;
  public formVariation:FormGroup;

  @Output()handleChange=new EventEmitter<any>();

  private obs:any

  constructor() { 
    this.formVariation = new FormGroup({
      discountType: new FormControl(''),
      discountValue: new FormControl(''),
      discountDescription: new FormControl('')
    });

    this.obs = this.formVariation.valueChanges.subscribe({
      next: data =>{ 
        this.handleChange.emit(this.formVariation.value)
      }
    })
  }

  ngOnInit() {}

  ngOnDestroy(){
    this.obs.unsubscribe()
  }


}
