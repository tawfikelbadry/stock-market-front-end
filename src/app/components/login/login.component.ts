import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserToken } from '../../model/user-token';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  AfterViewInit ,OnInit {
 
  private currentUserToken:UserToken;

  private credentials={"username":"","password":""};
  private loggedIn=false;
 
  constructor(private loginService:LoginService,private router:Router,
              private userService:UserService) { }

  ngOnInit() {
  }

  onSubmit(){

    this.loginService.sendCredentials(this.credentials.username,this.credentials.password).subscribe(
      res=>{

        this.currentUserToken=res;
        console.log("result : "+this.currentUserToken);
        this.loggedIn=true;

        this.userService.getCurrentUserRoles().subscribe(
          res=>{
            console.log("credintials "+res.toString);
            if(res[0].authority=="ROLE_ADMIN"){
              this.router.navigate(['/admin']);
            }else{
              this.router.navigate(['']);

            }
          },error=>{
            console.log(error);
            this.router.navigate(['']);
          }
        );
        // this.router.navigate(['']);
      },error=>{
        console.log("error -> "+error);
      }
    );

  }


  users = [
    {value: '0', viewValue: 'شركة'},
    {value: '1', viewValue: 'مستخدم عادي'}
  ];


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
