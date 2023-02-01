import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.page.html',
  styleUrls: ['./edit-box.page.scss'],
})
export class EditBoxPage implements OnInit {
  public boxId: string;
  constructor(
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.boxId) {
      this.boxId = this.activatedRoute.snapshot.params.boxId;
    }
  }
  submit(data) {}
}
