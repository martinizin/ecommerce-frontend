import { TestBed } from '@angular/core/testing';

import { ListadoUsuariosService } from './listado-usuarios.service';

describe('ListadoUsuariosService', () => {
  let service: ListadoUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadoUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
