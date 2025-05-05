// import { Component, OnInit } from '@angular/core';
// import { EventRequirement } from 'src/app/models/event-requirement.model';
// import { EventRequirementService } from 'src/app/services/event-requirement.service';
// import { EventService } from 'src/app/services/event.service';
// import { Event } from 'src/app/models/event.model';

// @Component({
//   selector: 'app-admin-view-requirement',
//   templateUrl: './admin-view-requirement.component.html',
//   styleUrls: ['./admin-view-requirement.component.css']
// })
// export class AdminViewRequirementComponent implements OnInit {
//   eventRequirements: EventRequirement[] = [];
//   filteredEventRequirements: EventRequirement[] = [];
//   searchTerm: string = '';
//   event: Event;

//   constructor(private erService: EventRequirementService, private eventService: EventService) { }

//   ngOnInit(): void {
//     this.loadRequirementsPeriodically();
//   }

//   loadRequirementsPeriodically(): void {
//     this.loadRequirements(); // Initial load

//     setTimeout(() => {
//       this.loadRequirementsPeriodically(); // Recursively call to fetch updated data
//     }, 100000); // Refresh every 5 seconds
//   }

//   fetch_eventname(eventRequirement: EventRequirement): string {
//     this.eventService.getEventById(eventRequirement.EventId).subscribe(data => {
//       this.event = data;
//     })
//     return this.event.Title;
//   }


//   loadRequirements(): void {
//     this.erService.getAllEventRequirements().subscribe((response) => {
//       this.eventRequirements = response["data"];
//       this.filteredEventRequirements = response["data"];
//     });
//   }

//   searchByName(): void {
//     const searchTermLower = this.searchTerm.toLowerCase().trim();
//     this.filteredEventRequirements = this.eventRequirements.filter(a =>
//       a.Title.toLowerCase().includes(searchTermLower)
//     );
//   }

//   approveButton(eventRequirement: EventRequirement): void {
//     eventRequirement.Status = "Approved";
//     this.erService.updateEventRequirement(eventRequirement.EventRequirementId, eventRequirement).subscribe(() => {
//       this.loadRequirements(); // Refresh the list to reflect changes
//     });
//   }

//   rejectButton(eventRequirement: EventRequirement): void {
//     eventRequirement.Status = "Rejected";
//     this.erService.updateEventRequirement(eventRequirement.EventRequirementId, eventRequirement).subscribe(() => {
//       this.loadRequirements(); // Refresh the list to reflect changes
//     });
//   }

// }


// import { Component, OnInit } from '@angular/core';
// import { EventRequirement } from 'src/app/models/event-requirement.model';
// import { EventRequirementService } from 'src/app/services/event-requirement.service';
// import { EventService } from 'src/app/services/event.service';
// import { Event } from 'src/app/models/event.model';

// @Component({
//   selector: 'app-admin-view-requirement',
//   templateUrl: './admin-view-requirement.component.html',
//   styleUrls: ['./admin-view-requirement.component.css']
// })
// export class AdminViewRequirementComponent implements OnInit {
//   eventRequirements: EventRequirement[] = [];
//   filteredEventRequirements: EventRequirement[] = [];
//   searchTerm: string = '';
//   event: Event;

//   constructor(private erService: EventRequirementService, private eventService: EventService) { }

//   ngOnInit(): void {
//     this.loadRequirements();

//     setTimeout(() => {
//       this.loadRequirements(); // Recursively call to fetch updated data
//     }, 100000); // Refresh every 5 seconds// Load data once when the component initializes
//   }

//   fetch_eventname(eventRequirement: EventRequirement): string {
//     this.eventService.getEventById(eventRequirement.EventId).subscribe(data => {
//       this.event = data;
//     });
//     return this.event.Title;
//   }



//   loadRequirements(): void {
//     this.erService.getAllEventRequirements().subscribe((response) => {
//       this.eventRequirements = response["data"];
//       this.filteredEventRequirements = response["data"];
//     });
//   }

//   searchByName(): void {
//     const searchTermLower = this.searchTerm.toLowerCase().trim();
//     this.filteredEventRequirements = this.eventRequirements.filter(a =>
//       a.Title.toLowerCase().includes(searchTermLower)
//     );
//   }

//   approveButton(eventRequirement: EventRequirement): void {
//     eventRequirement.Status = "Approved";
//     this.erService.updateEventRequirement(eventRequirement.EventRequirementId, eventRequirement).subscribe(() => {
//       this.loadRequirements(); // Refresh the list to reflect changes
//     });
//   }

//   rejectButton(eventRequirement: EventRequirement): void {
//     eventRequirement.Status = "Rejected";
//     this.erService.updateEventRequirement(eventRequirement.EventRequirementId, eventRequirement).subscribe(() => {
//       this.loadRequirements(); // Refresh the list to reflect changes
//     });
//   }
// }




import { Component, OnInit } from '@angular/core';
import { EventRequirement } from 'src/app/models/event-requirement.model';
import { EventRequirementService } from 'src/app/services/event-requirement.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-admin-view-requirement',
  templateUrl: './admin-view-requirement.component.html',
  styleUrls: ['./admin-view-requirement.component.css']
})
export class AdminViewRequirementComponent implements OnInit {
  eventRequirements: EventRequirement[] = [];
  filteredEventRequirements: EventRequirement[] = [];
  eventNames: { [key: number]: string } = {}; // Store event names for unique Event IDs
  searchTerm: string = '';

  constructor(private erService: EventRequirementService, private eventService: EventService) {}

  ngOnInit(): void {
    this.loadRequirements();
  }

  // Fetch all event requirements and pre-fetch event names for unique Event IDs
  loadRequirements(): void {
    this.erService.getAllEventRequirements().subscribe((response) => {
      this.eventRequirements = response["data"];
      this.filteredEventRequirements = response["data"];

      // Extract unique Event IDs to avoid redundant API calls
      const uniqueEventIds = new Set(this.eventRequirements.map(req => req.EventId));

      uniqueEventIds.forEach(eventId => {
        this.eventService.getEventById(eventId).subscribe((data) => {
          this.eventNames[eventId] = data.Title; // Store fetched event titles
        });
      });
    });
  }

  // TrackBy function for improved performance in rendering lists
  trackById(index: number, item: EventRequirement): number {
    return item.EventRequirementId;
  }

  // Filter event requirements based on search term
  searchByName(): void {
    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredEventRequirements = this.eventRequirements.filter(a =>
      a.Title.toLowerCase().includes(searchTermLower)
    );
  }

  // Approve an event requirement and refresh the list
  approveButton(eventRequirement: EventRequirement): void {
    eventRequirement.Status = "Approved";
    this.erService.updateEventRequirement(eventRequirement.EventRequirementId, eventRequirement).subscribe(() => {
      this.loadRequirements(); // Refresh list after approval
    });
  }

  // Reject an event requirement and refresh the list
  rejectButton(eventRequirement: EventRequirement): void {
    eventRequirement.Status = "Rejected";
    this.erService.updateEventRequirement(eventRequirement.EventRequirementId, eventRequirement).subscribe(() => {
      this.loadRequirements(); // Refresh list after rejection
    });
  }
}
