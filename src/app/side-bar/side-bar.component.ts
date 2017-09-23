import { Component, OnInit } from '@angular/core';
import { Season } from '../models/season';
import { SeasonService } from '../services/season.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  providers: [SeasonService]
})
export class SideBarComponent implements OnInit {
  seasons: Season[];
  selectedSeason: Season;
  errorMessage: string;

  constructor(private seasonService: SeasonService) { }

  onSelect(season: Season): void {
    this.selectedSeason = season;
  }

  getSeasons(): void {
    this.seasonService.getSeasons()
      .subscribe(
        seasons => this.seasons = seasons,
        error => this.errorMessage = <any>error
    );
  }

  ngOnInit(): void {
    this.getSeasons();
  }
}
