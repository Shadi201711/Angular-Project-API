import { Component, OnDestroy, OnInit } from '@angular/core';
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit
{
   products: IProduct[] = [];
  isAdmin: boolean = false;
  constructor(private userService: UserAuthenticationService,
              private productService: ProductService,
              private route:Router) {}
    ngOnInit(): void {
    const isAdminFromLocalStorage = localStorage.getItem('IsAdmin') === 'true';
    this.isAdmin = isAdminFromLocalStorage;
    this.userService.getAdminStatus().subscribe(status => {
      this.isAdmin = status;
    });

    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
  refreshProducts(): void
  {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
  deleteProduct(productId: number): void
  {
    if (confirm('Are you sure you want to delete this product?'))
    {
      this.productService.deleteProduct(productId).subscribe(() =>
      {
        this.products = this.products.filter(product => product.id !== productId);
        this.refreshProducts();
      });
    }
  }
}
