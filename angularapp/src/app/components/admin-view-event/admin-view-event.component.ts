import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-admin-view-event',
  templateUrl: './admin-view-event.component.html',
  styleUrls: ['./admin-view-event.component.css'],
})
export class AdminViewEventComponent implements OnInit {
  events: Event[] = [];
  searchTitle = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => (this.events = data),
      error: (err) => alert(err.message),
    });
  }

  filteredEvents() {
    return this.events.filter((event) => event.Title.toLowerCase().includes(this.searchTitle.toLowerCase()));
  }

  editEvent(event: Event) {
    alert(`Navigating to edit event: ${event.Title}`);
  }

  deleteEvent(eventId: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          alert('Event Deleted Successfully!');
          this.events = this.events.filter((event) => event.EventId !== eventId);
        },
        error: (err) => alert(err.message),
      });
    }
  }
}
