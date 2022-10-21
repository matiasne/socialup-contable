import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Console } from 'console';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-button-alert-delete',
  templateUrl: './button-alert-delete.component.html',
  styleUrls: ['./button-alert-delete.component.scss'],
})
export class ButtonAlertDeleteComponent implements OnInit {
  @Input() buttonLabel: string;
  @Input() item: any;
  @Output() dataId = new EventEmitter<any>();

  constructor(public alertService: AlertService) {}

  ngOnInit() {}

  clickToService() {
    console.log();
    this.alertService.presentAlertConfirm(this.item);
  }
  clickDelete() {
    this.alertService.currentItem.subscribe((item) => {
      this.item = item;
    // });
    console.log(this.item);
    this.dataId.emit(this.item);
  }
}
