import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-button-emit-invoice',
  templateUrl: './button-emit-invoice.component.html',
  styleUrls: ['./button-emit-invoice.component.scss'],
})
export class ButtonEmitInvoiceComponent implements OnInit {
  @Input() item: any;
  constructor(public alertService: AlertService) {}

  ngOnInit() {}

  onClick() {
    this.alertService.presentAlertConfirm(this.item);

    this.alertService.getClientes$().subscribe((item) => {
      this.item = item;

    });
  }
}
