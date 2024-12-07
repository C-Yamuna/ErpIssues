import { SiLoanApplication } from './../../../shared/si-loans/si-loan-application.model';
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SiLoanApplicationService } from '../../../shared/si-loans/si-loan-application.service';
import { Table } from 'primeng/table';
import { promoterDetailsModel } from 'src/app/transcations/membership-transcation/shared/member-group-details-model';
import { MembershipBasicRequiredDetails, MemberGroupDetailsModel, MembershipInstitutionDetailsModel } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { MembershipServiceService } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-service.service';
import { InstitutionPromoterDetailsModel } from '../../../sao/sao-stepper/membership-basic-details/shared/membership-basic-details.model';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Component({
  selector: 'app-si-loan-membership-details',
  templateUrl: './si-loan-membership-details.component.html',
  styleUrls: ['./si-loan-membership-details.component.css']
})
export class SiLoanMembershipDetailsComponent {

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

  communityList: any[] = [];
  relationTypesList: any[] = [];
  occupationTypeList: any[] = [];
  qualificationTypesList: any[] = [];
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
  individualFlag: boolean = true;
  groupFlag: boolean = false;
  institutionFlag: boolean = false;
  isDisableFlag: boolean = true;
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
  age: any;

  @ViewChild('dt', { static: false }) private dt!: Table;
  @ViewChild('cv', { static: false }) private cv!: Table;

  msgs: any[] = [];
  operatorTypeList: any[] = [];
  admisionNumber: any;
  pacsId: any;
  branchId: any;
  allTypesOfmembershipList: any;
  permenentAllTypesOfmembershipList: any;
  loanAccId: any;
  multipleFilesList: any;
  uploadFileData: any;
  isFileUploaded: any;;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe,
    private membershipServiceService: MembershipServiceService, private fileUploadService: FileUploadService,
    private siLoanApplicationService: SiLoanApplicationService) {

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
      qualification: [''],
      community: [''],
      caste: [''],
      email: ['', Validators.pattern(applicationConstants.EMAIL_PATTERN)],
      admissionDate: [''],
      isStaff: [''],
      fileUpload: [''],
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
      surname: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      name: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      operatorTypeId: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      genderId: ['', Validators.required],
      martialId: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      aadharNumber: ['', Validators.required],
      emailId: ['', Validators.required],
      startDate: ['', Validators.required],
    })
  }

  ngOnInit(): void {

    this.membershipBasicRequiredDetailsModel.filesDTOList = [];
    this.pacsId = 1;
    this.branchId = 1;
    this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.maritalStatusList = this.commonComponent.maritalStatusList();

    this.genderList = [
      { label: 'Male', value: 1 },
      { label: 'Female', value: 2 },
    ]
    this.maritalstatusList = [
      { label: 'Married', value: 1 },
      { label: 'Un-Married', value: 2 }
    ]

    this.getAllMemberType();
    this.getAllRelationTypes();
    // this.getAllOperatorTypes();
    this.getAllOccupationTypes();
    this.getAllQualificationType();
    this.getAllCommunityTypes();
    this.getCastesList();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.loanAccId = this.encryptDecryptService.decrypt(params['id']);
        this.getSILoanApplicationById(this.loanAccId);
        this.isEdit = true;
      } else if (params['isMemberCreation'] != undefined) {
        this.isEdit = false;
      } else {
        let val = this.commonFunctionsService.getStorageValue('b-class-member_creation');
        this.isEdit = false;
        this.memberFormReset(val);
        this.updateData();
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

  }

  getSILoanApplicationById(id: any) {
    this.siLoanApplicationService.getSILoanApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siLoanApplicationModel = this.responseModel.data[0];

              this.admisionNumber = this.siLoanApplicationModel.admissionNo;
              this.memberTypeId = this.siLoanApplicationModel.memberTypeId;
              this.memberTypeName = this.siLoanApplicationModel.memberTypeName;
              this.age = this.siLoanApplicationModel.individualMemberDetailsDTO.age;

              if (this.siLoanApplicationModel.individualMemberDetailsDTO != null && this.siLoanApplicationModel.individualMemberDetailsDTO != undefined) {
                this.membershipBasicRequiredDetailsModel = this.siLoanApplicationModel.individualMemberDetailsDTO;

                if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined)
                  this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);

                if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined)
                  this.membershipBasicRequiredDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

                if (this.membershipBasicRequiredDetailsModel.photoCopyPath != null && this.membershipBasicRequiredDetailsModel.photoCopyPath != undefined) {
                  this.membershipBasicRequiredDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.photoCopyPath, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.photoCopyPath);
                }
                if (this.membershipBasicRequiredDetailsModel.signatureCopyPath != null && this.membershipBasicRequiredDetailsModel.signatureCopyPath != undefined) {
                  this.membershipBasicRequiredDetailsModel.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.signatureCopyPath, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.signatureCopyPath);
                }

                this.individualFlag = true;
                this.groupFlag = false;
                this.institutionFlag = false;
                this.isMemberCreation = this.membershipBasicRequiredDetailsModel.isNewMember;
                this.admisionNumber = this.siLoanApplicationModel.admissionNo;
              }
              if (this.siLoanApplicationModel.memberGroupDetailsDTO != null && this.siLoanApplicationModel.memberGroupDetailsDTO != undefined) {
                this.memberGroupDetailsModel = this.siLoanApplicationModel.memberGroupDetailsDTO;

                if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined)
                  this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);

                if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined)
                  this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

                this.individualFlag = false;
                this.groupFlag = true;
                this.institutionFlag = false;
                this.isMemberCreation = this.memberGroupDetailsModel.isNewMember;
                this.admisionNumber = this.siLoanApplicationModel.admissionNo;
              }
              if (this.siLoanApplicationModel.memberInstitutionDTO != null && this.siLoanApplicationModel.memberInstitutionDTO != undefined) {
                this.membershipInstitutionDetailsModel = this.siLoanApplicationModel.memberInstitutionDTO;

                if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined)
                  this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);

                if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined)
                  this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

                this.individualFlag = false;
                this.groupFlag = false;
                this.institutionFlag = true;
                this.isMemberCreation = this.membershipInstitutionDetailsModel.isNewMember;
                this.admisionNumber = this.siLoanApplicationModel.admissionNo;
              }
            this.updateData();
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

    this.siLoanApplicationModel.memberTypeId = this.memberTypeId;
    if (this.memberTypeName == "Individual") {
      this.individualFlag = true;
      this.isDisableFlag = (!this.memberCreationForm.valid)
      this.siLoanApplicationModel.memberTypeName = this.memberTypeName;
      this.membershipBasicRequiredDetailsModel.memberTypeName = this.memberTypeName;
      this.membershipBasicRequiredDetailsModel.isNewMember = this.isMemberCreation;
      this.siLoanApplicationModel.individualMemberDetailsDTO = this.membershipBasicRequiredDetailsModel;
    } else if (this.memberTypeName == "Group") {
      this.groupFlag = true;
      this.isDisableFlag = (!this.groupForm.valid)
      this.memberGroupDetailsModel.memberTypeId = this.memberTypeId;
      this.memberGroupDetailsModel.memberTypeName = this.memberTypeName;
      this.memberGroupDetailsModel.isNewMember = this.isMemberCreation;
      this.siLoanApplicationModel.memberTypeName = this.memberTypeName;
      this.siLoanApplicationModel.memberGroupDetailsDTO = this.memberGroupDetailsModel;
    } else if (this.memberTypeName == "Institution") {
      this.institutionFlag = true;
      this.isDisableFlag = (!this.institutionForm.valid)
      this.membershipInstitutionDetailsModel.memberTypeId = this.memberTypeId;
      this.membershipInstitutionDetailsModel.memberTypeName = this.memberTypeName;
      this.membershipInstitutionDetailsModel.isNewMember = this.isMemberCreation;
      this.siLoanApplicationModel.memberTypeName = this.memberTypeName;
      this.siLoanApplicationModel.memberInstitutionDTO = this.membershipInstitutionDetailsModel;
    }
    this.siLoanApplicationService.changeData({
      formValid: this.memberCreationForm.valid ? true : false || this.institutionForm.valid ? true : false || this.memberCreationForm.valid ? true : false,
      data: this.siLoanApplicationModel,
      isDisable: this.isDisableFlag,
      stepperIndex: 0,
    });

    // this.updateData();
  }

  //stepper data save
  save() {
    this.updateData();
  }

  getAllMemberType() {
    this.membershipServiceService.getAllMemberTypes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memberTypeList = this.responseModel.data;
          this.memberTypeList = this.memberTypeList.filter((obj: any) => obj != null).map((memberType: { name: any; id: any; }) => {
            return { label: memberType.name, value: memberType.id };
          });
        }
        const filteredItem = this.memberTypeList.find((item: { value: any; }) => item.value === this.memberTypeId);
        if (filteredItem != null && filteredItem != undefined && filteredItem.label != null && filteredItem.label != undefined) {
          this.memberTypeName = filteredItem.label;
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

  //for relation Types
  getAllRelationTypes() {
    this.siLoanApplicationService.getAllRelationTypes().subscribe((res: any) => {
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
    this.siLoanApplicationService.getAllOccupationTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.occupationTypeList = this.responseModel.data;
        this.occupationTypeList = this.occupationTypeList.filter((obj: any) => obj != null).map((occupationType: { name: any; id: any; }) => {
          return { label: occupationType.name, value: occupationType.id };
        });
      }
    });
  }

  //qualifications List
  getAllQualificationType() {
    
    this.siLoanApplicationService.getQualificationTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.qualificationTypesList = this.responseModel.data;
        this.qualificationTypesList = this.qualificationTypesList.filter((obj: any) => obj != null).map((qualificationType: { name: any; id: any; }) => {
          return { label: qualificationType.name, value: qualificationType.id };
        });
      }
    });
  }

  // Community List
  getAllCommunityTypes() {
    
    this.siLoanApplicationService.getAllCommunityTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.communityList = this.responseModel.data;
        this.communityList = this.communityList.filter((obj: any) => obj != null).map((community: { name: any; id: any; }) => {
          return { label: community.name, value: community.id };
        });
      }
    });
  }

  //castes List
  getCastesList() {
    this.siLoanApplicationService.getCastes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.castesList = this.responseModel.data;
        this.castesList = this.castesList.filter((obj: any) => obj != null).map((caste: { name: any; id: any; }) => {
          return { label: caste.name, value: caste.id };
        });
      }
    });
  }

  getAllOperatorTypes() {
    this.commonComponent.startSpinner();
    this.siLoanApplicationService.getAllOperationTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        this.operatorTypeList = this.responseModel.data.filter((operationType: any) => operationType.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });
        let operationType = this.operatorTypeList.find((data: any) => null != data && data.value == this.promoterDetailsModel.operatorTypeId);
        if (operationType != null && undefined != operationType)
          this.promoterDetailsModel.operatorTypeName = operationType.label;
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
            if (this.membershipBasicRequiredDetailsModel.memberTypeId != undefined && this.membershipBasicRequiredDetailsModel.memberTypeId) {
              this.memberTypeId = this.membershipBasicRequiredDetailsModel.memberTypeId;
            }
            if (this.membershipBasicRequiredDetailsModel.photoCopyPath != null && this.membershipBasicRequiredDetailsModel.photoCopyPath != undefined) {
              this.membershipBasicRequiredDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.photoCopyPath, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.photoCopyPath);
            }
            if (this.membershipBasicRequiredDetailsModel.signatureCopyPath != null && this.membershipBasicRequiredDetailsModel.signatureCopyPath != undefined) {
              this.membershipBasicRequiredDetailsModel.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetailsModel.signatureCopyPath, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetailsModel.signatureCopyPath);
            }
            this.siLoanApplicationModel.individualMemberDetailsDTO = this.membershipBasicRequiredDetailsModel;
            this.siLoanApplicationModel.memberTypeName = this.membershipBasicRequiredDetailsModel.memberTypeName;
            this.updateData();
            this.disableMemberType = true;
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

  getGroupByAdmissionNumber(admissionNumber: any) {
    this.siLoanApplicationService.getGroupByAdmissionNumber(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.memberGroupDetailsModel = this.responseModel.data[0];

            if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined)
              this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDateVal, this.orgnizationSetting.datePipe);

            if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined)
              this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

            if (this.memberGroupDetailsModel.memberTypeId != null && this.memberGroupDetailsModel.memberTypeId != undefined)
              this.memberTypeId = this.memberGroupDetailsModel.memberTypeId;

            if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined && this.memberGroupDetailsModel.groupPromoterList.length > 0) {
              this.promoterDetails = this.memberGroupDetailsModel.groupPromoterList.map((member: any) => {
                if (member != null && member != undefined) {
                  if (member.dob != null && member.dob != undefined)
                    member.memDobVal = this.datePipe.transform(member.dob, this.orgnizationSetting.datePipe);

                  if (member.startDate != null && member.startDate != undefined)
                    member.startDateVal = this.datePipe.transform(member.startDate, this.orgnizationSetting.datePipe);

                }
                return member;
              });
              if (this.memberGroupDetailsModel.memberTypeName != null && this.memberGroupDetailsModel.memberTypeName != undefined)
                this.siLoanApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;

              if (this.memberGroupDetailsModel != null && this.memberGroupDetailsModel != undefined)
                this.siLoanApplicationModel.memberGroupDetailsDTO = this.memberGroupDetailsModel;

            }
            this.updateData();
            this.disableMemberType = true;
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

  getInstitutionByAdmissionNumber(admissionNumber: any) {
    this.siLoanApplicationService.getInstitutionDetailsByAdmissionNumber(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipInstitutionDetailsModel = this.responseModel.data[0];

            if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined)
              this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDateVal, this.orgnizationSetting.datePipe);

            if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined)
              this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

            if (this.membershipInstitutionDetailsModel.memberTypeId != null && this.membershipInstitutionDetailsModel.memberTypeId != undefined)
              this.memberTypeId = this.memberTypeId;

            if (this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0)
              this.institutionPromoter = this.membershipInstitutionDetailsModel.institutionPromoterList;

            this.siLoanApplicationModel.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
            this.siLoanApplicationModel.memberInstitutionDTO = this.membershipInstitutionDetailsModel;
            this.updateData();
            this.disableMemberType = true;
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
      this.memberGroupDetailsModel.memberTypeId = 2;
    }
    else if (event.value == 3) {
      this.institutionFlag = true;
      this.individualFlag = false;
      this.groupFlag = false;
      this.membershipInstitutionDetailsModel.memberTypeId = 3;
    }
    this.updateData();
  }

  savePromoterDetails(rowData: any) {
    rowData.pacsId = 1;
    rowData.dob = this.commonFunctionsService.getUTCEpochWithTime(rowData.memDobVal);
    if (rowData.dob != null && rowData.dob != undefined) {
      rowData.memDobVal = this.datePipe.transform(rowData.dob);
    }
    rowData.startDate = this.commonFunctionsService.getUTCEpochWithTime(rowData.startDateVal);
    if (rowData.startDate != null && rowData.startDate != undefined) {
      rowData.startDateVal = this.datePipe.transform(rowData.startDate);
    }
    this.addButton = false;
    this.EditDeleteDisable = false;
    if (!this.memberGroupDetailsModel.groupPromotersDTOList) {
      this.memberGroupDetailsModel.groupPromotersDTOList = []; // Initialize it as an empty array
    }
    if (this.promoterDetails != null && this.promoterDetails != undefined && this.promoterDetails.length > 0) {
      const kyc = this.promoterDetails.find((obj: any) => (obj != null && obj != undefined) && obj.uniqueId === rowData.uniqueId);
      this.promoterDetails[kyc] = null;
      this.promoterDetails[kyc] = rowData;
      this.memberGroupDetailsModel.groupPromotersDTOList = this.promoterDetails.map((x: any) => Object.assign({}, x));
    }
    this.updateData();
  }

  cancelPromoter() {
    this.addButton = false;
    this.EditDeleteDisable = false;
  }

  addNewEntry() {
    this.newRow = { uniqueId: this.promoterDetails.length + 1, surname: '', name: '', operatorTypeId: '', dob: '', age: '', genderId: '', martialId: '', mobileNumber: '', emailId: '', aadharNumber: '', startDate: '' }

  }

  editPromoter(row: any) {
    this.addButton = true;
    this.EditDeleteDisable = true;
  }

  onRowEditSave() {
    this.promoterDetailsModel = new promoterDetailsModel();
    this.addNewEntry();
    this.EditDeleteDisable = true;
    this.addButton = true;
    this.dt._first = 0;
    this.dt.value.unshift(this.newRow);
    this.dt.initRowEdit(this.dt.value[0]);
  }

  saveInstitutionPromoterDetails(rowData: any) {
    rowData.pacsId = 1;
    this.addButton = false;
    this.EditDeleteDisable = false;
    if (!this.membershipInstitutionDetailsModel.institutionPromoterList) {
      this.membershipInstitutionDetailsModel.institutionPromoterList = []; // Initialize it as an empty array
    }
    if (this.institutionPromoter != null && this.institutionPromoter != undefined && this.institutionPromoter.length > 0) {
      const kyc = this.institutionPromoter.find((obj: any) => (obj != null && obj != undefined) && obj.uniqueId === rowData.uniqueId);
      this.institutionPromoter[kyc] = null;
      this.institutionPromoter[kyc] = rowData;
      this.membershipInstitutionDetailsModel.institutionPromoterList = this.institutionPromoter.map((x: any) => Object.assign({}, x));
    }
    this.updateData();
  }

  cancelInstitutionPromoter() {
    this.addButton = false;
    this.EditDeleteDisable = false;
  }

  addForInstitutionNewEntry() {
    this.newRow = { uniqueId: this.institutionPromoter.length + 1, surname: '', name: '', operatorTypeId: '', dob: '', age: '', genderId: '', martialId: '', mobileNumber: '', emailId: '', aadharNumber: '', startDate: '' }
  }

  editInstitutionPromoter(row: any) {
    this.addButton = true;
    this.EditDeleteDisable = true;
  }

  onRowAddInstitution() {
    this.institutionPromoterDetailsModel = new InstitutionPromoterDetailsModel();
    this.addForInstitutionNewEntry();
    this.EditDeleteDisable = true;
    this.addButton = true;
    this.dt._first = 0;
    this.dt.value.unshift(this.newRow);
    this.dt.initRowEdit(this.dt.value[0]);
  }

  fileUploader(event: any, fileUpload: FileUpload, filePathName: any) {
    this.membershipBasicRequiredDetailsModel.filesDTOList = [];
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    let files: FileUploadModel = new FileUploadModel();
    for (let file of event.files) {
      let reader = new FileReader();
      reader.onloadend = (e) => {
        let files = new FileUploadModel();
        this.uploadFileData = e.currentTarget;
        files.fileName = file.name;
        files.fileType = file.type.split('/')[1];
        files.value = this.uploadFileData.result.split(',')[1];
        files.imageValue = this.uploadFileData.result;
        this.multipleFilesList.push(files);
        this.membershipBasicRequiredDetailsModel.filesDTOList.push(files); // Add to filesDTOList array
        let timeStamp = this.commonComponent.getTimeStamp();
        if (filePathName === "individualPhotoCopy") {
          this.membershipBasicRequiredDetailsModel.photoCopyPath = null;

          this.membershipBasicRequiredDetailsModel.filesDTOList[this.membershipBasicRequiredDetailsModel.filesDTOList.length - 1].fileName = "Individual_Member_Photo_copy" + "_" + timeStamp + "_" + file.name;
          this.membershipBasicRequiredDetailsModel.photoCopyPath = "Individual_Member_Photo_copy" + "_" + timeStamp + "_" + file.name; // This will set the last file's name as docPath
        }
        if (filePathName === "individualSighnedCopy") {
          this.membershipBasicRequiredDetailsModel.signatureCopyPath = null;
          this.membershipBasicRequiredDetailsModel.filesDTOList[this.membershipBasicRequiredDetailsModel.filesDTOList.length - 1].fileName = "Individual_Member_signed_copy" + "_" + timeStamp + "_" + file.name;
          this.membershipBasicRequiredDetailsModel.signatureCopyPath = "Individual_Member_signed_copy" + "_" + timeStamp + "_" + file.name; // This will set the last file's name as docPath
        }
        // let index1 = event.files.findIndex((x: any) => x === file);
        // fileUpload.remove(event, index1);
        // fileUpload.clear();
        this.updateData();
      }
      reader.readAsDataURL(file);
    }
  }

  fileRemoveEvent(fileName: any) {
    if (fileName == "individualPhotoCopy") {
      if (this.membershipBasicRequiredDetailsModel.filesDTOList != null && this.membershipBasicRequiredDetailsModel.filesDTOList != undefined && this.membershipBasicRequiredDetailsModel.filesDTOList.length > 0) {
        let removeFileIndex = this.membershipBasicRequiredDetailsModel.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.membershipBasicRequiredDetailsModel.photoCopyPath);
        let obj = this.membershipBasicRequiredDetailsModel.filesDTOList.find((obj: any) => obj && obj.fileName === this.membershipBasicRequiredDetailsModel.photoCopyPath);
        this.membershipBasicRequiredDetailsModel.filesDTOList.splice(removeFileIndex, obj);
        this.membershipBasicRequiredDetailsModel.photoCopyPath = null;
      }
      if (fileName == "individualSighnedCopy") {
        let removeFileIndex = this.membershipBasicRequiredDetailsModel.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.membershipBasicRequiredDetailsModel.signatureCopyPath);
        let obj = this.membershipBasicRequiredDetailsModel.filesDTOList.find((obj: any) => obj && obj.fileName === this.membershipBasicRequiredDetailsModel.signatureCopyPath);
        this.membershipBasicRequiredDetailsModel.filesDTOList.splice(removeFileIndex, obj);
        this.membershipBasicRequiredDetailsModel.signatureCopyPath = null;
      }
    }
  }

  dateConverstion() {
    if (this.memberGroupDetailsModel != null && this.memberGroupDetailsModel != undefined) {
      if (this.memberGroupDetailsModel.admissionDateVal != null && this.memberGroupDetailsModel.admissionDateVal != undefined)
        this.memberGroupDetailsModel.admissionDate = this.commonFunctionsService.getUTCEpochWithTime(this.memberGroupDetailsModel.admissionDateVal);

      if (this.memberGroupDetailsModel.registrationDateVal != null && this.memberGroupDetailsModel.registrationDateVal != undefined)
        this.memberGroupDetailsModel.registrationDate = this.commonFunctionsService.getUTCEpochWithTime(this.memberGroupDetailsModel.registrationDateVal);
    }
    if (this.membershipBasicRequiredDetailsModel != null && this.membershipBasicRequiredDetailsModel != undefined) {
      if (this.membershipBasicRequiredDetailsModel.admissionDateVal != null && this.membershipBasicRequiredDetailsModel.admissionDateVal != undefined)
        this.membershipBasicRequiredDetailsModel.admissionDate = this.commonFunctionsService.getUTCEpochWithTime(this.membershipBasicRequiredDetailsModel.admissionDateVal);

      if (this.membershipBasicRequiredDetailsModel.dobVal != null && this.membershipBasicRequiredDetailsModel.dobVal != undefined)
        this.membershipBasicRequiredDetailsModel.dob = this.commonFunctionsService.getUTCEpochWithTime(this.membershipBasicRequiredDetailsModel.dobVal);
    }
    if (this.membershipInstitutionDetailsModel != null && this.membershipInstitutionDetailsModel != undefined) {
      if (this.membershipInstitutionDetailsModel.admissionDateVal != null && this.membershipInstitutionDetailsModel.admissionDateVal != undefined)
        this.membershipInstitutionDetailsModel.admissionDate = this.commonFunctionsService.getUTCEpochWithTime(this.membershipInstitutionDetailsModel.admissionDateVal);

      if (this.membershipInstitutionDetailsModel.registrationDateVal != null && this.membershipInstitutionDetailsModel.registrationDateVal != undefined)
        this.membershipInstitutionDetailsModel.registrationDate = this.commonFunctionsService.getUTCEpochWithTime(this.membershipInstitutionDetailsModel.registrationDateVal);
    }
    this.updateData();
  }

  onChangeGender(event: any) {
    let filteredObj = this.genderList.find((data: any) => null != data && event != null && data.value == event);
    if (filteredObj != null && undefined != filteredObj)
      this.membershipBasicRequiredDetailsModel.genderName = filteredObj.label;
  }

  onChangeQualification(event: any) {
    let filteredObj = this.qualificationTypesList.find((data: any) => null != data && event != null && data.value == event);
    if (filteredObj != null && undefined != filteredObj)
      this.membershipBasicRequiredDetailsModel.qualificationName = filteredObj.label;
  }

  onChangeOccupation(event: any) {
    let filteredObj = this.occupationTypeList.find((data: any) => null != data && event != null && data.value == event);
    if (filteredObj != null && undefined != filteredObj)
      this.membershipBasicRequiredDetailsModel.occupationName = filteredObj.label;
  }

  onChangeCaste(event: any) {
    let filteredObj = this.castesList.find((data: any) => null != data && event != null && data.value == event);
    if (filteredObj != null && undefined != filteredObj)
      this.membershipBasicRequiredDetailsModel.casteName = filteredObj.label;
  }

  onChangeRlationWithMember(event: any) {
    let filteredObj = this.relationTypesList.find((data: any) => null != data && event != null && data.value == event);
    if (filteredObj != null && undefined != filteredObj)
      this.membershipBasicRequiredDetailsModel.relationTypeName = filteredObj.label;
  }

  onChangeCommunity(event: any) {
    let filteredObj = this.communityList.find((data: any) => null != data && event != null && data.value == event);
    if (filteredObj != null && undefined != filteredObj)
      this.membershipBasicRequiredDetailsModel.communityName = filteredObj.label;
  }

}


