import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { BorrowingTransactionConstant } from '../../borrowing-transaction-constants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { TermBorrowingProductDefinitionService } from './shared/term-borrowing-product-definition.service';

@Component({
  selector: 'app-term-borrowing-product-definition',
  templateUrl: './term-borrowing-product-definition.component.html',
  styleUrls: ['./term-borrowing-product-definition.component.css']
})
export class TermBorrowingProductDefinitionComponent {
  responseModel!: Responsemodel;
  termBorrowingproductdefinition: any[] = [];
  showForm: boolean = applicationConstants.FALSE;
  editViewButton:boolean = applicationConstants.FALSE;
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService,private termBorrowingProductDefinitionService : TermBorrowingProductDefinitionService,
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
    this.termBorrowingproductdefinition = [
      { field: 'name', header: 'BORROWINGSTRANSACTIONS.PRODUCT_NAME' },
      // { field: '', header: 'BORROWINGSTRANSACTIONS.RATE_OF_INTEREST' },
      { field: 'minAmount', header: 'BORROWINGSTRANSACTIONS.MINIMUM_AMOUNT' },
      { field: 'maxAmount',header:'BORROWINGSTRANSACTIONS.MAXIMUM_AMOUNT'},
      { field: 'effectiveStartDate',header:'BORROWINGSTRANSACTIONS.EFFECTIVE_START_DATE'},
      { field: 'status',header:'BORROWINGSTRANSACTIONS.STATUS'}
    ];
    this.getAllSaoBorrowingProductDefinition();
}
/**
    @author vinitha
    @implements Routes to add Term Borrowings Product Defination Stepper
   */
    addTermproductdefinition(){
    this.router.navigate([BorrowingTransactionConstant.TERM_PRODUCT_CONFIGURATION]);
  }
  /**
    @author vinitha
    @implements Routes to View Term Borrowings Product Defination Details
   */
    viewTermproductdefinition(rowData: any) {
    this.router.navigate([BorrowingTransactionConstant.VIEW_TERM_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id),editbtn:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
  }
  /**
    @author vinitha
    @implements Routes to Edit Term Borrowings Product Defination Stepper
   */
    editTermproductdefinition(rowData: any) {
    this.router.navigate([BorrowingTransactionConstant.VIEW_TERM_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) ,isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) }});
    this.editViewButton =applicationConstants.TRUE;
  }
  /**
    @author vinitha
    @implements Get All Term Borrowings Configuration details 
    @returns list of Term Borrowings Configuration details
   */
    getAllSaoBorrowingProductDefinition() {
    this.termBorrowingProductDefinitionService.getAllTermBorrowingProductDefinition().subscribe((data: any) => {
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
