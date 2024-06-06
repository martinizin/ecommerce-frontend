import { TestBed } from '@angular/core/testing';

import { ListadoProductosService } from './listado-productos.service';

describe('ListadoProductosService', () => {
  let service: ListadoProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadoProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
