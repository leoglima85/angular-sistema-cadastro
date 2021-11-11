import { TestBed } from '@angular/core/testing';

import { FireauthservService } from './fireauthserv.service';

describe('FireauthservService', () => {
  let service: FireauthservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireauthservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
