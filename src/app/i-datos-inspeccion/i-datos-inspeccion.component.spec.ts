import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IDatosInspeccionComponent } from './i-datos-inspeccion.component';

describe('IDatosInspeccionComponent', () => {
  let component: IDatosInspeccionComponent;
  let fixture: ComponentFixture<IDatosInspeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDatosInspeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDatosInspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
