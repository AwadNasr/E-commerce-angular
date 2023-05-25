import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService, private _Router:Router,private toastr: ToastrService){}
  isLoading:boolean=false

  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required, Validators.minLength(3) ,Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })

  handleRegister(registerForm:FormGroup){
    if(registerForm.valid){
      this.isLoading=true
      this._AuthService.register(registerForm.value).subscribe({
        next:(response) =>{
          this.isLoading=false
          console.log(response);
          if(response.message==='success'){
            // navigate to Login
            this.toastr.success('You registerd successfully', 'Success',{
              timeOut: 1500,
            });
            this._Router.navigate(['/login'])
          }
        },
        error:(err) =>{
          this.isLoading=false
          this.toastr.warning(err.error.message, 'Ooops',{
            timeOut: 1500,
          });
        }
      })
    }
  }
}
