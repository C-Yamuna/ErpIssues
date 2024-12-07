import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { termdeposittransactionconstant } from '../../term-deposit-transaction-constant';
import { TermDepositProductDefinitionService } from '../shared/term-deposit-product-definition.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { GeneralConfig } from './general-config/shared/general-config.model';
import { InterestPolicy } from './interest-policy/shared/interest-policy.model';
import { RequiredDocuments } from './required-documents/shared/required-documents.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonStatusData } from 'src/app/transcations/common-status-data.json';

@Component({
  selector: 'app-add-td-product-definition',
  templateUrl: './add-td-product-definition.component.html',
  styleUrls: ['./add-td-product-definition.component.css']
})
export class AddTdProductDefinitionComponent {
  generalConfigModel :GeneralConfig = new GeneralConfig();
  interestPolicyModel :InterestPolicy = new InterestPolicy();
  responseModel!: Responsemodel;
  requiredDocumentsModel :RequiredDocuments = new RequiredDocuments();
  activeIndex: number = 0;
  msgs: any[] = [];
  buttonDisbled: boolean =true;
  activeItem!: MenuItem;
  items: MenuItem[] = [];
  menuDisabled:  boolean = true;
  nextDisable: boolean = false;
  serviceUrl: any;
  generalConfig: any;
  interestPolicyDetails: any;
  reqiredDocumentsDetails: any;
  savedID: any;
  isEdit: any;
  orgnizationSetting: any;
  saveAndContinueFlag: boolean = true;
  isSaveContinueEnable: boolean = false;

  constructor(public messageService: MessageService, private router: Router,
    private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent, private commonFunctionService: CommonFunctionsService, private translate: TranslateService,
   private ref: ChangeDetectorRef, private termDepositProductDefinitionService:TermDepositProductDefinitionService,private datePipe: DatePipe) {
    
   }
/**
    @author Phanidher
    @implements Fd Cummulative Stepper Configuration details 
    @argument ProductId
   */
// ngOnInit() {
//   this.activateRoute.queryParams.subscribe(params => {
//     if (params['id'] != undefined) {
//       let queryParams = this.encryptDecryptService.decrypt(params['id']);
//       let qParams = queryParams;
//       this.savedID = qParams;
//         this.isEdit = true; 
//     } else {
//       this.isEdit = false;
//     }
//   });
//   this.orgnizationSetting = this.commonComponent.orgnizationSettings();
//   this.getProductDetailsObservable();
//   if (this.savedID != undefined) {
//     this.saveAndContinueFlag = applicationConstants.FALSE;
//     this.commonFunctionService.data.subscribe((res: any) => {
//       if (res) {
//         this.translate.use(res);
//       } else {
//         this.translate.use(this.commonFunctionService.getStorageValue('language'));
//       }
//       this.translate.get('TERMDEPOSITSTRANSACTION.GENERAL_CONFIG').subscribe((text: string) => {
//         this.generalConfig = text;
//       });
//       this.translate.get('TERMDEPOSITSTRANSACTION.INTEREST_POLICY').subscribe((text: string) => {
//         this.interestPolicyDetails = text;
//       });
//       this.translate.get('TERMDEPOSITSTRANSACTION.REQUIRED_DOCUMENTS').subscribe((text: string) => {
//         this.reqiredDocumentsDetails = text;
//         this.items = [
//           {
//             label: this.generalConfig,icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.TERMDEPOSIT_GENERAL_CONFIG, queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
//             disabled: this.menuDisabled,
//             command: (event: any) => {
//               this.activeIndex = 0;
//             }
//           },
         
//           {
//             label: this.interestPolicyDetails,icon: 'fa fa-newspaper-o' , routerLink: termdeposittransactionconstant.TERMDEPOSIT_INTEREST_POLICY, queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
//             disabled: this.menuDisabled,
//             command: (event: any) => {
//               this.activeIndex = 1;
//             }
//           },
//           {
//             label: this.reqiredDocumentsDetails,icon: 'fa fa-file-text',routerLink: termdeposittransactionconstant.TERMDEPOSIT_REQUIRED_DOCUMENTS, queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
//             disabled: this.menuDisabled,
//             command: (event: any) => {
//               this.activeIndex = 3;
//             }
//           }
         
//         ];
//         this.termDepositProductDefinitionService.currentStep.subscribe((data: any) => {
//           if (data != undefined || null) {
//             this.activeIndex = data.stepperIndex
//             if(this.savedID == null){
//               this.changeStepperSelector(this.activeIndex);
//             }
//             this.buttonDisbled = (data.formValid == false) ? true : false;
//             if (data.data != null) {
//               if (this.activeIndex == 0) {
//                 this.generalConfigModel = data.data;
//                 this.isSaveContinueEnable = false;
//               } else if (this.activeIndex == 1) {
//                 this.interestPolicyModel = data.data;
//               }else if (this.activeIndex == 2) {
//                 this.requiredDocumentsModel = data.data;
//               }
//             }
//           }
//         })
//       });
//     });
//   }
//   else {
//     this.saveAndContinueFlag = applicationConstants.TRUE;
//     this.commonFunctionService.data.subscribe((res: any) => {
//       if (res) {
//         this.translate.use(res);
//       } else {
//         this.translate.use(this.commonFunctionService.getStorageValue('language'));
//       }
//       this.translate.get('TERMDEPOSITSTRANSACTION.GENERAL_CONFIG').subscribe((text: string) => {
//         this.generalConfig = text;
//       });
//       this.translate.get('TERMDEPOSITSTRANSACTION.INTEREST_POLICY').subscribe((text: string) => {
//         this.interestPolicyDetails = text;
//       });
//       this.translate.get('TERMDEPOSITSTRANSACTION.REQUIRED_DOCUMENTS').subscribe((text: string) => {
//         this.reqiredDocumentsDetails = text;
//         this.items = [
//           {
//             label: this.generalConfig,icon: 'fa fa-id-badge'
//           },
//           {
//             label: this.interestPolicyDetails,icon: 'fa fa-newspaper-o'
//           },
//           {
//             label: this.reqiredDocumentsDetails,icon: 'fa fa-file-text'

//           },
//         ]
//         this.termDepositProductDefinitionService.currentStep.subscribe((data: any) => {
//           if (data != undefined || null) {
//             this.activeIndex = data.stepperIndex;
//             if(this.savedID == null){
//               this.changeStepperSelector(this.activeIndex);
//             }
//             this.buttonDisbled = (data.formValid == false) ? true : false;
//             if (data.data != null) {
//               if (this.activeIndex == 0) {
//                 this.generalConfigModel = data.data;
//                 this.isSaveContinueEnable = false;
//               } else if (this.activeIndex == 1) {
//                 this.interestPolicyModel = data.data;
//               } else if (this.activeIndex == 2) {
//                 this.requiredDocumentsModel = data.data;
//               }
//             }
//           }
//         })
//       });
//     });
//   }

// // this.currentStepper();
// }
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
        label: 'General Config',icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.TERMDEPOSIT_GENERAL_CONFIG,
        command: (event: any) => {
          this.activeIndex = 0;   
        }
      },
      {
        label: 'Interest Policy',icon: 'fa fa-newspaper-o', routerLink: termdeposittransactionconstant.TERMDEPOSIT_INTEREST_POLICY,
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Required Documents',icon: 'fa fa-file-text', routerLink: termdeposittransactionconstant.TERMDEPOSIT_REQUIRED_DOCUMENTS,
        command: (event: any) => {
          this.activeIndex = 2;
        }
      }
    ];
  });


this.currentStepper();
}
currentStepper() {
  this.termDepositProductDefinitionService.currentStep.subscribe((data: any) => {
    if (data != undefined || null) {
      this.activeIndex = data.stepperIndex
      this.changeStepperSelector(this.activeIndex);
      this.buttonDisbled = (data.formValid == applicationConstants.FALSE) ? applicationConstants.TRUE : applicationConstants.FALSE;
      if (data.data != null && data.data != undefined) {
        if (this.activeIndex == 0) {
          this.generalConfigModel = data.data;
          this.isSaveContinueEnable = applicationConstants.FALSE;
        } else if (this.activeIndex == 1) {
          this.interestPolicyDetails = data.data;
        }else if (this.activeIndex == 2) {
          this.requiredDocumentsModel = data.data;
        }
      }
    }
  });
}

/**
    @author Phanidher
    @implements Fd Cummulative Configuration details Stepper navigation details 
    @argument ProductId
   */
navigateTo(activeIndex: any,saveId:any) {
  switch (activeIndex) {
    case 0:
      this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_GENERAL_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
    case 1:
      this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_INTEREST_POLICY], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
    case 2:
      this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_REQUIRED_DOCUMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
      break;
  }
}

ngAfterContentChecked(): void {
  this.ref.detectChanges();
}

/**
    @author Phanidher
    @implements Previous Step button navigation realated function
    @argument activeIndex
   */
prevStep(activeIndex: any) {
  this.activeIndex = activeIndex - 1;
  this.navigateTo(this.activeIndex,this.savedID);

}

/**
    @author Phanidher
    @implements Save data and next navigation realated function
    @argument activeIndex
   */

saveAndNext(activeIndex: number) {
  if (activeIndex == 0) {
    this.addOrUpdateFdCummulativeProductDefination(activeIndex, "next");
  } else if (activeIndex == 1) {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID);
  } else if (activeIndex == 2) {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID);
  }
}

/**
    @author Phanidher
    @implements Saves the data
    @argument activeIndex
   */
saveContinue(activeIndex:any) {
  this.activeIndex = 0;
  this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_PRODUCT_DEFINITION]);
  this.stepperCreation();
}

/**
    @author Phanidher
    @implements It recieves the data from stepper
    @argument activeIndex
   */
getProductDetailsObservable() {
  this.termDepositProductDefinitionService.currentStep.subscribe((data: any) => {
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
  this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_PRODUCT_DEFINITION]);
  }
  
  submit(){
  this.buttonDisbled = true;
  this.router.navigate([termdeposittransactionconstant.VIEW_FD_CUMMULATIVE_PRODUCT_DEFINITION], { queryParams: { id: this.encryptDecryptService.encrypt(this.savedID),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.ACTIVE) } });
  }
  
  
  save() {
  this.buttonDisbled = true;
  this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_PRODUCT_DEFINITION]);
  }
  /**
    @author Phanidher
    @implements It navigates to grid
   */
  navigateToGrid() {
    this.buttonDisbled = true;
    this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_PRODUCT_DEFINITION]);
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
    @author Phanidher
    @implements It Creates the Fd Cummulative Stepper
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
            label: this.reqiredDocumentsDetails
          }
        ];
        
      });
    });
  }

  /**
    @author Phanidher
    @implements It Saves the Fd Cummulative data 
    @argument generalConfigModel,activeIndex,buttonName
    @returns generalConfigModel
   */
  addOrUpdateFdCummulativeProductDefination(activeIndex:any, buttonName:any) {
  this.generalConfigModel.pacsId = this.commonFunctionService.getStorageValue(applicationConstants.PACS_ID);
  this.generalConfigModel.statusName = CommonStatusData.CREATED;
  if(this.generalConfigModel.effectiveStartDate != undefined && this.generalConfigModel.effectiveStartDate != null)
    this.generalConfigModel.effectiveStartDate = this.commonFunctionService.getUTCEpoch(new Date(this.generalConfigModel.effectiveStartDate));
  if(this.generalConfigModel.effectiveEndDate != undefined && this.generalConfigModel.effectiveEndDate != null)
    this.generalConfigModel.effectiveEndDate = this.commonFunctionService.getUTCEpoch(new Date(this.generalConfigModel.effectiveEndDate));
  if (this.generalConfigModel.id != null) {
  
  this.termDepositProductDefinitionService.updateFdCummulativeProductDefination(this.generalConfigModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
      if(null != this.generalConfigModel.effectiveStartDate)
        this.generalConfigModel.effectiveStartDate=this.datePipe.transform(this.generalConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
      if(null != this.generalConfigModel.effectiveEndDate)
        this.generalConfigModel.effectiveEndDate=this.datePipe.transform(this.generalConfigModel.effectiveEndDate, this.orgnizationSetting.datePipe);
      this.commonComponent.stopSpinner();
      this.msgs = [];
      // this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
      this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
  
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
      if (buttonName == "next") {
        this.activeIndex = activeIndex + 1;
        this.savedID = this.responseModel.data[0].id;
        this.navigateTo(this.activeIndex,this.savedID);
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
  
  this.termDepositProductDefinitionService.addFdCummulativeProductDefination(this.generalConfigModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
      if(null != this.generalConfigModel.effectiveStartDate)
        this.generalConfigModel.effectiveStartDate=this.datePipe.transform(this.generalConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
      if(null != this.generalConfigModel.effectiveEndDate)
        this.generalConfigModel.effectiveEndDate=this.datePipe.transform(this.generalConfigModel.effectiveEndDate, this.orgnizationSetting.datePipe);
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
