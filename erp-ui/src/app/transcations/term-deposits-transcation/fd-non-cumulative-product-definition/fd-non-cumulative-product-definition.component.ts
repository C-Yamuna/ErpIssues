import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { termdeposittransactionconstant } from '../term-deposit-transaction-constant';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { FdNonCumulativeProductDefinition } from './shared/fd-non-cumulative-product-definition.model';
import { FdNonCumulativeProductDefinitionService } from './shared/fd-non-cumulative-product-definition.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fd-non-cumulative-product-definition',
  templateUrl: './fd-non-cumulative-product-definition.component.html',
  styleUrls: ['./fd-non-cumulative-product-definition.component.css']
})
export class FdNonCumulativeProductDefinitionComponent {
  responseModel!: Responsemodel;
  fdNonCumulativeproductdefinition: any[] = [];
  showForm: boolean = applicationConstants.FALSE;
  editViewButton:boolean = applicationConstants.FALSE;
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService,private fdNonCumulativeProductDefinitionService : FdNonCumulativeProductDefinitionService,private datePipe: DatePipe,
    private commonComponent: CommonComponent){ 
      
    }

    /**
    @author vinitha
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
    this.fdNonCumulativeproductdefinition = [
      { field: 'name', header: 'TERMDEPOSITSTRANSACTION.PRODUCT_NAME' },
      { field: '', header: 'TERMDEPOSITSTRANSACTION.RATE_OF_INTEREST' },
      { field: 'minDepositAmount', header: 'TERMDEPOSITSTRANSACTION.MINIMUM_AMOUNT' },
      { field: 'maxDepositAmount',header:'TERMDEPOSITSTRANSACTION.MAXIMUM_AMOUNT'},
      { field: 'effectiveStartDate',header:'TERMDEPOSITSTRANSACTION.EFFECTIVE_START_DATE'},
      { field: 'status',header:'TERMDEPOSITSTRANSACTION.STATUS'}
    ];
    this.getAllFdNonCumulativeProductDefinition();
}
/**
    @author vinitha
    @implements Routes to add Fd Cummulative Product Defination Stepper
   */
  addFdNonCumulative(){
    this.router.navigate([termdeposittransactionconstant.FD_NON_CUMULATIVE_GENERAL_CONFIG]);
  }
  /**
    @author vinitha
    @implements Routes to View Fd Cummulative Product Defination Details
   */
    viewNonFdCummulative(rowData: any) {
    this.router.navigate([termdeposittransactionconstant.VIEW_FD_NON_CUMMULATIVE_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.fdNonCummulativeProductId),editbtn:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
  }
  /**
    @author vinitha
    @implements Routes to Edit Fd Cummulative Product Defination Stepper
   */
  editNonFdCummulative(rowData: any) {
    this.router.navigate([termdeposittransactionconstant.VIEW_FD_NON_CUMMULATIVE_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.fdNonCummulativeProductId) ,isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) }});
    this.editViewButton =applicationConstants.TRUE;
  }
  /**
    @author vinitha
    @implements Get All Fd Cummulative Configuration details 
    @returns list of Fd Cummulative Configuration details
   */
    getAllFdNonCumulativeProductDefinition() {
    this.fdNonCumulativeProductDefinitionService.getAllFdNonCumulativeProductDefinition().subscribe((data: any) => {
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
