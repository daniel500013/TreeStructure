/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TreeService } from './Tree.service';

describe('Service: Tree', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeService]
    });
  });

  it('should ...', inject([TreeService], (service: TreeService) => {
    expect(service).toBeTruthy();
  }));
});
