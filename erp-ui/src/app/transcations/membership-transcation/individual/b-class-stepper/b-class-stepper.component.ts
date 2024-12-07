import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Membershiptransactionconstant } from '../../membership-transaction-constant';

@Component({
  selector: 'app-b-class-stepper',
  templateUrl: './b-class-stepper.component.html',
  styleUrls: ['./b-class-stepper.component.css']
})
export class BClassStepperComponent {
  items: MenuItem[] | undefined;

  activeIndex: number = 0;
  constructor(public messageService: MessageService,private router:Router) {
    this.items = [
      {
          label: 'Basic Details',routerLink:Membershiptransactionconstant.INDIVIDUAL_B_CLASS_BASICDETAILS,
          // command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
          command: (event: any) => {
            this.activeIndex = 0;
          }
      },
      {
          label: 'Communication',routerLink:Membershiptransactionconstant.INDIVIDUAL_B_CLASS_COMMUNICATIONS,
          // command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
          command: (event: any) => {
            this.activeIndex = 1;
          }
      },
      {
          label: 'KYC',routerLink:Membershiptransactionconstant.INDIVIDUAL_B_CLASS_KYC,
          // command: (event: any) => this.messageService.add({severity:'info', summary:'Third Step', detail: event.item.label})
          command: (event: any) => {
            this.activeIndex = 2;
          }
      },
     
      {
        label: 'Nominee',routerLink:Membershiptransactionconstant.INDIVIDUAL_B_CLASS_NOMINEE,
        // command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label})
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },
      {
        label: 'Family Details',routerLink:Membershiptransactionconstant.INDIVIDUAL_B_CLASS_FAMILY_DETAILS,
        // command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label})
        command: (event: any) => {
          this.activeIndex = 4;
        }
      },
     
  ];
   
  }

  ngOnInit() {
   
  
}

navigateTo(activeIndex:any) {
  switch (activeIndex) {
    case 0:
      this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_B_CLASS_BASICDETAILS]); 
      break;
    case 1:
      this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_B_CLASS_COMMUNICATIONS]);      
      break;
    case 2:
      this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_B_CLASS_KYC]);       
      break;
    
    case 3:
      this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_B_CLASS_NOMINEE]);      
      break;
    case 4:
      this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_B_CLASS_FAMILY_DETAILS]);        
      break;
    
  }
}

prevStep(activeIndex:any){
  this.activeIndex = activeIndex - 1;
  this.navigateTo(this.activeIndex);

}
saveAndNext(activeIndex:any){
  this.activeIndex = activeIndex + 1;
  this.navigateTo(this.activeIndex);

}

back(){
  this.router.navigate(['/menu/membership_transaction/membership_transactions']);

}

}
