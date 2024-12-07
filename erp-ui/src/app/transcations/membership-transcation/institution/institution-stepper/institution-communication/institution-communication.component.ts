import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { InstituteCommunicationModel, InstitutionBasicDetailsModel } from '../../../shared/institution-details.model';
import { MemberBasicDetailsStepperService } from '../../../individual/shared/membership-individual-stepper.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { StatesService } from 'src/app/configurations/common-config/state/shared/states.service';
import { SubDistrictService } from 'src/app/configurations/common-config/sub-district/shared/sub-district.service';
import { DistrictService } from 'src/app/configurations/common-config/district/shared/district.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { VillagesService } from 'src/app/configurations/common-config/villages/shared/villages.service';
import { MemInstitutionService } from '../../../shared/mem-institution.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-institution-communication',
  templateUrl: './institution-communication.component.html',
  styleUrls: ['./institution-communication.component.css']
})
export class InstitutionCommunicationComponent implements OnInit{
  responseModel!: Responsemodel;
  msgs: any[]=[];
  institutionBasicDetailsModel :InstitutionBasicDetailsModel = new InstitutionBasicDetailsModel();
  instituteCommunicationModel:InstituteCommunicationModel = new InstituteCommunicationModel()
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  countryList: any[]=[];
  stateList: any[]=[];
  villageList: any[]=[];
  districtList: any[]=[];
  subDistrictList:any[]=[];
  instituteCommunicationForm:any;
  date: any;
  statuList:any[]=[];
  sameAsPermanentAddress: boolean = false;
  perstateList: any[]=[];
  pervillageList: any[]=[];
  perdistrictList: any[]=[];
  persubDistrictList:any[]=[];

  constructor(private router: Router, private formBuilder: FormBuilder,
    private memberBasicDetailsStepperService:MemberBasicDetailsStepperService,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,private datePipe: DatePipe,private statesService:StatesService,
    private districtService:DistrictService,private subDistrictService:SubDistrictService,
     private villagesService:VillagesService, private memInstitutionService: MemInstitutionService,
  )
  
  { 
    
    this.instituteCommunicationForm = this.formBuilder.group({
      'stateId': new FormControl('', Validators.required),
      'districtId': new FormControl('', Validators.required),
      'villageId': new FormControl('', Validators.required),
      'subDistrictId': new FormControl('',Validators.required),
      'address1': new FormControl('', Validators.required),
      'address2': new FormControl(''),
      'pinCode': new FormControl('',[Validators.pattern(applicationConstants.PINCODE_PATTERN),Validators.required]),
      'isSameAddress': new FormControl(''),
      'permanentStateId': new FormControl('',Validators.required),
      'permanentDistrictId': new FormControl('',Validators.required),
      'permanentSubDistrictId': new FormControl('',Validators.required),
      'permanentVillageId': new FormControl('',Validators.required),
      'permanentAddress1': new FormControl('',Validators.required),
      'permanentAddress2': new FormControl(''),
      'permanentPinCode': new FormControl('',[Validators.pattern(applicationConstants.PINCODE_PATTERN),Validators.required]),

    });
  }
  ngOnInit() {
    // Initialize other necessary variables and components
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
    
        if (id != "" && id != null && id != undefined) {
          this.isEdit = true;
          this.getMemInstitutionById(id);
        }
      } else {
        this.isEdit = false;
        // this.countryModel.isActive = this.statusList[0].value;
      }
    });
  
    this.instituteCommunicationForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.instituteCommunicationForm.valid) {
        this.save();
      }
    });
  
    this.getAllStatesList();
    this.getAllPermanentStatesList();
  }
  save() {
    this.updateData();
  }
  getMemInstitutionById(id: string) {
    this.memInstitutionService.getMemInstitutionById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] !=null) {
        this.institutionBasicDetailsModel = this.responseModel.data[0];
        this.instituteCommunicationModel.institutionId = this.institutionBasicDetailsModel.id;
        if(this.institutionBasicDetailsModel.institutionCommunicationDTOList != null && this.institutionBasicDetailsModel.institutionCommunicationDTOList != undefined && this.institutionBasicDetailsModel.institutionCommunicationDTOList.length > 0){
            this.instituteCommunicationModel = this.institutionBasicDetailsModel.institutionCommunicationDTOList[0];

  
          if (this.instituteCommunicationModel.isSameAddress != null && this.instituteCommunicationModel.isSameAddress != undefined) {
            if (this.instituteCommunicationModel.isSameAddress == applicationConstants.TRUE) {
              // this.sameAsPerAddr(this.instituteCommunicationModel.isSameAddress);
              this.instituteCommunicationForm.get('permanentStateId').disable();
              this.instituteCommunicationForm.get('permanentDistrictId').disable();
              this.instituteCommunicationForm.get('permanentSubDistrictId').disable();
              this.instituteCommunicationForm.get('permanentVillageId').disable();
              this.instituteCommunicationForm.get('permanentAddress1').disable();
              this.instituteCommunicationForm.get('permanentPinCode').disable();

            }
          }
          if (this.instituteCommunicationModel.stateId != null) {
            this.getAllDistrictsByStateId(this.instituteCommunicationModel.stateId, applicationConstants.FALSE);
          }
          if (this.instituteCommunicationModel.districtId != null) {
            this.getAllSubDistrictsByDistrictId(this.instituteCommunicationModel.districtId, applicationConstants.FALSE);
          }
          if (this.instituteCommunicationModel.subDistrictId != null) {
            this.getAllVillagesBySubDistrictId(this.instituteCommunicationModel.subDistrictId, applicationConstants.FALSE);
          }
  
          if (this.instituteCommunicationModel.permanentStateId != null) {
            this.getAllperDistrictsByStateId(this.instituteCommunicationModel.permanentStateId, applicationConstants.FALSE);
          }
          if (this.instituteCommunicationModel.permanentDistrictId != null) {
            this.getAllPerSubDistrictsByDistrictId(this.instituteCommunicationModel.permanentDistrictId, applicationConstants.FALSE);
          }
          if (this.instituteCommunicationModel.permanentSubDistrictId != null) {
            this.getAllPerVillagesBySubDistrictId(this.instituteCommunicationModel.permanentSubDistrictId,applicationConstants.FALSE);
          
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
      this.instituteCommunicationForm.get('districtId').reset();
      this.instituteCommunicationForm.get('subDistrictId').reset();
      this.instituteCommunicationForm.get('villageId').reset();
     
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
        let state=  this.stateList.find((data:any) => null != data && this.instituteCommunicationModel.stateId !=  null && data.value ==this.instituteCommunicationModel.stateId);
        if(state != null && undefined != state)
        this.instituteCommunicationModel.stateName = state.label;

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
      this.instituteCommunicationForm.get('subDistrictId').reset();
      this.instituteCommunicationForm.get('villageId').reset();
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
         this.instituteCommunicationModel.districtName = state.label;
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
      this.instituteCommunicationForm.get('villageId').reset();
      this.villageList = [];
    }
    this.villagesService.getVillagesBySubDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.villageList = this.responseModel.data;
            this.villageList = this.villageList.filter((obj: any) => obj != null  && obj.status == applicationConstants.ACTIVE).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            let mandal=  this.subDistrictList.find((data:any) => null != data && data.value === id);
            if(mandal != null && undefined != mandal)
            this.instituteCommunicationModel.subDistrictName = mandal.label;
            
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
   this.instituteCommunicationModel.villageName = Village.label;
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
      this.instituteCommunicationForm.get('permanentDistrictId').reset();
      this.instituteCommunicationForm.get('permanentSubDistrictId').reset();
      this.instituteCommunicationForm.get('permanentVillageId').reset();
      this.perdistrictList = [];
      this.persubDistrictList = [];
      this.pervillageList = [];
    }
    this.districtService.getDistrictByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.perdistrictList = this.responseModel.data;
        this.perdistrictList = this.perdistrictList.filter((obj: any) => obj != null  && obj.status == applicationConstants.ACTIVE).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let state=  this.perstateList.find((data:any) => null != data && data.value === id);
        if(state != null && undefined != state)
        this.instituteCommunicationModel.permanentStateName = state.label;
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
      this.instituteCommunicationForm.get('permanentSubDistrictId').reset();
      this.instituteCommunicationForm.get('permanentVillageId').reset();
      this.persubDistrictList = [];
      this.pervillageList = [];
    }
    this.subDistrictService.getSubDistrictByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.persubDistrictList = this.responseModel.data;
        this.persubDistrictList = this.persubDistrictList.filter((obj: any) => obj != null  && obj.status == applicationConstants.ACTIVE).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let district=  this.perdistrictList.find((data:any) => null != data && id != null && data.value === id);
        if(district != null && undefined != district)
        this.instituteCommunicationModel.permanentDistrictName = district.label;
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
      this.instituteCommunicationForm.get('permanentVillageId').reset();
      this.pervillageList = [];
    }
    this.villagesService.getVillagesBySubDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.pervillageList = this.responseModel.data;
            this.pervillageList = this.pervillageList.filter((obj: any) => obj != null  && obj.status == applicationConstants.ACTIVE).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            let mandal=  this.persubDistrictList.find((data:any) => null != data && id != null && data.value === id);
            if(mandal != null && undefined != mandal)
            this.instituteCommunicationModel.permanentSubDistrictName = mandal.label;
           
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
    this.instituteCommunicationModel.permanentVillageName = village.label;
   }
  updateData() {
    this.memberBasicDetailsStepperService.changeData({
      formValid: this.instituteCommunicationForm.valid ,
      data: this.instituteCommunicationModel,
      stepperIndex: 2,
      isDisable: this.instituteCommunicationForm.valid? false : true, 
    });
  }
  sameAsPerAddr(isSameAddress: any) {
    if (isSameAddress) {
      this.instituteCommunicationModel.isSameAddress = applicationConstants.TRUE;
      this.instituteCommunicationForm.get('permanentStateId').disable();
      this.instituteCommunicationForm.get('permanentDistrictId').disable();
      this.instituteCommunicationForm.get('permanentSubDistrictId').disable();
      this.instituteCommunicationForm.get('permanentVillageId').disable();
      this.instituteCommunicationForm.get('permanentAddress1').disable();
      // this.communicationform.get('permenentAddressTwo').disable();
      this.instituteCommunicationForm.get('permanentPinCode').disable();
      this.instituteCommunicationModel.permanentStateId = this.instituteCommunicationModel.stateId;
      if (this.instituteCommunicationModel.districtId != this.instituteCommunicationModel.permanentDistrictId) {
        this.instituteCommunicationModel.permanentDistrictId = null;
        this.getAllperDistrictsByStateId(this.instituteCommunicationModel.permanentStateId, false);
        this.instituteCommunicationModel.permanentDistrictId = this.instituteCommunicationModel.districtId;
      }
      if (this.instituteCommunicationModel.subDistrictId != this.instituteCommunicationModel.permanentSubDistrictId) {
        this.instituteCommunicationModel.permanentSubDistrictId = null;
        this.getAllPerSubDistrictsByDistrictId(this.instituteCommunicationModel.permanentDistrictId, false);
        this.instituteCommunicationModel.permanentSubDistrictId = this.instituteCommunicationModel.subDistrictId;
      }
      if (this.instituteCommunicationModel.villageId != this.instituteCommunicationModel.permanentVillageId) {
        this.instituteCommunicationModel.permanentVillageId = null;
        this.getAllPerVillagesBySubDistrictId(this.instituteCommunicationModel.permanentSubDistrictId, false);
        
        this.instituteCommunicationModel.permanentVillageId = this.instituteCommunicationModel.villageId;
        if(this.instituteCommunicationModel.permanentVillageId != null && this.instituteCommunicationModel.permanentVillageId != undefined){
          this.instituteCommunicationModel.permanentVillageName = this.instituteCommunicationModel.villageName;
        }
      }

      this.instituteCommunicationModel.permanentAddress1 = this.instituteCommunicationModel.address1;
      // this.instituteCommunicationModel.permanentAddress2 = this.instituteCommunicationModel.address2;
      this.instituteCommunicationModel.permanentPinCode = this.instituteCommunicationModel.pinCode;
    }
    else {
      this.instituteCommunicationModel.isSameAddress = applicationConstants.FALSE;

      this.instituteCommunicationForm.get('permanentStateId').enable();
      this.instituteCommunicationForm.get('permanentDistrictId').enable();
      this.instituteCommunicationForm.get('permanentSubDistrictId').enable();
      this.instituteCommunicationForm.get('permanentVillageId').enable();
      this.instituteCommunicationForm.get('permanentAddress1').enable();
      // this.communicationform.get('permenentAddressTwo').enable();
      this.instituteCommunicationForm.get('permanentPinCode').enable();

      this.instituteCommunicationForm.get('permanentStateId').reset();
      this.instituteCommunicationForm.get('permanentDistrictId').reset();
      this.instituteCommunicationForm.get('permanentSubDistrictId').reset();
      this.instituteCommunicationForm.get('permanentVillageId').reset();
      this.instituteCommunicationForm.get('permanentAddress1').reset();
      // this.communicationform.get('permenentAddressTwo').reset();
      this.instituteCommunicationForm.get('permanentPinCode').reset();

      this.perdistrictList = [];
      this.persubDistrictList = [];
      this.pervillageList = [];


      this.instituteCommunicationForm.get('permanentStateId').enable();
      this.instituteCommunicationForm.get('permanentDistrictId').enable();
      this.instituteCommunicationForm.get('permanentSubDistrictId').enable();
      this.instituteCommunicationForm.get('permanentVillageId').enable();
      this.instituteCommunicationForm.get('permanentAddress1').enable();
      this.instituteCommunicationForm.get('permanentPinCode').enable();
      // this.communicationform.get('permenentAddressTwo').enable();
      // this.communicationform.get('permanentPinCode').enable();

      this.instituteCommunicationModel.permanentStateId = null;
      this.instituteCommunicationModel.permanentDistrictId = null;
      this.instituteCommunicationModel.permanentSubDistrictId = null;
      this.instituteCommunicationModel.permanentVillageId = null;
      this.instituteCommunicationModel.permanentAddress1 = null;
      // this.instituteCommunicationModel.permanentAddress2 = null;
      this.instituteCommunicationModel.permanentPinCode = null;
    }
    this.updateData();
  }

  RegAddressToComAddress() {
    if (this.instituteCommunicationModel.isSameAddress == applicationConstants.TRUE) {
      this.instituteCommunicationModel.permanentAddress1 = this.instituteCommunicationModel.address1;
      // this.instituteCommunicationModel.permanentAddress2 = this.instituteCommunicationModel.address2;
      this.instituteCommunicationModel.permanentPinCode = this.instituteCommunicationModel.pinCode;
    }
  }
  sameAsRegisterAddress() {
    if (this.instituteCommunicationModel.isSameAddress == applicationConstants.TRUE) {
      this.instituteCommunicationModel.permanentStateId = this.instituteCommunicationModel.stateId;
      if (this.instituteCommunicationModel.districtId != this.instituteCommunicationModel.permanentDistrictId) {
        this.instituteCommunicationModel.permanentDistrictId = null;
        this.instituteCommunicationModel.permanentDistrictName = null;
        this.getAllperDistrictsByStateId(this.instituteCommunicationModel.permanentStateId,false);
        this.instituteCommunicationModel.permanentDistrictId = this.instituteCommunicationModel.districtId;
      }
      if (this.instituteCommunicationModel.subDistrictId != this.instituteCommunicationModel.permanentSubDistrictId) {
        this.instituteCommunicationModel.permanentSubDistrictId = null;
        this.instituteCommunicationModel.permanentSubDistrictName = null;
        this.getAllPerSubDistrictsByDistrictId(this.instituteCommunicationModel.permanentDistrictId,false);
        this.instituteCommunicationModel.permanentSubDistrictId = this.instituteCommunicationModel.subDistrictId;
      }
      if (this.instituteCommunicationModel.villageId != this.instituteCommunicationModel.permanentVillageId) {
        this.instituteCommunicationModel.permanentVillageId = null;
        this.instituteCommunicationModel.permanentVillageName = null;
        this.getAllPerVillagesBySubDistrictId(this.instituteCommunicationModel.permanentSubDistrictId,false);
        this.instituteCommunicationModel.permanentVillageId = this.instituteCommunicationModel.villageId;
        if(this.instituteCommunicationModel.permanentVillageId != null && this.instituteCommunicationModel.permanentVillageId != undefined){
          this.getPerVillage(this.instituteCommunicationModel.permanentVillageId);
        }
      }
    }
  }
}