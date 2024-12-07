import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loantransactionconstant } from '../../../loan-transaction-constant';

@Component({
  selector: 'app-simple-interest-loan-closure',
  templateUrl: './simple-interest-loan-closure.component.html',
  styleUrls: ['./simple-interest-loan-closure.component.css']
})
export class SimpleInterestLoanClosureComponent {

  isBasicDetails: boolean = false;
  isHistory: boolean = false;
  position: string = 'center'
  showForm: boolean = false;

  constructor(private router: Router){}
 

  back(){
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_TRANSACTION]);
  }

  showBasicDetailsDialog(position: string) {
    this.position = position;
    this.isBasicDetails = true;
    if(this.isHistory)
        this.isHistory = false
}
showHistoryDialog(position: string) {
    this.position = position;
    this.isHistory = true;
    if(this.isBasicDetails)
        this.isBasicDetails = false;
}
onClickMemberIndividualMoreDetails(){
  this.showForm = true
}
}
