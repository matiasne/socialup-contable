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
  @Output() eventClick = new EventEmitter<any>();
  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.item.subscribe((item) => (this.item = item));
  }

  onClick() {
    this.alertService.presentAlertConfirm(this.item);
  }
}
