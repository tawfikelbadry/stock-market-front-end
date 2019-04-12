import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { ServerPath } from '../../../constants/app-const';
import { NormalUserService } from '../../../services/normal-user.service';
@Component({
  selector: 'app-up-nav',
  templateUrl: './up-nav.component.html',
  styleUrls: ['./up-nav.component.css']
})
export class UpNavComponent implements  AfterViewInit ,OnInit {

  private loggedUserImageUrl:string;
  private loggedUserName:string;
  private loggedUserTotalMoney:number;


  constructor(private normalUserService:NormalUserService) { }

  ngOnInit() {
    this.loggedUserImageUrl=this.normalUserService.getCurrentUserPhoto();
    this.normalUserService.getCurrentUserName().subscribe(
      res=>{
      this.loggedUserName=res['name'];
      console.log(res);
    },
    error=>{
      console.log(error);
    }
  );

  this.normalUserService.getCurrentUserTotalMoney().subscribe(
    res=>{
      this.loggedUserTotalMoney=res['totalMoney'];
    },error=>{
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

 

}
