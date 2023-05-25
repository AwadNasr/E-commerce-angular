import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  numOfCartItems=new BehaviorSubject(0)
  constructor(private _HttpClient:HttpClient,private _AuthService:AuthService) {
    this.getLoggedUserCart().subscribe({
      next:(response)=>{
       this.numOfCartItems.next(response.numOfCartItems)
        console.log(response)
      },
      error:(err)=>console.log(err)
    })
   }
  headers:any={
    token: localStorage.getItem('userToken')
  }
  addToCart(productId:any) :Observable <any>
  {
   return  this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        productId:productId
    },
    {
      headers:this.headers
    }
    )
  }
  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers:this.headers
    })
    }
  removeCartItem(productId:any):Observable<any>{
      return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers:this.headers
      })
    }
  removeUserCart():Observable<any>{
      return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:this.headers
      })
    }
  updateCartItem(productId:any ,count:number):Observable<any>{
      return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count:count
      },{
        headers:this.headers
      })
      }
  checkout(shippingAddress:any,cartId:any):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{
      shippingAddress:shippingAddress
    },{
      headers:this.headers
    })
  }

}
