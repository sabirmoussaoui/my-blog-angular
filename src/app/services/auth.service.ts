import { Injectable } from '@angular/core';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor() { }
//  Creation d'un utilisateur
createUser(email:string, password :string){
  return new Promise((resolve,reject)=>{
     firebase.auth().createUserWithEmailAndPassword(email,password).then(
      ()=>{
        resolve();
      },
      (error) =>{
        reject(error);
      }
     );
    });}

//  méthode très similaire, qui s'occupera de connecter un utilisateur déjà existant
signInUser(email:string, password :string){
  return new Promise((resolve,reject)=>
  firebase.auth().signInWithEmailAndPassword(email,password).then(
  ()=>{resolve()},
  (error)=>{reject(error)}
  )
 );
}
// mothode de SignOut

signOutUser(){
  firebase.auth().signOut(); 
}




}
