import { TestBed } from '@angular/core/testing';

import { CommonLocalStorageService } from './common-local-storage.service';

describe('CommonLocalStorageService', () => {
  let service: CommonLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
