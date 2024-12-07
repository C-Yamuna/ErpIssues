import { SiLoanGuardianService } from './../../shared/si-loans/si-loan-guardian.service';
import { SiLoanGuardian } from './../../shared/si-loans/si-loan-guardian.model';
import { SiLandLoanMortgage, SiBondLoanMortgage, SiOtherLoanMortgage, SiStorageLoanMortgage, SiVehicleLoanMortgage } from './../../shared/si-loans/si-loan-mortgage.model';
import { SiLoanCoApplicantDetailsService } from './../../shared/si-loans/si-loan-co-applicant-details.service';
import { SiLoanKycService } from './../../shared/si-loans/si-loan-kyc.service';
import { SiLoanGenealogyTreeService } from './../../shared/si-loans/si-loan-genealogy-tree.service';
import { SiLoanGuarantorDetailsService } from './../../shared/si-loans/si-loan-guarantor-details.service';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Loantransactionconstant } from '../../loan-transaction-constant';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MembershipBasicRequiredDetails, MemberGroupDetailsModel, MembershipInstitutionDetailsModel, InstitutionPromoterDetailsModel, promoterDetailsModel } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { SiLoanApplicationService } from '../../shared/si-loans/si-loan-application.service';
import { SiLoanApplication } from '../../shared/si-loans/si-loan-application.model';
import { SiLoanCommunication } from '../../shared/si-loans/si-loan-communication.model';
import { SiLoanNominee } from '../../shared/si-loans/si-loan-nominee.model';
import { SiLoanNomineeService } from '../../shared/si-loans/si-loan-nominee.service';
import { SiLoanKyc } from '../../shared/si-loans/si-loan-kyc.model';
import { SiLoanJointHolder } from '../../shared/si-loans/si-loan-joint-holder.model';
import { SiLoanCommunicationService } from '../../shared/si-loans/si-loan-communication.service';
import { SiLoanGuarantor } from '../../shared/si-loans/si-loan-guarantor.model';
import { SiLoanDocuments } from '../../shared/si-loans/si-loan-documents.model';
import { SiLoanGenealogyTree } from '../../shared/si-loans/si-loan-genealogy-tree.model';
import { SiGoldLoanMortgage } from '../../shared/si-loans/si-loan-mortgage.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { MembershipServiceService } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-simple-interest-loan-stepper',
  templateUrl: './simple-interest-loan-stepper.component.html',
  styleUrls: ['./simple-interest-loan-stepper.component.css']
})
export class SimpleInterestLoanStepperComponent {

  items: MenuItem[] = [];
  activeIndex: number = 0;
  buttonDisabled: boolean = true;
  savedId: any;
  activeItem: any;

  membershipBasicRequiredDetailsModel: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  siLoanKycModel: SiLoanKyc = new SiLoanKyc();
  siLoanCommunicationModel: SiLoanCommunication = new SiLoanCommunication();
  siLoanApplicationModel: SiLoanApplication = new SiLoanApplication();
  siLoanJointHolderModel: SiLoanJointHolder = new SiLoanJointHolder();
  siLoanNomineeModel: SiLoanNominee = new SiLoanNominee();
  siLoanGuardianModel: SiLoanGuardian = new SiLoanGuardian();
  siLoanGuarantorModel: SiLoanGuarantor = new SiLoanGuarantor();
  siGoldLoanMortgageModel: SiGoldLoanMortgage = new SiGoldLoanMortgage();
  siLandLoanMortgageModel: SiLandLoanMortgage = new SiLandLoanMortgage();
  siBondLoanMortgageModel: SiBondLoanMortgage = new SiBondLoanMortgage();
  siVehicleLoanMortgageModel: SiVehicleLoanMortgage = new SiVehicleLoanMortgage();
  siStorageLoanMortgageModel: SiStorageLoanMortgage = new SiStorageLoanMortgage();
  siOtherLoanMortgageModel: SiOtherLoanMortgage = new SiOtherLoanMortgage();
  siLoanDocumentsModel: SiLoanDocuments = new SiLoanDocuments();
  siLoanGenealogyTreeModel: SiLoanGenealogyTree = new SiLoanGenealogyTree();
  promoterDetailsModel: promoterDetailsModel = new promoterDetailsModel();
  institutionPromoterDetailsModel: InstitutionPromoterDetailsModel = new InstitutionPromoterDetailsModel();

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
  loanAccId: any;
  sbCommunicationId: any;
  accountTypeId: any;
  flag: Boolean = false;

  isApplicationEdit: boolean = false;
  isCommunicationEdit: boolean = false;
  isJointEdit: boolean = false;
  isKycEdit: boolean = false;
  isNomineeEdit: boolean = false;
  isGuarantorEdit: boolean = false;
  isMortgageEdit: boolean = false;
  isDocumentEdit: boolean = false;
  isGenealogyEdit: boolean = false;

  flagForNomineeTypeValue: any;
  isPerminentAddressIsSameFalg: boolean = false;
  accountNumber: any;
  memberTypeName: any;
  menuDisabled: boolean = true;
  checked: Boolean = false;
  isMemberCreation: Boolean = false;
  tabviewButton: boolean = true;
  pacsId: any;
  pacsCode?: any;
  operationTypeName: any;
  isNewMemberCreation: boolean = false;

  memberCreationForm: FormGroup;
  groupForm: FormGroup;
  institutionForm: FormGroup;
  applicationList: any[] = [];
  accountList: any[] = [];
  genderList: any[] = [];
  maritalstatusList: any[] = [];

  relationTypesList: any[] = [];
  occupationTypeList: any[] = [];
  qualificationTypes: any[] = [];
  admissionNumberList: any[] = [];
  castesList: any[] = [];
  id: any;
  imageUrl: string | ArrayBuffer | null = null;
  fileName: any;
  orgnizationSetting: any;
  docFilesList: any[] = [];
  submitFlag: boolean = false;
  maritalStatusList: any[] = [];
  memberTypeList: any[] = [];
  individualFlag: boolean = true;
  groupFlag: boolean = false;
  institutionFlag: boolean = false;
  isDisableFlag: boolean = false;
  disableMemberType: boolean = false;
  promoterDetailsForm: any;
  promoterColumns: any[] = [];
  institutionPromoterColumn: any[] = [];
  institutionPromoter: any[] = [];
  addButton: boolean = false;
  EditDeleteDisable: boolean = false;
  newRow: any;
  promoterDetails: any[] = [];
  memberTypeId: any;
  @ViewChild('dt', { static: false }) private dt!: Table;
  @ViewChild('cv', { static: false }) private cv!: Table;
  operatorTypeList: any[] = [];
  admisionNumber: any;
  communicationForm: any;
  sameAsPermanentAddress: boolean = false;
  statesList: any[] = [];
  districtsList: any[] = [];
  mandalsList: any[] = [];
  villageList: any[] = [];

  //member module fields
  allTypesOfmembershipList: any;
  admissionNUmber: any;
  permenentAllTypesOfmembershipList: any;
  previousStepFlag: boolean = false;
  admissionNumberDropDownDisable: boolean = false;
  guarantorDetailsList: any[] = [];
  jointHolderList: any[] = [];
  institutionPrmotersList: any[] = [];
  memberDetails: any;
  institionPromotersList: any[] = [];
  groupPrmotersList: any[] = [];
  groupPrmoters: any;
  institutionPromoterFlag: boolean = false;
  groupPromotersPopUpFlag: boolean = false;
  columns: any[] = [];
  isKycApproved: any;
  photoCopyFlag: boolean = false;
  memberSignatureCopyZoom: boolean = false;
  previouseButtonDisable: boolean = false;
  memberPhotoCopyZoom: boolean = false;
  membreIndividualFlag: boolean = false;

  constructor(private router: Router, private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonFunctionsService: CommonFunctionsService, private ref: ChangeDetectorRef,
    private siLoanKycService: SiLoanKycService, private siLoanCommunicationService: SiLoanCommunicationService,
    private siLoanApplicationService: SiLoanApplicationService, private siLoanCoApplicantDetailsService: SiLoanCoApplicantDetailsService,
    private siLoanNomineeService: SiLoanNomineeService, private siLoanGuarantorDetailsService: SiLoanGuarantorDetailsService,
    private siLoanGenealogyTreeService: SiLoanGenealogyTreeService,
    private membershipServiceService: MembershipServiceService, private formBuilder: FormBuilder, private datePipe: DatePipe,
    private siLoanGuardianService: SiLoanGuardianService
  ) {
    this.memberCreationForm = this.formBuilder.group({
      surName: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      name: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      age: ['', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY), Validators.compose([Validators.required])]],
      maritalStatus: ['', Validators.required],
      relationWithMember: [''],
      relationName: [''],
      aadharNumber: ['', Validators.required],
      panNumber: ['', Validators.required],
      mobileNumber: [''],
      occupation: [''],
      quslification: [''],
      caste: [''],
      email: ['', Validators.pattern(applicationConstants.EMAIL_PATTERN)],
      admissionDate: [''],
      isStaff: ['']
    })

    this.groupForm = this.formBuilder.group({
      name: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      registrationNumber: ['', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY), Validators.compose([Validators.required])]],
      registrationDate: ['', Validators.required],
      admissionDate: ['', Validators.required],
      pocNumber: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      panNumber: ['', Validators.required],
      tanNumber: ['', Validators.required],
      gstNumber: ['', Validators.required],
    })

    this.institutionForm = this.formBuilder.group({
      name: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      registrationNumber: ['', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY), Validators.compose([Validators.required])]],
      registrationDate: ['', Validators.required],
      admissionDate: ['', Validators.required],
      pocName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      panNumber: ['', Validators.required],
      tanNumber: ['', Validators.required],
      gstNumber: ['', Validators.required],
    })

    this.promoterDetailsForm = this.formBuilder.group({
      'surname': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'operatorTypeId': new FormControl(''),
      'dob': new FormControl(''),
      'age': new FormControl(''),
      'genderId': new FormControl(''),
      'martialId': new FormControl(''),
      'mobileNumber': new FormControl(''),
      'aadharNumber': new FormControl(''),
      'emailId': new FormControl(''),
      'startDate': new FormControl(''),
    })

    this.communicationForm = this.formBuilder.group({
      states: [{ value: '', disabled: true }],
      districts: [{ value: '', disabled: true }],
      mandal: [{ value: '', disabled: true }],
      village: [{ value: '', disabled: true }],
      regesteredAddressOne: [{ value: '', disabled: true }],
      regesteredAddressTwo: [{ value: '', disabled: true }],
      permenentState: [{ value: '', disabled: true }],
      permenentDistricts: [{ value: '', disabled: true }],
      permenentMandal: [{ value: '', disabled: true }],
      permenentDistrict: [{ value: '', disabled: true }],
      permenentVillage: [{ value: '', disabled: true }],
      permenentAddressOne: [{ value: '', disabled: true }],
      permenentAddressTwo: [{ value: '', disabled: true }],
      checked: [{ value: '', disabled: true }],
    })
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  ngOnInit() {
    this.pacsId = this.commonFunctionsService.getStorageValue(applicationConstants.PACS_ID);
    this.branchId = this.commonFunctionsService.getStorageValue(applicationConstants.BRANCH_ID);
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();

    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let queryParams = Number(this.encryptDecryptService.decrypt(params['id']));
        this.loanAccId = queryParams;
        this.getSILoanApplicationById(this.loanAccId);
        this.isEditCheck(this.activeIndex);
      } else if (params['createLoanFlag'] != undefined || params['isMemberCreation'] != undefined) {
        this.refreshTheMemberCardData();
        this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');
        this.itemList();
      } else {
        this.isEdit = false;
        this.flagForLabelName = false;
        this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');
      }
    });
    this.itemList();
    // if (!this.isMemberCreation) {
    this.getAllTypeOfMembershipDetails(this.pacsId, this.branchId);
    // }
    this.appendCurrentStepperData();
  }

  refreshTheMemberCardData() {
    this.siLoanApplicationService.resetCurrentStep();
    this.membershipBasicRequiredDetailsModel = new MembershipBasicRequiredDetails();
    this.memberGroupDetailsModel = new MemberGroupDetailsModel();
    this.membershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
    this.admissionNumber = null;
  }

  appendCurrentStepperData() {
    this.siLoanApplicationService.currentStep.subscribe((data: any) => {
      if (data) {
        // this.translate.use(data);
      } else {
        // this.translate.use(this.commonFunctionService.getStorageValue('language'));
      }
      if (data != undefined && data != null) {
        this.activeIndex = data.stepperIndex
        this.changeStepperSelector(this.activeIndex);
        this.buttonDisabled = data.isDisable

        if (data.data != null && data.data != undefined) {

          if (data.data.memberTypeName != null && data.data.memberTypeName != undefined)
            this.memberTypeName = data.data.memberTypeName;

          if (data.data.accountTypeId != null && data.data.accountTypeId != undefined)
            this.accountTypeId = data.data.accountTypeId;

          if (data.data.loanAccId != null && data.data.loanAccId != undefined)
            this.loanAccId = data.data.loanAccId;

          if (data.data.individualMemberDetailsDTO != null) {
            if (data.data.individualMemberDetailsDTO.memberTypeName != undefined && data.data.individualMemberDetailsDTO.memberTypeName === "Individual") {
              this.membershipBasicRequiredDetailsModel = data.data.individualMemberDetailsDTO;
              if (data.data.individualMemberDetailsDTO.admissionNumber != undefined)
                this.admissionNumber = data.data.individualMemberDetailsDTO.admissionNumber;
            }
          }

          if (data.data.memberGroupDetailsDTO != null) {
            if (data.data.memberGroupDetailsDTO.memberTypeName != undefined && data.data.memberGroupDetailsDTO.memberTypeName === "Group") {
              this.memberGroupDetailsModel = data.data.memberGroupDetailsDTO;
              if (data.data.memberGroupDetailsDTO.admissionNumber != undefined)
                this.admissionNumber = data.data.memberGroupDetailsDTO.admissionNumber;
            }
          }

          if (data.data.memberInstitutionDTO != null) {
            if (data.data.memberInstitutionDTO.memberTypeName != undefined && data.data.memberInstitutionDTO.memberTypeName === "Institution") {
              this.membershipInstitutionDetailsModel = data.data.memberInstitutionDTO;
              if (data.data.memberInstitutionDTO.admissionNumber != undefined)
                this.admissionNumber = data.data.memberInstitutionDTO.admissionNumber;
            }
          }

          if (this.activeIndex == 0) {
            this.siLoanApplicationModel = data.data;
            if (this.memberTypeName != undefined && this.memberTypeName != null)
              this.memberTypeCheck(this.memberTypeName, data.data);
          }
          if (this.activeIndex == 1) {
            if (this.memberTypeName != undefined && this.memberTypeName != null)
              this.memberTypeCheck(this.memberTypeName, data.data);

            this.siLoanApplicationModel = data.data;
          }
          if (this.activeIndex == 2) {
            this.siLoanCommunicationModel = data.data;
          }
          if (this.activeIndex == 3) {
            if (data.data != null && data.data != undefined) {
              if (data.data.accountTypeId != null && data.data.accountTypeId != undefined) {
                this.accountTypeId = data.data.accountTypeId;
              }
              if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
                this.admissionNumber = data.data.admissionNumber;
              }
              this.siLoanApplicationModel = data.data;
              this.itemList();
            }
          }
          if (this.activeIndex == 4) {
            if (data.data != null && data.data != undefined) {
              if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
                this.siLoanApplicationModel.admissionNo = data.data.admissionNumber;
              }
              if (data.data.siLoanApplicationId != null && data.data.siLoanApplicationId != undefined) {
                this.loanAccId = data.data.siLoanApplicationId;
              }
              if (data.data.jointHolderList != null && data.data.jointHolderList != undefined && data.data.jointHolderList.length > 0) {
                this.jointHolderList = data.data.jointHolderList;
              }
              this.siLoanJointHolderModel = data.data;
            }
            this.itemList();
          } else if (this.activeIndex == 5) {
            this.siLoanNomineeModel = data.data;
            this.flagForNomineeTypeValue = this.siLoanNomineeModel.flagForNomineeTypeValue;
          } else if (this.activeIndex == 6) {
            if (data.data != null && data.data != undefined) {
              if (data.data.accountTypeId != null && data.data.accountTypeId != undefined) {
                this.operationTypeName = data.data.accountTypeId;
              }
              if (data.data.admissionNumber != null && data.data.admissionNumber != undefined) {
                this.siLoanGuarantorModel.admissionNumber = data.data.admissionNumber;
              }
              if (data.data.SiLoanApplication != null && data.data.SiLoanApplication != undefined) {
                this.loanAccId = data.data.SiLoanApplication;
              }
              if (data.data.siLoanGuarantorDetailsDTOList != null && data.data.siLoanGuarantorDetailsDTOList != undefined && data.data.siLoanGuarantorDetailsDTOList.length > 0) {
                this.guarantorDetailsList = data.data.siLoanGuarantorDetailsDTOList;
              }
            }
          } else if (this.activeIndex == 7) {
            if (data.data.collateralType == 1) {
              this.siGoldLoanMortgageModel = data.data;
            } else if (data.data.collateralType == 2) {
              this.siLandLoanMortgageModel = data.data;
            } else if (data.data.collateralType == 3) {
              this.siBondLoanMortgageModel = data.data;
            } else if (data.data.collateralType == 4) {
              this.siVehicleLoanMortgageModel = data.data;
            } else if (data.data.collateralType == 5) {
              this.siStorageLoanMortgageModel = data.data;
            } else if (data.data.collateralType == 6) {
              this.siOtherLoanMortgageModel = data.data;
            }
          } else if (this.activeIndex == 8) {
            this.siLoanDocumentsModel = data.data;
          } else if (this.activeIndex == 9) {
            this.siLoanGenealogyTreeModel = data.data;
          }
        }
        this.navigateTo(this.activeIndex, this.savedId);
      }
    });
  }

  getSILoanApplicationById(id: any) {
    this.siLoanApplicationService.getSILoanApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {

              this.siLoanApplicationModel = this.responseModel.data[0];
              this.admissionNumberDropDownDisable = true;
              this.isNewMemberCreation = true;
              this.admissionNumber = this.siLoanApplicationModel.admissionNo;

              if (this.siLoanApplicationModel.individualMemberDetailsDTO != null && this.siLoanApplicationModel.individualMemberDetailsDTO != undefined) {
                this.membershipBasicRequiredDetailsModel = this.siLoanApplicationModel.individualMemberDetailsDTO;

                if (this.siLoanApplicationModel.memberTypeId != null && this.siLoanApplicationModel.memberTypeId != undefined)
                  this.memberTypeId = this.membershipBasicRequiredDetailsModel.memberTypeId;

                if (this.siLoanApplicationModel.memberTypeName != null && this.siLoanApplicationModel.memberTypeName != undefined)
                  this.memberTypeName = this.membershipBasicRequiredDetailsModel.memberTypeName;

                if (this.membershipBasicRequiredDetailsModel.isNewMember != undefined && this.membershipBasicRequiredDetailsModel.isNewMember != null) {
                  this.isMemberCreation = this.membershipBasicRequiredDetailsModel.isNewMember;
                  this.itemList();
                }

                if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined)
                  this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);

                if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined)
                  this.membershipBasicRequiredDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

                if (this.membershipBasicRequiredDetailsModel.isKycApproved != null && this.membershipBasicRequiredDetailsModel.isKycApproved != undefined && this.membershipBasicRequiredDetailsModel.isKycApproved)
                  this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
                else
                  this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;

                this.individualFlag = true;
                this.groupFlag = false;
                this.institutionFlag = false;
                this.admisionNumber = this.siLoanApplicationModel.admissionNo;
              }
              if (this.siLoanApplicationModel.memberGroupDetailsDTO != null && this.siLoanApplicationModel.memberGroupDetailsDTO != undefined) {
                this.memberGroupDetailsModel = this.siLoanApplicationModel.memberGroupDetailsDTO;

                if (this.memberGroupDetailsModel.memberTypeId != null && this.memberGroupDetailsModel.memberTypeId != undefined)
                  this.memberTypeId = this.memberGroupDetailsModel.memberTypeId;

                if (this.memberGroupDetailsModel.memberTypeName != null && this.memberGroupDetailsModel.memberTypeName != undefined)
                  this.memberTypeName = this.memberGroupDetailsModel.memberTypeName;

                if (this.memberGroupDetailsModel.isNewMember != undefined && this.memberGroupDetailsModel.isNewMember != null) {
                  this.isMemberCreation = this.memberGroupDetailsModel.isNewMember;
                  this.itemList();
                }

                if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined)
                  this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);

                if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined)
                  this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

                if (this.memberGroupDetailsModel.isKycApproved != null && this.memberGroupDetailsModel.isKycApproved != undefined && this.memberGroupDetailsModel.isKycApproved)
                  this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
                else
                  this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;

                if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined)
                  this.groupPrmotersList = this.memberGroupDetailsModel.groupPromoterList;

                this.individualFlag = false;
                this.groupFlag = true;
                this.institutionFlag = false;
                this.admisionNumber = this.siLoanApplicationModel.admissionNo;
              }
              if (this.siLoanApplicationModel.memberInstitutionDTO != null && this.siLoanApplicationModel.memberInstitutionDTO != undefined) {
                this.membershipInstitutionDetailsModel = this.siLoanApplicationModel.memberInstitutionDTO;

                if (this.membershipInstitutionDetailsModel.memberTypeId != null && this.membershipInstitutionDetailsModel.memberTypeId != undefined)
                  this.memberTypeId = this.membershipInstitutionDetailsModel.memberTypeId;

                if (this.membershipInstitutionDetailsModel.memberTypeName != null && this.membershipInstitutionDetailsModel.memberTypeName != undefined)
                  this.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;

                if (this.membershipInstitutionDetailsModel.isNewMember != undefined && this.membershipInstitutionDetailsModel.isNewMember != null) {
                  this.isMemberCreation = this.membershipInstitutionDetailsModel.isNewMember;
                  this.itemList();
                }

                if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined)
                  this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);

                if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined)
                  this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

                if (this.membershipInstitutionDetailsModel.isKycApproved != null && this.membershipInstitutionDetailsModel.isKycApproved != undefined && this.membershipInstitutionDetailsModel.isKycApproved)
                  this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
                else
                  this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;

                if (this.membershipInstitutionDetailsModel.institutionPromoterList.length && this.membershipInstitutionDetailsModel.institutionPromoterList != null && this.membershipInstitutionDetailsModel.institutionPromoterList != undefined)
                  this.institionPromotersList = this.membershipInstitutionDetailsModel.institutionPromoterList;

                this.individualFlag = false;
                this.groupFlag = false;
                this.institutionFlag = true;
                this.admisionNumber = this.siLoanApplicationModel.admissionNo;
              }
            }
          }
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

  memberTypeCheck(memberType: any, data: any) {
    if (memberType == "Individual") {
      this.individualFlag = true;
      this.groupFlag = false;
      this.institutionFlag = false;
      this.membershipBasicRequiredDetailsModel = data.data.individualMemberDetailsDTO;
    } else if (memberType == "Group") {
      this.groupFlag = true;
      this.institutionFlag = false;
      this.individualFlag = false;
      this.memberGroupDetailsModel = data.data.memberGroupDetailsDTO;
    } else if (memberType == "Institution") {
      this.institutionFlag = true;
      this.groupFlag = false;
      this.individualFlag = false;
      this.membershipInstitutionDetailsModel = data.data.memberInstitutionDTO;
    }
  }

  //is edit check 
  isEditCheck(activeIndex: any) {
    if (activeIndex == 0) {
      this.isEdit = true;
    } else if (activeIndex == 1) {
      this.isApplicationEdit = true
    } else if (activeIndex == 2) {
      this.isJointEdit = true
    } else if (activeIndex == 3) {
      this.isCommunicationEdit = true
    } else if (activeIndex == 4) {
      this.isKycEdit = true
    } else if (activeIndex == 4) {
      this.isJointEdit = true
    } else if (activeIndex == 6) {
      this.isNomineeEdit = true
    } else if (activeIndex == 7) {
      this.isGuarantorEdit = true
    } else if (activeIndex == 8) {
      this.isMortgageEdit = true
    } else if (activeIndex == 9) {
      this.isGenealogyEdit = true
    }
  }

  itemList() {
    if (this.isMemberCreation) {
      if (this.siLoanApplicationModel.operationTypeName != "Joint") {
        this.items = [
          {
            label: 'Basic Details', icon: 'fa fa-id-badge', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_MEMBERSHIP_DETAILS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_KYC,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 1;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_COMMUNICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application', icon: 'fa fa-clipboard', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_APPLICATION_DETAILS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_NOMINEE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 4;
            }
          },
          {
            label: 'Loan Guarantor', icon: 'fa fa-male', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_GUARANTOR,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          },
          {
            label: 'Loan Mortagage', icon: 'fa fa-puzzle-piece', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_MORTAGAGE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 6;
            }
          },
          {
            label: 'Loan Documents', icon: 'fa fa-files-o', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_DOCUMENTS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 7;
            }
          },
          {
            label: 'Loan Genealogy Tree', icon: 'fa fa-sitemap', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_GENEALOGY_TREE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 8;
            }
          }
        ];
      } else {
        this.items = [
          {
            label: 'Basic Details', icon: 'fa fa-id-badge', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_MEMBERSHIP_DETAILS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 0;
            }
          },
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_KYC,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 1;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_COMMUNICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application', icon: 'fa fa-clipboard', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_APPLICATION_DETAILS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Joint Account', icon: 'fa fa-handshake-o', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_JOINT_ACCOUNT,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 4;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_NOMINEE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          },
          {
            label: 'Loan Guarantor', icon: 'fa fa-male', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_GUARANTOR,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 6;
            }
          },
          {
            label: 'Loan Mortagage', icon: 'fa fa-puzzle-piece', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_MORTAGAGE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 7;
            }
          },
          {
            label: 'Loan Documents', icon: 'fa fa-files-o', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_DOCUMENTS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 8;
            }
          },
          {
            label: 'Loan Genealogy Tree', icon: 'fa fa-sitemap', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_GENEALOGY_TREE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 9;
            }
          }
        ];
      }
    }
    else {
      if (this.siLoanApplicationModel.operationTypeName != "Joint") {
        this.items = [
          // {
          //   label: 'Basic Details', icon: 'fa fa-id-badge', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_MEMBERSHIP_DETAILS,
          // disabled: this.menuDisabled,
          //   command: (event: any) => {
          //     this.activeIndex = 0;
          //   }
          // },
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_KYC,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 1;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_COMMUNICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application', icon: 'fa fa-clipboard', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_APPLICATION_DETAILS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_NOMINEE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 4;
            }
          },
          {
            label: 'Loan Guarantor', icon: 'fa fa-male', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_GUARANTOR,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          },
          {
            label: 'Loan Mortagage', icon: 'fa fa-puzzle-piece', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_MORTAGAGE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 6;
            }
          },
          {
            label: 'Loan Documents', icon: 'fa fa-files-o', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_DOCUMENTS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 7;
            }
          },
          {
            label: 'Loan Genealogy Tree', icon: 'fa fa-sitemap', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_GENEALOGY_TREE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 8;
            }
          }
        ];
      } else {
        this.items = [
          // {
          //   label: 'Basic Details', icon: 'fa fa-id-badge', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_MEMBERSHIP_DETAILS,
          // disabled: this.menuDisabled,
          //   command: (event: any) => {
          //     this.activeIndex = 0;
          //   }
          // },
          {
            label: 'KYC', icon: 'fa fa-podcast', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_KYC,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 1;
            }
          },
          {
            label: 'Communication', icon: 'fa fa-map-marker', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_COMMUNICATION,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 2;
            }
          },
          {
            label: 'Application', icon: 'fa fa-clipboard', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_APPLICATION_DETAILS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 3;
            }
          },
          {
            label: 'Joint Account', icon: 'fa fa-handshake-o', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_JOINT_ACCOUNT,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 4;
            }
          },
          {
            label: 'Nominee', icon: 'fa fa-user-o', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_NOMINEE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 5;
            }
          },
          {
            label: 'Loan Guarantor', icon: 'fa fa-male', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_GUARANTOR,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 6;
            }
          },
          {
            label: 'Loan Mortagage', icon: 'fa fa-puzzle-piece', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_MORTAGAGE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 7;
            }
          },
          {
            label: 'Loan Documents', icon: 'fa fa-files-o', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_DOCUMENTS,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 8;
            }
          },
          {
            label: 'Loan Genealogy Tree', icon: 'fa fa-sitemap', routerLink: Loantransactionconstant.SIMPLE_INTEREST_LOANS_GENEALOGY_TREE,
            disabled: this.menuDisabled,
            command: (event: any) => {
              this.activeIndex = 9;
            }
          }
        ];
      }
    }
    this.activeItem = this.items[this.activeIndex];
  }

  //navigation to stepper form component
  navigateTo(activeIndex: number, savedId: any) {
    this.itemList();
    switch (activeIndex) {
      case 0:
        if (this.loanAccId != undefined && this.loanAccId != null) {
          this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_MEMBERSHIP_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(this.loanAccId) } });
        } else if (this.isMemberCreation != undefined && this.isMemberCreation != null && this.isMemberCreation) {
          this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_MEMBERSHIP_DETAILS], { queryParams: { isMemberCreation: this.encryptDecryptService.encrypt(this.isMemberCreation) } });
        } else {
          this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_KYC], { queryParams: { createLoanFlag: this.encryptDecryptService.encrypt(true) } });
        }
        break;
      case 1:
        if (this.loanAccId != undefined && this.loanAccId != null) {
          this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_KYC], { queryParams: { id: this.encryptDecryptService.encrypt(this.loanAccId) } });
        } else {
          this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_KYC], { queryParams: { createLoanFlag: this.encryptDecryptService.encrypt(true) } });
        }
        break;
      case 2:
        if ((this.loanAccId != undefined && this.loanAccId != null) || (this.admissionNumber != undefined && this.admissionNumber != null)) {
          this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_COMMUNICATION], { queryParams: { id: this.encryptDecryptService.encrypt(this.loanAccId), admissionNumber: this.encryptDecryptService.encrypt(this.admissionNumber) } });
        }
        break;
      case 3:
        this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_APPLICATION_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(this.loanAccId) } });
        break;
      case 4:
        this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_JOINT_ACCOUNT], { queryParams: { id: this.encryptDecryptService.encrypt(this.loanAccId) } });
        break;
      case 5:
        this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_NOMINEE], { queryParams: { id: this.encryptDecryptService.encrypt(this.loanAccId) } });
        break;
      case 6:
        this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_GUARANTOR], { queryParams: { id: this.encryptDecryptService.encrypt(this.loanAccId) } });
        break;
      case 7:
        this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_MORTAGAGE], { queryParams: { id: this.encryptDecryptService.encrypt(this.loanAccId) } });
        break;
      case 8:
        this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_DOCUMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(this.loanAccId) } });
        break;
      case 9:
        this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_GENEALOGY_TREE], { queryParams: { id: this.encryptDecryptService.encrypt(this.loanAccId) } });
        break;
    }
  }

  //on change stepper selection  set stepper disable
  changeStepperSelector(item: any) {
    if (this.menuDisabled) {
      return; // Do nothing if menu is disabled
    }
    this.activeItem = item;
    this.menuDisabled = true;
  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  //previous step navigation based on index number
  prevStep(activeIndex: number) {
    this.activeIndex = activeIndex - 1;
    if (activeIndex == 0) {
      this.navigateTo(this.activeIndex, this.savedId);
    } else if (activeIndex == 1) {
      this.navigateTo(this.activeIndex, this.admissionNumber);
    } else if (activeIndex == 2) {
      this.admisionNumber = this.siLoanApplicationModel.admissionNo;
      this.flag = false;
      this.navigateTo(this.activeIndex, this.loanAccId);
    } else if (activeIndex == 3) {
      if (!this.isMemberCreation) {
        this.previousStepFlag = true;
      }
      this.navigateTo(this.activeIndex, this.loanAccId);
    } else if (activeIndex == 4) {
      this.navigateTo(this.activeIndex, this.loanAccId);
    } else if (activeIndex == 5) {
      if (this.siLoanApplicationModel.operationTypeName != "Joint") {
        this.flag = false;
        this.activeIndex = this.activeIndex - 1;
      }
      this.navigateTo(this.activeIndex, this.loanAccId);
    } else if (activeIndex == 6) {
      this.navigateTo(this.activeIndex, this.loanAccId);
    } else if (activeIndex == 7) {
      this.navigateTo(this.activeIndex, this.loanAccId);
    } else if (activeIndex == 8) {
      this.navigateTo(this.activeIndex, this.loanAccId);
    } else if (activeIndex == 9) {
      this.navigateTo(this.activeIndex, this.loanAccId);
    }
  }

  //next step navigation based on index number
  nextStep(activeIndex: number) {
    if (activeIndex == 0) {
      if (this.memberTypeName == "Individual") {
        this.setMemberDetailsToSiLoanApplicationDetails(this.siLoanApplicationModel.individualMemberDetailsDTO);
      } else if (this.memberTypeName == "Group") {
        this.setMemberDetailsToSiLoanApplicationDetails(this.siLoanApplicationModel.memberGroupDetailsDTO);
      } else if (this.memberTypeName == "Institution") {
        this.setMemberDetailsToSiLoanApplicationDetails(this.siLoanApplicationModel.memberInstitutionDTO);
      }
      this.saveAndUpdateApplicationDetails(activeIndex, "next");
    }
    else if (activeIndex == 1) {

      if (!this.isMemberCreation) {
        this.saveAndUpdateApplicationDetails(activeIndex, "next");
      } else {
        this.saveAndUpdateKYCDetails(activeIndex, "next");
      }
    }
    else if (activeIndex == 2) {
      this.saveOrUpdateSiLoanCommunicationDetails(activeIndex, "next");
    } else if (activeIndex == 3) {
      if (!this.isNomineeEdit) {
        this.flagForNomineeTypeValue = 0;
      } else {
        this.flagForNomineeTypeValue = this.siLoanNomineeModel.flagForNomineeTypeValue;
      }
      this.saveAndUpdateApplicationDetails(activeIndex, "next");
    } else if (activeIndex == 4) {
      this.saveOrUpdateJointHolder();
    } else if (activeIndex == 5) {
      if (this.age != undefined && this.age != null && this.age <= 18) {
        this.saveOrUpdateGuardianDetails(activeIndex, "next");
      }
      this.saveOrUpdateNomineeDetails(activeIndex, "next");
    } else if (activeIndex == 6) {
      this.saveOrUpdateGuarantorDetails(activeIndex, "next");
    } else if (activeIndex == 7) {
      if (this.siGoldLoanMortgageModel.collateralType == 1) {
        this.saveOrUpdateGoldLoanMortagageDetails(activeIndex, "next");
      } else if (this.siLandLoanMortgageModel.collateralType == 2) {
        this.saveOrUpdateLandLoanMortagageDetails(activeIndex, "next");
      } else if (this.siBondLoanMortgageModel.collateralType == 3) {
        this.saveOrUpdateBondLoanMortagageDetails(activeIndex, "next");
      } else if (this.siVehicleLoanMortgageModel.collateralType == 4) {
        this.saveOrUpdateVehicleLoanMortagageDetails(activeIndex, "next");
      } else if (this.siStorageLoanMortgageModel.collateralType == 5) {
        this.saveOrUpdateStorageLoanMortagageDetails(activeIndex, "next");
      } else if (this.siOtherLoanMortgageModel.collateralType == 6) {
        this.saveOrUpdateOtherLoanMortagageDetails(activeIndex, "next");
      }
    } else if (activeIndex == 8) {
      this.saveOrUpdateDocumentDetails(activeIndex, "next");
    } else if (activeIndex == 9) {
      this.saveOrUpdateGenealogyDetails(activeIndex, "next");
    } else {
      this.activeIndex = activeIndex + 1;
      this.navigateTo(this.activeIndex, this.savedId);
    }
  }

  //cancle to grid navigation 
  cancel(activeIndex: any) {
    this.siLoanApplicationService.resetCurrentStep();
    this.siLoanKycService.resetCurrentStep();
    this.admisionNumber = undefined;
    this.memberTypeName = undefined;
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_TRANSACTION]);
    this.activeIndex = 0;
  }

  //last stepper preview navigation submit with preview
  submit() {
    this.buttonDisabled = true;
    this.router.navigate([Loantransactionconstant.VIEW_SIMPLE_INTEREST_LOAN], { queryParams: { id: this.encryptDecryptService.encrypt(this.loanAccId), editOpt: this.encryptDecryptService.encrypt(applicationConstants.ACTIVE),isGridPage:this.encryptDecryptService.encrypt(applicationConstants.ACTIVE)} });
  }

  //last stepper submit and grid navigation
  save() {
    this.buttonDisabled = true;
    this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_TRANSACTION]);
    this.activeIndex == 0;
  }

  //save and update application details
  saveAndUpdateApplicationDetails(activeIndex: any, buttonName: any) {
    this.siLoanApplicationModel.pacsId = this.pacsId;
    this.siLoanApplicationModel.pacsCode = this.pacsCode;
    this.siLoanApplicationModel.branchId = this.branchId;
    this.memberTypeId = this.siLoanApplicationModel.memberTypeId;

    if (this.siLoanApplicationModel.id != null) {
      this.isApplicationEdit = true;
    } else {
      this.isApplicationEdit = false;
    }
    if (this.siLoanApplicationModel.applicationDateVal != null && this.siLoanApplicationModel.applicationDateVal != undefined)
      this.siLoanApplicationModel.applicationDate = this.commonFunctionsService.getUTCEpochWithTime(this.siLoanApplicationModel.applicationDateVal);

    if (this.siLoanApplicationModel.sanctionDateVal != null && this.siLoanApplicationModel.sanctionDateVal != undefined)
      this.siLoanApplicationModel.sanctionDate = this.commonFunctionsService.getUTCEpochWithTime(this.siLoanApplicationModel.sanctionDateVal);

    if (this.siLoanApplicationModel.loanDueDateVal != null && this.siLoanApplicationModel.loanDueDateVal != undefined)
      this.siLoanApplicationModel.loanDueDate = this.commonFunctionsService.getUTCEpochWithTime(this.siLoanApplicationModel.loanDueDateVal);

    if (this.isApplicationEdit) {
      this.siLoanApplicationService.updateSILoanApplication(this.siLoanApplicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != undefined && this.responseModel.data[0] != null) {
            if (this.responseModel.data[0].id != undefined && this.responseModel.data[0].id != null) {
              this.loanAccId = this.responseModel.data[0].id;
              this.memberTypeName = this.responseModel.data[0].memberTypeName;
              if (this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined) {
                this.accountNumber = this.responseModel.data[0].accountNumber;
              }
              if (this.responseModel.data[0].admissionNo != null && this.responseModel.data[0].admissionNo != undefined) {
                this.admissionNumber = this.responseModel.data[0].admissionNo;
              }
            }
          }
          this.previousStepFlag = true;
          this.admissionNumberDropDownDisable = true;

          if (this.activeIndex === 0 || this.activeIndex === 1) {
            this.activeIndexIncrement();
          }
          else if (this.activeIndex === 3) {
            this.activeIndex = this.accountTypeBasedActiveIndexInscrement(this.siLoanApplicationModel.operationTypeName);
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
      this.siLoanApplicationModel.statusName = "Created";
      this.siLoanApplicationModel.accountStatusName = "Created";
      if (this.siLoanApplicationModel.siLoanInsuranceDetailsDTO != undefined && this.siLoanApplicationModel.siLoanInsuranceDetailsDTO != null)
        this.siLoanApplicationModel.siLoanInsuranceDetailsDTO.statusName = "Created";
      if (this.memberTypeName == "Individual") {
        this.siLoanApplicationModel.individualMemberDetailsDTO.memStatusName = "Created";
        if (this.siLoanApplicationModel.individualMemberDetailsDTO != undefined && this.siLoanApplicationModel.individualMemberDetailsDTO != null) {
          if (this.siLoanApplicationModel.individualMemberDetailsDTO.age != undefined && this.siLoanApplicationModel.individualMemberDetailsDTO.age != null) {
            this.age = this.siLoanApplicationModel.individualMemberDetailsDTO.age;
            if (this.siLoanApplicationModel.individualMemberDetailsDTO.age <= 18)
              this.siLoanApplicationModel.individualMemberDetailsDTO.isMinor = applicationConstants.TRUE;
            else
              this.siLoanApplicationModel.individualMemberDetailsDTO.isMinor = applicationConstants.FALSE;
          }
          if (this.siLoanApplicationModel.individualMemberDetailsDTO.id != undefined && this.siLoanApplicationModel.individualMemberDetailsDTO.id != null)
            this.siLoanApplicationModel.individualMemberDetailsDTO.id = null;

          if (this.siLoanApplicationModel.individualMemberDetailsDTO.memberShipKycDetailsDTOList != null && this.siLoanApplicationModel.individualMemberDetailsDTO.memberShipKycDetailsDTOList != undefined) {
            for (let kyc of this.siLoanApplicationModel.individualMemberDetailsDTO.memberShipKycDetailsDTOList) {
              kyc.id = null;
            }
            this.siLoanApplicationModel.siLoanKycDetailsDTOList = this.siLoanApplicationModel.individualMemberDetailsDTO.memberShipKycDetailsDTOList;
          }
        }
      } else if (this.memberTypeName == "Group") {
        this.siLoanApplicationModel.memberGroupDetailsDTO.groupStatusName = "Created";
        if (this.siLoanApplicationModel.memberGroupDetailsDTO != undefined && this.siLoanApplicationModel.memberGroupDetailsDTO != null) {
          if (this.siLoanApplicationModel.memberGroupDetailsDTO.age != undefined && this.siLoanApplicationModel.memberGroupDetailsDTO.age != null)
            this.siLoanApplicationModel.memberGroupDetailsDTO.id = null;

          if (this.siLoanApplicationModel.memberGroupDetailsDTO.groupKycList != null && this.siLoanApplicationModel.memberGroupDetailsDTO.groupKycList != undefined) {
            for (let kyc of this.siLoanApplicationModel.memberGroupDetailsDTO.groupKycList) {
              kyc.id = null;
            }
            this.siLoanApplicationModel.siLoanKycDetailsDTOList = this.siLoanApplicationModel.memberGroupDetailsDTO.groupKycList;
          }
        }
      } else if (this.memberTypeName == "Institution") {
        this.siLoanApplicationModel.memberInstitutionDTO.institutionStatusName = "Created";
        if (this.siLoanApplicationModel.memberInstitutionDTO != undefined && this.siLoanApplicationModel.memberInstitutionDTO != null) {
          if (this.siLoanApplicationModel.memberInstitutionDTO.age != undefined && this.siLoanApplicationModel.memberInstitutionDTO.age != null)
            this.siLoanApplicationModel.memberInstitutionDTO.id = null;

          if (this.siLoanApplicationModel.memberInstitutionDTO.institutionKycDetailsDTOList != null && this.siLoanApplicationModel.memberInstitutionDTO.institutionKycDetailsDTOList != undefined) {
            for (let kyc of this.siLoanApplicationModel.memberInstitutionDTO.institutionKycDetailsDTOList) {
              kyc.id = null;
            }
            this.siLoanApplicationModel.siLoanKycDetailsDTOList = this.siLoanApplicationModel.memberInstitutionDTO.institutionKycDetailsDTOList;
          }
        }
      }

      this.siLoanApplicationService.addSILoanApplication(this.siLoanApplicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != undefined && this.responseModel.data[0] != null) {
            this.memberTypeName = this.responseModel.data[0].memberTypeName;
            if (this.responseModel.data[0].id != undefined && this.responseModel.data[0].id != null)
              this.loanAccId = this.responseModel.data[0].id;
            if (this.responseModel.data[0].operationTypeName != undefined && this.responseModel.data[0].operationTypeName != null)
              this.operationTypeName = this.responseModel.data[0].operationTypeName;
            if (this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined) {
              this.accountNumber = this.responseModel.data[0].accountNumber;
            }
            if (this.responseModel.data[0].admissionNo != null && this.responseModel.data[0].admissionNo != undefined) {
              this.admissionNumber = this.responseModel.data[0].admissionNo;
            }
            this.isNewMemberCreation = true;
            this.admissionNumberDropDownDisable = true;
          }
          this.previousStepFlag = false;
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          if (this.activeIndex === 0 || this.activeIndex === 1) {
            this.activeIndexIncrement();
          }
          else if (this.activeIndex == 3) {
            this.activeIndex = this.accountTypeBasedActiveIndexInscrement(this.siLoanApplicationModel.operationTypeName);
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

  //save and update KYC details
  saveOrUpdateSIKYCDetails(activeIndex: any, buttonName: any) {
    this.siLoanKycModel.pacsId = this.pacsId;
    this.siLoanKycModel.pacsCode = this.pacsCode;
    this.siLoanKycModel.branchId = this.branchId;
    this.siLoanKycModel.siLoanApplicationId = this.loanAccId;
    this.siLoanKycModel.accountNumber = this.accountNumber;
    if (this.siLoanKycModel.id == null) {
      this.isKycEdit = false;
    } else {
      this.isKycEdit = true;
    }
    if (this.isKycEdit) {
      this.siLoanKycService.updateSILoanKYCDetails(this.siLoanKycModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanAccId);
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
      this.siLoanKycService.addSILoanKYCDetails(this.siLoanKycModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanAccId);
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

  saveAndUpdateKYCDetails(activeIndex: any, buttonName: any) {
    this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
    setTimeout(() => {
      this.msgs = [];
    }, 1200);
    this.activeIndex = this.activeIndex + 1;
    this.navigateTo(this.activeIndex, this.loanAccId);
    console.log("Navigation executed, activeIndex: ", this.activeIndex);
    this.completed = 1;
  }

  //save and update communication details
  saveOrUpdateSiLoanCommunicationDetails(activeIndex: any, buttonName: any) {
    this.siLoanCommunicationModel.pacsId = this.pacsId;
    this.siLoanCommunicationModel.pacsCode = this.pacsCode;
    this.siLoanCommunicationModel.branchId = this.branchId;
    this.siLoanCommunicationModel.memberType = this.memberTypeId
    this.siLoanCommunicationModel.memberTypeName = this.memberTypeName
    this.siLoanCommunicationModel.admissionNumber = this.admissionNumber;
    this.siLoanCommunicationModel.siLoanApplicationId = this.loanAccId;
    this.siLoanCommunicationModel.loanAccId = this.loanAccId;

    if (this.siLoanCommunicationModel.buttonCheck == true) {
      this.isPerminentAddressIsSameFalg = true;
    } else {
      this.isPerminentAddressIsSameFalg = true;
    }
    if (this.siLoanCommunicationModel.id == null) {
      this.isCommunicationEdit = false;
    } else {
      this.isCommunicationEdit = true;
    }
    if (this.isCommunicationEdit) {
      this.siLoanCommunicationService.updateSiLoanCommunication(this.siLoanCommunicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null)
            this.loanAccId = this.responseModel.data[0].loanAccId;

          if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined)
            this.admissionNumber = this.responseModel.data[0].admissionNumber;

          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanAccId);
          console.log("Navigation executed, activeIndex: ", this.activeIndex);
          this.completed = 1;
        } else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      });
    } else {
      this.siLoanCommunicationModel.statusName = 'Created';
      this.siLoanCommunicationService.addSiLoanCommunication(this.siLoanCommunicationModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null)
            this.loanAccId = this.responseModel.data[0].siLoanApplicationId;

          if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined)
            this.admissionNumber = this.responseModel.data[0].admissionNumber;

          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanAccId);
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

  //save and update nominee details
  saveOrUpdateNomineeDetails(activeIndex: any, buttonName: any) {
    this.siLoanNomineeModel.pacsId = this.pacsId;
    this.siLoanNomineeModel.pacsCode = this.pacsCode;
    this.siLoanNomineeModel.branchId = this.branchId;
    this.siLoanNomineeModel.siLoanApplicationId = this.loanAccId;
    if (this.siLoanNomineeModel.id == null) {
      this.isNomineeEdit = false;
    } else {
      this.isNomineeEdit = true;
    }
    if (this.siLoanNomineeModel.nomineeDobVal != null && this.siLoanNomineeModel.nomineeDobVal != undefined) {
      this.siLoanNomineeModel.nomineeDob = this.commonFunctionsService.getUTCEpochWithTime(this.siLoanNomineeModel.nomineeDobVal);
    }
    if (this.isNomineeEdit) {
      this.siLoanNomineeService.updateSILoanNomineeDetails(this.siLoanNomineeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanAccId);
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
    } else {
      this.siLoanNomineeService.addSILoanNomineeDetails(this.siLoanNomineeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanAccId);
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

  //save and update guardian details
  saveOrUpdateGuardianDetails(activeIndex: any, buttonName: any) {
    this.siLoanGuardianModel = this.siLoanNomineeModel.siMemberGuardianDetailsDTO;
    this.siLoanGuardianModel.pacsId = this.pacsId;
    this.siLoanGuardianModel.pacsCode = this.pacsCode;
    this.siLoanGuardianModel.branchId = this.branchId;
    this.siLoanGuardianModel.siLoanApplicationId = this.loanAccId;
    this.siLoanGuardianModel.admissionNumber = this.admisionNumber;
    this.siLoanGuardianModel.accountNumber = this.admisionNumber;
    this.siLoanGuardianModel.memberId = this.memberTypeId;
    this.siLoanGuardianModel.memberTypeId = this.memberTypeId;
    this.siLoanGuardianModel.memberTypeName = this.memberTypeName;

    if (this.siLoanGuardianModel.id == null) {
      this.isGuarantorEdit = false;
    } else {
      this.isGuarantorEdit = true;
    }
    if (this.isGuarantorEdit) {
      this.siLoanGuardianService.updateSILoanGuardianDetails(this.siLoanGuardianModel).subscribe((response: any) => {
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
    } else {
      this.siLoanGuardianService.addSILoanGuardianDetails(this.siLoanGuardianModel).subscribe((response: any) => {
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

  saveOrUpdateJointHolder() {
    this.siLoanCoApplicantDetailsService.saveJointHolderListSave(this.jointHolderList).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
          this.loanAccId = this.responseModel.data[0].siLoanApplicationId;
        }
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1200);
        this.activeIndex = this.activeIndex + 1;
        this.navigateTo(this.activeIndex, this.loanAccId);
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

  saveOrUpdateGuarantorDetails(activeIndex: any, buttonName: any) {
    this.siLoanGuarantorDetailsService.saveGuarantorDetailsList(this.guarantorDetailsList).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != null) {
          this.loanAccId = this.responseModel.data[0].siLoanApplicationId;
        }
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1200);
        this.activeIndex = this.activeIndex + 1;
        this.navigateTo(this.activeIndex, this.loanAccId);
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

  saveOrUpdateGoldLoanMortagageDetails(activeIndex: any, buttonName: any) {
    this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
    setTimeout(() => {
      this.msgs = [];
    }, 1200);
    this.activeIndex = this.activeIndex + 1;
    this.navigateTo(this.activeIndex, this.loanAccId);
    console.log("Navigation executed, activeIndex: ", this.activeIndex);
    this.completed = 1;
  }

  saveOrUpdateLandLoanMortagageDetails(activeIndex: any, buttonName: any) {
    this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
    setTimeout(() => {
      this.msgs = [];
    }, 1200);
    this.activeIndex = this.activeIndex + 1;
    this.navigateTo(this.activeIndex, this.loanAccId);
    console.log("Navigation executed, activeIndex: ", this.activeIndex);
    this.completed = 1;
  }

  saveOrUpdateBondLoanMortagageDetails(activeIndex: any, buttonName: any) {
    this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
    setTimeout(() => {
      this.msgs = [];
    }, 1200);
    this.activeIndex = this.activeIndex + 1;
    this.navigateTo(this.activeIndex, this.loanAccId);
    console.log("Navigation executed, activeIndex: ", this.activeIndex);
    this.completed = 1;
  }

  saveOrUpdateVehicleLoanMortagageDetails(activeIndex: any, buttonName: any) {
    this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
    setTimeout(() => {
      this.msgs = [];
    }, 1200);
    this.activeIndex = this.activeIndex + 1;
    this.navigateTo(this.activeIndex, this.loanAccId);
    console.log("Navigation executed, activeIndex: ", this.activeIndex);
    this.completed = 1;
  }

  saveOrUpdateStorageLoanMortagageDetails(activeIndex: any, buttonName: any) {
    this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
    setTimeout(() => {
      this.msgs = [];
    }, 1200);
    this.activeIndex = this.activeIndex + 1;
    this.navigateTo(this.activeIndex, this.loanAccId);
    console.log("Navigation executed, activeIndex: ", this.activeIndex);
    this.completed = 1;
  }

  saveOrUpdateOtherLoanMortagageDetails(activeIndex: any, buttonName: any) {
    this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
    setTimeout(() => {
      this.msgs = [];
    }, 1200);
    this.activeIndex = this.activeIndex + 1;
    this.navigateTo(this.activeIndex, this.loanAccId);
    console.log("Navigation executed, activeIndex: ", this.activeIndex);
    this.completed = 1;
  }

  saveOrUpdateDocumentDetails(activeIndex: any, buttonName: any) {
    this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
    setTimeout(() => {
      this.msgs = [];
    }, 1200);
    this.activeIndex = this.activeIndex + 1;
    this.navigateTo(this.activeIndex, this.loanAccId);
    console.log("Navigation executed, activeIndex: ", this.activeIndex);
    this.completed = 1;
  }

  saveOrUpdateGenealogyDetails(activeIndex: any, buttonName: any) {
    this.siLoanGenealogyTreeModel.pacsId = this.pacsId;
    this.siLoanGenealogyTreeModel.pacsCode = this.pacsCode;
    this.siLoanGenealogyTreeModel.branchId = this.branchId;
    this.siLoanGenealogyTreeModel.siLoanApplicationId = this.loanAccId;
    this.siLoanGenealogyTreeModel.accountNumber = this.accountNumber;
    this.siLoanGenealogyTreeModel.applicantAdmissionNo = this.admisionNumber;
    if (this.siLoanGenealogyTreeModel.id == null) {
      this.isGenealogyEdit = false;
    } else {
      this.isGenealogyEdit = true;
    }
    if (this.isGenealogyEdit) {
      this.siLoanGenealogyTreeService.updateSILoanGenealogyTree(this.siLoanGenealogyTreeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanAccId);
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
    } else {
      this.siLoanGenealogyTreeService.addSILoanGenealogyTree(this.siLoanGenealogyTreeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.activeIndex = this.activeIndex + 1;
          this.navigateTo(this.activeIndex, this.loanAccId);
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

  onChange() {
    this.siLoanApplicationService.resetCurrentStep();
    this.siLoanKycService.resetCurrentStep();
    this.commonFunctionsService.setStorageValue('b-class-member_creation', this.isMemberCreation);
    if (this.isMemberCreation) {
      this.activeIndex = 0;
      this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_MEMBERSHIP_DETAILS], { queryParams: { isMemberCreation: this.encryptDecryptService.encrypt(this.isMemberCreation) } });
    }
    else {
      this.activeIndex = 1;
      this.router.navigate([Loantransactionconstant.SIMPLE_INTEREST_LOANS_KYC], { queryParams: { isMemberCreation: this.encryptDecryptService.encrypt(this.isMemberCreation) } });
    }
  }

  activeIndexIncrement() {
    this.activeIndex = this.activeIndex + 1
    return this.activeIndex;
  }

  accountTypeBasedActiveIndexInscrement(accountType: any) {
    if (accountType == "Joint") {
      this.activeIndex = this.activeIndex + 1
    } else {
      this.activeIndex = this.activeIndex + 2;
    }
    return this.activeIndex;
  }

  setMemberDetailsToSiLoanApplicationDetails(memeberdetailsObj: any) {
    this.siLoanApplicationModel.memberTypeId = memeberdetailsObj.memberTypeId;
    this.siLoanApplicationModel.memberTypeName = memeberdetailsObj.memberTypeName;
    this.siLoanApplicationModel.memberName = memeberdetailsObj.name;
  }

  OnChangeAdmissionNumber(admissionNo: any) {
    this.siLoanApplicationModel = new SiLoanApplication();
    const filteredItem = this.allTypesOfmembershipList.find((item: { value: any; }) => item.value === admissionNo);
    const parts = filteredItem.label.split(' - ');
    let label = parts[parts.length - 1].trim();
    this.memberTypeName = label;
    const admissionNumber = filteredItem.label.split(' - ');
    let admissionNumberLable = parts[parts.length - 2].trim();
    this.admisionNumber = Number(admissionNumberLable);
    if (this.memberTypeName == "Individual") {
      this.membershipBasicRequiredDetailsModel.memberTypeName = this.memberTypeName;
      this.individualFlag = true;
      this.groupFlag = false;
      this.institutionFlag = false;
      this.getMembershipBasicDetailsByAdmissionNumber(this.admisionNumber);
    } else if (this.memberTypeName == "Group") {
      this.memberGroupDetailsModel.memberTypeName = this.memberTypeName;
      this.groupFlag = true;
      this.institutionFlag = false;
      this.individualFlag = false;
      this.getGroupDetailsByAdmissionNumber(this.admisionNumber);
    } else if (this.memberTypeName == "Institution") {
      this.membershipInstitutionDetailsModel.memberTypeName = this.memberTypeName;
      this.institutionFlag = true;
      this.individualFlag = false;
      this.groupFlag = false;
      this.getInstitutionDetailsByAdmissionNumber(this.admisionNumber);
    }
  }

  getAllMemberType() {
    this.membershipServiceService.getAllMemberTypes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memberTypeList = this.responseModel.data;
          this.memberTypeList = this.memberTypeList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
            return { label: relationType.name, value: relationType.id };
          });
        }
        // const filteredItem = this.memberTypeList.find((item: { value: any; }) => item.value === this.memberGroupDetailsModel.memberTypeId);
        // this.memberTypeName = filteredItem.label;
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  //membership module data 
  getAllTypeOfMembershipDetails(pacsId: any, branchId: any) {
    this.membershipServiceService.getAllTypeOfMemberDetailsListFromMemberModule(this.pacsId, this.branchId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.permenentAllTypesOfmembershipList = this.responseModel.data;
            this.allTypesOfmembershipList = this.permenentAllTypesOfmembershipList.filter((obj: any) => obj != null).map((member: { id: any; name: any; admissionNumber: any; memberTypeName: any }) => {
              return {
                label: `${member.name} - ${member.admissionNumber} - ${member.memberTypeName}`,
                value: member.admissionNumber
              };
            });
          } else {
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

  getMembershipBasicDetailsByAdmissionNumber(admissionNumber: any) {
    this.membershipServiceService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipBasicRequiredDetailsModel = this.responseModel.data[0];
          this.memberTypeId = this.membershipBasicRequiredDetailsModel.memberTypeId;
          this.siLoanApplicationModel.admissionNo = this.membershipBasicRequiredDetailsModel.admissionNumber;
          this.siLoanApplicationModel.memberTypeId = this.membershipBasicRequiredDetailsModel.memberTypeId;
          this.siLoanApplicationModel.memberTypeName = this.membershipBasicRequiredDetailsModel.memberTypeName;

          if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined)
            this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);

          if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined)
            this.membershipBasicRequiredDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

          if (this.membershipBasicRequiredDetailsModel.isKycApproved != null && this.membershipBasicRequiredDetailsModel.isKycApproved != undefined && this.membershipBasicRequiredDetailsModel.isKycApproved)
            this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
          else
            this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;

          this.siLoanApplicationModel.individualMemberDetailsDTO = this.membershipBasicRequiredDetailsModel;
        }
        this.siLoanKycService.changeData({
          formValid: true,
          data: this.siLoanApplicationModel,
          isDisable: false,
          stepperIndex: 1,
        });
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  getGroupDetailsByAdmissionNumber(admissionNUmber: any) {
    this.membershipServiceService.getMemberGroupByAdmissionNumber(admissionNUmber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memberGroupDetailsModel = this.responseModel.data[0];

          this.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
          this.memberTypeId = this.memberGroupDetailsModel.memberTypeId;
          this.admissionNumber = this.memberGroupDetailsModel.admissionNumber;
          this.siLoanApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
          this.siLoanApplicationModel.memberGroupDetailsDTO = this.memberGroupDetailsModel;

          if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined)
            this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);

          if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined)
            this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

          if (this.memberGroupDetailsModel.isKycApproved != null && this.memberGroupDetailsModel.isKycApproved != undefined && this.memberGroupDetailsModel.isKycApproved)
            this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
          else
            this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;

          if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined)
            this.groupPrmotersList = this.memberGroupDetailsModel.groupPromoterList;
        }
        this.siLoanKycService.changeData({
          formValid: true,
          data: this.siLoanApplicationModel,
          isDisable: false,
          stepperIndex: 1,
        });
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  getInstitutionDetailsByAdmissionNumber(admissionNUmber: any) {
    this.membershipServiceService.getMemberIstitutionByAdmissionNumber(admissionNUmber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipInstitutionDetailsModel = this.responseModel.data[0];

          this.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
          this.memberTypeId = this.membershipInstitutionDetailsModel.memberTypeId;
          this.admissionNumber = this.membershipInstitutionDetailsModel.admissionNumber;
          this.siLoanApplicationModel.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
          this.siLoanApplicationModel.memberInstitutionDTO = this.membershipInstitutionDetailsModel;

          if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined)
            this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);

          if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined)
            this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

          if (this.membershipInstitutionDetailsModel.isKycApproved != null && this.membershipInstitutionDetailsModel.isKycApproved != undefined && this.membershipInstitutionDetailsModel.isKycApproved)
            this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
          else
            this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;

          if (this.membershipInstitutionDetailsModel.institutionPromoterList != null && this.membershipInstitutionDetailsModel.institutionPromoterList != undefined)
            this.institutionPrmotersList = this.membershipInstitutionDetailsModel.institutionPromoterList;

        }
        this.siLoanKycService.changeData({
          formValid: true,
          data: this.siLoanApplicationModel,
          isDisable: false,
          stepperIndex: 1,
        });
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
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
