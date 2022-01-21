import { TestBed } from '@angular/core/testing';

import { GlobalSearchServiceService } from './global-search-service.service';

describe('GlobalSearchServiceService', () => {
  let service: GlobalSearchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalSearchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
