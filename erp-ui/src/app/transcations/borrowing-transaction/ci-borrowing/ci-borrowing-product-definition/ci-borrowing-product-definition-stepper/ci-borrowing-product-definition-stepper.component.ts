import { ChangeDetectorRef, Component } from '@angular/core';
import { CiBorrowingProductDefinition } from '../shared/ci-borrowing-product-definition.model';
import { CiInterestPolicy } from './ci-interest-policy/shared/ci-interest-policy.model';
import { CiLinkedShareCapital } from './ci-linked-share-capital/shared/ci-linked-share-capital.model';
import { CiCharges } from './ci-charges/shared/ci-charges.model';
import { CiPurpose } from './ci-purpose/shared/ci-purpose.model';
import { CiRequiredDocuments } from './ci-required-documents/shared/ci-required-documents.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { CiBorrowingProductDefinitionService } from '../shared/ci-borrowing-product-definition.service';
import { BorrowingTransactionConstant } from '../../../borrowing-transaction-constants';
import { CommonStatusData } from 'src/app/transcations/common-status-data.json';

@Component({
  selector: 'app-ci-borrowing-product-definition-stepper',
  templateUrl: './ci-borrowing-product-definition-stepper.component.html',
  styleUrls: ['./ci-borrowing-product-definition-stepper.component.css']
})
export class CiBorrowingProductDefinitionStepperComponent {
  ciProductDefinitionModel :CiBorrowingProductDefinition = new CiBorrowingProductDefinition();
  ciInterestPolicyConfigModel :CiInterestPolicy = new CiInterestPolicy();
  ciLinkedShareCapitalModel :CiLinkedShareCapital = new CiLinkedShareCapital();
  ciProductChargesModel : CiCharges = new CiCharges();
  ciProdPurposesModel : CiPurpose = new CiPurpose();
  ciRequiredDocumentsModel : CiRequiredDocuments = new CiRequiredDocuments();
  responseModel!: Responsemodel;
  activeIndex: number = 0;
  msgs: any[] = [];
  buttonDisbled: boolean = applicationConstants.FALSE;
  activeItem!: MenuItem;
  items: MenuItem[] = [];
  menuDisabled:  boolean = applicationConstants.TRUE;
  nextDisable: boolean = applicationConstants.FALSE;
  serviceUrl: any;
  productDefinition: any;
  interestPolicyDetails: any;
  linkedShareCapital: any;
  charges: any;
  purpose: any;
  reqiredDocumentsDetails: any;
  penalityConfig: any;
  savedID: any;
  isEdit: any;
  orgnizationSetting: any;
  saveAndContinueFlag: boolean = applicationConstants.TRUE;
  isSaveContinueEnable: boolean = applicationConstants.FALSE;
  constructor(public messageService: MessageService, private router: Router,
    private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent, private commonFunctionService: CommonFunctionsService, private translate: TranslateService,
   private ref: ChangeDetectorRef,private ciBorrowingProductDefinitionService : CiBorrowingProductDefinitionService,
   private datePipe: DatePipe) {
    
   }
/**
    @author Vinitha
    @implements Ci Borrowings Stepper Configuration details 
    @argument ProductId
   */
ngOnInit() {
  this.activateRoute.queryParams.subscribe(params => {
    if (params['id'] != undefined) {
      let queryParams = this.encryptDecryptService.decrypt(params['id']);
      let qParams = queryParams;
      this.savedID = qParams;
        this.isEdit = applicationConstants.TRUE; 
    } else {
      this.isEdit = applicationConstants.FALSE;
    }
  });

  this.orgnizationSetting = this.commonComponent.orgnizationSettings();
  this.commonFunctionService.data.subscribe((res: any) => {
    if (res) {
      this.translate.use(res);
    } else {
      this.translate.use(this.commonFunctionService.getStorageValue('language'));
    }
    this.items = [
      {
        label: 'Product Definition',icon: 'fa fa-id-badge', routerLink: BorrowingTransactionConstant.CI_PRODUCT_CONFIGURATION,
        command: (event: any) => {
          this.activeIndex = 0;   
        }
      },
      {
        label: 'Interest Policy',icon: 'fa fa-newspaper-o', routerLink: BorrowingTransactionConstant.CI_INTEREST_POLICY_CONFIG,
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Linked Share Capital',icon: 'fa fa-link', routerLink: BorrowingTransactionConstant.CI_LINKED_SHARE_CAPITAL,
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'Charges',icon: 'fa fa-list-alt', routerLink: BorrowingTransactionConstant.CI_PRODUCT_CHARGES_CONFIG,
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },
     
      {
        label: 'Purpose',icon: 'fa fa-bandcamp', routerLink: BorrowingTransactionConstant.CI_PROD_PURPOSE_CONFIG,
        command: (event: any) => {
          this.activeIndex =4 ;
        }
      },
      {
        label: 'Required Documents',icon: 'fa fa-file-text', routerLink: BorrowingTransactionConstant.CI_REQUIRED_DOCUMENT_CONFIG,
        command: (event: any) => {
          this.activeIndex = 5;
        }
      }
    ];
  });


this.currentStepper();
}
  currentStepper() {
    this.ciBorrowingProductDefinitionService.currentStep.subscribe((data: any) => {
      if (data != undefined || null) {
        this.activeIndex = data.stepperIndex
        this.changeStepperSelector(this.activeIndex);
        this.buttonDisbled = (data.formValid == applicationConstants.FALSE) ? applicationConstants.TRUE : applicationConstants.FALSE;
        if (data.data != null && data.data != undefined) {
          if (this.activeIndex == 0) {
            this.ciProductDefinitionModel = data.data;
            this.isSaveContinueEnable = applicationConstants.FALSE;
          } else if (this.activeIndex == 1) {
            this.ciInterestPolicyConfigModel = data.data;
          } else if (this.activeIndex == 2) {
            this.ciLinkedShareCapitalModel = data.data;
          } else if (this.activeIndex == 3) {
            this.ciProductChargesModel = data.data;
          } else if (this.activeIndex == 4) {
            this.ciProdPurposesModel = data.data;
          } else if (this.activeIndex == 5) {
            this.ciRequiredDocumentsModel = data.data;
          }
        }
      }
    });
  }

/**
    @author Vinitha
    @implements Ci Borrowings details Stepper navigation details 
    @argument ProductId
   */
navigateTo(activeIndex: any,saveId:any) {
  switch (activeIndex) {
    case 0:
      this.router.navigate([BorrowingTransactionConstant.CI_PRODUCT_CONFIGURATION], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
    case 1:
      this.router.navigate([BorrowingTransactionConstant.CI_INTEREST_POLICY_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
    case 2:
      this.router.navigate([BorrowingTransactionConstant.CI_LINKED_SHARE_CAPITAL], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
      case 3:
        this.router.navigate([BorrowingTransactionConstant.CI_PRODUCT_CHARGES_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
       
        case 4:
      this.router.navigate([BorrowingTransactionConstant.CI_PROD_PURPOSE_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
      case 5:
        this.router.navigate([BorrowingTransactionConstant.CI_REQUIRED_DOCUMENT_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
  }
}

ngAfterContentChecked(): void {
  this.ref.detectChanges();
}

/**
    @author vinitha
    @implements Previous Step button navigation realated function
    @argument activeIndex
   */
prevStep(activeIndex: any) {
  this.activeIndex = activeIndex - 1;
  this.navigateTo(this.activeIndex,this.savedID);

}

/**
    @author Vinitha
    @implements Save data and next navigation realated function
    @argument activeIndex
   */

saveAndNext(activeIndex: number) {
  if (activeIndex == 0) {
    this.addOrUpdateCiProductDefination(activeIndex, "next");
  } else if (activeIndex == 1) {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID);
   } else if (activeIndex == 2) {
      this.activeIndex = activeIndex + 1;
      this.navigateTo(this.activeIndex,this.savedID);
  } else if (activeIndex == 3) {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID);
  }
  else if (activeIndex == 4) {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID);
  }
  else if (activeIndex == 5) {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID);
  }
  
}

/**
    @author vinitha
    @implements Saves the data
    @argument activeIndex
   */
saveContinue(activeIndex:any) {
  this.activeIndex = 0;
  this.router.navigate([BorrowingTransactionConstant.CI_PRODUCT_DEFINITION]);

}

/**
    @author vinitha
    @implements It recieves the data from stepper
    @argument activeIndex
   */
getProductDetailsObservable() {
  this.ciBorrowingProductDefinitionService.currentStep.subscribe((data: any) => {
    if (data != undefined) {
      this.changeStepperSelector(this.activeIndex);
      if (data.isDisable != null) {
        this.nextDisable = data.isDisable;
        this.buttonDisbled = (data.formValid == applicationConstants.FALSE) ? applicationConstants.TRUE : applicationConstants.FALSE;

      }
      this.serviceUrl = data.serviceUrl;
    }
  });
}

cancel(activeIndex: any){
  this.router.navigate([BorrowingTransactionConstant.CI_PRODUCT_DEFINITION]);
  }
  
  submit(){
  this.buttonDisbled = applicationConstants.TRUE;
  this.router.navigate([BorrowingTransactionConstant.VIEW_CI_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(this.savedID),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.ACTIVE) } });
  }
  
  
  save() {
  this.buttonDisbled = applicationConstants.TRUE;
  this.router.navigate([BorrowingTransactionConstant.CI_PRODUCT_DEFINITION]);
  }
  /**
    @author vinitha
    @implements It navigates to grid
   */
  navigateToGrid() {
    this.buttonDisbled = applicationConstants.TRUE;
    this.router.navigate([BorrowingTransactionConstant.CI_PRODUCT_DEFINITION]);
  }

  changeStepperSelector(item: any) {
    this.activeItem = item;
    this.menuDisabled = applicationConstants.TRUE;
    this.items.map((val, index) => {
      if (this.activeIndex == index) {
        val['disabled'] = applicationConstants.FALSE;
      } else {
        val['disabled'] = applicationConstants.TRUE;
      }
      return val;
    })
  }



  /**
    @author vinitha
    @implements It Saves the Ci Borrowings data 
    @argument generalConfigModel,activeIndex,buttonName
   */
  addOrUpdateCiProductDefination(activeIndex:any, buttonName:any) {

  this.ciProductDefinitionModel.pacsId = this.commonFunctionService.getStorageValue(applicationConstants.PACS_ID);
  this.ciProductDefinitionModel.statusName = CommonStatusData.CREATED;
  if(this.ciProductDefinitionModel.effectiveStartDate != undefined && this.ciProductDefinitionModel.effectiveStartDate != null)
    this.ciProductDefinitionModel.effectiveStartDate = this.commonFunctionService.getUTCEpoch(new Date(this.ciProductDefinitionModel.effectiveStartDate));
 
  if (this.ciProductDefinitionModel.id != null) {
  
  this.ciBorrowingProductDefinitionService.updateCiBorrowingProductDefinition(this.ciProductDefinitionModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
      if(null != this.ciProductDefinitionModel.effectiveStartDate && undefined != this.ciProductDefinitionModel.effectiveStartDate)
        this.ciProductDefinitionModel.effectiveStartDate=this.datePipe.transform(this.ciProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
     
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
  
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
      if (buttonName == "next") {
        this.activeIndex = activeIndex + 1;
        this.savedID = this.responseModel.data[0].id;
        this.navigateTo(this.activeIndex,this.savedID);
      } 
      }
    } else {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
  },
    error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  } else {
  
  this.ciBorrowingProductDefinitionService.addCiBorrowingProductDefinition(this.ciProductDefinitionModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
      if(null != this.ciProductDefinitionModel.effectiveStartDate && undefined != this.ciProductDefinitionModel.effectiveStartDate)
        this.ciProductDefinitionModel.effectiveStartDate=this.datePipe.transform(this.ciProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);

      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
      if (buttonName == "next") {
        this.activeIndex = activeIndex + 1;
        this.savedID = this.responseModel.data[0].id;
        this.navigateTo(this.activeIndex,this.savedID);
      } else if (buttonName == "saveAndContinue") {
        this.activeIndex = 0;
        this.router.navigate([]);
      } else {
        this.router.navigate([]);
      }
    }
    } else {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
  },
    error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
}
}
