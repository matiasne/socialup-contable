import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.page.html',
  styleUrls: ['./list-client.page.scss'],
  providers:[]
})



export class ListClientPage implements OnInit {
  constructor(
   
    public router:Router,

  ) { 
    
  }

  ngOnInit() {
      
  }
    
  handleClickClient(client){
    this.router.navigate(['/edit-client',{client:JSON.stringify(client)}])
  }
      
                          
}
