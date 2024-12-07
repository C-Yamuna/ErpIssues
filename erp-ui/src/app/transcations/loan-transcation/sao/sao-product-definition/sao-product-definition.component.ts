import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { Loantransactionconstant } from '../../loan-transaction-constant';
import { SaoProductDefinition } from './shared/sao-product-definition.model';
import { SaoProductDefinitionsService } from './shared/sao-product-definitions.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-sao-product-definition',
  templateUrl: './sao-product-definition.component.html',
  styleUrls: ['./sao-product-definition.component.css']
})
export class SaoProductDefinitionComponent {
  responseModel!: Responsemodel;
  saoLoanproductdefinition: any[] = [];
  showForm: boolean = applicationConstants.FALSE;
  editViewButton:boolean = applicationConstants.FALSE;
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];

  constructor(private router: Router,private translate: TranslateService,private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService,private saoProductDefinitionsService : SaoProductDefinitionsService,
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
    this.saoLoanproductdefinition = [
      { field: 'name', header: 'LOANS.PRODUCT_NAME' },
      { field: '', header: 'LOANS.RATE_OF_INTEREST' },
      { field: 'eligibleMInAmount', header: 'LOANS.MINIMUM_AMOUNT' },
      { field: 'eligibleMaxAmount',header:'LOANS.MAXIMUM_AMOUNT'},
      { field: 'effectiveStartDate',header:'LOANS.EFFECTIVE_START_DATE'},
      { field: 'status',header:'LOANS.STATUS'}
    ];
    this.getAllSaoProductDefinitions();
}
/**
    @author vinitha
    @implements Routes to add sao loans Product Defination Stepper
   */
  addsaoproductdefinition(){
    this.router.navigate([Loantransactionconstant.SAO_PRODUCT_CONFIGURATION]);
  }

  /**
    @author vinitha
    @implements Routes to View sao loans Product Defination Details
   */
    viewsaoproductdefinition(rowData: any) {
    this.router.navigate([Loantransactionconstant.VIEW_SAO_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.saoProductId),editbtn:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
  }
  /**
    @author vinitha
    @implements Routes to Edit sao loans Product Defination Stepper
   */
    editsaoproductdefinition(rowData: any) {
    this.router.navigate([Loantransactionconstant.VIEW_SAO_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.saoProductId) ,isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) }});
    this.editViewButton =applicationConstants.TRUE;
  }
  /**
    @author vinitha
    @implements Get All sao loans Configuration details 
    @returns list of sao loans Configuration details
   */
    getAllSaoProductDefinitions() {
    this.saoProductDefinitionsService.getAllSaoProductDefinitions().subscribe((data: any) => {
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
