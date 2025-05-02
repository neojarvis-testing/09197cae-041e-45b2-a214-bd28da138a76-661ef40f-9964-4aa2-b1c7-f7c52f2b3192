import { Component, OnInit } from '@angular/core';
import { EventRequirement } from 'src/app/models/event-requirement.model';
import { EventRequirementService } from 'src/app/services/event-requirement.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-view-requirement',
  templateUrl: './admin-view-requirement.component.html',
  styleUrls: ['./admin-view-requirement.component.css']
})

export class AdminViewRequirementComponent implements OnInit {

  eventRequirements: EventRequirement[] = [];
  filteredEventRequirements: EventRequirement[] = [];
  searchTerm: string = '';

  constructor(private erService: EventRequirementService, private cdRef: ChangeDetectorRef) {}

  
  ngOnInit(): void {
    this.erService.getAllEventRequirements().subscribe((response) => {
      this.eventRequirements = response["data"];
      this.filteredEventRequirements = response["data"]; // Creating a new array reference
    });
  }

  searchByName(): void {
    this.filteredEventRequirements = this.eventRequirements.filter(a => 
      a.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );    
  }

  approveButton(eventRequirement: EventRequirement): void {
    eventRequirement.Status = "Approved";
    this.filteredEventRequirements = [...this.filteredEventRequirements]; // Forces Angular to detect change
  }
  
  rejectButton(eventRequirement: EventRequirement): void {
    eventRequirement.Status = "Rejected";
    this.filteredEventRequirements = [...this.filteredEventRequirements]; // Forces Angular to detect change
  }

}
