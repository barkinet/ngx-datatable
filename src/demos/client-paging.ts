import { Component } from '@angular/core';

import {
  DataTable,
  TableOptions,
  TableColumn,
  ColumnMode
} from 'angular2-data-table';

@Component({
  selector: 'app',
  template: `
    <div>
    	<h3>client-paging</h3>
    	<datatable
        class="material"
    		[rows]="rows"
    		[options]="options">
    	</datatable>
    </div>
  `,
  directives: [ DataTable ]
})
export class App {

	rows = [];

	options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    limit: 10,
    columns: [
      new TableColumn({ name: "Name" }),
      new TableColumn({ name: "Gender" }),
      new TableColumn({ name: "Company" })
    ]
  });

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data);
    });
  }

  fetch(cb) {
    var req = new XMLHttpRequest();
    req.open('GET', `src/demos/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
