import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

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
  let mockHeroService: any;


  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [HeroesComponent],
      providers: [HeroService],
      imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    mockHeroService = TestBed.inject(HeroService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('for subscribe method in getHeroes', fakeAsync(() => {
    let spy = spyOn(mockHeroService, 'getHeroes').and.returnValue(of([]));
    let subSpy = spyOn(mockHeroService.getHeroes(), 'subscribe');
    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
  }));

  it('test Heroes member', () => {
    spyOn(mockHeroService, 'getHero').and.returnValue(of([]));
    component.getHeroes();
    expect(component.Heroes).toBeTruthy();

    expect(component.Heroes.length).toEqual(9);
    expect(component.Heroes[0].id).toEqual(12);
  });

  it('for subscribe method in onAddHeroesClick', fakeAsync(() => {
    let spy = spyOn(mockHeroService, 'addHero').and.returnValue(of([]));
    let subSpy = spyOn(mockHeroService.addHero(), 'subscribe');
    component.onAddHeroesClick();
    tick();
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
  }));

  it('test newHero member', () => {
    const test = { id: 21, name: 'Riyad Hero' };
    spyOn(mockHeroService, 'addHero').and.returnValue(of(test));
    component.onAddHeroesClick();
    expect(component.newHero).toBeTruthy();
    expect(component.newHero.id).toEqual(21);
  });

  it('should calculate the sum of two numbers', () => {
    const num1 = 5;
    const num2 = 10;
    const expectedResult = num1 + num2;
    let result = component.calculate(num1, num2);
    expect(result).toEqual(expectedResult);
  });

});
