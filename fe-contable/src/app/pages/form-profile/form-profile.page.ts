import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm,Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/models/session';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.page.html',
  styleUrls: ['./form-profile.page.scss'],
  providers:[UserService]
})
export class FormProfilePage implements OnInit {
  public formProfile: FormGroup;
  isSubmitted =false;
  showPassword= false;
  passwordToggleIcon='eye';
  mostrar= false;
  imagePreview: any="";
  public session:Session;
  selectedFile: File = null;
  public url: string;
    

  constructor(
    private router:Router,
    private userService: UserService,
    public route: ActivatedRoute, 
    private storageSessionService:StorageSessionService,
    public alertController: AlertController,
    private http:HttpClient) { 
       this.session= this.storageSessionService.getSession(),
       this.url = GLOBAL.url;

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
            text: 'Okay',
            id: 'confirm-button',
            handler: () => {
              this.userService._delete(this.session.user._id).subscribe({
                next:(data)=>{
                 this.storageSessionService.logoutSession();
                  console.log('Confirm Okay');
                  console.log(data);
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


  togglePassword():void{
    this.showPassword=!this.showPassword
    if(this.passwordToggleIcon =='eye'){
      this.passwordToggleIcon='eye-off';
    }else{
      this.passwordToggleIcon ='eye';
    }
  }

  ngOnInit() {
    this.formProfile = new FormGroup({
      name: new FormControl(this.session.user.name,[Validators.required, Validators.minLength(3)]),
      surname: new FormControl(this.session.user.surname,[Validators.required,Validators.minLength(3)]),
      gender: new FormControl(this.session.user.gender,[]),
      address: new FormControl(this.session.user.address,[Validators.required]),
      phone:new FormControl (this.session.user.phone,[Validators.required])
      
    })
  }
  updateProfile(){

    let imageURl = this.submitImage()

    
    let user= new User(
      this.session.user._id, 
      this.formProfile.controls['name'].value,
      this.formProfile.controls['surname'].value,
      this.session.user.email,
      this.session.user.role,
      imageURl,
      this.formProfile.controls['gender'].value,
      this.formProfile.controls['address'].value,
      this.formProfile.controls['phone'].value)

      this.userService.update(user)
    
    
      
  }
  
  get name (){return this.formProfile.get('name');}
  get surname(){return this.formProfile.get('surname');}
  get password(){return this.formProfile.get('password');}
  get gender(){return this.formProfile.get('gender');}
  get address (){return this.formProfile.get('address');}
  get phone(){return this.formProfile.get('phone');}
  
  imageClick(){
    let content = document.getElementById('selectedFile');
    content.click();
  }


  submitImage():string{
       
     
       const formData = new FormData()
       //.append('type', 'file');
       .append('image', this.selectedFile, this.selectedFile.name);
       
       
       this.http.post(this.url+'upload-image-user/' + this.session.user._id,formData).subscribe({
         next:(data)=>{
           console.log("data")
           return "url"
         },
         error:()=>{
          console.log("error")
            return ""
         }
        })
        return "";
        
    }


  handleImageChange(event:any):void{
    this.mostrar=!this.mostrar;
    if (event.target.files && event.target.files[0]) {
      
      const file = event.target.files[0];
      this.selectedFile = file

      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(file);


    }
  }

}
