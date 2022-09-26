import { TestBed } from '@angular/core/testing';

import { AdquisicionService } from './adquisicion.service';

describe('AdquisicionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdquisicionService = TestBed.get(AdquisicionService);
    expect(service).toBeTruthy();
  });
});
