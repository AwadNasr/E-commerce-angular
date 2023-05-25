import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private _AuthService:AuthService, private _Router:Router,private toastr: ToastrService){}
  isLoading:boolean=false
  resetForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)]),
  })

  handleForm(resetForm:FormGroup){
    if(resetForm.valid){
      this.isLoading=true
      this._AuthService.reset(resetForm.value).subscribe({
        next:(response) =>{
          this.isLoading=false
          console.log(response);
        },
        error:(err) =>{
          this.isLoading=false
          console.log(err);
        }
      })
    }

  }


}
