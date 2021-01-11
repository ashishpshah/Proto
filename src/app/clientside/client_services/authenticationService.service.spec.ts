/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationServiceService } from './authenticationService.service';

describe('Service: AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationServiceService]
    });
  });

  it('should ...', inject([AuthenticationServiceService], (service: AuthenticationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
