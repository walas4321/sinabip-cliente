import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSbnComponent } from './registro-sbn.component';

describe('RegistroSbnComponent', () => {
  let component: RegistroSbnComponent;
  let fixture: ComponentFixture<RegistroSbnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroSbnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSbnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
