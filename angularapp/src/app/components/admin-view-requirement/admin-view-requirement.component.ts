import { Component, OnInit } from '@angular/core';
import { EventRequirement } from 'src/app/models/event-requirement.model';
import { EventRequirementService } from 'src/app/services/event-requirement.service';

@Component({
  selector: 'app-admin-view-requirement',
  templateUrl: './admin-view-requirement.component.html',
  styleUrls: ['./admin-view-requirement.component.css']
})
export class AdminViewRequirementComponent implements OnInit {
  eventRequirements: EventRequirement[] = [];
  filteredEventRequirements: EventRequirement[] = [];
  searchTerm: string = '';

  constructor(private erService: EventRequirementService) {}

  ngOnInit(): void {
    this.loadRequirements();
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
