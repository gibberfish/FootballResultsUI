import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Division } from '../models/division';

@Injectable()
export class DivisionService {
  private divisionUrl = 'http://localhost:1972/api/divisions'

  private divisionCache: Map<string, Division> = null;

  constructor (private http: Http) {}

  public getDivisions(): Observable<Map<string, Division>> {
    if (this.divisionCache == null) {
      console.log("Loading Divisions");
      return this.loadDivisions();
    } else {
      console.log("Getting Divisions from cache");
      return this.getCachedDivisions();
    }
  }

  private loadDivisions(): Observable<Map<string, Division>> {
    return this.http.get(this.divisionUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private getCachedDivisions(): Observable<Map<string, Division>> {
    var cachedObservable: Observable<Map<string, Division>> = new Observable<Map<string, Division>> (observer => {
      observer.next(this.divisionCache);
      observer.complete();
    });

    return cachedObservable;
  }

  private extractData(res: Response): Map<string, Division> {
    const divisions = res.json().data as Division[];

    let divisionsMap: Map<string, Division> = new Map<string, Division>();

    for (var i in divisions) {
      var division: Division = divisions[i];
      divisionsMap.set(division.id, division);
    }  

    // Cache the results
    this.divisionCache = divisionsMap;

    return divisionsMap;
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
