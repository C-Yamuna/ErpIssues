import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CiBorrowingProductDefinitionService } from './shared/ci-borrowing-product-definition.service';
import { TranslateService } from '@ngx-translate/core';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { BorrowingTransactionConstant } from '../../borrowing-transaction-constants';

@Component({
  selector: 'app-ci-borrowing-product-definition',
  templateUrl: './ci-borrowing-product-definition.component.html',
  styleUrls: ['./ci-borrowing-product-definition.component.css']
})
export class CiBorrowingProductDefinitionComponent {
  responseModel!: Responsemodel;
  ciBorrowingproductdefinition: any[] = [];
  showForm: boolean = applicationConstants.FALSE;
  editViewButton:boolean = applicationConstants.FALSE;
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService,private ciBorrowingProductDefinitionService : CiBorrowingProductDefinitionService,
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
    this.ciBorrowingproductdefinition = [
      { field: 'name', header: 'BORROWINGSTRANSACTIONS.PRODUCT_NAME' },
      { field: 'minAmount', header: 'BORROWINGSTRANSACTIONS.MINIMUM_AMOUNT' },
      { field: 'maxAmount',header:'BORROWINGSTRANSACTIONS.MAXIMUM_AMOUNT'},
      { field: 'effectiveStartDate',header:'BORROWINGSTRANSACTIONS.EFFECTIVE_START_DATE'},
      { field: 'status',header:'BORROWINGSTRANSACTIONS.STATUS'}
    ];
    this.getAllCiBorrowingProductDefinition();
}
/**
    @author vinitha
    @implements Routes to add Ci Borrowings Product Defination Stepper
   */
  addciproductdefinition(){
    this.router.navigate([BorrowingTransactionConstant.CI_PRODUCT_CONFIGURATION]);
  }

  /**
    @author vinitha
    @implements Routes to View Ci Borrowings Product Defination Details
   */
    viewciproductdefinition(rowData: any) {
    this.router.navigate([BorrowingTransactionConstant.VIEW_CI_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id),editbtn:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
  }
  /**
    @author vinitha
    @implements Routes to Edit Ci Borrowings Product Defination Stepper
   */
    editciproductdefinition(rowData: any) {
    this.router.navigate([BorrowingTransactionConstant.VIEW_CI_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) ,isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) }});
    this.editViewButton =applicationConstants.TRUE;
  }
  /**
    @author vinitha
    @implements Get All Ci Borrowings Configuration details 
    @returns list of Ci Borrowings Configuration details
   */
    getAllCiBorrowingProductDefinition() {
    this.ciBorrowingProductDefinitionService.getAllCiBorrowingProductDefinition().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if(null!=this.responseModel.data && undefined!=this.responseModel.data ){
          this.gridListData = this.responseModel.data;
          if(null!=this.gridListData && undefined!=this.gridListData && this.gridListData.length>0){
            this.gridListData = this.gridListData.filter((data:any) => null!=data.effectiveStartDate).map(ciborrowing => {
              ciborrowing.effectiveStartDate = this.datePipe.transform(ciborrowing.effectiveStartDate, this.orgnizationSetting.datePipe)||'';
              return ciborrowing
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
