import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanasEmergentesComponent } from './ventanas-emergentes.component';

describe('VentanasEmergentesComponent', () => {
  let component: VentanasEmergentesComponent;
  let fixture: ComponentFixture<VentanasEmergentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanasEmergentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentanasEmergentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
