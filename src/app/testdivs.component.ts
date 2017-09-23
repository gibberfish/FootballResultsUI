import { Component, OnInit } from '@angular/core';
import { Division } from './models/division';
import { DivisionService } from './services/division.service';

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
  errorMessage: string;

  constructor(private divisionService: DivisionService) { }

  onSelect(division: Division): void {
  this.selectedDivision = division;
  }

  getDivisions(): void {
    this.divisionService.getDivisions()
      .subscribe(
        divisions => this.divisions = divisions,
        error => this.errorMessage = <any>error
    );
  }

  ngOnInit(): void {
    this.getDivisions();
  }
}
