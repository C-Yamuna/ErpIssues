import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-term-loans-communication',
  templateUrl: './term-loans-communication.component.html',
  styleUrls: ['./term-loans-communication.component.css']
})
export class TermLoansCommunicationComponent {
  registeredform: FormGroup;
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
