import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SiTransactionDetailsService } from '../../../shared/si-loans/si-transaction-details.service';
import { SiLoanApplicationService } from '../../../shared/si-loans/si-loan-application.service';
import { SiLoanApplication } from '../../../shared/si-loans/si-loan-application.model';
import { SiLoanInterestPolicy, SiLoanProductDefinition } from '../../../shared/si-loans/si-loan-product-definition.model';
import { SiProductDefinitionService } from '../../../shared/si-loans/si-product-definition.service';
import { MemberGroupDetailsModel, MembershipBasicRequiredDetails, MembershipInstitutionDetailsModel } from '../../../shared/si-loans/si-loan-membership-details.model';
import { SiLoanInsuranceDetails } from '../../../shared/si-loans/si-loan-insurance-details.model';

@Component({
  selector: 'app-si-loan-application-details',
  templateUrl: './si-loan-application-details.component.html',
  styleUrls: ['./si-loan-application-details.component.css']
})
export class SiLoanApplicationDetailsComponent {
  siLoanapplicationForm: FormGroup;
  chargesDetailsForm: FormGroup;
  insurenceDetailsForm: FormGroup;
  gender: any[] | undefined;
  maritalstatus: any[] | undefined;
  checked: boolean = false;
  responseModel!: Responsemodel;
  productsList: any[] = [];
  repaymentFrequencyList: any[] = [];
  loanPurposeList: any[] = [];
  operationTypesList: any[] = [];
  schemeTypesList: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];
  columns: any[] = [];
  insuranceVendorDetailsList: any[] = [];
  occupationTypesList: any[] = [];
  gendersList: any[] = [];
  relationshipTypesList: any[] = [];

  isMemberCreation: boolean = false;

  siLoanApplicationModel: SiLoanApplication = new SiLoanApplication();
  siLoanProductDefinitionModel: SiLoanProductDefinition = new SiLoanProductDefinition();
  siLoanInterestPolicyModel: SiLoanInterestPolicy = new SiLoanInterestPolicy();
  membershipBasicRequiredDetailsModel: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  siLoanInsuranceDetailsModel: SiLoanInsuranceDetails = new SiLoanInsuranceDetails();

  memberTypeName: any;
  loanAccId: any;
  isEdit: boolean = false;
  admissionNumber: any;
  promoterDetails: any[] = [];
  institutionPromoter: any[] = [];
  visible: boolean = false;
  applicationType: boolean = false;
  isIndividual: Boolean = false;

  productInfoFalg: boolean = false;
  isProductDisable: boolean = false;
  productDefinitionFlag: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private translate: TranslateService, private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService, private commonComponent: CommonComponent,
    private siTransactionDetailsService: SiTransactionDetailsService, private datePipe: DatePipe,
    private commonFunction: CommonFunctionsService, private siLoanApplicationService: SiLoanApplicationService,
    private activateRoute: ActivatedRoute, private siProductDefinitionService: SiProductDefinitionService) {

    this.siLoanapplicationForm = this.formBuilder.group({
      siProductId: ['', [Validators.required]],
      accountNumber: [{ value: '', disabled: true }],
      roi: [{ value: '', disabled: true }],
      applicationDate: ['', [Validators.required]],
      penalRoi: [{ value: '', disabled: true }],
      iod: [{ value: '', disabled: true }],
      repaymentFrequency: ['', [Validators.required]],
      monthlyIncome: ['', [Validators.required]],
      purposeId: ['', [Validators.required]],
      requestedAmount: ['', [Validators.required]],
      sanctionAmount: ['', [Validators.required]],
      sanctionDate: ['', [Validators.required]],
      plannedDisbursements: ['', [Validators.required]],
      loanPeriod: ['', [Validators.required]],
      loanDueDate: ['', [Validators.required]],
      operationTypeId: ['', [Validators.required]],
    })
    this.chargesDetailsForm = this.formBuilder.group({

    })
    this.insurenceDetailsForm = this.formBuilder.group({
      vendorId: ['', [Validators.required]],
      policyName: ['', [Validators.required]],
      policyNumber: ['', [Validators.required]],
      sumInsured: ['', [Validators.required]],
      premium: ['', [Validators.required]],
      // insuranceType: ['', [Validators.required]],
    })
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');
    this.gender = [
      { status: 'Select', code: '0' },
      { status: 'Male', code: '1' },
      { status: 'Female', code: '2' },
    ];
    this.maritalstatus = [
      { status: 'Select', code: '0' },
      { status: 'Married', code: '1' },
      { status: 'UnMarried', code: '2' }
    ];
    this.getAllProducts();
    this.getAllRepaymentFrequency();
    this.getAllLoanPurpose();
    this.getAllAccountTypes();
    this.getAllInsuranceVendors();
    // this.getAllOccupationTypes();
    // this.getAllGenders();
    //  this.getAllSchemeTypes();

    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.loanAccId = Number(id);
        this.isEdit = true;
        this.getSILoanApplicationById(this.loanAccId);
        this.commonComponent.stopSpinner();
      } else {
        this.isEdit = false;
        this.commonComponent.stopSpinner();
      }
    })

    this.siLoanapplicationForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      // if (this.siLoanapplicationForm.valid) {
      //   this.save();
      // }
    });
  }

  save() {
    this.updateData();
  }

  updateData() {
    this.siLoanApplicationModel.siLoanInsuranceDetailsDTO = this.siLoanInsuranceDetailsModel;
    this.siLoanApplicationService.changeData({
      formValid: !this.siLoanapplicationForm.valid ? true : false,
      data: this.siLoanApplicationModel,
      isDisable: (!this.siLoanapplicationForm.valid),
      stepperIndex: 3,
    });
  }

  getAllProducts() {
    this.commonComponent.startSpinner();
    this, this.siTransactionDetailsService.getAllProducts().subscribe(response => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.productsList = this.responseModel.data.filter((product: { status: number; }) => product.status == 1).map((product: any) => {
          return { label: product.name, value: product.id };
        });
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
      })
  }

  getAllRepaymentFrequency() {
    this.commonComponent.startSpinner();
    this, this.siTransactionDetailsService.getAllRepaymentFrequency().subscribe(response => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.repaymentFrequencyList = this.responseModel.data.filter((repaymentFrequency: { status: number; }) => repaymentFrequency.status == 1).map((repaymentFrequency: any) => {
          return { label: repaymentFrequency.name, value: repaymentFrequency.id };
        });
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
      })
  }

  getAllLoanPurpose() {
    this.commonComponent.startSpinner();
    this, this.siTransactionDetailsService.getAllLoanPurpose().subscribe(response => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.loanPurposeList = this.responseModel.data.filter((loanPurpose: { status: number; }) => loanPurpose.status == 1).map((loanPurpose: any) => {
          return { label: loanPurpose.name, value: loanPurpose.id };
        });
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
      })
  }

  getAllAccountTypes() {
    this.siTransactionDetailsService.getAllAccountTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.operationTypesList = this.responseModel.data;
            this.operationTypesList = this.operationTypesList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };

            });
            this.operationTypesList.unshift({ label: 'select', value: 0 });
          }
        }
        if (this.siLoanApplicationModel.operationTypeId != undefined) {
          const filteredItem = this.operationTypesList.find((item: { value: any; }) => item.value === this.siLoanApplicationModel.operationTypeId);
          this.siLoanApplicationModel.operationTypeName = filteredItem.label;
        }
      }
    }, error => {
      this.msgs = [];
      this.commonComponent.stopSpinner();
      this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
    })
  }

  // getAllSchemeTypes() {
  //   this.commonComponent.startSpinner();
  //   this, this.siTransactionDetailsService.getAllSchemeTypes().subscribe(response => {
  //     this.responseModel = response;
  //     if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
  //       this.commonComponent.stopSpinner();
  //       this.schemeTypesList = this.responseModel.data.filter((schemeType: { status: number; }) => schemeType.status == 1).map((schemeType: any) => {
  //         let newObj = { status: schemeType.name, code: schemeType.id };
  //         return newObj;
  //       });
  //     }
  //   },
  //     error => {
  //       this.msgs = [];
  //       this.commonComponent.stopSpinner();
  //       this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
  //     })
  // }

  getAllInsuranceVendors() {
    this.commonComponent.startSpinner();
    this, this.siTransactionDetailsService.getAllInsuranceVendors().subscribe(response => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.insuranceVendorDetailsList = this.responseModel.data.filter((insuranceVendor: { status: number; }) => insuranceVendor.status == 1).map((insuranceVendor: any) => {
          let newObj = { label: insuranceVendor.name, value: insuranceVendor.id };
          return newObj;
        });
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
      })
  }

  getAllOccupationTypes() {
    this.commonComponent.startSpinner();
    this, this.siTransactionDetailsService.getAllOccupationTypes().subscribe(response => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.occupationTypesList = this.responseModel.data.filter((occupationType: { status: number; }) => occupationType.status == 1).map((occupationType: any) => {
          let newObj = { status: occupationType.name, code: occupationType.id };
          return newObj;
        });
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
      })
  }

  getAllGenders() {
    this.commonComponent.startSpinner();
    this, this.siTransactionDetailsService.getAllGenders().subscribe(response => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.gendersList = this.responseModel.data.filter((gender: { status: number; }) => gender.status == 1).map((gender: any) => {
          let newObj = { status: gender.name, code: gender.id };
          return newObj;
        });
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
      })
  }

  getAllRelationShipTypes() {
    this.commonComponent.startSpinner();
    this, this.siTransactionDetailsService.getAllRelationShipTypes().subscribe(response => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.relationshipTypesList = this.responseModel.data.filter((relationShipType: { status: number; }) => relationShipType.status == 1).map((relationShipType: any) => {
          let newObj = { status: relationShipType.name, code: relationShipType.id };
          return newObj;
        });
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
      })
  }

  productOnChange(event: any) {
    this.productInfoFalg = true;
    if (event.value != null && event.value != undefined) {
      this.getProductDefinitionByProductId(event.value);
    }
  }

  onChangeAccountType(event: any) {
    if (event.value != null && event.value != undefined) {
      const filteredItem = this.operationTypesList.find((item: { value: any; }) => item.value === event.value);
      this.siLoanApplicationModel.operationTypeName = filteredItem.label;
      this.updateData();
    }
  }

  onChangeRepayment(event: any) {
    //  if (event.value != null && event.value != undefined) {
    //   this.getProductDefinitionByProductId(event.value);
    // }
  }

  onChangePurpose(event: any) {
    //  if (event.value != null && event.value != undefined) {
    //   this.getProductDefinitionByProductId(event.value);
    // }
  }

  //get account details by admissionNumber list
  getSILoanApplicationById(loanAccId: any) {
    this.siLoanApplicationService.getSILoanApplicationById(loanAccId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {

            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.siLoanApplicationModel = this.responseModel.data[0];
                if(this.siLoanApplicationModel.siProductId != null && this.siLoanApplicationModel.siProductId != undefined)
                  this.isProductDisable = applicationConstants.TRUE;

                if (this.siLoanApplicationModel.individualMemberDetailsDTO != undefined) {
                  this.membershipBasicRequiredDetailsModel = this.siLoanApplicationModel.individualMemberDetailsDTO;

                  if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined)
                    this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);

                  if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined)
                    this.membershipBasicRequiredDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
                }

                if (this.siLoanApplicationModel.applicationDate != null && this.siLoanApplicationModel.applicationDate != undefined) {
                  this.siLoanApplicationModel.applicationDateVal = this.datePipe.transform(this.siLoanApplicationModel.applicationDate, this.orgnizationSetting.datePipe);
                }
                if (this.siLoanApplicationModel.sanctionDate != null && this.siLoanApplicationModel.sanctionDate != undefined) {
                  this.siLoanApplicationModel.sanctionDateVal = this.datePipe.transform(this.siLoanApplicationModel.sanctionDate, this.orgnizationSetting.datePipe);
                }
                if (this.siLoanApplicationModel.loanDueDate != null && this.siLoanApplicationModel.loanDueDate != undefined) {
                  this.siLoanApplicationModel.loanDueDateVal = this.datePipe.transform(this.siLoanApplicationModel.loanDueDate, this.orgnizationSetting.datePipe);
                }
                if (this.siLoanApplicationModel.memberTypeName != null && this.siLoanApplicationModel.memberTypeName != undefined) {
                  this.memberTypeName = this.siLoanApplicationModel.memberTypeName;
                  if (this.siLoanApplicationModel.memberTypeName == "Individual")
                    this.isIndividual = true;
                }
                if (this.siLoanApplicationModel.admissionNo != null && this.siLoanApplicationModel.admissionNo != undefined) {
                  this.admissionNumber = this.siLoanApplicationModel.admissionNo;
                }
                if (this.siLoanApplicationModel.operationTypeName != null && this.siLoanApplicationModel.operationTypeName != undefined) {
                  this.applicationType = true;
                }

                if (this.siLoanApplicationModel.siProductName != null && this.siLoanApplicationModel.siProductName != undefined) {
                  this.productInfoFalg = true;
                }

                if (this.siLoanApplicationModel.siLoanInsuranceDetailsDTO != null && this.siLoanApplicationModel.siLoanInsuranceDetailsDTO != undefined) {
                  this.siLoanInsuranceDetailsModel = this.siLoanApplicationModel.siLoanInsuranceDetailsDTO;
                }

                // if (this.siLoanApplicationModel.siProductId != undefined && this.siLoanApplicationModel.siProductId != null)
                //   this.getProductDefinitionByProductId(this.siLoanApplicationModel.siProductId);

                this.updateData();
              }
            }
          }
        }
      }
    });
  }

  getProductDefinitionByProductId(id: any) {
    this.siProductDefinitionService.getSIProductDefinitionPreviewByProductId(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.siLoanProductDefinitionModel = this.responseModel.data[0];
            if (this.siLoanProductDefinitionModel.siInterestPolicyConfigDTOList != undefined && this.siLoanProductDefinitionModel.siInterestPolicyConfigDTOList != null) {
              this.siLoanInterestPolicyModel = this.siLoanProductDefinitionModel.siInterestPolicyConfigDTOList[0];
            }
          }
        }
      }
    });
  }

  onChange() {
    this.checked = !this.checked;
    if (this.checked) {
      this.isMemberCreation = true;
    }
    else {
      this.isMemberCreation = false;
    }
  }

  showDialog() {
    this.visible = true;
  }

  getProductDefinition(){
    this.productDefinitionFlag = true;
    this.getProductDefinitionByProductId(this.siLoanApplicationModel.siProductId);
  }

  closeProductDefinition(){
    this.productDefinitionFlag = false;
  }
}

