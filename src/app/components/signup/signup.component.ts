import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements  AfterViewInit ,OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
