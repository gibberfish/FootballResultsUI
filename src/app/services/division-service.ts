import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Division } from '../models/division';

@Injectable()
export class DivisionService {
  private divisionUrl = 'http://localhost:1972/api/divisions'

  constructor (private http: Http) {}

  getDivisions(): Observable<Division[]> {
    return this.http.get(this.divisionUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response): Division[] {
    const body = res.json().data as Division[];
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
