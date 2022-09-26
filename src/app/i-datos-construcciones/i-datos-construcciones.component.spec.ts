import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IDatosConstruccionesComponent } from './i-datos-construcciones.component';

describe('IDatosConstruccionesComponent', () => {
  let component: IDatosConstruccionesComponent;
  let fixture: ComponentFixture<IDatosConstruccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDatosConstruccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDatosConstruccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
