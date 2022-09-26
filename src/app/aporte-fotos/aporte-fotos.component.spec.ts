import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AporteFotosComponent } from './aporte-fotos.component';

describe('AporteFotosComponent', () => {
  let component: AporteFotosComponent;
  let fixture: ComponentFixture<AporteFotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AporteFotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AporteFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
