import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { Box, IBoxResponseDTO, statusTypes } from '../../models/box';
import { BoxService } from '../../service/box.service';

@Component({
  selector: 'app-item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.scss'],
})
export class ItemBoxComponent implements OnInit {
  public statusBox: boolean = false
  @Input() box: Box;
  @Input() showEditButton = false;
  @Input() boxId: string = '';
  @Output() eventClickEdit = new EventEmitter<any>();
  @Output() eventClickStatus = new EventEmitter<any>();
  @Output() eventClick = new EventEmitter<any>();

  constructor(public router: Router,
    public boxService: BoxService) { }

  ngOnInit() {
    this.boxService.get(this.box._id).subscribe({
      next: (box: Box) => {
        this.box = box;
        if (this.box.status == statusTypes.open) {
          this.statusBox = true
        }
      }
    })
  }

  handleClickEdit() {

    this.eventClickEdit.emit(this.box);
  }
  handleClickStatus(event) {
    if (event.target.checked) {
      this.box.status = statusTypes.open

    } else {
      this.box.status = statusTypes.close

    }
    this.boxService.update(this.box).subscribe({
      next: (data) => {

      }
    })
    this.eventClickStatus.emit(this.box);
  }


  handleClick() {

    this.eventClick.emit(this.box);
  }
}
