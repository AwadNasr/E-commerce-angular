import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  constructor(private _CartService:CartService , private _Router:Router , private _ActivatedRoute:ActivatedRoute)
  {}

  cartId:any
  isLoading:boolean=false

  shippingAddress:FormGroup=new FormGroup({
    details:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required]),
    city:new FormControl(null,[Validators.required]),
  })

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>
    {
      this.cartId=params.get('id')
      console.log(this.cartId)
    }
  })
}
  handleFormCheckout(shippingAddress:FormGroup)
{
  this.isLoading=true
  this._CartService.checkout(shippingAddress.value,this.cartId).subscribe({
    next:(response)=>{
      if(response.status =='success'){
        console.log(response)
        location.href=response.session.url
        this.isLoading=false
      }
    },
    error:(err)=>console.log(err)
  })


}



}
