import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {

  @Input() items:Array<any> = [];
  @Input() totalPages:number;
  @Input("itemTemplate") itemTemplate?: TemplateRef<any>;

  @Output() handleClickItem = new EventEmitter<any>();
  @Output() handleSearch = new EventEmitter<any>();
  
  public perPage:number=10;
  public searchWord:string;
  public pageCount:number;
  public isLoading :boolean=false;
  public isDisabledNext:boolean=true;
  public isDisabledBack:boolean=true;

  constructor() { }

  ngOnInit() {
    this.pageCount=1;
    this.searchWord="";
    this.buttonController()
  }

  ionViewDidEnter(){
    this.pageCount=1;
    this.searchWord="";
    this.buttonController()
  }

  handleClick(item){
    this.handleClickItem.emit(item)
  }

  searchEventFired(){
    this.pageCount=1 
    this.search()
  //  this.buttonController()
  }

  public search(){
    this.handleSearch.emit({
      perPage:this.perPage,
      pageCount:this.pageCount,
      searchWord:this.searchWord
    })
  }

  nextPagination(){
   
    if(this.pageCount <this.totalPages){
      this.pageCount ++;
      this.search()
      this.buttonController()
    }
    
  }

  backPagination(){
    if(this.pageCount != 1){
      this.pageCount --;
      this.search()
      this.buttonController()      
    }   
  }

  buttonController(){
    console.log(this.pageCount)
    console.log(this.totalPages)
    if(this.pageCount>=2){
      this.isDisabledBack=false
    }else{
      this.isDisabledBack=true
    }
    if(this.pageCount !=this.totalPages){
      this.isDisabledNext=false
    }else{
      this.isDisabledNext=true
      
    }
    if(this.totalPages<=1){      
      this.isDisabledNext=true
    }
   
  }

}
