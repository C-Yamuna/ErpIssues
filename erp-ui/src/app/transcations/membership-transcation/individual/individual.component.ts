import { MemberGuardianDetailsModel, MemberNomoineeGuardianDetailsModel } from './../shared/member-basic-details.model';
import { MemberNomineeGuardianDetailsService } from './../shared/member-nominee-guardian-details.service';
import { MembershipKycDetailsService } from './../shared/membership-kyc-details.service';
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { Membershiptransactionconstant } from '../membership-transaction-constant';
import { MemberBasicDetails, MemberCommunicationDeatilsModel, MemberKycDetailsModel, MemberLandDetailsModel, MemberNomineeDetails, MembershipAssetsDetailsModel, MembershipFamilyDetailsModel } from '../shared/member-basic-details.model';
import { CommonStatusData ,MemberShipTypesData} from '../../common-status-data.json';
import { MembershipBasicDetailsService } from '../shared/membership-basic-details.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { MemberBasicDetailsStepperService } from './shared/membership-individual-stepper.service';
import { MembershipCommunicationDetailsService } from '../shared/membership-communication-details.service';
import { MembershipNomineeDetailsService } from '../shared/membership-nominee-details.service';
import { DatePipe } from '@angular/common';
import { MembershipLandDetailsService } from '../shared/membership-land-details.service';
import { MemberGuardianDetailsService } from '../shared/member-guardian-details.service';
import {TabMenuModule} from 'primeng/tabmenu';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndividualComponent {
  items: MenuItem[] =[];
  memberBasicDetailsModel: MemberBasicDetails = new MemberBasicDetails();
  memberNomineeDetailsModel: MemberNomineeDetails = new MemberNomineeDetails();
  memberGuardianDetailsModel: MemberGuardianDetailsModel = new MemberGuardianDetailsModel();
  memberLandDetailsModel: MemberLandDetailsModel = new MemberLandDetailsModel();
  membershipFamilyDetailsModel: MembershipFamilyDetailsModel = new MembershipFamilyDetailsModel();
  memberCommunicationDetailsModel: MemberCommunicationDeatilsModel = new MemberCommunicationDeatilsModel();
  memberKycDetailsModel: MemberKycDetailsModel = new MemberKycDetailsModel();
  membershipAssetsDetailsModel :MembershipAssetsDetailsModel = new MembershipAssetsDetailsModel();
  memberNomoineeGuardianDetailsModel:MemberNomoineeGuardianDetailsModel = new MemberNomoineeGuardianDetailsModel();

  activeIndex: number = 0;
  completed = 0;
  saveAndContinueFlag: boolean = true;
  isEdit: any;
  responseModel!: Responsemodel;
  
  savedID: any;
  subProductName: any;
  msgs: any[] = [];
  orgnizationSetting:any;
  communication: any;
  kyc: any;
  land: any;
  nominee: any;
  familydetails: any;
  asset: any;
  basicDetails: any;
  buttonDisbled: boolean =false;
  isSaveContinueEnable: boolean = false;
  nextDisable: boolean = false;
  serviceUrl: any;
  pacsId:number =1;
  branchId: number = 1;
  admissionNumber: any;
  memberTypeName: any;
  activeItem!: MenuItem;
  flagForLableNameOfScreen: boolean=false;
  menuDisabled: any;
  // productTypeList: any[]=[];

  constructor(public messageService: MessageService, private router: Router, private membershipBasicDetailsService: MembershipBasicDetailsService,
    private route: Router, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent, private commonFunctionService: CommonFunctionsService, private translate: TranslateService,
    private memberBasicDetailsStepperService: MemberBasicDetailsStepperService,private ref: ChangeDetectorRef,private membershipCommunicationDetailsService:MembershipCommunicationDetailsService,
    private membershipKycDetailsService:MembershipKycDetailsService,private membershipNomineeDetailsService:MembershipNomineeDetailsService,
    private commonFunctionsService: CommonFunctionsService,private datePipe: DatePipe,private memberGuardianDetailsService:MemberGuardianDetailsService,
  ) {
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let queryParams = Number(this.encryptDecryptService.decrypt(params['id']));
        let qParams = queryParams;
        this.savedID = qParams;
        this.isEdit = true;
      } else {
        this.isEdit = false;
        // this.flagForLableNameOfScreen = false; 
      }
      // if(params['subProductName'] != undefined){
      //   let queryParams = this.encryptDecryptService.decrypt(params['subProductName']);
      //   let qParams = queryParams;
      //   this.subProductName = qParams;
      //   // this.isEdit = true;
      // } else {
      //   this.isEdit = false;
      //   // this.flagForLableNameOfScreen = false; 
      // }
    });
  }
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    // this.getProductDetailsObservable();
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
        });
        this.translate.get('ERP.LAND_DETAILS').subscribe((text: string) => {
          this.land = text;
        });
        this.translate.get('ERP.NOMINEE_DETAILS').subscribe((text: string) => {
          this.nominee = text;
        });
        this.translate.get('ERP.FAMILY_DETAILS').subscribe((text: string) => {
          this.familydetails = text;
        });
        this.translate.get('ERP.ASSET_DETAILS').subscribe((text: string) => {
          this.asset = text;
          this.items = [
            {
              label: this.basicDetails,icon: 'fa fa-id-badge', routerLink: Membershiptransactionconstant.INDIVIDUAL_BASIC_DETAILS, queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
              command: (event: any) => {
                this.activeIndex = 0;
              }
            },
            {
              label: this.kyc,icon: 'fa fa-podcast' ,routerLink: Membershiptransactionconstant.INDIVIDUAL_KYC, queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
              command: (event: any) => {
                this.activeIndex = 1;
              }
            },
            {
              label: this.communication,icon: 'fa fa-map-marker' , routerLink: Membershiptransactionconstant.INDIVIDUAL_COMMUNICATION, queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
              command: (event: any) => {
                this.activeIndex = 2;
              }
            },
            {
              label: this.land,icon: 'fa fa-location-arrow' ,routerLink: Membershiptransactionconstant.INDIVIDUAL_LAND, queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
              command: (event: any) => {
                this.activeIndex = 3;
              }
            },
            {
              label: this.nominee,icon: 'fa fa-user-o' ,routerLink: Membershiptransactionconstant.INDIVIDUAL_NOMINEE, queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
              command: (event: any) => {
                this.activeIndex = 4;
              }
            },
            {
              label: this.familydetails,icon: 'fa fa-clone' , routerLink: Membershiptransactionconstant.INDIVIDUAL_FAMILY_DETAILS, queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
              command: (event: any) => {
                this.activeIndex = 5;
              }
            },
            {
              label: this.asset,icon: 'fa fa-map-o' ,routerLink: Membershiptransactionconstant.INDIVIDUAL_ASSET, queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) },
              command: (event: any) => {
                this.activeIndex = 6;
              }
            }
          ];
          this.memberBasicDetailsStepperService.currentStep.subscribe((data: any) => {
            if (data != undefined || null) {
              this.activeIndex = data.stepperIndex
              if(this.savedID == null){
                this.changeStepperSelectorAdd();
              }
              this.buttonDisbled = data.isDisable
              if (data.data != null) {
                if (this.activeIndex == 0) {
                  this.memberBasicDetailsModel = data.data;
                  this.isSaveContinueEnable = false;
              
                } else if (this.activeIndex == 1) {
                  this.memberKycDetailsModel = data.data;
                  this.savedID = data.savedId;
                } else if (this.activeIndex == 2) {
                  this.memberCommunicationDetailsModel = data.data;
                }
                else if (this.activeIndex == 3) {
                  this.memberLandDetailsModel = data.data;
                  this.savedID = data.savedId;
                }
                else if (this.activeIndex == 4) {
                  if (data.data != null && data.data != undefined) {
                   
                    if (data.data.memberGuardianDetailsModel != null && data.data.memberGuardianDetailsModel != undefined) {
                      this.memberGuardianDetailsModel = data.data.memberGuardianDetailsModel;
                    }
                    this.memberNomineeDetailsModel = data.data;
                  }
                }
                else if (this.activeIndex == 5) {
                  this.membershipFamilyDetailsModel = data.data;
                  if(null != data.savedId && undefined != data.savedId)
                    this.savedID = data.savedId;
                } else {
                  this.membershipAssetsDetailsModel = data.data;
                  if(null != data.savedId && undefined != data.savedId)
                      this.savedID = data.savedId;
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
        });
        this.translate.get('ERP.LAND_DETAILS').subscribe((text: string) => {
          this.land = text;
        });
        this.translate.get('ERP.NOMINEE_DETAILS').subscribe((text: string) => {
          this.nominee = text;
        });
        this.translate.get('ERP.FAMILY_DETAILS').subscribe((text: string) => {
          this.familydetails = text;
        });
        this.translate.get('ERP.ASSET_DETAILS').subscribe((text: string) => {
          this.asset = text;
          this.items = [
            {
              label: this.basicDetails,icon: 'fa fa-id-badge',
              command: (event: any) => {
                this.activeIndex = 0;
              }
            },
            {
              label: this.kyc,icon: 'fa fa-podcast',
              command: (event: any) => {
                this.activeIndex = 1;
              }
            },
            {
              label: this.communication,icon: 'fa fa-map-marker',
              command: (event: any) => {
                this.activeIndex = 2;
              }
            },
            {
              label: this.land,icon: 'fa fa-location-arrow',
              command: (event: any) => {
                this.activeIndex = 3;
              }
            },
            {
              label: this.nominee,icon: 'fa fa-user-o' ,
              command: (event: any) => {
                this.activeIndex = 4;
              }
            },
            {
              label: this.familydetails,icon: 'fa fa-clone' ,
              command: (event: any) => {
                this.activeIndex = 5;
              }
            },
            {
              label: this.asset,icon: 'fa fa-map-o',
              command: (event: any) => {
                this.activeIndex = 6;
              }
            }
          ];
          this.memberBasicDetailsStepperService.currentStep.subscribe((data: any) => {
            if (data != undefined || null) {
              this.activeIndex = data.stepperIndex
              // if(this.savedID == null){
                this.changeStepperSelectorAdd();
              // }
              this.buttonDisbled = data.isDisable
              if (data.data != null) {
                if (this.activeIndex == 0) {
                  this.memberBasicDetailsModel = data.data;
                  this.isSaveContinueEnable = false;
                } else if (this.activeIndex == 1) {
                  this.memberKycDetailsModel = data.data;
                  this.savedID = data.savedId;
                } else if (this.activeIndex == 2) {
                  this.memberCommunicationDetailsModel = data.data;
                }
                else if (this.activeIndex == 3) {
                  this.memberLandDetailsModel = data.data;
                  this.savedID = data.savedId;
                }
                else if (this.activeIndex == 4) {
                  if (data.data != null && data.data != undefined) {
                   
                    if (data.data.memberGuardianDetailsModel != null && data.data.memberGuardianDetailsModel != undefined) {
                      this.memberGuardianDetailsModel = data.data.memberGuardianDetailsModel;
                    }
                    this.memberNomineeDetailsModel = data.data;
                  }
                }
                else if (this.activeIndex == 5) {
                  this.membershipFamilyDetailsModel = data.data;
                  if(null != data.savedId && undefined != data.savedId)
                    this.savedID = data.savedId;
                } else {
                  this.membershipAssetsDetailsModel = data.data;
                  if(null != data.savedId && undefined != data.savedId)
                      this.savedID = data.savedId;
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
  changeStepperSelectorAdd() {
    this.items.map((val, index) => {
      if (this.activeIndex == index) {
        val['disabled'] = false;
      } else {
        val['disabled'] = true;
      }
      return val;
    })
  }

  changeStepperSelector(item:any) {
    if (this.menuDisabled) {
      return; // Do nothing if menu is disabled
    }
    this.activeItem = item;
    this.menuDisabled = true; 
  }

  
  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  navigateTo(activeIndex: any,saveId:any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_BASIC_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
      case 1:
        this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_KYC], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
        case 2:
          this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_COMMUNICATION], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
          break;
      case 3:
        this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_LAND], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
      case 4:
        this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_NOMINEE], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
      case 5:
        this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_FAMILY_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
      case 6:
        this.router.navigate([Membershiptransactionconstant.INDIVIDUAL_ASSET], { queryParams: { id: this.encryptDecryptService.encrypt(saveId) } });
        break;
    }
  }
  prevStep(activeIndex: any) {
    this.activeIndex = activeIndex - 1;
    this.navigateTo(this.activeIndex,this.savedID);

  }
  saveAndNext(activeIndex: any) {
    if (activeIndex == 0) {
      this.addOrUpdate(activeIndex, "next");
    }
   
    else if(activeIndex == 1){
      this.addOrUpdateKycDetails(activeIndex,"next")
    }
    else if(activeIndex == 2){
      this.addOrUpdateCommunicationDetails(activeIndex,"next")
    }
    else if(activeIndex == 3){
      this.addOrUpdateLandDetails(activeIndex,"next")
    }
    
    else if(activeIndex == 4){
      this.addOrUpdateNominee(activeIndex,"next")
      this.addOrUpdateGardian(activeIndex,"next")
    }
    else if(activeIndex == 5){
      this.addOrUpdateFamilyDetails(activeIndex,"next")
    }
    else if(activeIndex == 6){
      this.addOrUpdateAssetsDetails(activeIndex,"next")
    }
     else {
      this.activeIndex = activeIndex + 1;
      this.navigateTo(this.activeIndex,this.savedID);
    }
  }

  saveContinue(activeIndex:any) {
    this.activeIndex = 0;
    this.route.navigate([Membershiptransactionconstant.INDIVIDUAL_BASIC_DETAILS]);
    this.stepperCreation();
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
      });
      this.translate.get('ERP.LAND_DETAILS').subscribe((text: string) => {
        this.land = text;
      });
      this.translate.get('ERP.NOMINEE_DETAILS').subscribe((text: string) => {
        this.nominee = text;
      });
      this.translate.get('ERP.FAMILY_DETAILS').subscribe((text: string) => {
        this.familydetails = text;
      });
      this.translate.get('ERP.ASSET_DETAILS').subscribe((text: string) => {
        this.asset = text;
        this.items = [
          {
            label: this.basicDetails
          },
          {
            label: this.kyc
          },
          {
            label: this.communication
          },
          {
            label: this.land
          },
          {
            label: this.nominee
          },
          {
            label: this.familydetails
          },
          {
            label: this.asset
          },
        ];
        
      });
    });
  }

  navigateToGrid() {
    this.buttonDisbled = true;
    this.router.navigate([Membershiptransactionconstant.MEMBERSHIP_TRANSACTION]);
  }
   getProductDetailsObservable() {
    this.memberBasicDetailsStepperService.currentStep.subscribe((data: any) => {
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

  addOrUpdate(activeIndex:any, buttonName:any) {
      //saveorupdate code here
      this.memberBasicDetailsModel.branchId = this.branchId;
      this.memberBasicDetailsModel.pacsId = this.pacsId;
      this.memberBasicDetailsModel.statusName = CommonStatusData.SUBMISSION_FOR_APPROVAL;
      this.memberBasicDetailsModel.memberTypeId = 1;
      this.memberBasicDetailsModel.memberTypeName = MemberShipTypesData.INDIVIDUAL;
      // this.memberBasicDetailsModel.name = this.memberBasicDetailsModel.name.trim();
      if(this.memberBasicDetailsModel.temAdmDate != undefined && this.memberBasicDetailsModel.temAdmDate != null)
      this.memberBasicDetailsModel.admissionDate = this.commonFunctionsService.getUTCEpochWithTime(this.memberBasicDetailsModel.temAdmDate);
      if(this.memberBasicDetailsModel.memDobVal != undefined && this.memberBasicDetailsModel.memDobVal != null)
      this.memberBasicDetailsModel.dob = this.commonFunctionsService.getUTCEpochWithTime(this.memberBasicDetailsModel.memDobVal);

      // let memTYpe = this.productTypeList.find((data:any) =>null != data.value  && this.memberBasicDetailsModel.memberClassType == data.value);
      // if(memTYpe != null && memTYpe != undefined)     
      //  this.memberBasicDetailsModel.memberClassTypeName = memTYpe.label;

    if (this.memberBasicDetailsModel.id != null) {

      this.membershipBasicDetailsService.updateMembershipBasicDetails(this.memberBasicDetailsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.memberBasicDetailsModel = response.data[0];
          if(null != this.memberBasicDetailsModel.admissionDate)
          this.memberBasicDetailsModel.temAdmDate=this.datePipe.transform(this.memberBasicDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          if(null != this.memberBasicDetailsModel.dob)
          this.memberBasicDetailsModel.memDobVal=this.datePipe.transform(this.memberBasicDetailsModel.dob, this.orgnizationSetting.datePipe);
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
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisbled = applicationConstants.FALSE;
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

      this.membershipBasicDetailsService.addMembershipBasicDetails(this.memberBasicDetailsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
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
          this.buttonDisbled = applicationConstants.FALSE;
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
  addOrUpdateCommunicationDetails(activeIndex:any, buttonName:any) {
    //saveorupdate code here
    this.memberCommunicationDetailsModel.branchId = 1;
    // remove this line before commit 
    this.memberCommunicationDetailsModel.pacsId = 1;
  if (this.memberCommunicationDetailsModel.id != null && this.memberCommunicationDetailsModel.id != undefined) {
    this.membershipCommunicationDetailsService.updateMembershipCommunicationDetails(this.memberCommunicationDetailsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.memberCommunicationDetailsModel = this.responseModel.data[0]; 
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        if (buttonName == "next") {
          this.activeIndex = activeIndex + 1;
          this.navigateTo(this.activeIndex,this.memberCommunicationDetailsModel.memberShipId);
        } 
      } else {
        this.buttonDisbled = applicationConstants.FALSE;
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
    this.membershipCommunicationDetailsService.addMembershipCommunicationDetails(this.memberCommunicationDetailsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.memberCommunicationDetailsModel = this.responseModel.data[0]; 
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        if (buttonName == "next") {
          this.activeIndex = activeIndex + 1;
          // this.savedID = this.responseModel.data[0].id;
          this.navigateTo(this.activeIndex,this.memberCommunicationDetailsModel.memberShipId);
        } 
      } else {
        this.buttonDisbled = applicationConstants.FALSE;
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
 
addOrUpdateLandDetails(activeIndex:any,buttonName:any) {
  if (buttonName == "next") {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID);
  } 
  this.commonComponent.startSpinner();
  }

  addOrUpdateNominee(activeIndex:any, buttonName:any) {
    //saveorupdate code here
    this.memberNomineeDetailsModel.branchId = 1;
    this.memberNomineeDetailsModel.memberShipId = this.savedID;
    this.memberNomineeDetailsModel.status == applicationConstants.ACTIVE;
    // this.memberNomineeDetailsModel.admissionNumber = this.memberBasicDetailsModel.admissionNumber
    // remove this line before commit 
    this.memberNomineeDetailsModel.pacsId = 1;
    if(this.memberNomineeDetailsModel.nomineeDobVal != undefined && this.memberNomineeDetailsModel.nomineeDobVal != null)
      this.memberNomineeDetailsModel.nomineeDob = this.commonFunctionsService.getUTCEpochWithTime(this.memberNomineeDetailsModel.nomineeDobVal);
  if (this.memberNomineeDetailsModel.id != null) {
    this.membershipNomineeDetailsService.updateMembershipNomineeDetails(this.memberNomineeDetailsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.memberNomineeDetailsModel = this.responseModel.data[0]; 
        if(null != this.memberNomineeDetailsModel.nomineeDob)
          this.memberNomineeDetailsModel.nomineeDobVal=this.datePipe.transform(this.memberNomineeDetailsModel.nomineeDob, this.orgnizationSetting.datePipe);

        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        if (buttonName == "next") {
          this.activeIndex = activeIndex + 1;
          this.navigateTo(this.activeIndex,this.memberNomineeDetailsModel.memberShipId)
        } 
      } else {
        this.buttonDisbled = applicationConstants.FALSE;
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
    this.membershipNomineeDetailsService.addMembershipNomineeDetails(this.memberNomineeDetailsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.memberCommunicationDetailsModel = this.responseModel.data[0]; 
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        if (buttonName == "next") {
          this.activeIndex = activeIndex + 1;
          // this.savedID = this.responseModel.data[0].id;
          this.navigateTo(this.activeIndex,this.memberNomineeDetailsModel.memberShipId)
        } 
      } else {
        this.buttonDisbled = applicationConstants.FALSE;
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
  addOrUpdateGardian(activeIndex:any, buttonName:any) {
    //saveorupdate code here
    this.memberGuardianDetailsModel.branchId = 1;
    this.memberGuardianDetailsModel.memberId = this.savedID;
    this.memberGuardianDetailsModel.status == applicationConstants.ACTIVE;
    this.memberGuardianDetailsModel.pacsId = 1;
   
    this.memberGuardianDetailsModel.status == applicationConstants.ACTIVE;
    if(this.memberGuardianDetailsModel.guardianDobVal != undefined && this.memberGuardianDetailsModel.guardianDobVal != null)
      this.memberGuardianDetailsModel.guardianDob = this.commonFunctionsService.getUTCEpochWithTime(this.memberGuardianDetailsModel.guardianDobVal);
  if (this.memberGuardianDetailsModel.id != null) {
    this.memberGuardianDetailsService.updateMemberGuardianDetails(this.memberGuardianDetailsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.memberGuardianDetailsModel = this.responseModel.data[0]; 
        if(null != this.memberGuardianDetailsModel.guardianDob)
          this.memberGuardianDetailsModel.guardianDobVal=this.datePipe.transform(this.memberGuardianDetailsModel.guardianDob, this.orgnizationSetting.datePipe);
          this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        if (buttonName == "next") {
          this.activeIndex = activeIndex + 1;
          this.navigateTo(this.activeIndex,this.memberGuardianDetailsModel.memberId)
        } 
      } else {
        this.buttonDisbled = applicationConstants.FALSE;
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
    this.memberGuardianDetailsService.addMemberGuardianDetails(this.memberGuardianDetailsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.memberCommunicationDetailsModel = this.responseModel.data[0]; 
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        if (buttonName == "next") {
          this.activeIndex = activeIndex + 1;
          // this.savedID = this.responseModel.data[0].id;
          this.navigateTo(this.activeIndex,this.memberGuardianDetailsModel.memberId)
        } 
      } else {
        this.buttonDisbled = applicationConstants.FALSE;
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


addOrUpdateFamilyDetails(activeIndex:any,buttonName:any) {
  if (buttonName == "next") {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID)
  } 
  this.commonComponent.startSpinner();
}

addOrUpdateAssetsDetails(activeIndex:any,buttonName:any) {
  if (buttonName == "next") {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID)
  } 
  this.commonComponent.startSpinner();
}

addOrUpdateKycDetails(activeIndex:any,buttonName:any) {
  if (buttonName == "next") {
    this.activeIndex = activeIndex + 1;
    this.navigateTo(this.activeIndex,this.savedID)
  } 
  this.commonComponent.startSpinner();
}

back(activeIndex: any) {
  this.router.navigate([Membershiptransactionconstant.MEMBERSHIP_TRANSACTION]);

}

submit() {
  this.buttonDisbled = true;
  this.router.navigate([Membershiptransactionconstant.VIEW_MEMBERSHIP], { queryParams: { id: this.encryptDecryptService.encrypt(this.savedID) , type: this.encryptDecryptService.encrypt('Individual'),editbtn:this.encryptDecryptService.encrypt(1),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.ACTIVE) }});
  // this.editViewButton =true;
}

save() {
  this.buttonDisbled = true;
  this.router.navigate([Membershiptransactionconstant.MEMBERSHIP_TRANSACTION]);
}

cancel(activeIndex: any) {
  this.router.navigate([Membershiptransactionconstant.MEMBERSHIP_TRANSACTION]);
}


}