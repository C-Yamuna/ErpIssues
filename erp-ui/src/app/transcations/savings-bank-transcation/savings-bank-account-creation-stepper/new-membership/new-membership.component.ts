import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { InstitutionPromoterDetailsModel, MemberGroupDetailsModel, MembershipBasicRequiredDetails, MembershipInstitutionDetailsModel, promoterDetailsModel } from '../membership-basic-required-details/shared/membership-basic-required-details';
import { SavingBankApplicationModel } from '../savings-bank-application/shared/saving-bank-application-model';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SavingBankApplicationService } from '../savings-bank-application/shared/saving-bank-application.service';
import { SavingsBankCommunicationService } from '../savings-bank-communication/shared/savings-bank-communication.service';
import { MembershipServiceService } from '../membership-basic-required-details/shared/membership-service.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-new-membership',
  templateUrl: './new-membership.component.html',
  styleUrls: ['./new-membership.component.css']
})
export class NewMembershipComponent {

  memberCreationForm: FormGroup;
  groupForm: FormGroup;
  institutionForm: FormGroup;
  applicationList: any[] = [];
  accountList: any[] = [];
  genderList: any[] = [];
  maritalstatusList: any[] = [];
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  promoterDetailsModel: promoterDetailsModel = new promoterDetailsModel();
  institutionPromoterDetailsModel: InstitutionPromoterDetailsModel = new InstitutionPromoterDetailsModel();
  savingBankApplicationModel: SavingBankApplicationModel = new SavingBankApplicationModel();

  relationTypesList: any[] = [];
  occupationTypeList: any[] = [];
  qualificationTypes: any[] = [];
  admissionNumberList: any[] = [];
  castesList: any[] = [];
  checked: Boolean = false;
  showForm: Boolean = false;
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

  @ViewChild('dt', { static: false }) private dt!: Table;
  @ViewChild('dt1', { static: false }) private dt1!: Table;
  @ViewChild('cv', { static: false }) private cv!: Table;

  msgs: any[] = [];
  operatorTypeList: any[] = [];
  admisionNumber: any;
  communicationForm: any;
  pacsId: any;
  branchId: any;
  allTypesOfmembershipList: any;
  permenentAllTypesOfmembershipList: any;
  sbAccId: any;
  multipleFilesList: any;
  uploadFileData: any;
  isFileUploaded: any;;

  cancleButtonFlag : Boolean = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private savingBankApplicationService: SavingBankApplicationService, private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe, private savingsBankCommunicationService: SavingsBankCommunicationService, private membershipServiceService: MembershipServiceService , private fileUploadService :FileUploadService) {
    this.memberCreationForm = this.formBuilder.group({
      surName: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      name: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      age: ['', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY), Validators.compose([Validators.required])]],
      maritalStatus: ['', Validators.required],
      relationWithMember: [''],
      relationName: [''],
      aadharNumber: ['', [Validators.pattern(applicationConstants.AADHAR_PATTERN), Validators.compose([Validators.required])]],
      panNumber: ['', [Validators.pattern(applicationConstants.PAN_NUMBER_PATTERN), Validators.compose([Validators.required])]],
      mobileNumber: ['', [Validators.pattern(applicationConstants.MOBILE_PATTERN), Validators.compose([Validators.required])]],
      occupation: [''],
      quslification: [''],
      caste: [''],
      email: ['', [Validators.pattern(applicationConstants.EMAIL_PATTERN), Validators.compose([Validators.required])]],
      admissionDate: [''],
      isStaff: [''],
      fileUpload:[''],
    })
    this.groupForm = this.formBuilder.group({
      name: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      registrationNumber: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      registrationDate: ['', Validators.required],
      admissionDate: ['', Validators.required],
      // pocNumber: ['', Validators.required],
      mobileNumber: ['', [Validators.pattern(applicationConstants.MOBILE_PATTERN), Validators.compose([Validators.required])]],
      panNumber: ['', [Validators.pattern(applicationConstants.PAN_NUMBER_PATTERN), Validators.compose([Validators.required])]],
      tanNumber: ['', [Validators.pattern(applicationConstants.TAN_NUMBER), Validators.compose([Validators.required])]],
      gstNumber: ['', [Validators.pattern(applicationConstants.GST_NUMBER_PATTERN), Validators.compose([Validators.required])]],

    })
    this.institutionForm = this.formBuilder.group({
      name: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      registrationNumber: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      registrationDate: ['', Validators.required],
      admissionDate: ['', Validators.required],
      // pocName: ['', Validators.required],
      mobileNumber: ['', [Validators.pattern(applicationConstants.MOBILE_PATTERN), Validators.compose([Validators.required])]],
      panNumber: ['', [Validators.pattern(applicationConstants.PAN_NUMBER_PATTERN), Validators.compose([Validators.required])]],
      tanNumber: ['', [Validators.pattern(applicationConstants.TAN_NUMBER), Validators.compose([Validators.required])]],
      gstNumber: ['', [Validators.pattern(applicationConstants.GST_NUMBER_PATTERN), Validators.compose([Validators.required])]],
    })
    this.promoterDetailsForm = this.formBuilder.group({
      surname: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      name: ['', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS), Validators.compose([Validators.required])]],
      operatorTypeId: ['',],
      dob: ['', Validators.required],
      age: ['', [Validators.pattern(applicationConstants.ALLOW_NUMBERS), Validators.compose([Validators.required])]],
      genderId: ['', Validators.required],
      martialId: ['', Validators.required],
      mobileNumber: ['', [Validators.pattern(applicationConstants.MOBILE_PATTERN), Validators.compose([Validators.required])]],
      aadharNumber: ['', [Validators.pattern(applicationConstants.AADHAR_PATTERN), Validators.compose([Validators.required])]],
      emailId: ['', [Validators.pattern(applicationConstants.EMAIL_PATTERN), Validators.compose([Validators.required])]],
      startDate: ['', ],
    })
  }

  //author jyothi.naidana
  ngOnInit(): void {
    this.membershipBasicRequiredDetails.filesDTOList = [];
    this.pacsId = 1;
    this.branchId = 1;
    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
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
        this.sbAccId = this.encryptDecryptService.decrypt(params['id']);
        this.getSbAccountDetailsById(this.sbAccId);
        this.isEdit = true;
      }
      else {
        this.updateData();
        let val = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
        this.memberFormReset(val);

        if (!this.showForm) {
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


  }
  getSbAccountDetailsById(id: any) {
    this.savingBankApplicationService.getSbApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.admisionNumber = this.responseModel.data[0].admissionNumber;
              this.memberTypeName = this.responseModel.data[0].memberTypeName;
              this.memberTypeId = this.responseModel.data[0].memberTypeId;
              this.savingBankApplicationModel = this.responseModel.data[0];
              this.updateData();
              this.membershipDataFromSbModule();
            }
          }
        }
      }
    });
  }

  memberFormReset(flag: any) {
    if (flag) {
      this.memberCreationForm.reset();
      this.showForm = flag;
    }
    else {
      this.showForm = flag;
    }
  }
  //update data to main stepper component based on member type form validation
  //author jyothi.naidana
  updateData() {
    this.savingBankApplicationModel.memberTypeId = this.memberTypeId;
    if (this.memberTypeName == "Individual") {
      this.individualFlag = true;
      this.isDisableFlag = (!this.memberCreationForm.valid)
      this.savingBankApplicationModel.memberTypeName = this.memberTypeName;
      this.membershipBasicRequiredDetails.memberTypeName = this.memberTypeName;
      this.membershipBasicRequiredDetails.isNewMember = this.showForm;
      this.savingBankApplicationModel.memberShipBasicDetailsDTO = this.membershipBasicRequiredDetails;
    }
    if (this.memberTypeName == "Group") {
      this.groupFlag = true;
      this.isDisableFlag = (!this.groupForm.valid && this.memberGroupDetailsModel.groupPromoterList != null)
      this.memberGroupDetailsModel.memberTypeId = this.memberTypeId;
      this.memberGroupDetailsModel.memberTypeName = this.memberTypeName;
      this.memberGroupDetailsModel.isNewMember = this.showForm;
      this.savingBankApplicationModel.groupDetailsDTO = this.memberGroupDetailsModel;
      this.savingBankApplicationModel.memberTypeName = this.memberTypeName;
      this.savingBankApplicationModel.groupDetailsDTO = this.memberGroupDetailsModel;
    }
    if (this.memberTypeName == "Institution") {
      this.institutionFlag = true;
      this.isDisableFlag = (!this.institutionForm.valid)
      this.membershipInstitutionDetailsModel.memberTypeId = this.memberTypeId;
      this.membershipInstitutionDetailsModel.memberTypeName = this.memberTypeName;
      this.membershipInstitutionDetailsModel.isNewMember = this.showForm;
      this.savingBankApplicationModel.memberTypeName = this.memberTypeName;
      this.savingBankApplicationModel.institutionDTO = this.membershipInstitutionDetailsModel;
  }
    this.savingBankApplicationService.changeData({
      formValid: this.memberCreationForm.valid ? true : false || this.institutionForm.valid ? true : false || this.memberCreationForm.valid ? true : false,
      data: this.savingBankApplicationModel,
      isDisable: this.isDisableFlag,
      stepperIndex: 0,
    });
  }
  //stepper data save
  //@jyothi.naidana
  save() {
    this.updateData();
  }

  //for append relation name values
  //@jyothi.naidana
  onChangeRelationTypeChange(event: any) {
    const filteredItem = this.relationTypesList.find(item => item.value === event.value);
    this.membershipBasicRequiredDetails.relationTypeName = filteredItem.label;

  }
  //for relation Types
  //@jyothi.naidana
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
  //@jyothi.naidana
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
  //@jyothi.naidana
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
  //@jyothi.naidana
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

 
  //get member individual details
  //@jyothi.naidana
  getMemberDetailsByAdmissionNumber(admisionNumber: any) {
    this.savingBankApplicationService.getMemberByAdmissionNumber(admisionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipBasicRequiredDetails = this.responseModel.data[0];
            if (this.membershipBasicRequiredDetails.dob != null && this.membershipBasicRequiredDetails.dob != undefined) {
              this.membershipBasicRequiredDetails.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetails.dob, this.orgnizationSetting.datePipe);
            }
            if (this.membershipBasicRequiredDetails.admissionDate != null && this.membershipBasicRequiredDetails.admissionDate != undefined) {
              this.membershipBasicRequiredDetails.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetails.admissionDate, this.orgnizationSetting.datePipe);
            }
            if(this.membershipBasicRequiredDetails.memberTypeId != undefined && this.membershipBasicRequiredDetails.memberTypeId){
              this.memberTypeId = this.membershipBasicRequiredDetails.memberTypeId;
            }
            if (this.membershipBasicRequiredDetails.photoCopyPath != null && this.membershipBasicRequiredDetails.photoCopyPath != undefined) {
              this.membershipBasicRequiredDetails.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.photoCopyPath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.photoCopyPath  );
            }
            if (this.membershipBasicRequiredDetails.signatureCopyPath != null && this.membershipBasicRequiredDetails.signatureCopyPath != undefined) {
              this.membershipBasicRequiredDetails.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.signatureCopyPath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.signatureCopyPath  );
            }
            this.savingBankApplicationModel.memberShipBasicDetailsDTO = this.membershipBasicRequiredDetails;
            this.savingBankApplicationModel.memberTypeName = this.membershipBasicRequiredDetails.memberTypeName;
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
  //get group details
  //@jyothi.naidana
  getGroupByAdmissionNumber(admissionNumber: any) {
    this.savingBankApplicationService.getGroupByAdmissionNumber(admissionNumber).subscribe((response: any) => {
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
            if (this.memberGroupDetailsModel.memberTypeId != null && this.memberGroupDetailsModel.memberTypeId != undefined) {
              this.memberTypeId = this.memberGroupDetailsModel.memberTypeId;
            }
           
              if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined && this.memberGroupDetailsModel.groupPromoterList.length > 0) {
                this.promoterDetails = this.memberGroupDetailsModel.groupPromoterList;
                let i = 0;
                for( let groupPromoters of this.promoterDetails){
                  i = i+1;
                  groupPromoters.uniqueId = i;
                  if(groupPromoters.dob != null && groupPromoters.dob != undefined){
                    groupPromoters.memDobVal = this.datePipe.transform(groupPromoters.dob, this.orgnizationSetting.datePipe);
                  }
                  if(groupPromoters.startDate != null && groupPromoters.startDate != undefined){
                    groupPromoters.startDateVal = this.datePipe.transform(groupPromoters.startDate, this.orgnizationSetting.datePipe);
                  }
                  if(groupPromoters.genderId != null && groupPromoters.genderId != undefined){
                    let Obj = this.genderList.filter(obj => obj.value == groupPromoters.genderId);
                    if(Obj != null && Obj != undefined ){
                      groupPromoters.genderName = Obj[0].label ;
                    }
                  }
                }
              }
              if(this.memberGroupDetailsModel.memberTypeName != null && this.memberGroupDetailsModel.memberTypeName != undefined){
                this.savingBankApplicationModel.memberTypeName = this.memberGroupDetailsModel.memberTypeName;
              }
              if(this.memberGroupDetailsModel != null && this.memberGroupDetailsModel != undefined){
              this.savingBankApplicationModel.groupDetailsDTO = this.memberGroupDetailsModel;
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
  //get institution details
  //@jyothi.naidana
  getInstitutionByAdmissionNumber(admissionNumber: any) {
    this.savingBankApplicationService.getInstitutionDetailsByAdmissionNumber(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipInstitutionDetailsModel = this.responseModel.data[0];

            if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
              this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
            }
            if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
              this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
            }
            if(this.membershipInstitutionDetailsModel.memberTypeId != null && this.membershipInstitutionDetailsModel.memberTypeId != undefined){
              this.memberTypeId = this.memberTypeId;
            }
            if (this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0){
              this.institutionPromoter = this.membershipInstitutionDetailsModel.institutionPromoterList;
              let i = 0;
              for( let institution of this.institutionPromoter){
                i = i+1;
                institution.uniqueId = i;
                if(institution.dob != null && institution.dob != undefined){
                  institution.memDobVal = this.datePipe.transform(institution.dob, this.orgnizationSetting.datePipe);
                }
                if(institution.startDate != null && institution.startDate != undefined){
                  institution.startDateVal = this.datePipe.transform(institution.startDate, this.orgnizationSetting.datePipe);
                }
                if(institution.genderId != null && institution.genderId != undefined){
                  let Obj = this.genderList.filter(obj => obj.value == institution.genderId);
                  if(Obj != null && Obj != undefined ){
                    institution.genderName = Obj[0].label ;
                  }
                }
              }
            }
            this.savingBankApplicationModel.memberTypeName = this.membershipInstitutionDetailsModel.memberTypeName;
            this.savingBankApplicationModel.institutionDTO = this.membershipInstitutionDetailsModel;
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

  //on change Of memberType
  //@jyothi.naidana
  OnChangeMemberType(event: any) {
    const filteredItem = this.memberTypeList.find((item: { value: any; }) => item.value === event.value);
    this.memberTypeName = filteredItem.label;
    if (event.value == 1) {
      this.individualFlag = true;
      this.institutionFlag = false;
      this.groupFlag = false;
      this.membershipBasicRequiredDetails.memberTypeId = 1;
    }
    else if (event.value == 2) {
      this.addButton = false;
      this.EditDeleteDisable = false;
      this.groupFlag = true;
      this.individualFlag = false;
      this.institutionFlag = false;
      this.memberGroupDetailsModel.memberTypeId = 2;
    }
    else if (event.value == 3) {
      this.addButton = false;
      this.EditDeleteDisable = false;
      this.institutionFlag = true;
      this.individualFlag = false;
      this.groupFlag = false;
      this.membershipInstitutionDetailsModel.memberTypeId = 3;
    }
    this.updateData();
  }


  //save Promoters oF Group 
  //@jyothi.naidana
  savePromoterDetails(rowData: any) {
    rowData.pacsId = 1;
    this.addButton = false;
    this.EditDeleteDisable = false;
    if(rowData.memDobVal != null && rowData.memDobVal != undefined){
      rowData.dob = this.commonFunctionsService.getUTCEpoch(new Date(rowData.memDobVal) );
    }
    if (rowData.dob != null && rowData.dob != undefined) {
      rowData.memDobVal  = this.datePipe.transform(rowData.dob, this.orgnizationSetting.datePipe);
    }
    if(rowData.startDateVal != null && rowData.startDateVal != undefined){
      rowData.startDate = this.commonFunctionsService.getUTCEpoch(new Date(rowData.startDateVal) );
    }
    
    if (rowData.startDate != null && rowData.startDate != undefined) {
      rowData.startDateVal  = this.datePipe.transform(rowData.startDate, this.orgnizationSetting.datePipe);
    }
    if (!this.memberGroupDetailsModel.groupPromotersDTOList) {
      this.memberGroupDetailsModel.groupPromotersDTOList = []; // Initialize it as an empty array
    }
    let Object = this.operatorTypeList.find((obj:any)=>obj.value == rowData.operatorTypeId);
    if(Object != null && Object != undefined && Object.label != null && Object.label != undefined) {
      rowData.operatorTypeName = Object.label;
    }
    Object = this.genderList.find((obj:any)=>obj.value == rowData.genderId);
    if(Object != null && Object != undefined && Object.label != null && Object.label != undefined) {
      rowData.genderName = Object.label;
    }
    Object = this.maritalStatusList.find((obj:any)=>obj.value == rowData.martialId);
    if(Object != null && Object != undefined && Object.label != null && Object.label != undefined) {
      rowData.maritalStatusName = Object.label;
    }
    if(this.promoterDetails != null && this.promoterDetails != undefined && this.promoterDetails.length > 0 ){
      const kyc = this.promoterDetails.findIndex((obj:any) => (obj != null && obj != undefined ) && obj.uniqueId === rowData.uniqueId );
      this.promoterDetails[kyc] = null;
      this.promoterDetails[kyc] = rowData;
      this.memberGroupDetailsModel.groupPromoterList = this.promoterDetails;
    }
    this.updateData();
  }

  //inline cancle Promoters oF Group 
  //@jyothi.naidana
  cancelPromoter(falg:Boolean) {
    this.addButton = false;
    this.EditDeleteDisable = false;
    if ((!this.promoterDetailsForm.valid) || (falg && this.promoterDetailsForm.valid)) {
      this.promoterDetails.splice(0, 1);
  }
  this.promoterDetails;
  }
  //inline add new entry for group promoter
  //@jyothi.naidana
  addNewEntry() {
    this.newRow = { uniqueId: this.promoterDetails.length + 1, surname: '', name: '', operatorTypeId: '', dob: '', age: '', genderId: '', martialId: '', mobileNumber: '', emailId: '', aadharNumber: '', startDate: '' }

  }
  //inline edit for group promoter
  //@jyothi.naidana
  editPromoter(row: any) {
    this.cancleButtonFlag = false;
    this.addButton = true;
    this.EditDeleteDisable = true;
  }

  //inline edit for group promoter
  //@jyothi.naidana
  onRowEditSave() {
    this.cancleButtonFlag = true;
    let uniqueId = this.promoterDetails.length + 1;
    this.promoterDetailsModel = new promoterDetailsModel();
    // this.addNewEntry();
    this.EditDeleteDisable = true;
    this.addButton = true;
    this.dt._first = 0;
    this.dt.value.unshift({uniqueId : uniqueId});
    this.dt.initRowEdit(this.dt.value[0]);

  }
  //inline edit for operator details
  //@jyothi.naidana
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
  //@jyothi.naidana
  saveInstitutionPromoterDetails(rowData: any) {
    this.cancleButtonFlag = false
    rowData.pacsId = 1;
    this.addButton = false;
    this.EditDeleteDisable = false;
    if (!this.membershipInstitutionDetailsModel.institutionPromoterList) {
      this.membershipInstitutionDetailsModel.institutionPromoterList = []; // Initialize it as an empty array
    }
    if(this.institutionPromoter != null && this.institutionPromoter != undefined && this.institutionPromoter.length > 0){
      const kyc = this.institutionPromoter.findIndex((obj:any) => (obj != null && obj != undefined) && obj.uniqueId === rowData.uniqueId );
      this.institutionPromoter[kyc] = null;
      if(rowData.memDobVal != null && rowData.memDobVal != undefined){
        rowData.dob = this.commonFunctionsService.getUTCEpoch(new Date(rowData.memDobVal));
      } 
      if(rowData.startDateVal != null && rowData.startDateVal != undefined){
        rowData.startDate = this.commonFunctionsService.getUTCEpoch(new Date(rowData.startDateVal));
      }
      let Object = this.operatorTypeList.find((obj:any)=>obj.value == rowData.operatorTypeId);
      if(Object != null && Object != undefined && Object.label != null && Object.label != undefined) {
        rowData.operatorTypeName = Object.label;
      }
      this.institutionPromoter[kyc] = rowData;
      this.membershipInstitutionDetailsModel.institutionPromoterList = this.institutionPromoter;
      if(rowData.memDobVal != null && rowData.memDobVal != undefined){
        rowData.memDobVal = this.datePipe.transform(rowData.memDobVal, this.orgnizationSetting.datePipe);
      } 
      if(rowData.startDateVal != null && rowData.startDateVal != undefined){
        rowData.startDateVal = this.datePipe.transform(rowData.startDateVal, this.orgnizationSetting.datePipe);
      } 
     
    }
    this.updateData();
  }

  //inline cancle for institution promoters details
  //@jyothi.naidana
  cancelInstitutionPromoter(falg : Boolean) {
    this.addButton = false;
    this.EditDeleteDisable = false;
    if ((!this.promoterDetailsForm.valid) || (falg && this.promoterDetailsForm.valid)) {
        this.institutionPromoter.splice(0, 1);
    }
    this.institutionPromoter;
  }
  //inline add new row for institution promoters details
  //@jyothi.naidana
  addForInstitutionNewEntry() {
    this.newRow = { uniqueId: this.institutionPromoter.length + 1, surname: '', name: '', operatorTypeId: '', dob: '', age: '', genderId: '', martialId: '', mobileNumber: '', emailId: '', aadharNumber: '', startDate: '' }
  }

  //inline edit new row for institution promoters details
  //@jyothi.naidana
  editInstitutionPromoter(row: any) {
    this.cancleButtonFlag = false;
    this.addButton = true;
    this.EditDeleteDisable = true;
  }
  //inline add new row for institution promoters details
  //@jyothi.naidana
  onRowAddInstitution() {
    this.cancleButtonFlag = true;
    let uniqueId = this.institutionPromoter.length + 1
    this.institutionPromoterDetailsModel = new InstitutionPromoterDetailsModel();
    // this.addForInstitutionNewEntry();
    this.EditDeleteDisable = true;
    this.addButton = true;
    this.dt1._first = 0;
    this.dt1.value.unshift({ uniqueId: uniqueId});
    this.dt1.initRowEdit(this.dt1.value[0]);
  }

  getAllMemberType() {
    this.membershipServiceService.getAllMemberTypes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memberTypeList = this.responseModel.data;
          this.memberTypeList = this.memberTypeList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
            return { label: relationType.name, value: relationType.id };
          });
        }
        const filteredItem = this.memberTypeList.find((item: { value: any; }) => item.value === this.memberTypeId);
        if(filteredItem != null && filteredItem != undefined && filteredItem.label != null && filteredItem.label != undefined){
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

  membershipDataFromSbModule() {
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

  /**
   * @implements image uploader
   * @param event 
   * @param fileUpload 
   * @author jyothi.naidana
   */
  fileUploader(event: any, fileUpload: FileUpload, filePathName: any) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    if(this.isEdit && this.membershipBasicRequiredDetails.filesDTOList == null || this.membershipBasicRequiredDetails.filesDTOList == undefined){
      this.membershipBasicRequiredDetails.filesDTOList = [];
    }
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
         // Add to filesDTOList array
        let timeStamp = this.commonComponent.getTimeStamp();
        if (filePathName === "individualPhotoCopy") {
          this.membershipBasicRequiredDetails.filesDTOList.push(files);
          this.membershipBasicRequiredDetails.photoCopyPath = null;
          this.membershipBasicRequiredDetails.multipartFileListForPhotoCopy = [];
          this.membershipBasicRequiredDetails.filesDTOList[this.membershipBasicRequiredDetails.filesDTOList.length - 1].fileName = "Individual_Member_Photo_copy" + "_" + timeStamp + "_" + file.name;
          this.membershipBasicRequiredDetails.photoCopyPath = "Individual_Member_Photo_copy" + "_" + timeStamp + "_" + file.name; // This will set the last file's name as docPath
        }
        if (filePathName === "individualSighnedCopy") {
          this.membershipBasicRequiredDetails.filesDTOList.push(files);
          this.membershipBasicRequiredDetails.multipartFileListForsignatureCopyPath = [];
          this.membershipBasicRequiredDetails.signatureCopyPath = null;
          this.membershipBasicRequiredDetails.filesDTOList[this.membershipBasicRequiredDetails.filesDTOList.length - 1].fileName = "Individual_Member_signed_copy" + "_" + timeStamp + "_" + file.name;
          this.membershipBasicRequiredDetails.signatureCopyPath = "Individual_Member_signed_copy" + "_" + timeStamp + "_" + file.name; // This will set the last file's name as docPath
        }
        if (filePathName === "groupPhotoCopy") {
          this.memberGroupDetailsModel.filesDTOList.push(files);
          this.memberGroupDetailsModel.photoCopyPath = null;
          this.memberGroupDetailsModel.filesDTOList[this.memberGroupDetailsModel.filesDTOList.length - 1].fileName = "Group_Member_Photo_copy" + "_" + timeStamp + "_" + file.name;
          this.memberGroupDetailsModel.photoCopyPath = "Group_Member_Photo_copy" + "_" + timeStamp + "_" + file.name; // This will set the last file's name as docPath
        }
        if (filePathName === "groupSignatureCopy") {
          this.memberGroupDetailsModel.filesDTOList.push(files);
          this.memberGroupDetailsModel.signatureCopyPath = null;
          this.memberGroupDetailsModel.filesDTOList[this.memberGroupDetailsModel.filesDTOList.length - 1].fileName = "Group_Member_signed_copy" + "_" + timeStamp + "_" + file.name;
          this.memberGroupDetailsModel.signatureCopyPath = "Group_Member_signed_copy" + "_" + timeStamp + "_" + file.name; // This will set the last file's name as docPath
        }
        if (filePathName === "intistutionPhotoCopy") {
          this.membershipInstitutionDetailsModel.filesDTOList.push(files);
          this.membershipInstitutionDetailsModel.photoCopyPath = null;
          this.membershipInstitutionDetailsModel.filesDTOList[this.membershipInstitutionDetailsModel.filesDTOList.length - 1].fileName = "Institution_Member_Photo_copy" + "_" + timeStamp + "_" + file.name;
          this.membershipInstitutionDetailsModel.photoCopyPath = "Institution_Member_Photo_copy" + "_" + timeStamp + "_" + file.name; // This will set the last file's name as docPath
        }
        if (filePathName === "institutionSignature") {
          this.membershipInstitutionDetailsModel.filesDTOList.push(files);
          this.membershipInstitutionDetailsModel.signatureCopyPath = null;
          this.membershipInstitutionDetailsModel.filesDTOList[this.membershipInstitutionDetailsModel.filesDTOList.length - 1].fileName = "Institution_Member_signed_copy" + "_" + timeStamp + "_" + file.name;
          this.membershipInstitutionDetailsModel.signatureCopyPath = "Institution_Member_signed_copy" + "_" + timeStamp + "_" + file.name; // This will set the last file's name as docPath
        }
        // let index1 = event.files.findIndex((x: any) => x === file);
        // fileUpload.remove(event, index1);
        // fileUpload.clear();
        this.updateData();
      }
      reader.readAsDataURL(file);
    }
  }

  /**
   * @implements onFileremove from file value
   * @param fileName 
   * @author jyothi.naidana
   */
  fileRemoeEvent(fileName: any) {
      if (this.membershipBasicRequiredDetails.filesDTOList != null && this.membershipBasicRequiredDetails.filesDTOList != undefined && this.membershipBasicRequiredDetails.filesDTOList.length > 0) {
        if (fileName == "individualPhotoCopy") {
        let removeFileIndex = this.membershipBasicRequiredDetails.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.membershipBasicRequiredDetails.photoCopyPath);
        let obj = this.membershipBasicRequiredDetails.filesDTOList.find((obj: any) => obj && obj.fileName === this.membershipBasicRequiredDetails.photoCopyPath);
        this.membershipBasicRequiredDetails.filesDTOList.splice(removeFileIndex, 1);
        this.membershipBasicRequiredDetails.photoCopyPath = null;
      }
      if (fileName == "individualSighnedCopy") {
        let removeFileIndex = this.membershipBasicRequiredDetails.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.membershipBasicRequiredDetails.signatureCopyPath);
        let obj = this.membershipBasicRequiredDetails.filesDTOList.find((obj: any) => obj && obj.fileName === this.membershipBasicRequiredDetails.signatureCopyPath);
        this.membershipBasicRequiredDetails.filesDTOList.splice(removeFileIndex, 1);
        this.membershipBasicRequiredDetails.signatureCopyPath = null;
      }
    }
  }

  dateConverstion() {
    if (this.memberGroupDetailsModel != null && this.memberGroupDetailsModel != undefined) {
      if (this.memberGroupDetailsModel.admissionDateVal != null && this.memberGroupDetailsModel.admissionDateVal != undefined) {
        this.memberGroupDetailsModel.admissionDate = this.commonFunctionsService.getUTCEpoch(new Date(this.memberGroupDetailsModel.admissionDateVal));
      }
      if (this.memberGroupDetailsModel.registrationDateVal != null && this.memberGroupDetailsModel.registrationDateVal != undefined) {
        this.memberGroupDetailsModel.registrationDate = this.commonFunctionsService.getUTCEpoch(new Date(this.memberGroupDetailsModel.registrationDateVal));
      }
    }
    if (this.membershipBasicRequiredDetails != null && this.membershipBasicRequiredDetails != undefined) {
      if (this.membershipBasicRequiredDetails.admissionDateVal != null && this.membershipBasicRequiredDetails.admissionDateVal != undefined) {
        this.membershipBasicRequiredDetails.admissionDate = this.commonFunctionsService.getUTCEpoch(new Date(this.membershipBasicRequiredDetails.admissionDateVal));
      }
      if (this.membershipBasicRequiredDetails.dobVal != null && this.membershipBasicRequiredDetails.dobVal != undefined) {
        this.membershipBasicRequiredDetails.dob = this.commonFunctionsService.getUTCEpoch(new Date(this.membershipBasicRequiredDetails.dobVal));
      }
    }
    if (this.membershipInstitutionDetailsModel != null && this.membershipInstitutionDetailsModel != undefined) {
      if (this.membershipInstitutionDetailsModel.admissionDateVal != null && this.membershipInstitutionDetailsModel.admissionDateVal != undefined) {
        this.membershipInstitutionDetailsModel.admissionDate = this.commonFunctionsService.getUTCEpoch(new Date(this.membershipInstitutionDetailsModel.admissionDateVal));
      }
      if (this.membershipInstitutionDetailsModel.registrationDateVal != null && this.membershipInstitutionDetailsModel.registrationDateVal != undefined) {
        this.membershipInstitutionDetailsModel.registrationDate = this.commonFunctionsService.getUTCEpoch(new Date(this.membershipInstitutionDetailsModel.registrationDateVal));
      }
    }
    this.updateData();
  }

   
  

}
