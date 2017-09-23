import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpModule, JsonpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DateAnalysisComponent } from './date-analysis/date-analysis.component';
import { FixtureAnalysisComponent } from './fixture-analysis/fixture-analysis.component';
import { SummaryAnalysisComponent } from './summary-analysis/summary-analysis.component';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)],
    HttpModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  declarations: [AppComponent, TopNavComponent, SideBarComponent, DateAnalysisComponent,
    FixtureAnalysisComponent, SummaryAnalysisComponent]
})
export class AppModule { }
