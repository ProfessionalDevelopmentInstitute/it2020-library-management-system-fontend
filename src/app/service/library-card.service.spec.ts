import { TestBed } from '@angular/core/testing';

import { LibraryCardService } from './library-card.service';

describe('LibraryCardService', () => {
  let service: LibraryCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
