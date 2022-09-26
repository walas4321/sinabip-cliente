import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlRegistroSDRCComponent } from './control-registro-sdrc.component';

describe('ControlRegistroSDRCComponent', () => {
  let component: ControlRegistroSDRCComponent;
  let fixture: ComponentFixture<ControlRegistroSDRCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlRegistroSDRCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlRegistroSDRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
