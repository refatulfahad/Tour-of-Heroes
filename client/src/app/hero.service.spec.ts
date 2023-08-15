import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;
  let http: jasmine.SpyObj<HttpClient>;
  let messageService: MessageService;

  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, MessageService],
    });
    service = TestBed.inject(HeroService);
    messageService = TestBed.inject(MessageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should return expected heroes', () => {
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

    service.getHeroes().subscribe((data) => {
      expect(data).toBeTruthy();
    });
  });

  it('should call addHero method', () => {
    const newHero = { id: 3, name: 'Wonder Woman' };
    const initialHeroesCount = HEROES.length;

    const result = service.addHero(newHero);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((addedHero) => {
      expect(HEROES.length).toBe(initialHeroesCount + 1);
      expect(addedHero).toEqual(newHero);
    });

  });

  it('should call log method', () => {
    const spy = spyOn(messageService, 'add');
    service['log']('Delwar Hossain Sayeedi');
    expect(spy).toHaveBeenCalled();
  });
});
