import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService, private _Router:Router,private toastr: ToastrService){}
  isLoading:boolean=false
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)]),
  })

  handleLogin(loginForm:FormGroup){
    if(loginForm.valid){
      this.isLoading=true
      this._AuthService.login(loginForm.value).subscribe({
        next:(response) =>{
          this.isLoading=false
          console.log(response);

          if(response.message==='success'){
            // navigate to Login , Save Token
            localStorage.setItem('userToken',response.token)
            localStorage.setItem('userName',response.user.name)
            console.log(response);
            this.toastr.success('You are logged in successfully', 'Hi '+ localStorage.getItem('userName'),{
              timeOut: 2000,
            });

            this._AuthService.decode()
            this._Router.navigate(['/home'])
          }
        },
        error:(err) =>{
          this.isLoading=false
          console.log(err);
          this.toastr.warning(err.error.message, 'Ooops',{
            timeOut: 1500,
          });

        }
      })
    }

  }

}
