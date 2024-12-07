import { Village } from './../../../../configurations/common-config/villages/shared/village.model';
import { District } from './../../../../configurations/common-config/district/shared/district.model';
import { MemberBasicDetails, MemberCommunicationDeatilsModel } from './../../shared/member-basic-details.model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipBasicDetailsService } from '../../shared/membership-basic-details.service';
import { DatePipe } from '@angular/common';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MembershipCommunicationDetailsService } from '../../shared/membership-communication-details.service';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MemberBasicDetailsStepperService } from '../shared/membership-individual-stepper.service';
import { DistrictService } from 'src/app/configurations/common-config/district/shared/district.service';
import { VillagesService } from 'src/app/configurations/common-config/villages/shared/villages.service';
import { StatesService } from 'src/app/configurations/common-config/state/shared/states.service';
import { SubDistrictService } from 'src/app/configurations/common-config/sub-district/shared/sub-district.service';
import { Communication } from 'src/app/transcations/agent-details-transaction/agent-registration-stepper/communication/shared/communication.model';

@Component({
  selector: 'app-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css']
})
export class CommunicationsComponent {
  cities: any[] | undefined;
  statusList: any[]=[];
  memberCommunicationDetailsModel: MemberCommunicationDeatilsModel = new MemberCommunicationDeatilsModel();
  memberBasicDetailsModel: MemberBasicDetails = new MemberBasicDetails();
  responseModel!: Responsemodel;
  msgs: any[]=[];
  checkbox: any;
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  countryList: any[]=[];
  communicationform: any;
  stateList: any[]=[];
  villageList: any[]=[];
  districtList: any[]=[];
  subDistrictList:any[]=[];
  perstateList: any[]=[];
  pervillageList: any[]=[];
  sameAsPermanentAddress: boolean = false;
  perdistrictList: any[]=[];
  persubDistrictList:any[]=[];
  productTypeList: any[]=[];

  constructor(private router: Router, private formBuilder: FormBuilder, private membershipBasicDetailsService: MembershipBasicDetailsService,
    private memberBasicDetailsStepperService:MemberBasicDetailsStepperService,
    private commonComponent: CommonComponent,private membershipCommunicationDetailsService:MembershipCommunicationDetailsService,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,private datePipe: DatePipe,private statesService:StatesService,
     private commonFunctionsService: CommonFunctionsService,private districtService:DistrictService,private subDistrictService:SubDistrictService,
     private villagesService:VillagesService,
  )
  { 
    this.communicationform = this.formBuilder.group({
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
    })
  }
  ngOnInit() {
    // Initialize other necessary variables and components
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
    
        if (id != "" && id != null && id != undefined) {
          this.isEdit = true;
          this.getCommunicationDetialsByMembershipId(id);
        }
      } else {
        this.isEdit = false;
        // this.countryModel.isActive = this.statusList[0].value;
      }
    });
  
    this.communicationform.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.communicationform.valid) {
        this.save();
      }
    });
  
    this.getAllStatesList();
    this.getAllPermanentStatesList();
  }
  save() {
    this.updateData();
  }
  getCommunicationDetialsByMembershipId(id: string) {
    this.membershipBasicDetailsService.getMembershipBasicDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.memberBasicDetailsModel = this.responseModel.data[0];
        this.memberCommunicationDetailsModel.memberShipId = this.memberBasicDetailsModel.id;
        if (this.memberBasicDetailsModel.memberShipCommunicationDetailsDTOList != null && this.memberBasicDetailsModel.memberShipCommunicationDetailsDTOList != undefined && this.memberBasicDetailsModel.memberShipCommunicationDetailsDTOList.length > 0) {
          this.memberCommunicationDetailsModel = this.memberBasicDetailsModel.memberShipCommunicationDetailsDTOList[0];
  
          if (this.memberCommunicationDetailsModel.isSameAddress != null && this.memberCommunicationDetailsModel.isSameAddress != undefined) {
            if (this.memberCommunicationDetailsModel.isSameAddress == applicationConstants.TRUE) {
              // this.sameAsPerAddr(this.memberCommunicationDetailsModel.isSameAddress);
              this.communicationform.get('permanentStateId').disable();
              this.communicationform.get('permanentDistrictId').disable();
              this.communicationform.get('permanentSubDistrictId').disable();
              this.communicationform.get('permanentVillageId').disable();
              this.communicationform.get('permanentAddress1').disable();
              this.communicationform.get('permanentPinCode').disable();

            }
          }
          if (this.memberCommunicationDetailsModel.stateId != null) {
            this.getAllDistrictsByStateId(this.memberCommunicationDetailsModel.stateId, false);
          }
          if (this.memberCommunicationDetailsModel.districtId != null) {
            this.getAllSubDistrictsByDistrictId(this.memberCommunicationDetailsModel.districtId, false);
          }
          if (this.memberCommunicationDetailsModel.subDistrictId != null) {
            this.getAllVillagesBySubDistrictId(this.memberCommunicationDetailsModel.subDistrictId, false);
          }
  
          if (this.memberCommunicationDetailsModel.permanentStateId != null) {
            this.getAllperDistrictsByStateId(this.memberCommunicationDetailsModel.permanentStateId, false);
          }
          if (this.memberCommunicationDetailsModel.permanentDistrictId != null) {
            this.getAllPerSubDistrictsByDistrictId(this.memberCommunicationDetailsModel.permanentDistrictId, false);
          }
          if (this.memberCommunicationDetailsModel.permanentSubDistrictId != null) {
            this.getAllPerVillagesBySubDistrictId(this.memberCommunicationDetailsModel.permanentSubDistrictId, false);
          }
          this.updateData();
        }
      }
    });
  }
  getAllStatesList() {
    this.statesService.getAllStates().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 ) {
            this.stateList = this.responseModel.data;
            this.stateList = this.responseModel.data.filter((obj: any) => obj != null && obj.status == applicationConstants.ACTIVE).map((state: { name: any; id: any; }) => {
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
  getAllDistrictsByStateId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationform.get('districtId').reset();
      this.communicationform.get('subDistrictId').reset();
      this.communicationform.get('villageId').reset();
      this.districtList = [];
      this.subDistrictList = [];
      this.villageList = [];
    }
    this.districtService.getDistrictByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 ) {
        this.districtList = this.responseModel.data;
        this.districtList = this.districtList.filter((obj: any) => obj != null && obj.status == applicationConstants.ACTIVE).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let state=  this.stateList.find((data:any) => null != data && this.memberCommunicationDetailsModel.stateId != null && data.value ==this.memberCommunicationDetailsModel.stateId);
        if(state != null && undefined != state)
        this.memberCommunicationDetailsModel.stateName = state.label;

        this.sameAsRegisterAddress();
      }
    }
      else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
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
  getAllSubDistrictsByDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationform.get('subDistrictId').reset();
      this.communicationform.get('villageId').reset();
      this.subDistrictList = [];
      this.villageList = [];
    }
    this.subDistrictService.getSubDistrictByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 ) {
        this.subDistrictList = this.responseModel.data;
        this.subDistrictList = this.subDistrictList.filter((obj: any) => obj != null && obj.status == applicationConstants.ACTIVE).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let district=  this.districtList.find((data:any) => null != data && data.value === id);
        if(district != null && undefined != district)
         this.memberCommunicationDetailsModel.districtName = district.label;
        this.sameAsRegisterAddress();
      }
    }
      else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
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
  getAllVillagesBySubDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationform.get('villageId').reset();
      this.villageList = [];
    }
    this.villagesService.getVillagesBySubDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.villageList = this.responseModel.data;
            this.villageList = this.villageList.filter((obj: any) => obj != null && obj.status == applicationConstants.ACTIVE).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            let mandal=  this.subDistrictList.find((data:any) => null != data && id != null && data.value === id);
            if(mandal != null && undefined != mandal)
            this.memberCommunicationDetailsModel.subDistrictName = mandal.label;
            
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
  getVillage(id:any){
   let Village=  this.villageList.find((data:any) => null != data && id != null && data.value === id);
   if(Village != null && undefined != Village)
   this.memberCommunicationDetailsModel.villageName = Village.label;
    this.sameAsRegisterAddress();
  }

  getAllPermanentStatesList() {
    this.statesService.getAllStates().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 ) {
            this.perstateList = this.responseModel.data;
            this.perstateList = this.responseModel.data.filter((obj: any) => obj != null && obj.status == applicationConstants.ACTIVE).map((state: { name: any; id: any; }) => {
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
  getAllperDistrictsByStateId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationform.get('permanentDistrictId').reset();
      this.communicationform.get('permanentSubDistrictId').reset();
      this.communicationform.get('permanentVillageId').reset();
      this.perdistrictList = [];
      this.persubDistrictList = [];
      this.pervillageList = [];
    }
    this.districtService.getDistrictByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.perdistrictList = this.responseModel.data;
        this.perdistrictList = this.perdistrictList.filter((obj: any) => obj != null && obj.status == applicationConstants.ACTIVE).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let state=  this.perstateList.find((data:any) => null != data && id != null && data.value === id);
        if(state != null && undefined != state)
        this.memberCommunicationDetailsModel.permanentStateName = state.label;
      }
      else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
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
  getAllPerSubDistrictsByDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationform.get('permanentSubDistrictId').reset();
      this.communicationform.get('permanentVillageId').reset();
      this.persubDistrictList = [];
      this.pervillageList = [];
    }
    this.subDistrictService.getSubDistrictByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.persubDistrictList = this.responseModel.data;
        this.persubDistrictList = this.persubDistrictList.filter((obj: any) => obj != null && obj.status == applicationConstants.ACTIVE).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let district=  this.perdistrictList.find((data:any) => null != data && id != null && data.value === id);
        if(district != null && undefined != district)
        this.memberCommunicationDetailsModel.permanentDistrictName = district.label;
      }
      else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
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
  getAllPerVillagesBySubDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.communicationform.get('permanentVillageId').reset();
      this.pervillageList = [];
    }
    this.villagesService.getVillagesBySubDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.pervillageList = this.responseModel.data;
            this.pervillageList = this.pervillageList.filter((obj: any) => obj != null && obj.status == applicationConstants.ACTIVE).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            let mandal=  this.persubDistrictList.find((data:any) => null != data && id != null && data.value === id);
            if(mandal != null && undefined != mandal)
            this.memberCommunicationDetailsModel.permanentSubDistrictName = mandal.label;
          if(this.memberCommunicationDetailsModel.permanentVillageId != null && this.memberCommunicationDetailsModel.permanentVillageId != undefined){
            this.getPerVillage(this.memberCommunicationDetailsModel.permanentVillageId);
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
  getPerVillage(id:any){
    let village=  this.pervillageList.find((data:any) => null != data && id != null && data.value === id);
    if(village != null && undefined != village)
    this.memberCommunicationDetailsModel.permanentVillageName = village.label;
   }
  updateData() {
    this.memberBasicDetailsStepperService.changeData({
      formValid: this.communicationform.valid ,
      data: this.memberCommunicationDetailsModel,
      stepperIndex: 2,
      isDisable: this.communicationform.valid? false : true, 
    });
  }
  sameAsPerAddr(isSameAddress: any) {
    if (isSameAddress) {
      this.memberCommunicationDetailsModel.isSameAddress = applicationConstants.TRUE;
      this.communicationform.get('permanentStateId').disable();
      this.communicationform.get('permanentDistrictId').disable();
      this.communicationform.get('permanentSubDistrictId').disable();
      this.communicationform.get('permanentVillageId').disable();
      this.communicationform.get('permanentAddress1').disable();
      // this.communicationform.get('permenentAddressTwo').disable();
      this.communicationform.get('permanentPinCode').disable();
      this.memberCommunicationDetailsModel.permanentStateId = this.memberCommunicationDetailsModel.stateId;
      if (this.memberCommunicationDetailsModel.districtId != this.memberCommunicationDetailsModel.permanentDistrictId) {
        this.memberCommunicationDetailsModel.permanentDistrictId = null;
        this.getAllperDistrictsByStateId(this.memberCommunicationDetailsModel.permanentStateId, false);
        this.memberCommunicationDetailsModel.permanentDistrictId = this.memberCommunicationDetailsModel.districtId;
      }
      if (this.memberCommunicationDetailsModel.subDistrictId != this.memberCommunicationDetailsModel.permanentSubDistrictId) {
        this.memberCommunicationDetailsModel.permanentSubDistrictId = null;
        this.getAllPerSubDistrictsByDistrictId(this.memberCommunicationDetailsModel.permanentDistrictId, false);
        this.memberCommunicationDetailsModel.permanentSubDistrictId = this.memberCommunicationDetailsModel.subDistrictId;
      }
      if (this.memberCommunicationDetailsModel.villageId != this.memberCommunicationDetailsModel.permanentVillageId) {
        this.memberCommunicationDetailsModel.permanentVillageId = null;
        this.getAllPerVillagesBySubDistrictId(this.memberCommunicationDetailsModel.permanentSubDistrictId, false);
        this.memberCommunicationDetailsModel.permanentVillageId = this.memberCommunicationDetailsModel.villageId;
        this.getPerVillage(this.memberCommunicationDetailsModel.permanentVillageId);
      }
      this.memberCommunicationDetailsModel.permanentAddress1 = this.memberCommunicationDetailsModel.address1;
      // this.memberCommunicationDetailsModel.permanentAddress2 = this.memberCommunicationDetailsModel.address2;
      this.memberCommunicationDetailsModel.permanentPinCode = this.memberCommunicationDetailsModel.pinCode;
    }
    else {
      this.memberCommunicationDetailsModel.isSameAddress = applicationConstants.FALSE;

      this.communicationform.get('permanentStateId').enable();
      this.communicationform.get('permanentDistrictId').enable();
      this.communicationform.get('permanentSubDistrictId').enable();
      this.communicationform.get('permanentVillageId').enable();
      this.communicationform.get('permanentAddress1').enable();
      // this.communicationform.get('permenentAddressTwo').enable();
      this.communicationform.get('permanentPinCode').enable();

      this.communicationform.get('permanentStateId').reset();
      this.communicationform.get('permanentDistrictId').reset();
      this.communicationform.get('permanentSubDistrictId').reset();
      this.communicationform.get('permanentVillageId').reset();
      this.communicationform.get('permanentAddress1').reset();
      // this.communicationform.get('permenentAddressTwo').reset();
      this.communicationform.get('permanentPinCode').reset();

      this.perdistrictList = [];
      this.persubDistrictList = [];
      this.pervillageList = [];


      this.communicationform.get('permanentStateId').enable();
      this.communicationform.get('permanentDistrictId').enable();
      this.communicationform.get('permanentSubDistrictId').enable();
      this.communicationform.get('permanentVillageId').enable();
      this.communicationform.get('permanentAddress1').enable();
      this.communicationform.get('permanentPinCode').enable();
      // this.communicationform.get('permenentAddressTwo').enable();
      // this.communicationform.get('permanentPinCode').enable();

      this.memberCommunicationDetailsModel.permanentStateId = null;
      this.memberCommunicationDetailsModel.permanentDistrictId = null;
      this.memberCommunicationDetailsModel.permanentSubDistrictId = null;
      this.memberCommunicationDetailsModel.permanentVillageId = null;
      this.memberCommunicationDetailsModel.permanentAddress1 = null;
      // this.memberCommunicationDetailsModel.permanentAddress2 = null;
      this.memberCommunicationDetailsModel.permanentPinCode = null;
    }
    this.updateData();
  }

  RegAddressToComAddress() {
    if (this.memberCommunicationDetailsModel.isSameAddress == applicationConstants.TRUE) {
      this.memberCommunicationDetailsModel.permanentAddress1 = this.memberCommunicationDetailsModel.address1;
      // this.memberCommunicationDetailsModel.permanentAddress2 = this.memberCommunicationDetailsModel.address2;
      this.memberCommunicationDetailsModel.permanentPinCode = this.memberCommunicationDetailsModel.pinCode;
    }
  }
  sameAsRegisterAddress() {
    if (this.memberCommunicationDetailsModel.isSameAddress ==  applicationConstants.TRUE) {
      this.memberCommunicationDetailsModel.permanentStateId = this.memberCommunicationDetailsModel.stateId;
      if (this.memberCommunicationDetailsModel.districtId != this.memberCommunicationDetailsModel.permanentDistrictId) {
        this.memberCommunicationDetailsModel.permanentDistrictId = null;
        // this.memberCommunicationDetailsModel.permanentDistrictName = null;
        this.getAllperDistrictsByStateId(this.memberCommunicationDetailsModel.permanentStateId,false);
        this.memberCommunicationDetailsModel.permanentDistrictId = this.memberCommunicationDetailsModel.districtId;
      }
      if (this.memberCommunicationDetailsModel.subDistrictId != this.memberCommunicationDetailsModel.permanentSubDistrictId) {
        this.memberCommunicationDetailsModel.permanentSubDistrictId = null;
        // this.memberCommunicationDetailsModel.permanentSubDistrictName = null;
        this.getAllPerSubDistrictsByDistrictId(this.memberCommunicationDetailsModel.permanentDistrictId,false);
        this.memberCommunicationDetailsModel.permanentSubDistrictId = this.memberCommunicationDetailsModel.subDistrictId;
      }
      if (this.memberCommunicationDetailsModel.villageId != this.memberCommunicationDetailsModel.permanentVillageId) {
        this.memberCommunicationDetailsModel.permanentVillageId = null;
        // this.memberCommunicationDetailsModel.permanentVillageName = null;
        this.getAllPerVillagesBySubDistrictId(this.memberCommunicationDetailsModel.permanentSubDistrictId,false);
        this.memberCommunicationDetailsModel.permanentVillageId = this.memberCommunicationDetailsModel.villageId;
        this.getPerVillage(this.memberCommunicationDetailsModel.permanentVillageId);
      }
    }
  }
}


