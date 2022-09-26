import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IDatosCaracteristicasComponent } from './i-datos-caracteristicas.component';

describe('IDatosCaracteristicasComponent', () => {
  let component: IDatosCaracteristicasComponent;
  let fixture: ComponentFixture<IDatosCaracteristicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDatosCaracteristicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDatosCaracteristicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
