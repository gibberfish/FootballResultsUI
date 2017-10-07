import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Team } from '../models/team';

@Injectable()
export class TeamService {
  private teamUrl = 'http://localhost:1972/api/teams'

  private teamCache: Map<string, Team> = null;

  constructor (private http: Http) {}


  public getTeams(): Observable<Map<string, Team>> {
    if (this.teamCache == null) {
      console.log("Loading Teams");
      return this.loadTeams();
    } else {
      console.log("Getting Teams from cache");
      return this.getCachedTeams();
    }
  }

  private loadTeams(): Observable<Map<string, Team>> {
    return this.http.get(this.teamUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private getCachedTeams(): Observable<Map<string, Team>> {
    var cachedObservable: Observable<Map<string, Team>> = new Observable<Map<string, Team>> (observer => {
      observer.next(this.teamCache);
      observer.complete();
    });

    return cachedObservable;
  }

  private extractData(res: Response): Map<string, Team> {
    const Teams = res.json().data as Team[];

    let TeamsMap: Map<string, Team> = new Map<string, Team>();

    for (var i in Teams) {
      var Team: Team = Teams[i];
      TeamsMap.set(Team.id, Team);
    }  

    // Cache the results
    this.teamCache = TeamsMap;

    return TeamsMap;
  }

  // constructor (private http: Http) {
  //   this.teamMapObservable = this.http.get(this.teamUrl)
  //     .map(res => {
  //       const body = res.json().data as Team[];
  //       return body;
  //     })
  //     .catch(this.handleError);
  // }

  // public getTeamById(teamId): Team {


  //   if (this.teamMap.size == 0) {
  //     this.loadTeams(() => {
  //       console.log("In the callback after loading teams");
  //       return this.teamMap.get(teamId);
  //     });
  //   }

  //   // NO!!! This will not wait for the observable to complete - going round in circles here
  //   // The calling client will need to invoke this as an observable (subscribe to it)
  //   // Which means most of this crap will come out of the class
  //   return this.teamMap.get(teamId);
  // }

  // private loadTeams(doneCallback) {
  //   console.log("About to load teams");
  //   this.teamMapObservable.subscribe(
  //     teams => {
  //       console.log("Converting " + teams.length + " teams into a map");
  //       for (var i in teams) {
  //         var team: Team = teams[i];
  //         this.teamMap.set(team.id, team);
  //       }  
  //     },
  //     error => {console.error(error);},
  //     () => doneCallback
  //   );  
  // }

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
