// // import { Component, OnInit } from '@angular/core';
// // import { Router } from '@angular/router';
// // import { EventRequirement } from 'src/app/models/event-requirement.model';
// // import { AuthService } from 'src/app/services/auth.service';
// // import { EventRequirementService } from 'src/app/services/event-requirement.service';
// // import { EventService } from 'src/app/services/event.service';
// // import { interval } from 'rxjs';
// // import { map } from 'rxjs/operators';
// // import { Event } from 'src/app/models/event.model';

// // @Component({
// //   selector: 'app-user-view-requirement',
// //   templateUrl: './user-view-requirement.component.html',
// //   styleUrls: ['./user-view-requirement.component.css']
// // })
// // export class UserViewRequirementComponent implements OnInit {
// //   eventRequirements: EventRequirement[] = [];
// //   filteredEventRequirements: EventRequirement[] = [];
// //   searchTerm: string = '';
// //   selectedRequirement!: EventRequirement;
// //   showDeleteModal: boolean = false;
// //   userId: number = 0;
// //   event_name: string = '';
// //   event: Event;

// //   constructor(private r: Router, private erService: EventRequirementService, private authService: AuthService, private eventService: EventService) {}

// //   ngOnInit(): void {
// //     this.authService.currentUser.subscribe(u => {
// //       this.userId = u.UserId;
// //       this.load_requirements();
// //     });
// //     interval(100000).subscribe(() => this.load_requirements()); // Poll every 5s
// //   }
  

// //   load_requirements(): void{
// //     this.erService.getEventRequirementByUserId(this.userId).subscribe((response) => {
// //       console.log(response)
// //       this.eventRequirements = response.data;
// //       this.filteredEventRequirements = response.data;
// //     });
// //   }

// //   fetch_eventname(eventRequirement: EventRequirement){
// //     this.eventService.getEventById(eventRequirement.EventId).subscribe( data => {
// //       this.event = data;
// //     })
// //     return this.event.Title;
// //   }
  
// //   searchByName(): void {
// //     this.filteredEventRequirements = this.eventRequirements.filter(a => 
// //       a.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
// //     );    
// //   }

// //   deleteRequirement(eventRequirement: EventRequirement): void {
// //     this.selectedRequirement = eventRequirement;
// //     this.showDeleteModal = true;
// //   }

// //   confirmDelete(): void {
// //     this.erService.deleteEventRequirement(this.selectedRequirement.EventRequirementId).subscribe(() => {
// //       console.log('Deleting:', this.selectedRequirement);
// //       this.erService.getAllEventRequirements().subscribe((response) => {
// //         this.eventRequirements = response["data"];
// //         this.filteredEventRequirements = response["data"];
// //       });
// //     });
// //     this.showDeleteModal = false;
// //   }
  
// //   editRequirement(erId: number)
// //   {
// //     this.r.navigate([`user/app-user-add-requirement/${erId}`])
// //   }

// //   cancelDelete(): void {
// //     this.showDeleteModal = false;
// //   }
// // }


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { EventRequirement } from 'src/app/models/event-requirement.model';
// import { AuthService } from 'src/app/services/auth.service';
// import { EventRequirementService } from 'src/app/services/event-requirement.service';
// import { EventService } from 'src/app/services/event.service';
// import { Event } from 'src/app/models/event.model';

// @Component({
//   selector: 'app-user-view-requirement',
//   templateUrl: './user-view-requirement.component.html',
//   styleUrls: ['./user-view-requirement.component.css']
// })
// export class UserViewRequirementComponent implements OnInit {
//   eventRequirements: EventRequirement[] = [];
//   filteredEventRequirements: EventRequirement[] = [];
//   searchTerm: string = '';
//   selectedRequirement!: EventRequirement;
//   showDeleteModal: boolean = false;
//   userId: number = 0;
//   event_name: string = '';
//   event: Event;

//   constructor(private r: Router, private erService: EventRequirementService, private authService: AuthService, private eventService: EventService) {}

//   ngOnInit(): void {
//     this.authService.currentUser.subscribe(u => {
//       this.userId = u.UserId;
//       this.load_requirements();
//     });
//   }

//   load_requirements(): void {
//     this.erService.getEventRequirementByUserId(this.userId).subscribe((response) => {
//       console.log(response);
//       this.eventRequirements = response.data;
//       this.filteredEventRequirements = response.data;
//     });
//   }

//   fetch_eventname(eventRequirement: EventRequirement) {
//     this.eventService.getEventById(eventRequirement.EventId).subscribe(data => {
//       this.event = data;
//     });
//     return this.event.Title;
//   }

//   searchByName(): void {
//     this.filteredEventRequirements = this.eventRequirements.filter(a => 
//       a.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );    
//   }

//   deleteRequirement(eventRequirement: EventRequirement): void {
//     this.selectedRequirement = eventRequirement;
//     this.showDeleteModal = true;
//   }

//   confirmDelete(): void {
//     this.erService.deleteEventRequirement(this.selectedRequirement.EventRequirementId).subscribe(() => {
//       console.log('Deleting:', this.selectedRequirement);
//       this.erService.getAllEventRequirements().subscribe((response) => {
//         this.eventRequirements = response["data"];
//         this.filteredEventRequirements = response["data"];
//       });
//     });
//     this.showDeleteModal = false;
//   }

//   editRequirement(erId: number) {
//     this.r.navigate([`user/app-user-add-requirement/${erId}`]);
//   }

//   cancelDelete(): void {
//     this.showDeleteModal = false;
//   }
// }



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventRequirement } from 'src/app/models/event-requirement.model';
import { AuthService } from 'src/app/services/auth.service';
import { EventRequirementService } from 'src/app/services/event-requirement.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

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
  userId: number = 0;
  eventNames: { [key: number]: string } = {}; // Store event names by Event ID

  constructor(private r: Router, private erService: EventRequirementService, private authService: AuthService, private eventService: EventService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(u => {
      this.userId = u.UserId;
      this.load_requirements();
    });
  }

  load_requirements(): void {
    this.erService.getEventRequirementByUserId(this.userId).subscribe((response) => {
      this.eventRequirements = response.data;
      this.filteredEventRequirements = response.data;

      // **Fetch Event Names Once for Unique Event IDs**
      const uniqueEventIds = new Set(this.eventRequirements.map(req => req.EventId));

      uniqueEventIds.forEach(eventId => {
        this.eventService.getEventById(eventId).subscribe((data) => {
          this.eventNames[eventId] = data.Title; // Store Event Titles
        });
      });
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
      this.load_requirements(); // Refresh data after deletion
    });
    this.showDeleteModal = false;
  }

  editRequirement(erId: number) {
    this.r.navigate([`user/app-user-add-requirement/${erId}`]);
  }
}
