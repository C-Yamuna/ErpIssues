import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { savingsbanktransactionconstant } from '../savingsbank-transaction-constant';
import { SavingBankApplicationModel } from './savings-bank-application/shared/saving-bank-application-model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SavingsBankStepperService } from './shared/savings-bank-stepper.service';
import { SavingBankApplicationService } from './savings-bank-application/shared/saving-bank-application.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { MemberGroupDetailsModel, MembershipBasicRequiredDetails, MembershipInstitutionDetailsModel } from './membership-basic-required-details/shared/membership-basic-required-details';
import { SavingsBankCommunicationService } from './savings-bank-communication/shared/savings-bank-communication.service';
import { SavingsBankCommunicationModel } from './savings-bank-communication/shared/savings-bank-communication-model';
import { SavingsBankNomineeService } from './savings-bank-nominee/shared/savings-bank-nominee.service';
import { MemberGuardianDetailsModelDetaila, SavingsBankNomineeModel } from './savings-bank-nominee/shared/savings-bank-nominee-model';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe, formatDate } from '@angular/common';
import { SavingsBankKycModel } from './savings-bank-kyc/shared/savings-bank-kyc-model';
import { SavingAccountJointHolderModel } from './savings-bank-joint-account/shared/saving-account-joint-holder-model';
import { SavingsBankConfigConstants } from 'src/app/configurations/sb-config/sb-config-constants';
import { TranslateService } from '@ngx-translate/core';
import { MembershipServiceService } from './membership-basic-required-details/shared/membership-service.service';
import { SavingsBankJointAccountService } from './savings-bank-joint-account/shared/savings-bank-joint-account.service';
import { SbRequiredDocuments } from './required-documents/shared/sb-required-documents';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';


@Component({
  selector: 'app-savings-bank-account-creation-stepper',
  templateUrl: './savings-bank-account-creation-stepper.component.html',
  styleUrls: ['./savings-bank-account-creation-stepper.component.css']
})
export class SavingsBankAccountCreationStepperComponent implements OnInit {

  items: MenuItem[] = [];
  activeIndex: number = 0;
  buttonDisabled: boolean = false;
  savedId: any;
  activeItem: any;

  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  savingBankApplicationModel: SavingBankApplicationModel = new SavingBankApplicationModel();
  savingsBankCommunicationModel: SavingsBankCommunicationModel = new SavingsBankCommunicationModel();
  savingsBankNomineeModel: SavingsBankNomineeModel = new SavingsBankNomineeModel();
  memberGuardianDetailsModelDetaila: MemberGuardianDetailsModelDetaila = new MemberGuardianDetailsModelDetaila();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  savingsBankKycModel: SavingsBankKycModel = new SavingsBankKycModel();
  savingAccountJointHolderModel: SavingAccountJointHolderModel = new SavingAccountJointHolderModel();
  requiredDocumentsModel: SbRequiredDocuments = new SbRequiredDocuments();



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
  sbAccId: any;
  sbCommunicationId: any;
  accountTypeId: any;
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
  menuDisabled: boolean = true;
  checked: Boolean = false;
  showForm: Boolean = false;
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
  previousStepFlag: boolean = false;

  memberCardData : any;
  isTabMenuDisabled: boolean = true;
  jointHolderList: any[] = [];

  //memenu disable Flags
  kycMenuDisableFlag: boolean = false;
  memberTabDisable: boolean= false;
  communicationTabDisable: boolean = false;
  sbApplicationTabDisable: boolean = false;
  sbNomineeDisableTabDisable: boolean = false;
  serviceTabDisable: boolean = false;
  sbJointTabDisable: boolean = false;
  kycTabDisableFlag: boolean = false;

  admissionNumberDropDownDisable : boolean = false;
  memberDetails: any;

  institionPromotersList : any [] =[] ;
  groupPrmotersList : any [] =[];
  groupPrmoters : any = [];
  institutionPromoterFlag: boolean  = false;
  groupPromotersPopUpFlag: boolean = false;
  columns: any[] = [];

  previouseButtonDisable : boolean = false;
  memberPhotoCopyZoom: boolean = false;

  isKycApproved :any;
  photoCopyFlag: boolean = false;
  memberSignatureCopyZoom: boolean = false;
  membreIndividualFlag: boolean = false;
 

  constructor(private router: Router, private savingBankApplicationService: SavingBankApplicationService, private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, private savingsBankCommunicationService: SavingsBankCommunicationService, private savingsBankNomineeService: SavingsBankNomineeService, private commonFunctionsService: CommonFunctionsService, private ref: ChangeDetectorRef,
    private commonFunctionService: CommonFunctionsService, private translate: TranslateService, private membershipServiceService: MembershipServiceService, private datePipe: DatePipe , private savingsBankJointAccountService : SavingsBankJointAccountService,private fileUploadService : FileUploadService) {
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

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
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
          this.sbAccId = qParams;
          this.menuDisabled = false;
          this.getSbAccountDetailsById(this.sbAccId);
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
      this.membershipBasicRequiredDetails = this.memberDetails
    }
    if (!this.showForm) {
      this.getAllTypeOfMembershipDetails(this.pacsId, this.branchId);
    }
    this.appendCurrentStepperData();
  }

  /**
   * @implements getCurrentStepper Data from chaild component
   * @author jyothi.naidana
   */
  appendCurrentStepperData(){
    this.itemList();
    this.savingBankApplicationService.currentStep.subscribe((data: any) => {
      if (data) {
        this.translate.use(this.commonFunctionService.getStorageValue('language'));
      } else {
        this.translate.use(this.commonFunctionService.getStorageValue('language'));
      }
      if (data != undefined) {
        this.activeIndex = data.stepperIndex;
        this.previouseButtonDisable = false;
        this.changeStepperSelector(this.activeIndex);
        this.buttonDisabled = data.isDisable;
        if (data.data != null && data.data != undefined) {
          if (this.activeIndex == 0) {//membership 
            this.memberTypeName = data.data.memberTypeName;
            this.memberTypeCheck(this.memberTypeName, data.data);
            this.savingBankApplicationModel = data.data;
            if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
              this.admissionNumber = data.data.admissionNumber;
            }
          }
         else if (this.activeIndex == 2) {//communication
            if (data.data != null && data.data != undefined) {
              if (data.data.sbAccId != null && data.data.sbAccId != undefined) {
                this.sbAccId = data.data.sbAccId;
              }
              if (data.data.admisionNumber != null && data.data.admisionNumber != undefined) {
                this.admissionNumber = data.data.admisionNumber;
              }
              if (data.data.memberTypeName != null && data.data.memberTypeName != undefined) {
                this.memberTypeName = data.data.memberTypeName;
              }
              this.savingsBankCommunicationModel = data.data;
            }
            
          }
          else if (this.activeIndex == 1) {//kyc
            if (data.data != null && data.data != undefined) {
              this.previouseButtonDisable = data.isDisable;
              this.admissionNumber = data.data.admissionNumber;
              this.memberTypeName = data.data.memberTypeName;
              if (data.data.sbAccId != null && data.data.sbAccId != undefined) {
                this.sbAccId = data.data.sbAccId;
              }
              if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
                this.admissionNumber = data.data.admissionNumber;
              }
              this.savingsBankKycModel = data.data;
            }
          }
          else if (this.activeIndex == 3) {//application
            if (data.data != null && data.data != undefined) {
              if (data.data.accountTypeId != null && data.data.accountTypeId != undefined) {
                this.accountTypeId = data.data.accountTypeId;
              }
              if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
                this.admissionNumber = data.data.admissionNumber;
              }
              this.savingBankApplicationModel = data.data;
              this.itemList();
            }
          }
          else if (this.activeIndex == 4) {//join holder
            if (data.data != null && data.data != undefined) {
              if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
                this.savingBankApplicationModel.admissionNumber = data.data.admissionNumber;
              }
              if (data.data.sbAccId != null && data.data.sbAccId != undefined) {
                this.sbAccId = data.data.sbAccId;
              }
              if( data.data.jointHolderList != null && data.data.jointHolderList != undefined && data.data.jointHolderList.length > 0 ){
                  this.jointHolderList = data.data.jointHolderList;
              }
              this.savingAccountJointHolderModel = data.data;
            }
            this.itemList();
          }
          else if (this.activeIndex == 5) {//required documents
            if (data.data != null && data.data != undefined) {
              this.previouseButtonDisable = data.isDisable;
              if(data.data.memberTypeName != null && data.data.memberTypeName != undefined){
                this.memberTypeName = data.data.memberTypeName;
              }
             
              if (data.data.sbAccId != null && data.data.sbAccId != undefined) {
                this.sbAccId = data.data.sbAccId;
              }
              if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
                this.admissionNumber = data.data.admissionNumber;
              }
              this.requiredDocumentsModel = data.data;
            }
          }
          else if (this.activeIndex == 6) {//nominee && guardain
            if (data.data != null && data.data != undefined) {
              if (data.data.sbAccId != null && data.data.sbAccId != undefined) {
                this.sbAccId = data.data.sbAccId;
              }
              if (data.data.memberGuardianDetailsModelDetaila != null && data.data.memberGuardianDetailsModelDetaila != undefined) {
                this.memberGuardianDetailsModelDetaila = data.data.memberGuardianDetailsModelDetaila;
              }
              this.savingsBankNomineeModel = data.data;
            }
          }
          else if (this.activeIndex == 7) {//service types
            if (data.data != null && data.data != undefined) {
              if (data.data.sbAccId != null && data.data.sbAccId != undefined) {
                this.sbAccId = data.data.sbAccId;
              }
            }
          }
            
        }
        
      }
    });
  }

  /**
   * @author jyothi.naidana
   * @implements append member details to card data which are comming from newmember child component
   * @argument memberType,data(child component data)
   */
  memberTypeCheck(memberType: any, data: any) {
    if (memberType == "Individual") {
      this.individualFlag = true;
      this.groupFlag = false;
      this.institutionFlag = false;
      this.membershipBasicRequiredDetails = data.memberShipBasicDetailsDTO;
      if (this.membershipBasicRequiredDetails.dob != null && this.membershipBasicRequiredDetails.dob != undefined) {
        this.membershipBasicRequiredDetails.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetails.dob, this.orgnizationSetting.datePipe);
      }
      if (this.membershipBasicRequiredDetails.admissionDate != null && this.membershipBasicRequiredDetails.admissionDate != undefined) {
        this.membershipBasicRequiredDetails.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetails.admissionDate, this.orgnizationSetting.datePipe);
      }
    }
    else if (memberType == "Group") {
      this.groupFlag = true;
      this.institutionFlag = false;
      this.individualFlag = false;
      this.memberGroupDetailsModel = data.groupDetailsDTO;
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
      this.groupFlag = false;
      this.individualFlag = false;
      this.membershipInstitutionDetailsModel = data.institutionDTO;
      if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
        this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
      }
      if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
        this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
      }
      if (this.membershipInstitutionDetailsModel.institutionPromoterList != null && this.membershipInstitutionDetailsModel.institutionPromoterList != undefined && this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0) {
        this.institionPromotersList=this.membershipInstitutionDetailsModel.institutionPromoterList ;
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
    else if (activeIndex == 6) {
      this.isNomineeEdit = true
    }
  }

 /**
   * @author jyothi.naidana
   * @implements item list(tabs item list)
   */
  itemList() {
    this.items = [];
    if(this.sbAccId != null && this.sbAccId != undefined ){
      if (this.showForm) {
        if (this.savingBankApplicationModel.accountTypeName != "Joint") {
  
          this.items = [
            {
              label: 'Member Details', icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.NEW_MEMBERSHIP, queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId)},
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 0;
              }
            },
  
            {
              label: 'KYC', icon: 'fa fa-podcast', routerLink: savingsbanktransactionconstant.SB_KYC, queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 1;
              }
            },
            {
              label: 'Communication', icon: 'fa fa-map-marker', routerLink: savingsbanktransactionconstant.SB_COMMUNICATION, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 2;
              }
            },
            {
              label: 'Application Details', icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.SB_APPLICATION, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 3;
              }
            },
            {
              label: 'Documents', icon: 'fa fa-file-text', routerLink: savingsbanktransactionconstant.SB_REQUIRED_DOCUMENTS, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 5;
              }
            },
  
            {
              label: 'Nominee', icon: 'fa fa-user-o', routerLink: savingsbanktransactionconstant.SB_NOMINEE, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 6;
              }
            },
            {
              label: 'Services', icon: 'fa fa-wrench', routerLink: savingsbanktransactionconstant.SB_SERVICES, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 7;
              }
            }
          ];
        }
        else {
          this.items = [
            {
              label: 'Member Details', icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.NEW_MEMBERSHIP, queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId)},
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 0;
              }
            },
            {
              label: 'KYC', icon: 'fa fa-podcast', routerLink: savingsbanktransactionconstant.SB_KYC, queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 1;
              }
            },
            {
              label: 'Communication', icon: 'fa fa-map-marker', routerLink: savingsbanktransactionconstant.SB_COMMUNICATION, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 2;
              }
            },
            {
              label: 'Application Details', icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.SB_APPLICATION, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 3;
              }
            },
            {
              label: 'Joint Account', icon: 'fa fa-handshake-o', routerLink: savingsbanktransactionconstant.SB_JOINTACCOUNT, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 4;
              }
            },
            {
              label: 'Documents',icon: 'fa fa-file-text', routerLink: savingsbanktransactionconstant.SB_REQUIRED_DOCUMENTS, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 5;
              }
            },
            {
              label: 'Nominee', icon: 'fa fa-user-o', routerLink: savingsbanktransactionconstant.SB_NOMINEE, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 6;
              }
            },
            {
              label: 'Services', icon: 'fa fa-wrench', routerLink: savingsbanktransactionconstant.SB_SERVICES, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 7;
              }
            }
          ];
        }
      }
      else {
        if(this.savingBankApplicationModel.accountTypeName != "Joint") {        
          this.items = [
            {
              label: 'KYC', icon: 'fa fa-podcast', routerLink: savingsbanktransactionconstant.MEMBERSHIP_BASIC_DETAILS, queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId)} ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 0;
              }
            },
            {
              label: 'Communication', icon: 'fa fa-map-marker', routerLink: savingsbanktransactionconstant.SB_COMMUNICATION, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 2;
              }
            },
            {
              label: 'Application Details', icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.SB_APPLICATION, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 3;
              }
            },
            {
              label: 'Documents', icon: 'fa fa-file-text', routerLink: savingsbanktransactionconstant.SB_REQUIRED_DOCUMENTS, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 5;
              }
            },
            {
              label: 'Nominee', icon: 'fa fa-user-o', routerLink: savingsbanktransactionconstant.SB_NOMINEE, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 6;
              }
            },
            {
              label: 'Services', icon: 'fa fa-wrench', routerLink: savingsbanktransactionconstant.SB_SERVICES, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 7;
              }
            }
          ];
        }
        else {
          this.items = [
            {
              label: 'KYC', icon: 'fa fa-podcast', routerLink: savingsbanktransactionconstant.MEMBERSHIP_BASIC_DETAILS, queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId)} ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 0;
              }
            },
            {
              label: 'Communication', icon: 'fa fa-map-marker', routerLink: savingsbanktransactionconstant.SB_COMMUNICATION, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 2;
              }
            },
            {
              label: 'Application Details', icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.SB_APPLICATION, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 3;
              }
            },
            {
              label: 'Joint Account', icon: 'fa fa-handshake-o', routerLink: savingsbanktransactionconstant.SB_JOINTACCOUNT, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 4;
              }
            },
            {
              label: 'Documents', icon: 'fa fa-file-text', routerLink: savingsbanktransactionconstant.SB_REQUIRED_DOCUMENTS, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 5;
              }
            },
            {
              label: 'Nominee', icon: 'fa fa-user-o', routerLink: savingsbanktransactionconstant.SB_NOMINEE, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 6;
              }
            },
            {
              label: 'Services', icon: 'fa fa-wrench', routerLink: savingsbanktransactionconstant.SB_SERVICES, queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } ,
              disabled: this.menuDisabled,
              command: (event: any) => {
                this.activeIndex = 7;
              }
            }
          ];
        }
      }
    }
    else {
      this.itemListWithoutParams();
    }
    
    
    this.activeItem = this.items[this.activeIndex];
  }
   /**
   * @author jyothi.naidana
   * @implements navigation 
   * @argument activeIndex,savedId
   */
  navigateTo(activeIndex: number, savedId: any) {
    this.itemList();
    switch (activeIndex) {
      case 0:
        if (!this.showForm) {
          if(!this.previousStepFlag){
            this.router.navigate([savingsbanktransactionconstant.MEMBERSHIP_BASIC_DETAILS], { queryParams: { admissionNo: this.encryptDecryptService.encrypt(this.admissionNumber)} });
          }
          else {
            this.router.navigate([savingsbanktransactionconstant.MEMBERSHIP_BASIC_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId)} });
          }
        }
        else {
            this.router.navigate([savingsbanktransactionconstant.NEW_MEMBERSHIP], {queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId) } });
        }
        break;
      case 1:
        this.router.navigate([savingsbanktransactionconstant.SB_KYC], { queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId) } });
        break;
      case 2:
          if(!this.previousStepFlag && !this.showForm){
          this.router.navigate([savingsbanktransactionconstant.SB_COMMUNICATION], { queryParams: { admissionNo: this.encryptDecryptService.encrypt(this.admissionNumber)  ,id: this.encryptDecryptService.encrypt(this.sbAccId)} });
          }
          else {
            this.router.navigate([savingsbanktransactionconstant.SB_COMMUNICATION], { queryParams: {id: this.encryptDecryptService.encrypt(this.sbAccId) } });
          }
        break;
      case 3:
        this.router.navigate([savingsbanktransactionconstant.SB_APPLICATION], { queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId) } });
        break;
      case 4:
        this.router.navigate([savingsbanktransactionconstant.SB_JOINTACCOUNT], { queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId) } });
        break;
      case 5:
        this.router.navigate([savingsbanktransactionconstant.SB_REQUIRED_DOCUMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId) } });
        break;
      case 6:
        this.router.navigate([savingsbanktransactionconstant.SB_NOMINEE], { queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId) } });
        break;
      case 7:
        this.router.navigate([savingsbanktransactionconstant.SB_SERVICES], { queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId) } });
        break;
    }
  }
 /**
   * @author jyothi.naidana
   * @implements onchange stepper  
   * @argument item
   */
  changeStepperSelector(item: any) {
    if (this.menuDisabled) {
      return; // Do nothing if menu is disabled
    }
    this.activeItem = item;
    // this.menuDisabled = !this.menuDisabled;
  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  /**
   * @author jyothi.naidana
   * @implement previous step event
   * @argument activeIndex
   */
  prevStep(activeIndex: number) {
    this.activeIndex = activeIndex - 1;
    if (activeIndex == 0) {
      this.navigateTo(this.activeIndex, this.savedId);
    }
    else if (activeIndex == 1) {
      this.navigateTo(this.activeIndex, this.admissionNumber);
    }
    else if (activeIndex == 2) {
      if (!this.showForm) {
        this.previousStepFlag = true;
        this.activeIndex = this.activeIndex - 1;
      }
      this.navigateTo(this.activeIndex, this.sbAccId);
      this.flag = false;
    }
    else if (activeIndex == 3) {
      if (!this.showForm) {
        this.previousStepFlag = true;
      }
      this.navigateTo(this.activeIndex, this.sbAccId);
    }
    else if (activeIndex == 4) {
      this.navigateTo(this.activeIndex, this.sbAccId);
    }
    else if (activeIndex == 5) {
      if (this.savingBankApplicationModel.accountTypeName != "Joint") {
        this.flag = false;
        this.activeIndex = this.activeIndex - 1;
      }
      this.navigateTo(this.activeIndex, this.sbAccId);
    }
    else if (activeIndex == 6) {
      this.navigateTo(this.activeIndex, this.sbAccId);
    }
    else if (activeIndex == 7) {
      this.navigateTo(this.activeIndex, this.sbAccId);
    }
  }

  /**
   * @author jyothi.naidana
   * @implement saveAndNext step event
   * @argument activeIndex
   */
  nextStep(activeIndex: number) {
    if (activeIndex == 0) {
      if (this.memberTypeName == "Individual") {
        this.setMemberDetailsToSbApplicationDetails(this.savingBankApplicationModel.memberShipBasicDetailsDTO);
        this.savingBankApplicationModel.age = this.savingBankApplicationModel.memberShipBasicDetailsDTO.age;
      }
      else if (this.memberTypeName == "Group") {
        this.setMemberDetailsToSbApplicationDetails(this.savingBankApplicationModel.groupDetailsDTO);
      }
      else if (this.memberTypeName == "Institution") {
        this.setMemberDetailsToSbApplicationDetails(this.savingBankApplicationModel.institutionDTO);
      }
      this.savingBankApplicationModel.memberTypeName = this.memberTypeName;
      this.saveAndUpdateApplicationDetails(activeIndex, "next");

    }
    else if (activeIndex == 2) {
      this.saveOrUpdateSbCommunicationDetails(activeIndex, "next");
    }
    else if (activeIndex == 3) {
      if (!this.isNomineeEdit) {
        this.flagForNomineeTypeValue = 0;
      }
      else {
        this.flagForNomineeTypeValue = this.savingsBankNomineeModel.flagForNomineeTypeValue;
      }
      this.saveAndUpdateApplicationDetails(activeIndex, "next");
    }
    else if (activeIndex == 6) {
      this.saveOrUpdateNomineeDetails(activeIndex, "next");
      if (this.memberGuardianDetailsModelDetaila != null && this.memberGuardianDetailsModelDetaila != undefined) {
        this.saveOrUpdateGurdianetails(activeIndex, "next");
      }
    }
    else if (activeIndex == 4) {
      this.saveOrUpdateJointHolder();
    }
    else {
      this.activeIndex = this.activeIndex + 1;
      this.navigateTo(this.activeIndex, this.savedId);
    }
  }

 /**
   * @author jyothi.naidana
   * @implement back button event
   * @argument activeIndex
   */
  back(activeIndex: any) {
    this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);

  }
  /**
   * @author jyothi.naidana
   * @implement cancle button event
   * @argument activeIndex
   */
  cancel(activeIndex: any) {
    this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
    this.activeIndex = 0;
  }
 /**
   * @author jyothi.naidana
   * @implement navigate to transaction screen
   */
  submit() {
    this.buttonDisabled = true;
    this.router.navigate([savingsbanktransactionconstant.VIEW_TRANSACTIONS], { queryParams: { id: this.encryptDecryptService.encrypt(this.sbAccId), editOpt: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE), isGridPage: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE) } });
  }
  /**
   * @author jyothi.naidana
   * @implement submit button event
   * @argument activeIndex
   */
  save() {
    this.buttonDisabled = true;
    this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
    this.activeIndex == 0;
  }

  /**
   * @author jyothi.naidana
   * @implement save Or update application details
   * @argument activeIndex , buttonName
   */
  saveAndUpdateApplicationDetails(activeIndex: any, buttonName: any) {
    this.savingBankApplicationModel.pacsId = 5;
    this.savingBankApplicationModel.pacsCode = 12;
    this.savingBankApplicationModel.branchId = 12;
    if (this.savingBankApplicationModel.id != null) {
      this.isApplicationEdit = true;
    }
    else {
      this.isApplicationEdit = false;
    }
    if (this.savingBankApplicationModel.accountOpeningDateVal != null && this.savingBankApplicationModel.accountOpeningDateVal != undefined) {
      this.savingBankApplicationModel.accountOpenDate = this.commonFunctionsService.getUTCEpoch(new Date(this.savingBankApplicationModel.accountOpeningDateVal));
    }
    if (this.isApplicationEdit) {
      this.savingBankApplicationModel.statusName = applicationConstants.IS_ACTIVE;
      this.savingBankApplicationService.updateSbApplication(this.savingBankApplicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != undefined && this.responseModel.data[0] != null) {
            if (this.responseModel.data[0].id != undefined && this.responseModel.data[0].id != null) {
              this.sbAccId = this.responseModel.data[0].id;
              this.memberTypeName = this.responseModel.data[0].memberTypeName;
              if (this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined) {
                this.accountNumber = this.responseModel.data[0].accountNumber;
              }
              if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
                this.admissionNumber = this.responseModel.data[0].admissionNumber;
              }
              this.previousStepFlag = true;
              this.admissionNumberDropDownDisable = true;
            }
          }
          if (this.activeIndex === 3) {
            this.activeIndex = this.accountTypeBasedActiveIndexInscrement(this.responseModel.data[0].accountTypeName);
          }
          else if (this.activeIndex === 0) {
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
      }, error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    } else {
      this.savingBankApplicationModel.statusName = applicationConstants.IS_ACTIVE;
      this.savingBankApplicationModel.accountStatusName = "Created";
      this.savingBankApplicationService.addSbApplication(this.savingBankApplicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {

          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != undefined && this.responseModel.data[0] != null) {
            this.memberTypeName = this.responseModel.data[0].memberTypeName;
            if (this.responseModel.data[0].id != undefined && this.responseModel.data[0].id != null)
              this.sbAccId = this.responseModel.data[0].id;
            if (this.responseModel.data[0].accountTypeName != undefined && this.responseModel.data[0].accountTypeName != null)
              this.accountTypeName = this.responseModel.data[0].accountTypeName;
            if (this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined) {
              this.accountNumber = this.responseModel.data[0].accountNumber;
            }
            if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
              this.admissionNumber = this.responseModel.data[0].admissionNumber;
            }
            this.isNewMemberCreation = true;
            this.admissionNumberDropDownDisable = true;
          }
          this.previousStepFlag = false;
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          if (this.activeIndex == 3) {
            this.activeIndex = this.accountTypeBasedActiveIndexInscrement(this.accountTypeName);
          }
          else if (this.activeIndex == 0) {
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
      }, error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }
  }

  /**
   * @author jyothi.naidana
   * @implement active indext increment based on active index
   * @argument accountTypeName
   */
  accountTypeBasedActiveIndexInscrement(accountType: any) {
    if (accountType.toLowerCase() === "joint") {
      this.activeIndex = this.activeIndex + 1
    }
    else {
      this.activeIndex = this.activeIndex + 2;
    }
    return this.activeIndex;
  }

   /**
   * @author jyothi.naidana
   * @implement save OR update communication details
   * @argument activeIndex,buttonName
   */
  saveOrUpdateSbCommunicationDetails(activeIndex: any, buttonName: any) {
    this.savingsBankCommunicationModel.isNewMember = this.showForm;
    if (this.savingsBankCommunicationModel.isSameAddress == true) {
      this.isPerminentAddressIsSameFalg = true;
    }
    else {
      this.isPerminentAddressIsSameFalg = true;
    }
    this.savingsBankCommunicationModel.sbAccId = this.sbAccId;
    
    if (this.savingsBankCommunicationModel.id != null) {
      this.savingsBankCommunicationService.updateSbCommunication(this.savingsBankCommunicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
            this.sbAccId = this.responseModel.data[0].sbAccId;
          }
          if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
            this.admissionNumber = this.responseModel.data[0].admissionNumber;
          }
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;

          this.navigateTo(this.activeIndex, this.sbAccId);
          console.log("Navigation executed, activeIndex: ", this.activeIndex);
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
      this.savingsBankCommunicationService.addSbCommunication(this.savingsBankCommunicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
            this.sbAccId = this.responseModel.data[0].sbAccId;
          }
          if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
            this.admissionNumber = this.responseModel.data[0].admissionNumber;
          }
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.sbAccId);
          console.log("Navigation executed, activeIndex: ", this.activeIndex);
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


   /**
   * @author jyothi.naidana
   * @implement save OR update nominee details
   * @argument activeIndex,buttonName
   */
  saveOrUpdateNomineeDetails(activeIndex: any, buttonName: any) {
    this.savingsBankNomineeModel.sbAccId = this.sbAccId;
    this.savingsBankNomineeModel.accountNumber = this.accountNumber;
    this.savingsBankNomineeModel.isNewMember = this.showForm;
    if (this.savingsBankNomineeModel.id == null) {
      this.isNomineeEdit = false;
    }
    else {
      this.isNomineeEdit = true;
    }
    if (this.savingsBankNomineeModel.dateOfBirthVal != null && this.savingsBankNomineeModel.dateOfBirthVal != undefined) {
      this.savingsBankNomineeModel.dateOfBirth = this.commonFunctionsService.getUTCEpoch(new Date(this.savingsBankNomineeModel.dateOfBirthVal));
    }
    if (this.isNomineeEdit) {
      this.savingsBankNomineeService.updateSbNominee(this.savingsBankNomineeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.sbAccId);
          console.log("Navigation executed, activeIndex: ", this.activeIndex);
          this.completed = 1;
        } else {
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
    else {
      this.savingsBankNomineeService.addSbNominee(this.savingsBankNomineeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.sbAccId);
          console.log("Navigation executed, activeIndex: ", this.activeIndex);
          this.completed = 1;
        } else {
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
  }

  /**
   * @author jyothi.naidana
   * @implement save OR update guardain details
   * @argument activeIndex,buttonName
   */
  saveOrUpdateGurdianetails(activeIndex: any, buttonName: any) {
    this.memberGuardianDetailsModelDetaila.sbAccId = this.sbAccId;
    this.memberGuardianDetailsModelDetaila.accountNumber = this.accountNumber;
    this.memberGuardianDetailsModelDetaila.isNewMember = this.showForm;
    if (this.memberGuardianDetailsModelDetaila.id == null) {
      this.isNomineeEdit = false;
    }
    else {
      this.isNomineeEdit = true;
    }
    // if (this.savingsBankNomineeModel.dateOfBirthVal != null && this.savingsBankNomineeModel.dateOfBirthVal != undefined) {
    //   this.savingsBankNomineeModel.dateOfBirth = this.commonFunctionsService.getUTCEpochWithTime(this.savingsBankNomineeModel.dateOfBirthVal);
    // }
    if (this.isNomineeEdit) {
      this.savingsBankNomineeService.updateGuardainDetails(this.memberGuardianDetailsModelDetaila).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.completed = 1;
        } else {
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
    else {
      this.savingsBankNomineeService.addGuardinaDetails(this.memberGuardianDetailsModelDetaila).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.completed = 1;
        } else {
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
  }

  /**
   * @author jyothi.naidana
   * @implement save OR update Joint holder List
   */
  saveOrUpdateJointHolder() {
      this.savingsBankJointAccountService.saveJointHolderListSave(this.jointHolderList).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
            this.sbAccId = this.responseModel.data[0].sbAccId;
          }
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.sbAccId);
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

  /**
   * @author jyothi.naidana
   * @implement B class new member creation or Existed member  
   */
  onChange() {
  
    this.commonFunctionsService.setStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION, this.showForm);
    if (this.showForm) {
      this.router.navigate([savingsbanktransactionconstant.NEW_MEMBERSHIP], { queryParams: { showForm: this.encryptDecryptService.encrypt(this.showForm) } });
    }
    else {
      this.router.navigate([savingsbanktransactionconstant.MEMBERSHIP_BASIC_DETAILS], { queryParams: { showForm: this.encryptDecryptService.encrypt(this.showForm) } });
    }
  }

  /**
   * @author jyothi.naidana
   * @implement index increment based on active index number
   */
  activeIndexIncrement() {
    if (!this.showForm) {
      this.activeIndex = this.activeIndex + 2
    }
    else {
      this.activeIndex = this.activeIndex + 1
    }
    return this.activeIndex;
  }

  /**
   * @author jyothi.naidana
   * @implement set member details to application basic required member related details
   */
  setMemberDetailsToSbApplicationDetails(memeberdetailsObj: any) {
    this.savingBankApplicationModel.memberTypeId = memeberdetailsObj.memberTypeId;
    this.savingBankApplicationModel.memberTypeName = memeberdetailsObj.memberTypeName;
    this.savingBankApplicationModel.name = memeberdetailsObj.name;
    // this.savingBankApplicationModel.surName = memeberdetailsObj.surName;
    this.savingBankApplicationModel.email = memeberdetailsObj.emailId;
    this.savingBankApplicationModel.mobileNumber = memeberdetailsObj.mobileNumber;
  }


  /**
   * @author jyothi.naidana
   * @implement get member admission Numbers list
   * @argument pacsId,branchId
   */
  getAllTypeOfMembershipDetails(pacsId: any, branchId: any) {
    this.membershipServiceService.getAllTypeOfMemberDetailsListFromMemberModule(this.pacsId, this.branchId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.allTypesOfmembershipList = this.responseModel.data;
            this.allTypesOfmembershipList = this.allTypesOfmembershipList.filter((obj: any) => obj != null).map((relationType: { id: any; name: any; admissionNumber: any; memberTypeName: any }) => {
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
  /**
   * @author jyothi.naidana
   * @implement onchange admissionNumber
   * @argument admissionNumber
   */
  OnChangeAdmissionNumber(admissionNo: any) {
    const filteredItem = this.allTypesOfmembershipList.find((item: { value: any; }) => item.value === admissionNo);
    const parts = filteredItem.label.split(' - ');
    let label = parts[parts.length - 1].trim();
    this.membershipBasicRequiredDetails.memberTypeName = label;
    const admissionNumber = filteredItem.label.split(' - ');
    let admissionNumberLable = parts[parts.length - 2].trim();
    this.admissionNumber = admissionNumberLable;
    if (this.membershipBasicRequiredDetails.memberTypeName == "Individual") {
      this.individualFlag = true;
      this.groupFlag = false;
      this.institutionFlag = false;
      this.getMemberDetailsByAdmissionNUmber(admissionNo);
    } else if (this.membershipBasicRequiredDetails.memberTypeName == "Group") {
      this.groupFlag = true;
      this.institutionFlag = false;
      this.individualFlag = false;
      this.getGroupDetailsByAdmissionNumber(admissionNo);
    }
    else if (this.membershipBasicRequiredDetails.memberTypeName == "Institution") {
      this.institutionFlag = true;
      this.individualFlag = false;
      this.groupFlag = false;
      this.getInstitutionDetailsByAdmissionNumber(admissionNo);
    }
    this.router.navigate([savingsbanktransactionconstant.MEMBERSHIP_BASIC_DETAILS], { queryParams: { admissionNo: this.encryptDecryptService.encrypt(admissionNo), editFlag: this.encryptDecryptService.encrypt(false) } });

  }
  /**
   * @author jyothi.naidana
   * @implement get member module data by admission Number
   * @argument admissionNumber
   */
  getMemberDetailsByAdmissionNUmber(admissionNumber: any) {
    this.membershipServiceService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipBasicRequiredDetails = this.responseModel.data[0];
          this.membershipBasicRequiredDetails.memberShipCommunicationDetailsDTOList = this.responseModel.data[0].memberShipCommunicationDetailsDTOList;

          if (this.membershipBasicRequiredDetails.dob != null && this.membershipBasicRequiredDetails.dob != undefined) {
            this.membershipBasicRequiredDetails.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetails.dob, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicRequiredDetails.admissionDate != null && this.membershipBasicRequiredDetails.admissionDate != undefined) {
            this.membershipBasicRequiredDetails.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetails.admissionDate, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicRequiredDetails.memberShipCommunicationDetailsDTOList[0] != null && this.membershipBasicRequiredDetails.memberShipCommunicationDetailsDTOList[0] != undefined) {
            this.savingsBankCommunicationModel = this.membershipBasicRequiredDetails.memberShipCommunicationDetailsDTOList[0];
          }
          if (this.membershipBasicRequiredDetails.photoCopyPath != null && this.membershipBasicRequiredDetails.photoCopyPath != undefined) {
              this.membershipBasicRequiredDetails.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.photoCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.photoCopyPath  );
              this.photoCopyFlag = true;
            }
          if (this.membershipBasicRequiredDetails.signatureCopyPath != null && this.membershipBasicRequiredDetails.signatureCopyPath != undefined) {
              this.membershipBasicRequiredDetails.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.signatureCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.signatureCopyPath  );
          }
          if (this.membershipBasicRequiredDetails.isKycApproved != null && this.membershipBasicRequiredDetails.isKycApproved != undefined && this.membershipBasicRequiredDetails.isKycApproved) {
            this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
          }
          else {
            this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
          }
          this.admissionNumber = this.membershipBasicRequiredDetails.admissionNumber;
          this.savingBankApplicationModel.memberTypeName = this.membershipBasicRequiredDetails.memberTypeName;
          this.savingBankApplicationModel.memberShipBasicDetailsDTO = this.membershipBasicRequiredDetails;
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

 /**
   * @author jyothi.naidana
   * @implement get group data frmo member module data by admission Number
   * @argument admissionNumber
   */
  getGroupDetailsByAdmissionNumber(admissionNUmber: any) {
    this.membershipServiceService.getMemberGroupByAdmissionNumber(admissionNUmber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memberGroupDetailsModel = this.responseModel.data[0];
          this.memberGroupDetailsModel.groupCommunicationList = this.responseModel.data[0].groupCommunicationList;
          this.membershipBasicRequiredDetails.memberGroupDetailsModel = this.memberGroupDetailsModel;
          this.membershipBasicRequiredDetails.memberShipCommunicationDetailsDTOList = this.memberGroupDetailsModel.groupCommunicationList;

          this.memberTypeName = this.responseModel.data[0].memberTypeName;
          if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
            this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
          }
          if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
            this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          if (this.memberGroupDetailsModel.groupCommunicationList[0] != null && this.memberGroupDetailsModel.groupCommunicationList[0] != undefined) {
            this.savingsBankCommunicationModel = this.memberGroupDetailsModel.groupCommunicationList[0];
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
          this.savingBankApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
          this.savingBankApplicationModel.groupDetailsDTO = this.memberGroupDetailsModel;
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

 /**
   * @author jyothi.naidana
   * @implement get institution data frmo member module data by admission Number
   * @argument admissionNumber
   */
  getInstitutionDetailsByAdmissionNumber(admissionNumber: any) {
    this.membershipServiceService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipInstitutionDetailsModel = this.responseModel.data[0];
          this.membershipInstitutionDetailsModel.institutionCommunicationDTOList = this.responseModel.data[0].institutionCommunicationDTOList;
          this.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
          this.savingBankApplicationModel.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
          this.savingBankApplicationModel.institutionDTO = this.membershipInstitutionDetailsModel;
          if (this.membershipInstitutionDetailsModel.institutionCommunicationDTOList != null && this.membershipInstitutionDetailsModel.institutionCommunicationDTOList != undefined && this.membershipInstitutionDetailsModel.institutionCommunicationDTOList.length >0 && this.membershipInstitutionDetailsModel.institutionCommunicationDTOList[0] != null && this.membershipInstitutionDetailsModel.institutionCommunicationDTOList[0] != undefined) {
            this.savingsBankCommunicationModel = this.membershipInstitutionDetailsModel.institutionCommunicationDTOList[0];
          }
          if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
            this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
          }
          if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
            this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
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

  /**
  * @author jyothi.naidana
  * @implement get sbAccount details by accountId
  * @argument accountId
  */
  getSbAccountDetailsById(id: any) {
    this.savingBankApplicationService.getSbApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {

        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {

          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.savingBankApplicationModel = this.responseModel.data[0];
            this.admissionNumberDropDownDisable = true;
            this.isNewMemberCreation = true;
            this.admissionNumber = this.savingBankApplicationModel.admissionNumber;
            if (this.savingBankApplicationModel.memberShipBasicDetailsDTO != null && this.savingBankApplicationModel.memberShipBasicDetailsDTO != undefined) {
              this.membershipBasicRequiredDetails = this.savingBankApplicationModel.memberShipBasicDetailsDTO;
              if (this.membershipBasicRequiredDetails.dob != null && this.membershipBasicRequiredDetails.dob != undefined) {
                this.membershipBasicRequiredDetails.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetails.dob, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicRequiredDetails.admissionDate != null && this.membershipBasicRequiredDetails.admissionDate != undefined) {
                this.membershipBasicRequiredDetails.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetails.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicRequiredDetails.photoCopyPath != null && this.membershipBasicRequiredDetails.photoCopyPath != undefined) {
                this.membershipBasicRequiredDetails.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.photoCopyPath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.photoCopyPath  );
                this.photoCopyFlag = true;
              }
              if (this.membershipBasicRequiredDetails.signatureCopyPath != null && this.membershipBasicRequiredDetails.signatureCopyPath != undefined) {
                this.membershipBasicRequiredDetails.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.signatureCopyPath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.signatureCopyPath  );
                this.photoCopyFlag = true;
              }
              if (this.membershipBasicRequiredDetails.isKycApproved != null && this.membershipBasicRequiredDetails.isKycApproved != undefined && this.membershipBasicRequiredDetails.isKycApproved) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
              this.individualFlag = true;
              this.groupFlag = false;
              this.institutionFlag = false;
              this.showForm = this.membershipBasicRequiredDetails.isNewMember
            }
            if (this.savingBankApplicationModel.groupDetailsDTO != null && this.savingBankApplicationModel.groupDetailsDTO != undefined) {
              this.groupFlag = true;
              this.institutionFlag = false;
              this.individualFlag = false;
              this.memberGroupDetailsModel = this.savingBankApplicationModel.groupDetailsDTO;
              this.showForm = this.memberGroupDetailsModel.isNewMember;
              if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
                this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
              }
              if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
                this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.memberGroupDetailsModel.isKycApproved != null && this.memberGroupDetailsModel.isKycApproved != undefined) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
              if(this.savingBankApplicationModel.groupDetailsDTO.groupPromoterList != null && this.savingBankApplicationModel.groupDetailsDTO.groupPromoterList != undefined && this.savingBankApplicationModel.groupDetailsDTO.groupPromoterList.length >0){
                this.groupPrmotersList = this.savingBankApplicationModel.groupDetailsDTO.groupPromoterList;
              }
              
            }
            if (this.savingBankApplicationModel.institutionDTO != null && this.savingBankApplicationModel.institutionDTO != undefined) {
              this.institutionFlag = true;
              this.individualFlag = false;
              this.groupFlag = false;
              this.membershipInstitutionDetailsModel = this.savingBankApplicationModel.institutionDTO;
              this.showForm = this.membershipInstitutionDetailsModel.isNewMember;
              if (this.membershipInstitutionDetailsModel.isKycApproved != null && this.membershipInstitutionDetailsModel.isKycApproved != undefined) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
              if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
                this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
                this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if(this.savingBankApplicationModel.institutionDTO.institutionPromoterList != null && this.savingBankApplicationModel.institutionDTO.institutionPromoterList != undefined && this.savingBankApplicationModel.institutionDTO.institutionPromoterList.length >0){
                this.institionPromotersList = this.savingBankApplicationModel.institutionDTO.institutionPromoterList;
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
  /**
   * @author jyothi.naidana
   * @implement onclick more details for popup enable
   */
  onClick() {
    this.institutionPromoterFlag = true;
  }
  /**
 * @author jyothi.naidana
 * @implement onclick more details of group for popup enable
 */
  onClickOfGroupPromotes() {
    this.groupPromotersPopUpFlag = true;
  }

  /**
   * @author jyothi.naidana
   * @implement onclose popup
   */
  close() {
    this.institutionPromoterFlag = false;
    this.groupPromotersPopUpFlag = false;
    this.memberSignatureCopyZoom = false;
    this.memberPhotoCopyZoom = false;
    this.membreIndividualFlag = false;
  }

  /**
   * @author jyothi.naidana
   * @implements close photo dialogue
   */
  closePhoto(){
    this.memberPhotoCopyZoom = false;
  }

   /**
   * @implement Image Zoom POp up
   * @author jyothi.naidana
   */
  onClickMemberPhotoCopy(){
    this.memberPhotoCopyZoom = true;
  }
   /**
   * @implement Image Zoom POp up
   * @author jyothi.naidana
   */
  onClickMemberSignatureCopy(){
    this.memberSignatureCopyZoom = true;
  }

  /**
   * @implements refresh the member details
   * @augments jyothi.naidana
   */
  refreshTheMemberCardData(){
    this.savingBankApplicationService.resetCurrentStep();
    this.membershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
    this.memberGroupDetailsModel = new MemberGroupDetailsModel();
    this.membershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
    this.admissionNumber = null;
  }

  onClickMemberIndividualMoreDetails(){
    this.membreIndividualFlag = true;
  }

  itemListWithoutParams(){
    if (this.showForm) {
      if (this.savingBankApplicationModel.accountTypeName != "Joint") {

        this.items = [
          {
            label: 'Member Details', icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.NEW_MEMBERSHIP, 
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },

          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: savingsbanktransactionconstant.SB_KYC,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 1;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: savingsbanktransactionconstant.SB_COMMUNICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application Details', icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.SB_APPLICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Documents', icon: 'fa fa-file-text', routerLink: savingsbanktransactionconstant.SB_REQUIRED_DOCUMENTS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          },

          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: savingsbanktransactionconstant.SB_NOMINEE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 6;
            }
          },
          {
            label: 'Services', icon: 'fa fa-wrench', routerLink: savingsbanktransactionconstant.SB_SERVICES,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 7;
            }
          }
        ];
      }
      else {
        this.items = [
          {
            label: 'Member Details', icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.NEW_MEMBERSHIP,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: savingsbanktransactionconstant.SB_KYC,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 1;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: savingsbanktransactionconstant.SB_COMMUNICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application Details', icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.SB_APPLICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Joint Account', icon: 'fa fa-handshake-o', routerLink: savingsbanktransactionconstant.SB_JOINTACCOUNT,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 4;
            }
          },
          {
            label: 'Documents',icon: 'fa fa-file-text', routerLink: savingsbanktransactionconstant.SB_REQUIRED_DOCUMENTS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: savingsbanktransactionconstant.SB_NOMINEE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 6;
            }
          },
          {
            label: 'Services', icon: 'fa fa-wrench', routerLink: savingsbanktransactionconstant.SB_SERVICES,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 7;
            }
          }
        ];
      }
    }
    else {
      if(this.savingBankApplicationModel.accountTypeName != "Joint") {        
        this.items = [
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: savingsbanktransactionconstant.MEMBERSHIP_BASIC_DETAILS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: savingsbanktransactionconstant.SB_COMMUNICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application Details', icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.SB_APPLICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Documents', icon: 'fa fa-file-text', routerLink: savingsbanktransactionconstant.SB_REQUIRED_DOCUMENTS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: savingsbanktransactionconstant.SB_NOMINEE, 
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 6;
            }
          },
          {
            label: 'Services', icon: 'fa fa-wrench', routerLink: savingsbanktransactionconstant.SB_SERVICES,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 7;
            }
          }
        ];
      }
      else {
        this.items = [
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: savingsbanktransactionconstant.MEMBERSHIP_BASIC_DETAILS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: savingsbanktransactionconstant.SB_COMMUNICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application Details', icon: 'fa fa-id-badge', routerLink: savingsbanktransactionconstant.SB_APPLICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Joint Account', icon: 'fa fa-handshake-o', routerLink: savingsbanktransactionconstant.SB_JOINTACCOUNT,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 4;
            }
          },
          {
            label: 'Documents', icon: 'fa fa-file-text', routerLink: savingsbanktransactionconstant.SB_REQUIRED_DOCUMENTS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: savingsbanktransactionconstant.SB_NOMINEE, 
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 6;
            }
          },
          {
            label: 'Services', icon: 'fa fa-wrench', routerLink: savingsbanktransactionconstant.SB_SERVICES,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 7;
            }
          }
        ];
      }
    }
  }
}
