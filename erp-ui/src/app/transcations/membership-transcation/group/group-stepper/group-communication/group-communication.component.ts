import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DistrictService } from 'src/app/configurations/common-config/district/shared/district.service';
import { VillagesService } from 'src/app/configurations/common-config/villages/shared/villages.service';
import { StatesService } from 'src/app/configurations/common-config/state/shared/states.service';
import { SubDistrictService } from 'src/app/configurations/common-config/sub-district/shared/sub-district.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MemberBasicDetailsStepperService } from '../../../individual/shared/membership-individual-stepper.service';
import { GroupCommunicationDetailsService } from '../../../shared/group-communication-details.service';
import { MembershipGroupDetailsService } from '../../../shared/membership-group-details.service';
import { GroupKycDetailsService } from '../../../shared/group-kyc-details.service';
import { GroupCommunicationModel, GroupKycDeatilsModel, MemberGroupBasicDetails } from '../../../shared/member-group-details-model';

@Component({
  selector: 'app-group-communication',
  templateUrl: './group-communication.component.html',
  styleUrls: ['./group-communication.component.css']
})
export class GroupCommunicationComponent {

  responseModel!: Responsemodel;
  msgs: any[]=[];
  memberGroupBasicDetails :MemberGroupBasicDetails = new MemberGroupBasicDetails();
  groupCommunicationModel:GroupCommunicationModel = new GroupCommunicationModel()
  groupKycDeatilsModel:GroupKycDeatilsModel = new GroupKycDeatilsModel();
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  countryList: any[]=[];
  stateList: any[]=[];
  villageList: any[]=[];
  districtList: any[]=[];
  subDistrictList:any[]=[];
  groupCommunicationForm:any;
  groupCommunication:any;
  date: any;
  statuList:any[]=[];
  sameAsPermanentAddress: boolean = false;
  perstateList: any[]=[];
  pervillageList: any[]=[];
  perdistrictList: any[]=[];
  persubDistrictList:any[]=[];

  constructor(private router: Router, private formBuilder: FormBuilder, private membershipGroupDetailsService: MembershipGroupDetailsService,
    private memberBasicDetailsStepperService:MemberBasicDetailsStepperService,
    private commonComponent: CommonComponent,private droupCommunicationDetailsService:GroupCommunicationDetailsService,private groupKycDetailsService: GroupKycDetailsService,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,private datePipe: DatePipe,private statesService:StatesService,
     private commonFunctionsService: CommonFunctionsService,private districtService:DistrictService,private subDistrictService:SubDistrictService,
     private villagesService:VillagesService,
  )
  { 
    this.groupCommunicationForm = this.formBuilder.group({
      'stateName': new FormControl('', Validators.required),
      'districtName': new FormControl('', Validators.required),
      'villageName': new FormControl('', Validators.required),
      'subDistrictName': new FormControl('', Validators.required),
      'address1': new FormControl('', Validators.required),
      'address2': new FormControl(''),
      'pincode':new FormControl('',[Validators.pattern(applicationConstants.PINCODE_PATTERN),Validators.required]),
      'isSameAddress': new FormControl(''),
      'permanentStateId': new FormControl('',Validators.required),
      'permanentDistrictId': new FormControl('',Validators.required),
      'permanentSubDistrictId': new FormControl('',Validators.required),
      'permanentVillageId': new FormControl('',Validators.required),
      'permanentAddress1': new FormControl('',Validators.required),
      'permntAddress2': new FormControl(''),
      'permanentPincode': new FormControl('',[Validators.pattern(applicationConstants.PINCODE_PATTERN),Validators.required]),
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    // Initialize other necessary variables and components
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
    
        if (id != "" && id != null && id != undefined) {
          this.isEdit = true;
          this.getMembershipGroupDetailsById(id);
        }
      } else {
        this.isEdit = false;
        // this.countryModel.isActive = this.statusList[0].value;
      }
    });
  
    this.groupCommunicationForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.groupCommunicationForm.valid) {
        this.save();
      }
    });
  
    this.getAllStatesList();
    this.getAllPermanentStatesList();
  }
  save() {
    this.updateData();
  }
  getMembershipGroupDetailsById(id: string) {
    this.membershipGroupDetailsService.getMembershipGroupDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        this.memberGroupBasicDetails = this.responseModel.data[0];
        this.groupCommunicationModel.groupId = this.memberGroupBasicDetails.id;
        if (this.memberGroupBasicDetails.admissionDate != null && this.memberGroupBasicDetails.admissionDate != undefined) {
          this.memberGroupBasicDetails.admissionDateVal = this.datePipe.transform(this.memberGroupBasicDetails.admissionDate, this.orgnizationSetting.datePipe);
        }

        if(this.memberGroupBasicDetails.groupCommunicationList != null && this.memberGroupBasicDetails.groupCommunicationList != undefined && this.memberGroupBasicDetails.groupCommunicationList.length > 0){
            this.groupCommunicationModel = this.memberGroupBasicDetails.groupCommunicationList[0];

  
          if (this.groupCommunicationModel.isSameAddress != null && this.groupCommunicationModel.isSameAddress != undefined) {
            if (this.groupCommunicationModel.isSameAddress == applicationConstants.TRUE) {
              // this.sameAsPerAddr(this.groupCommunicationModel.isSameAddress);
              this.groupCommunicationForm.get('permanentStateId').disable();
              this.groupCommunicationForm.get('permanentDistrictId').disable();
              this.groupCommunicationForm.get('permanentSubDistrictId').disable();
              this.groupCommunicationForm.get('permanentVillageId').disable();
              this.groupCommunicationForm.get('permanentAddress1').disable();
              this.groupCommunicationForm.get('permanentPincode').disable();

            }
          }
          if (this.groupCommunicationModel.stateId != null) {
            this.getAllDistrictsByStateId(this.groupCommunicationModel.stateId, applicationConstants.FALSE);
          }
          if (this.groupCommunicationModel.districtId != null) {
            this.getAllSubDistrictsByDistrictId(this.groupCommunicationModel.districtId, applicationConstants.FALSE);
          }
          if (this.groupCommunicationModel.subDistrictId != null) {
            this.getAllVillagesBySubDistrictId(this.groupCommunicationModel.subDistrictId, applicationConstants.FALSE);
          }
  
          if (this.groupCommunicationModel.permanentStateId != null) {
            this.getAllperDistrictsByStateId(this.groupCommunicationModel.permanentStateId, applicationConstants.FALSE);
          }
          if (this.groupCommunicationModel.permanentDistrictId != null) {
            this.getAllPerSubDistrictsByDistrictId(this.groupCommunicationModel.permanentDistrictId, applicationConstants.FALSE);
          }
          if (this.groupCommunicationModel.permanentSubDistrictId != null) {
            this.getAllPerVillagesBySubDistrictId(this.groupCommunicationModel.permanentSubDistrictId,applicationConstants.FALSE);
          
          this.updateData();
        }
      }
      else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);

      }
    }
    },
      error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }
 
  getAllStatesList() {
    this.statesService.getAllStates().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 ) {
            this.stateList = this.responseModel.data;
            this.stateList = this.responseModel.data.filter((obj: any) => obj != null).map((state: { name: any; id: any; }) => {
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
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
  getAllDistrictsByStateId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.groupCommunicationForm.get('districtName').reset();
      this.groupCommunicationForm.get('subDistrictName').reset();
      this.groupCommunicationForm.get('villageName').reset();
      this.districtList = [];
      this.subDistrictList = [];
      this.villageList = [];
    }
    this.districtService.getDistrictByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 ) {
        this.districtList = this.responseModel.data;
        this.districtList = this.districtList.filter((obj: any) => obj != null && obj.status == applicationConstants.ACTIVE ).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let state=  this.stateList.find((data:any) => null != data && this.groupCommunicationModel.stateId !=  null && data.value ==this.groupCommunicationModel.stateId);
        if(state != null && undefined != state)
        this.groupCommunicationModel.stateName = state.label;

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
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
  getAllSubDistrictsByDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.groupCommunicationForm.get('subDistrictName').reset();
      this.groupCommunicationForm.get('villageName').reset();
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
        let state=  this.districtList.find((data:any) => null != data  && id != null && data.value === id);
        if(state != null && undefined != state)
         this.groupCommunicationModel.districtName = state.label;
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
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
  getAllVillagesBySubDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.groupCommunicationForm.get('villageName').reset();
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
            let mandal=  this.subDistrictList.find((data:any) => null != data && data.value === id);
            if(mandal != null && undefined != mandal)
            this.groupCommunicationModel.subDistrictName = mandal.label;
            
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
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
  getVillage(id:any){
   let Village=  this.villageList.find((data:any) => null != data && id != null && data.value === id);
   if(Village != null && undefined != Village)
   this.groupCommunicationModel.villageName = Village.label;
    this.sameAsRegisterAddress();
  }

  getAllPermanentStatesList() {
    this.statesService.getAllStates().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.perstateList = this.responseModel.data;
            this.perstateList = this.responseModel.data.filter((obj: any) => obj != null).map((state: { name: any; id: any; }) => {
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
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
  getAllperDistrictsByStateId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.groupCommunicationForm.get('permanentDistrictId').reset();
      this.groupCommunicationForm.get('permanentSubDistrictId').reset();
      this.groupCommunicationForm.get('permanentVillageId').reset();
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
        let state=  this.perstateList.find((data:any) => null != data && data.value === id);
        if(state != null && undefined != state)
        this.groupCommunicationModel.permanentStateName = state.label;
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
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
  getAllPerSubDistrictsByDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.groupCommunicationForm.get('permanentSubDistrictId').reset();
      this.groupCommunicationForm.get('permanentVillageId').reset();
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
        this.groupCommunicationModel.permanentDistrictName = district.label;
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
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
  getAllPerVillagesBySubDistrictId(id: any, isResetIds: any) {
    if (isResetIds) {
      this.groupCommunicationForm.get('permanentVillageId').reset();
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
            this.groupCommunicationModel.permanentSubDistrictName = mandal.label;
           
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
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
  getPerVillage(id:any){
    let village=  this.pervillageList.find((data:any) => null != data && id != null && data.value === id);
    if(village != null && undefined != village)
    this.groupCommunicationModel.permanentVillageName = village.label;
   }
  updateData() {
    this.memberBasicDetailsStepperService.changeData({
      formValid: this.groupCommunicationForm.valid ,
      data: this.groupCommunicationModel,
      stepperIndex: 2,
      isDisable: this.groupCommunicationForm.valid? false : true, 
    });
  }
  sameAsPerAddr(isSameAddress: any) {
    if (isSameAddress) {
      this.groupCommunicationModel.isSameAddress = applicationConstants.TRUE;
      this.groupCommunicationForm.get('permanentStateId').disable();
      this.groupCommunicationForm.get('permanentDistrictId').disable();
      this.groupCommunicationForm.get('permanentSubDistrictId').disable();
      this.groupCommunicationForm.get('permanentVillageId').disable();
      this.groupCommunicationForm.get('permanentAddress1').disable();
      // this.communicationform.get('permenentAddressTwo').disable();
      this.groupCommunicationForm.get('permanentPincode').disable();
      this.groupCommunicationModel.permanentStateId = this.groupCommunicationModel.stateId;
      if (this.groupCommunicationModel.districtId != this.groupCommunicationModel.permanentDistrictId) {
        this.groupCommunicationModel.permanentDistrictId = null;
        this.getAllperDistrictsByStateId(this.groupCommunicationModel.permanentStateId, false);
        this.groupCommunicationModel.permanentDistrictId = this.groupCommunicationModel.districtId;
      }
      if (this.groupCommunicationModel.subDistrictId != this.groupCommunicationModel.permanentSubDistrictId) {
        this.groupCommunicationModel.permanentSubDistrictId = null;
        this.getAllPerSubDistrictsByDistrictId(this.groupCommunicationModel.permanentDistrictId, false);
        this.groupCommunicationModel.permanentSubDistrictId = this.groupCommunicationModel.subDistrictId;
      }
      if (this.groupCommunicationModel.villageId != this.groupCommunicationModel.permanentVillageId) {
        this.groupCommunicationModel.permanentVillageId = null;
        this.getAllPerVillagesBySubDistrictId(this.groupCommunicationModel.permanentSubDistrictId, false);
        this.groupCommunicationModel.permanentVillageId = this.groupCommunicationModel.villageId;
        if(this.groupCommunicationModel.permanentVillageId != null && this.groupCommunicationModel.permanentVillageId != undefined){
          this.groupCommunicationModel.permanentVillageName = this.groupCommunicationModel.villageName;
        }
      }

      this.groupCommunicationModel.permanentAddress1 = this.groupCommunicationModel.address1;
      // this.groupCommunicationModel.permanentAddress2 = this.groupCommunicationModel.address2;
      this.groupCommunicationModel.permanentPincode = this.groupCommunicationModel.pincode;
    }
    else {
      this.groupCommunicationModel.isSameAddress = applicationConstants.FALSE;

      this.groupCommunicationForm.get('permanentStateId').enable();
      this.groupCommunicationForm.get('permanentDistrictId').enable();
      this.groupCommunicationForm.get('permanentSubDistrictId').enable();
      this.groupCommunicationForm.get('permanentVillageId').enable();
      this.groupCommunicationForm.get('permanentAddress1').enable();
      // this.communicationform.get('permenentAddressTwo').enable();
      this.groupCommunicationForm.get('permanentPincode').enable();

      this.groupCommunicationForm.get('permanentStateId').reset();
      this.groupCommunicationForm.get('permanentDistrictId').reset();
      this.groupCommunicationForm.get('permanentSubDistrictId').reset();
      this.groupCommunicationForm.get('permanentVillageId').reset();
      this.groupCommunicationForm.get('permanentAddress1').reset();
      // this.communicationform.get('permenentAddressTwo').reset();
      this.groupCommunicationForm.get('permanentPincode').reset();

      this.perdistrictList = [];
      this.persubDistrictList = [];
      this.pervillageList = [];


      this.groupCommunicationForm.get('permanentStateId').enable();
      this.groupCommunicationForm.get('permanentDistrictId').enable();
      this.groupCommunicationForm.get('permanentSubDistrictId').enable();
      this.groupCommunicationForm.get('permanentVillageId').enable();
      this.groupCommunicationForm.get('permanentAddress1').enable();
      this.groupCommunicationForm.get('permanentPincode').enable();
      // this.communicationform.get('permenentAddressTwo').enable();
      // this.communicationform.get('permanentPincode').enable();

      this.groupCommunicationModel.permanentStateId = null;
      this.groupCommunicationModel.permanentDistrictId = null;
      this.groupCommunicationModel.permanentSubDistrictId = null;
      this.groupCommunicationModel.permanentVillageId = null;
      this.groupCommunicationModel.permanentAddress1 = null;
      // this.groupCommunicationModel.permanentAddress2 = null;
      this.groupCommunicationModel.permanentPincode = null;
    }
    this.updateData();
  }

  RegAddressToComAddress() {
    if (this.groupCommunicationModel.isSameAddress == applicationConstants.TRUE) {
      this.groupCommunicationModel.permanentAddress1 = this.groupCommunicationModel.address1;
      // this.groupCommunicationModel.permanentAddress2 = this.groupCommunicationModel.address2;
      this.groupCommunicationModel.permanentPincode = this.groupCommunicationModel.pincode;
    }
  }
  sameAsRegisterAddress() {
    if (this.groupCommunicationModel.isSameAddress == applicationConstants.TRUE) {
      this.groupCommunicationModel.permanentStateId = this.groupCommunicationModel.stateId;
      if (this.groupCommunicationModel.districtId != this.groupCommunicationModel.permanentDistrictId) {
        this.groupCommunicationModel.permanentDistrictId = null;
        this.groupCommunicationModel.permanentDistrictName = null;
        this.getAllperDistrictsByStateId(this.groupCommunicationModel.permanentStateId,false);
        this.groupCommunicationModel.permanentDistrictId = this.groupCommunicationModel.districtId;
      }
      if (this.groupCommunicationModel.subDistrictId != this.groupCommunicationModel.permanentSubDistrictId) {
        this.groupCommunicationModel.permanentSubDistrictId = null;
        this.groupCommunicationModel.permanentSubDistrictName = null;
        this.getAllPerSubDistrictsByDistrictId(this.groupCommunicationModel.permanentDistrictId,false);
        this.groupCommunicationModel.permanentSubDistrictId = this.groupCommunicationModel.subDistrictId;
      }
      if (this.groupCommunicationModel.villageId != this.groupCommunicationModel.permanentVillageId) {
        this.groupCommunicationModel.permanentVillageId = null;
        this.groupCommunicationModel.permanentVillageName = null;
        this.getAllPerVillagesBySubDistrictId(this.groupCommunicationModel.permanentSubDistrictId,false);
        this.groupCommunicationModel.permanentVillageId = this.groupCommunicationModel.villageId;
        if(this.groupCommunicationModel.permanentVillageId != null && this.groupCommunicationModel.permanentVillageId != undefined){
          this.getPerVillage(this.groupCommunicationModel.permanentVillageId);
        }
      }
    }
  }

  
}
 
