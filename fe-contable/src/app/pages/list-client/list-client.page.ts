import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/services/business.service';
import { UserService } from 'src/app/services/user.service';
import {StorageSessionService} from 'src/app/services/storage-session.service'
import { GLOBAL } from 'src/app/services/global';
import { HelperService } from 'src/app/services/helpers.service';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { SelectedService } from 'src/app/services/global/selected.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.page.html',
  styleUrls: ['./list-client.page.scss'],
  providers:[UserService, HelperService,BusinessService, ClientService,SpinnerDialog]
})



export class ListClientPage implements OnInit {
  @ViewChild('listItem') listItems: ListItemsComponent;

  
  public clients : Array<Client> =[] 
  private business:Business;
  private obsBusiness:any;
  public id:any;
  public perPage:number=10;
  public searchWord:string;
  public pageCount:number;
  public totalPages:number=1;
  public isLoading :boolean=false;
  public isDisabledNext:boolean=true;
  public isDisabledBack:boolean=true;
  constructor(
    public activateRoute:ActivatedRoute,
    public storageSessionService:StorageSessionService,
    public helperService: HelperService  ,
    public clientService:ClientService,
    public selectedService:SelectedService, 
    public businessService:BusinessService,
    public router:Router,
    public toastService: ToastService,
    private spinnerDialog: SpinnerDialog
  ) { 
    
  }

  ngOnInit() {
      
  }
  ionViewDidEnter(){

    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next:(data:any)=>{
        this.business = data
        this.refreshClients({perPage:10,pageCount:1,searchWord:""})
      }
    })
  
    if(!this.business){
      this.router.navigate(['/list-business'])
      this.toastService.show(ToastType.warning , "Necesita ingresar con una empresa")
    }
    this.pageCount=1
    this.searchWord=""
  }

    ionViewDidLeave(){
      this.obsBusiness.unsubscribe()
    }

    refreshClients(data:any){
      if(this.business._id){
        this.businessService.getBusinessClient(this.business._id,data.pageCount,data.perPage,data.searchWord).subscribe({
          next:(response)=>{
            
          this.clients = response.data
          this.listItems.totalPages = response.paging.totalPages
          this.listItems.buttonController()
          }
          })      
        }
      }
   click(){
     console.log("click")
    }
      
                          
}
