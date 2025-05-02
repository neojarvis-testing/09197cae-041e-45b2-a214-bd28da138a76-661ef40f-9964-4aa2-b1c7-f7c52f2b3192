import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Event } from 'src/app/models/event.model'; 

@Component({
  selector: 'app-admin-add-event',
  templateUrl: './admin-add-event.component.html',
  styleUrls: ['./admin-add-event.component.css']
})

export class AdminAddEventComponent implements OnInit {
  newEvent: Event = {
    EventId: 0,
    Title: '',
    Description: '',
    Location: '',
    Date: null,
    OrganizerName: '',
    ContactInfo: '',
    PostedDate: new Date(),
    Status: 'Pending'
  };

  dateProperty:any;

  isEditMode = false;
  eventId!: number;
  tempEvents: Event[] = [];
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      this.tempEvents = data || []; // Prevents undefined issues
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId = +id;
      this.isEditMode = true;

      this.eventService.getEventById(this.eventId).subscribe((data) => {
        this.newEvent = data || this.newEvent; // Ensures valid object assignment

        this.newEvent.Date = new Date(this.newEvent.Date);

        console.log(new Date(this.newEvent.Date));

      });
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    // Enhanced check with safeguards
    const exists = this.tempEvents.find(
      event => event.Title?.toLowerCase() === (this.newEvent.Title || '').toLowerCase()
    );
    
    console.log(this.tempEvents);
    
    if (exists) {
      this.errorMessage = 'Event title already exists!';
      return;
    }

    const request = this.isEditMode
      ? this.eventService.updateEvent(this.eventId, this.newEvent)
      : this.eventService.addEvent(this.newEvent);

    request.subscribe({
      next: () => {
        form.resetForm();
        this.router.navigate(['/']);
      },
      error: () => {
        this.router.navigate(['/admin-view-event']);
      }
    });
  }
}
