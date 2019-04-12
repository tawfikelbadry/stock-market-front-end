import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserOperationsService } from '../../../services/user-operations.service';

@Component({
  selector: 'app-up-prevprocess',
  templateUrl: './up-prevprocess.component.html',
  styleUrls: ['./up-prevprocess.component.css']
})
export class UpPrevprocessComponent implements  AfterViewInit ,OnInit {

  currentUserOperations:Array<any>;

  constructor(private userOperationsSevice:UserOperationsService) { }

  ngOnInit() {
    this.getCurrentUserTradingOperations();
  }


  getCurrentUserTradingOperations(){
    this.userOperationsSevice.getUserTradingOPeration().subscribe(
      res=>{
        this.currentUserOperations=res;
        console.log("trading operations : "+res);
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
