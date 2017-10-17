import { Component, OnInit } from '@angular/core';
import { SeasonDivisionFixtureService } from '../services/season-division-fixture.service';
import { Fixture } from '../models/fixture';

@Component({
  selector: 'date-analysis',
  templateUrl: './date-analysis.component.html',
  styleUrls: ['./date-analysis.component.css'],
  providers: [SeasonDivisionFixtureService]
})
export class DateAnalysisComponent implements OnInit  {

  fixtureDateMap: Map<string, Fixture[]>;
  fixtureDates: string[] = [];

  errorMessage: string;

  constructor(private seasonDivisionFixtureService: SeasonDivisionFixtureService) {}

  ngOnInit(): void {
    let url = 'http://localhost:1972/api/seasonDivisions/2017-2/fixtures?sort=fixtureDate';
    this.getFixtures(url);
  }


  // ********************************************************************************************************
  //           Data Load Methods
  // ********************************************************************************************************

  private getFixtures(url: string): void {
    this.seasonDivisionFixtureService.getFixtures(url)
      .subscribe(
        fixtures => this.onInitialLoadOfFixtures(fixtures),
        error => this.errorMessage = <any>error
    );
  }

  private onInitialLoadOfFixtures (fixtureDateMap: Map<string, Fixture[]>): void {
    console.log("Loaded fixtures: " + fixtureDateMap.size);
    this.fixtureDateMap = fixtureDateMap;

    fixtureDateMap.forEach((value: Fixture[], key: string) => {
      this.fixtureDates.push(key);
    });
  }

  public getFixturesForDate(fixtureDate: string) {
    return this.fixtureDateMap.get(fixtureDate);
  }
}
