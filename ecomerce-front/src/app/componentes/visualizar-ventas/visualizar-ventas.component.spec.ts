import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarVentasComponent } from './visualizar-ventas.component';

describe('VisualizarVentasComponent', () => {
  let component: VisualizarVentasComponent;
  let fixture: ComponentFixture<VisualizarVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarVentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
