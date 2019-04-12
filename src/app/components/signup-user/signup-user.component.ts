import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { NormalUser } from '../../model/normal-user';
import { NormalUserService } from '../../services/normal-user.service';

import * as $ from 'jquery';
import { UploadImageService } from '../../services/upload-image.service';
import { ServerPath } from '../../constants/app-const';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements  AfterViewInit ,OnInit {

  normalUser:NormalUser=new NormalUser();
  private isSignedUp=false;

  private signUpResponse:number;

  constructor(private normalUserService:NormalUserService,
              private uploadImageService:UploadImageService) { }
  
  ngOnInit() {
    this.isSignedUp=false;
  }

  registerNormalUser(){
    
    this.normalUserService.registerUser(this.normalUser).subscribe(
      res=>{
        this.signUpResponse= res['response'];
        if(this.signUpResponse>0){
          this.uploadImageService.upload(ServerPath+"/api/normal-users/add/image?id=",this.signUpResponse);
          this.isSignedUp=true;
          this.normalUser=new NormalUser();
          console.log(res);
        }
       
      },
      error=>{
        console.log(error);
      }
    );
  }



  
  


  async ngAfterViewInit() {
  await this.loadScript('./assets/vendor/jquery/jquery.js');
  await this.loadScript('./assets/vendor/bootstrap/js/bootstrap.js');
  await this.loadScript('./assets/vendor/font-awesome/fontawesome-all.min.js');
  await this.loadScript('./assets/vendor/nicescroll/jquery.nicescroll.min.js');
  await this.loadScript('./assets/vendor/slick/slick.min.js');
  await this.loadScript('./assets/js/app.js');

  }
  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script')
        scriptElement.src = scriptUrl
        scriptElement.onload = resolve
        document.body.appendChild(scriptElement)
    })
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
 
 

}
