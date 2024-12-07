import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { StatesService } from '../../../shared/states.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { RdAccountCommunication, RdAccountsModel } from '../../../shared/term-depost-model.model';
import { RdAccountsService } from '../../../shared/rd-accounts.service';
import { MemberGroupDetailsModel, MembershipBasicDetail, MembershipInstitutionDetailsModel } from '../../../shared/membership-basic-detail.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { RdAccountCommunicationService } from '../../../shared/rd-account-communication.service';

@Component({
  selector: 'app-recurring-deposit-communication',
  templateUrl: './recurring-deposit-communication.component.html',
  styleUrls: ['./recurring-deposit-communication.component.css']
})
export class RecurringDepositCommunicationComponent {


  communicationForm: any;
  rdAccountModel: RdAccountsModel = new RdAccountsModel();
  rdAccountCommunicationModel: RdAccountCommunication = new RdAccountCommunication();
  sameAsPermanentAddress: boolean = false;
  subDistrictList: any[] = [];
  villageList: any[] = [];
  districtsList: any[] = [];
  statesList: any[] = [];
  permanentStatesList: any[] = [];
  permanentDistrictList: any[] = [];
  permanentSubDistrictList: any[] = [];
  permanentVillageList: any[] = [];
  msgs: any[] = [];
  checked: Boolean = false;
  isEdit: Boolean = false;
  accountId: any;
  rdAccId: any
  admissionNumber: any;
  membershipBasicDetail: MembershipBasicDetail = new MembershipBasicDetail();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  responseModel!: Responsemodel;
  orgnizationSetting: any;
  accountNumber: any;
  memberTypeName: any;
  showForm: boolean = false;
  id:any;




  constructor(private router: Router, private formBuilder: FormBuilder, private rdAccountsService: RdAccountsService,
    private commonComponent: CommonComponent, private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService, private statesService: StatesService,
    private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe) {
    this.communicationForm = this.formBuilder.group({
      stateName: ['',Validators.required],
      districtName: ['',Validators.required],
      subDistrictName: ['',Validators.required],
      villageName: ['',Validators.required],
      address1: ['',Validators.required],
      pinCode: ['', [Validators.pattern(applicationConstants.PINCODE_PATTERN), Validators.compose([Validators.required])]],
      permanentStateName: ['',Validators.required],
      permanentDistrictName: ['',Validators.required],
      permanentSubDistrictName: ['',Validators.required],
      permanentVillageName: ['',Validators.required],
      permanentAddress1: ['',Validators.required],
      permanentPinCode:['', [Validators.pattern(applicationConstants.PINCODE_PATTERN), Validators.compose([Validators.required])]],
      isSameAddress: ['']
    })
  }

  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        if (params['id'] != undefined) {
          let id = this.encryptDecryptService.decrypt(params['id']);
          this.rdAccId = Number(id);
          this.getRdAccountById();
        }
      }
    });
    this.communicationForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.communicationForm.valid) {
        this.save();
      }
    });
    this.getAllStatesList();
    this.getAllPermanentStatesList();

  }

  updateData() {
    if (this.rdAccId != null && this.rdAccId != undefined)
      this.rdAccountCommunicationModel.rdAccId = this.rdAccId;
    if(this.accountNumber != null && this.accountNumber != undefined)
      this. rdAccountCommunicationModel.accountNumber = this.accountNumber;
    this.rdAccountsService.changeData({
      formValid: !this.communicationForm.valid ? true : false,
      data: this.rdAccountCommunicationModel,
      isDisable: (!this.communicationForm.valid),
      stepperIndex: 2,
    });
  }
  save() {
    this.updateData();
  }


  getRdAccountById() {
    this.rdAccountsService.getRdAccounts(this.rdAccId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data != null && this.responseModel.data != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined && this.responseModel.data.length > 0) {
              if (this.responseModel.data[0].adminssionNumber != null && this.responseModel.data[0].adminssionNumber != undefined)
                this.admissionNumber = this.responseModel.data[0].adminssionNumber;
              if (this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined)
                this.accountNumber = this.responseModel.data[0].accountNumber;
              if (this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined)
                this.memberTypeName = this.responseModel.data[0].memberTypeName;
              this.rdAccountModel = this.responseModel.data[0];
              if (this.rdAccountModel != null && this.rdAccountModel != undefined)
                if (this.rdAccountModel.rdAccountCommunicationDTOList != null && this.rdAccountModel.rdAccountCommunicationDTOList != undefined &&
                  this.rdAccountModel.rdAccountCommunicationDTOList[0] != null && this.rdAccountModel.rdAccountCommunicationDTOList[0] != undefined) {
                  this.rdAccountCommunicationModel = this.rdAccountModel.rdAccountCommunicationDTOList[0];
                  this.setAllFields();
                }
                else {
                  if (this.memberTypeName == "Individual")
                    this.getMembershipBasicDetailsByAdmissionNumber(this.admissionNumber);
                  else if (this.memberTypeName == "Group")
                    this.getGroupDetailsByAdmissionNumber(this.admissionNumber);
                  else if (this.memberTypeName == "Institution")
                    this.getInstitutionDetailsByAdmissionNumber(this.admissionNumber);
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
      }, 2000);
    });
  }


  setAllFields() {
    if (this.rdAccountCommunicationModel.isSameAddress != null && this.rdAccountCommunicationModel.isSameAddress != undefined) {
      if (this.rdAccountCommunicationModel.isSameAddress == true) {
        this.communicationForm.get('permanentStateName').disable();
        this.communicationForm.get('permanentDistrictName').disable();
        this.communicationForm.get('permanentSubDistrictName').disable();
        this.communicationForm.get('permanentVillageName').disable();
        this.communicationForm.get('permanentAddress1').disable();
        this.communicationForm.get('permanentPinCode').disable();
        this.RegAddressToComAddress();
      }
    }
    if (this.rdAccountCommunicationModel.stateId != null)
      this.getAllDistrictsByStateId(this.rdAccountCommunicationModel.stateId, false)
    if (this.rdAccountCommunicationModel.districtId != null)
      this.getAllSubDistrictByDistrictId(this.rdAccountCommunicationModel.districtId, false)
    if (this.rdAccountCommunicationModel.subDistrictId != null)
      this.getAllVillagesBySubDistrictId(this.rdAccountCommunicationModel.subDistrictId, false)

    if (this.rdAccountCommunicationModel.permanentStateId != null)
      this.getAllPermanentDistrictsByStateId(this.rdAccountCommunicationModel.permanentStateId, false)
    if (this.rdAccountCommunicationModel.permanentDistrictId != null)
      this.getAllPermanentSubDistrictByDistrictId(this.rdAccountCommunicationModel.permanentDistrictId, false)
    if (this.rdAccountCommunicationModel.permanentSubDistrictId != null)
      this.getAllPermanentVillagesBySubDistrictId(this.rdAccountCommunicationModel.permanentSubDistrictId, false)
  }

  getMembershipBasicDetailsByAdmissionNumber(admissionNumber: any) {
    this.rdAccountsService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.membershipBasicDetail = this.responseModel.data[0];
            if (this.responseModel.data[0].memberShipCommunicationDetailsDTOList != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList != undefined &&
              this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != undefined) {
              this.rdAccountCommunicationModel = this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0];
              if (this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0].admisionNumber != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0].admisionNumber != undefined)
                this.rdAccountCommunicationModel.admissionNumber = this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0].admisionNumber;
              this.setAllFields();
            }
            this.updateData();
          }
        }
      } else {
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

  getGroupDetailsByAdmissionNumber(admissionNUmber: any) {
    this.rdAccountsService.getMemberGroupByAdmissionNumber(admissionNUmber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memberGroupDetailsModel = this.responseModel.data[0];
          if (this.responseModel.data[0].groupCommunicationList != null && this.responseModel.data[0].groupCommunicationList != undefined &&
            this.responseModel.data[0].groupCommunicationList[0] != null && this.responseModel.data[0].groupCommunicationList[0] != undefined) {
            this.rdAccountCommunicationModel = this.responseModel.data[0].groupCommunicationList[0];
            if (this.rdAccountCommunicationModel.memberType != null && this.rdAccountCommunicationModel.memberType != undefined)
              this.memberTypeName = this.rdAccountCommunicationModel.memberType;
            this.setAllFields();
          }
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

  //Get Institution Details from Membership Module by AdmissionNumber
  getInstitutionDetailsByAdmissionNumber(admissionNumber: any) {
    this.rdAccountsService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipInstitutionDetailsModel = this.responseModel.data[0];
          if (this.responseModel.data[0].institutionCommunicationDTOList != null && this.responseModel.data[0].institutionCommunicationDTOList != undefined &&
            this.responseModel.data[0].institutionCommunicationDTOList[0] != null && this.responseModel.data[0].institutionCommunicationDTOList[0] != undefined) {
            this.rdAccountCommunicationModel = this.responseModel.data[0].institutionCommunicationDTOList[0];
            if (this.rdAccountCommunicationModel.memberType != null && this.rdAccountCommunicationModel.memberType != undefined)
              this.memberTypeName = this.rdAccountCommunicationModel.memberType;
            this.setAllFields();
          }
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


  getAllStatesList() {
    this.rdAccountsService.getstatesList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.statesList = this.responseModel.data;
            this.statesList = this.responseModel.data.filter((obj: any) => obj != null).map((state: { name: any; id: any; }) => {
              return { label: state.name, value: state.id };
            });
            this.sameAsRegisterAddress();
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

  getAllDistrictsByStateId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationForm.get('districtName').reset();
      this.communicationForm.get('subDistrictName').reset();
      this.communicationForm.get('villageName').reset();
      this.districtsList = [];
      this.subDistrictList = [];
      this.villageList = [];
    }
    this.rdAccountsService.getDistrictsByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.districtsList = this.responseModel.data;
        this.districtsList = this.districtsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        const state = this.statesList.find((item: { value: any; }) => item.value === id);
        this.rdAccountCommunicationModel.stateName = state.label;
        this.sameAsRegisterAddress();
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

  getAllSubDistrictByDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationForm.get('subDistrictName').reset();
      this.communicationForm.get('villageName').reset();
      this.subDistrictList = [];
      this.villageList = [];
    }
    this.rdAccountsService.getSubDistrictByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.subDistrictList = this.responseModel.data;
        this.subDistrictList = this.subDistrictList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        const district = this.districtsList.find((item: { value: any; }) => item.value === id);
        this.rdAccountCommunicationModel.districtName = district.label;
        this.sameAsRegisterAddress();
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

  getAllVillagesBySubDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationForm.get('villageName').reset();
      this.villageList = [];
    }
    this.rdAccountsService.getvillagesBySubDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.villageList = this.responseModel.data;
            this.villageList = this.villageList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            const subDistrictName = this.subDistrictList.find((item: { value: any; }) => item.value === id);
            this.rdAccountCommunicationModel.subDistrictName = subDistrictName.label;
            this.sameAsRegisterAddress();
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

  getVillage(id: any) {
    const villageName = this.villageList.find((item: { value: any; }) => item.value === id);
    this.rdAccountCommunicationModel.villageName = villageName.label;
    this.sameAsRegisterAddress();
  }

  getAllPermanentStatesList() {
    this.rdAccountsService.getstatesList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.permanentStatesList = this.responseModel.data;
            this.permanentStatesList = this.responseModel.data.filter((obj: any) => obj != null).map((state: { name: any; id: any; }) => {
              return { label: state.name, value: state.id };
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

  getAllPermanentDistrictsByStateId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationForm.get('permanentDistrictName').reset();
      this.communicationForm.get('permanentSubDistrictName').reset();
      this.communicationForm.get('permanentVillageName').reset();
      this.permanentDistrictList = [];
      this.permanentSubDistrictList = [];
      this.permanentVillageList = [];
    }
    this.rdAccountsService.getDistrictsByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.permanentDistrictList = this.responseModel.data;
        this.permanentDistrictList = this.permanentDistrictList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        const perState = this.permanentStatesList.find((item: { value: any; }) => item.value === id);
        this.rdAccountCommunicationModel.permanentStateName = perState.label;
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

  getAllPermanentSubDistrictByDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationForm.get('permanentSubDistrictName').reset();
      this.communicationForm.get('permanentVillageName').reset();
      this.permanentSubDistrictList = [];
      this.permanentVillageList = [];
    }
    this.rdAccountsService.getSubDistrictByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.permanentSubDistrictList = this.responseModel.data;
        this.permanentSubDistrictList = this.permanentSubDistrictList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        const perDistrict = this.permanentDistrictList.find((item: { value: any; }) => item.value === id);
        this.rdAccountCommunicationModel.permanentDistrictName = perDistrict.label;
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

  getAllPermanentVillagesBySubDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationForm.get('permanentVillageName').reset();
      this.permanentVillageList = [];
    }
    this.rdAccountsService.getvillagesBySubDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.permanentVillageList = this.responseModel.data;
            this.permanentVillageList = this.permanentVillageList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            const persubDistrictName = this.permanentSubDistrictList.find((item: { value: any; }) => item.value === id);
            this.rdAccountCommunicationModel.permanentSubDistrictName = persubDistrictName.label;
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

  getPermanentVillage(id: any) {
    const perVillage = this.permanentVillageList.find((item: { value: any; }) => item.value === id);
    this.rdAccountCommunicationModel.permanentVillageName = perVillage.label;
  }

  sameAsRegisterAddress() {
    if (this.rdAccountCommunicationModel.isSameAddress == true) {
      this.rdAccountCommunicationModel.permanentStateId = this.rdAccountCommunicationModel.stateId;
      if (this.rdAccountCommunicationModel.districtId != this.rdAccountCommunicationModel.permanentDistrictId) {
        this.rdAccountCommunicationModel.permanentDistrictId = null;
        this.getAllPermanentDistrictsByStateId(this.rdAccountCommunicationModel.permanentStateId, false);
        this.rdAccountCommunicationModel.permanentDistrictId = this.rdAccountCommunicationModel.districtId;
      }
      if (this.rdAccountCommunicationModel.subDistrictId != this.rdAccountCommunicationModel.permanentSubDistrictId) {
        this.rdAccountCommunicationModel.permanentSubDistrictId = null;
        this.getAllPermanentSubDistrictByDistrictId(this.rdAccountCommunicationModel.permanentDistrictId, false);
        this.rdAccountCommunicationModel.permanentSubDistrictId = this.rdAccountCommunicationModel.subDistrictId;
      }
      if (this.rdAccountCommunicationModel.villageId != this.rdAccountCommunicationModel.permanentVillageId) {
        this.rdAccountCommunicationModel.permanentVillageId = null;
        this.getAllPermanentVillagesBySubDistrictId(this.rdAccountCommunicationModel.permanentSubDistrictId, false);
        this.rdAccountCommunicationModel.permanentVillageId = this.rdAccountCommunicationModel.villageId;
      }
    }
  }

  sameAsPerAddr(isSameAddress: any) {
    if (isSameAddress) {
      this.rdAccountCommunicationModel.isSameAddress = applicationConstants.TRUE;
      this.communicationForm.get('permanentStateName').disable();
      this.communicationForm.get('permanentDistrictName').disable();
      this.communicationForm.get('permanentSubDistrictName').disable();
      this.communicationForm.get('permanentVillageName').disable();
      this.communicationForm.get('permanentAddress1').disable();
      this.communicationForm.get('permanentPinCode').disable();


      this.rdAccountCommunicationModel.permanentStateId = this.rdAccountCommunicationModel.stateId;
      if (this.rdAccountCommunicationModel.districtId != this.rdAccountCommunicationModel.permanentDistrictId) {
        this.rdAccountCommunicationModel.permanentDistrictId = null;
        this.getAllPermanentDistrictsByStateId(this.rdAccountCommunicationModel.permanentStateId, false);
        this.rdAccountCommunicationModel.permanentDistrictId = this.rdAccountCommunicationModel.districtId;
      }
      if (this.rdAccountCommunicationModel.subDistrictId != this.rdAccountCommunicationModel.permanentSubDistrictId) {
        this.rdAccountCommunicationModel.permanentSubDistrictId = null;
        this.getAllPermanentSubDistrictByDistrictId(this.rdAccountCommunicationModel.permanentDistrictId, false);
        this.rdAccountCommunicationModel.permanentSubDistrictId = this.rdAccountCommunicationModel.subDistrictId;
      }
      if (this.rdAccountCommunicationModel.villageId != this.rdAccountCommunicationModel.permanentVillageId) {
        this.rdAccountCommunicationModel.permanentVillageId = null;
        this.getAllPermanentVillagesBySubDistrictId(this.rdAccountCommunicationModel.permanentSubDistrictId, false);
        this.rdAccountCommunicationModel.permanentVillageId = this.rdAccountCommunicationModel.villageId;
      }

      this.rdAccountCommunicationModel.permanentAddress1 = this.rdAccountCommunicationModel.address1;
      this.rdAccountCommunicationModel.permanentPinCode = this.rdAccountCommunicationModel.pinCode;
    }
    else {
      this.rdAccountCommunicationModel.isSameAddress = applicationConstants.FALSE;

      this.communicationForm.get('permanentStateName').enable();
      this.communicationForm.get('permanentDistrictName').enable();
      this.communicationForm.get('permanentSubDistrictName').enable();
      this.communicationForm.get('permanentVillageName').enable();
      this.communicationForm.get('permanentAddress1').enable();
      this.communicationForm.get('permanentPinCode').enable();

      this.communicationForm.get('permanentStateName').reset();
      this.communicationForm.get('permanentDistrictName').reset();
      this.communicationForm.get('permanentSubDistrictName').reset();
      this.communicationForm.get('permanentVillageName').reset();
      this.communicationForm.get('permanentAddress1').reset();
      this.communicationForm.get('permanentPinCode').reset();
      this.permanentDistrictList = [];
      this.permanentSubDistrictList = [];
      this.permanentVillageList = [];


      this.communicationForm.get('permanentStateName').enable();
      this.communicationForm.get('permanentDistrictName').enable();
      this.communicationForm.get('permanentSubDistrictName').enable();
      this.communicationForm.get('permanentVillageName').enable();
      this.communicationForm.get('permanentAddress1').enable();
      this.communicationForm.get('permanentPinCode').enable();

      this.rdAccountCommunicationModel.permanentStateId = null;
      this.rdAccountCommunicationModel.permanentDistrictId = null;
      this.rdAccountCommunicationModel.permanentSubDistrictId = null;
      this.rdAccountCommunicationModel.permanentVillageId = null;
      this.rdAccountCommunicationModel.permanentAddress1 = null;
      this.rdAccountCommunicationModel.permanentPinCode = null;
    }
    this.updateData();
  }

  RegAddressToComAddress() {
    if (this.rdAccountCommunicationModel.isSameAddress == true) {
      this.rdAccountCommunicationModel.permanentAddress1 = this.rdAccountCommunicationModel.address1;
      this.rdAccountCommunicationModel.permanentPinCode = this.rdAccountCommunicationModel.pinCode;
    }
  }


}
