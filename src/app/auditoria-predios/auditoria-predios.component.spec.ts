import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaPrediosComponent } from './auditoria-predios.component';

describe('AuditoriaprediosComponent', () => {
  let component: AuditoriaPrediosComponent;
  let fixture: ComponentFixture<AuditoriaPrediosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaPrediosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaPrediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
