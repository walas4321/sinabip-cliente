import { TestBed } from '@angular/core/testing';

import { LimitacionesService } from './limitaciones.service';

describe('LimitacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LimitacionesService = TestBed.get(LimitacionesService);
    expect(service).toBeTruthy();
  });
});
