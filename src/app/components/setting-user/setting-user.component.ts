import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { NormalUserService } from '../../services/normal-user.service';
import { UploadImageService } from '../../services/upload-image.service';
import { ServerPath } from '../../constants/app-const';
import { NormalUser } from '../../model/normal-user';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-setting-user',
  templateUrl: './setting-user.component.html',
  styleUrls: ['./setting-user.component.css']
})
export class SettingUserComponent  implements  AfterViewInit ,OnInit {

  imageLink=ServerPath+"/api/normal-users/image/";

  private currentUser:NormalUser =new NormalUser();

  constructor(private normalUserService:NormalUserService,private uploadImageService:UploadImageService,
              private loginService:LoginService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.normalUserService.getCurrentUserInfo().subscribe(
      res=>{
        this.currentUser=res;
        let token=this.loginService.getUserFromStorage();
        this.imageLink=ServerPath+"/api/normal-users/image/"+this.currentUser.id+"?access_token="+token.access_token;
      }
    );
  }

  changePhoto(){
    this.uploadImageService.upload(ServerPath+"/api/normal-users/add/image?id=",this.currentUser.id);
      this.snackBar.openFromComponent(PizzaParty2Component, {
        duration: 1000,
      });
  }

  updateInfo(){
    let user={
      "id":this.currentUser.id,
      "username":this.currentUser.username,
      "email":this.currentUser.email,
      "fullName":this.currentUser.fullName,
      "ssn":this.currentUser.ssn
    };
    this.normalUserService.updateUser(user).subscribe(
      res=>{
        this.snackBar.openFromComponent(PizzaParty2Component, {
          duration: 1000,
        });     
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
  hide = true;


}


@Component({
  selector: 'snack-bar-Saved',
  templateUrl: 'snack-bar-Saved.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `]
})
export class PizzaParty2Component {}