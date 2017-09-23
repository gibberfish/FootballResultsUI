import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpModule, JsonpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';

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
  declarations: [AppComponent, TopNavComponent]
})
export class AppModule { }
