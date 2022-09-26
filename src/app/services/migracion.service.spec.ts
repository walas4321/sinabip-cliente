import { TestBed, inject } from '@angular/core/testing';

import { MigracionService } from './migracion.service';

describe('SinabipmueblesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MigracionService]
    });
  });

  it('should be created', inject([MigracionService], (service: MigracionService) => {
    expect(service).toBeTruthy();
  }));
});
