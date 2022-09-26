import { TestBed } from '@angular/core/testing';

import { SeguridadService } from './seguridad.service';

describe('SeguridadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeguridadService = TestBed.get(SeguridadService);
    expect(service).toBeTruthy();
  });
});
