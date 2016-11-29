import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';


/* Feature Modules */
import { MemoryGameComponent } from './memoryGame/MemoryGameComponent';
import {MemoryGameService} from './memoryGame/memoryGameService';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'startGame', pathMatch: 'full' },
      { path: '**', redirectTo: 'startGame', pathMatch: 'full' },
      { path: 'startGame', component: MemoryGameComponent },
    ])
  ],
  declarations: [
    AppComponent, MemoryGameComponent  ],
  bootstrap: [ AppComponent ],
  providers: [MemoryGameService]
})
export class AppModule { }
