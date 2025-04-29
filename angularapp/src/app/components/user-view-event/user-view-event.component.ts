import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';  // assuming you have a service
import { Event } from 'src/app/models/event.model';
 
@Component({
  selector: 'app-user-view-event',
  templateUrl: './user-view-event.component.html',
  styleUrls: ['./user-view-event.component.css']
})
export class UserViewEventComponent implements OnInit {
  events: any[] = [];
  searchText: string = '';
 
  constructor(private eventService: EventService) {}
 
  ngOnInit(): void {
    this.loadEvents();
  }
 
  loadEvents(): void {
    this.eventService.getAllEvents().subscribe((data: any[]) => {
this.events = data;
    });
  }
}