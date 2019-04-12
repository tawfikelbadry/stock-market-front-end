import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NormalUserService } from '../../../services/normal-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements  AfterViewInit ,OnInit {

  loggedIn:boolean=false;

  private userRole:string;

  private loggedUserImageUrl:String;

  
  constructor(private loginService:LoginService,private userService:UserService,
              private router:Router,private normalUserService:NormalUserService) {

   }

  ngOnInit() {
    this.loggedIn=this.loginService.checkCredential();
    // this.loggedUserImageUrl=this.normalUserService.getCurrentUserPhoto();
  }

  showProfile(){

    this.userService.getCurrentUserRoles().subscribe(
      res=>{
        this.userRole=res[0].authority;
        if(this.userRole=="ROLE_USER"){
          console.log("It's a user");
          this.router.navigate(['/userprofile/my-stocks']);
        }else if(this.userRole=="ROLE_COMPANY"){
          console.log("It's a company");
          this.router.navigate(['/companyprofile']);

        }
        console.log(res[0].authority);
      },error=>{
        console.log(error);
        this.router.navigate(['']);
      }
    );
  }

  showSettingPage(){
    this.userService.getCurrentUserRoles().subscribe(
      res=>{
        this.userRole=res[0].authority;
        if(this.userRole=="ROLE_USER"){
          console.log("It's a user");
          this.router.navigate(['/usersetting']);
        }else if(this.userRole=="ROLE_COMPANY"){
          console.log("It's a company");
          this.router.navigate(['/companysetting']);

        }
       // console.log(res[0].authority);
      },error=>{
        console.log(error);
        this.router.navigate(['']);
      }
    );
  }


  logout(){
    this.loginService.logout().subscribe(
      res=>{
        this.loggedIn=false;
        console.log("logged out");
        localStorage.removeItem(LoginService.STORAGE_TOKEN_KEY);
        this.router.navigate(['']);
        location.reload();
      },
      error=>{
        alert("you dont logged out");
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
}
