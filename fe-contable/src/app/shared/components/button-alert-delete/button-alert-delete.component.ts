import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-button-alert-delete',
  templateUrl: './button-alert-delete.component.html',
  styleUrls: ['./button-alert-delete.component.scss'],
})
export class ButtonAlertDeleteComponent implements OnInit {
  @Input() buttonLabel: string;
  @Input() item: any;
  @Input() itemId: any;
  @Output() eventClick = new EventEmitter<any>();
  constructor(private alertService: AlertService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {}

  onClick() {
    this.alertService.presentAlertConfirm(this.item);
    this.alertService.currentItem.subscribe((item) => {
      this.item = item;

      this.eventClick.emit(this.item);
    });
  }

  clickDelete() {
    this.alertService.currentItem.subscribe((item) => {
      this.item = item;

      this.eventClick.emit(this.item);
    });
  }
}
