import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { termdeposittransactionconstant } from './term-deposit-transaction-constant';
import { savingsbanktransactionconstant } from '../savings-bank-transcation/savingsbank-transaction-constant';

@Component({
  selector: 'app-term-deposits-transcation',
  templateUrl: './term-deposits-transcation.component.html',
  styleUrls: ['./term-deposits-transcation.component.css']
})
export class TermDepositsTranscationComponent {
  termdeposits: any[] = [];
  statuses!: SelectItem[];
  operations:any;
  operationslist:any;
  termdepositlist:any;
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  value: number = 0;
  newdepositer:any;
  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService)
  { }
  ngOnInit() {
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });
    this. termdepositlist = [
      { label: "FD Non-Cumulative", value: 1 },
      { label: "FD Cumulative", value: 2 },
      { label: "Recurring Deposit", value: 3 },

    
    ]
    this. operationslist = [
      { label: "Interest Payment", value: 1 },
      { label: "Foreclosure", value: 2 },
      { label: "Closure", value: 3 },
      { label: "Renewal", value: 4 },
    
    ]
    this.termdeposits = [
      { field: 'Name', header: 'NAME' },
      { field: 'Account Number', header: 'ACCOUNT NUMBER' },
      { field: 'Application type', header: 'APPLICATION TYPE' },
      { field: 'Product Name', header: 'PRODUCT NAME' },
      { field: 'Operation Type',header:'OPERATION TYPE'},
      { field: 'Deposit Date', header: 'DEPOSIT DATE' },
      { field: 'Deposit Date Till Date', header: 'DEPOSIT DATE TILL DATE' },
      { field: 'ROI', header: 'ROI' },
      { field: 'Applied For Loan',header:'APPLIED FOR LOAN'},
      { field: 'Status', header: 'STATUS' },
      { field: 'Action', header: 'ACTION' },
    ];
 
  let tabLabels = [
                      'Total Accounts',
                      'Total Deposit Amount',     
                      'Total Maturity Amount',
                      'Cumulative Accounts',
                      'Non-Cumulative Accounts',
                      'Recurring Deposit Accounts',
                      'Total Deposit Amount',
                      'Forclosure Accounts',
                      'Closure Accounts',                
];
 this.items = tabLabels.map((label, index)=> ({ label: label, value: `${index + 1}` }));
//  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
}


navigateToNewDepositer(event: any) {
  if (event.value === 1)
  this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_FD_NON_CUMULATIVE_STEPPER]);
  else if (event.value === 2)
  this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_FD_CUMULATIVE_STEPPER]);
  else if (event.value === 3)
  this.router.navigate([termdeposittransactionconstant.TERM_DEPOSIT_RECURRING_DEPOSIT_STEPPER]);
}
navigateToOperations(event: any) {
  if (event.value === 1)
  this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_INTEREST_PAYMENT]);
  else if (event.value === 2)
  this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_FORE_CLOSURE]);
  else if (event.value === 3)
  this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_CLOSURE]);
  else if (event.value === 4)
  this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_RENEWAL]);
}


view(){}

}
