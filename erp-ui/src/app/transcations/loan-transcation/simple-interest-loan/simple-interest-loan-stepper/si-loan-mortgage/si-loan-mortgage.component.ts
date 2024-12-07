import { SiGoldLoanMortgage, SiLandLoanMortgage, SiBondLoanMortgage, SiVehicleLoanMortgage, SiOtherLoanMortgage, SiStorageLoanMortgage } from './../../../shared/si-loans/si-loan-mortgage.model';
import { SiLoanMortagageDetailsService } from './../../../shared/si-loans/si-loan-mortagage-details.service';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MembershipBasicRequiredDetails, MemberGroupDetailsModel, MembershipInstitutionDetailsModel } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { SiLoanProductDefinition } from '../../../shared/si-loans/si-loan-product-definition.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Table } from 'primeng/table';
import { SiLoanApplicationService } from '../../../shared/si-loans/si-loan-application.service';
import { SiLoanApplication } from '../../../shared/si-loans/si-loan-application.model';

@Component({
  selector: 'app-si-loan-mortgage',
  templateUrl: './si-loan-mortgage.component.html',
  styleUrls: ['./si-loan-mortgage.component.css']
})
export class SiLoanMortgageComponent {

  siGoldMortgageForm: FormGroup;
  siLandMortgageForm: FormGroup;
  siBondMortgageForm: FormGroup;
  siVehicleMortgageForm: FormGroup;
  siStorageMortgageForm: FormGroup;
  siOtherMortgageForm: FormGroup;

  selectCollateralType: any;
  collateraltypeOptionsList: any[] = [];

  showGoldform: boolean = false;
  showLandform: boolean = false;
  showBondform: boolean = false;
  showVehicleform: boolean = false;
  showStorageform: boolean = false;
  showOtherform: boolean = false;
  accountOpeningDateVal: any;
  minBalence: any;
  accountType: any;
  productName: any;
  carratsList: any[] = [];
  gender: any[] | undefined;
  maritalstatus: any[] | undefined;
  checked: boolean = false;
  responseModel!: Responsemodel;
  productsList: any[] = [];
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
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  siLoanProductDefinitionModel: SiLoanProductDefinition = new SiLoanProductDefinition();

  siGoldLoanMortgageModel: SiGoldLoanMortgage = new SiGoldLoanMortgage();
  siLandLoanMortgageModel: SiLandLoanMortgage = new SiLandLoanMortgage();
  siBondLoanMortgageModel: SiBondLoanMortgage = new SiBondLoanMortgage();
  siVehicleLoanMortgageModel: SiVehicleLoanMortgage = new SiVehicleLoanMortgage();
  siStorageLoanMortgageModel: SiStorageLoanMortgage = new SiStorageLoanMortgage();
  siOtherLoanMortgageModel: SiOtherLoanMortgage = new SiOtherLoanMortgage();

  siLoanApplicationModel: SiLoanApplication = new SiLoanApplication();

  memberTypeName: any;
  loanAccId: any;
  isEdit: boolean = false;
  admissionNumber: any;

  siGoldLoanMortgageModelList: any[] = [];
  siLandLoanMortgageModelList: any[] = [];
  siBondLoanMortgageModelList: any[] = [];
  siVehicleLoanMortgageModelList: any[] = [];
  siStorageLoanMortgageModelList: any[] = [];
  siOtherLoanMortgageModelList: any[] = [];

  institutionPromoter: any[] = [];
  visible: boolean = false;
  isFormValid: Boolean = false;

  @ViewChild('gold', { static: false }) private gold!: Table;
  @ViewChild('land', { static: false }) private land!: Table;
  @ViewChild('bond', { static: false }) private bond!: Table;
  @ViewChild('vehicle', { static: false }) private vehicle!: Table;
  @ViewChild('storage', { static: false }) private storage!: Table;
  @ViewChild('other', { static: false }) private other!: Table;

  addButton: boolean = false;
  newRow: any;
  EditDeleteDisable: boolean = false;

  goldLoanMortgageColumns: any[] = [];
  landLoanMortgageColumns: any[] = [];
  bondLoanMortgageColumns: any[] = [];
  vehicleLoanMortgageColumns: any[] = [];
  storageLoanMortgageColumns: any[] = [];
  otherLoanMortgageColumns: any[] = [];

  isSameCollateral: Boolean = false;

  collateralType: any;
  landTypesList: any[] = [];

  addButtonService: boolean = false;
  siGoldLoanMortgageList: any[] = [];
  siLandLoanMortgageList: any[] = [];
  siBondLoanMortgageList: any[] = [];
  siVehicleLoanMortgageList: any[] = [];
  siStorageLoanMortgageList: any[] = [];
  siOtherLoanMortgageList: any[] = [];

  editDeleteDisable: boolean = false;
  landTypeName: any;

  constructor(private formBuilder: FormBuilder,
    private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService, private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private siLoanMortagageDetailsService: SiLoanMortagageDetailsService,
    private siLoanApplicationService: SiLoanApplicationService
  ) {

    this.siGoldMortgageForm = this.formBuilder.group({
      itemName: new FormControl('', Validators.required),
      netWeight: new FormControl('', Validators.required),
      grossWeight: new FormControl('', Validators.required),
      carats: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      remarks: new FormControl(''),
    })

    this.siLandMortgageForm = this.formBuilder.group({
      passbookNumber: new FormControl('', Validators.required),
      surveyNo: new FormControl('', Validators.required),
      landType: new FormControl('', Validators.required),
      landUnits: new FormControl('', Validators.required),
      landSubUnits: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      declaredLandUnits: new FormControl('', Validators.required),
      declaredLandSubUnits: new FormControl('', Validators.required),
      // documentPath: new FormControl(''),
      remarks: new FormControl(''),
    })

    this.siBondMortgageForm = this.formBuilder.group({
      bondNumber: new FormControl('', Validators.required),
      faceValue: new FormControl('', Validators.required),
      surrenderValue: new FormControl('', Validators.required),
      // bondPath: new FormControl('', Validators.required),
      // pledgedFilePath: new FormControl('', Validators.required),
      maturityDate: new FormControl('', Validators.required),
      remarks: new FormControl('')
    })

    this.siVehicleMortgageForm = this.formBuilder.group({
      vechileName: new FormControl('', Validators.required),
      rcNumber: new FormControl('', Validators.required),
      // rcFilePath: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      remarks: new FormControl(''),
    })

    this.siStorageMortgageForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      totalWeight: new FormControl('', Validators.required),
      netWeight: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      remarks: new FormControl('')
    })

    this.siOtherMortgageForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      noOfUnits: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      remarks: new FormControl('')
    })

  }

  ngOnInit() {
    this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.getAllLandTypes();
    this.collateraltypeOptionsList = [
      { label: 'Gold', value: 1 },
      { label: 'Land', value: 2 },
      { label: 'Bond', value: 3 },
      { label: 'Vehicle', value: 4 },
      { label: 'Storage', value: 5 },
      { label: 'Other', value: 6 }
    ];

    this.carratsList = [
      { label: 'Select', value: 'Select' },
      { label: '22', value: '22' },
      { label: '24', value: '24' },
    ];

    this.goldLoanMortgageColumns = [
      { field: 'itemName', header: 'ITEM NAME' },
      { field: 'netWeight', header: 'NET WEIGHT IN GRAMS' },
      { field: 'grossWeight', header: 'GROSS WEIGHT IN GRAMS' },
      { field: 'value', header: 'VALUE' },
      { field: 'remarks', header: 'REMARKS' },
      { field: 'Action', header: 'ACTION' },
    ];

    this.landLoanMortgageColumns = [
      { field: 'passbookNumber', header: 'PASSBOOK NUMBER' },
      { field: 'surveyNo', header: 'SURVEY NUMBER' },
      { field: 'landType', header: 'LAND TYPE' },
      { field: 'landUnits', header: 'LAND IN UNITS' },
      { field: 'landSubUnits', header: 'LAND IN SUB UNITS' },
      { field: 'value', header: 'VALUE' },
      { field: 'declaredLandUnits', header: 'DECLATRED LAND IN UNITS' },
      { field: 'declaredLandSubUnits', header: 'DECLARED LAND IN SUB UNITS' },
      { field: 'remarks', header: 'REMARKS' },
      { field: 'Action', header: 'ACTION' },
    ];

    this.bondLoanMortgageColumns = [
      { field: 'itemName', header: 'ITEM NAME' },
      { field: 'netWeight', header: 'NET WEIGHT IN GRAMS' },
      { field: 'grossWeight', header: 'GROSS WEIGHT IN GRAMS' },
      { field: 'value', header: 'VALUE' },
      { field: 'remarks', header: 'REMARKS' },
      { field: 'Action', header: 'ACTION' },
    ];

    this.vehicleLoanMortgageColumns = [
      { field: 'itemName', header: 'ITEM NAME' },
      { field: 'netWeight', header: 'NET WEIGHT IN GRAMS' },
      { field: 'grossWeight', header: 'GROSS WEIGHT IN GRAMS' },
      { field: 'value', header: 'VALUE' },
      { field: 'remarks', header: 'REMARKS' },
      { field: 'Action', header: 'ACTION' },
    ];

    this.storageLoanMortgageColumns = [
      { field: 'itemName', header: 'ITEM NAME' },
      { field: 'netWeight', header: 'NET WEIGHT IN GRAMS' },
      { field: 'grossWeight', header: 'GROSS WEIGHT IN GRAMS' },
      { field: 'value', header: 'VALUE' },
      { field: 'remarks', header: 'REMARKS' },
      { field: 'Action', header: 'ACTION' },
    ];

    this.otherLoanMortgageColumns = [
      { field: 'itemName', header: 'ITEM NAME' },
      { field: 'netWeight', header: 'NET WEIGHT IN GRAMS' },
      { field: 'grossWeight', header: 'GROSS WEIGHT IN GRAMS' },
      { field: 'value', header: 'VALUE' },
      { field: 'remarks', header: 'REMARKS' },
      { field: 'Action', header: 'ACTION' },
    ];

    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let queryParams = this.encryptDecryptService.decrypt(params['id']);
        this.loanAccId = Number(queryParams);
        // this.isEdit = true;
        this.getSILoanApplicationById(this.loanAccId);
      } else {
        this.isEdit = false;
      }
    });

    this.siGoldMortgageForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      // if (this.siGoldMortgageForm.valid) {
      //   this.save();
      // }
    });

    this.siLandMortgageForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      // if (this.siLandMortgageForm.valid) {
      //   this.save();
      // }
    });

    this.siBondMortgageForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      // if (this.siBondMortgageForm.valid) {
      //   this.save();
      // }
    });

    this.siVehicleMortgageForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      // if (this.siVehicleMortgageForm.valid) {
      //   this.save();
      // }
    });

    this.siStorageMortgageForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      // if (this.siStorageMortgageForm.valid) {
      //   this.save();
      // }
    });

    this.siOtherMortgageForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      // if (this.siOtherMortgageForm.valid) {
      //   this.save();
      // }
    });

  }

  save() {
    this.updateData();
  }

  updateData() {
    if (this.collateralType == 1) {
      this.showGoldform = true;
      this.siGoldLoanMortgageModel.collateralType = this.collateralType;
      this.siLoanApplicationService.changeData({
        formValid: this.siGoldMortgageForm.valid,
        data: this.siGoldLoanMortgageModel,
        isDisable: !this.siGoldMortgageForm.valid ? applicationConstants.TRUE : applicationConstants.FALSE,
        stepperIndex: 7,
      });
    } else if (this.collateralType == 2) {
      this.siLandLoanMortgageModel.collateralType = this.collateralType;
      this.siLandLoanMortgageModel.landTypeName = this.landTypeName;
      this.siLoanApplicationService.changeData({
        formValid: !this.siLandMortgageForm.valid ? true : false,
        data: this.siLandLoanMortgageModel,
        isDisable: !this.siLandMortgageForm.valid ? applicationConstants.TRUE : applicationConstants.FALSE,
        stepperIndex: 7,
      });
    } else if (this.collateralType == 3) {
      this.siBondLoanMortgageModel.collateralType = this.collateralType;
      this.siLoanApplicationService.changeData({
        formValid: !this.siBondMortgageForm.valid ? true : false,
        data: this.siBondLoanMortgageModel,
        isDisable: !this.siBondMortgageForm.valid ? applicationConstants.TRUE : applicationConstants.FALSE,
        stepperIndex: 7,
      });
    } else if (this.collateralType == 4) {
      this.siVehicleLoanMortgageModel.collateralType = this.collateralType;
      this.siLoanApplicationService.changeData({
        formValid: !this.siVehicleMortgageForm.valid ? true : false,
        data: this.siVehicleLoanMortgageModel,
        isDisable: !this.siVehicleMortgageForm.valid ? applicationConstants.TRUE : applicationConstants.FALSE,
        stepperIndex: 7,
      });
    } else if (this.collateralType == 5) {
      this.siStorageLoanMortgageModel.collateralType = this.collateralType;
      this.siLoanApplicationService.changeData({
        formValid: !this.siStorageMortgageForm.valid ? true : false,
        data: this.siStorageLoanMortgageModel,
        isDisable: !this.siStorageMortgageForm.valid ? applicationConstants.TRUE : applicationConstants.FALSE,
        stepperIndex: 7,
      });
    } else if (this.collateralType == 6) {
      this.siOtherLoanMortgageModel.collateralType = this.collateralType;
      this.siLoanApplicationService.changeData({
        formValid: !this.siOtherMortgageForm.valid ? true : false,
        data: this.siOtherLoanMortgageModel,
        isDisable: !this.siOtherMortgageForm.valid ? applicationConstants.TRUE : applicationConstants.FALSE,
        stepperIndex: 7,
      });
    } else {
      this.siLoanApplicationService.changeData({
        formValid: false,
        data: null,
        isDisable: true,
        stepperIndex: 7,
      });
    }
  }

  getAllLandTypes() {
    
    this.commonComponent.startSpinner();
    this, this.siLoanMortagageDetailsService.getAllLandTypes().subscribe(response => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.landTypesList = this.responseModel.data.filter((landType: { status: number; }) => landType.status == 1).map((landType: any) => {
          return { label: landType.name, value: landType.id };
        });
      }
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
      })
  }

  onChangeLandType(event: any) {
    if (event != null && event != undefined) {
      const filteredItem = this.landTypesList.find((item: { value: any; }) => item.value === event);
      this.landTypeName = filteredItem.label;
    }
  }

  getSILoanApplicationById(loanAccId: any) {
    this.commonFunctionsService
    this.siLoanApplicationService.getSILoanApplicationById(loanAccId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {

            if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
              if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
                this.siLoanApplicationModel = this.responseModel.data[0];

                if (this.siLoanApplicationModel.collateralType != undefined) {
                  this.collateralType = this.siLoanApplicationModel.collateralType;
                  if (this.siLoanApplicationModel.collateralType == 1) {
                    this.getSIGoldLoanMortgageDetailsByLoanAccId(loanAccId);
                  } else if (this.siLoanApplicationModel.collateralType == 2) {
                    this.getSILandLoanMortgageDetailsByLoanAccId(loanAccId);
                  } else if (this.siLoanApplicationModel.collateralType == 3) {
                    this.getSIBondLoanMortgageDetailsByLoanAccId(loanAccId);
                  } else if (this.siLoanApplicationModel.collateralType == 4) {
                    this.getSIVehicleLoanMortgageDetailsByLoanAccId(loanAccId);
                  } else if (this.siLoanApplicationModel.collateralType == 5) {
                    this.getSIStorageLoanMortgageDetailsByLoanAccId(loanAccId);
                  } else if (this.siLoanApplicationModel.collateralType == 6) {
                    this.getSIOtherLoanMortgageDetailsByLoanAccId(loanAccId);
                  }
                }
                // this.updateData();
              }
            }
          }
        }
      }
    });
  }

  onChange(event: any) {
    this.getFormBasedOnCollateralType(event);
    this.collateralType = event;
  }

  getFormBasedOnCollateralType(collateralType: any) {
    this.siGoldLoanMortgageModel = new SiGoldLoanMortgage();
    this.siLandLoanMortgageModel = new SiLandLoanMortgage();
    this.siBondLoanMortgageModel = new SiBondLoanMortgage();
    this.siVehicleLoanMortgageModel = new SiVehicleLoanMortgage();
    this.siStorageLoanMortgageModel = new SiStorageLoanMortgage();
    this.siOtherLoanMortgageModel = new SiOtherLoanMortgage();

    this.isSameCollateral = false;

    if (collateralType == 1) {
      this.collateralType = collateralType;
      this.siGoldLoanMortgageModel.loanAccId = this.loanAccId;
      this.siGoldLoanMortgageModel.collateralType = this.collateralType;
      this.showGoldform = true;
      this.showLandform = false;
      this.showBondform = false;
      this.showVehicleform = false;
      this.showStorageform = false;
      this.showOtherform = false;
    } else if (collateralType == 2) {
      this.collateralType = collateralType;
      this.siLandLoanMortgageModel.loanAccId = this.loanAccId;
      this.siLandLoanMortgageModel.collateralType = this.collateralType;
      this.showGoldform = false;
      this.showLandform = true;
      this.showBondform = false;
      this.showStorageform = false;
      this.showOtherform = false;
    } else if (collateralType == 3) {
      this.collateralType = collateralType;
      this.siBondLoanMortgageModel.loanAccId = this.loanAccId;
      this.siBondLoanMortgageModel.collateralType = this.collateralType;
      this.showGoldform = false;
      this.showLandform = false;
      this.showBondform = true;
      this.showVehicleform = false;
      this.showStorageform = false;
      this.showOtherform = false;
    } else if (collateralType == 4) {
      this.collateralType = collateralType;
      this.siVehicleLoanMortgageModel.loanAccId = this.loanAccId;
      this.siVehicleLoanMortgageModel.collateralType = this.collateralType;
      this.showGoldform = false;
      this.showLandform = false;
      this.showBondform = false;
      this.showVehicleform = true;
      this.showStorageform = false;
      this.showOtherform = false;
    } else if (collateralType == 5) {
      this.collateralType = collateralType;
      this.siStorageLoanMortgageModel.loanAccId = this.loanAccId;
      this.siStorageLoanMortgageModel.collateralType = this.collateralType;
      this.showGoldform = false;
      this.showLandform = false;
      this.showBondform = false;
      this.showVehicleform = false;
      this.showStorageform = true;
      this.showOtherform = false;
    } else if (collateralType == 6) {
      this.collateralType = collateralType;
      this.siOtherLoanMortgageModel.loanAccId = this.loanAccId;
      this.siOtherLoanMortgageModel.collateralType = this.collateralType;
      this.showGoldform = false;
      this.showLandform = false;
      this.showBondform = false;
      this.showVehicleform = false;
      this.showStorageform = false;
      this.showOtherform = true;
    } else {
      this.showGoldform = false;
      this.showLandform = false;
      this.showBondform = false;
      this.showVehicleform = false;
      this.showStorageform = false;
      this.showOtherform = false;
    }
    this.updateData();
  }

  getEditFormBasedOnCollateralType(collateralType: any) {
    if (collateralType == 1) {
      this.showGoldform = true;
      this.showLandform = false;
      this.showBondform = false;
      this.showVehicleform = false;
      this.showStorageform = false;
      this.showOtherform = false;
      // this.siGoldLoanMortgageModelList = this.siGoldLoanMortgageModel.siLoanGoldMortgageDetailsDTOList;
    } else if (collateralType == 2) {
      this.showGoldform = false;
      this.showLandform = true;
      this.showBondform = false;
      this.showVehicleform = false;
      this.showStorageform = false;
      this.showOtherform = false;
      // this.siLandLoanMortgageModelList = this.siLandLoanMortgageModel.siLoanLandMortgageDetailsDTOList;
    } else if (collateralType == 3) {
      this.showGoldform = false;
      this.showLandform = false;
      this.showBondform = true;
      this.showVehicleform = false;
      this.showStorageform = false;
      this.showOtherform = false;
      // this.siBondLoanMortgageModelList = this.siBondLoanMortgageModel.siBondsMortgageDetailsDTOList;
    } else if (collateralType == 4) {
      this.showGoldform = false;
      this.showLandform = false;
      this.showBondform = false;
      this.showVehicleform = true;
      this.showStorageform = false;
      this.showOtherform = false;
      // this.siVehicleLoanMortgageModelList = this.siVehicleLoanMortgageModel.siLoanVehicleMortgageDetailsDTOList;
    } else if (collateralType == 5) {
      this.showGoldform = false;
      this.showLandform = false;
      this.showBondform = false;
      this.showVehicleform = false;
      this.showStorageform = true;
      this.showOtherform = false;
      // this.siStorageLoanMortgageModelList = this.siStorageLoanMortgageModel.siStorageMortgageDetailsDTOList;
    } else if (collateralType == 6) {
      this.showGoldform = false;
      this.showLandform = false;
      this.showBondform = false;
      this.showVehicleform = false;
      this.showStorageform = false;
      this.showOtherform = true;
      // this.siOtherLoanMortgageModelList = this.siOtherLoanMortgageModel.siOtherMortgageDetailsDTOList;
    }
    this.updateData();
  }

  //Get Gold Loan Mortgage detial by loanAccId and AdmissionNumber
  getSIGoldLoanMortgageDetailsByLoanAccId(loanAccId: any) {
    this.siLoanMortagageDetailsService.getSIGoldLoanMortagageDetailsById(loanAccId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        this.isEdit = true;
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.siGoldLoanMortgageList = this.responseModel.data;
            if (this.siLoanApplicationModel.collateralType != null && this.siLoanApplicationModel.collateralType != undefined)
              this.getEditFormBasedOnCollateralType(this.siLoanApplicationModel.collateralType);

            // this.updateData();
          }
        }
      }
    });
  }

  //Get Land Loan Mortgage detial by loanAccId and AdmissionNumber
  getSILandLoanMortgageDetailsByLoanAccId(loanAccId: any) {
    this.commonFunctionsService
    this.siLoanMortagageDetailsService.getSILandLoanMortagageDetailsById(loanAccId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        this.isEdit = true;
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.siLandLoanMortgageList = this.responseModel.data;
            if (this.siLoanApplicationModel.collateralType != null && this.siLoanApplicationModel.collateralType != undefined)
              this.getEditFormBasedOnCollateralType(this.siLoanApplicationModel.collateralType);

            // this.updateData();
          }
        }
      }
    });
  }

  //Get BOnd Loan Mortgage detial by loanAccId and AdmissionNumber
  getSIBondLoanMortgageDetailsByLoanAccId(loanAccId: any) {
    this.commonFunctionsService
    this.siLoanMortagageDetailsService.getSIBondLoanMortagageDetailsById(loanAccId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        this.isEdit = true;
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.siBondLoanMortgageList = this.responseModel.data;
            if (this.siLoanApplicationModel.collateralType != null && this.siLoanApplicationModel.collateralType != undefined)
              this.getEditFormBasedOnCollateralType(this.siLoanApplicationModel.collateralType);

            this.updateData();
          }
        }
      }
    });
  }

  //Get Vehicle Loan Mortgage detial by loanAccId and AdmissionNumber
  getSIVehicleLoanMortgageDetailsByLoanAccId(loanAccId: any) {
    this.commonFunctionsService
    this.siLoanMortagageDetailsService.getSIVehicleLoanMortagageDetailsById(loanAccId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        this.isEdit = true;
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.siVehicleLoanMortgageList = this.responseModel.data;
            if (this.siLoanApplicationModel.collateralType != null && this.siLoanApplicationModel.collateralType != undefined)
              this.getEditFormBasedOnCollateralType(this.siLoanApplicationModel.collateralType);

            this.updateData();
          }
        }
      }
    });
  }

  //Get Storage Loan Mortgage detial by loanAccId and AdmissionNumber
  getSIStorageLoanMortgageDetailsByLoanAccId(loanAccId: any) {
    this.commonFunctionsService
    this.siLoanMortagageDetailsService.getSIStorageLoanMortagageDetailsById(loanAccId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        this.isEdit = true;
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.siStorageLoanMortgageList = this.responseModel.data;
            if (this.siLoanApplicationModel.collateralType != null && this.siLoanApplicationModel.collateralType != undefined)
              this.getEditFormBasedOnCollateralType(this.siLoanApplicationModel.collateralType);

            this.updateData();
          }
        }
      }
    });
  }

  //Get Other Loan Mortgage detial by loanAccId and AdmissionNumber
  getSIOtherLoanMortgageDetailsByLoanAccId(loanAccId: any) {
    this.commonFunctionsService
    this.siLoanMortagageDetailsService.getSIOtherLoanMortagageDetailsById(loanAccId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        this.isEdit = true;
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.siOtherLoanMortgageList = this.responseModel.data;
            if (this.siLoanApplicationModel.collateralType != null && this.siLoanApplicationModel.collateralType != undefined)
              this.getEditFormBasedOnCollateralType(this.siLoanApplicationModel.collateralType);

            this.updateData();
          }
        }
      }
    });
  }

  getSILoanMortgageDetailsByLoanAccId(loanAccId: any) {
    this.siLoanMortagageDetailsService.getSIGoldLoanMortgageDetailsByLoanAccId(loanAccId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
            this.siGoldLoanMortgageModel = this.responseModel.data[0];
            this.siLoanApplicationService.changeData({
              formValid: this.siGoldMortgageForm.valid,
              data: this.siGoldLoanMortgageModel,
              isDisable: (!this.siGoldMortgageForm.valid),
              stepperIndex: 5,
            });
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

  addGoldLoanMortgage() {
    this.siGoldLoanMortgageModel = new SiGoldLoanMortgage();
    this.addButtonService = true;
    this.editDeleteDisable = true;
    /**
     * for update validation
     */
    this.updateData();
    this.gold._first = 0;
    this.gold.value.unshift({ itemName: '', netWeight: '', grossWeight: '', carats: '', value: '', remarks: '' });
    this.gold.initRowEdit(this.gold.value[0]);
  }

  addLandLoanMortgage() {
    this.siLandLoanMortgageModel = new SiLandLoanMortgage();
    this.addButtonService = true;
    this.editDeleteDisable = true;
    /**
     * for update validation
     */
    this.updateData();
    this.land._first = 0;
    this.land.value.unshift({ passbookNumber: '', surveyNo: '', landType: '', landUnits: '', landSubUnits: '', value: '', declaredLandUnits: '', declaredLandSubUnits: '', remarks: '' });
    this.land.initRowEdit(this.land.value[0]);
  }

  addBondLoanMortgage() {
    this.siBondLoanMortgageModel = new SiBondLoanMortgage();
    this.addButtonService = true;
    this.editDeleteDisable = true;
    /**
     * for update validation
     */
    this.updateData();
    this.bond._first = 0;
    this.bond.value.unshift({ bondNumber: '', faceValue: '', surrenderValue: '', maturityDate: '', remarks: '' });
    this.bond.initRowEdit(this.bond.value[0]);
  }

  addVehicleLoanMortgage() {
    this.siVehicleLoanMortgageModel = new SiVehicleLoanMortgage();
    this.addButtonService = true;
    this.editDeleteDisable = true;
    /**
     * for update validation
     */
    this.updateData();
    this.vehicle._first = 0;
    this.vehicle.value.unshift({ vechileName: '', rcNumber: '', value: '', brand: '', remarks: '' });
    this.vehicle.initRowEdit(this.vehicle.value[0]);
  }

  addStorageLoanMortgage() {
    this.siStorageLoanMortgageModel = new SiStorageLoanMortgage();
    this.addButtonService = true;
    this.editDeleteDisable = true;
    /**
     * for update validation
     */
    this.updateData();
    this.storage._first = 0;
    this.storage.value.unshift({ name: '', quantity: '', totalWeight: '', netWeight: '', value: '', remarks: '' });
    this.storage.initRowEdit(this.storage.value[0]);
  }

  addOtherLoanMortgage() {
    this.siOtherLoanMortgageModel = new SiOtherLoanMortgage();
    this.addButtonService = true;
    this.editDeleteDisable = true;
    /**
     * for update validation
     */
    this.updateData();
    this.other._first = 0;
    this.other.value.unshift({ name: '', noOfUnits: '', value: '', remarks: '' });
    this.other.initRowEdit(this.other.value[0]);
  }

  saveGoldLoanMortgage(row: any) {
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.siGoldLoanMortgageModel = row;
    this.siGoldLoanMortgageModel.siLoanApplicationId = this.loanAccId;
    this.siGoldLoanMortgageModel.admissionNo = this.siLoanApplicationModel.admissionNo;
    this.siGoldLoanMortgageModel.status = applicationConstants.ACTIVE;
    this.updateData();
    if (row.id != null && row.id != undefined) {
      this.siLoanMortagageDetailsService.updateSIGoldLoanMortagageDetails(this.siGoldLoanMortgageModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siGoldLoanMortgageModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].siLoanApplicationId != undefined) {
                this.getSIGoldLoanMortgageDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
    else {
      this.siLoanMortagageDetailsService.addSIGoldLoanMortagageDetails(this.siGoldLoanMortgageModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siGoldLoanMortgageModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].sbAccId != undefined) {
                this.getSIGoldLoanMortgageDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
  }

  saveLandLoanMortgage(row: any) {
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.siLandLoanMortgageModel = row;
    this.siLandLoanMortgageModel.admissionNo = this.siLoanApplicationModel.admissionNo;
    this.siLandLoanMortgageModel.siLoanApplicationId = this.loanAccId;
    this.siLandLoanMortgageModel.status = applicationConstants.ACTIVE;
    this.updateData();
    if (row.id != null && row.id != undefined) {
      this.siLoanMortagageDetailsService.updateSILandLoanMortagageDetails(this.siLandLoanMortgageModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siLandLoanMortgageModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].siLoanApplicationId != undefined) {
                this.getSILandLoanMortgageDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
    else {
      this.siLoanMortagageDetailsService.addSILandLoanMortagageDetails(this.siLandLoanMortgageModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siLandLoanMortgageModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].sbAccId != undefined) {
                this.getSILandLoanMortgageDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
  }

  saveBondLoanMortgage(row: any) {
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.siBondLoanMortgageModel = row;
    this.siBondLoanMortgageModel.siLoanApplicationId = this.loanAccId;
    this.siBondLoanMortgageModel.admissionNo = this.siLoanApplicationModel.admissionNo;
    this.siBondLoanMortgageModel.status = applicationConstants.ACTIVE;
    this.updateData();
    if (row.id != null && row.id != undefined) {
      this.siLoanMortagageDetailsService.updateSIBondLoanMortagageDetails(this.siBondLoanMortgageModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siBondLoanMortgageModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].siLoanApplicationId != undefined) {
                this.getSIBondLoanMortgageDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
    else {
      this.siLoanMortagageDetailsService.addSIBondLoanMortagageDetails(this.siBondLoanMortgageModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siBondLoanMortgageModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].sbAccId != undefined) {
                this.getSIBondLoanMortgageDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
  }

  saveVehicleLoanMortgage(row: any) {
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.siVehicleLoanMortgageModel = row;
    this.siVehicleLoanMortgageModel.siLoanApplicationId = this.loanAccId;
    this.siVehicleLoanMortgageModel.admissionNo = this.siLoanApplicationModel.admissionNo;
    this.siVehicleLoanMortgageModel.status = applicationConstants.ACTIVE;
    this.updateData();
    if (row.id != null && row.id != undefined) {
      this.siLoanMortagageDetailsService.updateSIVehicleLoanMortagageDetails(this.siVehicleLoanMortgageModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siVehicleLoanMortgageModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].siLoanApplicationId != undefined) {
                this.getSIVehicleLoanMortgageDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
    else {
      this.siLoanMortagageDetailsService.addSIVehicleLoanMortagageDetails(this.siVehicleLoanMortgageModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siVehicleLoanMortgageModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].sbAccId != undefined) {
                this.getSIVehicleLoanMortgageDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
  }

  saveStorageLoanMortgage(row: any) {
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.siStorageLoanMortgageModel = row;
    this.siStorageLoanMortgageModel.siLoanApplicationId = this.loanAccId;
    this.siStorageLoanMortgageModel.admissionNo = this.siLoanApplicationModel.admissionNo;
    this.siStorageLoanMortgageModel.status = applicationConstants.ACTIVE;
    this.updateData();
    if (row.id != null && row.id != undefined) {
      this.siLoanMortagageDetailsService.updateSIStorageLoanMortagageDetails(this.siStorageLoanMortgageModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siStorageLoanMortgageModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].siLoanApplicationId != undefined) {
                this.getSIStorageLoanMortgageDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
    else {
      this.siLoanMortagageDetailsService.addSIStorageLoanMortagageDetails(this.siStorageLoanMortgageModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siStorageLoanMortgageModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].sbAccId != undefined) {
                this.getSIStorageLoanMortgageDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
  }

  saveOtherLoanMortgage(row: any) {
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.siOtherLoanMortgageModel = row;
    this.siOtherLoanMortgageModel.siLoanApplicationId = this.loanAccId;
    this.siOtherLoanMortgageModel.admissionNo = this.siLoanApplicationModel.admissionNo;
    this.siOtherLoanMortgageModel.status = applicationConstants.ACTIVE;
    this.updateData();
    if (row.id != null && row.id != undefined) {
      this.siLoanMortagageDetailsService.updateSIOtherLoanMortagageDetails(this.siOtherLoanMortgageModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siOtherLoanMortgageModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].siLoanApplicationId != undefined) {
                this.getSIOtherLoanMortgageDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
    else {
      this.siLoanMortagageDetailsService.addSIOtherLoanMortagageDetails(this.siOtherLoanMortgageModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siOtherLoanMortgageModel = this.responseModel.data;
              this.addButtonService = false;
              if (this.responseModel.data[0].siLoanApplicationId != null && this.responseModel.data[0].sbAccId != undefined) {
                this.getSIOtherLoanMortgageDetailsByLoanAccId(this.responseModel.data[0].siLoanApplicationId);
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
  }

  cancelGoldLoanMortgage() {
    this.siGoldLoanMortgageList = [];
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.getSIGoldLoanMortgageDetailsByLoanAccId(this.loanAccId);
  }

  cancelLandLoanMortgage() {
    this.siLandLoanMortgageList = [];
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.getSILandLoanMortgageDetailsByLoanAccId(this.loanAccId);
  }

  cancelBondLoanMortgage() {
    this.siBondLoanMortgageList = [];
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.getSIBondLoanMortgageDetailsByLoanAccId(this.loanAccId);
  }

  cancelVehicleLoanMortgage() {
    this.siVehicleLoanMortgageList = [];
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.getSIVehicleLoanMortgageDetailsByLoanAccId(this.loanAccId);
  }

  cancelStorageLoanMortgage() {
    this.siStorageLoanMortgageList = [];
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.getSIStorageLoanMortgageDetailsByLoanAccId(this.loanAccId);
  }

  cancelOtherLoanMortgage() {
    this.siOtherLoanMortgageList = [];
    this.addButtonService = false;
    this.editDeleteDisable = false;
    this.getSIOtherLoanMortgageDetailsByLoanAccId(this.loanAccId);
  }


  editGoldLoanMortgage(rowData: any) {
    this.addButtonService = true;
    this.editDeleteDisable = true;
    this.updateData();
    this.siLoanMortagageDetailsService.getSIGoldLoanMortagageDetailsById(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siGoldLoanMortgageModel = this.responseModel.data[0];
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

  editLandLoanMortgage(rowData: any) {
    this.addButtonService = true;
    this.editDeleteDisable = true;
    this.updateData();
    this.siLoanMortagageDetailsService.getSILandLoanMortagageDetailsById(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siLandLoanMortgageModel = this.responseModel.data[0];
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

  editBondLoanMortgage(rowData: any) {
    this.addButtonService = true;
    this.editDeleteDisable = true;
    this.updateData();
    this.siLoanMortagageDetailsService.getSIBondLoanMortagageDetailsById(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siBondLoanMortgageModel = this.responseModel.data[0];
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

  editVehicleLoanMortgage(rowData: any) {
    this.addButtonService = true;
    this.editDeleteDisable = true;
    this.updateData();
    this.siLoanMortagageDetailsService.getSIVehicleLoanMortagageDetailsById(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siVehicleLoanMortgageModel = this.responseModel.data[0];
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

  editStorageLoanMortgage(rowData: any) {
    this.addButtonService = true;
    this.editDeleteDisable = true;
    this.updateData();
    this.siLoanMortagageDetailsService.getSIStorageLoanMortagageDetailsById(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siStorageLoanMortgageModel = this.responseModel.data[0];
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

  editOtherLoanMortgage(rowData: any) {
    this.addButtonService = true;
    this.editDeleteDisable = true;
    this.updateData();
    this.siLoanMortagageDetailsService.getSIOtherLoanMortagageDetailsById(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siOtherLoanMortgageModel = this.responseModel.data[0];
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

  deleteGoldLoanMortgage(row: any) {
    this.siLoanMortagageDetailsService.deleteSIGoldLoanMortagageDetails(row.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siGoldLoanMortgageList = this.responseModel.data;
        this.getSIGoldLoanMortgageDetailsByLoanAccId(this.loanAccId);
      }
    });
  }

  deleteLandLoanMortgage(row: any) {
    this.siLoanMortagageDetailsService.deleteSILandLoanMortagageDetails(row.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siLandLoanMortgageList = this.responseModel.data;
        this.getSILandLoanMortgageDetailsByLoanAccId(this.loanAccId);
      }
    });
  }

  deleteBondLoanMortgage(row: any) {
    this.siLoanMortagageDetailsService.deleteSIBondLoanMortagageDetails(row.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siBondLoanMortgageList = this.responseModel.data;
        this.getSIBondLoanMortgageDetailsByLoanAccId(this.loanAccId);
      }
    });
  }

  deleteVehicleLoanMortgage(row: any) {
    this.siLoanMortagageDetailsService.deleteSIVehicleLoanMortagageDetails(row.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siVehicleLoanMortgageList = this.responseModel.data;
        this.getSIVehicleLoanMortgageDetailsByLoanAccId(this.loanAccId);
      }
    });
  }

  deleteStorageLoanMortgage(row: any) {
    this.siLoanMortagageDetailsService.deleteSIStorageLoanMortagageDetails(row.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siStorageLoanMortgageList = this.responseModel.data;
        this.getSIStorageLoanMortgageDetailsByLoanAccId(this.loanAccId);
      }
    });
  }

  deleteOtherLoanMortgage(row: any) {
    this.siLoanMortagageDetailsService.deleteSIOtherLoanMortagageDetails(row.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siOtherLoanMortgageList = this.responseModel.data;
        this.getSIOtherLoanMortgageDetailsByLoanAccId(this.loanAccId);
      }
    });
  }

}
