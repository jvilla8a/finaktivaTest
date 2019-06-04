import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as config from '../../../assets/config.json';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.less']
})
export class RegistryComponent implements OnInit {

  constructor( private router : Router ) { }

  ngOnInit() {
  }

  createUser ( name : string, email : string, pass : string, confirm : string ) {
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
