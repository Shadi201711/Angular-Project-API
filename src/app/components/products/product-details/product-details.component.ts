import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent
{
  product: any;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router:Router)
    {
    this.route.params.subscribe(params =>
    {
      const productId = params['id'];
      this.productService.getProductById(productId).subscribe(product => {
        this.product = product;
      });
    });
  }

  getColor(): string
  {
    if (this.product.quantity > 0) {
      return 'green';
    } else if (this.product.quantity === 1) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
  //
  getStockMessage(): string {
    if (this.product.quantity > 0) {
      return `In Stock`;
    } else if (this.product.quantity === 1) {
      return `1 item left`;
    } else {
      return `Out of stock`;
    }
  }
  //
  backtoproducts()
  {
    this.router.navigateByUrl('/products');
  }

}
