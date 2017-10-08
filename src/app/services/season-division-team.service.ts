import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Team } from '../models/team';

@Injectable()
export class SeasonDivisionTeamService {

  constructor (private http: Http) {}

  getSeasonDivisionTeams(seasonDivisionTeamUrl): Observable<Team[]> {
    return this.http.get(seasonDivisionTeamUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response): Team[] {
    const body = res.json().data as Team[];
    return body;
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
