import { TestBed } from '@angular/core/testing';

import { ObrasService } from './obras.service';

describe('ObrasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObrasService = TestBed.get(ObrasService);
    expect(service).toBeTruthy();
  });
});
