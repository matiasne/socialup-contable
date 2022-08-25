import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonRefresher, ModalController } from '@ionic/angular';
import { Product } from 'src/app/features/products/models/product';
import { ToastType } from 'src/app/models/toast.enum';
import { ToastService } from 'src/app/services/toast.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.scss'],
})
export class ItemProductComponent implements OnInit {
  @Input() product: Product;
  @Output() clickProduct = new EventEmitter<Product>(); 
  constructor(
    public alertController: AlertController,
    public productService: ProductService,
    public modalCtrl: ModalController,
    public toastService: ToastService,
    public activateRoute: ActivatedRoute,
    public router: Router,
  
  ) {}

  ngOnInit() {}

  // async doAlert(){
  //   const alert = await this.alertController.create({
  //     header:'ELIMINAR PRODUCTO ',
  //     message:'Desea quitar el producto de la lista.',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         id: 'cancel-button',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah',);
  //         }
  //       }, {
  //         text: 'Ok',
  //         id: 'confirm-button',
  //         handler: () => {
  //           this.productService._delete(this.product._id)
  //         }
  //       }
  //     ],
  //   });
  //   (await alert).present()

  // }
  ionViewWillEnter() {}
  async doAlert() {
    const alert = await this.alertController.create({
      header: 'ELIMINAR PRODUCTO',
      message:
        'Desea eliminar el Producto permanentemente.No podra volver a recuperarlo.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {},
        },
        {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            this.productService._delete(this.product._id).subscribe({
              next: (data) => {
                this.toastService.show(ToastType.warning,'Se ha eliminado el producto correctamente');
                
                // this.router.navigate(['/products'])
                
                // 
                
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
        },
      ],
    });
    (await alert).present();
  }
  

  handleClickDelete() {
    this.doAlert();

    
    
  }
  async handleClickEdit() {
    const modal2: HTMLIonModalElement = await this.modalCtrl.create({
      component: ItemProductComponent,
      componentProps: {
        selectSaleProduct: this.product,
        other: { couldAlsoBeAnObject: true },
      },
    });
    modal2.present();

    let { data, role } = await modal2.onWillDismiss();

    this.productService.update(data);
  }
}
