import { TestBed } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';
import { Hero } from './hero';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('call createDb', () => {
    let result = service.createDb();
    expect(result).toBeTruthy();
  });

  it('call genId', () => {
    const data: Hero[] = [
      { id: 1, name: "Refat" }
    ];
    let result = service.genId(data);
    expect(result).toBeTruthy();
  });

  it('call genId', () => {
    const data: Hero[] = [];
    let result = service.genId(data);
    expect(result).toEqual(11);
  });
});
