import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Fixture } from '../models/fixture';
import { FixtureDate } from '../models/fixture'; // <-- Not sure I can use this yet

@Injectable()
export class SeasonDivisionFixtureService {

  constructor (private http: Http) {}

  getFixtures(seasonDivisionFixturesUrl): Observable<Map<string, Fixture[]>> {
    return this.http.get(seasonDivisionFixturesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response): Map<string, Fixture[]> {
    const body = res.json().data as Fixture[];

    let fixtureDateMap: Map<string, Fixture[]> = new Map<string, Fixture[]>();
    
    for (var i in body) {
      var fixture: Fixture = body[i];
      var fixtureDate: string = fixture.attributes.fixtureDate;

      if (!fixtureDateMap.get(fixtureDate)) {
        let newFixtureArray: Array<Fixture> = [];
        fixtureDateMap.set(fixtureDate, newFixtureArray);
      }

      let fixtures: Array<Fixture> = fixtureDateMap.get(fixtureDate);
      fixtures.push(fixture);
      //console.log("fixtureDate: " + fixtureDate + " = " + fixtures.length);
    }

    // console.log("FixtureDateMap, size = " + fixtureDateMap.size);
    // console.log("FixtureDateMap, entries = " + fixtureDateMap.entries);
    // console.log("FixtureDateMap, values = " + fixtureDateMap.values);

    return fixtureDateMap;
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
