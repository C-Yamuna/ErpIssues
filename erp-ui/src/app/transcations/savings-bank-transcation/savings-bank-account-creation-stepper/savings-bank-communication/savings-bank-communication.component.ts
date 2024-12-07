import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingsBankJointAccountService } from '../savings-bank-joint-account/shared/savings-bank-joint-account.service';
import { SavingBankApplicationService } from '../savings-bank-application/shared/saving-bank-application.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SavingBankApplicationModel } from '../savings-bank-application/shared/saving-bank-application-model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SavingsBankCommunicationModel } from './shared/savings-bank-communication-model';
import { SavingsBankCommunicationService } from './shared/savings-bank-communication.service';
import { District } from 'src/app/configurations/common-config/district/shared/district.model';
import { StatesService } from 'src/app/transcations/term-deposits-transcation/shared/states.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { SavingsBankKycModel } from '../savings-bank-kyc/shared/savings-bank-kyc-model';
import { MembershipServiceService } from '../membership-basic-required-details/shared/membership-service.service';
import { unwrapDeep } from 'angular-pipes/utils/utils';

@Component({
  selector: 'app-savings-bank-communication',
  templateUrl: './savings-bank-communication.component.html',
  styleUrls: ['./savings-bank-communication.component.css']
})
export class SavingsBankCommunicationComponent implements OnInit {
  checked: boolean = false;
  communicationForm: any;
  communication: any;
  savingBankApplicationModel: SavingBankApplicationModel = new SavingBankApplicationModel();
  savingsBankCommunicationModel: SavingsBankCommunicationModel = new SavingsBankCommunicationModel();
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
  sbAccId: any;
  statesList: any[] = [];
  districtsList: any[] = [];
  mandalsList: any[] = [];
  villageList: any[] = [];
  orgnizationSetting: any;
  productName: any;
  admissionNumber: any;
  memberTypeId: any;
  memberTypeName: any;
  showForm: boolean = false;
  memberName: any;
  mobileNumber: any;
  qualificationName: any;
  aadharNumber: any;
  permenentStatesList: any[]=[];
  permenentMandalsList: any[]=[];
  permenentVillagesList: any[]=[];
  permenentDistrictList : any [] =[];
  flag: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private savingsBankJointAccountService: SavingsBankJointAccountService, private savingBankApplicationService: SavingBankApplicationService, private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, private savingsBankCommunicationService: SavingsBankCommunicationService, private statesService: StatesService, private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe, private membershipServiceService: MembershipServiceService) {
    this.communicationForm = this.formBuilder.group({
      states:['',Validators.required],
      districts: ['', [Validators.required]],
      mandal: ['', [Validators.required]],
      village: ['', [Validators.required]],
      regesteredAddressOne: ['',],
      regesteredAddressTwo: ['',],
      pinCode:['', [Validators.pattern(applicationConstants.PINCODE_PATTERN), Validators.compose([Validators.required])]],
      permenentState: ['', [Validators.required]],
      permenentDistricts: ['', [Validators.required]],
      permenentMandal: ['', [Validators.required]],
      permenentVillage: ['', [Validators.required]],
      permenentAddressOne: ['', ],
      permenentAddressTwo: ['', ],
      permenentPinCode: ['', [Validators.pattern(applicationConstants.PINCODE_PATTERN), Validators.compose([Validators.required])]],
      checked: [''],
    })
  }

  // @jyothi.naidana
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined || params['admissionNo']  != undefined ) {
        if(params['id'] != undefined ){
          let id = this.encryptDecryptService.decrypt(params['id']);
          this.sbAccId = Number(id);
          this.getSbAccountDetailsById(this.sbAccId);
        }
        if(params['admissionNo']  != undefined){
          this.admissionNumber = this.encryptDecryptService.decrypt(params['admissionNo']);
            this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
            this.getMemberGroupDetailsByGroupAdmissionNumber(this.admissionNumber);
            this.getMemberInstitutionDetailsByAdmissionNumber(this.admissionNumber);
        }
        this.isEdit = true;
        if (this.savingBankApplicationModel != null && this.savingBankApplicationModel != null)
          this.flagForLabelName = true;
      } else {
        this.isEdit = false;
        this.flagForLabelName = false;
      }
      
    });
    this.communicationForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.communicationForm.valid) {
        this.save();
      }
    });
    this.getStatesList();
   
  }

  /**
   *@author jyothi.naidana
   * @implements update data to parent component
   */
  updateData() {
    if(this.statesList != null && this.statesList != undefined && this.statesList.length > 0){
      let permenentStateName = this.statesList.find((data: any) => null != data && this.savingsBankCommunicationModel.stateId != null && data.value == this.savingsBankCommunicationModel.permntStateId);
      if (permenentStateName != null && undefined != permenentStateName){
      this.savingsBankCommunicationModel.permenentStateName = permenentStateName.label;
      }
    }
    this.savingsBankCommunicationModel.sbAccId = this.sbAccId;
    this.savingsBankCommunicationModel.admissionNumber = this.admissionNumber; 
    this.savingBankApplicationService.changeData({
      formValid: !this.communicationForm.valid ? true : false,
      data: this.savingsBankCommunicationModel,
      isDisable: (!this.communicationForm.valid),
      // isDisable:false,
      stepperIndex: 2,
    });
  }
  // @jyothi.naidana
  // update model data to main stepper component 
  save() {
    this.updateData();
  }
  
  /**
   * @implements validation as per is same  permanentAddress and temparory address
   * @param flag 
   * @implements jyothi.naidana
   */
  sameAsPerAddr(flag :any) {
    if (this.savingsBankCommunicationModel.isSameAddress) {
      this.communicationForm.get('permenentState').disable();
      this.communicationForm.get('permenentDistricts').disable();
      this.communicationForm.get('permenentMandal').disable();
      
      this.communicationForm.get('permenentVillage').disable();
      this.communicationForm.get('permenentAddressOne').disable();
      this.communicationForm.get('permenentAddressTwo').disable();
      this.communicationForm.get('permenentPinCode').disable();
      
      if(this.savingsBankCommunicationModel != null && this.savingsBankCommunicationModel != undefined){
        if(this.savingsBankCommunicationModel.address1 != null && this.savingsBankCommunicationModel.address1 != undefined)
          this.savingsBankCommunicationModel.permntAddress1 = this.savingsBankCommunicationModel.address1;
    
          if (this.savingsBankCommunicationModel.stateId != null && this.savingsBankCommunicationModel.stateId != undefined) {
            this.savingsBankCommunicationModel.permntStateId = this.savingsBankCommunicationModel.stateId;
            this.getPermenentDistrictByPermenetStateId(this.savingsBankCommunicationModel.stateId);
          }
          if (this.savingsBankCommunicationModel.districtId != null && this.savingsBankCommunicationModel.districtId != undefined) {
            this.savingsBankCommunicationModel.permntDistrictId = this.savingsBankCommunicationModel.districtId;
            this.getPermenentMandalsByByPermenentDistrctId(this.savingsBankCommunicationModel.districtId);
          }
          if (this.savingsBankCommunicationModel.subDistrictId != null && this.savingsBankCommunicationModel.subDistrictId != undefined) {
            this.savingsBankCommunicationModel.permntSubDistrictId = this.savingsBankCommunicationModel.subDistrictId;
            this.getPermenentVilagesByPermenetMandalId(this.savingsBankCommunicationModel.subDistrictId);
          }
          if(this.savingsBankCommunicationModel.villageId != null && this.savingsBankCommunicationModel.villageId != undefined){
            this.savingsBankCommunicationModel.permntVillageId = this.savingsBankCommunicationModel.villageId;
          }
          if (this.savingsBankCommunicationModel.pincode!= null && this.savingsBankCommunicationModel.pincode != undefined) {
            this.savingsBankCommunicationModel.permntPincode = this.savingsBankCommunicationModel.pincode;
          }
      }
    }
    else {
      this.communicationForm.get('permenentState').enable();
      this.communicationForm.get('permenentDistricts').enable();
      this.communicationForm.get('permenentMandal').enable();
      
      this.communicationForm.get('permenentVillage').enable();
      this.communicationForm.get('permenentAddressOne').enable();
      this.communicationForm.get('permenentAddressTwo').enable();
      this.communicationForm.get('permenentPinCode').enable();
      

      if(flag){
        this.savingsBankCommunicationModel.permntStateId = null;
        this.savingsBankCommunicationModel.permntDistrictId = null;
        this.savingsBankCommunicationModel.permntSubDistrictId = null;
        this.savingsBankCommunicationModel.permntVillageId = null;
        this.savingsBankCommunicationModel.permntAddress1 = null;
        this.savingsBankCommunicationModel.permntPincode = null;
        this.permenentDistrictList = [];
        this.permenentMandalsList = [];
        this.permenentVillagesList = [];
      }
      
    }
  }
 
  //member module data by member admission Number
  getMemberDetailsByAdmissionNumber(admissionNumber: any) {
    this.membershipServiceService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.responseModel.data[0].memberShipCommunicationDetailsDTOList;
          if (this.responseModel.data[0].memberShipCommunicationDetailsDTOList.length > 0 && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != undefined) {
            this.savingsBankCommunicationModel = this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0];
          }
          if(this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined){
            this.savingsBankCommunicationModel.admissionNumber  =  this.responseModel.data[0].admissionNumber;
          }
          if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined){
            this.savingsBankCommunicationModel.memberTypeName = this.responseModel.data[0].memberTypeName;
          }
          if(this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined){
            this.savingsBankCommunicationModel.memberType = this.responseModel.data[0].memberTypeId;
          }
          if(this.responseModel.data[0].memberShipCommunicationDetailsDTOList.length > 0 && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != undefined){
            this.loadMasterDataListMemberModule(this.savingsBankCommunicationModel);
          }
          this.savingsBankCommunicationModel.id = null;
          this.sameAsPerAddr(this.flag);
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

  //member module data by member admissionNumber
  getMemberGroupDetailsByGroupAdmissionNumber(admissionNumber: any) {
    this.membershipServiceService.getMemberGroupByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.responseModel.data[0].groupCommunicationList;
          if (this.responseModel.data[0].groupCommunicationList.length > 0 && this.responseModel.data[0].groupCommunicationList[0] != null && this.responseModel.data[0].groupCommunicationList[0] != undefined) {
            this.savingsBankCommunicationModel = this.responseModel.data[0].groupCommunicationList[0];
            this.loadMasterDataListMemberModule(this.savingsBankCommunicationModel);
          }
          if(this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined){
            this.savingsBankCommunicationModel.admissionNumber  =  this.responseModel.data[0].admissionNumber;
          }
          if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined){
            this.savingsBankCommunicationModel.memberTypeName = this.responseModel.data[0].memberTypeName;
          }
          if(this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined){
            this.savingsBankCommunicationModel.memberType = this.responseModel.data[0].memberTypeId;
          }
          
          this.savingsBankCommunicationModel.id = null;
          this.sameAsPerAddr(this.flag);
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

  //member module data by member admission Number
  getMemberInstitutionDetailsByAdmissionNumber(admissionNumber: any) {
    this.membershipServiceService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if ( this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.responseModel.data[0].institutionCommunicationDTOList;
          if (this.responseModel.data[0].institutionCommunicationDTOList != null && this.responseModel.data[0].institutionCommunicationDTOList != undefined && this.responseModel.data[0].institutionCommunicationDTOList.length > 0 && this.responseModel.data[0].institutionCommunicationDTOList.length > 0 && this.responseModel.data[0].institutionCommunicationDTOList[0] != null && this.responseModel.data[0].institutionCommunicationDTOList[0] != undefined) {
            this.savingsBankCommunicationModel = this.responseModel.data[0].institutionCommunicationDTOList[0];
            this.loadMasterDataListMemberModule(this.savingsBankCommunicationModel);
          }
          if(this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined){
            this.savingsBankCommunicationModel.admissionNumber  =  this.responseModel.data[0].admissionNumber;
          }
          if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined){
            this.savingsBankCommunicationModel.memberTypeName = this.responseModel.data[0].memberTypeName;
          }
          if(this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined){
            this.savingsBankCommunicationModel.memberType = this.responseModel.data[0].memberTypeId;
          }
          this.savingsBankCommunicationModel.id = null;
          this.sameAsPerAddr(this.flag);
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

  //get all states list from common master
  // @jyothi.naidana
  getStatesList() {
    this.savingsBankCommunicationService.getstatesList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.statesList = this.responseModel.data;
            this.statesList = this.responseModel.data.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
            let relationshiptype = this.statesList.find((data: any) => null != data && this.savingsBankCommunicationModel.stateId != null && data.value == this.savingsBankCommunicationModel.stateId);
            if (relationshiptype != null && undefined != relationshiptype)
              this.savingsBankCommunicationModel.stateName = relationshiptype.label;
            
            this.sameAsPerAddr(this.flag);
          }
        }
      }
      // this.getAllDistrcts();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
  
  //get districts by state id
  // @jyothi.naidana
  getDistrictByStateId(id: any) {
    this.savingsBankCommunicationService.getDistrictsByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.districtsList = this.responseModel.data;
          this.districtsList = this.districtsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
            return { label: relationType.name, value: relationType.id };
          });
          let district = this.districtsList.find((data: any) => null != data && this.savingsBankCommunicationModel.districtId != null && data.value == this.savingsBankCommunicationModel.districtId);
          if (district != null && undefined != district && district.label != null && district.label != undefined) {
            this.savingsBankCommunicationModel.stateName = district.label;
          }
          this.sameAsPerAddr(this.flag);
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

  getPermenentDistrictByPermenetStateId(id: any) {
    this.savingsBankCommunicationService.getDistrictsByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined ) {
          this.permenentDistrictList = this.responseModel.data;
          this.permenentDistrictList = this.permenentDistrictList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
            return { label: relationType.name, value: relationType.id };
          });
          let permenentdistrictName = this.permenentDistrictList.find((data: any) => null != data && this.savingsBankCommunicationModel.permntDistrictId != null && data.value == this.savingsBankCommunicationModel.permntDistrictId);
          if (permenentdistrictName != null && undefined != permenentdistrictName) {
            this.savingsBankCommunicationModel.permenentDistrictName = permenentdistrictName.label;
          }
        }
      }
      else{
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
  //get all districts 
  // @jyothi.naidana
  getAllDistrcts() {
    this.savingsBankCommunicationService.getDistrictsList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.districtsList = this.responseModel.data;
            this.districtsList = this.districtsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
          }
          let district = this.districtsList.find((data: any) => null != data && this.savingsBankCommunicationModel.districtId  != null && data.value == this.savingsBankCommunicationModel.districtId);
            if (district != null && undefined != district && district.label != null && district.label != undefined)
              this.savingsBankCommunicationModel.stateName = district.label;
        }
      }
      // this.getAllMandal();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
  //get mandal by district id
  // @jyothi.naidana
  getMandalsByByDistrctId(id: any) {
    this.savingsBankCommunicationService.getMandalsByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 &&  this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
        this.mandalsList = this.responseModel.data;
        this.mandalsList = this.mandalsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let subDistrict = this.mandalsList.find((data: any) => null != data && this.savingsBankCommunicationModel.permntSubDistrictId  != null && data.value == this.savingsBankCommunicationModel.subDistrictId);
          if (subDistrict != null && undefined != subDistrict)
              this.savingsBankCommunicationModel.subDistrictName = subDistrict.label;
            this.sameAsPerAddr(this.flag);
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

  //get mandal by district id
  // @jyothi.naidana
  getPermenentMandalsByByPermenentDistrctId(id: any) {
    this.savingsBankCommunicationService.getMandalsByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
        this.permenentMandalsList = this.responseModel.data;
        this.permenentMandalsList = this.permenentMandalsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
          let permenentdistrictName = this.permenentMandalsList.find((data: any) => null != data && this.savingsBankCommunicationModel.permntSubDistrictId  != null && data.value == this.savingsBankCommunicationModel.permntSubDistrictId);
          if (permenentdistrictName != null && undefined != permenentdistrictName)
              this.savingsBankCommunicationModel.permenentSubDistrictName = permenentdistrictName.label;

      }
    }
    else{
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
  //get all mandals 
  // @jyothi.naidana
  getAllMandal() {
    this.savingsBankCommunicationService.getMandalsList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.mandalsList = this.responseModel.data;
            this.mandalsList = this.mandalsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
          }
          let subDistrict = this.mandalsList.find((data: any) => null != data && this.savingsBankCommunicationModel.permntSubDistrictId  != null && data.value == this.savingsBankCommunicationModel.subDistrictId);
          if (subDistrict != null && undefined != subDistrict)
              this.savingsBankCommunicationModel.subDistrictName = subDistrict.label;
          let permenentdistrictName = this.mandalsList.find((data: any) => null != data && this.savingsBankCommunicationModel.permntSubDistrictId  != null && data.value == this.savingsBankCommunicationModel.permntSubDistrictId);
          if (permenentdistrictName != null && undefined != permenentdistrictName)
              this.savingsBankCommunicationModel.permenentSubDistrictName = permenentdistrictName.label;
        }
      }
      this.getAllVillages();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
  //get all vilages by mandal id 
  // @jyothi.naidana
  getAllVilagesByMandalId(id: any) {
    this.savingsBankCommunicationService.getvillagesByMandalId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 &&  this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.villageList = this.responseModel.data;
            this.villageList = this.villageList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
          let subDistrict = this.villageList.find((data: any) => null != data && this.savingsBankCommunicationModel.permntVillageId != null &&  data.value == this.savingsBankCommunicationModel.villageId);
            if (subDistrict != null && undefined != subDistrict)
              this.savingsBankCommunicationModel.villageName = subDistrict.label;

            this.sameAsPerAddr(this.flag);
          }
        }
        else{
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

  //get all vilages by mandal id 
  // @jyothi.naidana
  getPermenentVilagesByPermenetMandalId(id: any) {
    this.savingsBankCommunicationService.getvillagesByMandalId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 ) {
            this.permenentVillagesList = this.responseModel.data;
            this.permenentVillagesList = this.permenentVillagesList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
          let permenentdistrictName = this.permenentVillagesList.find((data: any) => null != data && this.savingsBankCommunicationModel.permntVillageId != null && data.value == this.savingsBankCommunicationModel.permntVillageId);
            if (permenentdistrictName != null && undefined != permenentdistrictName)
              this.savingsBankCommunicationModel.permenentVillageName = permenentdistrictName.label;
          }
        }
        else{
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
  //get all vilages 
  // @jyothi.naidana
  getAllVillages() {
    this.savingsBankCommunicationService.getVillageList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 &&  this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.villageList = this.responseModel.data;
            this.villageList = this.villageList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
          }
        let subDistrict = this.villageList.find((data: any) => null != data && this.savingsBankCommunicationModel.permntVillageId != null &&  data.value == this.savingsBankCommunicationModel.villageId);
          if (subDistrict != null && undefined != subDistrict)
            this.savingsBankCommunicationModel.subDistrictName = subDistrict.label;
        let permenentdistrictName = this.villageList.find((data: any) => null != data && this.savingsBankCommunicationModel.permntVillageId != null && data.value == this.savingsBankCommunicationModel.permntVillageId);
          if (permenentdistrictName != null && undefined != permenentdistrictName)
            this.savingsBankCommunicationModel.permenentVillageName = permenentdistrictName.label;
      }
      else{
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
  //get account details by account id 
  // @jyothi.naidana
  getSbAccountDetailsById(id: any) {
    this.savingBankApplicationService.getSbApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.savingBankApplicationModel = this.responseModel.data[0];
              if(this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined){
                this.savingsBankCommunicationModel.admissionNumber  =  this.responseModel.data[0].admissionNumber;
                this.admissionNumber  =  this.responseModel.data[0].admissionNumber;
              }
              if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined){
                this.savingsBankCommunicationModel.memberTypeName = this.responseModel.data[0].memberTypeName;
              }
              if(this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined){
                this.savingsBankCommunicationModel.memberType = this.responseModel.data[0].memberTypeId;
              }
              if(this.responseModel.data[0].id != null && this.responseModel.data[0].id != undefined){
                this.sbAccId = this.responseModel.data[0].id;
              }
              if (this.savingBankApplicationModel.sbCommunicationDTO != null && this.savingBankApplicationModel.sbCommunicationDTO != undefined) {
                this.savingsBankCommunicationModel = this.savingBankApplicationModel.sbCommunicationDTO;
              if(this.savingsBankCommunicationModel.isSameAddress != null && this.savingsBankCommunicationModel.isSameAddress != undefined){
                 this.sameAsPerAddr(this.flag);
                 this.loadMasterAddressDetails(this.savingsBankCommunicationModel);
              }
              if(this.savingBankApplicationModel.sbCommunicationDTO != null && this.savingBankApplicationModel.sbCommunicationDTO != undefined){
                  this.loadMasterAddressDetails(this.savingBankApplicationModel.sbCommunicationDTO);
              }
                this.updateData();
              }
              else{
                if(this.admissionNumber != null && this.admissionNumber != undefined){
                  this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
                  this.getMemberGroupDetailsByGroupAdmissionNumber(this.admissionNumber);
                  this.getMemberInstitutionDetailsByAdmissionNumber(this.admissionNumber);
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
  //on change state  load district details
  // @jyothi.naidana
  onChangeStates(stateId: any) {
    if(this.savingsBankCommunicationModel.stateId != null && this.savingsBankCommunicationModel.stateId != undefined && this.statesList != null && this.statesList != undefined && this.statesList.length > 0){
      let relationshiptype = this.statesList.find((data: any) => null != data && this.savingsBankCommunicationModel.stateId != null && data.value == this.savingsBankCommunicationModel.stateId);
      if (relationshiptype != null && undefined != relationshiptype)
          this.savingsBankCommunicationModel.stateName = relationshiptype.label;
    }
    
    this.getDistrictByStateId(stateId);
    if (this.savingsBankCommunicationModel != null && this.savingsBankCommunicationModel != undefined && this.savingsBankCommunicationModel.isSameAddress != null && this.savingsBankCommunicationModel.isSameAddress != undefined &&  this.savingsBankCommunicationModel.isSameAddress) {
      this.savingsBankCommunicationModel.permntStateId = stateId;
      this.onChangePermenentDistricts(stateId);
      this.savingsBankCommunicationModel.permntDistrictId = null;
      this.savingsBankCommunicationModel.permntSubDistrictId = null;
      this.savingsBankCommunicationModel.permntVillageId = null;
      this.savingsBankCommunicationModel.permntPincode = null;
      this.savingsBankCommunicationModel.permntAddress1 = null;
      this.permenentDistrictList = [];
      this.permenentMandalsList = [];
      this.permenentMandalsList = [];
    }
    this.savingsBankCommunicationModel.districtId = null;
    
    this.savingsBankCommunicationModel.subDistrictId = null;
   
    this.savingsBankCommunicationModel.villageId = null;
    
    this.savingsBankCommunicationModel.pincode = null;
    this.savingsBankCommunicationModel.address1 = null;
    this.districtsList = [];
    this.mandalsList = [];
    this.villageList = [];
    
  }

  onChangeDistricts(districtId: any) {
    if(this.savingsBankCommunicationModel.districtId != null && this.savingsBankCommunicationModel.districtId != undefined && this.districtsList != null && this.districtsList != undefined && this.districtsList.length > 0){
      let relationshiptype = this.districtsList.find((data: any) => null != data && this.savingsBankCommunicationModel.districtId != null && data.value == this.savingsBankCommunicationModel.districtId);
      if (relationshiptype != null && undefined != relationshiptype)
          this.savingsBankCommunicationModel.districtName = relationshiptype.label;
    }
    this.getMandalsByByDistrctId(districtId);
    if (this.savingsBankCommunicationModel != null && this.savingsBankCommunicationModel != undefined && this.savingsBankCommunicationModel.isSameAddress != null && this.savingsBankCommunicationModel.isSameAddress != undefined &&  this.savingsBankCommunicationModel.isSameAddress) {
      this.onChangePermenentMandals(districtId);
      this.savingsBankCommunicationModel.permntDistrictId = districtId;
    }
    this.savingsBankCommunicationModel.subDistrictId = null;
    
    this.savingsBankCommunicationModel.villageId = null;
    
    
    this.mandalsList = [];
    this.villageList = [];
  }

  /**
   *@author jyothi.naidana
   * @implements on change mandal 
   * @param madalId
   */
  onChangeMandals(mandalId: any) {
    if(this.savingsBankCommunicationModel.subDistrictId != null && this.savingsBankCommunicationModel.subDistrictId != undefined && this.mandalsList != null && this.mandalsList != undefined && this.mandalsList.length > 0){
      let relationshiptype = this.mandalsList.find((data: any) => null != data && this.savingsBankCommunicationModel.subDistrictId != null && data.value == this.savingsBankCommunicationModel.subDistrictId);
      if (relationshiptype != null && undefined != relationshiptype)
          this.savingsBankCommunicationModel.subDistrictName = relationshiptype.label;
    }
    this.getAllVilagesByMandalId(mandalId);
    if (this.savingsBankCommunicationModel != null && this.savingsBankCommunicationModel != undefined && this.savingsBankCommunicationModel.isSameAddress != null && this.savingsBankCommunicationModel.isSameAddress != undefined &&  this.savingsBankCommunicationModel.isSameAddress) {
      this.savingsBankCommunicationModel.permntSubDistrictId = this.savingsBankCommunicationModel.subDistrictId;
      this.onChangePermenentVillagesByPermenentMandals(mandalId);
     
    }
    this.savingsBankCommunicationModel.villageId = null;
    this.savingsBankCommunicationModel.villageName = null;

    this.villageList = [];
  }

  onChangePermenentDistricts(stateId : any){
    this.savingsBankCommunicationModel.permntDistrictId = null;
    this.savingsBankCommunicationModel.permenentDistrictName = null;
    this.savingsBankCommunicationModel.permntSubDistrictId = null;
    this.savingsBankCommunicationModel.permenentSubDistrictName = null;
    this.savingsBankCommunicationModel.permntVillageId = null;
    this.savingsBankCommunicationModel.permenentVillageName = null;
    this.savingsBankCommunicationModel.permntPincode = null;
    this.savingsBankCommunicationModel.permntAddress1 = null;
    this.permenentDistrictList = [];
    this.permenentMandalsList = [];
    this.permenentVillagesList = [];
      this.getPermenentDistrictByPermenetStateId(stateId);

  }

  onChangePermenentMandals(districtId : any){
    this.savingsBankCommunicationModel.permntSubDistrictId = null;
    
    this.savingsBankCommunicationModel.permntVillageId = null;
    
    this.savingsBankCommunicationModel.permntPincode = null;
    this.savingsBankCommunicationModel.permntAddress1 = null;
    this.permenentMandalsList = [];
    this.permenentVillagesList = [];
    this.getPermenentMandalsByByPermenentDistrctId(districtId);
    
  }

  onChangePermenentVillagesByPermenentMandals(mandalId : any){
    this.savingsBankCommunicationModel.permntPincode = null;
    this.savingsBankCommunicationModel.permntAddress1 = null;
    this.permenentVillagesList = [];
    this.getPermenentVilagesByPermenetMandalId(mandalId);
  }
  
  loadMasterAddressDetails(obj: any) {
    this.getAllDistrcts();
    this.getAllMandal();
    this.getAllVillages();
    if(obj != null && obj != undefined){
      if (obj.permntStateId != null && obj.permntStateId != undefined) {
        this.getPermenentDistrictByPermenetStateId(obj.permntStateId);
      }
      if (obj.permntDistrictId != null && obj.permntDistrictId != undefined) {
        this.getPermenentMandalsByByPermenentDistrctId(obj.permntDistrictId);
      }
      if (obj.permntSubDistrictId != null && obj.permntSubDistrictId != undefined) {
        this.getPermenentVilagesByPermenetMandalId(obj.permntSubDistrictId);
      }
    }
  }

  /**
   *@author jyothi.naidana
   * @implements set member communication detailsto sb communication details  
   * @param obj membercommunicationmodel
   */
  loadMasterDataListMemberModule(obj: any) {
    this.getAllDistrcts();
    this.getAllMandal();
    this.getAllVillages();
    if (obj != null && obj != undefined) {
      if (obj.permenentStateId != null && obj.permenentStateId != undefined) {
        this.savingsBankCommunicationModel.permntStateId = obj.permenentStateId;
        this.getPermenentDistrictByPermenetStateId(obj.permenentStateId);
      }
      if (obj.permenentDistrictId != null && obj.permenentDistrictId != undefined) {
        this.savingsBankCommunicationModel.permntDistrictId = obj.permenentDistrictId;
        this.getPermenentMandalsByByPermenentDistrctId(obj.permenentDistrictId);
      }
      if (obj.permenentSubDistrictId != null && obj.permenentSubDistrictId != undefined) {
        this.savingsBankCommunicationModel.permntSubDistrictId = obj.permenentSubDistrictId;
        this.getPermenentVilagesByPermenetMandalId(obj.permenentSubDistrictId);
      }
      if (obj.permenentVillageId != null && obj.permenentVillageId != undefined) {
        this.savingsBankCommunicationModel.permntVillageId = obj.permenentVillageId;
      }
      if (obj.permenentPinCode != null && obj.permenentPinCode != undefined) {
        this.savingsBankCommunicationModel.permntPincode = obj.permenentPinCode;
      }
      if (obj.pinCode != null && obj.pinCode != undefined) {
        this.savingsBankCommunicationModel.pincode = obj.pinCode;
      }
      if (obj.permenentAddress1 != null) {
        this.savingsBankCommunicationModel.permntAddress1 = obj.permenentAddress1;
      }
    }
  }

  appendPinCodeToPermenent() {
    if (this.savingsBankCommunicationModel != null && this.savingsBankCommunicationModel != undefined && this.savingsBankCommunicationModel.isSameAddress != null && this.savingsBankCommunicationModel.isSameAddress != undefined && this.savingsBankCommunicationModel.isSameAddress) {
      if(this.savingsBankCommunicationModel.pincode != null && this.savingsBankCommunicationModel.pincode != undefined){
        this.savingsBankCommunicationModel.permntPincode = this.savingsBankCommunicationModel.pincode;
      }
      if(this.savingsBankCommunicationModel.address1 != null && this.savingsBankCommunicationModel.address1 != undefined){
        this.savingsBankCommunicationModel.permntAddress1 = this.savingsBankCommunicationModel.address1;
      }
    }
  }
/**
   *@author jyothi.naidana
   * @implements on change Villages 
   * @param villageId
   */
  onChangeVillageId(villageId:any){
    if(this.savingsBankCommunicationModel.villageId != null && this.savingsBankCommunicationModel.villageId != undefined && this.villageList != null && this.villageList != undefined && this.villageList.length > 0){
      let relationshiptype = this.villageList.find((data: any) => null != data && this.savingsBankCommunicationModel.villageId != null && data.value == this.savingsBankCommunicationModel.villageId);
      if (relationshiptype != null && undefined != relationshiptype)
          this.savingsBankCommunicationModel.villageName = relationshiptype.label;
    }
    if (this.savingsBankCommunicationModel != null && this.savingsBankCommunicationModel != undefined && this.savingsBankCommunicationModel.isSameAddress != null && this.savingsBankCommunicationModel.isSameAddress != undefined &&  this.savingsBankCommunicationModel.isSameAddress) {
      this.savingsBankCommunicationModel.permntVillageId = villageId;
      if(this.savingsBankCommunicationModel.permntSubDistrictId != null && this.savingsBankCommunicationModel.permntSubDistrictId != undefined){
        this.getPermenentVilagesByPermenetMandalId(this.savingsBankCommunicationModel.permntSubDistrictId);
      }
    }
  }
}
