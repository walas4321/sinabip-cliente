import { TestBed } from '@angular/core/testing';

import { ZonaService } from './zona.service';

describe('ZonaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZonaService = TestBed.get(ZonaService);
    expect(service).toBeTruthy();
  });
});
