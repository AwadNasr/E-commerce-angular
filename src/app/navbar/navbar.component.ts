import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean=false
  numCart:number=0
  constructor(private _AuthService:AuthService ,private _Router:Router , private  _CartService:CartService) {
  }
  userName:any=''
  ngOnInit(): void {
    this._CartService.numOfCartItems.subscribe({
      next:(value)=>{
        this.numCart=value
      }
    })

    this._AuthService.currentUser.subscribe({
      next:()=>{
        if(this._AuthService.currentUser.getValue() != null){
          this.isLogin=true
        }else{
          this.isLogin=false
        }
      }
    })
  }
  logout(){
    localStorage.removeItem('userToken')
    localStorage.removeItem('userName')
    this._AuthService.currentUser.next(null)
    this._Router.navigate(['/login'])
  }

}
