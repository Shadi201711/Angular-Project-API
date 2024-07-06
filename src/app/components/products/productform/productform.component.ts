import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../models/iproduct';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-productform',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})

export class ProductformComponent implements OnInit

{
  ProductForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image: new FormControl('', [Validators.required])
  });

  productId: any;
  productObj: IProduct | null = null;
  isAdmin: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserAuthenticationService,
              private productService: ProductService, private router: Router) { }

  ngOnInit(): void
  {
    this.userService.getAdminStatus().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    const productIdString = this.route.snapshot.paramMap.get('id');
    this.productId = productIdString ? +productIdString : null; // Convert string to number if not null

    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((product) => {
        this.productObj = product;
        this.populateForm(product);
      });
    }


  }

  populateForm(product: IProduct): void
  {
    this.ProductForm.patchValue({

      name: product.name,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      image: product.image
    });
  }

  onSubmit(): void {
    if (this.productId) {


      var obj={id:this.productId
      ,name:this.ProductForm.value.name,
      price:this.ProductForm.value.price,
      quantity:this.ProductForm.value.quantity,
      description:this.ProductForm.value.description,
      image:this.ProductForm.value.image
      }
      this.productService.editProduct(this.productId, obj as IProduct).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.addNewProduct(this.ProductForm.value as IProduct).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  selectedFile: File | undefined;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.uploadFile();
  }
  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'Angular1711');

      fetch('https://api.cloudinary.com/v1_1/Angular1711/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.secure_url) {
            this.ProductForm?.patchValue({ image: data.secure_url });
          }
        })
        .catch((error) => {
          console.error('Error uploading file to Cloudinary:', error);
        });
    }
  }
}
