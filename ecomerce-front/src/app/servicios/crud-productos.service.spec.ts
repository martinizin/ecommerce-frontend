import { TestBed } from '@angular/core/testing';

import { CrudProductosService } from './crud-productos.service';

describe('CrudProductosService', () => {
  let service: CrudProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
