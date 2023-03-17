import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-list-box',
  templateUrl: './list-box.page.html',
  styleUrls: ['./list-box.page.scss'],
})
export class ListBoxPage implements OnInit {

  constructor(
    public router:Router
  ) { }

  ngOnInit() {
  }
  handleClickBox(box) {

  }

  handleClickEditBox(box) {
    console.log(box._id)
    this.router.navigate(['/edit-box', { boxId: box._id }]);
  }
}
