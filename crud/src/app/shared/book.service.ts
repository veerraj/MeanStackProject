import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/operator/toPromise'

import { Book } from './book.model'
@Injectable({
  providedIn: 'root'
})
export class BookService {
 Selectedbook:Book;
 books:Book[];
 readonly baseURL="http://localhost:8000/books";

  constructor(private http:HttpClient) { }

  postBook(book:Book)
  {
    return this.http.post(this.baseURL,book);
  }
  getBook()
  {
    return this.http.get(this.baseURL);
  }
  deleteBook(_id:string)
  { 
    console.log(_id)
    return this.http.delete(this.baseURL+`/${_id}`);
  }
  updateBook(book:Book)
  {
    
    return this.http.put(this.baseURL+`/${book._id}`,book);
  }
}
