import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Loantransactionconstant } from '../../loan-transaction-constant';

@Component({
  selector: 'app-compound-interest-loan-stepper',
  templateUrl: './compound-interest-loan-stepper.component.html',
  styleUrls: ['./compound-interest-loan-stepper.component.css']
})
export class CompoundInterestLoanStepperComponent {
  items: MenuItem[] | undefined;
 showForm: boolean = false;
  activeIndex: number = 0;
  
  constructor(public messageService: MessageService,private router:Router) {}

//   onActiveIndexChange(event: number) {
//     this.activeIndex = event;
// }

  ngOnInit() {
    this.items = [
      {
          label: 'KYC',icon: 'fa fa-podcast', routerLink:Loantransactionconstant.COMPOUNDINTEREST_LOANS_KYC
      },
      {
        label: 'Communication',icon: 'fa fa-map-marker',routerLink:Loantransactionconstant.COMPOUNDINTEREST_LOANS_COMMUNICATON
      },
      {
        label: 'Application',icon: 'fa fa-clipboard',routerLink:Loantransactionconstant.COMPOUNDINTEREST_LOANS_PRODUCT_DETAILS
        // command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
      },
      {
        label: 'Nominee',icon: 'fa fa-user-o',routerLink:Loantransactionconstant.COMPOUNDINTEREST_LOANS_NOMINEE
      },
      {
          label: 'Loan Guarantor',icon: 'fa fa-male', routerLink:Loantransactionconstant.COMPOUNDINTEREST_LOANS_GUARANTOR 
      },
      {
        label: 'Loan Mortagage',icon: 'fa fa-puzzle-piece',routerLink:Loantransactionconstant.COMPOUNDINTEREST_LOANS_MORTAGAGE
      },
      {
        label: 'Loan Documents',icon: 'fa fa-files-o',routerLink:Loantransactionconstant.COMPOUNDINTEREST_LOANS_DOCUMENTS
      },
      {
        label: 'Loan Genealogy Tree',icon: 'fa fa-sitemap',routerLink:Loantransactionconstant.COMPOUNDINTEREST_LOANS_GENEALOGY_TREE
      },
     
  ];
   
  
}

navigateTo(activeIndex:any) {
  switch (activeIndex) {
    case 0:
      this.router.navigate([Loantransactionconstant.COMPOUNDINTEREST_LOANS_PRODUCT_DETAILS]);   
      break;
    case 1:
      this.router.navigate([Loantransactionconstant.COMPOUNDINTEREST_LOANS_COMMUNICATON]);        
      break;
    case 2:
      this.router.navigate([Loantransactionconstant.COMPOUNDINTEREST_LOANS_KYC]);        
      break;
    case 3:
      this.router.navigate([Loantransactionconstant.COMPOUNDINTEREST_LOANS_GUARANTOR]);        
      break;
    case 4:
      this.router.navigate([Loantransactionconstant.COMPOUNDINTEREST_LOANS_NOMINEE]);        
      break;
    case 5:
      this.router.navigate([Loantransactionconstant.COMPOUNDINTEREST_LOANS_MORTAGAGE]);        
      break;
    case 6:
      this.router.navigate([Loantransactionconstant.COMPOUNDINTEREST_LOANS_DOCUMENTS]);        
      break;
    case 7:
      this.router.navigate([Loantransactionconstant.COMPOUNDINTEREST_LOANS_GENEALOGY_TREE]);        
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
onClickMemberIndividualMoreDetails() {
  this.showForm = true;
}
}
