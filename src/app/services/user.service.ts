import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  baseUrl:string = 'https://localhost:7191/api/';
  constructor(private http:HttpClient) { }

}
