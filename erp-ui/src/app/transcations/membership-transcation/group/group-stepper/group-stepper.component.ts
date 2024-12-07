import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Membershiptransactionconstant } from '../../membership-transaction-constant';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { TranslateService } from '@ngx-translate/core';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { MemberBasicDetailsStepperService } from '../../individual/shared/membership-individual-stepper.service';
import { MembershipGroupDetailsService } from '../../shared/membership-group-details.service';
import { GroupCommunicationModel, GroupKycDeatilsModel, MemberGroupBasicDetails, promoterDetailsModel } from '../../shared/member-group-details-model';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonStatusData ,MemberShipTypesData} from 'src/app/transcations/common-status-data.json';
import { GroupCommunicationDetailsService } from '../../shared/group-communication-details.service';
import { GroupKycDetailsService } from '../../shared/group-kyc-details.service';
import { GroupPromotersService } from '../../shared/group-promoters.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-group-stepper',
  templateUrl: './group-stepper.component.html',
  styleUrls: ['./group-stepper.component.css']
})
export class GroupStepperComponent implements OnInit {
  memberGroupBasicDetails :MemberGroupBasicDetails = new MemberGroupBasicDetails();
  groupCommunicationModel:GroupCommunicationModel = new GroupCommunicationModel()
  groupKycDeatilsModel:GroupKycDeatilsModel = new GroupKycDeatilsModel();
  promoterDetailsModel:promoterDetailsModel = new promoterDetailsModel();
  items: MenuItem[] = [];
  activeIndex: number = 0;
  buttonDisabled: boolean=false;
  completed = 0;
  branchId: number =1;
  pacsId :number =1;
  saveAndContinueFlag: boolean = true;
  isEdit: any;
  responseModel!: Responsemodel;
  savedID: any;
  msgs: any[] = [];
  orgnizationSetting:any;
  communication: any;
  kyc: any;
  land: any;
  nominee: any;
  familydetails: any;
  asset: any;
  basicDetails: any;
  buttonDisbled: boolean =true;
  isSaveContinueEnable: boolean = false;
  nextDisable: boolean = false;
  serviceUrl: any;
  productTypeList: any[]=[];
  promoterDetails: any[]=[];
  
  // isSaveContinueEnable: boolean = false;

  constructor(public messageService: MessageService, private router: Router, private membershipGroupDetailsService: MembershipGroupDetailsService,
    private route: Router, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent, private commonFunctionService: CommonFunctionsService, private translate: TranslateService,
    private memberBasicDetailsStepperService: MemberBasicDetailsStepperService,private ref: ChangeDetectorRef,private groupCommunicationDetailsService:GroupCommunicationDetailsService,
    private groupKycDetailsService:GroupKycDetailsService,private groupPromotersService:GroupPromotersService, private commonFunctionsService: CommonFunctionsService,
    private datePipe: DatePipe,
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
          if (this.memberGroupBasicDetails != null && this.groupCommunicationModel != null && this.groupKycDeatilsModel != null
            
          )
            this.isEdit = true;
  
        } else {
          this.isEdit = false;
        }
      });
      this.orgnizationSetting = this.commonComponent.orgnizationSettings();
      // this.commonFunctionService.setStorageValue(applicationConstants.TERM_LOAN_ID, this.savedID);
      this.getProductDetailsObservable();
      this.completed = this.activeIndex;
      if (this.savedID != undefined) {
        this.saveAndContinueFlag = applicationConstants.FALSE;
        this.commonFunctionService.data.subscribe((res: any) => {
          if (res) {
            this.translate.use(res);
          } else {
            this.translate.use(this.commonFunctionService.getStorageValue('language'));
          }
          this.translate.get('ERP.BASIC_DETAILS').subscribe((text: string) => {
            this.basicDetails = text;
          });
          this.translate.get('ERP.KYC').subscribe((text: string) => {
            this.kyc = text;
          });
          this.translate.get('ERP.COMMUNICATION').subscribe((text: string) => {
            this.communication = text;
        this.items = [
            {
                label: this.basicDetails,icon: 'fa fa-id-badge',routerLink:Membershiptransactionconstant.GROUP_BASIC_DETAILS,queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
                command: (event: any) => {
                  this.activeIndex = 0;
                }
               
            },
           
            {
                label: this.kyc,icon: 'fa fa-podcast',routerLink:Membershiptransactionconstant.GROUP_KYC,queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
                command: (event: any) => {
                  this.activeIndex = 1;
                }
                      
            },
            {
              label: this.communication,icon: 'fa fa-map-marker',routerLink:Membershiptransactionconstant.GROUP_COMMUNICATION,queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
              command: (event: any) => {
                this.activeIndex = 2;
              }         
          }
        ];  this.memberBasicDetailsStepperService.currentStep.subscribe((data: any) => {
          if (data != undefined || null) {
            this.activeIndex = data.stepperIndex
            this.changeStepperSelector();
            this.buttonDisbled = data.isDisable
            if (data.data != null) {
              if (this.activeIndex == 0) {
                this.memberGroupBasicDetails = data.data;
                this.isSaveContinueEnable = false;
              } else if (this.activeIndex == 1) {
                this.groupKycDeatilsModel = data.data;
              }
              else {
                this.groupCommunicationModel = data.data;
              }
            }
          }
        })
      });
    });
  }
  else {
    this.saveAndContinueFlag = applicationConstants.TRUE;
    this.commonFunctionService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use(this.commonFunctionService.getStorageValue('language'));
      }
      this.translate.get('ERP.BASIC_DETAILS').subscribe((text: string) => {
        this.basicDetails = text;
      });
      this.translate.get('ERP.KYC').subscribe((text: string) => {
        this.kyc = text;
      });
      this.translate.get('ERP.COMMUNICATION').subscribe((text: string) => {
        this.communication = text;
     
        this.items = [
          {
            label: this.basicDetails,icon: 'fa fa-id-badge'
          },
          {
            label: this.kyc,icon: 'fa fa-podcast'
          },
          {
            label: this.communication,icon: 'fa fa-map-marker'
          },
         
        ]
        this.memberBasicDetailsStepperService.currentStep.subscribe((data: any) => {
          if (data != undefined || null) {
            this.activeIndex = data.stepperIndex
            this.changeStepperSelector();
            this.buttonDisbled = data.isDisable
            if (data.data != null) {
              if (this.activeIndex == 0) {
                this.memberGroupBasicDetails = data.data;
                // this.fileUploadShow = data.showFile;
                this.isSaveContinueEnable = true;
              } else if (this.activeIndex == 1) {
                this.groupKycDeatilsModel = data.data;
              } else {
                this.groupCommunicationModel = data.data;
              }
              // if (null != this.memberBasicDetailsModel && undefined != this.memberBasicDetailsModel && null != this.memberBasicDetailsModel.docFilesList && undefined != this.memberBasicDetailsModel.docFilesList) {
              //   this.docFilesList = [];
              //   this.docFilesList = this.memberBasicDetailsModel.docFilesList.map(x => Object.assign({}, x));
              // }
            }
          }
        })
      });
    });
  }

  // this.currentStepper();
}
    navigateTo(activeIndex: number,savedId:any) {
      switch (activeIndex) {
        case 0:
          this.router.navigate([Membershiptransactionconstant.GROUP_BASIC_DETAILS],{ queryParams: { id: this.encryptDecryptService.encrypt(savedId) } });
          break;
        case 1:
          this.router.navigate([Membershiptransactionconstant.GROUP_KYC],{ queryParams: { id: this.encryptDecryptService.encrypt(savedId) } });
          break;
          case 2:
           this.router.navigate([Membershiptransactionconstant.GROUP_COMMUNICATION],{ queryParams: { id: this.encryptDecryptService.encrypt(savedId) } });
           break;
      }
    }

  prevStep(activeIndex: any) {
    this.activeIndex = activeIndex - 1;
    this.navigateTo(this.activeIndex,this.savedID);
  }

  nextStep(activeIndex: any){
    if (activeIndex == 0) {
      this.addOrUpdate(activeIndex, "next");
      // this.activeIndex = activeIndex + 1;

    }
    else if(activeIndex == 1){
      this.addOrUpdateKycDetails(activeIndex,"next")
      // this.activeIndex = activeIndex + 1;

    }
    // else if(activeIndex == 2){
    //   this.addOrUpdateCommunicationDetails(activeIndex,"next")
    // }
    else {
      this.activeIndex = activeIndex + 1;
      this.navigateTo(this.activeIndex,this.savedID);
    }
  }
  back(){
    this.router.navigate(["/menu/membership_transaction/membership_transactions"]);
  }

  cancel(activeIndex: any){
    this.router.navigate(["/menu/membership_transaction/membership_transactions"]);
  }

  submit(activeIndex: any){
    this.buttonDisabled = true;
    this.addOrUpdateCommunicationDetails(activeIndex)
  }
  getProductDetailsObservable() {
    this.memberBasicDetailsStepperService.currentStep.subscribe((data: any) => {
      if (data != undefined) {
        this.changeStepperSelector();
        if (data.isDisable != null) {
          this.nextDisable = data.isDisable;
          this.buttonDisbled = (data.formValid == false) ? true : false;
        }
        this.serviceUrl = data.serviceUrl;
      }
    });
  }
  changeStepperSelector() {
    this.items.map((val, index) => {
      if (this.activeIndex == index) {
        val['disabled'] = false;
      } else {
        val['disabled'] = true;
      }
      return val;
    })
  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }
  stepperCreation() {
    this.commonFunctionService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use(this.commonFunctionService.getStorageValue('language'));
      }
      this.translate.get('ERP.BASIC_DETAILS').subscribe((text: string) => {
        this.basicDetails = text;
      });
      this.translate.get('ERP.KYC').subscribe((text: string) => {
        this.kyc = text;
      });
      this.translate.get('ERP.COMMUNICATION').subscribe((text: string) => {
        this.communication = text;
     
        this.items = [
          {
            label: this.basicDetails,icon: 'fa fa-id-badge'
          },
          {
            label: this.kyc,icon: 'fa fa-podcast'
          },
          {
            label: this.communication,icon: 'fa fa-address-book-o'
          },
          
        ];
      });
    });
  }
  addOrUpdate(activeIndex:any, buttonName:any) {
    //saveorupdate code here
    this.memberGroupBasicDetails.branchId = this.branchId;
    this.memberGroupBasicDetails.pacsId = this.pacsId;
    this.memberGroupBasicDetails.statusName = CommonStatusData.CREATED;
    this.memberGroupBasicDetails.memberTypeId = 2; 
    this.memberGroupBasicDetails.memberTypeName = MemberShipTypesData.GROUP;
    this.memberGroupBasicDetails.name = this.memberGroupBasicDetails.name.trim();
    if(this.memberGroupBasicDetails.registrationDateVal != undefined && this.memberGroupBasicDetails.registrationDateVal != null)
    this.memberGroupBasicDetails.registrationDate = this.commonFunctionsService.getUTCEpochWithTime(this.memberGroupBasicDetails.registrationDateVal);
    if(this.memberGroupBasicDetails.admissionDateVal != undefined && this.memberGroupBasicDetails.admissionDateVal != null)
    this.memberGroupBasicDetails.admissionDate = this.commonFunctionsService.getUTCEpochWithTime(new Date(this.memberGroupBasicDetails.admissionDateVal));

    if (this.memberGroupBasicDetails.id != null) {
   
    this.membershipGroupDetailsService.updateMembershipGroupDetails(this.memberGroupBasicDetails).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {

        this.memberGroupBasicDetails = response.data[0];
        if(null != this.memberGroupBasicDetails.admissionDate)
        this.memberGroupBasicDetails.admissionDateVal=this.datePipe.transform(this.memberGroupBasicDetails.admissionDate, this.orgnizationSetting.datePipe);
        if(null != this.memberGroupBasicDetails.registrationDate)
        this.memberGroupBasicDetails.registrationDateVal=this.datePipe.transform(this.memberGroupBasicDetails.registrationDate, this.orgnizationSetting.datePipe);

        if(this.promoterDetailsModel.memDobVal != undefined && this.promoterDetailsModel.memDobVal != null)
          this.promoterDetailsModel.dob = this.commonFunctionsService.getUTCEpochWithTime(new Date(this.promoterDetailsModel.memDobVal));
        this.commonComponent.stopSpinner();
        this.msgs = [];
        // this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];

        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        if (this.memberGroupBasicDetails.groupPromoterList && this.memberGroupBasicDetails.groupPromoterList.length > 0) {
          this.memberGroupBasicDetails.groupPromoterList = this.memberGroupBasicDetails.groupPromoterList
              .filter((data:any) => data !== null)
              .map((count:any) => {
                  count.groupId = this.responseModel.data[0].id;
                  this.addOrUpdatePromoterDetails(count);
                  return count;
              });
      }
        
        if (buttonName == "next") {
          this.activeIndex = activeIndex + 1;
          this.savedID = this.responseModel.data[0].id;
          this.navigateTo(this.activeIndex,this.savedID)
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
    this.membershipGroupDetailsService.addMembershipGroupDetails(this.memberGroupBasicDetails).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        if (this.memberGroupBasicDetails.groupPromoterList && this.memberGroupBasicDetails.groupPromoterList.length > 0) {
          this.memberGroupBasicDetails.groupPromoterList = this.memberGroupBasicDetails.groupPromoterList
              .filter((data:any) => data !== null)
              .map((count:any) => {
                  count.groupId = this.responseModel.data[0].id;
                  this.addOrUpdatePromoterDetails(count);
                  return count;
              });
      }
        
        if (buttonName == "next") {
          this.activeIndex = activeIndex + 1;
          this.savedID = this.responseModel.data[0].id;
          this.navigateTo(this.activeIndex,this.savedID)
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
addOrUpdateCommunicationDetails(activeIndex:any) {
  //saveorupdate code here
  this.groupCommunicationModel.branchId = 1;
  // remove this line before commit 
  this.groupCommunicationModel.pacsId = 1;
if (this.groupCommunicationModel.id != null) {
  this.groupCommunicationDetailsService.updateGroupCommunicationDetails(this.groupCommunicationModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
      this.groupCommunicationModel = this.responseModel.data[0]; 
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
      // if (buttonName == "next") {
      //   // this.activeIndex = activeIndex + 1;
      this.router.navigate([Membershiptransactionconstant.VIEW_MEMBERSHIP],{ queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) ,type: this.encryptDecryptService.encrypt('Group'),editbtn:this.encryptDecryptService.encrypt(1),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.ACTIVE)} });
      // } 
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
  this.groupCommunicationDetailsService.addGroupCommunicationDetails(this.groupCommunicationModel).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.groupCommunicationModel = this.responseModel.data[0]; 
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
      // if (buttonName == "next") {
      //   this.activeIndex = activeIndex + 1;
      //   // this.savedID = this.responseModel.data[0].id;
      this.router.navigate([Membershiptransactionconstant.VIEW_MEMBERSHIP],{ queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) ,type: this.encryptDecryptService.encrypt('Group'),editbtn:this.encryptDecryptService.encrypt(1),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.ACTIVE)} });
      // } 
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
addOrUpdateKycDetails(activeIndex:any,buttonName:any) {
  if (buttonName == "next") {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID)
  } 
  this.commonComponent.startSpinner();
}
addOrUpdatePromoterDetails(promoterDetailsModel:any) {
  this.commonComponent.startSpinner();
  promoterDetailsModel.pacsId = 1;
  promoterDetailsModel.branchId = 1;
  
  if (promoterDetailsModel.id != null && promoterDetailsModel.id != undefined) {
    this.groupPromotersService.updateGroupPromoters(promoterDetailsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.promoterDetailsModel = this.responseModel.data[0]; 

        if(null != this.promoterDetailsModel.dob)
          this.promoterDetailsModel.memDobVal=this.datePipe.transform(this.promoterDetailsModel.dob, this.orgnizationSetting.datePipe);
        this.promoterDetails.unshift(this.responseModel.data[0]);
        this.promoterDetails.splice(1, 1);
        this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
      } else {
       this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
      }
    },
      error => {
        this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
      });
  } else {
    this.groupPromotersService.addGroupPromoters(promoterDetailsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
      } else {
        this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
      }
    },
      error => {
        this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
      });
  }
}
}
