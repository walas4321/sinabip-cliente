import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrediosIncorporadosComponent } from './predios-incorporados.component';

describe('PrediosIncorporadosComponent', () => {
  let component: PrediosIncorporadosComponent;
  let fixture: ComponentFixture<PrediosIncorporadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrediosIncorporadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrediosIncorporadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
