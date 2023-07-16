import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { HeroService } from 'app/hero.service';
import { Hero } from 'app/hero';
import { Observable, defer, of } from 'rxjs';
import { inject } from '@angular/core';

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
    const spyHeroService = jasmine.createSpyObj('HeroService', ['getHeroes','addHero']);
    await TestBed.configureTestingModule({
      
      declarations: [ HeroesComponent ],
      providers: [{ provide: HeroService, useValue: spyHeroService }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockHeroService=TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
  });

  it('should create', () => {
    let spy=spyOn(mockHeroService,'getHeroes').and.returnValue(of([]));
    let subSpy=spyOn(mockHeroService.getHeroes(),'subscribe');
    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });
  
  it('should call addHero', () => {
    mockHeroService.addHero.and.returnValue(asyncData(mockHeroes[0]));
    // Act
    component.onAddHeroesClick();
    
    // Assert
    expect(mockHeroService.addHero).toHaveBeenCalledWith(mockHeroes[0]);
  });

});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}