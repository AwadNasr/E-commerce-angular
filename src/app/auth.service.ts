import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser=new BehaviorSubject(null)
  userName:any=localStorage.getItem('userName')
  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if(localStorage.getItem('userToken') !==null){
      this.decode()
    }
  }
  register(userData:any):Observable<any>
  {
   return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData)
  }
  login(userData:any):Observable<any>
  {
   return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData)
  }
  reset(userData:any):Observable<any>
  {
   return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', userData)
  }
  forgetPassword(userData:any):Observable<any>
  {
   return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', userData)
  }
  resetCode(userData:any):Observable<any>
  {
   return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', userData)
  }

  decode(){
    let encode=JSON.stringify(localStorage.getItem('userToken'))
    let decoded:any=jwtDecode(encode)
    this.currentUser.next(decoded) // meaning that currentUser= decoded
  }


}
