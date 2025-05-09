import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(EventService);
  });

  fit('Frontend_should_create_event_service', () => {
    expect(service).toBeTruthy();
  });
});
