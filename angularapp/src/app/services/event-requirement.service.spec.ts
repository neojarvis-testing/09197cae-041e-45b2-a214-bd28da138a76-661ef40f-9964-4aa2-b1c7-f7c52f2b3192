import { TestBed } from '@angular/core/testing';

import { EventRequirementService } from './event-requirement.service';

describe('EventRequirementService', () => {
  let service: EventRequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventRequirementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
