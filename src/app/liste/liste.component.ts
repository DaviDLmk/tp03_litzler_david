import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';
import { MoteurService } from '../moteur.service';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  produits : Observable<Produit[]>
  filterWord : string;

  constructor(private moteurService : MoteurService) { }

  ngOnInit() {
    this.produits = this.moteurService.getFilteredProducts();
  }

}