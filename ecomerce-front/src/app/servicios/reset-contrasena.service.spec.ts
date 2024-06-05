import { TestBed } from '@angular/core/testing';

import { ResetContrasenaService } from './reset-contrasena.service';

describe('ResetContrasenaService', () => {
  let service: ResetContrasenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetContrasenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
