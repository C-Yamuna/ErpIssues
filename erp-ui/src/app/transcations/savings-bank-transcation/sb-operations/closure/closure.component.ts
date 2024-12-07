import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { savingsbanktransactionconstant } from '../../savingsbank-transaction-constant';
import { SbConfigComponent } from 'src/app/configurations/sb-config/sb-config.component';

@Component({
  selector: 'app-closure',
  templateUrl: './closure.component.html',
  styleUrls: ['./closure.component.css']
})
export class ClosureComponent {
  closureform: FormGroup;
  showForm: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder,)
  { 
    this.closureform = this.formBuilder.group({
     
    })
  }
  isBasicDetails: boolean = false;
  position: string = 'center';
 
  backbutton(){
    this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
  }
  showBasicDetailsDialog(position: string) {
    this.position = position;
    this.isBasicDetails = true;
}
onClickMemberIndividualMoreDetails(){
  this.showForm = true
}
}
