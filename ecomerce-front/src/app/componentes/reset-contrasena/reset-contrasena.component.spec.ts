import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetContrasenaComponent } from './reset-contrasena.component';

describe('ResetContrasenaComponent', () => {
  let component: ResetContrasenaComponent;
  let fixture: ComponentFixture<ResetContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetContrasenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
