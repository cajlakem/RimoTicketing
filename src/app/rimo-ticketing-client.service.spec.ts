import { TestBed } from '@angular/core/testing';

import { RimoTicketingClientService } from './rimo-ticketing-client.service';

describe('RimoTicketingClientService', () => {
  let service: RimoTicketingClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RimoTicketingClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
