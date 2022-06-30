import { Product } from 'src/app/features/products/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/features/products/services/product.service';
import { HelperService } from 'src/app/services/helpers.service';
import { Business } from 'src/app/features/business/models/business';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { SelectedService } from 'src/app/services/global/selected.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.page.html',
  styleUrls: ['./form-product.page.scss'],
  providers: [ProductService, HelperService, BusinessService,]
})

/*Responsabilidad:
leer la ruta
manejar servicios
manejar link hacia otras paginas....*/

export class FormProductPage implements OnInit {
  
  public product:Product;
  public business: Business;  
  public obsBusiness: any;
  
  constructor(
    public productService: ProductService,
    public toastService: ToastService,
    public businessService: BusinessService,
    public activateRoute: ActivatedRoute,
    public selectedService: SelectedService,
    public router: Router,
    public alertController: AlertController
  ) {
    this.product  =  new Product('','','','','','','','');
  }

  ngOnInit() {  
    
    
  
  }

  ionViewDidEnter(){

    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next: (data: any) => {
        this.business = data
        this.product.idBusiness = this.business._id;
      }
    })    

    if (this.activateRoute.snapshot.params.id) { 
      this.product._id = this.activateRoute.snapshot.params.id; 
      
     
    } 

    if(!this.business){
      this.router.navigate(['/list-business'])      
    }
  }

  submit(data){
    console.log(data)
  }
 

  
  async doAlert(){
    const alert = await this.alertController.create({
      header:'ELIMINAR CUENTA',
      message:'Desea eliminar su cuenta permanentemente.No podra volvr a recuperarla.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            this.productService._delete(this.activateRoute.snapshot.params.id).subscribe({
              next:(data)=>{
                this.toastService.show(ToastType.warning, "Se ha eliminado el producto correctamente")
                this.router.navigate(['/products'])
              },
                error:(err)=>{
                  console.log(err);

                }
            })
            
          }
        }
      ],
    });
    (await alert).present()

  }

}
