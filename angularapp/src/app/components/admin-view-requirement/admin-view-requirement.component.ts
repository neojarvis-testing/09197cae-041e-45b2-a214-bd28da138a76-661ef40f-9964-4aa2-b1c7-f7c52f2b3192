import { Component, OnInit } from '@angular/core';
import { EventRequirement } from 'src/app/models/event-requirement.model';
import { EventRequirementService } from 'src/app/services/event-requirement.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-admin-view-requirement',
  templateUrl: './admin-view-requirement.component.html',
  styleUrls: ['./admin-view-requirement.component.css']
})
export class AdminViewRequirementComponent implements OnInit {
  eventRequirements: EventRequirement[] = [];
  filteredEventRequirements: EventRequirement[] = [];
  searchTerm: string = '';
  event: Event;

  constructor(private erService: EventRequirementService, private eventService: EventService) { }

  ngOnInit(): void {
    this.loadRequirementsPeriodically();
  }

  loadRequirementsPeriodically(): void {
    this.loadRequirements(); // Initial load

    setTimeout(() => {
      this.loadRequirementsPeriodically(); // Recursively call to fetch updated data
    }, 5000); // Refresh every 5 seconds
  }

  fetch_eventname(eventRequirement: EventRequirement): string {
    this.eventService.getEventById(eventRequirement.EventId).subscribe(data => {
      this.event = data;
    })
    return this.event.Title;
  }


  loadRequirements(): void {
    this.erService.getAllEventRequirements().subscribe((response) => {
      this.eventRequirements = response["data"];
      this.filteredEventRequirements = response["data"];
    });
  }

  searchByName(): void {
    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredEventRequirements = this.eventRequirements.filter(a =>
      a.Title.toLowerCase().includes(searchTermLower)
    );
  }

  approveButton(eventRequirement: EventRequirement): void {
    eventRequirement.Status = "Approved";
    this.erService.updateEventRequirement(eventRequirement.EventRequirementId, eventRequirement).subscribe(() => {
      this.loadRequirements(); // Refresh the list to reflect changes
    });
  }

  rejectButton(eventRequirement: EventRequirement): void {
    eventRequirement.Status = "Rejected";
    this.erService.updateEventRequirement(eventRequirement.EventRequirementId, eventRequirement).subscribe(() => {
      this.loadRequirements(); // Refresh the list to reflect changes
    });
  }

}
