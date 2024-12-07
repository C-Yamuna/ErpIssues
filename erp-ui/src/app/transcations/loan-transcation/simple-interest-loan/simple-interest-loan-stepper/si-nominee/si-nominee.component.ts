import { SiLoanGuardian } from './../../../shared/si-loans/si-loan-guardian.model';
import { SiLoanApplicationService } from './../../../shared/si-loans/si-loan-application.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SiLoanNomineeService } from '../../../shared/si-loans/si-loan-nominee.service';
import { SiLoanNominee } from '../../../shared/si-loans/si-loan-nominee.model';
import { DatePipe } from '@angular/common';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MembershipBasicRequiredDetails, MemberGroupDetailsModel, MembershipInstitutionDetailsModel } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { MemberGuardianDetailsModelDetaila } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/savings-bank-nominee/shared/savings-bank-nominee-model';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-si-nominee',
  templateUrl: './si-nominee.component.html',
  styleUrls: ['./si-nominee.component.css']
})
export class SiNomineeComponent {
  nomineeForm: FormGroup;
  guarantorDetailsForm: any;
  nominee: any;
  nomineeList: any;
  checked: any;
  newNominee: boolean = false;
  sameAsMembershipNominee: boolean = false;
  noNominee: boolean = false;
  responseModel!: Responsemodel;
  msgs: any[] = [];

  isMemberCreation: any;

  siLoanNomineeModel: SiLoanNominee = new SiLoanNominee();
  siLoanGuardianModel: SiLoanGuardian = new SiLoanGuardian();
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();

  fileName: any;
  loanAccId: any;
  isEdit: boolean = false;
  age: any;
  guardianDetailsFalg: boolean = false;
  relationTypesList: any[] = [];

  flagForNomineeTypeValue: any;
  accountOpeningDateVal: any;
  applicationType: any;
  accountType: any;
  minBalence: any;
  orgnizationSetting: any;

  accountNumber: any;
  productName: any;
  statesList: any;
  districtsList: any;
  mandalsList: any;
  villageList: any;
  guadianTypesList: any[] = [];
  guardain: any;
  memberTypeName: any;
  institutionPromoter: any;
  promoterDetails: any;
  admissionNumber: any;

  nomineeEdit: Boolean = false;
  nomineeHistoryList: any[] = [];
  nomineeFields: any[] = [];

  courtAppointedGuardain: any;

  multipleFilesList: any;
  uploadFileData: any;
  isFileUploaded: any;
  sameAsMemberGuardain: boolean = false;
  noGuardain: boolean = true;
  nomineeTypeDisable: boolean = false;
  guardainTypeDisable: boolean = false;
  historyFLag: boolean = false;;

  constructor(private formBuilder: FormBuilder,
    private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe,
    private siLoanApplicationService: SiLoanApplicationService,
    private siLoanNomineeService: SiLoanNomineeService) {

    this.nomineeForm = this.formBuilder.group({
      relationTypeName: ['', Validators.required],
      nomineeName: ['', Validators.required],
      // age: new FormControl(['', [Validators.pattern(applicationConstants.ALLOW_NEW_NUMBERS), Validators.maxLength(40), Validators.pattern(/^[^\s]+(\s.*)?$/), Validators.compose([Validators.required])]],),
      aadhaar: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: new FormControl(['',],),
      dateOfBirth: new FormControl('',),
      remarks: new FormControl('',),
      // 'nomineeAddres': new FormControl('', Validators.required),
      nomineeType: ['', Validators.required],

      //guardian form fields
      relationshipTypeName: ['',],
      guardianName: ['',],
      guardianAge: ['',],
      guardianAadhar: ['',],
      guardianMobile: ['',],
      guardianEmail: ['',],
      guardianAddress: ['',],
      guardianType: ['',],
      fileUpload: ['',],
      guardianRemarks: new FormControl('',),

    });
    this.nomineeFields = [
      { field: 'name', header: 'ERP.NAME' },
      { field: 'accountNumber', header: 'ERP.ACCOUNT_NUMBER' },
      { field: 'aadharNumber', header: 'ERP.AADHAR_NUMBER' },
      { field: 'mobileNumber', header: 'ERP.MOBILE_NUMBER' },
      { field: 'nomineeEmail', header: 'ERP.EMAIL' },
      { field: 'statusName', header: 'ERP.STATUS' },
    ]
  }

  ngOnInit(): void {
    
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    // this.isMemberCreation = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
    this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');
    if (this.isMemberCreation) {
      this.nomineeList = [
        { label: 'New Nominee', value: 1 },
        { label: 'No Nominee', value: 3 },
      ]
    }
    else {
      this.nomineeList = [
        { label: 'New Nominee', value: 1 },
        { label: 'Same As Membership Nominee', value: 2 },
        { label: 'No Nominee', value: 3 },
      ]
    }
    if (this.isMemberCreation) {
      this.guadianTypesList = [
        { label: 'New Guardain', value: 1 },
        { label: 'No Guardain', value: 3 },
      ]
    } else {
      this.guadianTypesList = [
        { label: 'New Guardain', value: 1 },
        { label: 'Same as Member Guardain', value: 2 },
        { label: 'No Guardain', value: 3 },
      ];
    }
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        // if (params['preview'] != undefined && params['preview'] != null) {
        //   let edit = this.encryptDecryptService.decrypt(params['preview']);
        //   this.historyFLag = true;
        // }
        if (params['id'] != undefined && params['id'] != null) {
          let queryParams = this.encryptDecryptService.decrypt(params['id']);
          this.loanAccId = Number(queryParams);
          this.getSILoanAccountDetailsById(this.loanAccId);
        }
      } else {
        this.isEdit = false;
      }
    });
    this.nomineeForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      // if (this.nomineeForm.valid) {
      //   this.save();
      // }
    });
    this.getAllRelationTypes();
  }

  updateData() {
    if (this.age <= 18) {
      this.siLoanGuardianModel.siLoanApplicationId = this.loanAccId;
      this.siLoanGuardianModel.accountNumber = this.accountNumber;
      this.siLoanNomineeModel.siMemberGuardianDetailsDTO = this.siLoanGuardianModel;
    }
    this.siLoanNomineeModel.accountNumber = this.accountNumber;
    this.siLoanNomineeModel.siLoanApplicationId = this.loanAccId;
    this.siLoanApplicationService.changeData({
      formValid: !this.nomineeForm.valid ? true : false,
      data: this.siLoanNomineeModel,
      isDisable: (!this.nomineeForm.valid),
      stepperIndex: 5,
    });
  }
  save() {
    this.updateData();
  }

  onChange(event: any) {
    
    if (event == 1) {
      this.newNominee = true;
      this.noNominee = false;
      this.siLoanNomineeModel = new SiLoanNominee();
      // this.sameAsMembershipNominee = false;
      this.siLoanNomineeModel.nomineeType = 1;
      this.nomineeValidatorsRequired();
    }
    else if (event == 2) {
      // this.sameAsMembershipNominee = true;
      // this.siLoanNomineeModel = new SavingsBankNomineeModel();
      this.newNominee = true;
      this.noNominee = false;
      this.siLoanNomineeModel.nomineeType = 2;
      this.getNomineeFromMemberModule(this.admissionNumber);
      this.nomineeFormValidation();
    }
    else if (event == 3) {
      // this.siLoanNomineeModel = new SavingsBankNomineeModel();
      this.noNominee = true;
      this.newNominee = false;
      this.sameAsMembershipNominee = false;
      this.siLoanNomineeModel.nomineeType = 3;
      this.nomineeValidatorsFormNotRequired();
      // this.newNominee = false;
    }
  }

  onChangeGuardain(event: any) {
    
    if (event == 1) {
      this.siLoanGuardianModel = new MemberGuardianDetailsModelDetaila();
      this.siLoanGuardianModel.guardianType = 1;
      this.courtAppointedGuardain = false;
      this.sameAsMemberGuardain = true;
      this.noGuardain = false;
      this.guardainFormValidation();

    }
    else if (event == 2) {
      this.sameAsMemberGuardain = true;
      this.courtAppointedGuardain = false;
      this.noGuardain = false;
      this.getGaurdainFromMemberModule(this.admissionNumber);
      this.siLoanGuardianModel.guardianType = 2;
      this.guardainFormValidation();

    }
    else if (event == 3) {
      this.siLoanGuardianModel.guardianType = 3;
      this.courtAppointedGuardain = true;
      this.sameAsMemberGuardain = false;
      this.noGuardain = true;
      this.guardaindisable();
    }
  }

  getNomineeDetailsBySILoanLoanAccId(loanAccId: any) {
    this.siLoanNomineeService.getNomineeDetailsBySILoanLoanAccId(loanAccId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siLoanNomineeModel = this.responseModel.data[0];
            if (this.siLoanNomineeModel.dateOfBirth != null && this.siLoanNomineeModel.dateOfBirth != undefined) {
              this.siLoanNomineeModel.dateOfBirthVal = this.datePipe.transform(this.siLoanNomineeModel.dateOfBirth, this.orgnizationSetting.datePipe);
            }
            if (this.siLoanNomineeModel.nomineeType != 0) {
              this.onChange(this.siLoanNomineeModel.nomineeType);
            }
            this.nomineeEdit = true;
          }
          this.updateData();
        }
        else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
      // this.getSILoanAccountDetailsById(loanAccId);
    })
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  getSILoanAccountDetailsById(id: any) {
    
    this.siLoanApplicationService.getSILoanApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            if (this.responseModel.data[0].accountOpenDate != null && this.responseModel.data[0].accountOpenDate != undefined) {
              this.accountOpeningDateVal = this.datePipe.transform(this.responseModel.data[0].accountOpenDate, this.orgnizationSetting.datePipe);
            }
            if (this.responseModel.data[0].productName != null && this.responseModel.data[0].productName != undefined) {
              this.productName = this.responseModel.data[0].productName;
            }
            if (this.responseModel.data[0].accountTypeName != null && this.responseModel.data[0].accountTypeName != undefined) {
              this.accountType = this.responseModel.data[0].accountTypeName;
            }
            if (this.responseModel.data[0].minBalance != null && this.responseModel.data[0].minBalance != undefined) {
              this.minBalence = this.responseModel.data[0].minBalance
            }
            if (this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined) {
              this.memberTypeName = this.responseModel.data[0].memberTypeName;
            }
            if (this.responseModel.data[0].admissionNo != null && this.responseModel.data[0].admissionNo != undefined) {
              this.admissionNumber = this.responseModel.data[0].admissionNo;
            }
            if (this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined) {
              this.accountNumber = this.responseModel.data[0].accountNumber;
              if (this.historyFLag) {
                this.getNomineeHistoryBySILoanAccountNumber(this.accountNumber);
              }
            }
            if (this.responseModel.data[0].individualMemberDetailsDTO.age != null && this.responseModel.data[0].individualMemberDetailsDTO.age != undefined) {
              this.age = this.responseModel.data[0].individualMemberDetailsDTO.age;
              if (this.age < 18) {
                this.guardianDetailsFalg = true;
              }
            }
            if (this.responseModel.data[0].siLoanNomineeDetailsDTO != null && this.responseModel.data[0].siLoanNomineeDetailsDTO != undefined) {
              this.siLoanNomineeModel = this.responseModel.data[0].siLoanNomineeDetailsDTO;
            }
            if (this.responseModel.data[0].siMemberGuardianDetailsDTO != null && this.responseModel.data[0].siMemberGuardianDetailsDTO != undefined) {
              this.siLoanGuardianModel = this.responseModel.data[0].siMemberGuardianDetailsDTO;
            }
            if (this.siLoanNomineeModel.nomineeType != null && this.siLoanNomineeModel.nomineeType != undefined) {
              this.nomineeTypeDisable = true;
              if (this.siLoanNomineeModel.nomineeType == 1 || this.siLoanNomineeModel.nomineeType == 2) {
                this.newNominee = true;
                this.noNominee = false;
                this.sameAsMemberGuardain = false;
                if(this.siLoanNomineeModel.nomineeType == 2){
                  this.nomineeForm.get('relationTypeName')?.disable();
                  this.nomineeForm.get('nomineeName')?.disable();
                  this.nomineeForm.get('aadhaar')?.disable();
                  this.nomineeForm.get('mobileNumber')?.disable();
                  this.nomineeForm.get('email')?.disable();
                  this.nomineeForm.get('fileUpload')?.disable();
                }
              }
              else if (this.siLoanNomineeModel.nomineeType == 3) {
                this.newNominee = false;
                this.noNominee = true;
                this.sameAsMemberGuardain = false;
              }
            }
            if (this.siLoanGuardianModel.guardianType != null && this.siLoanGuardianModel.guardianType != undefined) {
              this.guardainTypeDisable = true;
              if (this.siLoanGuardianModel.guardianType == 1 || this.siLoanGuardianModel.guardianType == 2) {
                this.sameAsMemberGuardain = true;
                this.courtAppointedGuardain = false;
                this.noGuardain = false;
                this.guardainFormValidation();
              }
              else if (this.siLoanGuardianModel.guardianType == 3) {
                this.courtAppointedGuardain = true;
                this.sameAsMemberGuardain = false;
                this.noGuardain = true;
                this.guardaindisable();
              }
            }
          }
        }
        else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
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

  getAllRelationTypes() {
    this.siLoanApplicationService.getAllRelationTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.relationTypesList = this.responseModel.data
            this.relationTypesList = this.responseModel.data.filter((kyc: any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
              return { label: count.name, value: count.id }
            });
            let nominee = this.relationTypesList.find((data: any) => null != data && this.siLoanNomineeModel.relationTypeId != null && data.value == this.siLoanNomineeModel.relationTypeId);
            if (nominee != null && undefined != nominee && nominee.label != null && nominee.label != undefined) {
              this.siLoanNomineeModel.relationTypeName = nominee.label;
            }
            let guardain = this.relationTypesList.find((data: any) => null != data && this.siLoanGuardianModel.relationshipTypeId != null && data.value == this.siLoanGuardianModel.relationshipTypeId);
            if (guardain != null && undefined != guardain && nominee.label != null && guardain.label != undefined) {
              this.siLoanGuardianModel.relationshipTypeName = guardain.label;
            }
          }
        }
      }
    });
  }

  getGuardianDetails(accountNumber: any) {
    this.siLoanNomineeService.getGuardianDetails(accountNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siLoanGuardianModel = this.responseModel.data[0];
            if (this.siLoanGuardianModel.guardianDob != null && this.siLoanGuardianModel.guardianDob != undefined) {
              this.siLoanGuardianModel.guardianDobVal = this.datePipe.transform(this.siLoanGuardianModel.guardianDob, this.orgnizationSetting.datePipe);
            }
            if (this.siLoanGuardianModel.guardianType != null && this.siLoanGuardianModel.guardianType != undefined) {
              this.onChangeGuardain(this.siLoanGuardianModel.guardianType);
            }
            this.updateData();
          }
        }
        else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }
    });
  }

  getMemberDetailsByAdmissionNumber(admisionNumber: any) {
    this.siLoanApplicationService.getMemberByAdmissionNumber(admisionNumber).subscribe((response: any) => {
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
            if (this.membershipBasicRequiredDetails.age != null && this.membershipBasicRequiredDetails.age != undefined) {

            }
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
            if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
              this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDateVal, this.orgnizationSetting.datePipe);
            }
            if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
              this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
            }
            if (this.memberGroupDetailsModel.groupPromotersDTOList.length > 0) {
              this.promoterDetails = this.memberGroupDetailsModel.groupPromotersDTOList;
              this.promoterDetails = this.memberGroupDetailsModel.groupPromotersDTOList.map((member: any) => {
                member.memDobVal = this.datePipe.transform(member.dob, this.orgnizationSetting.datePipe);
                member.startDateVal = this.datePipe.transform(member.startDate, this.orgnizationSetting.datePipe);
                return member;
              });
            }
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
            if (this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0)
              this.institutionPromoter = this.membershipInstitutionDetailsModel.institutionPromoterList;
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

  loadMembershipData() {
    if (this.memberTypeName == "Individual") {
      this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
    } else if (this.memberTypeName == "Group") {
      this.getGroupByAdmissionNumber(this.admissionNumber);
    } else if (this.memberTypeName == "Institution") {
      this.getInstitutionByAdmissionNumber(this.admissionNumber);
    }
  }

  getNomineeFromMemberModule(admissionNumber: any) {
    
    this.siLoanNomineeService.getNomineeFromMemberModuleByAdmissionNumber(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siLoanNomineeModel = this.responseModel.data[0];

            this.siLoanNomineeModel.id = null;
            if (this.siLoanNomineeModel.dateOfBirth != null && this.siLoanNomineeModel.dateOfBirth != undefined) {
              this.siLoanNomineeModel.dateOfBirthVal = this.datePipe.transform(this.siLoanNomineeModel.dateOfBirthVal, this.orgnizationSetting.datePipe);
            }
            if (this.responseModel.data[0].relationTypeId != null && this.responseModel.data[0].relationTypeId != undefined) {
              this.getAllRelationTypes();
            }
            this.siLoanNomineeModel.nomineeType = 2;
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

  getGaurdainFromMemberModule(admissionNumber: any) {
    
    this.siLoanNomineeService.getGardianFromMemberModuleByAdmissionNumber(admissionNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siLoanGuardianModel = this.responseModel.data[0];
            this.siLoanNomineeModel.siMemberGuardianDetailsDTO = this.siLoanGuardianModel;
            // if (this.responseModel.data[0].guardianDob != null && this.responseModel.data[0].guardianDob != undefined) {
            //   this.siLoanGuardianModel.dateOfBirthVal = this.datePipe.transform(this.responseModel.data[0].guardianDob, this.orgnizationSetting.datePipe);
            // }
            // if (this.responseModel.data[0].guardianName != null && this.responseModel.data[0].guardianName != undefined) {
            //   this.siLoanGuardianModel.name = this.responseModel.data[0].guardianName;
            // }
            // if (this.responseModel.data[0].guardianAadharNumber != null && this.responseModel.data[0].guardianAadharNumber != undefined) {
            //   this.siLoanGuardianModel.aadharNumber = this.responseModel.data[0].guardianAadharNumber;
            // }
            // if (this.responseModel.data[0].guardianMobileNumber != null && this.responseModel.data[0].guardianMobileNumber != undefined) {
            //   this.siLoanGuardianModel.mobileNumber = this.responseModel.data[0].guardianMobileNumber;
            // }
            // if (this.responseModel.data[0].guardianEmailId != null && this.responseModel.data[0].guardianEmailId != undefined) {
            //   this.siLoanGuardianModel.email = this.responseModel.data[0].guardianEmailId;
            // }
            // if (this.responseModel.data[0].relationTypeId != null && this.responseModel.data[0].relationTypeId != undefined) {
            //   this.siLoanGuardianModel.relationTypeId = this.responseModel.data[0].relationTypeId;
            // }
            // if (this.responseModel.data[0].guardianDob != null && this.responseModel.data[0].guardianDob != undefined) {
            //   this.siLoanGuardianModel.dateOfBirth = this.responseModel.data[0].guardianDob;
            // }
            // if (this.responseModel.data[0].guardianAge != null && this.responseModel.data[0].guardianAge != undefined) {
            //   this.siLoanGuardianModel.age = this.responseModel.data[0].guardianAge;
            // }
            // if (this.responseModel.data[0].guardianAge != null && this.responseModel.data[0].guardianAge != undefined) {
            //   this.siLoanGuardianModel.age = this.responseModel.data[0].guardianAge;
            // }
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

  fileUploader(event: any, fileUpload: FileUpload) {
    // this.isFileUploaded = applicationConstants.FALSE;
    // this.multipleFilesList = [];
    // this.siLoanNomineeModel.filesDTOList = [];
    // this.siLoanNomineeModel.identityProofCopyPath = null;
    // let files: FileUploadModel = new FileUploadModel();
    // for (let file of event.files) {
    //   let reader = new FileReader();
    //   reader.onloadend = (e) => {
    //     let files = new FileUploadModel();
    //     this.uploadFileData = e.currentTarget;
    //     files.fileName = file.name;
    //     files.fileType = file.type.split('/')[1];
    //     files.value = this.uploadFileData.result.split(',')[1];
    //     files.imageValue = this.uploadFileData.result;

    //     let index = this.multipleFilesList.findIndex((x: any) => x.fileName == files.fileName);
    //     if (index === -1) {
    //       this.multipleFilesList.push(files);
    //       this.membershipBasicRequiredDetails.filesDTOList.push(files); // Add to filesDTOList array
    //     }
    //     let timeStamp = this.commonComponent.getTimeStamp();
    //     this.siLoanNomineeModel.filesDTOList[0].fileName = "Individual_Member" + this.loanAccId + "_" + timeStamp + "_" + file.name;
    //     this.siLoanNomineeModel.identityProofCopyPath = "Individual_Member" + this.loanAccId + "_" + timeStamp + "_" + file.name; // This will set the last file's name as docPath
    //     let index1 = event.files.findIndex((x: any) => x === file);
    //     fileUpload.remove(event, index1);
    //     fileUpload.clear();
    //   }
    //   reader.readAsDataURL(file);
    // }
  }

  guardainFormValidation() {
    if (this.age <= 18) {
      this.guardianDetailsFalg = true;
      const controlName = this.nomineeForm.get('relationshipTypeName');
      if (controlName) {
        controlName.setValidators(Validators.required); // Set the required validator
        controlName.updateValueAndValidity();
      }

      const controlTow = this.nomineeForm.get('guardianName');
      if (controlTow) {
        controlTow.setValidators(Validators.required); // Set the required validator
        controlTow.updateValueAndValidity();
      }

      // const controlThree = this.nomineeForm.get('guardianAge');
      // if (controlThree) {
      //   controlThree.setValidators(Validators.required); // Set the required validator
      //   controlThree.updateValueAndValidity();
      // }

      const controlFour = this.nomineeForm.get('guardianAadhar');
      if (controlFour) {
        controlFour.setValidators(Validators.required); // Set the required validator
        controlFour.updateValueAndValidity();
      }

      const controlFive = this.nomineeForm.get('guardianMobile');
      if (controlFive) {
        controlFive.setValidators(Validators.required); // Set the required validator
        controlFive.updateValueAndValidity();
      }

      // const controlSix = this.nomineeForm.get('guardianEmail');
      // if (controlSix) {
      //   controlSix.setValidators(Validators.required); // Set the required validator
      //   controlSix.updateValueAndValidity();
      // }
      this.updateData();
    }
  }

  getNomineeHistoryBySILoanAccountNumber(accountNumber: any) {
    this.siLoanNomineeService.getNomineeDetailsBySILoanLoanAccId(accountNumber).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
            this.nomineeHistoryList = this.responseModel.data;
          }
        }
        else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
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

  guardaindisable() {
    const controlName = this.nomineeForm.get('relationshipTypeName');
    if (controlName) {
      controlName.setValidators(null); // Set the required validator
      controlName.updateValueAndValidity();
    }

    const controlTow = this.nomineeForm.get('guardianName');
    if (controlTow) {
      controlTow.setValidators(null); // Set the required validator
      controlTow.updateValueAndValidity();
    }

    const controlFour = this.nomineeForm.get('guardianAadhar');
    if (controlFour) {
      controlFour.setValidators(null); // Set the required validator
      controlFour.updateValueAndValidity();
    }

    const controlFive = this.nomineeForm.get('guardianMobile');
    if (controlFive) {
      controlFive.setValidators(null); // Set the required validator
      controlFive.updateValueAndValidity();
    }

    this.updateData();
  }

  nomineeFormValidation() {
    this.nomineeForm.get('relationTypeName')?.disable();
    this.nomineeForm.get('nomineeName')?.disable();
    this.nomineeForm.get('aadhaar')?.disable();
    this.nomineeForm.get('mobileNumber')?.disable();
    this.nomineeForm.get('email')?.disable();
    this.nomineeForm.get('fileUpload')?.disable();
    this.updateData();
  }

  nomineeValidatorsRequired() {
    this.nomineeForm.get('relationTypeName')?.enable();
    this.nomineeForm.get('nomineeName')?.enable();
    this.nomineeForm.get('aadhaar')?.enable();
    this.nomineeForm.get('mobileNumber')?.enable();
    this.nomineeForm.get('email')?.enable();
    this.nomineeForm.get('fileUpload')?.enable();
    const controlName = this.nomineeForm.get('relationTypeName');
    if (controlName) {
      controlName.setValidators(Validators.required); // Set the required validator
      controlName.updateValueAndValidity();
    }

    const controlTow = this.nomineeForm.get('nomineeName');
    if (controlTow) {
      controlTow.setValidators(Validators.required); // Set the required validator
      controlTow.updateValueAndValidity();
    }
    const controlFour = this.nomineeForm.get('aadhaar');
    if (controlFour) {
      controlFour.setValidators(Validators.required); // Set the required validator
      controlFour.updateValueAndValidity();
    }
    const controlFive = this.nomineeForm.get('mobileNumber');
    if (controlFive) {
      controlFive.setValidators(Validators.required); // Set the required validator
      controlFive.updateValueAndValidity();
    }
    this.updateData();
  }

  nomineeValidatorsFormNotRequired() {
    const controlName = this.nomineeForm.get('relationTypeName');
    if (controlName) {
      controlName.setValidators(null); // Set the required validator
      controlName.updateValueAndValidity();
    }

    const controlTow = this.nomineeForm.get('nomineeName');
    if (controlTow) {
      controlTow.setValidators(null); // Set the required validator
      controlTow.updateValueAndValidity();
    }
    const controlFour = this.nomineeForm.get('aadhaar');
    if (controlFour) {
      controlFour.setValidators(null); // Set the required validator
      controlFour.updateValueAndValidity();
    }
    const controlFive = this.nomineeForm.get('mobileNumber');
    if (controlFive) {
      controlFive.setValidators(null); // Set the required validator
      controlFive.updateValueAndValidity();
    }
    this.updateData();
  }

  onChangeNomineeRelationType(relationTypeId: any) {
    let relationType = this.relationTypesList.find((data: any) => null != data && relationTypeId != null && data.value == this.siLoanNomineeModel.relationTypeId);
      if (relationType != null && undefined != relationType)
        this.siLoanNomineeModel.relationTypeName = relationType.label;
  }

  onChangeGuardianRelationType(relationTypeId: any) {
    let relationType = this.relationTypesList.find((data: any) => null != data && relationTypeId != null && data.value == this.siLoanGuardianModel.relationshipTypeId);
      if (relationType != null && undefined != relationType)
        this.siLoanGuardianModel.relationshipTypeName = relationType.label;
  }

}
