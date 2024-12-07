import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ci-loan-guarantor',
  templateUrl: './ci-loan-guarantor.component.html',
  styleUrls: ['./ci-loan-guarantor.component.css']
})
export class CiLoanGuarantorComponent {
  guarantorform: FormGroup;
  gender: any[] | undefined;
  constructor(private router: Router, private formBuilder: FormBuilder,)
  { 
    this.guarantorform = this.formBuilder.group({
     
    })
  }
  ngOnInit() {
    this.gender = [
        { status: 'Select', code: 'AU' },
        { status: 'Male', code: 'Male' },
        { status: 'Female', code: 'Female' },
    ];
   
}
}
