import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { shareReplay } from 'rxjs';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a message when add is called',()=>{
     service.add("Today is friday");
     expect(service.messages.length).toBe(1);
  });

  it('should clear the message when clear() will be called',()=>{
     service.clear();
     expect(service.messages.length).toBe(0);
  });
});
