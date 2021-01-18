/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShoppingcartService } from './shoppingcart.service';

describe('Service: Shoppingcart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingcartService]
    });
  });

  it('should ...', inject([ShoppingcartService], (service: ShoppingcartService) => {
    expect(service).toBeTruthy();
  }));
});
