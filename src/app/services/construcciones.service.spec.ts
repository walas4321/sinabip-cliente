import { TestBed } from '@angular/core/testing';

import { ConstruccionesService } from './construcciones.service';

describe('ConstruccionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConstruccionesService = TestBed.get(ConstruccionesService);
    expect(service).toBeTruthy();
  });
});
