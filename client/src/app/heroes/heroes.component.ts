import { Component, OnInit } from '@angular/core';
import { HeroService } from 'app/hero.service';
import { Hero } from '../hero';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  Heroes: Hero[] = [];
  constructor(private heroService: HeroService) {
    
   }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(h => this.Heroes = h);
  }
  
}
