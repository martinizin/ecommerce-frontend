import { TestBed } from '@angular/core/testing';

import { AgregarCategoriasService } from './agregar-categorias.service';

describe('AgregarCategoriasService', () => {
  let service: AgregarCategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarCategoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
