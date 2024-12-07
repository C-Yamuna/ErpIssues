import { Component } from '@angular/core';
import { FdNonCumulativeApplication } from '../fd-non-cumulative-application/shared/fd-non-cumulative-application.model';
import { FdNonCumulativeCommunication } from './shared/fd-non-cumulative-communication.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { StatesService } from 'src/app/configurations/common-config/state/shared/states.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { FdNonCumulativeCommunicationService } from './shared/fd-non-cumulative-communication.service';
import { FdNonCumulativeApplicationService } from '../fd-non-cumulative-application/shared/fd-non-cumulative-application.service';
import { NewMembershipAddService } from '../new-membership-add/shared/new-membership-add.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MemberGroupDetailsModel, MembershipInstitutionDetailsModel, NewMembershipAdd } from '../new-membership-add/shared/new-membership-add.model';

@Component({
  selector: 'app-fd-non-cumulative-communication',
  templateUrl: './fd-non-cumulative-communication.component.html',
  styleUrls: ['./fd-non-cumulative-communication.component.css']
})
export class FdNonCumulativeCommunicationComponent {

  communicationForm: any;
  communication: any;
  fdNonCumulativeApplicationModel: FdNonCumulativeApplication = new FdNonCumulativeApplication();
  fdNonCumulativeCommunicationModel: FdNonCumulativeCommunication = new FdNonCumulativeCommunication();
  membershipBasicRequiredDetails: NewMembershipAdd = new NewMembershipAdd();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  sameAsPermanentAddress: boolean = false;
  responseModel!: Responsemodel;
  statesList: any[] = [];
  districtsList: any[] = [];
  mandalsList: any[] = [];
  villageList: any[] = [];
  permanentStatesList: any[] = [];
  permenentDistrictList: any[] = [];
  permenentSubDistrictList: any[] = [];
  permenentVillageList: any[] = [];
  id: any;
  orgnizationSetting: any;
  showForm: boolean = false;
  admissionNumber: any;
  msgs: any[] = [];
  memberTypeName: any;
  memberTypeId: any;
  accountNumber: any;


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private fdNonCumulativeApplicationService: FdNonCumulativeApplicationService,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService,
    private fdNonCumulativeCommunicationService: FdNonCumulativeCommunicationService,
    private commonFunctionsService: CommonFunctionsService,
    private membershipServiceService: NewMembershipAddService) {
    this.communicationForm = this.formBuilder.group({
      'stateName': new FormControl('', Validators.required),
      'districtId': new FormControl('',Validators.required),
      'villageId': new FormControl('',Validators.required),
      'subDistrictId': new FormControl('',Validators.required),
      'address1': new FormControl('',[Validators.required]),
      'address2': new FormControl(''),
      'pinCode': new FormControl('',[Validators.pattern(applicationConstants.PINCODE_PATTERN),Validators.required]),
      'isSameAddress': new FormControl(''),
      'permanentStateId': new FormControl('',Validators.required),
      'permanentDistrictId': new FormControl('',Validators.required),
      'permanentSubDistrictId': new FormControl('',Validators.required),
      'permanentVillageId': new FormControl('',Validators.required),
      'permanentAddress1': new FormControl('',[Validators.required]),
      'permanentAddress2': new FormControl(''),
      'permanentPinCode': new FormControl('',[Validators.pattern(applicationConstants.PINCODE_PATTERN),Validators.required])
    });
  }

  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        if (params['id'] != undefined) {
          let id = this.encryptDecryptService.decrypt(params['id']);
          this.id = Number(id);
          this.getFdNonCummApplicationById(this.id);
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
    if(this.id != null && this.id != undefined)
      this. fdNonCumulativeCommunicationModel.fdNonCummulativeAccId = this.id;
    if(this.accountNumber != null && this.accountNumber != undefined)
      this. fdNonCumulativeCommunicationModel.accountNumber = this.accountNumber;
    this.fdNonCumulativeApplicationService.changeData({
      formValid: !this.communicationForm.valid ? true : false,
      data: this. fdNonCumulativeCommunicationModel,
      isDisable: (!this.communicationForm.valid),
      stepperIndex: 2,
    });
  }
  save() {
    this.updateData();
  }

  // get call from fd non cummulative account by id
  getFdNonCummApplicationById(id: any) {
    this.fdNonCumulativeApplicationService.getFdNonCummApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data != null && this.responseModel.data != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined && this.responseModel.data.length > 0) {
              if (this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined)
                this.admissionNumber = this.responseModel.data[0].admissionNumber;
              if (this.responseModel.data[0].accountNumber != null && this.responseModel.data[0].accountNumber != undefined)
                this.accountNumber = this.responseModel.data[0].accountNumber;
              if (this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined)
                this.memberTypeName = this.responseModel.data[0].memberTypeName;
              this.fdNonCumulativeApplicationModel = this.responseModel.data[0];
              if (this.fdNonCumulativeApplicationModel != null && this.fdNonCumulativeApplicationModel != undefined)
                if (this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountCommunicationList != null && this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountCommunicationList != undefined &&
                  this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountCommunicationList[0] != null && this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountCommunicationList[0] != undefined){
                  this. fdNonCumulativeCommunicationModel = this.fdNonCumulativeApplicationModel.fdNonCummulativeAccountCommunicationList[0];
                  this.setAllFields();
                }
                else {
                  if (this.memberTypeName == "Individual")
                    this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
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

  setAllFields(){
    if (this. fdNonCumulativeCommunicationModel.isSameAddress != null && this. fdNonCumulativeCommunicationModel.isSameAddress != undefined) {
      if (this. fdNonCumulativeCommunicationModel.isSameAddress == true) {
        this.communicationForm.get('permanentStateId').disable();
        this.communicationForm.get('permanentDistrictId').disable();
        this.communicationForm.get('permanentSubDistrictId').disable();
        this.communicationForm.get('permanentVillageId').disable();
        this.communicationForm.get('permanentAddress1').disable();
        this.communicationForm.get('permanentPinCode').disable();

     
        this.RegAddressToComAddress();
      }
    }
    if (this. fdNonCumulativeCommunicationModel.stateId != null)
      this.getAllDistrictsByStateId(this. fdNonCumulativeCommunicationModel.stateId, false)
    if (this. fdNonCumulativeCommunicationModel.districtId != null)
      this.getAllMandalsByDistrictId(this. fdNonCumulativeCommunicationModel.districtId, false)
    if (this. fdNonCumulativeCommunicationModel.subDistrictId!= null)
      this.getAllVillagesByMandalId(this. fdNonCumulativeCommunicationModel.subDistrictId, false)

    if (this. fdNonCumulativeCommunicationModel.permanentStateId != null)
      this.getAllPermanentDistrictsByStateId(this. fdNonCumulativeCommunicationModel.permanentStateId, false)
    if (this. fdNonCumulativeCommunicationModel.permanentDistrictId != null)
      this.getAllPermanentMandalsByDistrictId(this. fdNonCumulativeCommunicationModel.permanentDistrictId, false)
    if (this. fdNonCumulativeCommunicationModel.permanentSubDistrictId != null)
      this.getAllPermanentVillagesByMandalId(this. fdNonCumulativeCommunicationModel.permanentSubDistrictId, false)
  }

  //Get Member Details from Membership Module by AdmissionNumber
  getMemberDetailsByAdmissionNumber(admissionNumber: any) {
    this.membershipServiceService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipBasicRequiredDetails = this.responseModel.data[0];
          if (this.responseModel.data[0].memberShipCommunicationDetailsDTOList != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList != undefined &&
            this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != undefined){
            this. fdNonCumulativeCommunicationModel = this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0];
            if(this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0].admisionNumber != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0].admisionNumber != undefined)
              this. fdNonCumulativeCommunicationModel.admissionNumber = this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0].admisionNumber;
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

  //Get Group Details from Membership Module by AdmissionNumber
  getGroupDetailsByAdmissionNumber(admissionNUmber: any) {
    this.membershipServiceService.getMemberGroupByAdmissionNumber(admissionNUmber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memberGroupDetailsModel = this.responseModel.data[0];
          if (this.responseModel.data[0].groupCommunicationList != null && this.responseModel.data[0].groupCommunicationList != undefined && 
            this.responseModel.data[0].groupCommunicationList[0] != null && this.responseModel.data[0].groupCommunicationList[0] != undefined){
            this. fdNonCumulativeCommunicationModel = this.responseModel.data[0].groupCommunicationList[0];
            if(this. fdNonCumulativeCommunicationModel.memberTypeName != null && this. fdNonCumulativeCommunicationModel.memberTypeName != undefined)
              this.memberTypeName = this. fdNonCumulativeCommunicationModel.memberTypeName;
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
    this.membershipServiceService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipInstitutionDetailsModel = this.responseModel.data[0];
          if (this.responseModel.data[0].institutionCommunicationDTOList != null && this.responseModel.data[0].institutionCommunicationDTOList != undefined &&
            this.responseModel.data[0].institutionCommunicationDTOList[0] != null && this.responseModel.data[0].institutionCommunicationDTOList[0] != undefined){
            this. fdNonCumulativeCommunicationModel = this.responseModel.data[0].institutionCommunicationDTOList[0];
            if(this. fdNonCumulativeCommunicationModel.memberTypeName != null && this. fdNonCumulativeCommunicationModel.memberTypeName != undefined)
              this.memberTypeName = this. fdNonCumulativeCommunicationModel.memberTypeName;
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
    this.fdNonCumulativeCommunicationService.getstatesList().subscribe((response: any) => {
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
      this.communicationForm.get('districtId').reset();
      this.communicationForm.get('subDistrictId').reset();
      this.communicationForm.get('villageId').reset();
      this.districtsList = [];
      this.mandalsList = [];
      this.villageList = [];
    }
    this.fdNonCumulativeCommunicationService.getDistrictsByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.districtsList = this.responseModel.data;
        this.districtsList = this.districtsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        const state = this.statesList.find((item: { value: any; }) => item.value === id);
        this. fdNonCumulativeCommunicationModel.stateName = state.label;
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

  getAllMandalsByDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationForm.get('subDistrictId').reset();
      this.communicationForm.get('villageId').reset();
      this.mandalsList = [];
      this.villageList = [];
    }
    this.fdNonCumulativeCommunicationService.getMandalsByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.mandalsList = this.responseModel.data;
        this.mandalsList = this.mandalsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        const district = this.districtsList.find((item: { value: any; }) => item.value === id);
        this. fdNonCumulativeCommunicationModel.districtName = district.label;
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

  getAllVillagesByMandalId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationForm.get('villageId').reset();
      this.villageList = [];
    }
    this.fdNonCumulativeCommunicationService.getvillagesByMandalId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.villageList = this.responseModel.data;
            this.villageList = this.villageList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            const mandal = this.mandalsList.find((item: { value: any; }) => item.value === id);
            this. fdNonCumulativeCommunicationModel.subDistrictName = mandal.label;
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

  getVillage(id:any){
    const village = this.villageList.find((item: { value: any; }) => item.value === id);
    this. fdNonCumulativeCommunicationModel.villageName = village.label;
    this.sameAsRegisterAddress();
  }

  getAllPermanentStatesList() {
    this.fdNonCumulativeCommunicationService.getstatesList().subscribe((response: any) => {
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
      this.communicationForm.get('permanentDistrictId').reset();
      this.communicationForm.get('permanentSubDistrictId').reset();
      this.communicationForm.get('permanentVillageId').reset();
      this.permenentDistrictList = [];
      this.permenentSubDistrictList = [];
      this.permenentVillageList = [];
    }
    this.fdNonCumulativeCommunicationService.getDistrictsByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.permenentDistrictList = this.responseModel.data;
        this.permenentDistrictList = this.permenentDistrictList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        const perState = this.permanentStatesList.find((item: { value: any; }) => item.value === id);
        this. fdNonCumulativeCommunicationModel.permanentStateName = perState.label;
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

  getAllPermanentMandalsByDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationForm.get('permanentSubDistrictId').reset();
      this.communicationForm.get('permanentVillageId').reset();
      this.permenentSubDistrictList = [];
      this.permenentVillageList = [];
    }
    this.fdNonCumulativeCommunicationService.getMandalsByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.permenentSubDistrictList = this.responseModel.data;
        this.permenentSubDistrictList = this.permenentSubDistrictList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        const perDistrict = this.permenentDistrictList.find((item: { value: any; }) => item.value === id);
        this. fdNonCumulativeCommunicationModel.permanentDistrictName = perDistrict.label;
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
  getAllPermanentVillagesByMandalId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationForm.get('permanentVillageId').reset();
      this.permenentVillageList = [];
    }
    this.fdNonCumulativeCommunicationService.getvillagesByMandalId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.permenentVillageList = this.responseModel.data;
            this.permenentVillageList = this.permenentVillageList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            const perMandal = this.permenentSubDistrictList.find((item: { value: any; }) => item.value === id);
            this. fdNonCumulativeCommunicationModel.permanentSubDistrictName = perMandal.label;
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
  getPermanentVillage(id:any){
    const perVillage = this.permenentVillageList.find((item: { value: any; }) => item.value === id);
    this. fdNonCumulativeCommunicationModel.permanentVillageName = perVillage.label;
  }
  sameAsRegisterAddress() {
    if (this. fdNonCumulativeCommunicationModel.isSameAddress == true) {
      this. fdNonCumulativeCommunicationModel.permanentStateId = this. fdNonCumulativeCommunicationModel.stateId;
      if (this. fdNonCumulativeCommunicationModel.districtId != this. fdNonCumulativeCommunicationModel.permanentDistrictId) {
        this. fdNonCumulativeCommunicationModel.permanentDistrictId = null;
        this.getAllPermanentDistrictsByStateId(this. fdNonCumulativeCommunicationModel.permanentStateId, false);
        this. fdNonCumulativeCommunicationModel.permanentDistrictId = this. fdNonCumulativeCommunicationModel.districtId;
      }
      if (this. fdNonCumulativeCommunicationModel.subDistrictId != this. fdNonCumulativeCommunicationModel.permanentSubDistrictId) {
        this. fdNonCumulativeCommunicationModel.permanentSubDistrictId = null;
        this.getAllPermanentMandalsByDistrictId(this. fdNonCumulativeCommunicationModel.permanentDistrictId, false);
        this. fdNonCumulativeCommunicationModel.permanentSubDistrictId = this. fdNonCumulativeCommunicationModel.subDistrictId;
      }
      if (this. fdNonCumulativeCommunicationModel.villageId != this. fdNonCumulativeCommunicationModel.permanentVillageId) {
        this. fdNonCumulativeCommunicationModel.permanentVillageId = null;
        this.getAllPermanentVillagesByMandalId(this. fdNonCumulativeCommunicationModel.permanentSubDistrictId, false);
        this. fdNonCumulativeCommunicationModel.permanentVillageId = this. fdNonCumulativeCommunicationModel.villageId;
      }
    }
  }

  sameAsPerAddr(isSameAddress: any) {
    if (isSameAddress) {
      this. fdNonCumulativeCommunicationModel.isSameAddress = applicationConstants.TRUE;
      this.communicationForm.get('permanentStateId').disable();
      this.communicationForm.get('permanentDistrictId').disable();
      this.communicationForm.get('permanentSubDistrictId').disable();
      this.communicationForm.get('permanentVillageId').disable();
      this.communicationForm.get('permanentAddress1').disable();
      this.communicationForm.get('permanentPinCode').disable();

      this. fdNonCumulativeCommunicationModel.permanentStateId = this. fdNonCumulativeCommunicationModel.stateId;
      if (this. fdNonCumulativeCommunicationModel.districtId != this. fdNonCumulativeCommunicationModel.permanentDistrictId) {
        this. fdNonCumulativeCommunicationModel.permanentDistrictId = null;
        this.getAllPermanentDistrictsByStateId(this. fdNonCumulativeCommunicationModel.permanentStateId, false);
        this. fdNonCumulativeCommunicationModel.permanentDistrictId = this. fdNonCumulativeCommunicationModel.districtId;
      }
      if (this. fdNonCumulativeCommunicationModel.subDistrictId != this. fdNonCumulativeCommunicationModel.permanentSubDistrictId) {
        this. fdNonCumulativeCommunicationModel.permanentSubDistrictId = null;
        this.getAllPermanentMandalsByDistrictId(this. fdNonCumulativeCommunicationModel.permanentDistrictId, false);
        this. fdNonCumulativeCommunicationModel.permanentSubDistrictId = this. fdNonCumulativeCommunicationModel.subDistrictId;
      }
      if (this. fdNonCumulativeCommunicationModel.villageId != this. fdNonCumulativeCommunicationModel.permanentVillageId) {
        this. fdNonCumulativeCommunicationModel.permanentVillageId = null;
        this.getAllPermanentVillagesByMandalId(this. fdNonCumulativeCommunicationModel.permanentSubDistrictId, false);
        this. fdNonCumulativeCommunicationModel.permanentVillageId = this. fdNonCumulativeCommunicationModel.villageId;
      }

      this. fdNonCumulativeCommunicationModel.permanentAddress1 = this. fdNonCumulativeCommunicationModel.address1;
      this. fdNonCumulativeCommunicationModel.permanentPinCode = this. fdNonCumulativeCommunicationModel.pinCode;
    }
    else {
      this. fdNonCumulativeCommunicationModel.isSameAddress = applicationConstants.FALSE;

      this.communicationForm.get('permanentStateId').enable();
      this.communicationForm.get('permanentDistrictId').enable();
      this.communicationForm.get('permanentSubDistrictId').enable();
      this.communicationForm.get('permanentVillageId').enable();
      this.communicationForm.get('permanentAddress1').enable();
      this.communicationForm.get('permanentPinCode').enable();

      this.communicationForm.get('permanentStateId').reset();
      this.communicationForm.get('permanentDistrictId').reset();
      this.communicationForm.get('permanentSubDistrictId').reset();
      this.communicationForm.get('permanentVillageId').reset();
      this.communicationForm.get('permanentAddress1').reset();
      this.communicationForm.get('permanentPinCode').reset();
      this.permenentDistrictList = [];
      this.permenentSubDistrictList = [];
      this.permenentVillageList = [];


      this.communicationForm.get('permanentStateId').enable();
      this.communicationForm.get('permanentDistrictId').enable();
      this.communicationForm.get('permanentSubDistrictId').enable();
      this.communicationForm.get('permanentVillageId').enable();
      this.communicationForm.get('permanentAddress1').enable();
      this.communicationForm.get('permanentPinCode').enable();

      this. fdNonCumulativeCommunicationModel.permanentStateId = null;
      this. fdNonCumulativeCommunicationModel.permanentDistrictId = null;
      this. fdNonCumulativeCommunicationModel.permanentSubDistrictId = null;
      this. fdNonCumulativeCommunicationModel.permanentVillageId = null;
      this. fdNonCumulativeCommunicationModel.permanentAddress1 = null;
      this. fdNonCumulativeCommunicationModel.permanentPinCode = null;
    }
    this.updateData();
  }

  RegAddressToComAddress() {
    if (this. fdNonCumulativeCommunicationModel.isSameAddress == true) {
      this. fdNonCumulativeCommunicationModel.permanentAddress1 = this. fdNonCumulativeCommunicationModel.address1;
      this. fdNonCumulativeCommunicationModel.permanentPinCode = this. fdNonCumulativeCommunicationModel.pinCode;
    }
  }
}
