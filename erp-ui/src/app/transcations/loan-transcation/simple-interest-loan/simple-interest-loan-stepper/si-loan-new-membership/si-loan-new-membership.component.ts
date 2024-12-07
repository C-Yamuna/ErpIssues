import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { promoterDetailsModel } from 'src/app/transcations/membership-transcation/shared/member-group-details-model';
import { MembershipBasicRequiredDetails, MemberGroupDetailsModel, MembershipInstitutionDetailsModel } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { MembershipServiceService } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-service.service';
import { SavingBankApplicationService } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/savings-bank-application/shared/saving-bank-application.service';
import { SavingsBankCommunicationService } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/savings-bank-communication/shared/savings-bank-communication.service';
import { InstitutionPromoterDetailsModel } from '../../../sao/sao-stepper/membership-basic-details/shared/membership-basic-details.model';
import { SiLoanApplication } from '../../../shared/si-loans/si-loan-application.model';
import { SiLoanApplicationService } from '../../../shared/si-loans/si-loan-application.service';
import { SiLoanCommunication } from '../../../shared/si-loans/si-loan-communication.model';

@Component({
  selector: 'app-si-loan-new-membership',
  templateUrl: './si-loan-new-membership.component.html',
  styleUrls: ['./si-loan-new-membership.component.css']
})
export class SiLoanNewMembershipComponent {
  memberCreationForm: FormGroup;
  groupForm: FormGroup;
  institutionForm: FormGroup;
  applicationList: any[] = [];
  accountList: any[] = [];
  genderList: any[] = [];
  maritalstatusList: any[] = [];

  membershipBasicRequiredDetailsModel: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  promoterDetailsModel: promoterDetailsModel = new promoterDetailsModel();
  institutionPromoterDetailsModel: InstitutionPromoterDetailsModel = new InstitutionPromoterDetailsModel();
  siLoanApplicationModel: SiLoanApplication = new SiLoanApplication();

  relationTypesList: any[] = [];
  occupationTypeList: any[] = [];
  qualificationTypes: any[] = [];
  admissionNumberList: any[] = [];
  castesList: any[] = [];
  checked: Boolean = false;
  isMemberCreation: Boolean = false;
  id: any;
  isEdit: boolean = false;
  imageUrl: string | ArrayBuffer | null = null;
  fileName: any;
  responseModel!: Responsemodel;
  orgnizationSetting: any;
  docFilesList: any[] = [];
  submitFlag: boolean = false;
  maritalStatusList: any[] = [];

  memberTypeList: any[] = [];
  memberTypeName: any;
  individualFlag: boolean = false;
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

  msgs: any[] = [];
  operatorTypeList: any[] = [];
  admisionNumber: any;
  communicationForm: any;

  // memberCommunication fields
  // savingsBankCommunicationModel: SavingsBankCommunicationModel = new SavingsBankCommunicationModel();
  siLoanCommunicationModel: SiLoanCommunication = new SiLoanCommunication();
  sameAsPermanentAddress: boolean = false;
  statesList: any[] = [];
  districtsList: any[] = [];
  mandalsList: any[] = [];
  villageList: any[] = [];


  //member module fields
  allTypesOfmembershipList: any;
  pacsId: any;
  branchId: any;
  admissionNUmber: any;
  permenentAllTypesOfmembershipList: any;
  loanAccId: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private savingBankApplicationService: SavingBankApplicationService,
    private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe, private savingsBankCommunicationService: SavingsBankCommunicationService,
    private membershipServiceService: MembershipServiceService, private siLoanApplicationService: SiLoanApplicationService) {

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

  ngOnInit(): void {


    this.pacsId = 1;
    this.branchId = 1;
    this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');
    if (!this.isMemberCreation) {
      this.getAllTypeOfMembershipDetails(this.pacsId, this.branchId);
    }
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.maritalStatusList = this.commonComponent.maritalStatusList();

    // this.memberTypeList = [
    //   { label: "Individual", value: 1 },
    //   { label: "Group", value: 2 },
    //   { label: "Institution", value: 3 },
    // ]
    this.genderList = [
      { label: 'Male', value: 1 },
      { label: 'Female', value: 2 },
    ]
    this.maritalstatusList = [
      { label: 'Married', value: 1 },
      { label: 'Un-Married', value: 2 }
    ]
    // this.getGenderList();
    this.getAllRelationTypes();
    this.getAllMemberType();
    this.getAllOperatorTypes();
    this.getAllOccupationTypes();
    this.getAllQualificationType();
    this.getCastesList();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();

        this.loanAccId = this.encryptDecryptService.decrypt(params['id']);
        this.membershipBasicRequiredDetailsModel.memberTypeName = this.memberTypeName;
        this.getSILoanAccountDetailsById(this.loanAccId);

        this.disableMemberType = true;
        this.isEdit = true;
      }
      else {
        let val = this.commonFunctionsService.getStorageValue('b-class-member_creation');
        this.memberFormReset(val);
        this.updateData();
        if (!this.isMemberCreation) {
          this.individualFlag = true;
        }
      }
    });
    this.memberCreationForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.memberCreationForm.valid || this.groupForm.valid || this.institutionForm.valid) {
        this.save();
      }
    });
    this.groupForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.groupForm.valid) {
        this.save();
      }
    });
    this.institutionForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.groupForm.valid) {
        this.save();
      }
    });

    if (!this.isMemberCreation) {
      this.getStatesList();
      this.getDistrictAll();
      this.getAllMandalsList();

    }
  }

  getSILoanAccountDetailsById(id: any) {
    this.siLoanApplicationService.getSILoanApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.admisionNumber = this.responseModel.data[0].admissionNumber;
              this.memberTypeName = this.responseModel.data[0].memberTypeName;;
              this.siLoanApplicationModel = this.responseModel.data[0];
              this.updateData();
              this.membershipDataFromLoanModule();
            }
          }
        }
      }
    });
  }

  memberFormReset(flag: any) {
    if (flag) {
      this.memberCreationForm.reset();
      this.isMemberCreation = flag;
    }
    else {
      this.isMemberCreation = flag;
    }
  }
  //update data to main stepper component based on member type form validation

  updateData() {

    if (this.memberTypeName == "Individual") {
      this.isDisableFlag = (!this.memberCreationForm.valid)
      this.siLoanApplicationModel.memberTypeName = this.memberTypeName;
      this.siLoanApplicationModel.individualMemberDetailsDTO = this.membershipBasicRequiredDetailsModel;
      this.membershipBasicRequiredDetailsModel.memberTypeName = this.memberTypeName;
    }
    if (this.memberTypeName == "Group") {
      this.isDisableFlag = (!this.groupForm.valid)
      this.memberGroupDetailsModel.memberTypeId = this.memberTypeId;
      this.membershipBasicRequiredDetailsModel.memberGroupDetailsModel = this.memberGroupDetailsModel;
      this.memberGroupDetailsModel.memberTypeName = this.memberTypeName;
      this.siLoanApplicationModel.memberTypeName = this.memberTypeName;
      this.siLoanApplicationModel.memberGroupDetailsDTO = this.memberGroupDetailsModel;
    }
    if (this.memberTypeName == "Institution") {
      this.isDisableFlag = (!this.institutionForm.valid)
      this.membershipInstitutionDetailsModel.memberTypeId = this.memberTypeId;
      this.membershipBasicRequiredDetailsModel.membershipInstitutionDetailsModel = this.membershipInstitutionDetailsModel;
      this.membershipInstitutionDetailsModel.memberTypeName = this.memberTypeName;
      this.siLoanApplicationModel.memberTypeName = this.memberTypeName;
      this.siLoanApplicationModel.memberInstitutionDTO = this.membershipInstitutionDetailsModel;
    }
    this.siLoanApplicationService.changeData({
      formValid: !this.memberCreationForm.valid ? true : false || this.institutionForm.valid ? true : false || this.memberCreationForm.valid ? true : false,
      data: this.siLoanApplicationModel,
      isDisable: this.isDisableFlag,
      stepperIndex: 0,
    });
  }

  //stepper data save
  save() {
    this.updateData();
  }

  //for append relation name values
  onChangeRelationTypeChange(event: any) {
    const filteredItem = this.relationTypesList.find(item => item.value === event.value);
    this.membershipBasicRequiredDetailsModel.relationName = filteredItem.label;

  }

  //for relation Types
  getAllRelationTypes() {
    this.savingBankApplicationService.getAllRelationTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.relationTypesList = this.responseModel.data;
        this.relationTypesList = this.relationTypesList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
      }
    });
  }

  //Occupations List
  getAllOccupationTypes() {
    this.savingBankApplicationService.getAllAccountTypesList().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.occupationTypeList = this.responseModel.data;
        this.occupationTypeList = this.occupationTypeList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });

      }
    });
  }

  //qualifications List
  getAllQualificationType() {
    this.savingBankApplicationService.getQualificationTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.qualificationTypes = this.responseModel.data;
        this.qualificationTypes = this.qualificationTypes.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
      }
    });
  }

  //castes List
  getCastesList() {
    this.savingBankApplicationService.getCastes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.castesList = this.responseModel.data;
        this.castesList = this.castesList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
      }
    });
  }

  //need to add it it is pending for common master server calls
  // getAllgenderList() {
  //   this.savingBankApplicationService.getAllGenderList().subscribe((res: any) => {
  //     this.responseModel = res;
  //     if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
  //       this.genderList = this.responseModel.data;
  //       this.genderList = this.genderList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
  //         return { label: relationType.name, value: relationType.id };
  //       });
  //       this.genderList.unshift({ label: 'select', value: 0 });
  //     }
  //   });
  // }

  // is B-class member creation or frmo member module check
  onChange() {
    this.checked = !this.checked;
    if (this.checked) {
      this.isMemberCreation = true;
    }
    else {
      this.isMemberCreation = false;
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  //get member individual details
  getMemberDetailsByAdmissionNumber(admisionNumber: any) {
    this.siLoanApplicationService.getMemberByAdmissionNumber(admisionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipBasicRequiredDetailsModel = this.responseModel.data[0];
            if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined) {
              this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);
            }
            if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined) {
              this.membershipBasicRequiredDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
            }
            if (this.membershipBasicRequiredDetailsModel.memberShipCommunicationDetailsDTOList != null && this.membershipBasicRequiredDetailsModel.memberShipCommunicationDetailsDTOList != undefined) {
              this.siLoanCommunicationModel = this.membershipBasicRequiredDetailsModel.memberShipCommunicationDetailsDTOList[0];
            }
            this.siLoanApplicationModel.individualMemberDetailsDTO = this.membershipBasicRequiredDetailsModel;
            this.siLoanApplicationModel.memberTypeName = this.membershipBasicRequiredDetailsModel.memberTypeName;
            this.updateData();
          }
        }
        else {
          this.commonComponent.stopSpinner();
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }

  //get group details
  getGroupByAdmissionNumber(admissionNumber: any) {
    this.siLoanApplicationService.getGroupByAdmissionNumber(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.memberGroupDetailsModel = this.responseModel.data[0];
            if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
              this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDateVal, this.orgnizationSetting.datePipe);
            }
            if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
              this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
            }
            if (this.memberGroupDetailsModel.groupCommunicationList != null && this.memberGroupDetailsModel.groupCommunicationList != undefined) {
              this.siLoanCommunicationModel = this.memberGroupDetailsModel.groupCommunicationList[0];
            }
            if (this.memberGroupDetailsModel.groupPromotersDTOList.length > 0) {
              this.promoterDetails = this.memberGroupDetailsModel.groupPromotersDTOList;
              this.promoterDetails = this.memberGroupDetailsModel.groupPromotersDTOList.map((member: any) => {
                member.memDobVal = this.datePipe.transform(member.dob, this.orgnizationSetting.datePipe);
                member.startDateVal = this.datePipe.transform(member.startDate, this.orgnizationSetting.datePipe);
                return member;
              });
              this.siLoanApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
              this.siLoanApplicationModel.memberGroupDetailsDTO = this.memberGroupDetailsModel;
            }
            this.updateData();
          }
        }
        else {
          this.commonComponent.stopSpinner();
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }

  //get institution details
  getInstitutionByAdmissionNumber(admissionNumber: any) {
    this.siLoanApplicationService.getInstitutionDetails(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipInstitutionDetailsModel = this.responseModel.data[0];

            if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
              this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDateVal, this.orgnizationSetting.datePipe);
            }
            if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
              this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
            }
            if (this.memberGroupDetailsModel.groupCommunicationList != null && this.memberGroupDetailsModel.groupCommunicationList != undefined) {
              this.siLoanCommunicationModel = this.memberGroupDetailsModel.groupCommunicationList[0];
            }
            if (this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0)
              this.institutionPromoter = this.membershipInstitutionDetailsModel.institutionPromoterList;
            this.siLoanApplicationModel.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
            this.siLoanApplicationModel.memberInstitutionDTO = this.membershipInstitutionDetailsModel;
            this.updateData();
          }
        } else {
          this.commonComponent.stopSpinner();
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }

  //on change Of memberType
  OnChangeMemberType(event: any) {
    const filteredItem = this.memberTypeList.find((item: { value: any; }) => item.value === event.value);
    this.memberTypeName = filteredItem.label;
    if (event.value == 1) {
      this.individualFlag = true;
      this.institutionFlag = false;
      this.groupFlag = false;
      this.membershipBasicRequiredDetailsModel.memberTypeId = 1;
    }
    else if (event.value == 2) {
      this.groupFlag = true;
      this.individualFlag = false;
      this.institutionFlag = false;
      // this.memberGroupDetailsModel.memberTypeId = 2;
      this.membershipBasicRequiredDetailsModel.memberTypeId = 2;
    }
    else if (event.value == 3) {
      this.institutionFlag = true;
      this.individualFlag = false;
      this.groupFlag = false;
      // this.membershipInstitutionDetailsModel.memberTypeId = 3;
      this.membershipBasicRequiredDetailsModel.memberTypeId = 3;
    }
    this.updateData();
  }


  //save Promoters oF Group 
  savePromoterDetails(rowData: any) {
    rowData.pacsId = 1;

    this.addButton = false;
    this.EditDeleteDisable = false;

    if (!this.memberGroupDetailsModel.groupPromotersDTOList) {
      this.memberGroupDetailsModel.groupPromotersDTOList = []; // Initialize it as an empty array
    }
    this.memberGroupDetailsModel.groupPromotersDTOList.push(rowData);
    this.promoterDetails = this.memberGroupDetailsModel.groupPromotersDTOList.map((x: any) => Object.assign({}, x));

    this.updateData();
  }

  //inline cancle Promoters oF Group 
  cancelPromoter() {
    this.addButton = false;
    this.EditDeleteDisable = false;
  }

  //inline add new entry for group promoter
  addNewEntry() {
    this.newRow = { uniqueId: this.promoterDetails.length + 1, surname: '', name: '', operatorTypeId: '', dob: '', age: '', genderId: '', martialId: '', mobileNumber: '', emailId: '', aadharNumber: '', startDate: '' }
  }

  //inline edit for group promoter
  editPromoter(row: any) {
    this.addButton = true;
    this.EditDeleteDisable = true;
  }

  //inline edit for group promoter
  onRowEditSave() {
    this.promoterDetailsModel = new promoterDetailsModel();
    this.addNewEntry();
    this.EditDeleteDisable = true;
    this.addButton = true;
    this.dt._first = 0;
    this.dt.value.unshift(this.newRow);
    this.dt.initRowEdit(this.dt.value[0]);
  }

  //inline edit for operator details
  getAllOperatorTypes() {
    this.commonComponent.startSpinner();
    this.savingBankApplicationService.getAllOperationTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        this.operatorTypeList = this.responseModel.data.filter((customertype: any) => customertype.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });
        let relation = this.operatorTypeList.find((data: any) => null != data && data.value == this.promoterDetailsModel.operatorTypeId);
        if (relation != null && undefined != relation)
          this.promoterDetailsModel.operatorTypeName = relation.label;
        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }

  //inline save for institution promoters details
  saveInstitutionPromoterDetails(rowData: any) {
    rowData.pacsId = 1;

    this.addButton = false;
    this.EditDeleteDisable = false;

    if (!this.membershipInstitutionDetailsModel.institutionPromoterList) {
      this.membershipInstitutionDetailsModel.institutionPromoterList = []; // Initialize it as an empty array
    }
    this.membershipInstitutionDetailsModel.institutionPromoterList.push(rowData);
    this.promoterDetails = this.membershipInstitutionDetailsModel.institutionPromoterList.map((x: any) => Object.assign({}, x));

    this.updateData();
  }

  //inline cancle for institution promoters details
  cancelInstitutionPromoter() {
    this.addButton = false;
    this.EditDeleteDisable = false;
  }

  //inline add new row for institution promoters details
  addForInstitutionNewEntry() {
    this.newRow = { uniqueId: this.institutionPromoter.length + 1, surname: '', name: '', operatorTypeId: '', dob: '', age: '', genderId: '', martialId: '', mobileNumber: '', emailId: '', aadharNumber: '', startDate: '' }
  }

  //inline edit new row for institution promoters details
  editInstitutionPromoter(row: any) {
    this.addButton = true;
    this.EditDeleteDisable = true;

  }

  //inline add new row for institution promoters details
  onRowAddInstitution() {
    this.addForInstitutionNewEntry();
    this.EditDeleteDisable = true;
    this.addButton = true;
    this.cv._first = 0;
    this.cv.value.unshift(this.newRow);
    this.cv.initRowEdit(this.cv.value[0]);
  }

  // form here communication services for member communication
  //get all states list from common master
  getStatesList() {
    this.savingsBankCommunicationService.getstatesList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.statesList = this.responseModel.data;
            this.statesList = this.responseModel.data.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
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
      // this.getAllDistrcts();
    });
  }

  //get districts by state id
  getDistrictAll() {
    this.savingsBankCommunicationService.getDistrictsList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.districtsList = this.responseModel.data;
        this.districtsList = this.districtsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
      }
      else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }

  //get mandal by district id
  getAllMandalsList() {
    this.savingsBankCommunicationService.getMandalsList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.mandalsList = this.responseModel.data;
        this.mandalsList = this.mandalsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
      }
      else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }

  //get all vilages by mandal id 
  getAllVilagesByMandal() {
    this.savingsBankCommunicationService.getVillageList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.villageList = this.responseModel.data;
            this.villageList = this.villageList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
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

  //membership module data 
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

  OnChangeAdmissionNumber(admissionNo: any) {

    const filteredItem = this.allTypesOfmembershipList.find((item: { value: any; }) => item.value === admissionNo);
    const parts = filteredItem.label.split(' - ');
    let label = parts[parts.length - 1].trim();
    this.membershipBasicRequiredDetailsModel.memberTypeName = label;
    this.memberTypeName = label;
    const admissionNumber = filteredItem.label.split(' - ');
    let admissionNumberLable = parts[parts.length - 2].trim();
    this.admisionNumber = admissionNumberLable;
    // this.membershipBasicRequiredDetailsModel.admissionNumber = admissionNumberLable;
    // this.siLoanCommunicationModel.admissionNumber = admissionNo;
    if (this.membershipBasicRequiredDetailsModel.memberTypeName == "Individual") {
      this.individualFlag = true;
      this.groupFlag = false;
      this.institutionFlag = false;
      this.getMemberDetailsByMemberId(admissionNo);
    } else if (this.membershipBasicRequiredDetailsModel.memberTypeName == "Group") {
      this.groupFlag = true;
      this.institutionFlag = false;
      this.individualFlag = false;
      this.getGroupDetailsById(admissionNo);
    }
    else if (this.membershipBasicRequiredDetailsModel.memberTypeName == "Institution") {
      this.institutionFlag = true;
      this.individualFlag = false;
      this.groupFlag = false;
      this.getInstitutionDetailsById(admissionNo);
    }
  }

  //get member individaul details
  getMemberDetailsById(memberId: any) {
    this.siLoanApplicationService.getMemberByAdmissionNumber(memberId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] == null && this.responseModel.data[0] == undefined) {
          this.siLoanApplicationService.getInstitutionDetailsByAdmissionNumber(memberId).subscribe((data: any) => {
            this.responseModel = data;
            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data[0] == null && this.responseModel.data[0] != undefined) {
                this.siLoanApplicationService.getGroupByAdmissionNumber(memberId).subscribe((data: any) => {
                  this.responseModel = data;
                  if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
                    if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {

                    }
                  }
                });
              }
            }
          });
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

  //get member institution details
  getInstitutionDetailsById(admissionNumber: any) {
    this.membershipServiceService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipInstitutionDetailsModel = this.responseModel.data[0];
          this.membershipInstitutionDetailsModel.institutionCommunicationDTOList = this.responseModel.data[0].institutionCommunicationDTOList;
          this.membershipBasicRequiredDetailsModel.membershipInstitutionDetailsModel = this.membershipInstitutionDetailsModel;
          this.membershipBasicRequiredDetailsModel.memberShipCommunicationDetailsDTOList = this.membershipInstitutionDetailsModel.institutionCommunicationDTOList;
          this.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
          this.siLoanApplicationModel.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
          this.siLoanApplicationModel.memberInstitutionDTO = this.membershipInstitutionDetailsModel;
          this.siLoanCommuncationDetailsSet(this.responseModel.data[0].institutionCommunicationDTOList[0]);
          this.updateData();
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

  //get group details
  getGroupDetailsById(admissionNUmber: any) {
    this.membershipServiceService.getMemberGroupByAdmissionNumber(admissionNUmber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memberGroupDetailsModel = this.responseModel.data[0];
          this.memberGroupDetailsModel.groupCommunicationList = this.responseModel.data[0].groupCommunicationList;
          this.membershipBasicRequiredDetailsModel.memberGroupDetailsModel = this.memberGroupDetailsModel;
          this.membershipBasicRequiredDetailsModel.memberShipCommunicationDetailsDTOList = this.memberGroupDetailsModel.groupCommunicationList;

          this.memberTypeName = this.responseModel.data[0].memberTypeName;
          if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
            this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
          }
          if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
            this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          this.siLoanApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
          this.siLoanApplicationModel.memberGroupDetailsDTO = this.memberGroupDetailsModel;
          this.updateData();
          this.siLoanCommuncationDetailsSet(this.memberGroupDetailsModel.groupCommunicationList[0]);
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

  //member module data by member id
  getMemberDetailsByMemberId(admissionNumber: any) {
    this.membershipServiceService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipBasicRequiredDetailsModel = this.responseModel.data[0];
          this.membershipBasicRequiredDetailsModel.memberShipCommunicationDetailsDTOList = this.responseModel.data[0].memberShipCommunicationDetailsDTOList;

          if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined) {
            this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined) {
            this.membershipBasicRequiredDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          this.siLoanApplicationModel.memberTypeName = this.membershipBasicRequiredDetailsModel.memberTypeName;
          this.siLoanApplicationModel.individualMemberDetailsDTO = this.membershipBasicRequiredDetailsModel;
          this.updateData();
          this.siLoanCommuncationDetailsSet(this.membershipBasicRequiredDetailsModel.memberShipCommunicationDetailsDTOList[0]);
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

  siLoanCommuncationDetailsSet(obj: any) {
    this.siLoanCommunicationModel.admissionNumber = obj.admissionNumber;
    this.siLoanCommunicationModel.stateId = obj.permanentStateId;
    this.siLoanCommunicationModel.districtId = obj.permanentDistrictId;
    this.siLoanCommunicationModel.subDistrictId = obj.permanentSubDistrictId;
    this.siLoanCommunicationModel.villageId = obj.permanentVillageId;
    this.siLoanCommunicationModel.address1 = obj.permanentAddress1;
    this.siLoanCommunicationModel.pinCode = obj.permanentPinCode;

    this.siLoanCommunicationModel.permanentStateId = obj.stateId;
    this.siLoanCommunicationModel.permanentDistrictId = obj.districtId;
    this.siLoanCommunicationModel.permanentSubDistrictId = obj.subDistrictId;
    this.siLoanCommunicationModel.permanentVillageId = obj.villageId;
    this.siLoanCommunicationModel.permanentAddress1 = obj.address1;
    this.siLoanCommunicationModel.permanentPinCode = obj.pinCode;
    this.membershipBasicRequiredDetailsModel.memberShipCommunicationDetailsDTOList[0] = this.siLoanCommunicationModel;
    this.updateData();
  }

  membershipDataFromLoanModule() {
    if (this.memberTypeName == "Individual") {
      this.individualFlag = true;
      this.getMemberDetailsByAdmissionNumber(this.admisionNumber);
    } else if (this.memberTypeName == "Group") {
      this.groupFlag = true;
      this.getGroupByAdmissionNumber(this.admisionNumber);
    } else if (this.memberTypeName == "Institution") {
      this.institutionFlag = true;
      this.getInstitutionByAdmissionNumber(this.admisionNumber);
    }
  }

}
