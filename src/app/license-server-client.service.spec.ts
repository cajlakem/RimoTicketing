import { TestBed } from '@angular/core/testing';

import { LicenseServerClientService } from './license-server-client.service';

describe('LicenseServerClientService', () => {
  let service: LicenseServerClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenseServerClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
