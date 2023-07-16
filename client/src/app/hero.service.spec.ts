import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { of } from 'rxjs';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;
  let http:jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    http=jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, MessageService],
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    const expectedHeroes: Hero[] =
      [{ id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }];
  
    http.get.and.returnValue(of(expectedHeroes));
  
    service.getHeroes().subscribe({
      next: heroes => {
        expect(heroes)
          .withContext('expected heroes')
          .toEqual(expectedHeroes);
        done();
      },
      error: done.fail
    });
  });

});
