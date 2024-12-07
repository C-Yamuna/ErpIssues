import { ChangeDetectorRef, Component } from '@angular/core';
import { RecurringDepositProductDefinition } from '../shared/recurring-deposit-product-definition.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { RecurringDepositProductDefinitionService } from '../shared/recurring-deposit-product-definition.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { termdeposittransactionconstant } from '../../term-deposit-transaction-constant';
import { CommonStatusData } from 'src/app/transcations/common-status-data.json';
import { RecurringDepositInterestPolicy } from './recurring-deposit-interest-policy/shared/recurring-deposit-interest-policy.model';
import { RecurringDepositRequiredDocuments } from './recurring-deposit-required-documents/shared/recurring-deposit-required-documents.model';
import { RecurringDepositPenalityConfig } from './recurring-deposit-penality-config/shared/recurring-deposit-penality-config.model';

@Component({
  selector: 'app-add-recurring-deposit-product-definition',
  templateUrl: './add-recurring-deposit-product-definition.component.html',
  styleUrls: ['./add-recurring-deposit-product-definition.component.css']
})
export class AddRecurringDepositProductDefinitionComponent {
  recurringDepositProductDefinitionModel :RecurringDepositProductDefinition = new RecurringDepositProductDefinition();
  recurringDepositInterestPolicyModel :RecurringDepositInterestPolicy = new RecurringDepositInterestPolicy();
  recurringDepositPenalityConfigModel :RecurringDepositPenalityConfig = new RecurringDepositPenalityConfig();
  recurringDepositRequiredDocumentsModel : RecurringDepositRequiredDocuments = new RecurringDepositRequiredDocuments();
  responseModel!: Responsemodel;
  activeIndex: number = 0;
  msgs: any[] = [];
  buttonDisbled: boolean = applicationConstants.FALSE;
  activeItem!: MenuItem;
  items: MenuItem[] = [];
  menuDisabled:  boolean = applicationConstants.TRUE;
  nextDisable: boolean = applicationConstants.FALSE;
  serviceUrl: any;
  generalConfig: any;
  interestPolicyDetails: any;
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
   private ref: ChangeDetectorRef,private recurringDepositProductDefinitionService : RecurringDepositProductDefinitionService,
   private datePipe: DatePipe) {
    
   }
/**
    @author Vinitha
    @implements Recurring Deposit Stepper Configuration details 
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
        label: 'General Config',icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_GENERAL_CONFIG,
        command: (event: any) => {
          this.activeIndex = 0;   
        }
      },
      {
        label: 'Interest Policy',icon: 'fa fa-newspaper-o', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_INTEREST_POLICY,
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Penality Config',icon: 'fa fa-paw', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_PENALITY_CONFIG,
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'Required Documents',icon: 'fa fa-file-text', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_REQUIRED_DOCUMENTS_CONFIG,
        command: (event: any) => {
          this.activeIndex = 3;
        }
      }
    ];
  });


this.currentStepper();
}
currentStepper() {
  this.recurringDepositProductDefinitionService.currentStep.subscribe((data: any) => {
    if (data != undefined || null) {
      this.activeIndex = data.stepperIndex
      this.changeStepperSelector(this.activeIndex);
      this.buttonDisbled = (data.formValid == applicationConstants.FALSE) ? applicationConstants.TRUE : applicationConstants.FALSE;
      if (data.data != null && data.data != undefined) {
        if (this.activeIndex == 0) {
          this.recurringDepositProductDefinitionModel = data.data;
          this.isSaveContinueEnable = applicationConstants.FALSE;
        } else if (this.activeIndex == 1) {
          this.recurringDepositInterestPolicyModel = data.data;      
      } else if (this.activeIndex == 2) {
        this.recurringDepositPenalityConfigModel = data.data;
      }else if (this.activeIndex == 3) {
          this.recurringDepositRequiredDocumentsModel = data.data;
        }
      }
    }
  });
}

/**
    @author Vinitha
    @implements Recurring Deposit details Stepper navigation details 
    @argument ProductId
   */
navigateTo(activeIndex: any,saveId:any) {
  switch (activeIndex) {
    case 0:
      this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_GENERAL_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
    case 1:
      this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_INTEREST_POLICY], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
    case 2:
      this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_PENALITY_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
      case 3:
        this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_REQUIRED_DOCUMENTS_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
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
    this.addOrUpdateRecurringDepositProductDefination(activeIndex, "next");
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
}

/**
    @author vinitha
    @implements Saves the data
    @argument activeIndex
   */
saveContinue(activeIndex:any) {
  this.activeIndex = 0;
  this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_PRODUCT_DEFINITION]);
  this.stepperCreation();
}

/**
    @author vinitha
    @implements It recieves the data from stepper
    @argument activeIndex
   */
getProductDetailsObservable() {
  this.recurringDepositProductDefinitionService.currentStep.subscribe((data: any) => {
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
  this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_PRODUCT_DEFINITION]);
  }
  
  submit(){
  this.buttonDisbled = applicationConstants.TRUE;
  this.router.navigate([termdeposittransactionconstant.VIEW_RECURRING_DEPOSIT_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(this.savedID),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.ACTIVE) } });
  }
  
  
  save() {
  this.buttonDisbled = applicationConstants.TRUE;
  this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_PRODUCT_DEFINITION]);
  }
  /**
    @author vinitha
    @implements It navigates to grid
   */
  navigateToGrid() {
    this.buttonDisbled = applicationConstants.TRUE;
    this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_PRODUCT_DEFINITION]);
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
      this.translate.get('TERMDEPOSITSTRANSACTION.GENERAL_CONFIG').subscribe((text: string) => {
        this.generalConfig = text;
      });
      this.translate.get('TERMDEPOSITSTRANSACTION.INTEREST_POLICY').subscribe((text: string) => {
        this.interestPolicyDetails = text;
      });
      this.translate.get('TERMDEPOSITSTRANSACTION.PENALITY_CONFIG').subscribe((text: string) => {
        this.interestPolicyDetails = text;
      });
      this.translate.get('TERMDEPOSITSTRANSACTION.REQUIRED_DOCUMENTS').subscribe((text: string) => {
        this.reqiredDocumentsDetails = text;
        this.items = [
          {
            label: this.generalConfig
          },
          {
            label: this.interestPolicyDetails
          },
          {
            label: this.penalityConfig
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
    @implements It Saves the Recurring Deposit data 
    @argument generalConfigModel,activeIndex,buttonName
    @returns generalConfigModel
   */
  addOrUpdateRecurringDepositProductDefination(activeIndex:any, buttonName:any) {
  this.recurringDepositProductDefinitionModel.pacsId = this.commonFunctionService.getStorageValue(applicationConstants.PACS_ID);
  this.recurringDepositProductDefinitionModel.statusName = CommonStatusData.CREATED;
  if(this.recurringDepositProductDefinitionModel.effectiveStartDate != undefined && this.recurringDepositProductDefinitionModel.effectiveStartDate != null)
    this.recurringDepositProductDefinitionModel.effectiveStartDate = this.commonFunctionService.getUTCEpoch(new Date(this.recurringDepositProductDefinitionModel.effectiveStartDate));
 
  if (this.recurringDepositProductDefinitionModel.id != null) {
  
  this.recurringDepositProductDefinitionService.updateRecurringDepositProductDefinition(this.recurringDepositProductDefinitionModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
      if(null != this.recurringDepositProductDefinitionModel.effectiveStartDate && undefined != this.recurringDepositProductDefinitionModel.effectiveStartDate)
        this.recurringDepositProductDefinitionModel.effectiveStartDate=this.datePipe.transform(this.recurringDepositProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);
     
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
  
  this.recurringDepositProductDefinitionService.addRecurringDepositProductDefinition(this.recurringDepositProductDefinitionModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {

      if(null != this.recurringDepositProductDefinitionModel.effectiveStartDate && undefined != this.recurringDepositProductDefinitionModel.effectiveStartDate)
        this.recurringDepositProductDefinitionModel.effectiveStartDate=this.datePipe.transform(this.recurringDepositProductDefinitionModel.effectiveStartDate, this.orgnizationSetting.datePipe);

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
