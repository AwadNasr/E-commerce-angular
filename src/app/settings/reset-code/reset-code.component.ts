import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-reset-code',
  templateUrl: './reset-code.component.html',
  styleUrls: ['./reset-code.component.css']
})
export class ResetCodeComponent {
  constructor(private _AuthService:AuthService, private _Router:Router,private toastr: ToastrService){}
  isLoading:boolean=false
  resetForm:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required]),
  })

  handleForm(resetForm:FormGroup){
    if(resetForm.valid){
      this.isLoading=true
      this._AuthService.resetCode(resetForm.value).subscribe({
        next:(response) =>{
          if(response.status=='Success'){
            this.isLoading=false
            this.toastr.success('Reset Code is Correct', 'Success',{
              timeOut: 2000,
            });

            this._Router.navigate(['home'])
          console.log(response);
          }
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
