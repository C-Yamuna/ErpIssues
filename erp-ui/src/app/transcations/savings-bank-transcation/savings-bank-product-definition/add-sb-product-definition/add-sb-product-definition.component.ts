import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { savingsbanktransactionconstant } from '../../savingsbank-transaction-constant';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductDefinitionService } from './shared/product-definition.service';
import { GeneralConfig } from './general-config/shared/general-config.model';
import { GeneralConfigService } from './general-config/shared/general-config.service';
import { CommonStatusData } from 'src/app/transcations/common-status-data.json';
import { DatePipe } from '@angular/common';
import { InterestPolicy } from './interest-policy/shared/interest-policy.model';
import { InterestPolicyService } from './interest-policy/shared/interest-policy.service';
import { TransactionLimitConfig } from './transaction-limit-config/shared/transaction-limit-config.model';
import { TransactionLimitConfigService } from './transaction-limit-config/shared/transaction-limit-config.service';
import { ServiceCharges } from './service-charges/shared/service-charges.model';
import { RequiredDocuments } from './required-documents/shared/required-documents.model';

@Component({
  selector: 'app-add-sb-product-definition',
  templateUrl: './add-sb-product-definition.component.html',
  styleUrls: ['./add-sb-product-definition.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddSbProductDefinitionComponent {
  items: MenuItem[] = [];
  generalConfigModel :GeneralConfig = new GeneralConfig();
  interestPolicyModel : InterestPolicy =new InterestPolicy();
  transactionLimitConfigModel:TransactionLimitConfig = new TransactionLimitConfig();
  serviceChargesModel:ServiceCharges=new ServiceCharges();
  requiredDocumentsModel :RequiredDocuments =new RequiredDocuments();
  activeIndex: number = 0;
  savedID: any;
  msgs: any[] = [];
  isEdit: any;
  responseModel!: Responsemodel;
  orgnizationSetting: any;
  saveAndContinueFlag: boolean = true;
  generalconfig:any;
  interestpolicy:any;
  transactionlimitconfig:any;
  servicecharges:any;
  requireddocuments:any;
  isSaveContinueEnable: boolean = false;
  buttonDisbled: boolean =true;
  // menuDisabled: any;
  activeItem: MenuItem | undefined;
  serviceUrl: any;
  nextDisable: boolean = false;
  pacsId=1;
  productId:any;
  menuDisabled: boolean = true;
  intpostingfrequencylist: any[] = [];
  constructor(public messageService: MessageService,private router:Router,
    private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent,private commonFunctionService: CommonFunctionsService,
    private translate: TranslateService,private productDefinitionService:ProductDefinitionService,
    private ref: ChangeDetectorRef,private generalConfigService:GeneralConfigService,private datePipe: DatePipe,
    private interestPolicyService: InterestPolicyService, private transactionLimitConfigService:TransactionLimitConfigService
  ) {}

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
        label: 'Product Definition',icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.SB_GENERAL_CONFIGURATION,
        command: (event: any) => {
          this.activeIndex = 0;   
        }
      },
      {
        label: 'Interest Policy',icon: 'fa fa-newspaper-o', routerLink: savingsbanktransactionconstant.SB_INTEREST_POLICY,
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Transaction Limit Config',icon: 'fa fa-exchange', routerLink: savingsbanktransactionconstant.SB_TRANSACTION_LIMIT_CONFIG,
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'Service Charges',icon: 'fa fa-list-alt', routerLink: savingsbanktransactionconstant.SB_SERVICE_CHARGES,
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },  
      {
        label: 'Required Documents',icon: 'fa fa-file-text', routerLink: savingsbanktransactionconstant.REQUIRED_DOCUMENTS,
        command: (event: any) => {
          this.activeIndex =4 ;
        }
      },
    ];
  });


this.currentStepper();
}
currentStepper() {
  this.productDefinitionService.currentStep.subscribe((data: any) => {
    if (data != undefined || null) {
      this.activeIndex = data.stepperIndex
      this.changeStepperSelector(this.activeIndex);
      this.buttonDisbled = (data.formValid == applicationConstants.FALSE) ? applicationConstants.TRUE : applicationConstants.FALSE;
      if (data.data != null && data.data != undefined) {
        if (this.activeIndex == 0) {
          this.generalConfigModel = data.data;
          this.isSaveContinueEnable = applicationConstants.FALSE;
        } else if (this.activeIndex == 1) {
          this.interestPolicyModel = data.data;
        } else if (this.activeIndex == 2) {
          this.transactionLimitConfigModel = data.data;
        } else if (this.activeIndex == 3) {
          this.serviceChargesModel = data.data;
        } else if (this.activeIndex == 4) {
          this.requiredDocumentsModel = data.data;
        }
      }
    }
  });
}
navigateTo(activeIndex: any,saveId:any) {
  
  switch (activeIndex) {
    case 0:
      this.router.navigate([savingsbanktransactionconstant.SB_GENERAL_CONFIGURATION], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
    case 1:
      this.router.navigate([savingsbanktransactionconstant.SB_INTEREST_POLICY], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
      case 2:
        this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION_LIMIT_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
        case 3:
          this.router.navigate([savingsbanktransactionconstant.SB_SERVICE_CHARGES], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
          break;
          
    case 4:
      this.router.navigate([savingsbanktransactionconstant.REQUIRED_DOCUMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
  }
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
ngAfterContentChecked(): void {
  this.ref.detectChanges();
}

onActiveIndexChange(event: any) {
  this.activeIndex = event.index;
  this.navigateTo(this.activeIndex, this.savedID);
}
prevStep(activeIndex: any) {
  this.activeIndex = activeIndex - 1;
  this.navigateTo(this.activeIndex,this.savedID);

}
saveAndNext(activeIndex: number) {
  if (activeIndex == 0) {
    this.addOrUpdateGeneralConfig(activeIndex, "next");
  } else if (activeIndex == 1) {
    this.addOrUpdateInterestPolicy(activeIndex,"next")
  } 
  else if (activeIndex == 2) {
    this.addOrUpdatetransactionlimitconfig(activeIndex,"next")
  }
  else if (activeIndex == 3) {
    this.addOrUpdateServiceCharges(activeIndex,"next")
    // this.activeIndex = activeIndex + 1;
    // this.navigateTo(this.activeIndex,this.savedID);

   
  }   
  else if (activeIndex == 4) {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID);
  }
}
saveContinue(activeIndex:any) {
  this.activeIndex = 0;
  this.router.navigate([savingsbanktransactionconstant.SB_PRODUCT_DEFINITION]);
  // this.stepperCreation();
}
navigateToGrid() {
  this.buttonDisbled = true;
  this.router.navigate([savingsbanktransactionconstant.SB_PRODUCT_DEFINITION]);
}

getProductDetailsObservable() {
  this.productDefinitionService.currentStep.subscribe((data: any) => {
    if (data != undefined) {
      this.changeStepperSelector(this.activeIndex);
      if (data.isDisable != null) {
        this.nextDisable = data.isDisable;
        this.buttonDisbled = (data.formValid == false) ? true : false;

      }
      this.serviceUrl = data.serviceUrl;
    }
  });
}
cancel(activeIndex: any){
this.router.navigate([savingsbanktransactionconstant.SB_PRODUCT_DEFINITION]);
this.activeIndex = 0;
}

submit(){
this.buttonDisbled = true;
this.router.navigate([savingsbanktransactionconstant.SB_VIEW_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(this.savedID),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.ACTIVE) } });
}


save() {
this.buttonDisbled = true;
this.router.navigate([savingsbanktransactionconstant.SB_VIEW_PRODUCT_DEFINITION]);
}
//add or update data for general config
 //  @author vinitha
addOrUpdateGeneralConfig(activeIndex:any, buttonName:any) {

  this.generalConfigModel.pacsId = this.commonFunctionService.getStorageValue(applicationConstants.PACS_ID);
  this.generalConfigModel.statusName = CommonStatusData.CREATED;
  if(this.generalConfigModel.effectiveStartDate != undefined && this.generalConfigModel.effectiveStartDate != null)
    this.generalConfigModel.effectiveStartDate = this.commonFunctionService.getUTCEpoch(new Date(this.generalConfigModel.effectiveStartDate));
 
  if (this.generalConfigModel.id != null) {
  
  this.generalConfigService.updateGeneralConfig(this.generalConfigModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
      if(null != this.generalConfigModel.effectiveStartDate && undefined != this.generalConfigModel.effectiveStartDate)
        this.generalConfigModel.effectiveStartDate=this.datePipe.transform(this.generalConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
     
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
  
  this.generalConfigService.addGeneralConfig(this.generalConfigModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
      if(null != this.generalConfigModel.effectiveStartDate && undefined != this.generalConfigModel.effectiveStartDate)
        this.generalConfigModel.effectiveStartDate=this.datePipe.transform(this.generalConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);

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
//add or update data for interest policy
 //  @author vinitha
 addOrUpdateInterestPolicy(activeIndex:any, buttonName:any) {
  // this.generalConfigModel.productId = this.productId;
  this.interestPolicyModel.statusName = CommonStatusData.CREATED;
  this.intpostingfrequencylist.filter((intpostingfrequency: any) => intpostingfrequency != null && intpostingfrequency.value == this.interestPolicyModel.interestPostingFrequency).map((act: { label: any; }) => {
    this.interestPolicyModel.interestPostingFrequencyName = act.label;
});

if(this.interestPolicyModel.interestPostingDate != undefined && this.interestPolicyModel.interestPostingDate != null)
  this.interestPolicyModel.interestPostingDate = this.commonFunctionService.getUTCEpoch(new Date(this.interestPolicyModel.interestPostingDate));

 
  if (this.interestPolicyModel.id != null) {
  
  this.interestPolicyService.updateInterestPolicy(this.interestPolicyModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
        if(null != this.interestPolicyModel.interestPostingDate && this.interestPolicyModel.interestPostingDate != undefined)
          this.interestPolicyModel.interestPostingDate=this.datePipe.transform(this.interestPolicyModel.interestPostingDate, this.orgnizationSetting.datePipe);
    


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
  
  this.interestPolicyService.addInterestPolicy(this.interestPolicyModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
        if(null != this.interestPolicyModel.interestPostingDate && undefined != this.interestPolicyModel.interestPostingDate)
          this.interestPolicyModel.interestPostingDate=this.datePipe.transform(this.interestPolicyModel.interestPostingDate, this.orgnizationSetting.datePipe);
    
    

  
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
// add or update data for transaction limit config
 //  @author vinitha
addOrUpdatetransactionlimitconfig(activeIndex:any, buttonName:any) {
  // this.generalConfigModel.productId = this.productId;

this.transactionLimitConfigModel.statusName = CommonStatusData.CREATED;

7


if (this.transactionLimitConfigModel.id != null) {

this.transactionLimitConfigService.updateTransactionLimitConfig(this.transactionLimitConfigModel).subscribe((response: any) => {
  this.responseModel = response;
  if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
    if (this.responseModel != null&& this.responseModel.data!= undefined) {
   

  7

    
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

this.transactionLimitConfigService.addTransactionLimitConfig(this.transactionLimitConfigModel).subscribe((response: any) => {
  this.responseModel = response;
  if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
    if (this.responseModel != null&& this.responseModel.data!= undefined) {
    

    
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
      // this.stepperCreation();
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

addOrUpdateServiceCharges(activeIndex:any,buttonName:any) {

  if (buttonName == "next") {
    this.activeIndex = activeIndex + 1;
    // this.savedID = this.responseModel.data[0].id;
    this.navigateTo(this.activeIndex,this.savedID)
  } 
  this.commonComponent.startSpinner();
}
addOrUpdaterequiredDocuments(activeIndex:any,buttonName:any) {
  if (buttonName == "next") {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID)
  } 
  this.commonComponent.startSpinner();
}
}
