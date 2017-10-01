import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { SeasonDivision } from '../models/season-division';

@Injectable()
export class SeasonDivisionService {
  private seasonUrl = 'http://localhost:1972/api/seasons?sort=-id'

  constructor (private http: Http) {}

  //TODO Need to ensure that the first season returned is set as the selectedSeason by default
  getSeasonDivisions(seasonDivisionUrl): Observable<SeasonDivision[]> {
    return this.http.get(seasonDivisionUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    console.log('Body: ' + JSON.stringify(body.data));
    return body.data || { };
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