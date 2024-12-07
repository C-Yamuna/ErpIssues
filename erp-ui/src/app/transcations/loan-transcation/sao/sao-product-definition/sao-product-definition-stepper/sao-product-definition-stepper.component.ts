import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Loantransactionconstant } from '../../../loan-transaction-constant';
import { SaoProductDefinitionsService } from '../shared/sao-product-definitions.service';
import { SaoProductDefinition } from '../shared/sao-product-definition.model';
import { SaoInterestPolicyConfig } from './sao-interest-policy-conig/shared/sao-interest-policy-config.model';
import { SaoLoanLinkedShareCapital } from './sao-loan-linked-share-capital/shared/sao-loan-linked-share-capital.model';
import { SaoProductCharges } from './sao-product-charges-config/shared/sao-product-charges.model';
import { SaoProdPurpose } from './sao-prod-purpose-config/shared/sao-prod-purpose.model';
import { SaoRequiredDocuments } from './sao-required-documents-config/shared/sao-required-documents.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonStatusData } from 'src/app/transcations/common-status-data.json';

@Component({
  selector: 'app-sao-product-definition-stepper',
  templateUrl: './sao-product-definition-stepper.component.html',
  styleUrls: ['./sao-product-definition-stepper.component.css']
})
export class SaoProductDefinitionStepperComponent {
  saoProductDefinitionModel :SaoProductDefinition = new SaoProductDefinition();
  saoInterestPolicyConfigModel :SaoInterestPolicyConfig = new SaoInterestPolicyConfig();
  saoLoanLinkedShareCapitalModel :SaoLoanLinkedShareCapital = new SaoLoanLinkedShareCapital();
  saoProductChargesModel : SaoProductCharges = new SaoProductCharges();
  saoProdPurposesModel : SaoProdPurpose = new SaoProdPurpose();
  saoRequiredDocumentsModel : SaoRequiredDocuments = new SaoRequiredDocuments();
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
  saoProdCollateralsConfigList: any[] = [];
  constructor(public messageService: MessageService, private router: Router,
    private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent, private commonFunctionService: CommonFunctionsService, private translate: TranslateService,
   private ref: ChangeDetectorRef,private saoProductDefinitionsService : SaoProductDefinitionsService,
   private datePipe: DatePipe) {
    
   }
/**
    @author Vinitha
    @implements Sao Loans Stepper Configuration details 
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
        label: 'Product Definition',icon: 'fa fa-product-hunt', routerLink: Loantransactionconstant.SAO_PRODUCT_CONFIGURATION,
        command: (event: any) => {
          this.activeIndex = 0;   
        }
      },
      {
        label: 'Interest Policy',icon: 'fa fa-newspaper-o', routerLink: Loantransactionconstant.SAO_INTEREST_POLICY_CONFIG,
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Linked Share Capital',icon: 'fa fa-link', routerLink: Loantransactionconstant.SAO_LOAN_LINKED_SHARE_CAPITAL,
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'Charges',icon: 'fa fa-list-alt', routerLink: Loantransactionconstant.SAO_PRODUCT_CHARGES_CONFIG,
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },
      {
        label: 'Purpose',icon: 'fa fa-bandcamp', routerLink: Loantransactionconstant.SAO_PROD_PURPOSE_CONFIG,
        command: (event: any) => {
          this.activeIndex = 4;
        }
      },
      {
        label: 'Required Documents',icon: 'fa fa-file-text', routerLink: Loantransactionconstant.SAO_REQUIRED_DOCUMENT_CONFIG,
        command: (event: any) => {
          this.activeIndex = 5;
        }
      }
    ];
  });


this.currentStepper();
}
  currentStepper() {
    this.saoProductDefinitionsService.currentStep.subscribe((data: any) => {
      if (data != undefined || null) {
        this.activeIndex = data.stepperIndex
        this.changeStepperSelector(this.activeIndex);
        this.buttonDisbled = (data.formValid == applicationConstants.FALSE) ? applicationConstants.TRUE : applicationConstants.FALSE;
        if (data.data != null && data.data != undefined) {
          if (this.activeIndex == 0) {
            this.saoProductDefinitionModel = data.data;
            this.isSaveContinueEnable = applicationConstants.FALSE;
          } else if (this.activeIndex == 1) {
            this.saoInterestPolicyConfigModel = data.data;
          } else if (this.activeIndex == 2) {
            this.saoLoanLinkedShareCapitalModel = data.data;
          } else if (this.activeIndex == 3) {
            this.saoProductChargesModel = data.data;
          } else if (this.activeIndex == 4) {
            this.saoProdPurposesModel = data.data;
          } else if (this.activeIndex == 5) {
            this.saoRequiredDocumentsModel = data.data;
          }
        }
      }
    });
  }

/**
    @author Vinitha
    @implements Sao Loans details Stepper navigation details 
    @argument ProductId
   */
navigateTo(activeIndex: any,saveId:any) {
  switch (activeIndex) {
    case 0:
      this.router.navigate([Loantransactionconstant.SAO_PRODUCT_CONFIGURATION], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
    case 1:
      this.router.navigate([Loantransactionconstant.SAO_INTEREST_POLICY_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
    case 2:
      this.router.navigate([Loantransactionconstant.SAO_LOAN_LINKED_SHARE_CAPITAL], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
      case 3:
        this.router.navigate([Loantransactionconstant.SAO_PRODUCT_CHARGES_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
        case 4:
      this.router.navigate([Loantransactionconstant.SAO_PROD_PURPOSE_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
      case 5:
        this.router.navigate([Loantransactionconstant.SAO_REQUIRED_DOCUMENT_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
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
    this.addOrUpdateSaoProductDefination(activeIndex, "next");
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
  this.router.navigate([Loantransactionconstant.SAO_PRODUCT_DEFINITION]);
  this.stepperCreation();
}

/**
    @author vinitha
    @implements It recieves the data from stepper
    @argument activeIndex
   */
getProductDetailsObservable() {
  this.saoProductDefinitionsService.currentStep.subscribe((data: any) => {
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
  this.router.navigate([Loantransactionconstant.SAO_PRODUCT_DEFINITION]);
  }
  
  submit(){
  this.buttonDisbled = applicationConstants.TRUE;
  this.router.navigate([Loantransactionconstant.VIEW_SAO_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(this.savedID),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.ACTIVE)} });
  }
  
  
  save() {
  this.buttonDisbled = applicationConstants.TRUE;
  this.router.navigate([Loantransactionconstant.SAO_PRODUCT_DEFINITION]);
  }
  /**
    @author vinitha
    @implements It navigates to grid
   */
  navigateToGrid() {
    this.buttonDisbled = applicationConstants.TRUE;
    this.router.navigate([Loantransactionconstant.SAO_PRODUCT_DEFINITION]);
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
    @implements It Creates the Recurring Deposit
   */
  stepperCreation() {
    this.commonFunctionService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use(this.commonFunctionService.getStorageValue('language'));
      }
      this.translate.get('Loantransactionconstant.PRODUCT_DEFINITION').subscribe((text: string) => {
        this.productDefinition = text;
      });
      this.translate.get('Loantransactionconstant.INTEREST_POLICY').subscribe((text: string) => {
        this.interestPolicyDetails = text;
      });
      this.translate.get('Loantransactionconstant.LINKED_SHARE_CAPITAL').subscribe((text: string) => {
        this.linkedShareCapital = text;
      });
      this.translate.get('Loantransactionconstant.CHARGES').subscribe((text: string) => {
        this.charges = text;
      });
      this.translate.get('Loantransactionconstant.PURPOSE').subscribe((text: string) => {
        this.purpose = text;
      });
      this.translate.get('Loantransactionconstant.REQUIRED_DOCUMENTS').subscribe((text: string) => {
        this.reqiredDocumentsDetails = text;
        this.items = [
          {
            label: this.productDefinition
          },
          {
            label: this.interestPolicyDetails
          },
          {
            label: this.linkedShareCapital
          },
          {
            label: this.charges
          },
          {
            label: this.purpose
          },
          {
            label: this.reqiredDocumentsDetails
          }
        ];
        
      });
    });
  }

  /**
    @author vinitha
    @implements It Saves the Sao Loans data 
    @argument generalConfigModel,activeIndex,buttonName
   */
  addOrUpdateSaoProductDefination(activeIndex:any, buttonName:any) {

  this.saoProductDefinitionModel.pacsId = this.commonFunctionService.getStorageValue(applicationConstants.PACS_ID);
  this.saoProductDefinitionModel.statusName = CommonStatusData.CREATED;
  if(this.saoProductDefinitionModel.effectiveStartDate != undefined && this.saoProductDefinitionModel.effectiveStartDate != null)
    this.saoProductDefinitionModel.effectiveStartDate = this.commonFunctionService.getUTCEpoch(new Date(this.saoProductDefinitionModel.effectiveStartDate));
 
  if (this.saoProductDefinitionModel.id != null) {
  
  this.saoProductDefinitionsService.updateSaoProductDefinitions(this.saoProductDefinitionModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
        this.saoProdCollateralsConfigList = this.responseModel.data; 
      if(null != this.saoProductDefinitionModel.effectiveStartDate && undefined != this.saoProductDefinitionModel.effectiveStartDate)
        this.saoProductDefinitionModel.effectiveStartDate=this.datePipe.transform(this.saoProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
     
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
  
  this.saoProductDefinitionsService.addSaoProductDefinitions(this.saoProductDefinitionModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
        this.saoProdCollateralsConfigList = this.responseModel.data; 
      if(null != this.saoProductDefinitionModel.effectiveStartDate && undefined != this.saoProductDefinitionModel.effectiveStartDate)
        this.saoProductDefinitionModel.effectiveStartDate=this.datePipe.transform(this.saoProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);

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
        this.stepperCreation();
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
