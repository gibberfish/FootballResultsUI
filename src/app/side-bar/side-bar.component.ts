import { Component, OnInit } from '@angular/core';
import { Season } from '../models/season';
import { Division } from '../models/division';
import { Team } from '../models/team';
import { SeasonDivision } from '../models/season-division';
import { SeasonService } from '../services/season-service';
import { SeasonDivisionService } from '../services/season-division.service';
import { TeamService } from '../services/team-service';
import { DivisionService } from '../services/division-service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  providers: [SeasonService, SeasonDivisionService, TeamService, DivisionService]
})
export class SideBarComponent implements OnInit {
  seasons: Season[];
  divisions: Map<string, Division>;
  teams: Map<string, Team>;
  divisionsForSelectedSeason: SeasonDivision[];

  selectedSeason: Season;
  errorMessage: string;
  selectedDivision: String;
  

  constructor(private seasonService: SeasonService, private seasonDivisionService: SeasonDivisionService,
     private teamService: TeamService, private divisionService: DivisionService) { }

  ngOnInit(): void {
    /*
    Thoughts:
    (1) Load the divisions
    (2) On return from load divisions, load the teams
    (3) On return from load teams, load the seasons
    (4) On return from load seasons, load the divisions for season
    (5) On return from the load divisions for season, load the teams for the selected division
    */
    
    this.getDivisions();
  }
  


  // ********************************************************************************************************
  //           Data Load Methods
  // ********************************************************************************************************

  private getDivisions(): void {
    this.divisionService.getDivisions()
      .subscribe(
        divisions => this.onInitialLoadOfDivisions(divisions),
        error => this.errorMessage = <any>error
    );
  }

  private onInitialLoadOfDivisions (divisions: Map<string, Division>): void {
    console.log("Loaded divisions");
    this.divisions = divisions;

    this.getTeams();
  }

  private getTeams(): void {
    this.teamService.getTeams()
      .subscribe(
        teams => this.onInitialLoadOfTeams(teams),
        error => this.errorMessage = <any>error
    );
  }

  private onInitialLoadOfTeams (teams: Map<string, Team>): void {
    console.log("Loaded teams");
    this.teams = teams;

    this.getSeasons();
  }

  private getSeasons(): void {
    this.seasonService.getSeasons()
      .subscribe(
        seasons => this.onInitialLoadOfSeasons(seasons),
        error => this.errorMessage = <any>error,
        () => this.selectLatestSeason()
    );
  }

  private onInitialLoadOfSeasons (seasons: Season[]): void {
    console.log("Loaded seasons");
    this.seasons = seasons
  }

  private selectLatestSeason(): void {
    this.selectedSeason = this.seasons[0];

    let url = this.selectedSeason.relationships.seasonDivisions.links.related;

    this.getSeasonDivisions(url);
  }

  private getSeasonDivisions(url: String): void {
    this.seasonDivisionService.getSeasonDivisions(url)
      .subscribe(
        seasonDivisions => this.onLoadOfDivisionsForSelectedSeason(seasonDivisions),
        error => this.errorMessage = <any>error,
        () => this.selectDivision()
    );
  }

  private onLoadOfDivisionsForSelectedSeason(seasonDivisions: SeasonDivision[]) {
    console.log("Loaded divisions for season");
    this.divisionsForSelectedSeason = seasonDivisions;
  }

  private selectDivision(): void {
    //TODO Implement this
  }

  // onSelect(season: Season): void {
  //   this.selectedSeason = season;
  // }
  //
}
