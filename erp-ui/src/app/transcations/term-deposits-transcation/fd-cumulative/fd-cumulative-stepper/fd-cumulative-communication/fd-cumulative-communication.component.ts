import { Component } from '@angular/core';
import { FdCumulativeApplication } from '../fd-cumulative-application/shared/fd-cumulative-application.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { FdCumulativeCommunicationService } from './shared/fd-cumulative-communication.service';
import { FdCumulativeApplicationService } from '../fd-cumulative-application/shared/fd-cumulative-application.service';
import { NewMembershipAddService } from '../new-membership-add/shared/new-membership-add.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MemberGroupDetailsModel, MembershipInstitutionDetailsModel, NewMembershipAdd } from '../new-membership-add/shared/new-membership-add.model';
import { FdCumulativeCommunication } from './shared/fd-cumulative-communication.model';

@Component({
  selector: 'app-fd-cumulative-communication',
  templateUrl: './fd-cumulative-communication.component.html',
  styleUrls: ['./fd-cumulative-communication.component.css']
})
export class FdCumulativeCommunicationComponent {

  communicationForm: any;
  communication: any;
  fdCumulativeApplicationModel: FdCumulativeApplication = new FdCumulativeApplication();
  fdCumulativeCommunicationModel: FdCumulativeCommunication = new FdCumulativeCommunication();
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
    private fdCumulativeApplicationService: FdCumulativeApplicationService,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService,
    private fdCumulativeCommunicationService: FdCumulativeCommunicationService,
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
            this.getFdCummApplicationById(this.id);
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
        this. fdCumulativeCommunicationModel.fdCummulativeAccId = this.id;
      if(this.accountNumber != null && this.accountNumber != undefined)
        this. fdCumulativeCommunicationModel.accountNumber = this.accountNumber;
      this.fdCumulativeApplicationService.changeData({
        formValid: !this.communicationForm.valid ? true : false,
        data: this. fdCumulativeCommunicationModel,
        isDisable: (!this.communicationForm.valid),
        stepperIndex: 2,
      });
    }
    save() {
      this.updateData();
    }
  
    // get call from fd non cummulative account by id
    getFdCummApplicationById(id: any) {
      this.fdCumulativeApplicationService.getFdCummApplicationById(id).subscribe((data: any) => {
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
                this.fdCumulativeApplicationModel = this.responseModel.data[0];
                if (this.fdCumulativeApplicationModel != null && this.fdCumulativeApplicationModel != undefined)
                  if (this.fdCumulativeApplicationModel.fdCummulativeAccountCommunicationList != null && this.fdCumulativeApplicationModel.fdCummulativeAccountCommunicationList != undefined &&
                    this.fdCumulativeApplicationModel.fdCummulativeAccountCommunicationList[0] != null && this.fdCumulativeApplicationModel.fdCummulativeAccountCommunicationList[0] != undefined){
                    this. fdCumulativeCommunicationModel = this.fdCumulativeApplicationModel.fdCummulativeAccountCommunicationList[0];
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
      if (this. fdCumulativeCommunicationModel.isSameAddress != null && this. fdCumulativeCommunicationModel.isSameAddress != undefined) {
        if (this. fdCumulativeCommunicationModel.isSameAddress == true) {
          this.communicationForm.get('permanentStateId').disable();
          this.communicationForm.get('permanentDistrictId').disable();
          this.communicationForm.get('permanentSubDistrictId').disable();
          this.communicationForm.get('permanentVillageId').disable();
          this.communicationForm.get('permanentAddress1').disable();
          this.communicationForm.get('permanentPinCode').disable();
  
       
          this.RegAddressToComAddress();
        }
      }
      if (this. fdCumulativeCommunicationModel.stateId != null)
        this.getAllDistrictsByStateId(this. fdCumulativeCommunicationModel.stateId, false)
      if (this. fdCumulativeCommunicationModel.districtId != null)
        this.getAllMandalsByDistrictId(this. fdCumulativeCommunicationModel.districtId, false)
      if (this. fdCumulativeCommunicationModel.mandalId!= null)
        this.getAllVillagesByMandalId(this. fdCumulativeCommunicationModel.mandalId, false)
  
      if (this. fdCumulativeCommunicationModel.permanentStateId != null)
        this.getAllPermanentDistrictsByStateId(this. fdCumulativeCommunicationModel.permanentStateId, false)
      if (this. fdCumulativeCommunicationModel.permanentDistrictId != null)
        this.getAllPermanentMandalsByDistrictId(this. fdCumulativeCommunicationModel.permanentDistrictId, false)
      if (this. fdCumulativeCommunicationModel.permanentSubDistrictId != null)
        this.getAllPermanentVillagesByMandalId(this. fdCumulativeCommunicationModel.permanentSubDistrictId, false)
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
              this. fdCumulativeCommunicationModel = this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0];
              if(this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0].admisionNumber != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0].admisionNumber != undefined)
                this. fdCumulativeCommunicationModel.admissionNumber = this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0].admisionNumber;
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
              this. fdCumulativeCommunicationModel = this.responseModel.data[0].groupCommunicationList[0];
              if(this. fdCumulativeCommunicationModel.memberTypeName != null && this. fdCumulativeCommunicationModel.memberTypeName != undefined)
                this.memberTypeName = this. fdCumulativeCommunicationModel.memberTypeName;
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
              this. fdCumulativeCommunicationModel = this.responseModel.data[0].institutionCommunicationDTOList[0];
              if(this. fdCumulativeCommunicationModel.memberTypeName != null && this. fdCumulativeCommunicationModel.memberTypeName != undefined)
                this.memberTypeName = this. fdCumulativeCommunicationModel.memberTypeName;
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
      this.fdCumulativeCommunicationService.getstatesList().subscribe((response: any) => {
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
      this.fdCumulativeCommunicationService.getDistrictsByStateId(id).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.districtsList = this.responseModel.data;
          this.districtsList = this.districtsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
            return { label: relationType.name, value: relationType.id };
          });
          const state = this.statesList.find((item: { value: any; }) => item.value === id);
          this. fdCumulativeCommunicationModel.stateName = state.label;
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
      this.fdCumulativeCommunicationService.getMandalsByDistrictId(id).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.mandalsList = this.responseModel.data;
          this.mandalsList = this.mandalsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
            return { label: relationType.name, value: relationType.id };
          });
          const district = this.districtsList.find((item: { value: any; }) => item.value === id);
          this. fdCumulativeCommunicationModel.districtName = district.label;
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
      this.fdCumulativeCommunicationService.getvillagesByMandalId(id).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.villageList = this.responseModel.data;
              this.villageList = this.villageList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
                return { label: relationType.name, value: relationType.id };
              });
              const mandal = this.mandalsList.find((item: { value: any; }) => item.value === id);
              this. fdCumulativeCommunicationModel.mandalName = mandal.label;
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
      this. fdCumulativeCommunicationModel.villageName = village.label;
      this.sameAsRegisterAddress();
    }
  
    getAllPermanentStatesList() {
      this.fdCumulativeCommunicationService.getstatesList().subscribe((response: any) => {
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
      this.fdCumulativeCommunicationService.getDistrictsByStateId(id).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.permenentDistrictList = this.responseModel.data;
          this.permenentDistrictList = this.permenentDistrictList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
            return { label: relationType.name, value: relationType.id };
          });
          const perState = this.permanentStatesList.find((item: { value: any; }) => item.value === id);
          this. fdCumulativeCommunicationModel.permanentStateName = perState.label;
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
      this.fdCumulativeCommunicationService.getMandalsByDistrictId(id).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.permenentSubDistrictList = this.responseModel.data;
          this.permenentSubDistrictList = this.permenentSubDistrictList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
            return { label: relationType.name, value: relationType.id };
          });
          const perDistrict = this.permenentDistrictList.find((item: { value: any; }) => item.value === id);
          this. fdCumulativeCommunicationModel.permanentDistrictName = perDistrict.label;
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
      this.fdCumulativeCommunicationService.getvillagesByMandalId(id).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.permenentVillageList = this.responseModel.data;
              this.permenentVillageList = this.permenentVillageList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
                return { label: relationType.name, value: relationType.id };
              });
              const perMandal = this.permenentSubDistrictList.find((item: { value: any; }) => item.value === id);
              this. fdCumulativeCommunicationModel.permanentSubDistrictName = perMandal.label;
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
      this. fdCumulativeCommunicationModel.permanentVillageName = perVillage.label;
    }
    sameAsRegisterAddress() {
      if (this. fdCumulativeCommunicationModel.isSameAddress == true) {
        this. fdCumulativeCommunicationModel.permanentStateId = this. fdCumulativeCommunicationModel.stateId;
        if (this. fdCumulativeCommunicationModel.districtId != this. fdCumulativeCommunicationModel.permanentDistrictId) {
          this. fdCumulativeCommunicationModel.permanentDistrictId = null;
          this.getAllPermanentDistrictsByStateId(this. fdCumulativeCommunicationModel.permanentStateId, false);
          this. fdCumulativeCommunicationModel.permanentDistrictId = this. fdCumulativeCommunicationModel.districtId;
        }
        if (this. fdCumulativeCommunicationModel.mandalId != this. fdCumulativeCommunicationModel.permanentSubDistrictId) {
          this. fdCumulativeCommunicationModel.permanentSubDistrictId = null;
          this.getAllPermanentMandalsByDistrictId(this. fdCumulativeCommunicationModel.permanentDistrictId, false);
          this. fdCumulativeCommunicationModel.permanentSubDistrictId = this. fdCumulativeCommunicationModel.mandalId;
        }
        if (this. fdCumulativeCommunicationModel.villageId != this. fdCumulativeCommunicationModel.permanentVillageId) {
          this. fdCumulativeCommunicationModel.permanentVillageId = null;
          this.getAllPermanentVillagesByMandalId(this. fdCumulativeCommunicationModel.permanentSubDistrictId, false);
          this. fdCumulativeCommunicationModel.permanentVillageId = this. fdCumulativeCommunicationModel.villageId;
        }
      }
    }
  
    sameAsPerAddr(isSameAddress: any) {
      if (isSameAddress) {
        this. fdCumulativeCommunicationModel.isSameAddress = applicationConstants.TRUE;
        this.communicationForm.get('permanentStateId').disable();
        this.communicationForm.get('permanentDistrictId').disable();
        this.communicationForm.get('permanentSubDistrictId').disable();
        this.communicationForm.get('permanentVillageId').disable();
        this.communicationForm.get('permanentAddress1').disable();
        this.communicationForm.get('permanentPinCode').disable();
  
        this. fdCumulativeCommunicationModel.permanentStateId = this. fdCumulativeCommunicationModel.stateId;
        if (this. fdCumulativeCommunicationModel.districtId != this. fdCumulativeCommunicationModel.permanentDistrictId) {
          this. fdCumulativeCommunicationModel.permanentDistrictId = null;
          this.getAllPermanentDistrictsByStateId(this. fdCumulativeCommunicationModel.permanentStateId, false);
          this. fdCumulativeCommunicationModel.permanentDistrictId = this. fdCumulativeCommunicationModel.districtId;
        }
        if (this. fdCumulativeCommunicationModel.mandalId != this. fdCumulativeCommunicationModel.permanentSubDistrictId) {
          this. fdCumulativeCommunicationModel.permanentSubDistrictId = null;
          this.getAllPermanentMandalsByDistrictId(this. fdCumulativeCommunicationModel.permanentDistrictId, false);
          this. fdCumulativeCommunicationModel.permanentSubDistrictId = this. fdCumulativeCommunicationModel.mandalId;
        }
        if (this. fdCumulativeCommunicationModel.villageId != this. fdCumulativeCommunicationModel.permanentVillageId) {
          this. fdCumulativeCommunicationModel.permanentVillageId = null;
          this.getAllPermanentVillagesByMandalId(this. fdCumulativeCommunicationModel.permanentSubDistrictId, false);
          this. fdCumulativeCommunicationModel.permanentVillageId = this. fdCumulativeCommunicationModel.villageId;
        }
  
        this. fdCumulativeCommunicationModel.permanentAddress1 = this. fdCumulativeCommunicationModel.address;
        this. fdCumulativeCommunicationModel.permanentPinCode = this. fdCumulativeCommunicationModel.pinCode;
      }
      else {
        this. fdCumulativeCommunicationModel.isSameAddress = applicationConstants.FALSE;
  
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
  
        this. fdCumulativeCommunicationModel.permanentStateId = null;
        this. fdCumulativeCommunicationModel.permanentDistrictId = null;
        this. fdCumulativeCommunicationModel.permanentSubDistrictId = null;
        this. fdCumulativeCommunicationModel.permanentVillageId = null;
        this. fdCumulativeCommunicationModel.permanentAddress1 = null;
        this. fdCumulativeCommunicationModel.permanentPinCode = null;
      }
      this.updateData();
    }
  
    RegAddressToComAddress() {
      if (this. fdCumulativeCommunicationModel.isSameAddress == true) {
        this. fdCumulativeCommunicationModel.permanentAddress1 = this. fdCumulativeCommunicationModel.address;
        this. fdCumulativeCommunicationModel.permanentPinCode = this. fdCumulativeCommunicationModel.pinCode;
      }
    }
  }
