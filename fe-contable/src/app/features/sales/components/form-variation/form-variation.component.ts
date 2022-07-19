import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Business } from 'src/app/features/business/models/business';
import { Variation, VariationType } from '../../models/variation';
import { Sale } from '../../models/sale';

@Component({
  selector: 'app-form-variation',
  templateUrl: './form-variation.component.html',
  styleUrls: ['./form-variation.component.scss'],
})
export class FormVariationComponent implements OnInit {
  public variationTypes = VariationType;
  public formVariation:FormGroup;
  

  @Output()handleChange=new EventEmitter<any>();

  private obs:any

  constructor(  private modalCtrl:ModalController) { 
    this.formVariation = new FormGroup({
      type: new FormControl(''),
      value: new FormControl(''),
      description: new FormControl('')
    });

    this.obs = this.formVariation.valueChanges.subscribe({
      next: data =>{ 
          this.handleChange.emit(data)
      }
    })
  }

  ngOnInit() {

  }

  ngOnDestroy(){
    this.obs.unsubscribe()
  }
  

}
