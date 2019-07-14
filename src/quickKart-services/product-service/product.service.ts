import { Injectable } from '@angular/core';
import { IProduct } from '../../app/quickKart-interfaces/product';
import { ICategory } from '../../app/quickKart-interfaces/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: IProduct[];
  categories: ICategory[];
  constructor(private http: HttpClient) { }
  getProducts(): Observable<IProduct[]> {
    let tempVar = this.http.get<IProduct[]>('https://api.myjson.com/bins/16m6vh');
    return tempVar;
  }
  getProductCategories(): Observable<ICategory[]> {
    let tempVar = this.http.get<ICategory[]>('https://api.myjson.com/bins/r6dox');
    return tempVar;
  }
}
