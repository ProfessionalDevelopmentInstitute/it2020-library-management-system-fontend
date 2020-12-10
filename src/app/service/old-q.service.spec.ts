import { TestBed } from '@angular/core/testing';

import { OldQService } from './old-q.service';

describe('OldQService', () => {
  let service: OldQService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldQService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
