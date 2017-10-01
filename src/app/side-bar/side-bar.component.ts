import { Component, OnInit } from '@angular/core';
import { Season } from '../models/season';
import { SeasonDivision } from '../models/season-division';
import { SeasonService } from '../services/season.service';
import { SeasonDivisionService } from '../services/season-division.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  providers: [SeasonService, SeasonDivisionService]
})
export class SideBarComponent implements OnInit {
  seasons: Season[];
  seasonDivisions: SeasonDivision[];
  selectedSeason: Season;
  errorMessage: string;
  selectedDivision: String;

  constructor(private seasonService: SeasonService, private seasonDivisionService: SeasonDivisionService) { }

  onSelect(season: Season): void {
    this.selectedSeason = season;
  }

  getSeasons(): void {
    this.seasonService.getSeasons()
      .subscribe(
        seasons => this.setSeasons(seasons),
        error => this.errorMessage = <any>error,
        () => this.selectSeason()
    );
  }

  setSeasons(seasons: Season[]) {
    console.log(seasons);
    this.seasons = seasons;
  }

  getSeasonDivisions(url: String): void {
    this.seasonDivisionService.getSeasonDivisions(url)
      .subscribe(
        seasonDivisions => this.seasonDivisions = seasonDivisions,
        error => this.errorMessage = <any>error,
        () => this.selectDivision()
    );
  }

  selectSeason(): void {
    // For now, only default the value in the drop-down
    // Eventually, we'll also need to trigger the loading of the divisions
    this.selectedSeason = this.seasons[0];

    console.log("Selected season: id = " + this.selectedSeason.id);
//    console.log("Selected season: url = " + this.selectedSeason.divisionUrl);

    //this.getSeasonDivisions(this.selectedSeason.divisionUrl);
  }

  selectDivision(): void {
    //TODO Implement this
  }

  ngOnInit(): void {
    this.getSeasons();
  }
}
