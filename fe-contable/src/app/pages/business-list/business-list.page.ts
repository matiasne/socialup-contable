import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/services/business.service';
import { UserService } from 'src/app/services/user.service';
import {StorageSessionService} from 'src/app/services/storage-session.service'
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.page.html',
  styleUrls: ['./business-list.page.scss'],
  providers:[UserService,BusinessService]
})
export class BusinessListPage implements OnInit {
  public listbusinesses : Business [] = [{
    _id:"string",
    name:"Tommi Canario's",
    image:"https://t2.ea.ltmcdn.com/es/posts/7/9/1/cuidados_del_canario_20197_orig.jpg",
    category: "Venta de medias",
    address: "string",
    email: "tomi@canario.com",
    phone: "25111847987",
    userID: "string"

  },{
    _id:"string",
    name:"David Smoke",
    image:"https://i.pinimg.com/originals/51/7c/ce/517ccee4c47a58b2181677a4d13dc89b.jpg",
    category: "Vende Humo",
    address: "string",
    email: "david@humo.com",
    phone: "514894654",
    userID: "string"
  },{
    _id:"string",
    name:"Nahuel's",
    image:"https://st4.depositphotos.com/1063437/21040/i/1600/depositphotos_210402362-stock-photo-addictive-substances-including-alcohol-cigarettes.jpg",
    category: "Mercandiguana",
    address: "string",
    email: "nahuel@thc.com",
    phone: "1654984654",
    userID: "string"
  },{
    _id:"string",
    name:"Diego's",
    image:"https://www.abc.es/xlsemanal/wp-content/uploads/sites/5/2021/07/jeff-bezos-el-amo-del-mundo.jpg",
    category: "BackEnd",
    address: "string",
    email: "diego@nilovi.com",
    phone: "3248+465",
    userID: "string"
  },{
    _id:"string",
    name:"Mati's",
    image:"https://cdn-3.expansion.mx/dims4/default/43a461e/2147483647/strip/true/crop/1200x800+0+0/resize/1200x800!/format/webp/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Ff6%2F9a%2Fe368c9804d66b8bdb34072641fe9%2Fperfil-elon.jpg",
    category: "Jefe",
    address: "string",
    email: "diego@nilovi.com",
    phone: "3248+465",
    userID: "string"
  }];
  constructor(
    
  ) { 
    
    
  }

  ngOnInit() {
    console.log('Business Lis, ')

    //conseguir el listado de artistas
  }

}
