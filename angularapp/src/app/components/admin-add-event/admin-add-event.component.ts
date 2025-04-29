import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-admin-add-event',
  templateUrl: './admin-add-event.component.html',
  styleUrls: ['./admin-add-event.component.css'],
})
export class AdminAddEventComponent {
   event : any = {
    EventId: 0,
    Title: '',
    Description: '',
    Location: '',
    Date: new Date(),
    OrganizerName: '',
    ContactInfo: '',
    PostedDate: new Date(),
    Status: '',
  };
  name: ''
  

  constructor(private eventService: EventService) {}

  onSubmit() {
    if (!this.event.Title || !this.event.Description || !this.event.Location || !this.event.Date || !this.event.OrganizerName || !this.event.ContactInfo || this.event.PostedDate || this.event.Status) {
      alert('All fields are required');
      return;
    }
    this.eventService.addEvent(this.event).subscribe({
      next: () => alert('Event Added Successfully!'),
      error: (err) => alert(err.message),
    });
  }
=======
  styleUrls: ['./admin-add-event.component.css']
})
export class AdminAddEventComponent {
  
}
