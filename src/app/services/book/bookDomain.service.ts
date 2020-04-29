import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { BookDomain } from '../../models/BookDomain.model';
@Injectable({
  providedIn: 'root'
})
export class BookDomainService {
 
  bookDomains : BookDomain[] = []; 
  bookDomainSubject  = new Subject<BookDomain[]>()

constructor() { this.getBookDomains(); }

emitBookDomains(){this.bookDomainSubject.next(this.bookDomains.slice())}

savebookDomain(){
     firebase.database().ref('/bookDomains').set(this.bookDomains); 
     }

getBookDomains(){
       firebase.database().ref('/books')
       .on('value',(data:DataSnapshot)=>{
           this.bookDomains= data.val()? data.val():[]
           this.emitBookDomains()
       });
     }


createBookDomain(bookDomain:BookDomain){
       this.bookDomains.push(bookDomain); 
       this.savebookDomain();
       this.emitBookDomains();}

removeBookDomain(bookDomain:BookDomain){
       const bookDomainIndexToRemove = this.bookDomains.findIndex(
         (bookEl)=>{
           if(bookDomain===bookEl) return true; 
         }
       ); 

       this.bookDomains.splice(bookDomainIndexToRemove,1); 
       this.savebookDomain();
       this.emitBookDomains();
     }


}



