import { TestBed } from '@angular/core/testing';

import { ProtoServicesService } from './proto-services.service';

describe('ProtoServicesService', () => {
  let service: ProtoServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtoServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
