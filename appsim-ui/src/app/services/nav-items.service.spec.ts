import { TestBed } from '@angular/core/testing';

import { NavItemsService } from './nav-items.service';

describe('NavItemsService', () => {
  let service: NavItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
