import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventRequirement } from 'src/app/models/event-requirement.model';
import { EventRequirementService } from 'src/app/services/event-requirement.service';

@Component({
  selector: 'app-user-view-requirement',
  templateUrl: './user-view-requirement.component.html',
  styleUrls: ['./user-view-requirement.component.css']
})
export class UserViewRequirementComponent implements OnInit {
  eventRequirements: EventRequirement[] = [];
  filteredEventRequirements: EventRequirement[] = [];
  searchTerm: string = '';
  selectedRequirement!: EventRequirement;
  showDeleteModal: boolean = false;

  constructor(private r: Router, private erService: EventRequirementService) {}

  ngOnInit(): void {
    this.loadRequirementsPeriodically();
  }
  
  loadRequirementsPeriodically(): void {
    this.load_requirements(); // Initial load
  
    setTimeout(() => {
      this.loadRequirementsPeriodically(); // Recursively call to fetch updated data
    }, 5000); // Refresh every 5 seconds
  }
  

  load_requirements(): void{
    this.erService.getAllEventRequirements().subscribe((response) => {
      this.eventRequirements = response["data"];
      this.filteredEventRequirements = response["data"];
    });
  }

  searchByName(): void {
    this.filteredEventRequirements = this.eventRequirements.filter(a => 
      a.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );    
  }

  deleteRequirement(eventRequirement: EventRequirement): void {
    this.selectedRequirement = eventRequirement;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    this.erService.deleteEventRequirement(this.selectedRequirement.EventRequirementId).subscribe(() => {
      console.log('Deleting:', this.selectedRequirement);
      this.erService.getAllEventRequirements().subscribe((response) => {
        this.eventRequirements = response["data"];
        this.filteredEventRequirements = response["data"];
      });
    });
    this.showDeleteModal = false;
  }
  
  editRequirement(erId: number)
  {
    this.r.navigate([`user/app-user-add-requirement/${erId}`])
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }
}
