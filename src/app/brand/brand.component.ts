import { Component } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  constructor(private _ProductsService:ProductsService){}
  brands:any[]=[]

  ngOnInit(): void {

    this._ProductsService.getBrand().subscribe({
      next:(response)=>{
        this.brands=response.data
        
        console.log(response.data)
      }
    })

  }

}
