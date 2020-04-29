import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/book/books.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookDomain } from 'src/app/models/BookDomain.model';
import { BookModule } from 'src/app/models/bookModule.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm : FormGroup; 
  fileIsUploading = false ; 
  fileUrl : string ;  
  fileUploaded = false; 
  moduleAcitve:boolean = false ; 
  activeOther :boolean = false
 
  domainBookList = [
   { name:'Autre'},
   { name:'Informatic'},
   { name:'Mathematic'}
  ]
  moduleBookList= [];  
  InformaticModuleList= [
    { name:'Autre'},
    { name:'React Js'},
    { name:'Vue Js'},
    { name:'Angular'}
   ]

   MathematicModuleList= [
    { name:'Autre'},
    { name:'Recherche Operatinnelle'},
    { name:'Algebre 1'},
    { name:'Analyse 1'}
   ]

  typeBookList = [
  { name:'Autre'},
   {name: 'Cour'},
   {name: 'TD(Travaux Dirigés)'},
   {name: 'TP(Travaux Pratique)'}
  ]
 
 
  constructor(
    private booksService : BooksService, 
    private router: Router , 
    private formBuilder : FormBuilder
    ) {}

ngOnInit(): void {
  this.initForm()

 
  }

  initForm(){
    this.bookForm = this.formBuilder.group(
      {
      title :['',Validators.required],
      author :['',Validators.required],
      synopsis :'',
      domainBookSelected:'',
      typeBookSelected:'',
      moduleListSelected:'',
      moduleAcitveOther:'',
      domainAcitveOther:''
    });
  }

  onSelectDomain(){
    const domainBookSelected = this.bookForm.get('domainBookSelected').value
   switch (domainBookSelected) {
     case "Informatic":
        this.moduleBookList = this.InformaticModuleList; 
        this.moduleAcitve= true; 
        this.activeOther = false; 
        console.log(this.moduleBookList);
        
       break;
    case "Mathematic":
      this.moduleBookList = this.MathematicModuleList; 
      this.moduleAcitve= true; 
      this.activeOther = false; 
        break;
   
     default:
       this.moduleAcitve =false; 
       this.activeOther = true;
       break;
   }
  }
  onSaveBook(){
    const title = this.bookForm.get('title').value; 
    const author = this.bookForm.get('author').value; 
    const synopsis = this.bookForm.get('synopsis').value; 
    const domainBookSelected = this.bookForm.get('domainBookSelected').value
    const typeBookSelected = this.bookForm.get('typeBookSelected').value
    const newBook = new Book(title,author); 
    newBook.synopsis = synopsis ; 
    if(this.fileUrl && this.fileUrl !== ''){
      newBook.photo = this.fileUrl ; 
    }

    
    this.booksService.createBook(newBook)
    this.router.navigate(['/books']); 
    }

  detectFiles(event){
    this.onUploadFile(event.target.files[0]); 
  }

  onUploadFile(file:File){
    this.fileIsUploading = true; 
    this.booksService.uploadFile(file).then(
      (url:string)=>{
        this.fileUrl = url ;
        console.log('Url =>'+url);
         
        this.fileIsUploading = false; 
        this.fileUploaded=true; 
      }
    )
  }



}
  
