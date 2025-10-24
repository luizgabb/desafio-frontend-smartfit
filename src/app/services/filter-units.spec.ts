import { TestBed } from '@angular/core/testing';

import { FilterUnits } from './filter-units';

describe('FilterUnits', () => {
  let service: FilterUnits;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterUnits);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
