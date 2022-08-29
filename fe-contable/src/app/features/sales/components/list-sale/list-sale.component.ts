import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ToastType } from 'src/app/models/toast.enum';
import { SelectedService } from 'src/app/services/global/selected.service';
import { ToastService } from 'src/app/services/toast.service';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
import { Sale } from '../../models/sale';


@Component({
  selector: 'socialup-list-sale-component',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.scss'],
})
export class ListSaleComponent implements OnInit {
  @Input() items = []
  @ViewChild('listItem') listItems: ListItemsComponent;
  @Output() clickSales = new EventEmitter<Sale>()
  
  public sales : Array<Sale> =[] 
  public totalPages:number;
  private business:Business;
  public id:any; 
  public obsBusiness:any;

  constructor(
    public selectedService:SelectedService, 
    public businessService:BusinessService,
    public router:Router,
    public toastService: ToastService
  ) { }

  ngOnInit() { 
    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
    next:(data:any)=>{
      this.business = data
      this.refreshSales({perPage:10,pageCount:1,searchWord:""})
    }
  })

  }
  
  refreshSales(data:any){

    
    if(this.business._id){
console.log(this.business._id)
      this.businessService.getBusinessSales(this.business._id,data.pageCount,data.perPage,data.searchWord).subscribe({
        next:(response)=>{
        console.log(response.data)
        this.sales = response.data
        this.listItems.totalPages = response.paging.totalPages
        this.listItems.buttonController()
        }
        })      

      }
     
    }

  click(data){
    this.clickSales.emit(data)
  }

}
