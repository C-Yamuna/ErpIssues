import { ChangeDetectorRef, Component } from '@angular/core';
import { TermAccountDetails } from './term-account-details/shared/term-account-details.model';
import { TermBorrowingAccountMapping } from './term-borrowing-account-mapping/shared/term-borrowing-account-mapping.model';
import { TermBorrowingDocument } from './term-borrowing-document/shared/term-borrowing-document.model';
import { MenuItem, MessageService } from 'primeng/api';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { TermAccountDetailsService } from './term-account-details/shared/term-account-details.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { TermBorrowingAccountMappingService } from './term-borrowing-account-mapping/shared/term-borrowing-account-mapping.service';
import { TermBorrowingDocumentService } from './term-borrowing-document/shared/term-borrowing-document.service';
import { DatePipe } from '@angular/common';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { BorrowingTransactionConstant } from '../../borrowing-transaction-constants';
import { CommonStatusData } from 'src/app/transcations/common-status-data.json';
@Component({
  selector: 'app-term-borrowing-stepper',
  templateUrl: './term-borrowing-stepper.component.html',
  styleUrls: ['./term-borrowing-stepper.component.css']
})
export class TermBorrowingStepperComponent {
  termAccountDetailsModel :TermAccountDetails = new TermAccountDetails();
  termBorrowingAccountMappingModel:TermBorrowingAccountMapping = new TermBorrowingAccountMapping();
  termBorrowingDocumentModel:TermBorrowingDocument = new TermBorrowingDocument();

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
  constructor(public messageService: MessageService, private router: Router,private termAccountDetailsService : TermAccountDetailsService,
    private route: Router, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent, private commonFunctionService: CommonFunctionsService, private translate: TranslateService,
   private ref: ChangeDetectorRef,private termBorrowingAccountMappingService:TermBorrowingAccountMappingService, 
   private termBorrowingDocumentService :TermBorrowingDocumentService, private datePipe: DatePipe
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
          label: 'Account Details',icon: 'fa fa-id-badge', routerLink: BorrowingTransactionConstant.TERM_ACCOUNT_DETAILS,
          command: (event: any) => {
            this.activeIndex = 0;   
          }
        },
        {
          label: 'Borrowing Account Mapping',icon: 'fa fa-map' , routerLink: BorrowingTransactionConstant.TERM_BORROWING_ACCOUNT_MAPPING,
          command: (event: any) => {
            this.activeIndex = 1;
          }
        },
        {
          label: 'Borrowing Documents',icon: 'fa fa-file-text',routerLink: BorrowingTransactionConstant.TERM_BORROWING_DOCUMENT,
          command: (event: any) => {
            this.activeIndex = 2;
          }
        }
      ];
    });
  
  
  this.currentStepper();
  }
    currentStepper() {
      this.termAccountDetailsService.currentStep.subscribe((data: any) => {
        if (data != undefined || null) {
          this.activeIndex = data.stepperIndex
          this.changeStepperSelector(this.activeIndex);
          this.buttonDisbled = (data.formValid == applicationConstants.FALSE) ? applicationConstants.TRUE : applicationConstants.FALSE;
          if (data.data != null && data.data != undefined) {
            if (this.activeIndex == 0) {
              this.termAccountDetailsModel = data.data;
              this.isSaveContinueEnable = applicationConstants.FALSE;
            } else if (this.activeIndex == 1) {
              this.termBorrowingAccountMappingModel = data.data;
            } else if (this.activeIndex == 2) {
              this.termBorrowingDocumentModel = data.data;
            }  
          }
        }
      });
    }
  
  navigateTo(activeIndex: any,saveId:any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([BorrowingTransactionConstant.TERM_ACCOUNT_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
      case 1:
        this.router.navigate([BorrowingTransactionConstant.TERM_BORROWING_ACCOUNT_MAPPING], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
      case 2:
        this.router.navigate([BorrowingTransactionConstant.TERM_BORROWING_DOCUMENT], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
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
    this.route.navigate([BorrowingTransactionConstant.TERM_BORROWINGS]);
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
    this.router.navigate([BorrowingTransactionConstant.TERM_BORROWINGS]);
  }
  
  getProductDetailsObservable() {
    this.termAccountDetailsService.currentStep.subscribe((data: any) => {
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
  this.router.navigate([BorrowingTransactionConstant.TERM_BORROWINGS]);
  }
  
  submit(){
  this.buttonDisbled = true;
  this.router.navigate([BorrowingTransactionConstant.TERM_VIEW_BORROWING], { queryParams: { id: this.encryptDecryptService.encrypt(this.savedID),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.ACTIVE) } });
  }
  
  
  save() {
  this.buttonDisbled = true;
  this.router.navigate([BorrowingTransactionConstant.TERM_BORROWINGS]);
  }
  /**
   * @author vinitha
   * @implements add or update account details data 
   */
  addOrUpdate(activeIndex:any, buttonName:any) {
    this.termAccountDetailsModel.pacsId = this.commonFunctionService.getStorageValue(applicationConstants.PACS_ID);
    this.termAccountDetailsModel.branchId = this.commonFunctionService.getStorageValue(applicationConstants.BRANCH_ID);
  this.termAccountDetailsModel.statusName = CommonStatusData.CREATED;
  if(this.termAccountDetailsModel.sanctionedDate != undefined && this.termAccountDetailsModel.sanctionedDate != null)
    this.termAccountDetailsModel.sanctionedDate = this.commonFunctionService.getUTCEpoch(new Date(this.termAccountDetailsModel.sanctionedDate));

  if(this.termAccountDetailsModel.applicationDate != undefined && this.termAccountDetailsModel.applicationDate != null)
    this.termAccountDetailsModel.applicationDate = this.commonFunctionService.getUTCEpoch(new Date(this.termAccountDetailsModel.applicationDate));

  if(this.termAccountDetailsModel.requestedDate != undefined && this.termAccountDetailsModel.requestedDate != null)
    this.termAccountDetailsModel.requestedDate = this.commonFunctionService.getUTCEpoch(new Date(this.termAccountDetailsModel.requestedDate));


  if(this.termAccountDetailsModel.borrowingDueDate != undefined && this.termAccountDetailsModel.borrowingDueDate != null)
    this.termAccountDetailsModel.borrowingDueDate = this.commonFunctionService.getUTCEpoch(new Date(this.termAccountDetailsModel.borrowingDueDate));
  if (this.termAccountDetailsModel.id != null) {
  
  this.termAccountDetailsService.updateTermAccountDetails(this.termAccountDetailsModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
        if(this.termAccountDetailsModel.sanctionedDate != null && this.termAccountDetailsModel.sanctionedDate != undefined ){
        this.termAccountDetailsModel.sanctionedDate=this.datePipe.transform(this.termAccountDetailsModel.sanctionedDate, this.orgnizationSetting.datePipe);
        }
      if(null != this.termAccountDetailsModel.applicationDate && this.termAccountDetailsModel.applicationDate != undefined)
        this.termAccountDetailsModel.applicationDate=this.datePipe.transform(this.termAccountDetailsModel.applicationDate, this.orgnizationSetting.datePipe);

      if(null != this.termAccountDetailsModel.requestedDate && this.termAccountDetailsModel.requestedDate != undefined)
        this.termAccountDetailsModel.requestedDate=this.datePipe.transform(this.termAccountDetailsModel.requestedDate, this.orgnizationSetting.datePipe);
     
      if(null != this.termAccountDetailsModel.borrowingDueDate && this.termAccountDetailsModel.borrowingDueDate != undefined)
        this.termAccountDetailsModel.borrowingDueDate=this.datePipe.transform(this.termAccountDetailsModel.borrowingDueDate, this.orgnizationSetting.datePipe);
 
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
  
  this.termAccountDetailsService.addTermAccountDetails(this.termAccountDetailsModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
      if (this.responseModel != null&& this.responseModel.data!= undefined) {
      if(null != this.termAccountDetailsModel.sanctionedDate)
        this.termAccountDetailsModel.sanctionedDate=this.datePipe.transform(this.termAccountDetailsModel.sanctionedDate, this.orgnizationSetting.datePipe);
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
  this.termBorrowingAccountMappingModel.branchId = this.commonFunctionService.getStorageValue(applicationConstants.BRANCH_ID);
  this.termBorrowingAccountMappingModel.borrowingAccountId = this.borrowingAccountId;
    
  this.termBorrowingAccountMappingService.addTermBorrowingAccountMappinglist(this.borrowingsAccountMappinglist).subscribe((response: any) => {
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
