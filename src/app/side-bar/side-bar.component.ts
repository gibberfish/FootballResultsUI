import { Component, OnInit } from '@angular/core';
import { Season } from '../models/season';
import { Division } from '../models/division';
import { Team } from '../models/team';
import { SeasonDivision } from '../models/season-division';
import { RelationshipData } from '../models/season-division';
import { SeasonService } from '../services/season-service';
import { SeasonDivisionService } from '../services/season-division.service';
import { SeasonDivisionTeamService } from '../services/season-division-team.service';
import { TeamService } from '../services/team-service';
import { DivisionService } from '../services/division-service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  providers: [SeasonService, SeasonDivisionService, TeamService, DivisionService, SeasonDivisionTeamService]
})
export class SideBarComponent implements OnInit {
  seasons: Season[];
  divisions: Map<string, Division>;
  teams: Map<string, Team>;
  divisionsForSelectedSeason: SeasonDivision[];

  selectedSeason: Season;
  selectedDivision: SeasonDivision;
  
  errorMessage: string;

  constructor(private seasonService: SeasonService, private seasonDivisionService: SeasonDivisionService,
     private teamService: TeamService, private divisionService: DivisionService,
     private seasonDivisionTeamService: SeasonDivisionTeamService) { }

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
        () => this.selectSeason(this.seasons[0])
    );
  }

  private onInitialLoadOfSeasons (seasons: Season[]): void {
    console.log("Loaded seasons");
    this.seasons = seasons
  }

  private getSeasonDivisions(url: String): void {
    console.log("Getting SeasonDivisions from: " + url);
    this.seasonDivisionService.getSeasonDivisions(url)
      .subscribe(
        seasonDivisions => this.onLoadOfDivisionsForSelectedSeason(seasonDivisions),
        error => this.errorMessage = <any>error,
        () => this.selectTopDivision()
    );
  }

  private onLoadOfDivisionsForSelectedSeason(seasonDivisions: SeasonDivision[]) {
    console.log("Loaded divisions for season");

    this.divisionsForSelectedSeason = seasonDivisions.sort(function(a: SeasonDivision,b: SeasonDivision){
      return a.attributes.position - b.attributes.position;
    });

    var divisions = this.divisions;

    this.divisionsForSelectedSeason.forEach((arrayItem) => {
      arrayItem.relationships.division.data.name = divisions.get(arrayItem.relationships.division.data.id).attributes.divisionName;
      console.log("Got division: " + arrayItem.relationships.division.data.name);
      console.log("Position: " + arrayItem.attributes.position);
      
      // Also get the teams for each division here
      let teamsUrl = arrayItem.relationships.teams.links.related;

      this.getSeasonDivisionTeams(arrayItem, teamsUrl);
    });


  }

  private getSeasonDivisionTeams(seasonDivision: SeasonDivision, url: String): void {
    this.seasonDivisionTeamService.getSeasonDivisionTeams(url)
      .subscribe(
        teams => this.onLoadOfTeamsForSelectedDivisionAndSeason(seasonDivision, teams),
        error => this.errorMessage = <any>error,
        () => this.selectTopDivision()
    );
  }

  private onLoadOfTeamsForSelectedDivisionAndSeason (seasonDivison: SeasonDivision, teams: Team[]): void {
    console.log("Loaded teams for division");
    
    teams.sort(function(a: Team,b: Team){
      return a.attributes.teamName.localeCompare(b.attributes.teamName);
    });

    seasonDivison.relationships.teams.data = teams;
  }

  // ********************************************************************************************************
  //           Selection Methods
  // ********************************************************************************************************
  private selectSeason(season: Season): void {
    this.selectedSeason = season;

    let url = this.selectedSeason.relationships.seasonDivisions.links.related;

    this.getSeasonDivisions(url);
  }

  private selectTopDivision(): void {
    this.selectedDivision = this.divisionsForSelectedSeason[0];

    // let url = this.selectedDivision.relationships.teams.links.related;
    // this.getSeasonDivisionTeams(url);

    //TODO Implement this
  }

  public onSelect (season: Season): void {
    console.log("Registered onSelect event: " + season.id);
    this.selectSeason(season);    
  }
}
