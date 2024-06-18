import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisVentasComponent } from './mis-ventas.component';

describe('MisVentasComponent', () => {
  let component: MisVentasComponent;
  let fixture: ComponentFixture<MisVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisVentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
