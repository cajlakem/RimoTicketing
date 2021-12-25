import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import {Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userauth : AuthserviceService, private router: Router, private activatedRoute:ActivatedRoute) { }
  registerForm:any =  FormGroup;
  submitted = false;

  invalidCredentialMsg: string;
  username:string;
  password:string;
  retUrl:any="login";
  isLoggedIn = true;

  isLoginFailed(){
    return this.invalidCredentialMsg == null
  }

  get f() { 
    return this.registerForm.controls; }
      onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
          return;
        }
      if(this.submitted){
      var myFormData = new FormData();
      
      myFormData.append('user', this.registerForm.value.username);
      myFormData.append('password', this.registerForm.value.password);
      var user = this.userauth.loginuser(myFormData);
      if(user.userName == "emir"){
        this.router.navigateByUrl('/main');
      }else
        this.invalidCredentialMsg = "Failed to login!"
    }
  
  }
  ngOnInit(): void {
    this.activatedRoute.queryParamMap
                .subscribe(params => {
            this.retUrl = params.get('retUrl'); 
            console.log( 'LoginComponent/ngOnInit '+ this.retUrl);
        });
    this.invalidCredentialMsg = "";
    this.registerForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    });
  }
}