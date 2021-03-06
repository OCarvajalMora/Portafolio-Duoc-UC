import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../../../shared/interfaces/product';
import { SwalConfirm, Toast } from 'src/app/shared/util';
import { ProductCategoryService } from '../../../services/product-category.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  currentUser: any = {};
  products: Product[] = [];
  productCategories: boolean; // Check if exists product categories

  constructor(private _authService: AuthService, private _productService: ProductService, private _productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductCategories();
    this.getCurrentUser();
  }

  getCurrentUser(){
    const token = this._authService.getToken();
    this._authService.getCurrentUser(token).subscribe((result: Object) => {
      this.currentUser = result;
    });
  }


  getProducts(){
    this._productService.getAll().subscribe(result => {
      this.products = result
    });
  }

  getProductCategories(){
    this._productCategoryService.getAll().toPromise().then((result) => {
      if(result.length > 0){
        this.productCategories = true;
      }else{
        this.productCategories = false;
      }
    });
  }

  confirmDelete(id: number){
    SwalConfirm.fire({
      title: 'Confirmar acción',
      text: 'Eliminarás definitivamente este producto',
    }).then(result => {
      if(result.value){
        this._productService.delete(id).subscribe(() => {
          this.getProducts();
          Toast.fire({
            icon: 'success',
            titleText: 'Producto eliminado'
          })
        }, () => {
          Toast.fire({
            icon: 'error',
            title: 'Error',
            text: 'Inténtalo nuevamente'
          })
        });
      }
    })
  }

}
