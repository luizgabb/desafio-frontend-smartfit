import { TestBed } from '@angular/core/testing';

import { GetUnits } from './get-units';

describe('GetUnits', () => {
  let service: GetUnits;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUnits);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
