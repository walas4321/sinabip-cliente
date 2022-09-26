import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectificacionComponent } from './rectificacion.component';

describe('RectificacionComponent', () => {
  let component: RectificacionComponent;
  let fixture: ComponentFixture<RectificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
