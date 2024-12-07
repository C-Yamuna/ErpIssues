import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommunicationService } from './shared/communication.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Communication } from './shared/communication.model';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { StatesService } from 'src/app/configurations/common-config/state/shared/states.service';
import { DistrictService } from 'src/app/configurations/common-config/district/shared/district.service';
import { SubDistrictService } from 'src/app/configurations/common-config/sub-district/shared/sub-district.service';
import { VillagesService } from 'src/app/configurations/common-config/villages/shared/villages.service';
import { AgentDetails } from '../basic-details/shared/basic-details.model';
import { AgentDetailsTransactionService } from '../../shared/agent-details-transaction.service';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';
import { MembershipBasicDetails } from '../membership-basic-details/shared/membership-basic-details';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {

  communicationForm: any;
  sameAsPermanentAddress: boolean = false;
  orgnizationSetting: any;
  responseModel!: Responsemodel;
  isEdit: boolean = false;
  msgs: any[] = [];
  agentDetailsModel: AgentDetails = new AgentDetails();
  membershipBasicDetailsModel: MembershipBasicDetails = new MembershipBasicDetails();
  agentCommunicationModel:Communication = new Communication();
  buttonDisabled: boolean = false;
  stateListData: any[] = [];
  districtListData: any[] = [];
  subDistrictListData: any[] = [];
  villageListData: any[] = [];
  premanentStateList: any[] = [];
  permanentDistrictList: any[] = [];
  permanentSubDistrictList: any[] = [];
  permanentVillageList: any[] = [];
  statusList: any[] = [];
  agentId: any;
  // activeIndex: number = 1;
  admissionNumber: any;
  depositMembersList: any[] = [];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent,
    private datePipe: DatePipe,
    private membershipBasicDetailsService: MembershipBasicDetailsService,
    private agentDetailsService: AgentDetailsTransactionService,
    private communicationService: CommunicationService,
    private stateService: StatesService,
    private districtService: DistrictService,
    private subdistrictService: SubDistrictService,
    private villageService: VillagesService,
    private activateRoute: ActivatedRoute) {
    this.communicationForm = this.formBuilder.group({
      stateId: ['', [Validators.required]],
      districtId: ['', [Validators.required]],
      subDistrictId: ['', [Validators.required]],
      villageId: [''],
      address1: ['', [Validators.required]],
      address2: [''],
      pinCode: ['',[Validators.pattern(applicationConstants.PINCODE_PATTERN),Validators.required]],
      isSameAddress: [''],
      permanentStateId: [''],
      permanentDistrictId: [''],
      permanentSubDistrictId: [''],
      permanentVillageId: [''],
      permanentAddress1: ['', [Validators.required]],
      permanentAddress2: [''],
      permanentPinCode: ['',[Validators.pattern(applicationConstants.PINCODE_PATTERN),Validators.required]]
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.agentId = Number(this.encryptDecryptService.decrypt(params['id']));
        this.getAgentDetailsById(this.agentId);
      }else {
        this.isEdit = false;
      }
    });
    this.communicationForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.communicationForm.valid) {
        this.save();
      }
    });
    this.save();
    this.getAllStates();
    this.getAllPermanentStates();
  }

  updateData() {
    this.agentCommunicationModel.admissionNumber = this.admissionNumber;
    this.agentCommunicationModel.agentId = this.agentId;
    this.agentDetailsService.changeData({
      formValid: !this.communicationForm.valid ? true : false,
      data: this.agentCommunicationModel,
      isDisable: (!this.communicationForm.valid),
      stepperIndex: 1,
    });
  }
  save() {
    this.updateData();
  }

  getAgentDetailsById(id: any) {
    this.agentDetailsService.getAgentDetailsById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.admissionNumber = this.responseModel.data[0].admissionNumber;
              this.agentDetailsModel = this.responseModel.data[0];
              if (this.agentDetailsModel != null && this.agentDetailsModel != undefined)
                if (this.agentDetailsModel.agentCommunicationList != null && this.agentDetailsModel.agentCommunicationList != undefined &&
                  this.agentDetailsModel.agentCommunicationList[0] != null && this.agentDetailsModel.agentCommunicationList[0] != undefined){
                  this.agentCommunicationModel = this.agentDetailsModel.agentCommunicationList[0];
                  this.setAllFields();
                  // this.sameAsPerAddr();
                  this.sameAsPerAddr(this.agentCommunicationModel.isSameAddress);
                }
                else {
                    this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
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
    if (this.agentCommunicationModel.isSameAddress != null && this.agentCommunicationModel.isSameAddress != undefined) {
      if (this.agentCommunicationModel.isSameAddress == true) {
        this.communicationForm.get('permanentStateId').disable();
        this.communicationForm.get('permanentDistrictId').disable();
        this.communicationForm.get('permanentSubDistrictId').disable();
        this.communicationForm.get('permanentVillageId').disable();
        this.communicationForm.get('permanentAddress1').disable();
        this.communicationForm.get('permanentPinCode').disable();
        this.RegAddressToComAddress();
      }
    }
    if (this.agentCommunicationModel.stateId != null)
      this.getAlldistrictsByStateId(this.agentCommunicationModel.stateId, false)
    if (this.agentCommunicationModel.districtId != null)
      this.getAllSubDistrictsByDistrictId(this.agentCommunicationModel.districtId, false)
    if (this.agentCommunicationModel.subDistrictId != null)
      this.getAllVillagesBySubDistrictId(this.agentCommunicationModel.subDistrictId, false)

    if (this.agentCommunicationModel.permanentStateId != null)
      this.getAllPermanentDistrictsByStateId(this.agentCommunicationModel.permanentStateId, false)
    if (this.agentCommunicationModel.permanentDistrictId != null)
      this.getAllPermanentSubDistrictByDistrictId(this.agentCommunicationModel.permanentDistrictId, false)
    if (this.agentCommunicationModel.permanentSubDistrictId != null)
      this.getAllPermanentVillagesBySubDistrictId(this.agentCommunicationModel.permanentSubDistrictId, false)
  }

  getMemberDetailsByAdmissionNumber(admissionNumber: any) {
    this.membershipBasicDetailsService.getMemberDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if ( this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.responseModel.data[0].memberShipCommunicationDetailsDTOList;
          if(this.responseModel.data[0].memberShipCommunicationDetailsDTOList != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList != undefined){
            this.agentCommunicationModel = this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0];
            this.agentCommunicationModel.id =null;
            if(this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0].admisionNumber != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0].admisionNumber != undefined)
              this.agentCommunicationModel.admissionNumber = this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0].admisionNumber;
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

  getAllStates() {
    this.stateService.getAllStates().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.stateListData = this.responseModel.data;
            this.stateListData = this.responseModel.data.filter((obj: any) => obj != null).map((state: { name: any; id: any; }) => {
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

  getAlldistrictsByStateId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationForm.get('districtId').reset();
      this.communicationForm.get('subDistrictId').reset();
      this.communicationForm.get('villageId').reset();
      this.districtListData = [];
      this.subDistrictListData = [];
      this.villageListData = [];
    }
    this.districtService.getDistrictByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.districtListData = this.responseModel.data;
        this.districtListData = this.districtListData.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        const state = this.stateListData.find((item: { value: any; }) => item.value === id);
        this.agentCommunicationModel.stateName = state.label;
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

  getAllSubDistrictsByDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationForm.get('subDistrictId').reset();
      this.communicationForm.get('villageId').reset();
      this.subDistrictListData = [];
      this.villageListData = [];
    }
    this.subdistrictService.getSubDistrictByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.subDistrictListData = this.responseModel.data;
        this.subDistrictListData = this.subDistrictListData.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        const district = this.districtListData.find((item: { value: any; }) => item.value === id);
        this.agentCommunicationModel.districtName = district.label;
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
      // this.communicationForm.get('village').reset();
      this.villageListData = [];
    }
    this.villageService.getVillagesBySubDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.villageListData = this.responseModel.data;
            this.villageListData = this.villageListData.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            const mandal = this.subDistrictListData.find((item: { value: any; }) => item.value === id);
            this.agentCommunicationModel.subDistrictName = mandal.label;
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
    const village = this.villageListData.find((item: { value: any; }) => item.value === id);
    this.agentCommunicationModel.villageName = village.label;
    this.sameAsRegisterAddress();
  }

  getAllPermanentStates() {
    this.stateService.getAllStates().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.premanentStateList = this.responseModel.data;
            this.premanentStateList = this.responseModel.data.filter((obj: any) => obj != null).map((state: { name: any; id: any; }) => {
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
      this.permanentDistrictList = [];
      this.permanentSubDistrictList = [];
      this.permanentVillageList = [];
    }
    this.districtService.getDistrictByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.permanentDistrictList = this.responseModel.data;
        this.permanentDistrictList = this.permanentDistrictList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        const perState = this.premanentStateList.find((item: { value: any; }) => item.value === id);
        this.agentCommunicationModel.permanentStateName = perState.label;
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
      this.communicationForm.get('permanentSubDistrictId').reset();
      this.communicationForm.get('permanentVillageId').reset();
      this.permanentSubDistrictList = [];
      this.permanentVillageList = [];
    }
    this.subdistrictService.getSubDistrictByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.permanentSubDistrictList = this.responseModel.data;
        this.permanentSubDistrictList = this.permanentSubDistrictList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        const perDistrict = this.permanentDistrictList.find((item: { value: any; }) => item.value === id);
        this.agentCommunicationModel.permanentDistrictName = perDistrict.label;
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
      this.communicationForm.get('permanentVillageId').reset();
      this.permanentVillageList = [];
    }
    this.villageService.getVillagesBySubDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.permanentVillageList = this.responseModel.data;
            this.permanentVillageList = this.permanentVillageList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            const perMandal = this.permanentSubDistrictList.find((item: { value: any; }) => item.value === id);
            this.agentCommunicationModel.permanentSubDistrictName = perMandal.label;
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
    const perVillage = this.permanentVillageList.find((item: { value: any; }) => item.value === id);
    this.agentCommunicationModel.permanentVillageName = perVillage.label;
  }

  sameAsRegisterAddress() {
    if (this.agentCommunicationModel.isSameAddress == true) {
      this.agentCommunicationModel.permanentStateId = this.agentCommunicationModel.stateId;
      if (this.agentCommunicationModel.districtId != this.agentCommunicationModel.permanentDistrictId) {
        this.agentCommunicationModel.permanentDistrictId = null;
        this.getAllPermanentDistrictsByStateId(this.agentCommunicationModel.permanentStateId, false);
        this.agentCommunicationModel.permanentDistrictId = this.agentCommunicationModel.districtId;
      }
      if (this.agentCommunicationModel.subDistrictId != this.agentCommunicationModel.permanentSubDistrictId) {
        this.agentCommunicationModel.permanentSubDistrictId = null;
        this.getAllPermanentSubDistrictByDistrictId(this.agentCommunicationModel.permanentDistrictId, false);
        this.agentCommunicationModel.permanentSubDistrictId = this.agentCommunicationModel.subDistrictId;
      }
      if (this.agentCommunicationModel.villageId != this.agentCommunicationModel.permanentVillageId) {
        this.agentCommunicationModel.permanentVillageId = null;
        this.getAllPermanentVillagesBySubDistrictId(this.agentCommunicationModel.permanentSubDistrictId, false);
        this.agentCommunicationModel.permanentVillageId = this.agentCommunicationModel.villageId;
      }
    }
  }

  sameAsPerAddr(isSameAddress: any) {
    if (isSameAddress) {
      this.agentCommunicationModel.isSameAddress = applicationConstants.TRUE;
      this.communicationForm.get('permanentStateId').disable();
      this.communicationForm.get('permanentDistrictId').disable();
      this.communicationForm.get('permanentSubDistrictId').disable();
      this.communicationForm.get('permanentVillageId').disable();
      this.communicationForm.get('permanentAddress1').disable();
      this.communicationForm.get('permanentPinCode').disable();

      this.agentCommunicationModel.permanentStateId = this.agentCommunicationModel.stateId;
      if (this.agentCommunicationModel.districtId != this.agentCommunicationModel.permanentDistrictId) {
        this.agentCommunicationModel.permanentDistrictId = null;
        this.getAllPermanentDistrictsByStateId(this.agentCommunicationModel.permanentStateId, false);
        this.agentCommunicationModel.permanentDistrictId = this.agentCommunicationModel.districtId;
      }
      if (this.agentCommunicationModel.subDistrictId != this.agentCommunicationModel.permanentSubDistrictId) {
        this.agentCommunicationModel.permanentSubDistrictId = null;
        this.getAllPermanentSubDistrictByDistrictId(this.agentCommunicationModel.permanentDistrictId, false);
        this.agentCommunicationModel.permanentSubDistrictId = this.agentCommunicationModel.subDistrictId;
      }
      if (this.agentCommunicationModel.villageId != this.agentCommunicationModel.permanentVillageId) {
        this.agentCommunicationModel.permanentVillageId = null;
        this.getAllPermanentVillagesBySubDistrictId(this.agentCommunicationModel.permanentSubDistrictId, false);
        this.agentCommunicationModel.permanentVillageId = this.agentCommunicationModel.villageId;
      }
      this.agentCommunicationModel.permanentAddress1 = this.agentCommunicationModel.address1;
      this.agentCommunicationModel.permanentAddress2 = this.agentCommunicationModel.address2;
      this.agentCommunicationModel.permanentPinCode = this.agentCommunicationModel.pinCode;
    }
    else {
      this.agentCommunicationModel.isSameAddress = applicationConstants.FALSE;

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
      this.permanentDistrictList = [];
      this.permanentSubDistrictList = [];
      this.permanentVillageList = [];

      this.communicationForm.get('permanentStateId').enable();
      this.communicationForm.get('permanentDistrictId').enable();
      this.communicationForm.get('permanentSubDistrictId').enable();
      this.communicationForm.get('permanentVillageId').enable();
      this.communicationForm.get('permanentAddress1').enable();
      this.communicationForm.get('permanentPinCode').enable();

      this.agentCommunicationModel.permanentStateId = null;
      this.agentCommunicationModel.permanentDistrictId = null;
      this.agentCommunicationModel.permanentSubDistrictId = null;
      this.agentCommunicationModel.permanentVillageId = null;
      this.agentCommunicationModel.permanentAddress1 = null;
      this.agentCommunicationModel.permanentAddress2 = null;
      this.agentCommunicationModel.permanentPinCode = null;
    }
    this.updateData();
  }

  RegAddressToComAddress() {
    if (this.agentCommunicationModel.isSameAddress == true) {
      this.agentCommunicationModel.permanentAddress1 = this.agentCommunicationModel.address1;
      this.agentCommunicationModel.permanentAddress2 = this.agentCommunicationModel.address2;
      this.agentCommunicationModel.permanentPinCode = this.agentCommunicationModel.pinCode;
    }
  }

}
