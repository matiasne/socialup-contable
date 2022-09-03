import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ListClientComponent } from 'src/app/features/clients/components/list-client/list-client.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.page.html',
  styleUrls: ['./list-client.page.scss'],
  providers:[]
})



export class ListClientPage implements OnInit {

  @ViewChild('list') listItems: ListClientComponent

  constructor(
   
    public router:Router,

  ) { 
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url = "/products")
          this.listItems.refreshClients()
      }
    });
  }

  ngOnInit() {
      
  }
    
  handleClickClient(client){
    this.router.navigate(['/edit-client',{client:JSON.stringify(client)}])
  }
      
                          
}
