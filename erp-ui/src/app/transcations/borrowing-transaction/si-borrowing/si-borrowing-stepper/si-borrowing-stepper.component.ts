import { ChangeDetectorRef, Component } from '@angular/core';
import { SiBorrowingAccountDetails } from './shared/siborrowing.model';
import { MenuItem, MessageService } from 'primeng/api';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { SiBorrowingStepperService } from './shared/si-borrowing-stepper.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { TranslateService } from '@ngx-translate/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { BorrowingTransactionConstant } from '../../borrowing-transaction-constants';
import { CommonStatusData } from 'src/app/transcations/common-status-data.json';
import { SiBorrowingAccountMapping } from './si-borrowing-account-mapping/shared/si-borrowing-account-mapping.model';
import { SiBorrowingAccountMappingService } from './si-borrowing-account-mapping/shared/si-borrowing-account-mapping.service';
import { SiBorrowingDocument } from './si-borrowing-document/shared/si-borrowing-document.model';
import { SiBorrowingDocumentService } from './si-borrowing-document/shared/si-borrowing-document.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-si-borrowing-stepper',
  templateUrl: './si-borrowing-stepper.component.html',
  styleUrls: ['./si-borrowing-stepper.component.css']
})
export class SiBorrowingStepperComponent {
  siborrowingAccountDetailsModel :SiBorrowingAccountDetails = new SiBorrowingAccountDetails();
  siBorrowingAccountMappingModel:SiBorrowingAccountMapping = new SiBorrowingAccountMapping();
  SiBorrowingDocumentModel:SiBorrowingDocument = new SiBorrowingDocument();

  items: MenuItem[] = [];
  activeIndex: number = 0;
  buttonDisabled: boolean=false;
  completed = 0;
  // branchId=1;
  // pacsId=1;
  borrowingAccountId:any;
  saveAndContinueFlag: boolean = true;
  isEdit: any;
  responseModel!: Responsemodel;
  savedID: any;
  msgs: any[] = [];
  orgnizationSetting: any;
  borrowingaccountmapping: any;
  borrowingdocuments: any;

  accountdetails: any;
  buttonDisbled: boolean =true;
  isSaveContinueEnable: boolean = false;
  nextDisable: boolean = false;
  serviceUrl: any; 
   menuDisabled: boolean = true;
  activeItem!: MenuItem;
  // isSaveContinueEnable: boolean = false;
  borrowingsAccountMappinglist: any[] = [];
  constructor(public messageService: MessageService, private router: Router,private siBorrowingStepperService : SiBorrowingStepperService,
    private route: Router, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent, private commonFunctionService: CommonFunctionsService, private translate: TranslateService,
   private ref: ChangeDetectorRef,private siBorrowingAccountMappingService:SiBorrowingAccountMappingService, 
   private siBorrowingDocumentService :SiBorrowingDocumentService, private datePipe: DatePipe
  ) {
  
  }




  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
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
          label: 'Account Details',icon: 'fa fa-id-badge', routerLink: BorrowingTransactionConstant.SI_ACCOUNT_DETAILS,
          command: (event: any) => {
            this.activeIndex = 0;   
          }
        },
        {
          label: 'Borrowing Account Mapping',icon: 'fa fa-map' , routerLink: BorrowingTransactionConstant.SI_BORROWING_ACCOUNT_MAPPING,
          command: (event: any) => {
            this.activeIndex = 1;
          }
        },
        {
          label: 'Borrowing Documents',icon: 'fa fa-file-text',routerLink: BorrowingTransactionConstant.SI_BORROWING_DOCUMENT,
          command: (event: any) => {
            this.activeIndex = 2;
          }
        }
      ];
    });
  
  
  this.currentStepper();
  }
    currentStepper() {
      this.siBorrowingStepperService.currentStep.subscribe((data: any) => {
        if (data != undefined || null) {
          this.activeIndex = data.stepperIndex
          this.changeStepperSelector(this.activeIndex);
          this.buttonDisbled = (data.formValid == applicationConstants.FALSE) ? applicationConstants.TRUE : applicationConstants.FALSE;
          if (data.data != null && data.data != undefined) {
            if (this.activeIndex == 0) {
              this.siborrowingAccountDetailsModel = data.data;
              this.isSaveContinueEnable = applicationConstants.FALSE;
            } else if (this.activeIndex == 1) {
              this.siBorrowingAccountMappingModel = data.data;
            } else if (this.activeIndex == 2) {
              this.SiBorrowingDocumentModel = data.data;
            }  
          }
        }
      });
    }
  
  navigateTo(activeIndex: any,saveId:any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([BorrowingTransactionConstant.SI_ACCOUNT_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
      case 1:
        this.router.navigate([BorrowingTransactionConstant.SI_BORROWING_ACCOUNT_MAPPING], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
      case 2:
        this.router.navigate([BorrowingTransactionConstant.SI_BORROWING_DOCUMENT], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
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
  
  prevStep(activeIndex: any) {
    this.activeIndex = activeIndex - 1;
    this.navigateTo(this.activeIndex,this.savedID);
  
  }
  
  saveAndNext(activeIndex: number) {
    if (activeIndex == 0) {
      this.addOrUpdate(activeIndex, "next");
    } else if (activeIndex == 1) {
      this.addOrUpdateBorrowingAccountMapping(activeIndex,"next")
    } else if (activeIndex == 2) {
      this.activeIndex = activeIndex + 1;
      this.navigateTo(this.activeIndex,this.savedID);
    }
  }
  saveContinue(activeIndex:any) {
    this.activeIndex = 0;
    this.route.navigate([BorrowingTransactionConstant.SI_BORROWINGS]);
    this.stepperCreation();
  }
  stepperCreation() {
    this.commonFunctionService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use(this.commonFunctionService.getStorageValue('language'));
      }
      this.translate.get('BORROWINGSTRANSACTIONS.ACCOUNT_DETAILS').subscribe((text: string) => {
        this.accountdetails = text;
      });
      this.translate.get('BORROWINGSTRANSACTIONS.BORROWING_ACCOUNT_MAPPING').subscribe((text: string) => {
        this.borrowingaccountmapping = text;
      });
      this.translate.get('BORROWINGSTRANSACTIONS.BORROWING_DOCUMENT').subscribe((text: string) => {
        this.borrowingdocuments = text;
        this.items = [
          {
            label: this.accountdetails
          },
          {
            label: this.borrowingaccountmapping
          },
          {
            label: this.borrowingdocuments
          },
        ];
        
      });
    });
  }
  navigateToGrid() {
    this.buttonDisbled = true;
    this.router.navigate([BorrowingTransactionConstant.SI_BORROWINGS]);
  }
  
  getProductDetailsObservable() {
    this.siBorrowingStepperService.currentStep.subscribe((data: any) => {
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
  this.router.navigate([BorrowingTransactionConstant.SI_BORROWINGS]);
  }
  
  submit(){
  this.buttonDisbled = true;
  this.router.navigate([BorrowingTransactionConstant.SI_VIEW_BORROWING], { queryParams: { id: this.encryptDecryptService.encrypt(this.savedID),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.ACTIVE) } });
  }
  
  
  save() {
  this.buttonDisbled = true;
  this.router.navigate([BorrowingTransactionConstant.SI_BORROWINGS]);
  }
  /**
   * @author vinitha
   * @implements add or update account details data 
   */
  addOrUpdate(activeIndex:any, buttonName:any) {
    this.siborrowingAccountDetailsModel.pacsId = this.commonFunctionService.getStorageValue(applicationConstants.PACS_ID);
    this.siborrowingAccountDetailsModel.branchId = this.commonFunctionService.getStorageValue(applicationConstants.BRANCH_ID);
  this.siborrowingAccountDetailsModel.statusName = CommonStatusData.CREATED;
  if(this.siborrowingAccountDetailsModel.sanctionedDate != undefined && this.siborrowingAccountDetailsModel.sanctionedDate != null)
    this.siborrowingAccountDetailsModel.sanctionedDate = this.commonFunctionService.getUTCEpoch(new Date(this.siborrowingAccountDetailsModel.sanctionedDate));

  if(this.siborrowingAccountDetailsModel.applicationDate != undefined && this.siborrowingAccountDetailsModel.applicationDate != null)
    this.siborrowingAccountDetailsModel.applicationDate = this.commonFunctionService.getUTCEpoch(new Date(this.siborrowingAccountDetailsModel.applicationDate));

  if(this.siborrowingAccountDetailsModel.requestedDate != undefined && this.siborrowingAccountDetailsModel.requestedDate != null)
    this.siborrowingAccountDetailsModel.requestedDate = this.commonFunctionService.getUTCEpoch(new Date(this.siborrowingAccountDetailsModel.requestedDate));


  if(this.siborrowingAccountDetailsModel.borrowingDueDate != undefined && this.siborrowingAccountDetailsModel.borrowingDueDate != null)
    this.siborrowingAccountDetailsModel.borrowingDueDate = this.commonFunctionService.getUTCEpoch(new Date(this.siborrowingAccountDetailsModel.borrowingDueDate));
  if (this.siborrowingAccountDetailsModel.id != null) {
  
  this.siBorrowingStepperService.updateSiBorrowingStepper(this.siborrowingAccountDetailsModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
        if(this.siborrowingAccountDetailsModel.sanctionedDate != null && this.siborrowingAccountDetailsModel.sanctionedDate != undefined ){
        this.siborrowingAccountDetailsModel.sanctionedDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.sanctionedDate, this.orgnizationSetting.datePipe);
        }
      if(null != this.siborrowingAccountDetailsModel.applicationDate && this.siborrowingAccountDetailsModel.applicationDate != undefined)
        this.siborrowingAccountDetailsModel.applicationDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.applicationDate, this.orgnizationSetting.datePipe);

      if(null != this.siborrowingAccountDetailsModel.requestedDate && this.siborrowingAccountDetailsModel.requestedDate != undefined)
        this.siborrowingAccountDetailsModel.requestedDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.requestedDate, this.orgnizationSetting.datePipe);
     
      if(null != this.siborrowingAccountDetailsModel.borrowingDueDate && this.siborrowingAccountDetailsModel.borrowingDueDate != undefined)
        this.siborrowingAccountDetailsModel.borrowingDueDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.borrowingDueDate, this.orgnizationSetting.datePipe);
 
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
  
  this.siBorrowingStepperService.addSiBorrowingStepper(this.siborrowingAccountDetailsModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
      if(null != this.siborrowingAccountDetailsModel.sanctionedDate)
        this.siborrowingAccountDetailsModel.sanctionedDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.sanctionedDate, this.orgnizationSetting.datePipe);
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
        this.route.navigate([]);
        this.stepperCreation();
      } else {
        this.route.navigate([]);
      }
    } else {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
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
   /**
   * @author vinitha
   * @implements add or update account Mapping 
   */
  addOrUpdateBorrowingAccountMapping(activeIndex:any, buttonName:any) {
  //saveorupdate code here
  this.siBorrowingAccountMappingModel.branchId = this.commonFunctionService.getStorageValue(applicationConstants.BRANCH_ID);
  this.siBorrowingAccountMappingModel.borrowingAccountId = this.borrowingAccountId;
    
  this.siBorrowingAccountMappingService.addSiBorrowingAccountMappinglist(this.borrowingsAccountMappinglist).subscribe((response: any) => {
  this.responseModel = response;
  if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
    if (this.responseModel != null&& this.responseModel.data!= undefined && this.responseModel.data.length>0) {
      this.borrowingsAccountMappinglist = this.responseModel.data; 
    // this.commonComponent.stopSpinner();
    this.msgs = [];
    this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
    setTimeout(() => {
      this.msgs = [];
    }, 2000);
    if (buttonName == "next") {
      this.activeIndex = activeIndex + 1;
      // this.savedID = this.responseModel.data[0].id;
      this.navigateTo(this.activeIndex, this.savedID)
    } 
  } else {
    this.commonComponent.stopSpinner();
    this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
    setTimeout(() => {
      this.msgs = [];
    }, 2000);
  }
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
   /**
   * @author vinitha
   * @implements add or update documents data 
   */
  addOrUpdateBorrowingDocument(activeIndex:any,buttonName:any) {
  if (buttonName == "next") {
  this.activeIndex = activeIndex + 1;
  this.navigateTo(this.activeIndex, this.savedID)
  } 
  this.commonComponent.startSpinner();
  }

}
