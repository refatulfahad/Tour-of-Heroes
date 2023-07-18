import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { HeroService } from 'app/hero.service';
import { Hero } from 'app/hero';
import { Observable, defer, of } from 'rxjs';
import { inject } from '@angular/core';
import { AppRoutingModule } from 'app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockHeroes:Hero[];
  beforeEach(async () => {
    mockHeroes=[
       {id: 21, name: 'Riyad Hero'},
       {id:2,name:"riham"},
       {id:3,name:"riyad"},
       {id:4,name:"rafat"},
       {id:5,name:"rafid"}
    ]
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes','addHero']);
    await TestBed.configureTestingModule({
      
      declarations: [ HeroesComponent ],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      imports:[BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    
    mockHeroService=TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call addHero', () => {
    //Arrange
    mockHeroService.addHero.and.returnValue(of(mockHeroes[0]));
    // Act
    component.onAddHeroesClick();
    // Assert
    expect(mockHeroService.addHero).toHaveBeenCalled();
  });

});
