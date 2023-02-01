import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Box, statusTypes } from '../../models/box';
import { BoxService } from '../../service/box.service';

@Component({
  selector: 'app-modal-form-discharge',
  templateUrl: './modal-form-discharge.component.html',
  styleUrls: ['./modal-form-discharge.component.scss'],
})
export class ModalFormDischargeComponent implements OnInit {
public box:Box
public formDischarge: FormGroup
@Input()selectedBox:Box

  constructor(   public alertService:AlertService,
    public boxService:BoxService,
    public navParams:NavParams) {
      this.box =new Box('','','','',statusTypes.close,0,0,'','')
      this.formDischarge = new FormGroup({
        amountDischarge : new FormControl ('', Validators.compose([Validators.required])),
        detailDischarge : new FormControl ('', Validators.compose([Validators.required])),
      })
    }

  ngOnInit() {

    this.box=this.selectedBox

  }

  openAlert(){
    this.box.amountDischarge = this.formDischarge.controls.amountDischarge.value;
    this.box.detailDischarge = this.formDischarge.controls.detailDischarge.value;
    console.log(this.box);
    this.alertService.presentAlertConfirm(this.box.amountDischarge)
    this.alertService.currentItem.subscribe((item) => {
console.log(item)
this.box= item
      this.boxService.update(item)
    });
  }

}
