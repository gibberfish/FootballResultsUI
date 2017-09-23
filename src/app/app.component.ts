import { Component, OnInit } from '@angular/core';
import { Division } from './division';
import { DivisionService } from './division.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DivisionService]
})
export class AppComponent {
  title = 'Football Results Analyser';
}
