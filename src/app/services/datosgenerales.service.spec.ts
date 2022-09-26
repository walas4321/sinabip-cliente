import { TestBed } from '@angular/core/testing';

import { DatosgeneralesService } from './datosgenerales.service';

describe('DatosgeneralesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatosgeneralesService = TestBed.get(DatosgeneralesService);
    expect(service).toBeTruthy();
  });
});
