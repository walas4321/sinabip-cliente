import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiesgoDesastreComponent } from './riesgo-desastre.component';

describe('RiesgoDesastreComponent', () => {
  let component: RiesgoDesastreComponent;
  let fixture: ComponentFixture<RiesgoDesastreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiesgoDesastreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiesgoDesastreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
