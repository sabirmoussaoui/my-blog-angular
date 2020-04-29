import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/book/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit,OnDestroy {
 
   books : Book[];
   booksSubscription:Subscription; 
     
  constructor(private booksService:BooksService,public router: Router) { }

  ngOnInit(): void {
    // souscrit au Subject du service et déclenche sa première émission ;
   this.booksSubscription =  this.booksService.booksSubject.subscribe(
    (books:Book[])=>{
      this.books = books; 
      console.log(books.keys);
      

                    }
   ); 
   this.booksService.emitBooks()
   
  }

  onNewBook(){
    this.router.navigate(['/books','new']); 
  }
  
  onDeleteBook(book:Book){
    this.booksService.removeBook(book); 
  }
  onUpdate(id:number,book:Book){
     this.booksService.update(id,book)
  }
  onViewBook(id:number){
    this.router.navigate(['/books','view',id]); 
  }
 
  ngOnDestroy(){
    this.booksSubscription.unsubscribe()
  }






}
