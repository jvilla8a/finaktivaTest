import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as config from '../../../assets/config.json';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor( private router: Router ) { }
  ngOnInit() { 
    if (sessionStorage.status && sessionStorage.status == "logged")
      this.router.navigate(["/dashboard"]);
  }

  login(email: string, pass: string) {
    var URL = `${config.api.url}/login`;
    
    fetch(URL, {
      method: 'post',
      body:   JSON.stringify({
        Email:    email,
        Password: pass
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then((response)=>{
      if (response.status !== 200) { 
        console.log(`Login Request status code: ${response.status}`);
        return;
      }

      response.json().then((data)=>{
        if (data.response == "Authorized"){
          sessionStorage.setItem("status", "logged");
          this.router.navigate(['/dashboard']);
        }
      });
    }).catch((err)=>{ console.log(`Fetch Login Error: ${err}`); })
  }
}
