import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionVerificacionComponent } from './confirmacion-verificacion.component';

describe('ConfirmacionVerificacionComponent', () => {
  let component: ConfirmacionVerificacionComponent;
  let fixture: ComponentFixture<ConfirmacionVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionVerificacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmacionVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
