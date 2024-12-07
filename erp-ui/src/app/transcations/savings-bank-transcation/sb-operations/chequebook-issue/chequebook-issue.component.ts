import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { savingsbanktransactionconstant } from '../../savingsbank-transaction-constant';

@Component({
  selector: 'app-chequebook-issue',
  templateUrl: './chequebook-issue.component.html',
  styleUrls: ['./chequebook-issue.component.css']
})
export class ChequebookIssueComponent {
  statuses!: SelectItem[];
  numberofleafs:any;
  deliverymode:any;
  deliverymodelist:any;
  numberoflefslist:any;
  chequebokissueform: FormGroup;
  chequebookissue: any[] = [];
  chequebookissuetypes: any[] = [];
  constructor(private router: Router, private formBuilder: FormBuilder,)
  { 
    this.chequebokissueform = this.formBuilder.group({
      
    })
  }
  ngOnInit() {
    this. numberoflefslist = [
      { label: "5", value: "5" },
      { label: "10", value: "10" },
      { label: " 15", value: " 15" },
      { label: "20", value: "20" },
     
    
    ];
    this. deliverymodelist = [
      { label: "Monthly", value: "Monthly" },
      { label: "Quarterly", value: " Quarterly" },
      { label: " Half Yearly", value: " Half Yearly " },
      { label: "Yearly", value: "Yearly" },
     
    
    ];
    this.chequebookissue = [
      { field: 'Chequebook Number', header: 'CHEQUEBOOK NUMBER' },
      { field: 'Number Of Leafs', header: 'CNUMBER OF LEAFSODE' },
      { field: 'Number Of Used Leafs', header: 'NUMBER OF USED LEAFS' },
      { field: 'Starting Number', header: ' STARTING NUMBER' },
      { field: 'Ending Number', header: 'ENDING NUMBER' },
      { field: 'Issued Date', header: 'ISSUED DATE' },
      { field: 'Valid Date ', header: 'VALID DATE' },
      { field: 'Status', header: 'STATUS' },
  
    ];

    this.chequebookissuetypes = [
      { field: 'Cheque Number', header: 'CHEQUE NUMBER' },
      { field: 'Valid Form', header: 'VALID FORM' },
      { field: 'Valid Till', header: 'VALID TILL' },
      { field: 'Transfer To', header: 'TRANSFER TO' },
      { field: 'To Account Number', header: 'TO ACCOUNT NUMBER' },
      { field: 'Amount', header: 'STATAMOUNTUS' },
      { field: 'Transaction Date', header: 'TRANSACTION DATE' },
      { field: 'Bank Name', header: 'BANK NAME' },
      { field: 'Bank Code', header: 'BANK CODE' },
      { field: 'Status', header: 'STATUS' },
   
    ];
}
backbutton(){
  this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
}
edit(){}
}
