import { Component, OnInit } from '@angular/core';
import { MoteurService } from '../../moteur.service';

@Component({
  selector: 'app-moteur',
  templateUrl: './moteur.component.html',
  styleUrls: ['./moteur.component.css']
})
export class MoteurComponent implements OnInit {


  constructor(private moteurService: MoteurService) {
  }

  filterWord = '';

  ngOnInit() {
    this.moteurService.search(this.filterWord).subscribe();
  }

  onfilterWordChange(): void {
    this.moteurService.search(this.filterWord).subscribe();
  }

}