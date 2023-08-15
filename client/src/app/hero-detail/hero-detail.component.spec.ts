import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HeroService } from 'app/hero.service';
import { Hero } from 'app/hero';
import { By } from '@angular/platform-browser';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: any;
  let mockLocation: jasmine.SpyObj<any>;
  beforeEach(async () => {
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [HeroService, { provide: Location, useValue: mockLocation }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    heroService = TestBed.inject(HeroService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('for subscribe method in getHero', fakeAsync(() => {
    let spy = spyOn(heroService, 'getHero').and.returnValue(of([]));
    let subSpy = spyOn(heroService.getHero(), 'subscribe');
    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
  }));

  it('inside subscribe method', () => {
    const testHero: Hero = {
      id: 1,
      name: "Refat"
    }
    spyOn(heroService, 'getHero').and.returnValue(of(testHero));
    component.getHero();
    expect(component.hero).toBeTruthy();
    expect(component.hero?.name).toEqual('Refat');
  });

  it('should call goBack method', () => {
    // let button = fixture.debugElement.query(By.css('button'));
    // button.nativeElement.click();
    // expect(component.goBack).toHaveBeenCalled();
    // component.goBack();
    // fixture.detectChanges();
    // console.log(mockLocation.back);
    // expect(mockLocation.back).toHaveBeenCalled();
  });
});
