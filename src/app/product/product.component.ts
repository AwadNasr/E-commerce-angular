import { Component } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  constructor(private _ProductsService:ProductsService){}
  products:any[]=[]

  search:string=''
  getAllProduct(pageNum:number=1){
    this._ProductsService.getAllProduct(pageNum).subscribe({
      next:(response)=>{
        this.products=response.data
        
        console.log(response.data);

      }
    })
  }
  ngOnInit(): void {

    this.getAllProduct()

  }

}
