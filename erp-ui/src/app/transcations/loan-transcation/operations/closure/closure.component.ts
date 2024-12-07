import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Loantransactionconstant } from '../../loan-transaction-constant';

@Component({
  selector: 'app-closure',
  templateUrl: './closure.component.html',
  styleUrls: ['./closure.component.css']
})
export class ClosureComponent {
  constructor(private router: Router, private formBuilder: FormBuilder)
  {}
  back(){
    this.router.navigate([Loantransactionconstant.LOANS_TRANSACTION]);
  }

  
  
  
 
}
