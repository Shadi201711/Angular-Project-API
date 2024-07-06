import { Component } from '@angular/core';
import { CartItemsComponent } from './cart-items/cart-items.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

}
