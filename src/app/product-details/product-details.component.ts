import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private _ProductsService:ProductsService ,
     private _ActivatedRoute:ActivatedRoute ,
     private _CartService:CartService ,
     private toastr: ToastrService ) { }
  productId:any;
  productDetails:any={}
  imageSrc:string=''

  ngOnInit(): void {

    this.productId=this._ActivatedRoute.paramMap.subscribe(
      {
      next:(params)=>{ this.productId = params.get('id')
      this._ProductsService.getProductDetails(this.productId).subscribe({
        next:(response)=> {
          this.productDetails = response.data
         
          console.log(this.productDetails);
        }
      })
    }
    })
     }
     getSrc(src:string){
      this.imageSrc=src
     }
     addToCart(productId:any){
      this._CartService.addToCart(productId).subscribe({
        next:(response)=>{
          if(response.status == 'success'){
            this._CartService.numOfCartItems.next(response.numOfCartItems)
            this.toastr.success(response.message, 'Success',{
              timeOut: 1500,
            })
          }
        },
        error:(err)=>console.log(err)
      })
    }
}
