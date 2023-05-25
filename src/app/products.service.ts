import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
  getProduct():Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  getProductDetails(id:any):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getCategory():Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  getSubCategoryonCategory(id:any):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
  }
  getSpecificSubCategory(id:any):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`)
  }
  getAllSubCategory():Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
  }
  getAllProduct(pageNum:number=1):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`)
  }
  getBrand():Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  getBrandDetails(id:any):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }
}
