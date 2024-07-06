import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService
{
  private baseUrl: string;

  constructor(public http: HttpClient)
  {
    this.baseUrl = 'https://localhost:7191/api/Products';
  }
  getAllProducts(): Observable<IProduct[]>
  {
    return this.http.get<IProduct[]>(this.baseUrl)
      .pipe(
        catchError(error => throwError('Error fetching products.'))
      );
  }
  getProductById(productId: number): Observable<IProduct>
  {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.get<IProduct>(url)
      .pipe(
        catchError(error => throwError('Error fetching product by ID.'))
      );
  }

  addNewProduct(product: IProduct): Observable<IProduct>
  {
    return this.http.post<IProduct>(this.baseUrl, product)
      .pipe(
        catchError(error => throwError('Error adding new product.'))
      );
  }

  deleteProduct(productId: number): Observable<any>
  {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.delete(url)
      .pipe(
        catchError(error => throwError('Error deleting product.'))
      );
  }

  editProduct(productId: number, product: IProduct): Observable<IProduct>
  {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.put<IProduct>(url, product)
      .pipe(
        catchError(error => throwError('Error editing product.'))
      );
  }
}
