import { Component, OnInit } from '@angular/core';
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

  constructor(private erService: EventRequirementService) {}

  ngOnInit(): void {
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
    const modal = document.getElementById('deleteModal');
    if (modal) modal.style.display = 'block'; // Show modal
  }

  confirmDelete(): void {
    console.log('Deleting:', this.selectedRequirement);
    this.closeModal();
  }

  closeModal(): void {
    const modal = document.getElementById('deleteModal');
    if (modal) modal.style.display = 'none'; // Hide modal
  }
}
