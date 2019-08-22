import { Component } from '@angular/core';

import { Observable, from, Subject } from 'rxjs';

import { Bankdetails } from './classes/bankdetails';
import { HttpClient } from '@angular/common/http';

// import { Cacheable } from 'ngx-cacheable';

// const articleNotifier = new Subject();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  listBank: any;
  filterBank: Bankdetails[];
  selectedLoc: string = 'BANGALORE';

  constructor(private httpclient: HttpClient) { }

  private _search: string;
  get search(): string {
    return this._search;
  }
  set search(value: string) {
    this._search = value;
    this.filterBank = this.filterBanks(value);
  }

  filterBanks(serachStr: string) {
    return this.listBank.filter(bank =>
      bank.branch.toLowerCase().indexOf(serachStr.toLowerCase()) !== -1);
  }

  getDetails() {
    this.httpclient.get("https://vast-shore-74260.herokuapp.com/banks?city="  + this.selectedLoc)
    .subscribe( response => {
      this.listBank = response;
    });
    this.filterBank = this.listBank;    
  }

  selectChangeHandler(event: any) {
    this.selectedLoc = event.target.value;
    this.getDetails();
  }

  ngOnInit() {
    this.getDetails();
  }
  
}