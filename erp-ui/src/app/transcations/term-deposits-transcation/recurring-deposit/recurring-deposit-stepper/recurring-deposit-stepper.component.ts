import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { termdeposittransactionconstant } from '../../term-deposit-transaction-constant';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { RdAccountsService } from '../../shared/rd-accounts.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MemberGroupDetailsModel, MembershipBasicDetail, MembershipInstitutionDetailsModel, RdAccountNominee, RdKycModel } from '../../shared/membership-basic-detail.model';
import { DatePipe } from '@angular/common';
import { RdAccountCommunication, RdAccountGuardian, RdAccountsModel, RdJointHolder, RdRequiredDocuments } from '../../shared/term-depost-model.model';
import { RdAccountCommunicationService } from '../../shared/rd-account-communication.service';
import { RdAccountNomineeService } from '../../shared/rd-account-nominee.service';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { RdAccountGuardianService } from '../../shared/rd-account-guardian.service';

@Component({
  selector: 'app-recurring-deposit-stepper',
  templateUrl: './recurring-deposit-stepper.component.html',
  styleUrls: ['./recurring-deposit-stepper.component.css']
})
export class RecurringDepositStepperComponent implements OnInit {

  items: MenuItem[] = [];
  activeIndex: number = 0;
  buttonDisabled: boolean = false;
  rdAccId: any;
  activeItem: any;
  societyId: any;
  branchId: any;
  isEdit: boolean = false;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  completed: any;
  flagForLabelName: boolean = false;

  admissionNumber: any;
  previouseButtonDisable: boolean = false;
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
  accountType: any;
  flag: Boolean = false;
  isApplicationEdit: boolean = false;
  isCommunicationEdit: boolean = false;
  isJointEdit: boolean = false;
  isKycEdit: boolean = false;
  isNomineeEdit: boolean = false;
  isDocumentEdit: boolean = false;
  flagForNomineeTypeValue: any;
  isPerminentAddressIsSameFalg: boolean = false;
  accountNumber: any;
  memberTypeName: any;
  menuDisabled: boolean = true;
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
  membershipBasicRequiredDetailsModel: MembershipBasicDetail = new MembershipBasicDetail();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  rdAccountCommunicationModel: RdAccountCommunication = new RdAccountCommunication();
  rdAccountsModel: RdAccountsModel = new RdAccountsModel();
  rdKycModel: RdKycModel = new RdKycModel();
  rdAccountNomineeModel: RdAccountNominee = new RdAccountNominee();
  rdJointHolderModel: RdJointHolder = new RdJointHolder();
  rdAccountGuardianModel: RdAccountGuardian = new RdAccountGuardian();
  requiredDocumentDetails: RdRequiredDocuments = new RdRequiredDocuments();
  rdJointHolderList: any[] = [];
  memberTypeId: any;
  admissionNumberDropDownDisable: boolean = false;
  previousStepFlag: boolean = false;
  membreIndividualFlag: boolean = false;
  memberPhotoCopyZoom: boolean = false;
  institutionPromoterFlag: boolean = false;
  groupPromotersPopUpFlag: boolean = false;
  groupPrmotersList: any[] = [];
  groupPrmoters: any[] = [];
  institionPromotersList: any[] = [];
  columns: any[] = [];
  photoCopyFlag: boolean = false;
  memberSignatureCopyZoom: boolean = false;
  memberDetails: any;
  isKycApproved: any;
  jointAccountHolderList: any[] = [];
  memberTypeList: any[] = [];
  constructor(private router: Router,
    private rdAccountsService: RdAccountsService,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService,
    private rdAccountCommunicationService: RdAccountCommunicationService,
    private rdAccountNomineeService: RdAccountNomineeService,
    private commonFunctionsService: CommonFunctionsService,
    private translate: TranslateService,
    private rdAccountGuardianService: RdAccountGuardianService,
    private datePipe: DatePipe,
    // private fdCumulativeJointHolderService: FdCumulativeJointHolderService,
    private fileUploadService: FileUploadService) {
    this.columns = [
      { field: 'surname', header: 'SURNAME' },
      { field: 'name', header: 'NAME' },
      { field: 'operatorTypeName', header: 'TRANSACTION_DATE' },
      { field: 'memDobVal', header: 'Date Of Birth' },
      { field: 'age', header: 'age' },
      { field: 'genderName', header: 'gender Name' },
      { field: 'maritalStatusName', header: 'marital status' },
      { field: 'mobileNumber', header: 'mobile Number' },
      { field: 'emailId', header: 'email' },
      { field: 'aadharNumber', header: 'aadhar' },
      { field: 'startDate', header: 'start date' },
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
      { field: 'startDate', header: 'start date' },
    ];
  }

  ngOnInit() {
    this.pacsId = this.commonFunctionsService.getStorageValue(applicationConstants.PACS_ID);
    this.branchId = this.commonFunctionsService.getStorageValue(applicationConstants.BRANCH_ID);
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();

    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);


    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined || params['admissionNo'] != undefined || params['falg'] != undefined || params['showForm'] != undefined) {
        if (params['id'] != undefined) {
          let queryParams = Number(this.encryptDecryptService.decrypt(params['id']));
          let qParams = queryParams;
          this.rdAccId = qParams;
          this.menuDisabled = false;
          this.getRdAccountById(this.rdAccId);
        }
        if (params['falg'] != undefined || params['showForm'] != undefined) {
          this.refreshTheMemberCardData();
        }

        if (params['admissionNo'] != undefined) {
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
    if (this.memberDetails != null && this.memberDetails != undefined) {
      this.membershipBasicRequiredDetailsModel = this.memberDetails
    }
    this.itemList();
    if (!this.showForm) {
      this.getAllTypeOfMembershipDetails(this.pacsId, this.branchId);
    }
    this.appendCurrentStepperData();
  }

  refreshTheMemberCardData() {
    this.rdAccountsService.resetCurrentStep();
    this.membershipBasicRequiredDetailsModel = new MembershipBasicDetail();
    this.memberGroupDetailsModel = new MemberGroupDetailsModel();
    this.membershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
    this.admissionNumber = null;
  }


  appendCurrentStepperData() {
    this.itemList();
    this.rdAccountsService.currentStep.subscribe((data: any) => {
      if (data) {
        this.translate.use(this.commonFunctionsService.getStorageValue('language'));
      } else {
        this.translate.use(this.commonFunctionsService.getStorageValue('language'));
      }

      if (data != undefined) {
        this.activeIndex = data.stepperIndex;
        this.previouseButtonDisable = false;
        this.changeStepperSelector(this.activeIndex);
        this.buttonDisabled = data.isDisable;
        if (data.data != null && data.data != undefined) {
          if (this.activeIndex == 0) {
            this.rdAccountsModel = data.data;
            if (this.rdAccountsModel != null && this.rdAccountsModel != undefined) {
              if (this.rdAccountsModel.isNewMember != null && this.rdAccountsModel.isNewMember != undefined)
                this.showForm = this.rdAccountsModel.isNewMember;
              if (this.rdAccountsModel.adminssionNumber != null && this.rdAccountsModel.adminssionNumber != undefined)
                this.admissionNumber = this.rdAccountsModel.adminssionNumber;
              if (this.rdAccountsModel.memberTypeName != null && this.rdAccountsModel.memberTypeName != undefined)
                this.memberTypeName = this.rdAccountsModel.memberTypeName;
              this.memberTypeCheck(this.memberTypeName, this.rdAccountsModel);
            }
            this.itemList();
          }
          else if (this.activeIndex == 1) {
            this.previouseButtonDisable = data.isDisable;
            if (data.data != null && data.data != undefined) {
              this.rdKycModel = data.data;
            }
            this.itemList();
          }
          else if (this.activeIndex == 2) {
            if (data.data != null && data.data != undefined) {
              this.rdAccountCommunicationModel = data.data;
            }
            this.itemList();
          }
          else if (this.activeIndex == 3) {
            if (data.data != null && data.data != undefined) {
              this.rdAccountsModel = data.data;
            }
            this.itemList();
          }

          else if (this.activeIndex == 4) {
            if (data.data != null && data.data != undefined) {
              if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
                this.rdAccountsModel.adminssionNumber = data.data.admissionNumber;
              }
              if (data.data.rdAccId != null && data.data.rdAccId != undefined) {
                this.rdAccId = data.data.rdAccId;
              }
              if (data.data.jointHolderList != null && data.data.jointHolderList != undefined && data.data.jointHolderList.length > 0) {
                this.jointAccountHolderList = data.data.jointHolderList;
              }
              this.rdJointHolderModel = data.data;
            }
            this.itemList();
          }
          else if (this.activeIndex == 5) {
            if (data.data != null && data.data != undefined) {
              this.rdAccountNomineeModel = data.data;
              if (this.rdAccountNomineeModel != null && this.rdAccountNomineeModel != undefined) {
                if (this.rdAccountNomineeModel.RdAccountGuardian != null && this.rdAccountNomineeModel.RdAccountGuardian != undefined) {
                  this.rdAccountGuardianModel = this.rdAccountNomineeModel.RdAccountGuardian;
                }
              }
            }
            this.itemList();
          } else if (this.activeIndex == 6) {
            if (data.data != null && data.data != undefined) {
              this.requiredDocumentDetails = data.data;
            }
            // if (data.data != null && data.data != undefined) {
            // if(data.data.memberTypeName != null && data.data.memberTypeName != undefined){
            //   this.memberTypeName = data.data.memberTypeName;
            // }

            // if (data.data.rdAccId != null && data.data.rdAccId != undefined) {
            //   this.rdAccId = data.data.rdAccId;
            // }
            // if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
            //   this.admissionNumber = data.data.admissionNumber;
            // }
            // this.requiredDocumentDetails = data.data;
            // }
            this.itemList();
          }
        }
      }
    });
  }




  itemList() {
    if (this.showForm) {
      if (this.rdAccountsModel.accountTypeName != "Joint") {
        this.items = [
          {
            label: 'Member Details', icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_NEW_MEMBER,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_KYC,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 1;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_COMMUNICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application', icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_PRODUCT,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_NOMINEE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          },
          {
            label: 'Required Documents', icon: 'fa fa-file-text', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_REQUIRED_DOCUMENTS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 6;
            }
          }
        ];
      }
      else {
        this.items = [
          {
            label: 'Member Details', icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_NEW_MEMBER,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_KYC,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 1;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_COMMUNICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application', icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_PRODUCT,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Joint Account', icon: 'fa fa-handshake-o', routerLink: termdeposittransactionconstant.TERMDEPOST_FD_CUMULATIVE_JOINTHOLDERDETAILS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 4;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_NOMINEE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          },
          {
            label: 'Required Documents', icon: 'fa fa-file-text', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_REQUIRED_DOCUMENTS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 6;
            }
          }
        ];
      }
    }
    else {
      if (this.rdAccountsModel.accountTypeName != "Joint") {
        this.items = [
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_MEMBERSHIP_DETAILS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_COMMUNICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application', icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_PRODUCT,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_NOMINEE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          },
          {
            label: 'Required Documents', icon: 'fa fa-file-text', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_REQUIRED_DOCUMENTS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 6;
            }
          }
        ];
      }
      else {
        this.items = [
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_MEMBERSHIP_DETAILS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_COMMUNICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application', icon: 'fa fa-id-badge', routerLink: termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_PRODUCT,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Joint Account', icon: 'fa fa-handshake-o', routerLink: termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_JOINTHOLDERDETAILS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 4;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_NOMINEE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          },
          {
            label: 'Required Documents', icon: 'fa fa-file-text', routerLink: termdeposittransactionconstant.RECURRING_DEPOSIT_REQUIRED_DOCUMENTS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 6;
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
    }
    else if (memberType == "Group") {
      this.groupFlag = true;
      this.institutionFlag = false;
      this.individualFlag = false;
      this.memberGroupDetailsModel = data.memberShipGroupDetailsDTO;
    }
    else if (memberType == "Institution") {
      this.institutionFlag = true;
      this.individualFlag = false;
      this.groupFlag = false;
      this.membershipInstitutionDetailsModel = data.memInstitutionDTO;
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
    else if (activeIndex == 6) {
      this.isDocumentEdit = true
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
    this.rdAccountsService.getAllMembershipDetailsFromMembership(this.pacsId, this.branchId).subscribe((response: any) => {
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

  navigateTo(activeIndex: number, rdAccId: any) {
    this.itemList();
    switch (activeIndex) {
      case 0:
        if (!this.showForm) {
          this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_MEMBERSHIP_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
        }
        else {
          this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_NEW_MEMBER], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
        }
        break;
      case 1:
        this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_KYC], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
        break;
      case 2:
        this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_COMMUNICATION], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
        break;
      case 3:
        this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_PRODUCT], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
        break;
      case 4:
        this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_JOINTHOLDERDETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
        break;
      case 5:
        this.router.navigate([termdeposittransactionconstant.TERMDEPOSIT_RECURRING_DEPOSIT_NOMINEE], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
        break;
      case 6:
        this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_REQUIRED_DOCUMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId) } });
        break;
    }
  }

  prevStep(activeIndex: number) {
    this.activeIndex = activeIndex - 1;
    if (activeIndex == 0) {
      this.navigateTo(this.activeIndex, this.rdAccId);
    }
    else if (activeIndex == 1) {
      this.navigateTo(this.activeIndex, this.rdAccId);
    }
    else if (activeIndex == 2) {
      if (!this.showForm) {
        this.activeIndex = this.activeIndex - 1;
      }
      this.navigateTo(this.activeIndex, this.rdAccId);
    }
    else if (activeIndex == 3) {
      this.navigateTo(this.activeIndex, this.rdAccId);
    }
    else if (activeIndex == 4) {
      this.navigateTo(this.activeIndex, this.rdAccId);
    }
    else if (activeIndex == 5) {
      if (this.rdAccountsModel.accountTypeName != "Joint") {
        this.flag = false;
        this.activeIndex = this.activeIndex - 1;
      }
      this.navigateTo(this.activeIndex, this.rdAccId);
    }
    else if (activeIndex == 6) {
      this.navigateTo(this.activeIndex, this.rdAccId);
    }
  }
  nextStep(activeIndex: number) {
    if (activeIndex == 0) {
      if (this.memberTypeName == "Individual") {
        this.setMemberDetailsTofdApplicationDetails(this.rdAccountsModel.memberShipBasicDetailsDTO);
      } else if (this.memberTypeName == "Group") {
        this.setMemberDetailsTofdApplicationDetails(this.rdAccountsModel.memberShipGroupDetailsDTO);
      } else if (this.memberTypeName == "Institution") {
        this.setMemberDetailsTofdApplicationDetails(this.rdAccountsModel.memInstitutionDTO);
      }
      this.addAOrUpdateRdApplicationWithMemberModuleDetails(activeIndex, "next");
    }
    else if (activeIndex == 2) {
      this.addOrUpdateCommunicationDetails(activeIndex, "next");
    } else if (activeIndex == 3) {
      if (!this.isNomineeEdit) {
        this.flagForNomineeTypeValue = 0;
      } else {
        this.flagForNomineeTypeValue = this.rdAccountNomineeModel.flagForNomineeTypeValue;
      }
      this.addAOrUpdateRdApplicationDetails(activeIndex, "next");
    } else if (activeIndex == 4) {
      this.saveOrUpdateJointHolder();
    } else if (activeIndex == 5) {
      // this.activeIndex = activeIndex + 1;
      // this.navigateTo(this.activeIndex, this.rdAccId);
      this.addOrUpdateNomineeDetails();
      if (this.rdAccountGuardianModel != null && this.rdAccountGuardianModel != undefined) {
        this.addOrUpdateGurdianetails();
      }
    } else {
      this.activeIndex = activeIndex + 1;
      this.navigateTo(this.activeIndex, this.rdAccId);
    }
  }

  setMemberDetailsTofdApplicationDetails(memeberdetailsObj: any) {
    this.rdAccountsModel.memberType = memeberdetailsObj.memberTypeId;
    // this.rdAccountsModel.memberTypeName = memeberdetailsObj.memberTypeName;
    // this.rdAccountsModel.name = memeberdetailsObj.name;
    // // this.rdAccountsModel.surName = memeberdetailsObj.surName;
    // this.rdAccountsModel.email = memeberdetailsObj.emailId;
    // this.rdAccountsModel.mobileNumber = memeberdetailsObj.mobileNumber;
  }
  back() {
    this.router.navigate([termdeposittransactionconstant.RECCURING_DEPOSITS]);
  }

  cancel() {
    this.router.navigate([termdeposittransactionconstant.RECCURING_DEPOSITS]);
  }

  navigateToPreview() {
    this.buttonDisabled = true;
    this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_PREVIEW], { queryParams: { id: this.encryptDecryptService.encrypt(this.rdAccId), editbutton: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE), isGridPage: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE) } });
  }


  onChange() {

    this.commonFunctionsService.setStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION, this.showForm);
    if (this.showForm) {
      this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_NEW_MEMBER], { queryParams: { showForm: this.encryptDecryptService.encrypt(this.showForm) } });
    }
    else {
      this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_MEMBERSHIP_DETAILS], { queryParams: { showForm: this.encryptDecryptService.encrypt(this.showForm) } });
    }
  }

  getRdAccountById(id: any) {
    this.rdAccountsService.getRdAccounts(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {

        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {

          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.rdAccountsModel = this.responseModel.data[0];
            this.accountNumber = this.responseModel.data[0].accountNumber;
            this.memberDropDownDisable = true;
            this.isNewMemberCreation = true;
            this.admissionNumber = this.rdAccountsModel.adminssionNumber;

            if (this.rdAccountsModel.memberShipBasicDetailsDTO != null && this.rdAccountsModel.memberShipBasicDetailsDTO != undefined) {
              this.membershipBasicRequiredDetailsModel = this.rdAccountsModel.memberShipBasicDetailsDTO;

              if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined) {
                this.membershipBasicRequiredDetailsModel.dob = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined) {
                this.membershipBasicRequiredDetailsModel.admissionDate = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicRequiredDetailsModel.photoCopyPath != null && this.membershipBasicRequiredDetailsModel.photoCopyPath != undefined) {
                this.membershipBasicRequiredDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.photoCopyPath, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.photoCopyPath);
                this.photoCopyFlag = true;
              }
              if (this.membershipBasicRequiredDetailsModel.signatureCopyPath != null && this.membershipBasicRequiredDetailsModel.signatureCopyPath != undefined) {
                this.membershipBasicRequiredDetailsModel.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.signatureCopyPath, ERP_TRANSACTION_CONSTANTS.TERMDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.signatureCopyPath);
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
            if (this.rdAccountsModel.memberShipGroupDetailsDTO != null && this.rdAccountsModel.memberShipGroupDetailsDTO != undefined) {
              this.groupFlag = true;
              this.institutionFlag = false;
              this.individualFlag = false;
              this.memberGroupDetailsModel = this.rdAccountsModel.memberShipGroupDetailsDTO;
              this.showForm = this.memberGroupDetailsModel.isNewMember;

              if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
                this.memberGroupDetailsModel.registrationDate = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
              }
              if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
                this.memberGroupDetailsModel.admissionDate = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.memberGroupDetailsModel.isKycApproved != null && this.memberGroupDetailsModel.isKycApproved != undefined) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
            }
            if (this.rdAccountsModel.memInstitutionDTO != null && this.rdAccountsModel.memInstitutionDTO != undefined) {
              this.institutionFlag = true;
              this.individualFlag = false;
              this.groupFlag = false;
              this.membershipInstitutionDetailsModel = this.rdAccountsModel.memInstitutionDTO;
              this.showForm = this.membershipBasicRequiredDetailsModel.isNewMember;
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
    let label = parts[parts.length - 1].trim();
    this.membershipBasicRequiredDetailsModel.memberTypeName = label;
    const admissionNumber = filteredItem.label.split(' - ');
    let admissionNumberLable = parts[parts.length - 2].trim();
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
    } else if (this.membershipBasicRequiredDetailsModel.memberTypeName == "Institution") {
      this.institutionFlag = true;
      this.individualFlag = false;
      this.groupFlag = false;
      this.getInstitutionDetailsByAdmissionNumber(admissionNo);
    }
    this.router.navigate([termdeposittransactionconstant.RECURRING_DEPOSIT_MEMBERSHIP_DETAILS], { queryParams: { admissionNo: this.encryptDecryptService.encrypt(admissionNo) } });

  }
  //get member module data by admissionNUmber

  getMemberDetailsByAdmissionNUmber(admissionNumber: any) {
    this.rdAccountsService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipBasicRequiredDetailsModel = this.responseModel.data[0];
          this.membershipBasicRequiredDetailsModel.rdAccountCommunicationDTO = this.responseModel.data[0].memberShipCommunicationDetailsDTOList;

          if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined) {
            this.membershipBasicRequiredDetailsModel.dob = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined) {
            this.membershipBasicRequiredDetailsModel.admissionDate = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicRequiredDetailsModel.rdAccountCommunicationDTO[0] != null && this.membershipBasicRequiredDetailsModel.rdAccountCommunicationDTO[0] != undefined) {
            this.rdAccountCommunicationModel = this.membershipBasicRequiredDetailsModel.rdAccountCommunicationDTO[0];
          }
          if (this.membershipBasicRequiredDetailsModel.photoCopyPath != null && this.membershipBasicRequiredDetailsModel.photoCopyPath != undefined) {
            this.membershipBasicRequiredDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.photoCopyPath, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.photoCopyPath);
            this.photoCopyFlag = true;
          }
          if (this.membershipBasicRequiredDetailsModel.signatureCopyPath != null && this.membershipBasicRequiredDetailsModel.signatureCopyPath != undefined) {
            this.membershipBasicRequiredDetailsModel.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.signatureCopyPath, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.signatureCopyPath);
          }
          if (this.membershipBasicRequiredDetailsModel.isKycApproved != null && this.membershipBasicRequiredDetailsModel.isKycApproved != undefined && this.membershipBasicRequiredDetailsModel.isKycApproved) {
            this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
          }
          else {
            this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
          }
          this.admissionNumber = this.membershipBasicRequiredDetailsModel.admissionNumber;
          this.rdAccountsModel.memberTypeName = this.membershipBasicRequiredDetailsModel.memberTypeName;
          this.rdAccountsModel.memberShipBasicDetailsDTO = this.membershipBasicRequiredDetailsModel;
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
    this.rdAccountsService.getMemberGroupByAdmissionNumber(admissionNUmber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memberGroupDetailsModel = this.responseModel.data[0];

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
          this.rdAccountsModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
          this.rdAccountsModel.memberShipGroupDetailsDTO = this.memberGroupDetailsModel;
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
    this.rdAccountsService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipInstitutionDetailsModel = this.responseModel.data[0];
          this.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
          this.rdAccountsModel.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;

          if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
            this.membershipInstitutionDetailsModel.registrationDate = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
          }
          if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
            this.membershipInstitutionDetailsModel.admissionDate = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          if (this.membershipInstitutionDetailsModel.institutionPromoterList.length && this.membershipInstitutionDetailsModel.institutionPromoterList != null && this.membershipInstitutionDetailsModel.institutionPromoterList != undefined) {
            this.institionPromotersList = this.membershipInstitutionDetailsModel.institutionPromoterList;
            
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
  addAOrUpdateRdApplicationWithMemberModuleDetails(activeIndex: any, buttonName: any) {
    if (this.showForm)
      this.rdAccountsModel.isNewMember = applicationConstants.TRUE;
    else
      this.rdAccountsModel.isNewMember = applicationConstants.FALSE;
    this.rdAccountsModel.pacsId = 1;
    this.rdAccountsModel.pacsCode = 12345;
    this.rdAccountsModel.branchId = 1;
    if (this.rdAccountsModel.id != null) {
      this.isApplicationEdit = true;
    }
    else {
      this.isApplicationEdit = false;
    }
    if (this.rdAccountsModel.memberShipBasicDetailsDTO != null && this.rdAccountsModel.memberShipBasicDetailsDTO)
      this.membershipBasicRequiredDetailsModel = this.rdAccountsModel.memberShipBasicDetailsDTO;
    else if (this.rdAccountsModel.memberShipGroupDetailsDTO != null && this.rdAccountsModel.memberShipGroupDetailsDTO)
      this.memberGroupDetailsModel = this.rdAccountsModel.memberShipGroupDetailsDTO;
    else if (this.rdAccountsModel.memInstitutionDTO != null && this.rdAccountsModel.memInstitutionDTO)
      this.membershipInstitutionDetailsModel = this.rdAccountsModel.memInstitutionDTO;
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
      this.rdAccountsModel.statusName = applicationConstants.IS_ACTIVE;
      this.rdAccountsService.updateRdApplicationWithMemberModuleDetails(this.rdAccountsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != undefined && this.responseModel.data[0] != null) {
            if (this.responseModel.data[0].id != undefined && this.responseModel.data[0].id != null) {
              this.rdAccId = this.responseModel.data[0].id;
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
      this.rdAccountsModel.statusName = applicationConstants.IS_ACTIVE;
      this.rdAccountsModel.statusName = "Created";
      this.rdAccountsService.addRdApplicationWithMemberModuleDetails(this.rdAccountsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {

          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != undefined && this.responseModel.data[0] != null) {
            this.rdAccountsModel.memberShipBasicDetailsDTO = this.membershipBasicRequiredDetailsModel;


            this.memberTypeName = this.responseModel.data[0].memberTypeName;
            if (this.responseModel.data[0].id != undefined && this.responseModel.data[0].id != null)
              this.rdAccId = this.responseModel.data[0].id;
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
    this.rdAccountCommunicationModel.memberType = this.rdAccId;
    this.rdAccountCommunicationModel.admissionNumber = this.admissionNumber;
    this.rdAccountCommunicationModel.rdAccId = this.rdAccId;
    if (this.rdAccountCommunicationModel.isSameAddress == true) {
      this.isPerminentAddressIsSameFalg = true;
    }
    else {
      this.isPerminentAddressIsSameFalg = true;
    }
    if (this.rdAccountCommunicationModel.id == null) {
      this.isCommunicationEdit = false;
    }
    else
      this.isCommunicationEdit = true;
    if (this.isCommunicationEdit) {
      this.rdAccountCommunicationService.updateRdAccountCommunication(this.rdAccountCommunicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
            this.rdAccId = this.responseModel.data[0].rdAccId;
          }
          if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
            this.admissionNumber = this.responseModel.data[0].admissionNumber;
          }
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.rdAccId);
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
      this.rdAccountCommunicationService.addRdAccountCommunication(this.rdAccountCommunicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
            this.rdAccId = this.responseModel.data[0].rdAccId;
          }
          if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
            this.admissionNumber = this.responseModel.data[0].admissionNumber;
          }
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.rdAccId);
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
  addAOrUpdateRdApplicationDetails(activeIndex: any, buttonName: any) {
    this.rdAccountsModel.pacsId = 1;
    this.rdAccountsModel.pacsCode = 12345;
    this.rdAccountsModel.branchId = 1;

    if (this.rdAccountsModel.id != null) {
      this.isApplicationEdit = true;
    }
    else {
      this.isApplicationEdit = false;
    }
    if (this.rdAccountsModel.depositDate != null && this.rdAccountsModel.depositDate != undefined) {
      this.rdAccountsModel.depositDate = this.commonFunctionsService.getUTCEpoch(new Date(this.rdAccountsModel.depositDate));
    }
    if (this.isApplicationEdit) {
      this.rdAccountsModel.statusName = applicationConstants.IS_ACTIVE;
      this.rdAccountsService.updateRbAccounts(this.rdAccountsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != undefined && this.responseModel.data[0] != null && this.responseModel.data.length > 0) {
            this.rdAccountsModel = this.responseModel.data[0];
            if (this.rdAccountsModel.id != undefined && this.rdAccountsModel.id != null)
              this.rdAccId = this.rdAccountsModel.id;
            if (this.rdAccountsModel.accountTypeName != null && this.rdAccountsModel.accountTypeName != undefined)
              this.accountTypeName = this.rdAccountsModel.accountTypeName;
            if (this.rdAccountsModel.memberTypeName != null && this.rdAccountsModel.memberTypeName != undefined)
              this.memberTypeName = this.rdAccountsModel.memberTypeName;
            if (this.responseModel.data[0].accountNumber != null && this.rdAccountsModel.accountNumber != undefined)
              this.accountNumber = this.rdAccountsModel.accountNumber;
            if (this.rdAccountsModel.adminssionNumber != null && this.rdAccountsModel.adminssionNumber != undefined)
              this.admissionNumber = this.rdAccountsModel.adminssionNumber;
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
          this.navigateTo(this.activeIndex, this.rdAccId)
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
      this.rdAccountsModel.statusName = applicationConstants.IS_ACTIVE;
      this.rdAccountsModel.statusName = "Created";
      this.rdAccountsService.addRdAccounts(this.rdAccountsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != undefined && this.responseModel.data[0] != null && this.responseModel.data.length > 0) {
            this.rdAccountsModel = this.responseModel.data[0];
            if (this.rdAccountsModel.id != undefined && this.rdAccountsModel.id != null)
              this.rdAccId = this.rdAccountsModel.id;
            if (this.rdAccountsModel.accountTypeName != null && this.rdAccountsModel.accountTypeName != undefined)
              this.accountTypeName = this.rdAccountsModel.accountTypeName;
            if (this.rdAccountsModel.memberTypeName != null && this.rdAccountsModel.memberTypeName != undefined)
              this.memberTypeName = this.rdAccountsModel.memberTypeName;
            if (this.responseModel.data[0].accountNumber != null && this.rdAccountsModel.accountNumber != undefined)
              this.accountNumber = this.rdAccountsModel.accountNumber;
            if (this.rdAccountsModel.adminssionNumber != null && this.rdAccountsModel.adminssionNumber != undefined)
              this.admissionNumber = this.rdAccountsModel.adminssionNumber;

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
          this.navigateTo(this.activeIndex, this.rdAccId)
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
  // addAOrUpdateRdJointHolderDetails() {
  //   this.rdAccountsService.addJointHolders(this.jointAccountHolderList).subscribe((response: any) => {
  //     this.responseModel = response;
  //     if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
  //       if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
  //         this.rdAccId = this.responseModel.data[0].rdAccId;
  //       }
  //       this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
  //       setTimeout(() => {
  //         this.msgs = [];
  //       }, 1200);
  //       this.activeIndex = this.activeIndex + 1;
  //       this.navigateTo(this.activeIndex, this.rdAccId);
  //       this.completed = 1;
  //     } else {
  //       this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
  //       setTimeout(() => {
  //         this.msgs = [];
  //       }, 3000);
  //     }
  //   }, error => {
  //     this.msgs = [];
  //     this.commonComponent.stopSpinner();
  //     this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
  //     setTimeout(() => {
  //       this.msgs = [];
  //     }, 2000);
  //   });
  // }

  saveOrUpdateJointHolder() {
    this.rdAccountsService.addJointHolders(this.jointAccountHolderList).subscribe((response: any) => {
    this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
          this.rdAccId = this.responseModel.data[0].rdAccId;
        }
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1200);
        this.activeIndex = this.activeIndex + 1;
        this.navigateTo(this.activeIndex, this.rdAccId);
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
    this.rdAccountNomineeModel.rdAccId = this.rdAccId;
    this.rdAccountNomineeModel.accountNumber = this.accountNumber;
    // this. fdCumulativeNominee.isNewMember = this.showForm;
    if (this.rdAccountNomineeModel.id == null) {
      this.isNomineeEdit = false;
    }
    else {
      this.isNomineeEdit = true;
    }
    if (this.isNomineeEdit) {
      this.rdAccountNomineeService.updateRdAccountNominees(this.rdAccountNomineeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.rdAccId);
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
      this.rdAccountNomineeService.addRdAccountNominees(this.rdAccountNomineeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.rdAccId);
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
    this.rdAccountGuardianModel.rdAccId = this.rdAccId;
    this.rdAccountGuardianModel.accountNumber = this.accountNumber;
    // this.rdAccountGuardianModel.isNewMember = this.showForm;
    if (this.rdAccountGuardianModel.id == null) {
      this.isNomineeEdit = false;
    }
    else {
      this.isNomineeEdit = true;
    }
    if (this.isNomineeEdit) {
      this.rdAccountGuardianService.updateGuardianDetails(this.rdAccountGuardianModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateTo(this.activeIndex, this.rdAccId);
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
      this.rdAccountGuardianService.addGuardianDetails(this.rdAccountGuardianModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateTo(this.activeIndex, this.rdAccId);
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
