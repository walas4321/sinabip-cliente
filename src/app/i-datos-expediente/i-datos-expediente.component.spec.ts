import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IDatosExpedienteComponent } from './i-datos-expediente.component';

describe('IDatosExpedienteComponent', () => {
  let component: IDatosExpedienteComponent;
  let fixture: ComponentFixture<IDatosExpedienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDatosExpedienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDatosExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
