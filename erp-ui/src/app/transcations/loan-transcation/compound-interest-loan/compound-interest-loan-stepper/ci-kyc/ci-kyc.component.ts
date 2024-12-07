import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ci-kyc',
  templateUrl: './ci-kyc.component.html',
  styleUrls: ['./ci-kyc.component.css']
})
export class CiKycComponent {
  registeredform: FormGroup;
  gender: any[] | undefined;
  constructor(private router: Router, private formBuilder: FormBuilder,)
  { 
    this.registeredform = this.formBuilder.group({
     
    })
  }
  ngOnInit() {
    this.gender = [
        { status: 'Select', code: 'select' },
        { status: 'Male', code: 'Male' },
        { status: 'Female', code: 'Female' },
    ];
   
}
}
