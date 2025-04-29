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
  status: string = '';

  constructor(private erService: EventRequirementService) { }
  
  ngOnInit(): void {
    this.erService.getAllEventRequirements().subscribe( (data) => {
      this.eventRequirements = data;
      this.filteredEventRequirements = data;
    })
  }

  searchByName()
  {
    this.filteredEventRequirements = this.eventRequirements.filter( a => a.Title.toLowerCase().includes(this.searchTerm.toLowerCase));
  }

  approveButton()
  {
    this.status = "Approved"
  }

  rejectStatus()
  {
    this.status = "Rejected";
  }
}
