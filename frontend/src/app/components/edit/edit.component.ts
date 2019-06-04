import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl('', Validators.required);

  URL : string = `${config.api.url}`;
  constructor( private route : ActivatedRoute, private router : Router ) { }
  id = this.route.snapshot.paramMap.get('id');

  ngOnInit() { }

  editUser ( name : string, email : string ) {
    fetch(`${this.URL}/${this.id}`, {
      method: 'put',
      body:   JSON.stringify({
        Name:     name,
        Email:    email
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then((response)=>{
      if (response.status !== 200 && response.status !== 204) { 
        console.log(`Update Request status code: ${response.status}`);
        return;
      }

      this.router.navigate(['/dashboard']);
    }).catch((err)=>{ console.log(`Fetch Update Error: ${err}`); });
  }
}
