import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { savingsbanktransactionconstant } from '../savingsbank-transaction-constant';
import { ProductDefinitionService } from './add-sb-product-definition/shared/product-definition.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SbProductDefinitionService } from './shared/sb-product-definition.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-savings-bank-product-definition',
  templateUrl: './savings-bank-product-definition.component.html',
  styleUrls: ['./savings-bank-product-definition.component.css']
})
export class SavingsBankProductDefinitionComponent {
  sbproductdefinition: any[] = [];
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  value: number = 0;
  gridList: any[] = [];
  pacsId: any;
  responseModel!: Responsemodel;
  orgnizationSetting: any;
  msgs: any[] = [];
  showForm: boolean = false;
  editViewButton:boolean=false;
  constructor(private router: Router, private translate: TranslateService, private commonFunctionsService: CommonFunctionsService,
    private sbProductDefinitionService: SbProductDefinitionService, private commonComponent: CommonComponent,private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService) { }
  ngOnInit() {
    this.pacsId = 1;
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use('en');
      }
    });
    this.sbproductdefinition = [
      { field: 'productName', header: 'DEMANDDEPOSITS.PRODUCT_TYPE' },
      { field: 'minDepositAmountForAccountOpen', header: 'DEMANDDEPOSITS.ACCOUNT_OPENING_BALANCE' },
      { field: 'rateOfInterst', header: 'DEMANDDEPOSITS.RATE_OF_INTEREST' },
      { field: 'minBalanceMaintainInAccount', header: 'DEMANDDEPOSITS.MINIMUM_MAINTAIN_BALANCE' },
      { field: 'effectiveStartDate', header: 'DEMANDDEPOSITS.EFFECTIVE_START_DATE' },
      { field: 'status', header: 'DEMANDDEPOSITS.STATUS' },
    ];
    let tabLabels = [
      'No Of Products',
      'Approved',
      'Rejected',
      'Pending',
      'Text',
      'Text',

    ];
    this.items = tabLabels.map((label, index) => ({ label: label, value: `${index + 1}` }));
    //  tabLabels = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
    this.getallProductDefinitions();
  }
  addsbproductdefinition() {
    this.router.navigate([savingsbanktransactionconstant.SB_GENERAL_CONFIGURATION]);
  }
  view(rowData: any) {
    this.router.navigate([savingsbanktransactionconstant.SB_VIEW_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id),editbtn:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE)}});
  }

  editproductdefinition(rowData: any) {
    this.router.navigate([savingsbanktransactionconstant.SB_VIEW_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) ,isGridPage:this.encryptDecryptService.encrypt(applicationConstants.IN_ACTIVE) }});
    this.editViewButton =true;
  }
//get all product definitions by pacsid
  //  @author vinitha
  getallProductDefinitions() {
    this.commonComponent.startSpinner();
   this.orgnizationSetting = this.commonComponent.orgnizationSettings();
   this.sbProductDefinitionService.getAllsbProductDefinition().subscribe((data: any) => {
     this.responseModel = data;
 
     if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
       this.gridList = this.responseModel.data;
      }
       this.gridList = this.gridList.map(sbproductdefinition => {
        sbproductdefinition.effectiveStartDate = this.datePipe.transform(sbproductdefinition.effectiveStartDate, this.orgnizationSetting.datePipe) || '';
      
         return sbproductdefinition
      
       });
     }
      this.commonComponent.stopSpinner();
   }, error => {
     this.msgs = [];
     this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
     this.commonComponent.stopSpinner();
   });
 }
  onChange() {
    this.showForm = !this.showForm;
  }

}
