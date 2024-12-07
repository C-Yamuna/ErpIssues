import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { termdeposittransactionconstant } from '../term-deposit-transaction-constant';
import { TermDepositProductDefinitionService } from './shared/term-deposit-product-definition.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';

@Component({
  selector: 'app-term-deposit-product-definition',
  templateUrl: './term-deposit-product-definition.component.html',
  styleUrls: ['./term-deposit-product-definition.component.css']
})
export class TermDepositProductDefinitionComponent {
  responseModel!: Responsemodel;
  termdepositproductdefinition: any[] = [];
  showForm: boolean=false;
  editViewButton:boolean=false;
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService,private termDepositProductDefinitionService : TermDepositProductDefinitionService,private datePipe: DatePipe,
    private commonComponent: CommonComponent){ 
      
    }

    /**
    @author Phanidher
    @implements Fd Cummulative Configuration details Stepper Configuration
   */
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
    this.termdepositproductdefinition = [
      { field: 'name', header: 'TERMDEPOSITSTRANSACTION.PRODUCT_NAME' },
      // { field: 'financiarBankTypeName', header: 'TERMDEPOSITSTRANSACTION.PRODUCT_TYPE' },
      { field: '', header: 'TERMDEPOSITSTRANSACTION.RATE_OF_INTEREST' },
      { field: 'minDepositAmount', header: 'TERMDEPOSITSTRANSACTION.MINIMUM_AMOUNT' },
      { field: 'maxDepositAmount',header:'TERMDEPOSITSTRANSACTION.MAXIMUM_AMOUNT'},
      { field: 'effectiveStartDate',header:'TERMDEPOSITSTRANSACTION.EFFECTIVE_START_DATE'},
      { field: 'status',header:'TERMDEPOSITSTRANSACTION.STATUS'}
    ];
    this.getAllFdCummulativeProductDefinations();
}
/**
    @author Phanidher
    @implements Routes to add Fd Cummulative Product Defination Stepper
   */
  add(){
    this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_GENERAL_CONFIG]);
  }
  /**
    @author Phanidher
    @implements Routes to View Fd Cummulative Product Defination Details
   */
    viewFdCummulative(rowData: any) {
    this.router.navigate([termdeposittransactionconstant.VIEW_FD_CUMMULATIVE_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.fdCummulativeProductId),editbtn:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
  }
  /**
    @author Phanidher
    @implements Routes to Edit Fd Cummulative Product Defination Stepper
   */
  editFdCummulative(rowData: any) {
    this.router.navigate([termdeposittransactionconstant.VIEW_FD_CUMMULATIVE_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.fdCummulativeProductId) ,isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) }});
    this.editViewButton =true;
  }
  /**
    @author Phanidher
    @implements Get All Fd Cummulative Configuration details 
    @returns list of Fd Cummulative Configuration details
   */
  getAllFdCummulativeProductDefinations() {
    this.termDepositProductDefinitionService.getAllFdCummulativeProductDefinations().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if(null!=this.responseModel.data && undefined!=this.responseModel.data ){
          this.gridListData = this.responseModel.data;
          if(null!=this.gridListData && undefined!=this.gridListData && this.gridListData.length>0){
            this.gridListData = this.gridListData.filter((data:any) => null!=data.effectiveStartDate).map(fdCummilative => {
              fdCummilative.effectiveStartDate = this.datePipe.transform(fdCummilative.effectiveStartDate, this.orgnizationSetting.datePipe)||'';
              return fdCummilative
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
    @author Phanidher
    @implements To Enable/ Disable search filter form
   */
  onChange(){
    this.showForm = !this.showForm;
  }
}
