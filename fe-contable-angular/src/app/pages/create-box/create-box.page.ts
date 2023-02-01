import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-box',
  templateUrl: './create-box.page.html',
  styleUrls: ['./create-box.page.scss'],
})
export class CreateBoxPage implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}

  submit(data) {
    this.router.navigateByUrl('/list-box');
  }
}
