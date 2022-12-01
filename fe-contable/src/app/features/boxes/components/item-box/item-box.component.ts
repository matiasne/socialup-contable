import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { Box } from '../../models/box';

@Component({
  selector: 'app-item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.scss'],
})
export class ItemBoxComponent implements OnInit {
  @Input() box: Box;
  @Input() showEditButton = false;
  @Output() eventClickEdit = new EventEmitter<any>();
  @Output() eventClick = new EventEmitter<any>();

  constructor(public router: Router) {}

  ngOnInit() {}

  handleClickEdit() {

    this.eventClickEdit.emit(this.box);
  }

  handleClick() {

    this.eventClick.emit(this.box);
  }
}
