import { TestBed } from '@angular/core/testing';

import { AddRemoveContactsService } from './add-remove-contacts.service';

describe('AddRemoveContactsService', () => {
  let service: AddRemoveContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRemoveContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
