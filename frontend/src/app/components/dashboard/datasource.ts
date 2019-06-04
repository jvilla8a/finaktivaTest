import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface DataTableItem {
    _id: string;
    id: number;
    name: string;
    email: string;
    password: string;
    actions: object;
}

const _DATA: DataTableItem[] = [  
    { _id: "2134",  id: 9, name: 'Fluorine',  email: "Fluorine@Fluorine.com",   password: 'F',  actions: {'edit': 'edit', 'delete': 'delete'}},
];

export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = _DATA;

  constructor() { super(); }

  addData(item) {
    this.data.push(item);
    console.log(this.data);
  }

  connect(): Observable<DataTableItem[]> {
    const dataMutations = [
      observableOf(this.data)
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.data;
    }));
  }

  removeData(id){
    this.data.forEach((d, index)=>{ 
      if (d._id == id) 
        this.data.splice(index, 1);
    });
  }

  disconnect() {}
}