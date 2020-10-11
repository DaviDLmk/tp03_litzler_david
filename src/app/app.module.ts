import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ListeComponent } from './liste/liste.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { MoteurComponent } from './liste/moteur/moteur.component';
import { MoteurService } from './moteur.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, ListeComponent, MoteurComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ApiService, MoteurService]
})
export class AppModule { }
