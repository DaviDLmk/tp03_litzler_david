import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, of } from 'rxjs';
import {  map, tap } from 'rxjs/operators';

import { Produit } from './models/produit.model';
import { environnement } from '../environnements/environnement';

@Injectable({
  providedIn: 'root'
})
export class MoteurService {  

  private produits: Produit[];
  private lesProduits : Produit[];
  private filteredProduits: Subject<Produit[]> = 
    new ReplaySubject<Produit[]>(1);

  constructor(private http: HttpClient) { 
  }

  getFilteredProducts(): Observable<Produit[]> {
    return this.filteredProduits.asObservable();
  }

  search(filterWord: string, budget : string): Observable<void> {
    return this.fetchProduits().pipe(
      tap((produits: Produit[]) => {
        produits = produits.filter(produit => produit.nom.toLowerCase().includes(filterWord));
        this.filteredProduits.next(produits);
      }),
      tap((produits: Produit[]) => {
        if(Number(budget)>0){
          produits.forEach( leProduit => {
          
          if(Number(leProduit.prix) < Number(budget)){
            this.lesProduits.push(leProduit);
          }        
          });
          this.filteredProduits.next(this.lesProduits);
        }
      }),
      map(() => void 0)
    );
  }

  private fetchProduits(): Observable<Produit[]> {
    if (this.produits) {
      return of(this.produits);      
    }

    return this.http.get<Produit[]>(environnement.backendProduit).pipe(
      tap((produits: Produit[]) => this.produits = produits)      
    );
  }
}