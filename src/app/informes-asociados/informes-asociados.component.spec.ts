import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesAsociadosComponent } from './informes-asociados.component';

describe('InformesAsociadosComponent', () => {
  let component: InformesAsociadosComponent;
  let fixture: ComponentFixture<InformesAsociadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformesAsociadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
