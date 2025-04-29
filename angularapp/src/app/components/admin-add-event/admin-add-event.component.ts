import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Event } from 'src/app/models/event.model'; // Replace with the correct path

@Component({
  selector: 'app-admin-add-event',
  templateUrl: './admin-add-event.component.html',
  styleUrls: ['./admin-add-event.component.css']
})
export class AdminAddEventComponent implements OnInit {
  newEvent: Event = {
    EventId: 0, // Default ID for new event
    Title: '',
    Description: '',
    Location: '',
    Date: new Date(),
    OrganizerName: '',
    ContactInfo: '',
    PostedDate: new Date(),
    Status: ''
  };

  isEditMode = false; // Determines if it's edit or add mode
  eventId!: number; // Stores event ID for editing
  tempEvents: Event[] = []; // Temporary storage for all events
  errorMessage = ''; // Error message for validation

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    // Fetch all events to check for duplicate titles
    this.eventService.getAllEvents().subscribe((data) => {
      this.tempEvents = data;
    });

    // Check if the route has an ID (Edit Mode)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId = +id;
      this.isEditMode = true;

      // Fetch event details by ID and pre-fill form
      this.eventService.getEventById(this.eventId).subscribe((data) => {
        this.newEvent = data;
      });
    }
  }

  onSubmit(form: NgForm): void {
    // Prevent submission if form is invalid
    if (form.invalid) return;

    // Check if the title already exists
    const exists = this.tempEvents.some(
      event => event.Title.toLowerCase() === this.newEvent.Title.toLowerCase()
    );

    if (exists) {
      this.errorMessage = 'Event title already exists!';
      return;
    }

    // Determine if adding or updating the event
    const request = this.isEditMode
      ? this.eventService.updateEvent(this.eventId, this.newEvent)
      : this.eventService.addEvent(this.newEvent);

    // Handle success or error response
    request.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Event Updated Successfully!' : 'Event Added Successfully!');
        form.resetForm(); // Reset form after success
        this.router.navigate(['/']); // Redirect to homepage or event list
      },
      error: () => {
        this.errorMessage = 'An error occurred while submitting the event.';
      }
    });
  }
}
