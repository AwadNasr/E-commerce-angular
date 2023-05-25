import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(private _AuthService:AuthService, private _Router:Router,private toastr: ToastrService){}
  isLoading:boolean=false
  resetForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
  })

  handleForm(resetForm:FormGroup){
    if(resetForm.valid){
      this.isLoading=true
      this._AuthService.forgetPassword(resetForm.value).subscribe({
        next:(response) =>{
          this.isLoading=false
          this.toastr.success(response.message, 'Success',{
            timeOut: 2000,
          });
          this._Router.navigate(['settings/resetCode'])
          console.log(response);
        },
        error:(err) =>{
          this.isLoading=false
          this.toastr.warning(err.error.message, 'Ooops',{
            timeOut: 3000,
          });
          console.log(err);
        }
      })
    }

  }

}
