import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaGraficaComponent } from './busqueda-grafica.component';

describe('BusquedaGraficaComponent', () => {
  let component: BusquedaGraficaComponent;
  let fixture: ComponentFixture<BusquedaGraficaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaGraficaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaGraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
