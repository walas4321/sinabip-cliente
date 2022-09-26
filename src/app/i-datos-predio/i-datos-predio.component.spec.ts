import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IDatosPredioComponent } from './i-datos-predio.component';

describe('IDatosPredioComponent', () => {
  let component: IDatosPredioComponent;
  let fixture: ComponentFixture<IDatosPredioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDatosPredioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDatosPredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
