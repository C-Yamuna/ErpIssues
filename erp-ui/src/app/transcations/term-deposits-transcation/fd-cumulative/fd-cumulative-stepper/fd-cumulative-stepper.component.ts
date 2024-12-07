import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { termdeposittransactionconstant } from '../../term-deposit-transaction-constant';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { NewMembershipAddService } from './new-membership-add/shared/new-membership-add.service';
import { MemberGroupDetailsModel, MembershipInstitutionDetailsModel, NewMembershipAdd } from './new-membership-add/shared/new-membership-add.model';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FdCumulativeKyc } from './fd-cumulative-kyc/shared/fd-cumulative-kyc.model';
import { FdCumulativeNominee, MemberGuardianDetailsModelDetails } from './fd-cumulative-nominee/shared/fd-cumulative-nominee.model';
import { FdCumulativeNomineeService } from './fd-cumulative-nominee/shared/fd-cumulative-nominee.service';
import { FdCumulativeApplication } from './fd-cumulative-application/shared/fd-cumulative-application.model';
import { FdCumulativeApplicationService } from './fd-cumulative-application/shared/fd-cumulative-application.service';
import { FdCumulativeCommunication } from './fd-cumulative-communication/shared/fd-cumulative-communication.model';
import { FdCumulativeCommunicationService } from './fd-cumulative-communication/shared/fd-cumulative-communication.service';
import { FdCumulativeJointHolder } from './fd-cumulative-joint-holder-details/shared/fd-cumulative-joint-holder.model';
import { FdCumulativeJointHolderService } from './fd-cumulative-joint-holder-details/shared/fd-cumulative-joint-holder.service';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Component({
  selector: 'app-fd-cumulative-stepper',
  templateUrl: './fd-cumulative-stepper.component.html',
  styleUrls: ['./fd-cumulative-stepper.component.css']
})
export class FdCumulativeStepperComponent implements OnInit {

  items: MenuItem[] = [];
  activeIndex: number = 0;
  buttonDisabled: boolean = false;
  activeItem: any;
  societyId: any;
  branchId: any;
  isEdit: boolean = false;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  completed: any;
  flagForLabelName: boolean = false;

  admissionNumber: any;

  surName: any;
  name: any;
  gender: any;
  age: any;
  maritalStatus: any;
  relationshipType: any;
  relativeName: any;
  mobileNumber: any;
  email: any;
  dateOfBirth: any;
  fdCummulativeAccId: any;
  sbCommunicationId: any;
  accountType: any;
  flag: Boolean = false;
  isApplicationEdit: boolean = false;
  isCommunicationEdit: boolean = false;
  isJointEdit: boolean = false;
  isKycEdit: boolean = false;
  isNomineeEdit: boolean = false;
  flagForNomineeTypeValue: any;
  isPerminentAddressIsSameFalg: boolean = false;
  accountNumber: any;
  memberTypeName: any;
  menuDisabled: any;
  checked: Boolean = false;
  showForm: boolean = false;
  tabviewButton: boolean = true;
  pacsId: any;
  accountTypeName: any;
  allTypesOfmembershipList: any;

  // memberCard feilds 
  individualFlag: boolean = true;
  groupFlag: boolean = false;
  institutionFlag: boolean = false;
  isNewMemberCreation: boolean = false;
  permenentAllTypesOfmembershipList: any;
  orgnizationSetting: any;
  memberDropDownDisable: boolean = false;
  membershipBasicRequiredDetailsModel: NewMembershipAdd = new NewMembershipAdd();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  fdCumulativeApplicationModel: FdCumulativeApplication = new FdCumulativeApplication();
  fdCumulativeCommunicationModel: FdCumulativeCommunication = new FdCumulativeCommunication();
  fdCumulativeKycModel: FdCumulativeKyc = new FdCumulativeKyc();
  fdCumulativeJointHolderModel: FdCumulativeJointHolder = new FdCumulativeJointHolder();
  fdCumulativeNomineeModel: FdCumulativeNominee = new FdCumulativeNominee();
  memberGuardianDetailsModelDetails: MemberGuardianDetailsModelDetails = new MemberGuardianDetailsModelDetails();
  memberTypeId: any;
  admissionNumberDropDownDisable : boolean = false;
  previousStepFlag: boolean = false;
  membreIndividualFlag: boolean = false;
  memberPhotoCopyZoom: boolean = false;
  institutionPromoterFlag: boolean = false;
  groupPromotersPopUpFlag: boolean= false;
  groupPrmotersList: any[] = [];
  groupPrmoters: any[] = [];
  institutionPrmoters: any[] = [];
  institutionPrmotersList: any[] = [];
  columns: any[] = [];
  photoCopyFlag: boolean = false;
  memberSignatureCopyZoom: boolean = false;
  memberDetails: any;
  isKycApproved :any;
  jointHolderList: any[] = [];
  memberTypeList: any[] = [];
  jointHolderDetailsList: any[]=[];
  constructor(private router: Router,
    private fdCumulativeApplicationService: FdCumulativeApplicationService,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService,
    private fdCumulativeCommunicationService: FdCumulativeCommunicationService,
    private fdCumulativeNomineeService: FdCumulativeNomineeService,
    private commonFunctionsService: CommonFunctionsService,
    private translate: TranslateService,
    private membershipServiceService: NewMembershipAddService,
    private datePipe: DatePipe,
    private fdCumulativeJointHolderService: FdCumulativeJointHolderService,private fileUploadService : FileUploadService) {
      this.institutionPrmoters = [
        { field: 'surname', header: 'surname' },
        { field: 'name', header: 'name' },
        { field: 'operatorTypeName', header: 'operation type name' },
        { field: 'memDobVal', header: 'member Date Of Birth' },
        { field: 'age', header: 'age' },
        { field: 'genderTypeName', header: 'gender name' },
        { field: 'maritalStatusName', header: 'marital status' },
        { field: 'mobileNumber', header: 'mobile number' },
        { field: 'emailId', header: 'email' },
        { field: 'aadharNumber', header: 'aadhar' },
        { field: 'startDateVal', header: 'start date' },
      ];
      this.groupPrmoters = [
        { field: 'surname', header: 'surname' },
        { field: 'name', header: 'name' },
        { field: 'operatorTypeName', header: 'operation type name' },
        { field: 'memDobVal', header: 'member Date Of Birth' },
        { field: 'age', header: 'age' },
        { field: 'genderName', header: 'gender name' },
        { field: 'maritalStatusName', header: 'marital status' },
        { field: 'mobileNumber', header: 'mobile number' },
        { field: 'emailId', header: 'email' },
        { field: 'aadharNumber', header: 'aadhar' },
        { field: 'startDateVal', header: 'start date' },
      ];
     }

     ngOnInit() {
      this.pacsId = this.commonFunctionsService.getStorageValue(applicationConstants.PACS_ID);
      this.branchId = this.commonFunctionsService.getStorageValue(applicationConstants.BRANCH_ID);
      this.orgnizationSetting = this.commonComponent.orgnizationSettings();
     
      this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
      
      
      this.activateRoute.queryParams.subscribe(params => {
        if (params['id'] != undefined || params['admissionNo'] != undefined || params['falg'] != undefined || params['showForm'] != undefined) {
          if(params['id'] != undefined)
          { 
            let queryParams = Number(this.encryptDecryptService.decrypt(params['id']));
            let qParams = queryParams;
            this.fdCummulativeAccId = qParams;
            this.getFdApplicationById(this.fdCummulativeAccId);
          }
          if(params['falg'] != undefined || params['showForm'] != undefined)
            { 
              this.refreshTheMemberCardData();
            } 
            
          if(params['admissionNo'] != undefined)
          { 
              let queryParams = Number(this.encryptDecryptService.decrypt(params['admissionNo']));
              let qParams = queryParams;
              this.admissionNumber = qParams;
                this.getMemberDetailsByAdmissionNUmber(this.admissionNumber);
                this.getGroupDetailsByAdmissionNumber(this.admissionNumber);
                this.getInstitutionDetailsByAdmissionNumber(this.admissionNumber);
          }       
          this.isEditCheck(this.activeIndex);
        } else {
          this.isEdit = false;
          this.flagForLabelName = false;
        }
        this.itemList();
      });
      if(this.memberDetails != null && this.memberDetails != undefined){
        this.membershipBasicRequiredDetailsModel = this.memberDetails
      }
      this.itemList();
      if (!this.showForm) {
        this.getAllTypeOfMembershipDetails(this.pacsId, this.branchId);
      }
      this.appendCurrentStepperData();
    }

    refreshTheMemberCardData() {
      this.fdCumulativeApplicationService.resetCurrentStep();
      this.membershipBasicRequiredDetailsModel = new NewMembershipAdd();
      this.memberGroupDetailsModel = new MemberGroupDetailsModel();
      this.membershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
      this.admissionNumber = null;
    }


  appendCurrentStepperData(){
    this.itemList();
    this.fdCumulativeApplicationService.currentStep.subscribe((data: any) => {
      if (data) {
        this.translate.use(this.commonFunctionsService.getStorageValue('language'));
      } else {
        this.translate.use(this.commonFunctionsService.getStorageValue('language'));
      }
    
      if (data != undefined) {
        this.activeIndex = data.stepperIndex
        this.changeStepperSelector(this.activeIndex);
        this.buttonDisabled = data.isDisable
        if (data.data != null && data.data != undefined) {
          if (this.activeIndex == 0) {
            this. fdCumulativeApplicationModel = data.data;
            if (this. fdCumulativeApplicationModel != null && this. fdCumulativeApplicationModel != undefined) {
              if (this. fdCumulativeApplicationModel.isNewMember != null && this. fdCumulativeApplicationModel.isNewMember != undefined)
                this.showForm = this. fdCumulativeApplicationModel.isNewMember;
              if (this. fdCumulativeApplicationModel.admissionNumber != null && this. fdCumulativeApplicationModel.admissionNumber != undefined)
                this.admissionNumber = this. fdCumulativeApplicationModel.admissionNumber;
              if (this. fdCumulativeApplicationModel.memberTypeName != null && this. fdCumulativeApplicationModel.memberTypeName != undefined)
                this.memberTypeName = this. fdCumulativeApplicationModel.memberTypeName;
              this.memberTypeCheck(this.memberTypeName, this. fdCumulativeApplicationModel);
            }
            this.itemList();
          }
          else if (this.activeIndex == 1) {
            if (data.data != null && data.data != undefined) {
              this.fdCumulativeKycModel = data.data;
            }
            this.itemList();
          }
          else if (this.activeIndex == 2) {
            if (data.data != null && data.data != undefined) {
              this.fdCumulativeCommunicationModel = data.data;
            }
            this.itemList();
          }
          else if (this.activeIndex == 3) {
            if (data.data != null && data.data != undefined) {
              this. fdCumulativeApplicationModel = data.data;
            }
            this.itemList();
          }

          else if (this.activeIndex == 4) {
            if (data.data != null && data.data != undefined) {
              if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
                this.fdCumulativeApplicationModel.admissionNumber = data.data.admissionNumber;
              }
      
              if (data.data.jointHolderList != null && data.data.jointHolderList != undefined && data.data.jointHolderList.length > 0) {
                this.jointHolderList = data.data.jointHolderList;
              }
              this.fdCumulativeJointHolderModel = data.data;
            }
            this.itemList();
          }
          else if (this.activeIndex == 5) {
            if (data.data != null && data.data != undefined) {
              this. fdCumulativeNomineeModel = data.data;
              if (this. fdCumulativeNomineeModel != null && this. fdCumulativeNomineeModel != undefined) {
                if (this. fdCumulativeNomineeModel.memberGuardianDetailsModelDetails != null && this. fdCumulativeNomineeModel.memberGuardianDetailsModelDetails != undefined) {
                  this.memberGuardianDetailsModelDetails = this. fdCumulativeNomineeModel.memberGuardianDetailsModelDetails;
                }
              }
            }
            this.itemList();
          }
        }
      }
    });
  }
  
   
  
  
  itemList() {
    if (this.showForm) {
      if (this. fdCumulativeApplicationModel.accountTypeName != "Joint") {
        this.items = [
          {
            label: 'Member Details', icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant. NEW_MEMBERSHIPS,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: termdeposittransactionconstant.FD_CUMM_KYC,
            command: (event: any) => {
              this.activeIndex = 1;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: termdeposittransactionconstant.FD_CUMM_COMMUNICATION,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application', icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.FD_CUMM_APPLICATION,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: termdeposittransactionconstant.TERMDEPOST_FD_CUMULATIVE_NOMINEE,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          }
        ];
      }
      else {
        this.items = [
          {
            label: 'Member Details', icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.NEW_MEMBERSHIPS,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: termdeposittransactionconstant.FD_CUMM_KYC,
            command: (event: any) => {
              this.activeIndex = 1;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: termdeposittransactionconstant.FD_CUMM_COMMUNICATION,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application', icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.FD_CUMM_APPLICATION,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Joint Account', icon: 'fa fa-handshake-o', routerLink: termdeposittransactionconstant.TERMDEPOST_FD_CUMULATIVE_JOINTHOLDERDETAILS,
            command: (event: any) => {
              this.activeIndex = 4;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: termdeposittransactionconstant.TERMDEPOST_FD_CUMULATIVE_NOMINEE,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          }
        ];
      }
    }
    else {
      if (this. fdCumulativeApplicationModel.accountTypeName != "Joint") {
        this.items = [
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: termdeposittransactionconstant. MEMBERSHIP_DETAIL,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: termdeposittransactionconstant.FD_CUMM_COMMUNICATION,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application', icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.FD_CUMM_APPLICATION,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: termdeposittransactionconstant.TERMDEPOST_FD_CUMULATIVE_NOMINEE,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          }
        ];
      }
      else {
        this.items = [
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: termdeposittransactionconstant.MEMBERSHIP_DETAIL,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: termdeposittransactionconstant.FD_CUMM_COMMUNICATION,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application', icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.FD_CUMM_APPLICATION,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Joint Account', icon: 'fa fa-handshake-o', routerLink: termdeposittransactionconstant.TERMDEPOST_FD_CUMULATIVE_JOINTHOLDERDETAILS,
            command: (event: any) => {
              this.activeIndex = 4;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: termdeposittransactionconstant.TERMDEPOST_FD_CUMULATIVE_NOMINEE,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          }
        ];
      }
    }
    this.activeItem = this.items[this.activeIndex];
  }


  memberTypeCheck(memberType: any, data: any) {
    if (memberType == "Individual") {
      this.individualFlag = true;
      this.groupFlag = false;
      this.institutionFlag = false;
      this.membershipBasicRequiredDetailsModel = data.memberShipBasicDetailsDTO;
      if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined) {
        this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);
      }
      if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined) {
        this.membershipBasicRequiredDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
      }
    }
    else if (memberType == "Group") {
      this.groupFlag = true;
      this.institutionFlag = false;
      this.individualFlag = false;
      this.memberGroupDetailsModel = data.memberShipGroupDetailsDTO;
      if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
        this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
      }
      if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
        this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
      }
      if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined && this.memberGroupDetailsModel.groupPromoterList.length > 0) {
            this.groupPrmotersList=this.memberGroupDetailsModel.groupPromoterList ;
      }
    }
    else if (memberType == "Institution") {
      this.institutionFlag = true;
      this.individualFlag = false;
      this.groupFlag = false;
      this.membershipInstitutionDetailsModel = data.memInstitutionDTO;
      if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
        this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
      }
      if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
        this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
      }
      if (this.membershipInstitutionDetailsModel.institutionPromoterList != null && this.membershipInstitutionDetailsModel.institutionPromoterList != undefined && this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0) {
        this.institutionPrmotersList=this.membershipInstitutionDetailsModel.institutionPromoterList ;
  }
    }
  }

  isEditCheck(activeIndex: any) {
    if (activeIndex == 0) {
      this.isEdit = true;
    }
    else if (activeIndex == 1) {
      this.isApplicationEdit = true
    }
    else if (activeIndex == 2) {
      this.isJointEdit = true
    }
    else if (activeIndex == 3) {
      this.isCommunicationEdit = true
    }
    else if (activeIndex == 4) {
      this.isKycEdit = true
    }
    else if (activeIndex == 5) {
      this.isNomineeEdit = true
    }
  }

  changeStepperSelector(item: any) {
    // if (this.menuDisabled) {
    //   return; // Do nothing if menu is disabled
    // }
    this.activeItem = item;
    this.menuDisabled = true;
    this.items.map((val, index) => {
      if (this.activeIndex == index) {
        val['disabled'] = false;
      } else {
        val['disabled'] = true;
      }
      return val;
    })
  }

  //membership module admissionNumbers 
  getAllTypeOfMembershipDetails(pacsId: any, branchId: any) {
    this.membershipServiceService.getAllTypeOfMemberDetailsListFromMemberModule(this.pacsId, this.branchId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.permenentAllTypesOfmembershipList = this.responseModel.data;
            this.allTypesOfmembershipList = this.permenentAllTypesOfmembershipList.filter((obj: any) => obj != null).map((relationType: { id: any; name: any; admissionNumber: any; memberTypeName: any }) => {
              return {
                label: `${relationType.name} - ${relationType.admissionNumber} - ${relationType.memberTypeName}`,
                value: relationType.admissionNumber
              };
            });
          }
          else {
            this.msgs = [];
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        }
      }
    });
  }

  navigateTo(activeIndex: number, savedId: any) {
    this.itemList();
    switch (activeIndex) {
      case 0:
        if (!this.showForm) {
          this.router.navigate([termdeposittransactionconstant. MEMBERSHIP_DETAIL], { queryParams: { id: this.encryptDecryptService.encrypt(this.fdCummulativeAccId) } });
        }
        else {
          this.router.navigate([termdeposittransactionconstant. NEW_MEMBERSHIPS], { queryParams: { id: this.encryptDecryptService.encrypt(this.fdCummulativeAccId) } });
        }
        break;
      case 1:
        this.router.navigate([termdeposittransactionconstant.FD_CUMM_KYC], { queryParams: { id: this.encryptDecryptService.encrypt(this.fdCummulativeAccId) } });
        break;
      case 2:
        this.router.navigate([termdeposittransactionconstant.FD_CUMM_COMMUNICATION], { queryParams: { id: this.encryptDecryptService.encrypt(this.fdCummulativeAccId) } });
        break;
      case 3:
        this.router.navigate([termdeposittransactionconstant.FD_CUMM_APPLICATION], { queryParams: { id: this.encryptDecryptService.encrypt(this.fdCummulativeAccId) } });
        break;
      case 4:
        this.router.navigate([termdeposittransactionconstant.TERMDEPOST_FD_CUMULATIVE_JOINTHOLDERDETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(this.fdCummulativeAccId) } });
        break;
      case 5:
        this.router.navigate([termdeposittransactionconstant.TERMDEPOST_FD_CUMULATIVE_NOMINEE], { queryParams: { id: this.encryptDecryptService.encrypt(this.fdCummulativeAccId) } });
        break;
    }
  }

  prevStep(activeIndex: number) {
    this.activeIndex = activeIndex - 1;
    if (activeIndex == 0) {
      this.navigateTo(this.activeIndex, this.fdCummulativeAccId);
    }
    else if (activeIndex == 1) {
      this.navigateTo(this.activeIndex, this.fdCummulativeAccId);
    }
    else if (activeIndex == 2) {
      if (!this.showForm) {
        this.activeIndex = this.activeIndex - 1;
      }
      this.navigateTo(this.activeIndex, this.fdCummulativeAccId);
    }
    else if (activeIndex == 3) {
      this.navigateTo(this.activeIndex, this.fdCummulativeAccId);
    }
    else if (activeIndex == 4) {
      this.navigateTo(this.activeIndex, this.fdCummulativeAccId);
    }
    else if (activeIndex == 5) {
      if (this. fdCumulativeApplicationModel.accountTypeName != "Joint") {
        this.flag = false;
        this.activeIndex = this.activeIndex - 1;
      }
      this.navigateTo(this.activeIndex, this.fdCummulativeAccId);
    }
    else if (activeIndex == 6) {
      this.navigateTo(this.activeIndex, this.fdCummulativeAccId);
    }
  }
  nextStep(activeIndex: number) {
    if (activeIndex == 0) {
      if (this.memberTypeName == "Individual") {
        this.setMemberDetailsTofdApplicationDetails(this.fdCumulativeApplicationModel.memberShipBasicDetailsDTO);
      } else if (this.memberTypeName == "Group") {
        this.setMemberDetailsTofdApplicationDetails(this.fdCumulativeApplicationModel.memberShipGroupDetailsDTO);
      } else if (this.memberTypeName == "Institution") {
        this.setMemberDetailsTofdApplicationDetails(this.fdCumulativeApplicationModel.memInstitutionDTO);
      }
      this.addAOrUpdateFdCummApplicationWithMemberModuleDetails(activeIndex, "next");
    }
    else if (activeIndex == 2) {
      this.addOrUpdateCommunicationDetails(activeIndex, "next");
    } else if (activeIndex == 3) {
      if (!this.isNomineeEdit) {
        this.flagForNomineeTypeValue = 0;
      } else {
        this.flagForNomineeTypeValue = this.fdCumulativeNomineeModel.flagForNomineeTypeValue;
      }
      this.addAOrUpdateFdCummApplicationDetails(activeIndex, "next");
    } else if (activeIndex == 4) {
      this.addAOrUpdateFdCummJointHolderDetails();
    } else {
      this.activeIndex = activeIndex + 1;
      this.navigateTo(this.activeIndex, this.fdCummulativeAccId);
    }
  }

  setMemberDetailsTofdApplicationDetails(memeberdetailsObj: any) {
    this.fdCumulativeApplicationModel.memberType = memeberdetailsObj.memberTypeId;
    this.fdCumulativeApplicationModel.memberTypeName = memeberdetailsObj.memberTypeName;
    // this.fdCumulativeApplicationModel.name = memeberdetailsObj.name;
    // // this.savingBankApplicationModel.surName = memeberdetailsObj.surName;
    // this.fdCumulativeApplicationModel.email = memeberdetailsObj.emailId;
    // this.fdCumulativeApplicationModel.mobileNumber = memeberdetailsObj.mobileNumber;
  }
  back() {
    this.router.navigate([termdeposittransactionconstant.FD_CUMMULATIVE]);
  }

  cancel() {
    this.router.navigate([termdeposittransactionconstant.FD_CUMMULATIVE]);
  }

  saveAndPreview() {
    if (this.activeIndex == 5) {
      this.addOrUpdateNomineeDetails();
      if (this.memberGuardianDetailsModelDetails != null && this.memberGuardianDetailsModelDetails != undefined) {
        this.addOrUpdateGurdianetails();
      }
    }
  }

  navigateToPreview(){
    this.router.navigate([termdeposittransactionconstant.FD_CUMMULATIVE_PREVIEW], { queryParams: { id: this.encryptDecryptService.encrypt(this.fdCummulativeAccId), editbutton: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE), isGridPage: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE) } });
  }


  onChange() {
  
    this.commonFunctionsService.setStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION, this.showForm);
    if (this.showForm) {
      this.router.navigate([termdeposittransactionconstant.NEW_MEMBERSHIPS], { queryParams: { showForm: this.encryptDecryptService.encrypt(this.showForm) } });
    }
    else {
      this.router.navigate([termdeposittransactionconstant.MEMBERSHIP_DETAIL], { queryParams: { showForm: this.encryptDecryptService.encrypt(this.showForm) } });
    }
  }

  getFdApplicationById(id: any) {
    this.fdCumulativeApplicationService.getFdCummApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {

        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {

          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.fdCumulativeApplicationModel = this.responseModel.data[0];
            this.memberDropDownDisable = true;
            this.isNewMemberCreation = true;
            this.admissionNumber = this.fdCumulativeApplicationModel.admissionNumber;
            if (this.fdCumulativeApplicationModel.memberShipBasicDetailsDTO != null && this.fdCumulativeApplicationModel.memberShipBasicDetailsDTO != undefined) {
              this.membershipBasicRequiredDetailsModel = this.fdCumulativeApplicationModel.memberShipBasicDetailsDTO;
              if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined) {
                this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined) {
                this.membershipBasicRequiredDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicRequiredDetailsModel.photoPath != null && this.membershipBasicRequiredDetailsModel.photoPath != undefined) {
                this.membershipBasicRequiredDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.photoPath ,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.photoPath  );
                this.photoCopyFlag = true;
              }
              if (this.membershipBasicRequiredDetailsModel.signaturePath != null && this.membershipBasicRequiredDetailsModel.signaturePath != undefined) {
                this.membershipBasicRequiredDetailsModel.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.signaturePath ,ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.signaturePath  );
                this.photoCopyFlag = true;
              }
              if (this.membershipBasicRequiredDetailsModel.isKycApproved != null && this.membershipBasicRequiredDetailsModel.isKycApproved != undefined && this.membershipBasicRequiredDetailsModel.isKycApproved) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
              this.individualFlag = true;
              this.groupFlag = false;
              this.institutionFlag = false;
              this.showForm = this.membershipBasicRequiredDetailsModel.isNewMember
            }
            if (this.fdCumulativeApplicationModel.memberShipGroupDetailsDTO != null && this.fdCumulativeApplicationModel.memberShipGroupDetailsDTO != undefined) {
              this.groupFlag = true;
              this.institutionFlag = false;
              this.individualFlag = false;
              this.memberGroupDetailsModel = this.fdCumulativeApplicationModel.memberShipGroupDetailsDTO;
              this.showForm = this.memberGroupDetailsModel.isNewMember;
              if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
                this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
              }
              if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
                this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined && this.memberGroupDetailsModel.groupPromoterList.length > 0) {
                this.groupPrmotersList = this.memberGroupDetailsModel.groupPromoterList.map((member: any) => {
                  if(member != null && member != undefined){
                    if(member.dob != null && member.dob != undefined){
                      member.memDobVal = this.datePipe.transform(member.dob, this.orgnizationSetting.datePipe);
                      }
                    if(member.startDate != null && member.startDate != undefined){
                      member.startDateVal = this.datePipe.transform(member.startDate, this.orgnizationSetting.datePipe);
                      }
                     
                  }
                  return member;
                });
                  if(this.memberGroupDetailsModel.memberTypeName != null && this.memberGroupDetailsModel.memberTypeName != undefined){
                    this.fdCumulativeApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
                  }
                  if(this.memberGroupDetailsModel != null && this.memberGroupDetailsModel != undefined){
                  this.fdCumulativeApplicationModel.memberShipGroupDetailsDTO = this.memberGroupDetailsModel;
                  }
              }
              if (this.memberGroupDetailsModel.isKycApproved != null && this.memberGroupDetailsModel.isKycApproved != undefined) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
            }
            if (this.fdCumulativeApplicationModel.memInstitutionDTO != null && this.fdCumulativeApplicationModel.memInstitutionDTO != undefined) {
              this.institutionFlag = true;
              this.individualFlag = false;
              this.groupFlag = false;
              this.membershipInstitutionDetailsModel = this.fdCumulativeApplicationModel.memInstitutionDTO;
              this.showForm = this.membershipBasicRequiredDetailsModel.isNewMember;
              if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
                this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
                this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipInstitutionDetailsModel.institutionPromoterList != null && this.membershipInstitutionDetailsModel.institutionPromoterList != undefined && this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0) {
                this.institutionPrmotersList = this.membershipInstitutionDetailsModel.institutionPromoterList.map((member: any) => {
                  if(member != null && member != undefined){
                    if(member.dob != null && member.dob != undefined){
                      member.memDobVal = this.datePipe.transform(member.dob, this.orgnizationSetting.datePipe);
                      }
                    if(member.startDate != null && member.startDate != undefined){
                      member.startDateVal = this.datePipe.transform(member.startDate, this.orgnizationSetting.datePipe);
                      }
                     
                     
                     
                  }
                  return member;
                });
                  if(this.memberGroupDetailsModel.memberTypeName != null && this.memberGroupDetailsModel.memberTypeName != undefined){
                    this.fdCumulativeApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
                  }
                  if(this.memberGroupDetailsModel != null && this.memberGroupDetailsModel != undefined){
                  this.fdCumulativeApplicationModel.memberShipGroupDetailsDTO = this.memberGroupDetailsModel;
                  }
              }
              if (this.membershipInstitutionDetailsModel.isKycApproved != null && this.membershipInstitutionDetailsModel.isKycApproved != undefined) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
            }
          }
        }
        else {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
  OnChangeAdmissionNumber(admissionNo: any) {
    const filteredItem = this.allTypesOfmembershipList.find((item: { value: any; }) => item.value === admissionNo);
    const parts = filteredItem.label.split(' - ');
    let label= parts[parts.length - 1].trim();
    this.membershipBasicRequiredDetailsModel.memberTypeName = label;
    const admissionNumber = filteredItem.label.split(' - ');
    let admissionNumberLable= parts[parts.length - 2].trim();
    this.admissionNumber = admissionNumberLable;
    if (this.membershipBasicRequiredDetailsModel.memberTypeName == "Individual") {
      this.individualFlag = true;
      this.groupFlag = false;
      this.institutionFlag = false;
      this.getMemberDetailsByAdmissionNUmber(admissionNo);
    } else if (this.membershipBasicRequiredDetailsModel.memberTypeName == "Group") {
      this.groupFlag = true;
      this.institutionFlag = false;
      this.individualFlag = false;
      this.getGroupDetailsByAdmissionNumber(admissionNo);
    }
    else if (this.membershipBasicRequiredDetailsModel.memberTypeName == "Institution"){
      this.institutionFlag = true;
      this.individualFlag = false;
      this.groupFlag = false;
        this.getInstitutionDetailsByAdmissionNumber(admissionNo);
    }
    this.router.navigate([termdeposittransactionconstant.MEMBERSHIP_DETAIL], { queryParams: { admissionNo: this.encryptDecryptService.encrypt(admissionNo) } });

  }
  //get member module data by admissionNUmber

  getMemberDetailsByAdmissionNUmber(admissionNumber: any) {
    this.membershipServiceService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipBasicRequiredDetailsModel = this.responseModel.data[0];
          this.membershipBasicRequiredDetailsModel.fdNonCummCommunicationDto = this.responseModel.data[0].memberShipCommunicationDetailsDTOList;

          if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined) {
            this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined) {
            this.membershipBasicRequiredDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicRequiredDetailsModel.fdCummCommunicationDto[0] != null && this.membershipBasicRequiredDetailsModel.fdCummCommunicationDto[0] != undefined) {
            this.fdCumulativeCommunicationModel = this.membershipBasicRequiredDetailsModel.fdCummCommunicationDto[0];
          }
          if (this.membershipBasicRequiredDetailsModel.photoPath != null && this.membershipBasicRequiredDetailsModel.photoPath != undefined) {
              this.membershipBasicRequiredDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.photoPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.photoPath  );
              this.photoCopyFlag = true;
            }
          if (this.membershipBasicRequiredDetailsModel.signaturePath != null && this.membershipBasicRequiredDetailsModel.signaturePath != undefined) {
              this.membershipBasicRequiredDetailsModel.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.signaturePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.signaturePath  );
          }
          if (this.membershipBasicRequiredDetailsModel.isKycApproved != null && this.membershipBasicRequiredDetailsModel.isKycApproved != undefined && this.membershipBasicRequiredDetailsModel.isKycApproved) {
            this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
          }
          else {
            this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
          }
          this.admissionNumber = this.membershipBasicRequiredDetailsModel.admissionNumber;
          this.fdCumulativeApplicationModel.memberTypeName = this.membershipBasicRequiredDetailsModel.memberTypeName;
          this.fdCumulativeApplicationModel.memberShipBasicDetailsDTO = this.membershipBasicRequiredDetailsModel;
        }
      }
      else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
    
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  //get group details from member module data by admissionNumber

  getGroupDetailsByAdmissionNumber(admissionNUmber: any) {
    this.membershipServiceService.getMemberGroupByAdmissionNumber(admissionNUmber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memberGroupDetailsModel = this.responseModel.data[0];
          this.memberGroupDetailsModel.fdCummCommunicationDto = this.responseModel.data[0].groupCommunicationList;

          this.memberTypeName = this.responseModel.data[0].memberTypeName;
          if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
            this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
          }
          if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
            this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined) {
            this.groupPrmotersList = this.memberGroupDetailsModel.groupPromoterList;
            
          }
       
          if (this.memberGroupDetailsModel.isKycApproved != null && this.memberGroupDetailsModel.isKycApproved != undefined) {
            this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
          }
          else {
            this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
          }
          this.admissionNumber = this.memberGroupDetailsModel.admissionNumber;
          this.fdCumulativeApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
          this.fdCumulativeApplicationModel.memberShipGroupDetailsDTO = this.memberGroupDetailsModel;
        }
        
      }
      else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

 

  //get member institution details from member module by admissionNumber
  getInstitutionDetailsByAdmissionNumber(admissionNumber: any) {
    this.membershipServiceService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipInstitutionDetailsModel = this.responseModel.data[0];
        
          this.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
          this.fdCumulativeApplicationModel.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
          this.fdCumulativeApplicationModel.memInstitutionDTO = this.membershipInstitutionDetailsModel;
      
          if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
              this.membershipInstitutionDetailsModel.registrationDate = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
          }
          if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
              this.membershipInstitutionDetailsModel.admissionDate = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          if (this.membershipInstitutionDetailsModel.institutionPromoterList.length && this.membershipInstitutionDetailsModel.institutionPromoterList != null && this.membershipInstitutionDetailsModel.institutionPromoterList != undefined) {
            this.institutionPrmotersList = this.membershipInstitutionDetailsModel.institutionPromoterList;
            
          }
          if (this.membershipInstitutionDetailsModel.isKycApproved != null && this.membershipInstitutionDetailsModel.isKycApproved != undefined) {
            this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
          }
          else {
            this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
          }
          this.admissionNumber = this.membershipInstitutionDetailsModel.admissionNumber;
        }
      }
      else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  // add or update fd non cumulative account with member/group/institution details
  addAOrUpdateFdCummApplicationWithMemberModuleDetails(activeIndex: any, buttonName: any) {
    if (this.showForm)
      this. fdCumulativeApplicationModel.isNewMember = applicationConstants.TRUE;
    else
      this. fdCumulativeApplicationModel.isNewMember = applicationConstants.FALSE;
    this. fdCumulativeApplicationModel.pacsId = 1;
    this. fdCumulativeApplicationModel.pacsCode = 12345;
    this. fdCumulativeApplicationModel.branchId = 1;

    if (this. fdCumulativeApplicationModel.id != null) {
      this.isApplicationEdit = true;
    }
    else {
      this.isApplicationEdit = false;
    }
    if(this. fdCumulativeApplicationModel.memberShipBasicDetailsDTO != null && this. fdCumulativeApplicationModel.memberShipBasicDetailsDTO)
      this.membershipBasicRequiredDetailsModel = this. fdCumulativeApplicationModel.memberShipBasicDetailsDTO;
    else if(this. fdCumulativeApplicationModel.memberShipGroupDetailsDTO != null && this. fdCumulativeApplicationModel.memberShipGroupDetailsDTO)
      this.memberGroupDetailsModel = this. fdCumulativeApplicationModel.memberShipGroupDetailsDTO;
    else if(this. fdCumulativeApplicationModel.memInstitutionDTO != null && this. fdCumulativeApplicationModel.memInstitutionDTO)
      this.membershipInstitutionDetailsModel = this. fdCumulativeApplicationModel.memInstitutionDTO;
      // member dates convert
      if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined) {
        this.membershipBasicRequiredDetailsModel.dob = this.commonFunctionsService.getUTCEpoch(new Date(this.membershipBasicRequiredDetailsModel.dob));
      }
      if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined) {
        this.membershipBasicRequiredDetailsModel.admissionDate = this.commonFunctionsService.getUTCEpoch(new Date(this.membershipBasicRequiredDetailsModel.admissionDate));
      }
      // group dates convert
      if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
        this.memberGroupDetailsModel.registrationDate = this.commonFunctionsService.getUTCEpoch(new Date(this.memberGroupDetailsModel.registrationDate));
      }
      if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
        this.memberGroupDetailsModel.admissionDate = this.commonFunctionsService.getUTCEpoch(new Date(this.memberGroupDetailsModel.admissionDate));
      }
      // institution dates convert
      if (this.membershipInstitutionDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
        this.membershipInstitutionDetailsModel.registrationDate = this.commonFunctionsService.getUTCEpoch(new Date(this.membershipInstitutionDetailsModel.registrationDate));
      }
      if (this.membershipInstitutionDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
        this.membershipInstitutionDetailsModel.admissionDate = this.commonFunctionsService.getUTCEpoch(new Date(this.membershipInstitutionDetailsModel.admissionDate));
      }
    if (this.isApplicationEdit) {
      this. fdCumulativeApplicationModel.statusName = applicationConstants.IS_ACTIVE;
      this.fdCumulativeApplicationService.updateFdCummApplicationWithMemberModuleDetails(this. fdCumulativeApplicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != undefined && this.responseModel.data[0] != null) {
            if (this.responseModel.data[0].id != undefined && this.responseModel.data[0].id != null) {
              this.fdCummulativeAccId = this.responseModel.data[0].id;
              this.memberTypeName = this.responseModel.data[0].memberTypeName;
              if (this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined) {
                this.accountNumber = this.responseModel.data[0].accountNumber;
              }
              if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
                this.admissionNumber = this.responseModel.data[0].admissionNumber;
              }
            }
          }
          // if (activeIndex === 3) {
          //   activeIndex = this.accountTypeBasedActiveIndexInscrement(this.accountTypeName);
          // }
          if (activeIndex === 0) {
            this.activeIndexIncrement();
          }
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateTo(this.activeIndex, this.responseModel.data[0].id)
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);

        }
      }, (error: any) => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    } else {
      this. fdCumulativeApplicationModel.statusName = applicationConstants.IS_ACTIVE;
      this. fdCumulativeApplicationModel.statusName = "Created";
      this.fdCumulativeApplicationService.addFdCummApplicationWithMemberModuleDetails(this. fdCumulativeApplicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {

          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != undefined && this.responseModel.data[0] != null) {
            this.fdCumulativeApplicationModel.memberShipBasicDetailsDTO  = this.membershipBasicRequiredDetailsModel;

            
            this.memberTypeName = this.responseModel.data[0].memberTypeName;
            if (this.responseModel.data[0].id != undefined && this.responseModel.data[0].id != null)
              this.fdCummulativeAccId = this.responseModel.data[0].id;
            if (this.responseModel.data[0].accountTypeName != undefined && this.responseModel.data[0].accountTypeName != null)
              this.accountTypeName = this.responseModel.data[0].accountTypeName;
            if (this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined) {
              this.accountNumber = this.responseModel.data[0].accountNumber;
            }
            if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
              this.admissionNumber = this.responseModel.data[0].admissionNumber;
            }
          
            this.isNewMemberCreation = true;
          }

          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          // if (this.activeIndex == 3) {
          //   this.activeIndex = this.accountTypeBasedActiveIndexInscrement(this.accountTypeName);
          // }
          if (this.activeIndex == 0) {
            this.activeIndexIncrement();
          }

          this.navigateTo(this.activeIndex, this.responseModel.data[0].id)
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      }, (error: any) => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }
  }

  // add or update fd non cumulative Communication Details
  addOrUpdateCommunicationDetails(activeIndex: any, buttonName: any) {
    this.fdCumulativeCommunicationModel.memberId = this.fdCummulativeAccId;
    this.fdCumulativeCommunicationModel.memberTypeName = this.memberTypeName;
    this.fdCumulativeCommunicationModel.admissionNumber = this.admissionNumber;
    this.fdCumulativeCommunicationModel.fdCummulativeAccId = this.fdCummulativeAccId;
    if (this.fdCumulativeCommunicationModel.isSameAddress == true) {
      this.isPerminentAddressIsSameFalg = true;
    }
    else {
      this.isPerminentAddressIsSameFalg = true;
    }
    if (this.fdCumulativeCommunicationModel.id == null) {
      this.isCommunicationEdit = false;
    }
    else
      this.isCommunicationEdit = true;
    if (this.isCommunicationEdit) {
      this.fdCumulativeCommunicationService.updateCommunication(this.fdCumulativeCommunicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
            this.fdCummulativeAccId = this.responseModel.data[0].fdCummulativeAccId;
          }
          if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
            this.admissionNumber = this.responseModel.data[0].admissionNumber;
          }
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.fdCummulativeAccId);
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      });
    }
    else {
      this.fdCumulativeCommunicationService.addCommunication(this.fdCumulativeCommunicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
            this.fdCummulativeAccId = this.responseModel.data[0].fdCummulativeAccId;
          }
          if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
            this.admissionNumber = this.responseModel.data[0].admissionNumber;
          }
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.fdCummulativeAccId);
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      });
    }
  }

  // add or update fd non cumulative account details
  addAOrUpdateFdCummApplicationDetails(activeIndex: any, buttonName: any) {
    this. fdCumulativeApplicationModel.pacsId = 1;
    this. fdCumulativeApplicationModel.pacsCode = 12345;
    this. fdCumulativeApplicationModel.branchId = 1;

    if (this. fdCumulativeApplicationModel.id != null) {
      this.isApplicationEdit = true;
    }
    else {
      this.isApplicationEdit = false;
    }
    if (this. fdCumulativeApplicationModel.depositDate != null && this. fdCumulativeApplicationModel.depositDate != undefined) {
      this. fdCumulativeApplicationModel.depositDate = this.commonFunctionsService.getUTCEpoch(new Date(this. fdCumulativeApplicationModel.depositDate));
    }
    if (this.isApplicationEdit) {
      this. fdCumulativeApplicationModel.statusName = applicationConstants.IS_ACTIVE;
      this.fdCumulativeApplicationService.updateFdCummApplication(this. fdCumulativeApplicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != undefined && this.responseModel.data[0] != null && this.responseModel.data.length > 0) {
            this. fdCumulativeApplicationModel = this.responseModel.data[0];
            if (this. fdCumulativeApplicationModel.id != undefined && this. fdCumulativeApplicationModel.id != null)
              this.fdCummulativeAccId = this. fdCumulativeApplicationModel.id;
            if (this. fdCumulativeApplicationModel.accountTypeName != null && this. fdCumulativeApplicationModel.accountTypeName != undefined)
              this.accountTypeName = this. fdCumulativeApplicationModel.accountTypeName;
            if (this. fdCumulativeApplicationModel.memberTypeName != null && this. fdCumulativeApplicationModel.memberTypeName != undefined)
              this.memberTypeName = this. fdCumulativeApplicationModel.memberTypeName;
            if (this.responseModel.data[0].accountNumber != null && this. fdCumulativeApplicationModel.accountNumber != undefined)
              this.accountNumber = this. fdCumulativeApplicationModel.accountNumber;
            if (this. fdCumulativeApplicationModel.admissionNumber != null && this. fdCumulativeApplicationModel.admissionNumber != undefined)
              this.admissionNumber = this. fdCumulativeApplicationModel.admissionNumber;
          }
          this.previousStepFlag = true;
          this.memberDropDownDisable = true;

          if (activeIndex === 3) {
            activeIndex = this.accountTypeBasedActiveIndexInscrement(this.accountTypeName);
          }
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateTo(this.activeIndex, this.fdCummulativeAccId)
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      }, (error: any) => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    } else {
      this. fdCumulativeApplicationModel.statusName = applicationConstants.IS_ACTIVE;
      this. fdCumulativeApplicationModel.statusName = "Created";
      this.fdCumulativeApplicationService.addFdCummApplication(this. fdCumulativeApplicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != undefined && this.responseModel.data[0] != null && this.responseModel.data.length > 0) {
            this. fdCumulativeApplicationModel = this.responseModel.data[0];
            if (this. fdCumulativeApplicationModel.id != undefined && this. fdCumulativeApplicationModel.id != null)
              this.fdCummulativeAccId = this. fdCumulativeApplicationModel.id;
            if (this. fdCumulativeApplicationModel.accountTypeName != null && this. fdCumulativeApplicationModel.accountTypeName != undefined)
              this.accountTypeName = this. fdCumulativeApplicationModel.accountTypeName;
            if (this. fdCumulativeApplicationModel.memberTypeName != null && this. fdCumulativeApplicationModel.memberTypeName != undefined)
              this.memberTypeName = this. fdCumulativeApplicationModel.memberTypeName;
            if (this.responseModel.data[0].accountNumber != null && this. fdCumulativeApplicationModel.accountNumber != undefined)
              this.accountNumber = this. fdCumulativeApplicationModel.accountNumber;
            if (this. fdCumulativeApplicationModel.admissionNumber != null && this. fdCumulativeApplicationModel.admissionNumber != undefined)
              this.admissionNumber = this. fdCumulativeApplicationModel.admissionNumber;

            this.isNewMemberCreation = true;
            this.memberDropDownDisable = true;
          }
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          if (this.activeIndex == 3) {
            this.activeIndex = this.accountTypeBasedActiveIndexInscrement(this.accountTypeName);
          }
          this.navigateTo(this.activeIndex, this.fdCummulativeAccId)
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      }, (error: any) => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }
  }
addAOrUpdateFdCummJointHolderDetails() {
  this. fdCumulativeJointHolderModel.fdCummulativeAccId = this.fdCummulativeAccId;
  this.fdCumulativeCommunicationModel.memberTypeName = this.memberTypeName;
  this.fdCumulativeCommunicationModel.admissionNumber = this.admissionNumber;
  this.fdCumulativeJointHolderService.saveFdCummJiontHolderDetails(this.jointHolderList).subscribe((response: any) => {
    this.responseModel = response;
    if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
      if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
        this.fdCummulativeAccId = this.responseModel.data[0].fdCummulativeAccId;
      }
      this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 1200);
      this.activeIndex = this.activeIndex + 1;
      this.navigateTo(this.activeIndex, this.fdCummulativeAccId);
      console.log("Navigation executed, activeIndex: ", this.activeIndex);
      this.completed = 1;
    } else {
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    }
  }, error => {
    this.msgs = [];
    this.commonComponent.stopSpinner();
    this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
    setTimeout(() => {
      this.msgs = [];
    }, 2000);
  });
}
  // add or update fd non cumulative Nominee Details
  addOrUpdateNomineeDetails() {
    this. fdCumulativeNomineeModel.fdCummulativeAccId = this.fdCummulativeAccId;
    this. fdCumulativeNomineeModel.accountNumber = this.accountNumber;
    this. fdCumulativeNomineeModel.isNewMember = this.showForm;
    if (this. fdCumulativeNomineeModel.id == null) {
      this.isNomineeEdit = false;
    }
    else {
      this.isNomineeEdit = true;
    }
    if (this.isNomineeEdit) {
      this.fdCumulativeNomineeService.updateNomineeDetails(this. fdCumulativeNomineeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateToPreview();
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      }, (error: any) => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }
    else {
      this.fdCumulativeNomineeService.addNomineeDetails(this. fdCumulativeNomineeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateToPreview();
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      }, (error: any) => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }
  }

  addOrUpdateGurdianetails() {
    this.memberGuardianDetailsModelDetails.fdCummulativeAccId = this.fdCummulativeAccId;
    this.memberGuardianDetailsModelDetails.accountNumber = this.accountNumber;
    this.memberGuardianDetailsModelDetails.isNewMember = this.showForm;
    if (this.memberGuardianDetailsModelDetails.id == null) {
      this.isNomineeEdit = false;
    }
    else {
      this.isNomineeEdit = true;
    }
    if (this.isNomineeEdit) {
      this.fdCumulativeNomineeService.updateGuardainDetails(this.memberGuardianDetailsModelDetails).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateToPreview();
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      }, (error: any) => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }
    else {
      this.fdCumulativeNomineeService.addGuardinaDetails(this.memberGuardianDetailsModelDetails).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateToPreview();
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      }, (error: any) => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }
  }

  activeIndexIncrement() {
    if (!this.showForm) {
      this.activeIndex = this.activeIndex + 2
    }
    else {
      this.activeIndex = this.activeIndex + 1
    }
    return this.activeIndex;
  }

  accountTypeBasedActiveIndexInscrement(accountType: any) {
    if (accountType == "Joint") {
      this.activeIndex = this.activeIndex + 1
    }
    else {
      this.activeIndex = this.activeIndex + 2;
    }
    return this.activeIndex;
  }
  onClickMemberIndividualMoreDetails() {
    this.membreIndividualFlag = true;
  }

  onClickOfGroupMoreDetails() {
    this.groupPromotersPopUpFlag = true;
  }

  onClickInstitutionMoreDetails() {
    this.institutionPromoterFlag = true;
  }

  onClickMemberPhotoCopy() {
    this.memberPhotoCopyZoom = true;
  }
  close() {
    this.institutionPromoterFlag = false;
    this.groupPromotersPopUpFlag = false;
    this.memberSignatureCopyZoom = false;
    this.memberPhotoCopyZoom = false;
  }
}
