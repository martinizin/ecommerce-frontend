import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCuentaBancariaComponent } from './formulario-cuenta-bancaria.component';

describe('FormularioCuentaBancariaComponent', () => {
  let component: FormularioCuentaBancariaComponent;
  let fixture: ComponentFixture<FormularioCuentaBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCuentaBancariaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioCuentaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
