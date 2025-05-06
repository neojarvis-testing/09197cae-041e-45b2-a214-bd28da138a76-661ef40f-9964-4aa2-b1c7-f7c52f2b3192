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
    Status: 'Scheduled'
  };

  dateProperty: any;

  isEditMode = false;
  eventId!: number;
  tempEvents: Event[] = [];
  errorMessage = '';
  minDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.setMinDate();
    this.eventService.getAllEvents().subscribe((data) => {
      this.tempEvents = data || []; // Prevents undefined issues
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId = +id;
      this.isEditMode = true;

      this.eventService.getEventById(this.eventId).subscribe((data) => {
        this.newEvent = data || this.newEvent; // Ensures valid object assignment

        this.dateProperty = new Date(this.newEvent.Date).toISOString().split('T')[0];

        console.log(new Date(this.newEvent.Date));

      });
    }
  }

  setMinDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0'); 
    this.minDate = `${year}-${month}-${day}`;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    // Enhanced check with safeguards
    // const exists = this.tempEvents.find(
    //   event => event.Title?.toLowerCase() === (this.newEvent.Title || '').toLowerCase()
    // );

    console.log(this.tempEvents);

    // if (exists) {
    //   this.errorMessage = 'Event title already exists!';
    //   return;
    // }

    this.newEvent.Date = new Date(this.dateProperty);

    const request = this.isEditMode
      ? this.eventService.updateEvent(this.eventId, this.newEvent)
      : this.eventService.addEvent(this.newEvent);

    request.subscribe({
      next: () => {
        form.resetForm();
        this.router.navigate(['/admin-view-even']);
      },
      error: () => {
        this.router.navigate(['/admin/app-admin-view-event']);
      }
    });
  }
}
