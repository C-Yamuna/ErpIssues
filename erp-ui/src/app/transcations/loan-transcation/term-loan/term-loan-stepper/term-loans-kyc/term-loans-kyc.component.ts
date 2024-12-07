import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-term-loans-kyc',
  templateUrl: './term-loans-kyc.component.html',
  styleUrls: ['./term-loans-kyc.component.css']
})
export class TermLoansKycComponent {
  registeredform: FormGroup;
  displayDialog: boolean = false;
  gender: any[] | undefined;
  constructor(private router: Router, private formBuilder: FormBuilder,)
  { 
    this.registeredform = this.formBuilder.group({
     
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
