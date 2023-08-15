import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HeroService } from 'app/hero.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService: any;

  beforeEach(async () => {
    // heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    heroService = TestBed.inject(HeroService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('for subscribe method in getHeroes', fakeAsync(() => {
    let spy = spyOn(heroService, 'getHeroes').and.returnValue(of([]));
    let subSpy = spyOn(heroService.getHeroes(), 'subscribe');
    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
  }));
});
