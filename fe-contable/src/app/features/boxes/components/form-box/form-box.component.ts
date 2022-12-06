import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { Box, statusTypes } from '../../models/box';
import { BoxService } from '../../service/box.service';

@Component({
  selector: 'app-form-box',
  templateUrl: './form-box.component.html',
  styleUrls: ['./form-box.component.scss'],
})
export class FormBoxComponent implements OnInit {
  private box: Box;
  public formBox: FormGroup;
  public openBox='close'
  public statusBox:boolean=false
  @Input() boxId: string = '';
  @Output() handleSubmit = new EventEmitter<any>();

  constructor(
    public boxService: BoxService,
    public businessService: BusinessService
  ) {
    this.box = new Box('', '', '', '', statusTypes.close, 0, 0);
    this.formBox = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      image: new FormControl(''),
      actualAmount: new FormControl('',Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    if (this.boxId != '') {

      this.boxService.get(this.boxId).subscribe({
        next: (box: Box) => {
          console.log(box)
          this.box = box
          if(this.box.status == statusTypes.open){
           this.statusBox = true
          }

          this.formBox.setValue({
            name: this.box.name,
            actualAmount: this.box.actualAmount,
            image: this.box.image ? this.box.image : '',

          });
        },
      });
    }
  }



  changeImage(event: any) {
    this.formBox.patchValue({
      image: event,
    });
  }


  createBox() {
    this.box.name = this.formBox.controls.name.value;
    this.box.idBusiness = this.businessService.getBusinessId();
    this.box.actualAmount = this.formBox.controls.actualAmount.value
    this.box.status =statusTypes.close
    this.boxService.add(this.box).subscribe({
      next: (data) => {
        this.handleSubmit.emit(data);
      },
    });
  }

  openCloseBox(event){
if(event.target.checked ){
  this.box.status=statusTypes.open
    }else{
      this.box.status=statusTypes.close
      }
      this.boxService.update(this.box).subscribe({
        next:(data)=>{

        }
      })
  }
}
