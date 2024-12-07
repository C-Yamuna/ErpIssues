import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loantransactionconstant } from '../../../loan-transaction-constant';
import { SaoLoanApplicationService } from '../../../shared/sao-loans/sao-loan-application.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SaoLoanApplication } from '../../shared/sao-loan-application.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SaoLoanCollections } from './shared/sao-loan-collections.model';
interface Transaction {
  charges: number;
  interest: number;
  principal: number;
}

interface Data {
  totalOutstanding: number;
  debit: Transaction;
  credit: Transaction;
  outstanding: Transaction;
}


@Component({
  selector: 'app-sao-loan-collections',
  templateUrl: './sao-loan-collections.component.html',
  styleUrls: ['./sao-loan-collections.component.css']
})
export class SaoLoanCollectionsComponent {
  collectionDetails:any;
  saoLoanApplicationModel: SaoLoanApplication = new SaoLoanApplication();
  saoLoanCollectionsModel: SaoLoanCollections = new SaoLoanCollections();
  foreclosureChargesEnabled: boolean = false;
  paymentOptions:any;
  additionalChargesCheck:boolean = false;
  accountNumber: any;
  responseModel!: Responsemodel;
  orgnizationSetting: any;
  msgs: any[] = [];
  loanId: any;
  isEdit: any;
  showForm: boolean = false;
  yourData: Data[] = [
    {
        totalOutstanding: 1000,
        debit: {
            charges: 200,
            interest: 300,
            principal: 500
        },
        credit: {
            charges: 150,
            interest: 250,
            principal: 400
        },
        outstanding: {
            charges: 50,
            interest: 50,
            principal: 100
        }
    },
  ];
 
  
  constructor(private router: Router,private saoLoanApplicationService : SaoLoanApplicationService,private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,private encryptDecryptService: EncryptDecryptService
  ){
    this.paymentOptions = [
      { label: 'cash', value: 1 },
      { label: 'cheque', value: 2 },
      //{ label: 'from sb', value: 3 }
    ];
  
    this.collectionDetails = [
      { field: 'Units', header: 'Units'},
      { field: 'Collections Date', header: 'Collections Date' },
      
      { field: 'Collections Amount', header: 'Collections Amount' },
  
      { field: 'Collections Charges', header: 'Collections Charges' },
  
      { field: 'Collection Interest', header: 'Collections Interest' },
      { field: 'Collection Principal', header: 'Collections Principal' },
  
  
      { field: 'Charges', header: 'CHARGES' },
      { field: 'Action', header: 'ACTION' },
    ];
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined || params['accountNumber'] != undefined) {
        this.commonComponent.startSpinner();
        this.loanId = Number(this.encryptDecryptService.decrypt(params['id']));
        if(params['accountNumber'] != undefined){
          this.accountNumber = Number(this.encryptDecryptService.decrypt(params['accountNumber'])); 
        }
        this.isEdit = true;
        
      } else {
        this.isEdit = false;
      }
    }) 
    // this.documentForm.valueChanges.subscribe((data: any) => {
    //   this.updateData();
    //   if (this.documentForm.valid) {
    //     this.save();
    //   }
    // });
    this.getApplicationDetailsById(this.loanId);
  }
  back(){
    this.router.navigate([Loantransactionconstant.SAO_LOAN]);
  }
  getApplicationDetailsById(id: any) {
    this.saoLoanApplicationService.getSaoLoanApplicationDetailsById(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.saoLoanApplicationModel  = this.responseModel.data[0];
      }
      else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }
  isBasicDetails: boolean = false;
  position: string = 'center';
  showBasicDetailsDialog(position: string) {
    this.position = position;
    this.isBasicDetails = true;
  }
  onClickMemberIndividualMoreDetails(){
    this.showForm = true
  }
}
