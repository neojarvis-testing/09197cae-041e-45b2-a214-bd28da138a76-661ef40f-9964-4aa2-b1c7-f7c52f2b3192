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
      next: (data) => {
        console.log('Fetched events:', data); // Log API response to verify data
        this.events = data; // Assign data to events array
        console.log(this.events);
      },
      error: (err) => {
        console.error('Error fetching events:', err); // Log any errors
        alert(err.message);
      },
    });
  }

  filteredEvents() {
    return this.events.filter((event) =>
      event.Title?.toLowerCase().includes(this.searchTitle.toLowerCase())
    );
  }

  editEvent(event: Event) {
    alert(`Navigating to edit event: ${event.Title}`);
    //routing
  }

  deleteEvent(eventId: number) {
    console.log('Deleting event with ID:', eventId); // Log the ID

      //pop up
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          alert('Event Deleted Successfully!');
          // this.events = this.events.filter((event) => event.EventId !== eventId);
        },
        error: (err) => {
          // console.error('Error deleting event:', err);
          alert(err.message);
        },
      });
  }

  
}
