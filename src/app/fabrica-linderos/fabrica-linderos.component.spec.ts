import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricaLinderosComponent } from './fabrica-linderos.component';

describe('FabricaLinderosComponent', () => {
  let component: FabricaLinderosComponent;
  let fixture: ComponentFixture<FabricaLinderosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricaLinderosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricaLinderosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
