import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Season } from '../models/season';

@Injectable()
export class SeasonService {
  private seasonUrl = 'http://localhost:1972/api/seasons?sort=-id'

  constructor (private http: Http) {}

  //TODO This returns an array of generic objects, not Season objects - id works, but no other fields are picked up
  getSeasons(): Observable<Season[]> {
    return this.http.get(this.seasonUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response): Season[] {
    const body = res.json().data as Season[];
    //console.log('Body: ' + JSON.stringify(body.data));
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
