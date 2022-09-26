import { TestBed } from '@angular/core/testing';

import { RegistroSbnService } from './registro-sbn.service';

describe('RegistroSbnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistroSbnService = TestBed.get(RegistroSbnService);
    expect(service).toBeTruthy();
  });
});
