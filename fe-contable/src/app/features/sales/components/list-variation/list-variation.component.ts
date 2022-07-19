import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import { Variation } from '../../models/variation';

@Component({
  selector: 'app-list-variation',
  templateUrl: './list-variation.component.html',
  styleUrls: ['./list-variation.component.scss'],
})
export class ListVariationComponent implements OnInit {
  @Input() items = []
  @ViewChild('listItem') listItems: ListItemsComponent;
  @Output() clickSaleVariation = new EventEmitter<Variation>()

  constructor() {
    
   }

  ngOnInit() {}

  refreshSaleVariation(data:any){

    console.log('hola');
    // if(this.business._id){
    //   this.businessService.getBusinessProduct(this.business._id,data.pageCount,data.perPage,data.searchWord).subscribe({
    //     next:(response)=>{
          
    //     this.saleProducts = response.data
    //     this.listItems.totalPages = response.paging.totalPages
    //     this.listItems.buttonController()
    //     }
    //     })      

    //   }
     
    }

}
