import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { BookModuleService } from 'src/app/services/book/bookModule.service';
import { BookModule } from 'src/app/models/bookModule.model';
import { BookDomain } from 'src/app/models/BookDomain.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-setting',
  templateUrl: './book-setting.component.html',
  styleUrls: ['./book-setting.component.scss']
})
export class BookSettingComponent implements OnInit {
  bookModuleForm : FormGroup; 
  bookDomainForm : FormGroup; 
  booksSubscription:Subscription; 
  bookModules : BookModule[]; 
  constructor(
    private bookModuleService : BookModuleService, 
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm()

    this.booksSubscription =  this.bookModuleService.bookModulesubject.subscribe(
      (bookModules:BookModule[])=>{
        this.bookModules = bookModules; 
        console.log("Books Module"+bookModules.keys);
        
  
                      }
     ); 
     this.bookModuleService.emitBookModules()
  }
  initForm(){
    this.bookModuleForm = this.formBuilder.group(
      {
      module:['',Validators.required],
    });
    this.bookDomainForm = this.formBuilder.group(
      {
      domain :['',Validators.required],  
    });
  }


  onSaveBookModule(){
    
      const name = this.bookModuleForm.get('module').value; 
      const newBookModule = new BookModule(name); 
      console.log(newBookModule);
      
      this.bookModuleService.createBookModule(newBookModule)
  }


  onSaveBookDomain(){

  }

}
