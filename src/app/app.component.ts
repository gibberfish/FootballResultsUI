import { Component, OnInit } from '@angular/core';
import { Division } from './models/division';
import { DivisionService } from './services/division-service';
import { Team } from './models/team';
import { TeamService } from './services/team-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DivisionService, TeamService]
})
export class AppComponent {
  title = 'Football Results Analyser';
  errorMessage: string;
  divisions: {};
  teams: {};

  constructor(private divisionService: DivisionService, private teamService: TeamService) {
  }

  ngOnInit(): void {
  //  this.divisions = {};
  //  this.teams = {};
  //  this.getDivisions();

    //this.teamService.getTeams();
    //setTimeout(() => {this.teamService.getTeam('69');} ,5000);
  }

  // getDivisions(): void {
  //   this.divisionService.getDivisions()
  //     .subscribe(
  //       divisions => this.setDivisions(divisions),
  //       error => this.errorMessage = <any>error,
  //       () => {console.log("Divisions: " + Object.keys(this.divisions).length)}
  //   );
  // }

  // setDivisions (divisions: Division[]) {
  //   for (let division of divisions) {
  //     let divisionId: string = '' + division.id;
  //     this.divisions[divisionId] = division.attributes.divisionName;
  //   }
  // } 
}