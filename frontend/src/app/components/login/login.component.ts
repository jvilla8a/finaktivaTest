import { Component, OnInit } from '@angular/core';
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

  constructor() { }
  ngOnInit() { }

  login(name: string, pass: string) {
    var URL = `${config.api.url}/${name}/${pass}`;
    
    fetch(URL).then((response)=>{
      if (response.status !== 200) { 
        console.log(`Login Request status code: ${response.status}`);
        return;
      }

      response.json().then((data)=>{
        console.log(`Login Data: ${data}`);
      });
    }).catch((err)=>{ console.log(`Fetch Login Error: ${err}`); })
  }
}
