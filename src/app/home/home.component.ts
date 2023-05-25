import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _ProductsService:ProductsService , private _CartService:CartService,private toastr: ToastrService ){
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 4
      }
    },
    nav: true
  }
  search:string=''
  products:any[]=[]
  categories:any[]=[]
  // imgUrl:string='https://res.cloudinary.com/dwp0imlbj/image/upload/products/'
  ngOnInit(): void {

      this._ProductsService.getProduct().subscribe({
        next:(response)=>{
           this.products=response.data
           console.log(response.data);

        }
      })
      this._ProductsService.getCategory().subscribe({
        next:(response)=>{
          this.categories=response.data

        }
      })
  }
  addToCart(productId:any){
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        if(response.status == 'success'){
          this._CartService.numOfCartItems.next(response.numOfCartItems)
          this.toastr.success(response.message, 'Success',{
            timeOut: 1500,
          });
        }
      },
      error:(err)=>console.log(err)
    })
  }
}
