import { CommunicationDetailsModel } from './../../../../savings-bank-transcation/view-savings-bank/shared/view-saving-bank-model';
import { SiLoanCommunicationService } from './../../../shared/si-loans/si-loan-communication.service';
import { SiLoanCommunication } from './../../../shared/si-loans/si-loan-communication.model';
import { SiLoanApplication } from './../../../shared/si-loans/si-loan-application.model';
import { SiLoanApplicationService } from './../../../shared/si-loans/si-loan-application.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MemberGroupDetailsModel, promoterDetailsModel, MembershipBasicRequiredDetails, MembershipInstitutionDetailsModel, InstitutionPromoterDetailsModel } from '../../../shared/si-loans/si-loan-membership-details.model';
import { MembershipServiceService } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-service.service';

@Component({
  selector: 'app-si-communication',
  templateUrl: './si-communication.component.html',
  styleUrls: ['./si-communication.component.css']
})
export class SiCommunicationComponent {
  checked: boolean = false;
  communicationForm: any;
  communication: any;

  siLoanApplicationModel: SiLoanApplication = new SiLoanApplication();
  siLoanCommunicationModel: SiLoanCommunication = new SiLoanCommunication();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  promoterDetailsModel: promoterDetailsModel = new promoterDetailsModel();
  membershipBasicRequiredDetailsModel: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  institutionPromoterDetailsModel: InstitutionPromoterDetailsModel = new InstitutionPromoterDetailsModel();

  sameAsPermanentAddress: boolean = false;
  responseModel!: Responsemodel;
  accountType: any;
  applicationType: any;
  msgs: any[] = [];
  accountOpeningDateVal: any;
  savedId: any;
  isEdit: any;
  flagForLabelName: any;
  accountOpeningDate: any;
  minBalence: any;
  loanAccId: any;
  statesList: any[] = [];
  districtsList: any[] = [];
  mandalsList: any[] = [];
  villageList: any[] = [];
  orgnizationSetting: any;
  productName: any;
  admissionNumber: any;
  memberTypeId: any;
  memberTypeName: any;
  memberName: any;
  mobileNumber: any;
  qualificationName: any;
  aadharNumber: any;

  individualFlag: boolean = false;
  groupFlag: boolean = false;
  institutionFlag: boolean = false;
  promoterDetails: any[] = [];
  institutionPromoter: any[] = [];
  mobileNumer: any;
  panNumber: any;

  permanentStatesList: any[] = [];
  permanentDistrictList: any[] = [];
  permanentMandalsList: any[] = [];
  permanentVillagesList: any[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder,
    private commonComponent: CommonComponent, private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService, private siLoanApplicationService: SiLoanApplicationService,
    private siLoanCommunicationService: SiLoanCommunicationService, private membershipServiceService: MembershipServiceService) {

    this.communicationForm = this.formBuilder.group({
      state: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      mandal: new FormControl('', Validators.required),
      village: new FormControl('', Validators.required),
      pinCode: ['', [Validators.pattern(applicationConstants.PINCODE_PATTERN), Validators.compose([Validators.required])]],
      regesteredAddressOne: [{ value: '' }],
      permanentState: new FormControl('', Validators.required),
      permanentDistrict: new FormControl('', Validators.required),
      permanentSubDistrict: new FormControl('', Validators.required),
      permanentVillage: new FormControl('', Validators.required),
      permanentPinCode: ['', [Validators.pattern(applicationConstants.PINCODE_PATTERN), Validators.compose([Validators.required])]],
      permanentAddressOne: [{ value: '' }],
      checked: [{ value: '' }],
    })
  }

  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined || params['admissionNumber'] != undefined) {
        if (params['id'] != undefined) {
          let id = this.encryptDecryptService.decrypt(params['id']);
          this.loanAccId = Number(id);
          if (params['admissionNumber'] != undefined) {
            this.admissionNumber = this.encryptDecryptService.decrypt(params['admissionNumber']);
          }
          this.getSILoanApplicationById(this.loanAccId);
        }
        // this.isEdit = true;
        if (this.siLoanApplicationModel != null && this.siLoanApplicationModel != null)
          this.flagForLabelName = true;
      } else {
        this.isEdit = false;
        this.flagForLabelName = false;
      }

    });
    this.communicationForm.valueChanges.subscribe((data: any) => {
      this.updateData();
    });
    this.getAllStates();
  }

  save() {
    this.updateData();
  }

  updateData() {
    if (this.statesList != null && this.statesList != undefined && this.statesList.length > 0) {
      let permanentState = this.statesList.find((data: any) => null != data && this.siLoanCommunicationModel.stateId != null && data.value == this.siLoanCommunicationModel.permanentStateId);
      if (permanentState != null && undefined != permanentState) {
        this.siLoanCommunicationModel.permanentStateName = permanentState.label;
      }
    }
    this.siLoanApplicationService.changeData({
      formValid: this.communicationForm.valid,
      data: this.siLoanCommunicationModel,
      isDisable: !this.communicationForm.valid ? applicationConstants.TRUE : applicationConstants.FALSE,
      stepperIndex: 2,
    });
  }

  //member module data by member admission Number
  getMemberDetailsByAdmissionNumber(admissionNumber: any) {
    this.membershipServiceService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.responseModel.data[0].memberShipCommunicationDetailsDTOList;
          if (this.responseModel.data[0].memberShipCommunicationDetailsDTOList.length > 0 && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != undefined) {
            this.siLoanCommunicationModel = this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0];
          }
          if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
            this.siLoanCommunicationModel.admissionNumber = this.responseModel.data[0].admissionNumber;
          }
          if (this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined) {
            this.siLoanCommunicationModel.memberTypeName = this.responseModel.data[0].memberTypeName;
          }
          if (this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined) {
            this.siLoanCommunicationModel.memberType = this.responseModel.data[0].memberTypeId;
          }
          if (this.siLoanCommunicationModel.isSameAddress != null && this.siLoanCommunicationModel.isSameAddress != undefined) {
            this.sameAsPerAddr();
          }
          this.loadMasterDataListMemberModule(this.siLoanCommunicationModel);
          this.siLoanCommunicationModel.id = null;
        }
      }
      this.updateData();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  //member module data by member admissionNumber
  getMemberGroupDetailsByGroupAdmissionNumber(admissionNumber: any) {
    this.membershipServiceService.getMemberGroupByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.responseModel.data[0].groupCommunicationList;
          if (this.responseModel.data[0].groupCommunicationList.length > 0 && this.responseModel.data[0].groupCommunicationList[0] != null && this.responseModel.data[0].groupCommunicationList[0] != undefined) {
            this.siLoanCommunicationModel = this.responseModel.data[0].groupCommunicationList[0];
            this.loadMasterDataListMemberModule(this.siLoanCommunicationModel);
          }
          if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
            this.siLoanCommunicationModel.admissionNumber = this.responseModel.data[0].admissionNumber;
          }
          if (this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined) {
            this.siLoanApplicationModel.memberTypeName = this.responseModel.data[0].memberTypeName;
          }
          if (this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined) {
            this.siLoanCommunicationModel.memberType = this.responseModel.data[0].memberTypeId;
          }

          this.siLoanCommunicationModel.id = null;
          if (this.siLoanCommunicationModel.isSameAddress != null && this.siLoanCommunicationModel.isSameAddress != undefined) {
            this.sameAsPerAddr();
          }
        }
        this.updateData();
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  //member module data by member admission Number
  getMemberInstitutionDetailsByAdmissionNumber(admissionNumber: any) {
    this.membershipServiceService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.responseModel.data[0].institutionCommunicationDTOList;
          if (this.responseModel.data[0].institutionCommunicationDTOList.length > 0 && this.responseModel.data[0].institutionCommunicationDTOList.length > 0 && this.responseModel.data[0].institutionCommunicationDTOList[0] != null && this.responseModel.data[0].institutionCommunicationDTOList[0] != undefined) {
            this.siLoanCommunicationModel = this.responseModel.data[0].institutionCommunicationDTOList[0];
            this.loadMasterDataListMemberModule(this.siLoanCommunicationModel);
          }
          if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined) {
            this.siLoanCommunicationModel.admissionNumber = this.responseModel.data[0].admissionNumber;
          }
          if (this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined) {
            this.siLoanApplicationModel.memberTypeName = this.responseModel.data[0].memberTypeName;
          }
          if (this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined) {
            this.siLoanCommunicationModel.memberType = this.responseModel.data[0].memberTypeId;
          }
          this.siLoanCommunicationModel.id = null;
          if (this.siLoanCommunicationModel.isSameAddress != null && this.siLoanCommunicationModel.isSameAddress != undefined) {
            this.sameAsPerAddr();
          }
        }
        this.updateData();
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  getSILoanApplicationById(id: any) {
    this.siLoanApplicationService.getSILoanApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.siLoanApplicationModel = this.responseModel.data[0];

            if (this.siLoanApplicationModel.siLoanCommunicationDTO != null && this.siLoanApplicationModel.siLoanCommunicationDTO != undefined) {
              this.isEdit = true;
              this.siLoanCommunicationModel = this.siLoanApplicationModel.siLoanCommunicationDTO;

              if (this.siLoanCommunicationModel.admissionNumber != null && this.siLoanCommunicationModel.admissionNumber != undefined) {
                this.siLoanCommunicationModel.admissionNumber = this.siLoanCommunicationModel.admissionNumber;
                this.admissionNumber = this.siLoanCommunicationModel.admissionNumber;
              }
              if (this.siLoanCommunicationModel.memberTypeName != null && this.siLoanCommunicationModel.memberTypeName != undefined)
                this.siLoanCommunicationModel.memberTypeName = this.siLoanCommunicationModel.memberTypeName;

              if (this.siLoanCommunicationModel.memberTypeId != null && this.siLoanCommunicationModel.memberTypeId != undefined)
                this.siLoanCommunicationModel.memberType = this.siLoanCommunicationModel.memberTypeId;

              if (this.siLoanCommunicationModel.isSameAddress != null && this.siLoanCommunicationModel.isSameAddress != undefined) {
                this.sameAsPerAddr();
              }

              this.loadMasterAddressDetails(this.siLoanCommunicationModel);
              this.updateData();
            }
            else {
              this.isEdit = false;
              if (this.siLoanApplicationModel.admissionNo != null && this.siLoanApplicationModel.admissionNo) {
                this.getMemberDetailsByAdmissionNumber(this.siLoanApplicationModel.admissionNo);
                this.getMemberGroupDetailsByGroupAdmissionNumber(this.siLoanApplicationModel.admissionNo);
                this.getMemberInstitutionDetailsByAdmissionNumber(this.siLoanApplicationModel.admissionNo);
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

  sameAsPerAddr() {
    if (this.siLoanCommunicationModel.isSameAddress != undefined && this.siLoanCommunicationModel.isSameAddress != null) {
      if (this.siLoanCommunicationModel.isSameAddress) {
        this.communicationForm.get('permanentState').disable();
        this.communicationForm.get('permanentDistrict').disable();
        this.communicationForm.get('permanentSubDistrict').disable();
        this.communicationForm.get('permanentVillage').disable();
        this.communicationForm.get('permanentPinCode').disable();
        this.communicationForm.get('permanentAddressOne').disable();

        if (this.siLoanCommunicationModel != null && this.siLoanCommunicationModel != undefined) {
          if (this.siLoanCommunicationModel.stateId != null && this.siLoanCommunicationModel.stateId != undefined) {
            this.siLoanCommunicationModel.permanentStateId = this.siLoanCommunicationModel.stateId;

            this.permanentDistrictList = this.districtsList.filter((obj: any) => obj != null).map((permanantDistrict: { label: any; value: any; }) => {
              return { label: permanantDistrict.label, value: permanantDistrict.value };
            });

            let permanentState = this.statesList.find((data: any) => null != data && this.siLoanCommunicationModel.permanentStateId != null && data.value == this.siLoanCommunicationModel.permanentStateId);
            if (permanentState != null && undefined != permanentState) {
              this.siLoanCommunicationModel.permanentStateName = permanentState.label;
            }
          }
          if (this.siLoanCommunicationModel.districtId != null && this.siLoanCommunicationModel.districtId != undefined) {
            this.siLoanCommunicationModel.permanentDistrictId = this.siLoanCommunicationModel.districtId;

            this.permanentMandalsList = this.mandalsList.filter((obj: any) => obj != null).map((permanantMandal: { label: any; value: any; }) => {
              return { label: permanantMandal.label, value: permanantMandal.value };
            });

            let permanentDistrict = this.districtsList.find((data: any) => null != data && this.siLoanCommunicationModel.permanentDistrictId != null && data.value == this.siLoanCommunicationModel.permanentDistrictId);
            if (permanentDistrict != null && undefined != permanentDistrict) {
              this.siLoanCommunicationModel.permanentDistrictName = permanentDistrict.label;
            }
          }
          if (this.siLoanCommunicationModel.subDistrictId != null && this.siLoanCommunicationModel.subDistrictId != undefined) {
            this.siLoanCommunicationModel.permanentSubDistrictId = this.siLoanCommunicationModel.subDistrictId;

            this.permanentVillagesList = this.villageList.filter((obj: any) => obj != null).map((permanantVillage: { label: any; value: any; }) => {
              return { label: permanantVillage.label, value: permanantVillage.value };
            });

            let permanentSubDistrict = this.mandalsList.find((data: any) => null != data && this.siLoanCommunicationModel.permanentSubDistrictId != null && data.value == this.siLoanCommunicationModel.permanentSubDistrictId);
            if (permanentSubDistrict != null && undefined != permanentSubDistrict) {
              this.siLoanCommunicationModel.permanentSubDistrictName = permanentSubDistrict.label;
            }
          }

          if (this.siLoanCommunicationModel.villageId != null && this.siLoanCommunicationModel.villageId != undefined) {
            this.siLoanCommunicationModel.permanentVillageId = this.siLoanCommunicationModel.villageId;

            let permanentVillage = this.villageList.find((data: any) => null != data && this.siLoanCommunicationModel.permanentVillageId != null && data.value == this.siLoanCommunicationModel.permanentVillageId);
            if (permanentVillage != null && undefined != permanentVillage) {
              this.siLoanCommunicationModel.permanentVillageName = permanentVillage.label;
            }
          }

          if (this.siLoanCommunicationModel.pinCode != null && this.siLoanCommunicationModel.pinCode != undefined) {
            this.siLoanCommunicationModel.permanentPinCode = this.siLoanCommunicationModel.pinCode;
          }

          if (this.siLoanCommunicationModel.address1 != null && this.siLoanCommunicationModel.address1 != undefined)
            this.siLoanCommunicationModel.permanentAddress1 = this.siLoanCommunicationModel.address1;
        }
      } else {
        this.communicationForm.get('permanentState').enable();
        this.communicationForm.get('permanentDistrict').enable();
        this.communicationForm.get('permanentSubDistrict').enable();
        this.communicationForm.get('permanentVillage').enable();
        this.communicationForm.get('permanentPinCode').enable();
        this.communicationForm.get('permanentAddressOne').enable();

        this.siLoanCommunicationModel.permanentStateId = null;
        this.siLoanCommunicationModel.permanentDistrictId = null;
        this.siLoanCommunicationModel.permanentSubDistrictId = null;
        this.siLoanCommunicationModel.permanentVillageId = null;
        this.siLoanCommunicationModel.permanentPinCode = null;
        this.siLoanCommunicationModel.permanentAddress1 = null;

        this.permanentDistrictList = [];
        this.permanentMandalsList = [];
        this.permanentVillagesList = [];
      }
    }
  }

  getAllStates() {
    this.siLoanCommunicationService.getAllStates().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.statesList = this.responseModel.data;
            this.statesList = this.responseModel.data.filter((obj: any) => obj != null).map((state: { name: any; id: any; }) => {
              return { label: state.name, value: state.id };
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

  getAllDisttricts() {
    this.siLoanCommunicationService.getAllDisttricts().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.districtsList = this.responseModel.data;
            this.districtsList = this.districtsList.filter((obj: any) => obj != null).map((district: { name: any; id: any; }) => {
              return { label: district.name, value: district.id };
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

  getAllMandals() {
    this.siLoanCommunicationService.getAllMandals().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.mandalsList = this.responseModel.data;
            this.mandalsList = this.mandalsList.filter((obj: any) => obj != null).map((mandal: { name: any; id: any; }) => {
              return { label: mandal.name, value: mandal.id };
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

  getAllVillages() {
    this.siLoanCommunicationService.getAllVillages().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.villageList = this.responseModel.data;
            this.villageList = this.villageList.filter((obj: any) => obj != null).map((village: { name: any; id: any; }) => {
              return { label: village.name, value: village.id };
            });
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

  getDistrictsByStateId(id: any) {
    this.siLoanCommunicationModel.districtId = null;
    this.siLoanCommunicationModel.subDistrictId = null;
    this.siLoanCommunicationModel.villageId = null;

    this.districtsList = [];
    this.mandalsList = [];
    this.villageList = [];
    this.siLoanCommunicationService.getDistrictsByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.districtsList = this.responseModel.data;
          this.districtsList = this.districtsList.filter((obj: any) => obj != null).map((district: { name: any; id: any; }) => {
            return { label: district.name, value: district.id };
          });
          let state = this.statesList.find((data: any) => null != data && this.siLoanCommunicationModel.stateId != null && data.value == this.siLoanCommunicationModel.stateId);
          if (state != null && undefined != state && state.label != null && state.label != undefined) {
            this.siLoanCommunicationModel.stateName = state.label;
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

  getMandalsByDistrctId(id: any) {
    this.siLoanCommunicationModel.villageId = null;
    this.siLoanCommunicationService.getMandalsByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.mandalsList = this.responseModel.data;
          this.mandalsList = this.mandalsList.filter((obj: any) => obj != null).map((mandal: { name: any; id: any; }) => {
            return { label: mandal.name, value: mandal.id };
          });
          let district = this.districtsList.find((data: any) => null != data && this.siLoanCommunicationModel.districtId != null && data.value == this.siLoanCommunicationModel.districtId);
          if (district != null && undefined != district && district.label != null && district.label != undefined)
            this.siLoanCommunicationModel.districtName = district.label;
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

  getAllVillagesByMandalId(id: any) {
    this.siLoanCommunicationService.getvillagesByMandalId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.villageList = this.responseModel.data;
            this.villageList = this.villageList.filter((obj: any) => obj != null).map((village: { name: any; id: any; }) => {
              return { label: village.name, value: village.id };
            });
            let subDistrict = this.mandalsList.find((data: any) => null != data && this.siLoanCommunicationModel.subDistrictId != null && data.value == this.siLoanCommunicationModel.subDistrictId);
            if (subDistrict != null && undefined != subDistrict)
              this.siLoanCommunicationModel.subDistrictName = subDistrict.label;
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

  getPermanentDistrictByPermanetStateId(id: any) {
    this.siLoanCommunicationService.getDistrictsByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined) {
          this.permanentDistrictList = this.responseModel.data;
          this.permanentDistrictList = this.permanentDistrictList.filter((obj: any) => obj != null).map((permanantDistrict: { name: any; id: any; }) => {
            return { label: permanantDistrict.name, value: permanantDistrict.id };
          });
          let permanentState = this.permanentStatesList.find((data: any) => null != data && this.siLoanCommunicationModel.permanentStateId != null && data.value == this.siLoanCommunicationModel.permanentStateId);
          if (permanentState != null && undefined != permanentState) {
            this.siLoanCommunicationModel.permanentStateName = permanentState.label;
          }
          this.getPermanentMandalsByPermanentDistrctId(this.siLoanCommunicationModel.permanentDistrictId);
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

  getPermanentMandalsByPermanentDistrctId(id: any) {
    this.siLoanCommunicationService.getMandalsByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
          this.permanentMandalsList = this.responseModel.data;
          this.permanentMandalsList = this.permanentMandalsList.filter((obj: any) => obj != null).map((permanantMandal: { name: any; id: any; }) => {
            return { label: permanantMandal.name, value: permanantMandal.id };
          });
          let permanentDistrict = this.permanentDistrictList.find((data: any) => null != data && this.siLoanCommunicationModel.permanentDistrictId != null && data.value == this.siLoanCommunicationModel.permanentDistrictId);
          if (permanentDistrict != null && undefined != permanentDistrict)
            this.siLoanCommunicationModel.permanentDistrictName = permanentDistrict.label;

          this.getPermanentVillagesByPermanetMandalId(this.siLoanCommunicationModel.permanentSubDistrictId);
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

  getPermanentVillagesByPermanetMandalId(id: any) {
    this.siLoanCommunicationService.getvillagesByMandalId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
            this.permanentVillagesList = this.responseModel.data;
            this.permanentVillagesList = this.permanentVillagesList.filter((obj: any) => obj != null).map((permanantVillage: { name: any; id: any; }) => {
              return { label: permanantVillage.name, value: permanantVillage.id };
            });
            let permanentSubDistrict = this.permanentMandalsList.find((data: any) => null != data && this.siLoanCommunicationModel.permanentSubDistrictId != null && data.value == this.siLoanCommunicationModel.permanentSubDistrictId);
            if (permanentSubDistrict != null && undefined != permanentSubDistrict)
              this.siLoanCommunicationModel.permanentSubDistrictName = permanentSubDistrict.label;

            let permanentVillage = this.permanentVillagesList.find((data: any) => null != data && this.siLoanCommunicationModel.permanentVillageId != null && data.value == this.siLoanCommunicationModel.permanentVillageId);
            if (permanentVillage != null && undefined != permanentVillage)
              this.siLoanCommunicationModel.permanentVillageName = permanentVillage.label;
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

  onChangeState(stateId: any) {
    this.getDistrictsByStateId(stateId);
  }

  onChangeDistrict(districtId: any) {
    this.getMandalsByDistrctId(districtId);
  }

  onChangeMandal(mandalId: any) {
    this.getAllVillagesByMandalId(mandalId);
  }

  onChangeVillage(villageId: any) {
    let village = this.villageList.find((data: any) => null != data && villageId != null && data.value == villageId);
    if (village != null && undefined != village)
      this.siLoanCommunicationModel.villageName = village.label;
  }

  onChangePermanentState(permanentStateId: any) {
    this.permanentDistrictList = [];
    this.permanentMandalsList = [];
    this.permanentVillagesList = [];
    this.siLoanCommunicationModel.permanentDistrictId = null;
    this.siLoanCommunicationModel.permanentSubDistrictId = null;
    this.siLoanCommunicationModel.permanentVillageId = null;
    this.getPermanentDistrictByPermanetStateId(permanentStateId);
  }

  onChangePermanentDistrict(permanentDistrictId: any) {
    this.permanentMandalsList = [];
    this.permanentVillagesList = [];
    this.siLoanCommunicationModel.permanentSubDistrictId = null;
    this.siLoanCommunicationModel.permanentVillageId = null;
    this.getPermanentMandalsByPermanentDistrctId(permanentDistrictId);
  }

  onChangePermanentSubDistrict(permanentSubDistrictId: any) {
    this.permanentVillagesList = [];
    this.siLoanCommunicationModel.permanentVillageId = null;
    this.getPermanentVillagesByPermanetMandalId(permanentSubDistrictId);
  }

  onChangePermanentVillage(permanentVillageId: any) {
    let permanentVillage = this.permanentVillagesList.find((data: any) => null != data && permanentVillageId != null && data.value == permanentVillageId);
    if (permanentVillage != null && undefined != permanentVillage) {
      this.siLoanCommunicationModel.permanentVillageName = permanentVillage.label;
    }
  }

  loadMasterAddressDetails(obj: any) {
    this.getAllDisttricts();
    this.getAllMandals();
    this.getAllVillages();
    if (obj != null && obj != undefined) {
      if (obj.permanentStateId != null && obj.permanentStateId != undefined)
        this.getPermanentDistrictByPermanetStateId(obj.permanentStateId);

      if (obj.permanentDistrictId != null && obj.permanentDistrictId != undefined)
        this.getPermanentMandalsByPermanentDistrctId(obj.permanentDistrictId);

      if (obj.permanentSubDistrictId != null && obj.permanentSubDistrictId != undefined)
        this.getPermanentVillagesByPermanetMandalId(obj.permanentSubDistrictId);

      if (obj.permanentVillageId != null && obj.permanentVillageId != undefined)
        this.onChangePermanentVillage(obj.permanentVillageId);
    }
  }

  loadMasterDataListMemberModule(obj: any) {
    this.getAllDisttricts();
    this.getAllMandals();
    this.getAllVillages();
    if (obj != null && obj != undefined) {
      if (obj.permanentStateId != null && obj.permanentStateId != undefined) {
        this.siLoanCommunicationModel.permanentStateId = obj.permanentStateId;
        this.getPermanentDistrictByPermanetStateId(obj.permanentStateId);
      }
      if (obj.permanentDistrictId != null && obj.permanentDistrictId != undefined) {
        this.siLoanCommunicationModel.permanentDistrictId = obj.permanentDistrictId;
        this.getPermanentMandalsByPermanentDistrctId(obj.permanentDistrictId);
      }
      if (obj.permanentSubDistrictId != null && obj.permanentSubDistrictId != undefined) {
        this.siLoanCommunicationModel.permanentSubDistrictId = obj.permanentSubDistrictId;
        this.getPermanentVillagesByPermanetMandalId(obj.permanentSubDistrictId);
      }
      if (obj.permanentVillageId != null && obj.permanentVillageId != undefined) {
        this.siLoanCommunicationModel.permanentVillageId = obj.permanentVillageId;
        this.onChangePermanentVillage(obj.permanentVillageId);
      }
      if (obj.permanentPinCode != null && obj.permanentPinCode != undefined)
        this.siLoanCommunicationModel.permanentPinCode = obj.permanentPinCode;

      if (obj.pinCode != null && obj.pinCode != undefined)
        this.siLoanCommunicationModel.pinCode = obj.pinCode;

      if (obj.permanentAddress1 != null)
        this.siLoanCommunicationModel.permanentAddress1 = obj.permanentAddress1;
    }
  }

  appendPinCodeToPermanent() {
    if (this.siLoanCommunicationModel != null && this.siLoanCommunicationModel != undefined && this.siLoanCommunicationModel.isSameAddress != null && this.siLoanCommunicationModel.isSameAddress != undefined && this.siLoanCommunicationModel.isSameAddress) {
      if (this.siLoanCommunicationModel.pinCode != null && this.siLoanCommunicationModel.pinCode != undefined) {
        this.siLoanCommunicationModel.permanentPinCode = this.siLoanCommunicationModel.pinCode;
      }
      if (this.siLoanCommunicationModel.address1 != null && this.siLoanCommunicationModel.address1 != undefined) {
        this.siLoanCommunicationModel.permanentAddress1 = this.siLoanCommunicationModel.address1;
      }
    }
  }

}
