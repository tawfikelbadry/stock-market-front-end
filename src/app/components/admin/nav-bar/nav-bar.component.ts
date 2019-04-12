import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  private loggedIn = true;

  constructor( private router:Router) { }

  toggleDisplay() {
  	this.loggedIn = !this.loggedIn;
  }

  logout() {
   
  }

  ngOnInit() {
   
  }

}
