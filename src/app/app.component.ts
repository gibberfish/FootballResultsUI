import { Component, OnInit } from '@angular/core';
import { Division } from './models/division';
import { DivisionService } from './services/division-service';
import { Team } from './models/team';
import { TeamService } from './services/team-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DivisionService]
})
export class AppComponent {
  title = 'Football Results Analyser';
  errorMessage: string;
  divisions: {};
  teams: {};

  constructor(private divisionService: DivisionService, private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.getDivisions();
    this.getTeams();
  }

  getTeams(): void {
      this.teamService.getTeams()
      .subscribe(
        teams => this.setTeams(teams),
        error => this.errorMessage = <any>error,
        () => {console.log("Teams: " + Object.keys(this.teams).length)}
    );
  }

  getDivisions(): void {
    this.divisionService.getDivisions()
      .subscribe(
        divisions => this.setDivisions(divisions),
        error => this.errorMessage = <any>error,
        () => {console.log("Divisions: " + Object.keys(this.divisions).length)}
    );
  }

  setDivisions (divisions: Division[]) {
    for (let division of divisions) {
      this.divisions[division.id] = division.attributes.divisionName;
    }
  }

  setTeams (teams: Team[]) {
    for (let team of teams) {
      this.teams[team.id] = team.attributes.teamName;
    }
  }  
}