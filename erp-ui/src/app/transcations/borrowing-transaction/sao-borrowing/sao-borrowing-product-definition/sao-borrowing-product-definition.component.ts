import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SaoBorrowingProductDefinitionService } from './shared/sao-borrowing-product-definition.service';
import { BorrowingTransactionConstant } from '../../borrowing-transaction-constants';

@Component({
  selector: 'app-sao-borrowing-product-definition',
  templateUrl: './sao-borrowing-product-definition.component.html',
  styleUrls: ['./sao-borrowing-product-definition.component.css']
})
export class SaoBorrowingProductDefinitionComponent {
  responseModel!: Responsemodel;
  saoBorrowingproductdefinition: any[] = [];
  showForm: boolean = applicationConstants.FALSE;
  editViewButton:boolean = applicationConstants.FALSE;
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService,private saoBorrowingProductDefinitionService : SaoBorrowingProductDefinitionService,
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
    this.saoBorrowingproductdefinition = [
      { field: 'name', header: 'BORROWINGSTRANSACTIONS.PRODUCT_NAME' },
      { field: '', header: 'BORROWINGSTRANSACTIONS.RATE_OF_INTEREST' },
      { field: 'minAmount', header: 'BORROWINGSTRANSACTIONS.MINIMUM_AMOUNT' },
      { field: 'maxAmount',header:'BORROWINGSTRANSACTIONS.MAXIMUM_AMOUNT'},
      { field: 'effectiveStartDate',header:'BORROWINGSTRANSACTIONS.EFFECTIVE_START_DATE'},
      { field: 'status',header:'BORROWINGSTRANSACTIONS.STATUS'}
    ];
    this.getAllSaoBorrowingProductDefinition();
}
/**
    @author vinitha
    @implements Routes to add sao Borrowings Product Defination Stepper
   */
  addsaoproductdefinition(){
    this.router.navigate([BorrowingTransactionConstant.SAO_PRODUCT_CONFIGURATION]);
  }
  /**
    @author vinitha
    @implements Routes to View sao Borrowings Product Defination Details
   */
    viewsaoproductdefinition(rowData: any) {
    this.router.navigate([BorrowingTransactionConstant.VIEW_SAO_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id),editbtn:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
  }
  /**
    @author vinitha
    @implements Routes to Edit sao Borrowings Product Defination Stepper
   */
    editsaoproductdefinition(rowData: any) {
    this.router.navigate([BorrowingTransactionConstant.VIEW_SAO_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) ,isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) }});
    this.editViewButton =applicationConstants.TRUE;
  }
  /**
    @author vinitha
    @implements Get All sao Borrowings Configuration details 
    @returns list of sao Borrowings Configuration details
   */
    getAllSaoBorrowingProductDefinition() {
    this.saoBorrowingProductDefinitionService.getAllSaoBorrowingProductDefinition().subscribe((data: any) => {
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
