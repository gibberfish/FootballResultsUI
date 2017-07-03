import { Component, OnInit } from '@angular/core';
import { Division } from './division';
import { DivisionService } from './division.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DivisionService]
})
export class AppComponent implements OnInit {
  title = 'Division List Page';
  divisions: Division[];
  selectedDivision: Division;

  constructor(private divisionService: DivisionService) { }

  onSelect(division: Division): void {
  this.selectedDivision = division;
  }

  getDivisions(): void {
    // this.divisionService.getDivisions().then(divisions => this.divisions = divisions);
    this.divisionService.getDivisionsSlowly().then(divisions => this.divisions = divisions);
  }

  ngOnInit(): void {
  this.getDivisions();
  }
}
