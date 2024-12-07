import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem, MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { Loantransactionconstant } from './loan-transaction-constant';
import { CommonComponent } from 'src/app/shared/common.component';
@Component({
  selector: 'app-loan-transcation',
  templateUrl: './loan-transcation.component.html',
  styleUrls: ['./loan-transcation.component.css']
})
export class LoanTranscationComponent {
  loans: any[] = [];
  statuses!: SelectItem[];
  operations:any;
  operationslist:any;
  loanslist:any;
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  value: number = 0;
  newdepositer:any;
  constructor(private router: Router, private translate: TranslateService,private commonComponent: CommonComponent,
    private commonFunctionsService: CommonFunctionsService,)
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
  
    this. loanslist = [
      { label: "SAO", value: 1 },
      { label: "Term Loan", value: 2 },
      { label: "Simple Interest Loan", value: 3 },
      { label: "Compound Interest Loan", value: 4 },
    ]
    this. operationslist = [
      { label: "Disbursement", value: 1 },
      { label: "Collection", value: 2 },
      { label: "Closure", value: 3 },
    
    ]
    this.loans = [
      { field: 'Admission No',header:'ADMISSION NO'},
      { field: 'Name', header: 'NAME' },
      { field: 'Account Number', header: 'ACCOUNT NUMBER' },
      { field: 'Application ', header: 'APPLICATION' },
      { field: 'Product ', header: 'PRODUCT ' },
      { field: 'Sanctioned Amount',header:'SANCTIONRD AMOUNT'},
      { field: 'ROI', header: 'ROI' },
      { field: 'Status', header: 'STATUS' },
      { field: 'Action', header: 'ACTION' },
    ];
 
  let tabLabels = [
    'Total Accounts',
    'Total Disbursement Amount',     
    'Total Collection Amount',
    'Total SAO Loans',
    'Total Term Loans',
    ' Total Simple Interest Loans ',                   
                                 
];
 this.items = tabLabels.map((label, index)=> ({ label: label, value: `${index + 1}` }));
//  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
}


navigateToNewLoans(event: any) {
  if (event.value === 1)
  this.router.navigate([Loantransactionconstant.LOANS_SAO_STEPPER]);
  else if (event.value === 2)
  this.router.navigate([Loantransactionconstant.LOANS_TERM_LOANS_STEPPER]);
  else if (event.value === 3)
  this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_STEPPER]);
  else if (event.value === 4)
  this.router.navigate([Loantransactionconstant.LOANS_COMPOUND_INTEREST_LOANS_STEPPER]);
}
navigateToOperations(event: any) {
  if (event.value === 1)
  this.router.navigate([Loantransactionconstant.LOANS_DISBURSEMENT]);
  else if (event.value === 2)
  this.router.navigate([Loantransactionconstant.LOANS_COLLECTIONS]);
  else if (event.value === 3)
  this.router.navigate([Loantransactionconstant.LOANS_CLOSURE]);

}


view(){
  this.router.navigate([Loantransactionconstant.VIEW_LOANS]);
}
edit(){
  this.router.navigate([Loantransactionconstant.EDIT_LOANS]);
}
}
