import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTecnicosComponent } from './datos-tecnicos.component';

describe('DatosTecnicosComponent', () => {
  let component: DatosTecnicosComponent;
  let fixture: ComponentFixture<DatosTecnicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosTecnicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
