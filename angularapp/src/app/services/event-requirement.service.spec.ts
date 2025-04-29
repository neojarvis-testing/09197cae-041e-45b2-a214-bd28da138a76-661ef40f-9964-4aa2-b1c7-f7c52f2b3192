import { TestBed } from '@angular/core/testing';

import { EventRequirementService } from './event-requirement.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventRequirementService', () => {
  let service: EventRequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EventRequirementService);
  });

  fit('Frontend_should_create_event_requirement_service', () => {
    expect(service).toBeTruthy();
  });
});
