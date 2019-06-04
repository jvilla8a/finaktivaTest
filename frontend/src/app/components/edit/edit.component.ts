import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as config from '../../../assets/config.json';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
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

      // response.json().then((data)=>{
        this.router.navigate(['/dashboard']);
      // });
    }).catch((err)=>{ console.log(`Fetch Registry Error: ${err}`); });
  }
}
