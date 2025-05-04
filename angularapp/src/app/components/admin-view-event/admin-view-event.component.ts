// admin-view-event.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view-event',
  templateUrl: './admin-view-event.component.html',
  styleUrls: ['./admin-view-event.component.css'],
})
export class AdminViewEventComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchTitle = '';
  selectedEventId: number | null = null;
  selectedEventTitle: string = '';
  showDeleteModal: boolean = false;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.loadEvents();
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

  searchByName() {
    const searchTermLower = this.searchTitle.toLowerCase().trim();
    this.filteredEvents = this.events.filter((event) =>
      event.Title.toLowerCase().includes(searchTermLower)
    );
  }

  editEvent(eventId: number) {
    this.router.navigate([`admin/admin-add-event/${eventId}`]);
  }

  deleteEvent(eventId: number) {
    const event = this.events.find((e) => e.EventId === eventId);
    if (event) {
      this.selectedEventId = eventId;
      this.selectedEventTitle = event.Title;
      this.showDeleteModal = true;
    }
  }

  confirmDelete() {
    if (this.selectedEventId !== null) {
      this.eventService.deleteEvent(this.selectedEventId).subscribe(() => {
        this.loadEvents();
        this.router.navigate(['admin/admin-view-event']);
        this.filteredEvents = [...this.events]; // Ensure filtered list updates
        this.showDeleteModal = false;
        this.router.navigate(['admin/admin-view-event']);
      },
      error=>{
        this.showDeleteModal = false;
        this.router.navigate(['admin/admin-view-event'])
        this.loadEvents();
      });
    }
  }

  cancelDelete() {
    this.showDeleteModal = false;
  }
}
