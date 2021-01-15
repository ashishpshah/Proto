/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Client_commonService } from './client_common.service';

describe('Service: Client_common', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Client_commonService]
    });
  });

  it('should ...', inject([Client_commonService], (service: Client_commonService) => {
    expect(service).toBeTruthy();
  }));
});
