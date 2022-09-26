import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPrediosWebComponent } from './listado-predios-web.component';

describe('ListadoPrediosWebComponent', () => {
  let component: ListadoPrediosWebComponent;
  let fixture: ComponentFixture<ListadoPrediosWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoPrediosWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPrediosWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
