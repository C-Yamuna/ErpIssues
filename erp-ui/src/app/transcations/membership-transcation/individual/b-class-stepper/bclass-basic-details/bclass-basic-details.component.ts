import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Membershiptransactionconstant } from '../../../membership-transaction-constant';

@Component({
  selector: 'app-bclass-basic-details',
  templateUrl: './bclass-basic-details.component.html',
  styleUrls: ['./bclass-basic-details.component.css']
})
export class BClassBasicDetailsComponent {
  basicdetailsform: FormGroup;
  cities!: any[];
  operations:any;
  operationslist:any;
  selectedCity: any;
  constructor(private router: Router, private formBuilder: FormBuilder,)
  { 
    this.basicdetailsform = this.formBuilder.group({
     
    })
  }
  ngOnInit() {
    this. operationslist = [
      { label: "A-class", value: 1 },
      { label: "B-class", value: 2 },
    ]
  }

  navigateToInfoDetails(event: any) {
    if (event.value === 1)
    this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_BASIC_DETAILS]); 
    else if (event.value === 2)
    this.router.navigate(['']);
  }
  back(){
    this.router.navigate([Membershiptransactionconstant.MEMBERSHIP_TRANSACTION]);

  }
}
