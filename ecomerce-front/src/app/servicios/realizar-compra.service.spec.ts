import { TestBed } from '@angular/core/testing';

import { RealizarCompraService } from './realizar-compra.service';

describe('RealizarCompraService', () => {
  let service: RealizarCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealizarCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
