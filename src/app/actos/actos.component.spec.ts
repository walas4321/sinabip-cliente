import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActosComponent } from './actos.component';

describe('ActosComponent', () => {
  let component: ActosComponent;
  let fixture: ComponentFixture<ActosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
