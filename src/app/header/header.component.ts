import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 isAuth : boolean; 
 public focus;
  constructor(public authService : AuthService,public location: Location) { }
 ngOnInit(): void {
   firebase.auth().onAuthStateChanged(
     (user)=>{
     if(user){  this.isAuth = true   }
     else{      this.isAuth = false  } 
     })
  }

onSignOut(){
  this.authService.signOutUser()
}
 








}
