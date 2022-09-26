import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IDatosInformacionComponent } from './i-datos-informacion.component';

describe('IDatosInformacionComponent', () => {
  let component: IDatosInformacionComponent;
  let fixture: ComponentFixture<IDatosInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDatosInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDatosInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
