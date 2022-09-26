import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitacionesComponent } from './limitaciones.component';

describe('LimitacionesComponent', () => {
  let component: LimitacionesComponent;
  let fixture: ComponentFixture<LimitacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
