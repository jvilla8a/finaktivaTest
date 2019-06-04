import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import * as config from '../../../assets/config.json';
import { DataTableDataSource } from './datasource';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  dataSource: DataTableDataSource;
  URL : string = `${config.api.url}`;

  constructor( private router : Router ) { 
    fetch(this.URL, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    }).then((response)=>{
      if (response.status !== 200) { 
        console.log(`Dashboard Request status code: ${response.status}`);
        return;
      }
      
      response.json().then((data)=>{
        this.dataSource = data.map((d)=>{ 
          d.actions = {'edit': 'edit', 'delete': 'delete'};
          return d;
        });
      });
    }).catch((err)=>{ console.log(`Fetch Delete Error: ${err}`); });
  }

  ngOnInit() {
    this.dataSource = new DataTableDataSource();

    if (!sessionStorage.status || sessionStorage.status != "logged")
      this.router.navigate(["/logIn"]);
  }

  deleteUSer ( id : string ) {
    fetch(`${this.URL}/${id}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' }
    }).then((response)=>{
      if (response.status !== 200) { 
        console.log(`Delete Request status code: ${response.status}`);
        return;
      }
      
      response.json().then((data)=>{
        this.router.navigate(['/logIn']);
      });
    }).catch((err)=>{ console.log(`Fetch Delete Error: ${err}`); })
  }

  session : boolean = sessionStorage.status && sessionStorage.status == "logged" ? true : false;

  displayedColumns: string[] = ['name', 'email', 'password', 'actions'];
}
