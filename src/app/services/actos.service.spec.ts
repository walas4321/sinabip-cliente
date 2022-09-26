import { TestBed } from '@angular/core/testing';

import { ActosService } from './actos.service';

describe('ActosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActosService = TestBed.get(ActosService);
    expect(service).toBeTruthy();
  });
});
