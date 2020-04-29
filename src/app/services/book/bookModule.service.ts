import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { BookModule } from 'src/app/models/bookModule.model';
@Injectable({
  providedIn: 'root'
})
export class BookModuleService {
 
  bookModules : BookModule[] = []; 
  bookModulesubject  = new Subject<BookModule[]>()

constructor() { this.getBookModules(); }

emitBookModules(){this.bookModulesubject.next(this.bookModules.slice())}

savebookModule(){
     firebase.database().ref('/bookModules').set(this.bookModules); 
     }

getBookModules(){
       firebase.database().ref('/bookModules')
       .on('value',(data:DataSnapshot)=>{
           this.bookModules= data.val()? data.val():[]
           this.emitBookModules()
       });
     }


createBookModule(bookModule:BookModule){
       this.bookModules.push(bookModule); 
       this.savebookModule();
       this.emitBookModules();}

removeBookModule(bookModule:BookModule){
       const bookModuleIndexToRemove = this.bookModules.findIndex(
         (bookEl)=>{
           if(bookModule===bookEl) return true; 
         }
       ); 

       this.bookModules.splice(bookModuleIndexToRemove,1); 
       this.savebookModule();
       this.emitBookModules();
     }


}



