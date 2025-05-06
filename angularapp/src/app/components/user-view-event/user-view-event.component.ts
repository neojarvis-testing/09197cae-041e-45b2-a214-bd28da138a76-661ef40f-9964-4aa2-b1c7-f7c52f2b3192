import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';  // assuming you have a service
import { Event } from 'src/app/models/event.model';
 
@Component({
  selector: 'app-user-view-event',
  templateUrl: './user-view-event.component.html',
  styleUrls: ['./user-view-event.component.css']
})
export class UserViewEventComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchTitle = '';
 
  constructor(private eventService: EventService) {}
 
  ngOnInit(): void {
    this.loadEvents();
  }

  searchByName() {
    const searchTermLower = this.searchTitle.toLowerCase().trim();
    this.filteredEvents = this.events.filter((event) =>
      event.Title.toLowerCase().includes(searchTermLower)
    );
  }
 

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        console.log('Fetched events:', data);
        this.events = data;
        this.filteredEvents = [...data];
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        alert('Failed to load events. Please try again.');
      },
    });
  }

}