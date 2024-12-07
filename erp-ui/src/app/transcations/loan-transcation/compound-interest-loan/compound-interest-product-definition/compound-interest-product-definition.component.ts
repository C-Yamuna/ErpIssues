import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CompoundInterestProductDefinitionService } from './shared/compound-interest-product-definition.service';
import { Loantransactionconstant } from '../../loan-transaction-constant';

@Component({
  selector: 'app-compound-interest-product-definition',
  templateUrl: './compound-interest-product-definition.component.html',
  styleUrls: ['./compound-interest-product-definition.component.css']
})
export class CompoundInterestProductDefinitionComponent {
  responseModel!: Responsemodel;
  ciLoanproductdefinition: any[] = [];
  showForm: boolean = applicationConstants.FALSE;
  editViewButton:boolean = applicationConstants.FALSE;
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService,private compoundInterestProductDefinitionService : CompoundInterestProductDefinitionService,
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
    this.ciLoanproductdefinition = [
      { field: 'name', header: 'LOANS.PRODUCT_NAME' },
      { field: '', header: 'LOANS.RATE_OF_INTEREST' },
      { field: 'eligibleMInAmount', header: 'LOANS.MINIMUM_AMOUNT' },
      { field: 'eligibleMaxAmount',header:'LOANS.MAXIMUM_AMOUNT'},
      { field: 'effectiveStartDate',header:'LOANS.EFFECTIVE_START_DATE'},
      { field: 'status',header:'LOANS.STATUS'}
    ];
    this.getAllCiProductDefinitions();
}
/**
    @author vinitha
    @implements Routes to add CI loans Product Defination Stepper
   */
  addciproductdefinition(){
    this.router.navigate([Loantransactionconstant.COMPOUND_INTEREST_PRODUCT_CONFIGURATION]);
  }

  /**
    @author vinitha
    @implements Routes to View CI loans Product Defination Details
   */
    viewciproductdefinition(rowData: any) {
    this.router.navigate([Loantransactionconstant.VIEW_COMPOUND_INTEREST_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.ciProductId),editbtn:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
  }
  /**
    @author vinitha
    @implements Routes to Edit CI loans Product Defination Stepper
   */
    editciproductdefinition(rowData: any) {
    this.router.navigate([Loantransactionconstant.VIEW_COMPOUND_INTEREST_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.ciProductId) ,isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) }});
    this.editViewButton =applicationConstants.TRUE;
  }
  /**
    @author vinitha
    @implements Get All CI loans Configuration details 
    @returns list of CI loans Configuration details
   */
    getAllCiProductDefinitions() {
    this.compoundInterestProductDefinitionService.getAllCompoundInterestProductDefinition().subscribe((data: any) => {
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
