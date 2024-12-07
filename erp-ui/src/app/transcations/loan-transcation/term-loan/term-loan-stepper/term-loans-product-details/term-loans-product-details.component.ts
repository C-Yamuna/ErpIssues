import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-term-loans-product-details',
  templateUrl: './term-loans-product-details.component.html',
  styleUrls: ['./term-loans-product-details.component.css']
})
export class TermLoansProductDetailsComponent {
  Basicdetailsform: FormGroup;
  apllicationdetailsform: FormGroup;
  chargesdetailsform: FormGroup;
  insurencedetailsform:FormGroup;
  gender: any[] | undefined;
  maritalstatus: any[] | undefined;
  constructor(private router: Router, private formBuilder: FormBuilder,)
  { 
    this.Basicdetailsform = this.formBuilder.group({
     
    })
    this.apllicationdetailsform = this.formBuilder.group({
     
    })
    this.chargesdetailsform = this.formBuilder.group({
     
    })
    this.insurencedetailsform = this.formBuilder.group({
     
    })
  }
  ngOnInit() {
    this.gender = [
        { status: 'Select', code: 'AU' },
        { status: 'Male', code: 'Male' },
        { status: 'Female', code: 'Female' },
    ];
    this.maritalstatus = [
      { status: 'Select', code: 'AU' },
      { status: 'Married', code: 'Married' },
      { status: 'UnMarried', code: 'UnMarried' }
  ];
}

}
