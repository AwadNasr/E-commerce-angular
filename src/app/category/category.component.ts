import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  constructor(private _ProductsService:ProductsService){}
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 5
      }

    },
    nav: true
  }
  categories:any[]=[]
  subCategories:any[]=[]
  ngOnInit(): void {

    this._ProductsService.getCategory().subscribe({
      next:(response)=>{
        this.categories=response.data

      }
    })
    this._ProductsService.getAllSubCategory().subscribe({
      next:(response)=>{
        this.subCategories=response.data
        console.log(response.data)
       
        console.log(response);
      }
    })
  }
}
