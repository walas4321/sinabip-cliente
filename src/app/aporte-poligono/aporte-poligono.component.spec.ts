import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AportePoligonoComponent } from './aporte-poligono.component';

describe('AportePoligonoComponent', () => {
  let component: AportePoligonoComponent;
  let fixture: ComponentFixture<AportePoligonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AportePoligonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AportePoligonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
