import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { Produit } from './models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class MoteurService {  

  private produits: Produit[];
  private filteredProduits: Subject<Produit[]> = 
    new ReplaySubject<Produit[]>(1);

  getSearchResults(): Observable<Produit[]> {
    return this.filteredProduits.asObservable();
  }

  search(searchTerm: string): Observable<void> {
    return this.fetchProduits().pipe(
      tap((produits: Produit[]) => {
        produits = produits.filter(produit => produit.nom.toLowerCase().includes(searchTerm));
        this.filteredProduits.next(produits);
      }),
      map(() => void 0)
    );
  }

  private fetchProduits(): Observable<Produit[]> {
    if (this.produits) {
      return of(this.produits);
    }
    
    const produits: Produit[] = [
      { name: 'Lorem ipsum' },
      { name: 'dolor sit amet' },
      { name: 'consectetur adipiscing elit' },
      { name: 'Donec at feugiat' }
    ];

    return of(produits).pipe(
      delay(1000),
      tap((produits: Produit[]) => this.produits = produits)
    );
  }
}