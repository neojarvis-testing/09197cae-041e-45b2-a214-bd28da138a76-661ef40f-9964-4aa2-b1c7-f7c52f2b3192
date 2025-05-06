// import { Component, OnInit } from '@angular/core';
// import { EventRequirement } from 'src/app/models/event-requirement.model';
// import { EventRequirementService } from 'src/app/services/event-requirement.service';
// import { EventService } from 'src/app/services/event.service';
// import { UserService } from 'src/app/services/user.service';

// @Component({
//   selector: 'app-admin-view-requirement',
//   templateUrl: './admin-view-requirement.component.html',
//   styleUrls: ['./admin-view-requirement.component.css']
// })
// export class AdminViewRequirementComponent implements OnInit {
//   eventRequirements: EventRequirement[] = [];
//   filteredEventRequirements: EventRequirement[] = [];
//   eventNames: { [key: number]: string } = {}; // Store event names for unique Event IDs
//   searchTerm: string = '';
//   userName: string = '';

//   constructor(private uService: UserService, private erService: EventRequirementService, private eventService: EventService) {}

//   ngOnInit(): void {
//     this.loadRequirements();
//   }

//   load_Name()
//   {
//     this.uService.getDetails(this.).subscribe(u => {
//       this.userName = u.userName;
//     })

//   }

//   // Fetch all event requirements and pre-fetch event names for unique Event IDs
//   loadRequirements(): void {
//     this.erService.getAllEventRequirements().subscribe((response) => {
//       this.eventRequirements = response["data"];
//       this.filteredEventRequirements = response["data"];

//       // Extract unique Event IDs to avoid redundant API calls
//       const uniqueEventIds = new Set(this.eventRequirements.map(req => req.EventId));

//       uniqueEventIds.forEach(eventId => {
//         this.eventService.getEventById(eventId).subscribe((data) => {
//           this.eventNames[eventId] = data.Title; // Store fetched event titles
//         });
//       });
//     });
//   }

//   // TrackBy function for improved performance in rendering lists
//   trackById(index: number, item: EventRequirement): number {
//     return item.EventRequirementId;
//   }

//   // Filter event requirements based on search term
//   searchByName(): void {
//     const searchTermLower = this.searchTerm.toLowerCase().trim();
//     this.filteredEventRequirements = this.eventRequirements.filter(a =>
//       a.Title.toLowerCase().includes(searchTermLower)
//     );
//   }

//   // Approve an event requirement and refresh the list
//   approveButton(eventRequirement: EventRequirement): void {
//     eventRequirement.Status = "Approved";
//     this.erService.updateEventRequirement(eventRequirement.EventRequirementId, eventRequirement).subscribe(() => {
//       this.loadRequirements(); // Refresh list after approval
//     });
//   }

//   // Reject an event requirement and refresh the list
//   rejectButton(eventRequirement: EventRequirement): void {
//     eventRequirement.Status = "Rejected";
//     this.erService.updateEventRequirement(eventRequirement.EventRequirementId, eventRequirement).subscribe(() => {
//       this.loadRequirements(); // Refresh list after rejection
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { EventRequirement } from 'src/app/models/event-requirement.model';
import { EventRequirementService } from 'src/app/services/event-requirement.service';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-view-requirement',
  templateUrl: './admin-view-requirement.component.html',
  styleUrls: ['./admin-view-requirement.component.css']
})
export class AdminViewRequirementComponent implements OnInit {
  eventRequirements: EventRequirement[] = [];
  filteredEventRequirements: EventRequirement[] = [];
  eventNames: { [key: number]: string } = {};
  userNames: { [key: number]: string } = {};
  searchTerm: string = '';

  constructor(
    private uService: UserService,
    private erService: EventRequirementService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadRequirements();
    console.log(this.userNames);
  }

  loadRequirements(): void {
    this.erService.getAllEventRequirements().subscribe((response) => {
      this.eventRequirements = response["data"];
      this.filteredEventRequirements = response["data"];

      const uniqueEventIds = new Set<number>();
      const uniqueUserIds = new Set<number>();

      this.eventRequirements.forEach(req => {
        uniqueEventIds.add(req.EventId);
        uniqueUserIds.add(req.UserId);
      });

      uniqueEventIds.forEach(eventId => {
        this.eventService.getEventById(eventId).subscribe((data) => {
          this.eventNames[eventId] = data.Title;
        });
      });

      uniqueUserIds.forEach(userId => {
        this.uService.getDetails(userId).subscribe((user) => {
          this.userNames[userId] = user.Username;
        });
      });
    });
  }

  trackById(index: number, item: EventRequirement): number {
    return item.EventRequirementId;
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
      this.loadRequirements();
    });
  }

  rejectButton(eventRequirement: EventRequirement): void {
    eventRequirement.Status = "Rejected";
    this.erService.updateEventRequirement(eventRequirement.EventRequirementId, eventRequirement).subscribe(() => {
      this.loadRequirements();
    });
  }
}
