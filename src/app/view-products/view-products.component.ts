import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../app/quickKart-interfaces/product';
import { ICategory } from '../../app/quickKart-interfaces/category';
import { ProductService } from '../../quickKart-services/product-service/product.service';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  products: IProduct[];
  categories: ICategory[];
  filteredProducts: IProduct[];
  searchByProductName: string;
  searchByCategoryId: string = "0";
  imageSrc: string;
  showMsgDiv: boolean = false;
  constructor(private _productService: ProductService) { }
  ngOnInit() {
    this.getProducts();
    this.getProductCategories();
    if (this.products == null) {
      this.showMsgDiv = true;
    }
    this.filteredProducts = this.products;
    this.imageSrc= "src/app/quickKart-images/add-item.jpg";
  }
  getProducts() {
    this._productService.getProducts().subscribe(
      responseProductData => {
        this.products = responseProductData;
        this.filteredProducts = responseProductData;
        this.showMsgDiv = false;
      }
    );
  }
  getProductCategories() {
    this._productService.getProductCategories().subscribe(
      responseCategoryData => this.categories = responseCategoryData
    ); 
  }
  searchProduct(productName: string) {
    if (this.searchByCategoryId == "0") {
      this.filteredProducts = this.products;
    }
    else {
      this.filteredProducts = this.products.filter(prod => prod.CategoryId.toString() == this.searchByCategoryId);
    }
    if (productName != null || productName == "") {
      this.searchByProductName = productName;
      this.filteredProducts = this.filteredProducts.filter(prod => prod.ProductName.toLowerCase().indexOf(productName.toLowerCase()) >= 0);
    }
    if (this.filteredProducts.length == 0) {
      this.showMsgDiv = true;
    }
    else {
      this.showMsgDiv = false;
    }
  }
  searchProductByCategory(categoryId: string) {
    if (this.searchByProductName != null || this.searchByProductName == "") {
      this.filteredProducts = this.products.filter(prod => prod.ProductName.toLowerCase().indexOf(this.searchByProductName.toLowerCase()) >= 0);
    }
    else {
      this.filteredProducts = this.products;
    }
    this.searchByCategoryId = categoryId;
    if (this.searchByCategoryId == "0") {
      this.filteredProducts = this.products;
    }
    else {
      this.filteredProducts = this.filteredProducts.filter(prod => prod.CategoryId.toString() == this.searchByCategoryId);
    }
  }  
}
