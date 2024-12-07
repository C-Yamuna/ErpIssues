import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { RecurringDepositProductDefinitionService } from './shared/recurring-deposit-product-definition.service';
import { termdeposittransactionconstant } from '../term-deposit-transaction-constant';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recurring-deposit-product-definition',
  templateUrl: './recurring-deposit-product-definition.component.html',
  styleUrls: ['./recurring-deposit-product-definition.component.css']
})
export class RecurringDepositProductDefinitionComponent {
  responseModel!: Responsemodel;
  recurringDepositproductdefinition: any[] = [];
  showForm: boolean = applicationConstants.FALSE;
  editViewButton:boolean = applicationConstants.FALSE;
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService,private recurringDepositProductDefinitionService : RecurringDepositProductDefinitionService,
    private datePipe: DatePipe,
    private commonComponent: CommonComponent){ 
      
    }
  ngOnInit() {
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });
    this.recurringDepositproductdefinition = [
      { field: 'name', header: 'TERMDEPOSITSTRANSACTION.PRODUCT_NAME' },
      // { field: '', header: 'TERMDEPOSITSTRANSACTION.RATE_OF_INTEREST' },
      { field: 'minDepositAmount', header: 'TERMDEPOSITSTRANSACTION.MINIMUM_AMOUNT' },
      { field: 'maxDepositAmount',header:'TERMDEPOSITSTRANSACTION.MAXIMUM_AMOUNT'},
      { field: 'effectiveStartDate',header:'TERMDEPOSITSTRANSACTION.EFFECTIVE_START_DATE'},
      { field: 'status',header:'TERMDEPOSITSTRANSACTION.STATUS'}
    ];
    this.getAllRecurringDepositProductDefinition();
}
/**
    @author vinitha
    @implements Routes to add Recurring Deposit Product Defination Stepper
   */
  addRecurringDeposit(){
    this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_GENERAL_CONFIG]);
  }
  /**
    @author vinitha
    @implements Routes to View Recurring Deposit Product Defination Details
   */
    viewRecurringDeposit(rowData: any) {
    this.router.navigate([termdeposittransactionconstant.VIEW_RECURRING_DEPOSIT_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.rdProductId),editbtn:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
  }
  /**
    @author vinitha
    @implements Routes to Edit Recurring Deposit Product Defination Stepper
   */
    editRecurringDeposit(rowData: any) {
    this.router.navigate([termdeposittransactionconstant.VIEW_RECURRING_DEPOSIT_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.rdProductId) ,isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) }});
    this.editViewButton =applicationConstants.TRUE;
  }
  /**
    @author vinitha
    @implements Get All Recurring Deposit Configuration details 
    @returns list of Recurring Deposit Configuration details
   */
    getAllRecurringDepositProductDefinition() {
    this.recurringDepositProductDefinitionService.getAllRecurringDepositProductDefinition().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if(null!=this.responseModel.data && undefined!=this.responseModel.data ){
          this.gridListData = this.responseModel.data;
          if(null!=this.gridListData && undefined!=this.gridListData && this.gridListData.length>0){
            this.gridListData = this.gridListData.filter((data:any) => null!=data.effectiveStartDate).map(fdNonCummilative => {
              fdNonCummilative.effectiveStartDate = this.datePipe.transform(fdNonCummilative.effectiveStartDate, this.orgnizationSetting.datePipe)||'';
              return fdNonCummilative
            });
          }
        }
         this.commonComponent.stopSpinner();
      }else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      this.commonComponent.stopSpinner();
    });
  }
  /**
    @author vinitha
    @implements To Enable/ Disable search filter form
   */
  onChange(){
    this.showForm = !this.showForm;
  }
}
