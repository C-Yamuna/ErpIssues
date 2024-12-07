import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { savingsbanktransactionconstant } from '../../savingsbank-transaction-constant';

@Component({
  selector: 'app-debitcard-issue',
  templateUrl: './debitcard-issue.component.html',
  styleUrls: ['./debitcard-issue.component.css']
})
export class DebitcardIssueComponent {
  statuses!: SelectItem[];
  cardtype:any;
  cardtypelist:any;
  debitcardform: FormGroup;
  debitcardissue: any[] = [];
  constructor(private router: Router, private formBuilder: FormBuilder,)
  { 
    this.debitcardform = this.formBuilder.group({
     
    })
  }
  ngOnInit() {
    this. cardtypelist = [
      { label: "Mastro", value: "Mastro" },
      { label: "Visa", value: "Visa" },
    
     
    
    ];
   
    this.debitcardissue = [
      { field: 'Debit Card Number', header: 'DEBIT CARD NUMBER' },
      { field: 'Card Type', header: 'CARD TYPE' },
      { field: 'Card Isuue Date', header: 'CARD ISSUE DATE' },
      { field: 'Card Isuue Date', header: 'CARD ISSUE DATE' },
      { field: 'Card Isuue Date',header:'CARD ISSUE DATE'},
      { field: 'Is Chargeable', header: 'IS CHARGEABLE' },
      { field: 'Charges', header: 'CHARGES' },
      { field: 'Status', header: 'STATUS' },
    ];
}
backbutton(){
  this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
}
edit(){}
}
