import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstandarizacionComponent } from './estandarizacion.component';

describe('EstandarizacionComponent', () => {
  let component: EstandarizacionComponent;
  let fixture: ComponentFixture<EstandarizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstandarizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstandarizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
