import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../shared/book.service';
import { NgForm } from '@angular/forms';
import { Book } from '../shared/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @ViewChild('bookForm',{static:false}) bookForm:NgForm;
  books:Book[]=[];
  title;
  author;
  catagory;
  id:string;

  constructor(private bookservice:BookService) { }
  
  ngOnInit() {
    
  }
  onBookSave()
  {
    console.log(this.bookForm.value)
    if(this.bookForm.value.title=="" && this.bookForm.value.author=="" &&this.bookForm.value.catagory=="")
    {
      alert("data dale kripya")
    }
    else
    {
      this.bookservice.postBook(this.bookForm.value).subscribe(
        ()=>{
          console.log("inserted successfully");
        }
      )
      this.bookForm.reset()
    }
  
    
  }
  showData()
  {
    this.bookservice.getBook().subscribe(
      (res)=>{
        this.books=res as Book[];
      }
    )
    console.log("called")
  }
  onEdit(event:Event,book:Book)
  {
      this.title=book.title;
      this.author=book.author;
      this.catagory=book.catagory
      this.id=(<HTMLButtonElement>event.target).id;
      
  }
    
  
  onDelete(event:Event)
  {
    var id = (<HTMLButtonElement>event.target).id;
    this.bookservice.deleteBook(id).subscribe(
      (res)=>{
        this.showData();
      }
    )
  }
  onUpdate()
  {
    const newbook=new Book(
      this.id,
      this.title,
      this.author,
      this.catagory,
    )

 
    this.bookservice.updateBook(newbook).subscribe(
      (resp)=>{
        console.log(resp)
        this.showData();
      }
    )
  }
}
