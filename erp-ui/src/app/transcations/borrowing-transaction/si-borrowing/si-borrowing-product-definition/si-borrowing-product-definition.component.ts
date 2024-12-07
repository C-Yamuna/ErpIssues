import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { BorrowingTransactionConstant } from '../../borrowing-transaction-constants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { SiBorrowingProductDefinitionService } from './shared/si-borrowing-product-definition.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-si-borrowing-product-definition',
  templateUrl: './si-borrowing-product-definition.component.html',
  styleUrls: ['./si-borrowing-product-definition.component.css']
})
export class SiBorrowingProductDefinitionComponent {
  responseModel!: Responsemodel;
  siBorrowingproductdefinition: any[] = [];
  showForm: boolean = applicationConstants.FALSE;
  editViewButton:boolean = applicationConstants.FALSE;
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService,private siBorrowingProductDefinitionService : SiBorrowingProductDefinitionService,
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
    this.siBorrowingproductdefinition = [
      { field: 'name', header: 'BORROWINGSTRANSACTIONS.PRODUCT_NAME' },
      { field: 'minAmount', header: 'BORROWINGSTRANSACTIONS.MINIMUM_AMOUNT' },
      { field: 'maxAmount',header:'BORROWINGSTRANSACTIONS.MAXIMUM_AMOUNT'},
      { field: 'effectiveStartDate',header:'BORROWINGSTRANSACTIONS.EFFECTIVE_START_DATE'},
      { field: 'status',header:'BORROWINGSTRANSACTIONS.STATUS'}
    ];
    this.getAllSiBorrowingProductDefinition();
}
/**
    @author vinitha
    @implements Routes to add Si Borrowings Product Defination Stepper
   */
  addsiproductdefinition(){
    this.router.navigate([BorrowingTransactionConstant.SI_PRODUCT_CONFIGURATION]);
  }
  /**
    @author vinitha
    @implements Routes to View Si Borrowings Product Defination Details
   */
    viewsiproductdefinition(rowData: any) {
    this.router.navigate([BorrowingTransactionConstant.VIEW_SI_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id),editbtn:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
  }
  /**
    @author vinitha
    @implements Routes to Edit Si Borrowings Product Defination Stepper
   */
    editsiproductdefinition(rowData: any) {
    this.router.navigate([BorrowingTransactionConstant.VIEW_SI_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) ,isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) }});
    this.editViewButton =applicationConstants.TRUE;
  }
  /**
    @author vinitha
    @implements Get All Si Borrowings Configuration details 
    @returns list of Si Borrowings Configuration details
   */
    getAllSiBorrowingProductDefinition() {
    this.siBorrowingProductDefinitionService.getAllSiBorrowingProductDefinition().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if(null!=this.responseModel.data && undefined!=this.responseModel.data ){
          this.gridListData = this.responseModel.data;
          if(null!=this.gridListData && undefined!=this.gridListData && this.gridListData.length>0){
            this.gridListData = this.gridListData.filter((data:any) => null!=data.effectiveStartDate).map(siborrowing => {
              siborrowing.effectiveStartDate = this.datePipe.transform(siborrowing.effectiveStartDate, this.orgnizationSetting.datePipe)||'';
              return siborrowing
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
