import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService,private _Router:Router,private toastr: ToastrService){
  }
  cartDetails:any
  ngOnInit(): void {
    this.getLoggedUserCart();
}
getLoggedUserCart(): void{
  this._CartService.getLoggedUserCart().subscribe({
    next:(response)=>{
      if(response.status == 'success')
      {
        console.log(response);
      this.cartDetails=response.data
      console.log(response.data)
      }
    },
    error:(err)=>console.log(err)
  })
}
removeCartItem(productId:any){
  this._CartService.removeCartItem(productId).subscribe({
    next:(response)=>{
      if(response.status == 'success')
      {
      this._CartService.numOfCartItems.next(response.numOfCartItems)
      this.cartDetails=response.data
      this.toastr.success('Product removed successfully', 'Success',{
        timeOut: 1500,
      });
      console.log(response)
      }
    },
    error:(err)=>console.log(err)
  })
}
removeUserCart(){
  this._CartService.removeUserCart().subscribe({
    next:(response)=>{
      this._CartService.numOfCartItems.next(response.numOfCartItems)
      this.toastr.success('Cart removed successfully', 'Success',{
        timeOut: 1500,
      });
      // this._Router.navigate(['/home'])
      this.cartDetails=''
      console.log(response)

    },
  })
}
updateCartItem(productId:any,count:number){
  this._CartService.updateCartItem(productId,count).subscribe({
    next:(response)=>{
      if(response.status == 'success')
      {
          this.cartDetails=response.data

          console.log(response.data)
        }
      console.log(response.data)
    },
    error:(err)=>console.log(err)
  })
}
}
