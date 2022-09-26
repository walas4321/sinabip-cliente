import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPrediosComponent } from './registro-predios.component';

describe('RegistroPrediosComponent', () => {
  let component: RegistroPrediosComponent;
  let fixture: ComponentFixture<RegistroPrediosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPrediosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPrediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
