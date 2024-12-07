import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CiLoanApplicationsService } from '../shared/ci-loans/ci-loan-applications.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CompoundInterestLoan } from './shared/compound-interest-loan.model';
import { Loantransactionconstant } from '../loan-transaction-constant';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-compound-interest-loan',
  templateUrl: './compound-interest-loan.component.html',
  styleUrls: ['./compound-interest-loan.component.css']
})
export class CompoundInterestLoanComponent {
  loans: any[] = [];
  pacsId: any;
  branchId: any;
  gridList: any [] = [];
  msgs: any[] = [];
  gridListLenght: Number | undefined;
  tempGridListData: any[] = [];
  responseModel!: Responsemodel;
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  value: number = 0;
  operationslist:any;
  operations:any;
  activeStatusCount: number = 0;
  inactiveStatusCount: number = 0;
  showForm: boolean=false;
  compoundInterestLoan : CompoundInterestLoan = new CompoundInterestLoan();
  constructor(private router: Router, private translate: TranslateService,private commonComponent: CommonComponent,
    private commonFunctionsService: CommonFunctionsService,private ciLoanApplicationService : CiLoanApplicationsService, private encryptDecryptService: EncryptDecryptService)
  { 
    this.loans = [
      { field: 'admissionNo',header:'ADMISSION NO'},
      { field: 'memberName', header: 'NAME' },
      { field: 'accountNumber', header: 'ACCOUNT NUMBER' },
      // { field: 'Application ', header: 'APPLICATION' },
      { field: 'ciProductName', header: 'PRODUCT ' },
      { field: 'sanctionAmount',header:'SANCTIONRD AMOUNT'},
      { field: 'effectiveRoi', header: 'ROI' },
      { field: 'statusName', header: 'STATUS' },
     // { field: 'Action', header: 'ACTION' },
    ];
  }
  ngOnInit() {
    let tabLabels = [
      'Total Accounts',
      'Total Disbursement Amount',     
      'Total Collection Amount',
      'Total SAO Loans',
      'Total Term Loans',
      ' Total Simple Interest Loans ',                   
    ];
    this. operationslist = [
      { label: "Disbursement", value: 1 },
      { label: "Collection", value: 2 },
      { label: "Closure", value: 3 },
    ]
    this.items = tabLabels.map((label, index)=> ({ label: label, value: `${index + 1}` }));
    this.pacsId = 1;
    this.branchId = 1;
    this.getAllCiLoanApplicationDetailsListByPacsIdAndBranchId();
  }
  getAllCiLoanApplicationDetailsListByPacsIdAndBranchId() {
    this.commonComponent.startSpinner();
      this.ciLoanApplicationService.getCiLoanApplicationDetailsByPacsIdAndBranchId(this.pacsId , this.branchId).subscribe((data: any) => {
      this.responseModel = data;
      this.gridList = this.responseModel.data;
      this.gridListLenght = this.gridList.length;
      this.tempGridListData = this.gridList;
        this.commonComponent.stopSpinner();
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      this.commonComponent.stopSpinner();
    });
  }
  createaccount(){
    this.router.navigate([Loantransactionconstant.LOANS_COMPOUND_INTEREST_LOANS_STEPPER]);
  }
  view(rowData : any){
    this.router.navigate([Loantransactionconstant.VIEW_LOANS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }
  edit(){
    this.router.navigate([Loantransactionconstant.EDIT_LOANS]);
  }
  navigateToOperations(event: any) {
    if (event.value === 1)
    this.router.navigate([Loantransactionconstant.LOANS_DISBURSEMENT]);
    else if (event.value === 2)
    this.router.navigate([Loantransactionconstant.LOANS_COLLECTIONS]);
    else if (event.value === 3)
    this.router.navigate([Loantransactionconstant.LOANS_CLOSURE]);
  
  }

  onChange(){
    this.showForm = !this.showForm;
  }
}
