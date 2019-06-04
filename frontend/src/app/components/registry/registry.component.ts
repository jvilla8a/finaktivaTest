import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, 
         FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as config from '../../../assets/config.json';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.less']
})
export class RegistryComponent implements OnInit {
  @ViewChild("userPass", {static: true}) userPass:ElementRef;
  @ViewChild("userConfirm", {static: true}) userConfirm:ElementRef;

  firstFormGroup : FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup : FormGroup;
  fourthFormGroup: FormGroup;

  matcher = new MyErrorStateMatcher();
  
  constructor( private router : Router, private _formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstControl: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondControl: ['', [Validators.required, Validators.email]]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdControl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthControl: ['', Validators.required]
    });
  }

  createUser ( name : string, email : string, pass : string, confirm : string ) {
    if ( pass != confirm )
      return false;

    var URL = `${config.api.url}`;
    
    fetch(URL, {
      method: 'post',
      body:   JSON.stringify({
        Name:     name,
        Email:    email,
        Password: pass
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then((response)=>{
      if (response.status !== 200 && response.status !== 201) { 
        console.log(`Registry Request status code: ${response.status}`);
        return;
      }

      response.json().then((data)=>{
        if  (!sessionStorage.status || sessionStorage.status != "logged")
          sessionStorage.setItem("status", "logged");
        this.router.navigate(['/dashboard']);
      });
    }).catch((err)=>{ console.log(`Fetch Registry Error: ${err}`); });
  }
}
