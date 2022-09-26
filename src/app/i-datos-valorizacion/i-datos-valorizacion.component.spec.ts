import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IDatosValorizacionComponent } from './i-datos-valorizacion.component';

describe('IDatosValorizacionComponent', () => {
  let component: IDatosValorizacionComponent;
  let fixture: ComponentFixture<IDatosValorizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDatosValorizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDatosValorizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
