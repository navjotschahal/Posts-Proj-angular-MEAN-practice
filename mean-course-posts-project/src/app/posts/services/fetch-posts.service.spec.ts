import { TestBed } from '@angular/core/testing';

import { FetchPostsService } from './fetch-posts.service';

describe('FetchPostsService', () => {
  let service: FetchPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
