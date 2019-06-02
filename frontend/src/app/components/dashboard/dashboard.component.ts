import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";

export interface PeriodicElement {
  name: string;
  email: string;
  pass: string;
  id: number;
  actions: object;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen',  email: "Hydrogen@Hydrogen.com",   pass: 'H',  id: 1,  actions: {'edit': 'edit', 'delete': 'delete'}},
  { name: 'Helium',    email: "Helium@Helium.com",       pass: 'He', id: 2,  actions: {'edit': 'edit', 'delete': 'delete'}},
  { name: 'Lithium',   email: "Lithium@Lithium.com",     pass: 'Li', id: 3,  actions: {'edit': 'edit', 'delete': 'delete'}},
  { name: 'Beryllium', email: "Beryllium@Beryllium.com", pass: 'Be', id: 4,  actions: {'edit': 'edit', 'delete': 'delete'}},
  { name: 'Boron',     email: "Boron@Boron.com",         pass: 'B',  id: 5,  actions: {'edit': 'edit', 'delete': 'delete'}},
  { name: 'Carbon',    email: "Carbon@Carbon.com",       pass: 'C',  id: 6,  actions: {'edit': 'edit', 'delete': 'delete'}},
  { name: 'Nitrogen',  email: "Nitrogen@Nitrogen.com",   pass: 'N',  id: 7,  actions: {'edit': 'edit', 'delete': 'delete'}},
  { name: 'Oxygen',    email: "Oxygen@Oxygen.com",       pass: 'O',  id: 8,  actions: {'edit': 'edit', 'delete': 'delete'}},
  { name: 'Fluorine',  email: "Fluorine@Fluorine.com",   pass: 'F',  id: 9,  actions: {'edit': 'edit', 'delete': 'delete'}},
  { name: 'Neon',      email: "Neon@Neon.com",           pass: 'Ne', id: 10, actions: {'edit': 'edit', 'delete': 'delete'}},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor( private router : Router ) { }

  ngOnInit() {
    if (!sessionStorage.status || sessionStorage.status != "logged")
      this.router.navigate(["/logIn"]);
  }

  displayedColumns: string[] = ['name', 'email', 'pass', 'id', 'actions'];
  dataSource = ELEMENT_DATA;

}
