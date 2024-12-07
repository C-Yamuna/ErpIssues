import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SaoCommunication } from './shared/sao-communication.model';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SaoCommunicationService } from './shared/sao-communication.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SaoLoanApplicationService } from '../../../shared/sao-loans/sao-loan-application.service';
import { SaoLoanApplication } from '../../shared/sao-loan-application.model';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';
import { GroupPromotersModel, IndividualMemberDetailsModel, InstitutionPromoterDetailsModel, MemInstitutionModel, MemberShipGroupDetailsModel } from '../membership-basic-details/shared/membership-basic-details.model';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-sao-communication',
  templateUrl: './sao-communication.component.html',
  styleUrls: ['./sao-communication.component.css']
})
export class SaoCommunicationComponent {
  communicationForm: any;
  gender: any[] | undefined;
  admissionNumber: any;
  statesList: any[] = [];
  districtsList: any[] = [];
  mandalsList: any[] = [];
  villageList: any[] = [];
  msgs: any[] = [];
  savedId: any;
  isEdit: any;
  flagForLabelName: any;
  responseModel!: Responsemodel;
  checked: any;
  sameAsPermanentAddress: boolean = false;
  saoCommunicationModel: SaoCommunication = new SaoCommunication;
  saoLoanApplicatonModel: SaoLoanApplication = new SaoLoanApplication();
  individualMemberDetailsModel: IndividualMemberDetailsModel = new IndividualMemberDetailsModel();
  institutionPromoterDetailsModel: InstitutionPromoterDetailsModel = new InstitutionPromoterDetailsModel();
  groupPromotersModel: GroupPromotersModel = new GroupPromotersModel();
  memberShipGroupDetailsModel: MemberShipGroupDetailsModel = new MemberShipGroupDetailsModel();
  memInstitutionModel: MemInstitutionModel = new MemInstitutionModel();
  loanId: any;
  accountNumber: any;
  requstedAmount: any;
  memberTypeId: any;
  flag: boolean = false;
  permenentStatesList: any[]=[];
  permenentMandalsList: any[]=[];
  permenentVillagesList: any[]=[];
  permenentDistrictList : any [] =[];
  constructor(private router: Router, private formBuilder: FormBuilder, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private saoCommunicationService: SaoCommunicationService, private saoLoanApplicationService: SaoLoanApplicationService,
    private membershipBasicDetailsService: MembershipBasicDetailsService, private datePipe: DatePipe, private commonComponent: CommonComponent
  ) {
    this.communicationForm = this.formBuilder.group({
      stateName: ['', [Validators.required]],
      districtName: ['', [Validators.required]],
      subDistrictName: ['', [Validators.required]],
      villageName: ['', [Validators.required]],
      pinCode:  new FormControl('',[Validators.pattern(applicationConstants.PINCODE_PATTERN),Validators.required]),
      address1: [''],
      //address2: [''],
      isSameAddress:[''],
      permenentStateName: ['', [Validators.required]],
      permenentDistrictName:['', [Validators.required]],
      permenentSubDistrictName:['', [Validators.required]],
      permenentVillageName:['', [Validators.required]],
      permenentAddress1: [''],
      permenentPinCode: new FormControl('',[Validators.pattern(applicationConstants.PINCODE_PATTERN),Validators.required]),
      //permenentAddress2: [''],
    })
  }
  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined || params['admissionNumber'] != undefined) {
        
        if (params['id'] != undefined) {
          let queryParams = this.encryptDecryptService.decrypt(params['id']);
          let qParams = queryParams;
          this.savedId = qParams;
         // this.getCommunicationDetailsByLoanApplicationId(this.savedId);
          this.getSaoLoanApplicationDetailsById(this.savedId);
        }
     
        if (params['admissionNumber'] != undefined) {
          this.admissionNumber = this.encryptDecryptService.decrypt(params['admissionNumber']);
          this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
          this.getGroupDetailsByAdmissionNumber(this.admissionNumber);
           this.getInstitutionByAdmissionNumber(this.admissionNumber);
        }
        this.isEdit = true;
      
        if (this.saoCommunicationModel != null && this.saoCommunicationModel != null)
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
  updateData() {
    if (this.statesList != null && this.statesList != undefined && this.statesList.length > 0) {
      let permanentState = this.statesList.find((data: any) => null != data && this.saoCommunicationModel.stateId != null && data.value == this.saoCommunicationModel.permenentStateId);
      if (permanentState != null && undefined != permanentState) {
        this.saoCommunicationModel.permenentStateName = permanentState.label;
      }
    }
    this.saoCommunicationModel.saoLoanApplicationId = this.loanId;
    this.saoCommunicationModel.admissionNumber = this.admissionNumber;
    this.saoLoanApplicationService.changeData({
      formValid: !this.communicationForm.valid ? true : false,
      data: this.saoCommunicationModel,
      isDisable: (!this.communicationForm.valid),
      // isDisable:false,
      stepperIndex: 1,
    });
  }
  save() {
    this.updateData();
  }
  sameAsPerAddr(flag :any) {
    if (this.saoCommunicationModel.isSameAddress) {
      this.communicationForm.get('permenentStateName').disable();
      this.communicationForm.get('permenentDistrictName').disable();
      this.communicationForm.get('permenentSubDistrictName').disable();
      this.communicationForm.get('permenentVillageName').disable();
      this.communicationForm.get('permenentAddress1').disable();
      this.communicationForm.get('permenentPinCode').disable();
      
      if(this.saoCommunicationModel != null && this.saoCommunicationModel != undefined){
    
          if (this.saoCommunicationModel.stateId != null && this.saoCommunicationModel.stateId != undefined) {
            this.saoCommunicationModel.permenentStateId = this.saoCommunicationModel.stateId;
            this.getPermenentDistrictByPermenetStateId(this.saoCommunicationModel.stateId);
          }
          if (this.saoCommunicationModel.districtId != null && this.saoCommunicationModel.districtId != undefined) {
            this.saoCommunicationModel.permenentDistrictId = this.saoCommunicationModel.districtId;
            this.getPermenentMandalsByByPermenentDistrctId(this.saoCommunicationModel.districtId);
          }
          if (this.saoCommunicationModel.subDistrictId != null && this.saoCommunicationModel.subDistrictId != undefined) {
            this.saoCommunicationModel.permenentSubDistrictId = this.saoCommunicationModel.subDistrictId;
            this.getPermenentVilagesByPermenetMandalId(this.saoCommunicationModel.subDistrictId);
          }
          if(this.saoCommunicationModel.villageId != null && this.saoCommunicationModel.villageId != undefined){
            this.saoCommunicationModel.permenentVillageId = this.saoCommunicationModel.villageId;
          }
          if (this.saoCommunicationModel.pinCode!= null && this.saoCommunicationModel.pinCode != undefined) {
            this.saoCommunicationModel.permenentPinCode = this.saoCommunicationModel.pinCode;
          }
          if (this.saoCommunicationModel.address1 != null && this.saoCommunicationModel.address1 != undefined)
            this.saoCommunicationModel.permenentAddress1 = this.saoCommunicationModel.address1;
      }
    }
    else {
      this.communicationForm.get('permenentStateName').enable();
      this.communicationForm.get('permenentDistrictName').enable();
      this.communicationForm.get('permenentSubDistrictName').enable();
      this.communicationForm.get('permenentVillageName').enable();
      this.communicationForm.get('permenentAddress1').enable();
      this.communicationForm.get('permenentPinCode').enable();
      if(flag){
        this.saoCommunicationModel.permenentStateId = null;
        this.saoCommunicationModel.permenentDistrictId = null;
        this.saoCommunicationModel.permenentSubDistrictId = null;
        this.saoCommunicationModel.permenentVillageId = null;
        this.saoCommunicationModel.permenentPinCode = null;
        this.saoCommunicationModel.permenentAddress1 = null;

        this.permenentDistrictList = [];
        this.permenentMandalsList = [];
        this.permenentVillagesList = [];
      }
    }
  }

  onChangeState(stateId: any) {
    this.getDistrictsByStateId(stateId);
    if (this.saoCommunicationModel != null && this.saoCommunicationModel != undefined && this.saoCommunicationModel.isSameAddress != null && this.saoCommunicationModel.isSameAddress != undefined && this.saoCommunicationModel.isSameAddress) {
      this.saoCommunicationModel.permenentStateId = stateId;
      this.onChangePermanentState(stateId);
    }
  }

  onChangeDistrict(districtId: any) {
    this.getMandalsByByDistrctId(districtId);
    if (this.saoCommunicationModel != null && this.saoCommunicationModel != undefined && this.saoCommunicationModel.isSameAddress != null && this.saoCommunicationModel.isSameAddress != undefined && this.saoCommunicationModel.isSameAddress) {
      this.saoCommunicationModel.permenentDistrictId = districtId;
      this.onChangePermanentDistrict(districtId);
    }
    this.saoCommunicationModel.subDistrictId = null;
    this.saoCommunicationModel.subDistrictName = null;
    this.saoCommunicationModel.villageId = null;
    this.saoCommunicationModel.villageName = null;
    this.villageList = [];
  }

  onChangeMandal(mandalId: any) {
    this.getAllVilagesByMandalId(mandalId);
    if (this.saoCommunicationModel != null && this.saoCommunicationModel != undefined && this.saoCommunicationModel.isSameAddress != null && this.saoCommunicationModel.isSameAddress != undefined && this.saoCommunicationModel.isSameAddress) {
      this.saoCommunicationModel.permenentSubDistrictId = mandalId;
      this.onChangePermanentSubDistrict(mandalId);
    }
  }

  onChangeVillage(villageId: any) {
    if (this.saoCommunicationModel != null && this.saoCommunicationModel != undefined && this.saoCommunicationModel.isSameAddress != null && this.saoCommunicationModel.isSameAddress != undefined && this.saoCommunicationModel.isSameAddress) {
      this.saoCommunicationModel.permenentVillageId = villageId;
      let permanentVillage = this.villageList.find((data: any) => null != data && this.saoCommunicationModel.permenentVillageId != null && data.value == this.saoCommunicationModel.permenentVillageId);
      if (permanentVillage != null && undefined != permanentVillage)
        this.saoCommunicationModel.permenentVillageName = permanentVillage.label;
    }
    let village = this.villageList.find((data: any) => null != data && this.saoCommunicationModel.villageId != null && data.value == this.saoCommunicationModel.villageId);
    if (village != null && undefined != village)
      this.saoCommunicationModel.villageName = village.label;
  }

  onChangePermanentState(permanentStateId: any) {
    this.permenentDistrictList = [];
    this.permenentMandalsList = [];
    this.permenentVillagesList = [];
    this.saoCommunicationModel.permenentDistrictId = null;
    this.saoCommunicationModel.permenentSubDistrictId = null;
    this.saoCommunicationModel.permenentVillageId = null;
    this.saoCommunicationModel.permenentAddress1 = null;
    this.saoCommunicationModel.permenentPinCode = null ;
    this.getPermenentDistrictByPermenetStateId(permanentStateId);
  }

  onChangePermanentDistrict(permanentDistrictId: any) {
    this.permenentMandalsList = [];
    this.permenentVillagesList = [];
    this.saoCommunicationModel.permenentSubDistrictId = null;
    this.saoCommunicationModel.permenentSubDistrictName = null;
    this.saoCommunicationModel.permenentVillageId = null;
    this.saoCommunicationModel.permenentVillageName = null;
    this.saoCommunicationModel.permenentPinCode = null;
    this.saoCommunicationModel.permenentAddress1 = null;
    this.getPermenentMandalsByByPermenentDistrctId(permanentDistrictId);
  }

  onChangePermanentSubDistrict(permanentSubDistrictId: any) {
    this.getPermenentVilagesByPermenetMandalId(permanentSubDistrictId);
  }

  onChangePermanentVillage(permanentVillageId: any) {
    let permanentVillage = this.permenentVillagesList.find((data: any) => null != data && permanentVillageId != null && data.value == permanentVillageId);
    if (permanentVillage != null && undefined != permanentVillage) {
      this.saoCommunicationModel.permenentVillageName = permanentVillage.label;
    }
  }

  loadMasterDataListMemberModule(obj: any) {
    this.getAllDistrcts();
    this.getAllMandal();
    this.getAllVillages();
    if (obj != null && obj != undefined) {
      if (obj.permanentStateId != null && obj.permanentStateId != undefined) {
        this.saoCommunicationModel.permenentStateId = obj.permanentStateId;
        this.getPermenentDistrictByPermenetStateId(obj.permanentStateId);
      }
      if (obj.permanentDistrictId != null && obj.permanentDistrictId != undefined) {
        this.saoCommunicationModel.permenentDistrictId = obj.permanentDistrictId;
        this.getPermenentMandalsByByPermenentDistrctId(obj.permanentDistrictId);
      }
      if (obj.permanentSubDistrictId != null && obj.permanentSubDistrictId != undefined) {
        this.saoCommunicationModel.permenentSubDistrictId = obj.permanentSubDistrictId;
        this.getPermenentVilagesByPermenetMandalId(obj.permanentSubDistrictId);
      }
      if (obj.permanentVillageId != null && obj.permanentVillageId != undefined) {
        this.saoCommunicationModel.permenentVillageId = obj.permanentVillageId;
      }
      if (obj.permanentPinCode != null && obj.permanentPinCode != undefined) {
        this.saoCommunicationModel.permenentPinCode = obj.permanentPinCode;
      }
      if (obj.pincode != null && obj.pincode != undefined) {
        this.saoCommunicationModel.pinCode = obj.pincode;
      }
      if (obj.permanentAddress1 != null) {
        this.saoCommunicationModel.permenentAddress1 = obj.permanentAddress1;
      }
    }
  }

  loadMasterAddressDetails(obj: any) {
    this.getAllDistrcts();
    this.getAllMandal();
    this.getAllVillages();
    if(obj != null && obj != undefined){
      if (obj.permenentStateId != null && obj.permenentStateId != undefined) {
        this.getPermenentDistrictByPermenetStateId(obj.permenentStateId);
      }
      if (obj.permanentDistrictId != null && obj.permanentDistrictId != undefined) {
        this.getPermenentMandalsByByPermenentDistrctId(obj.permanentDistrictId);
      }
      if (obj.permanentSubDistrictId != null && obj.permanentSubDistrictId != undefined) {
        this.getPermenentVilagesByPermenetMandalId(obj.permanentSubDistrictId);
      }
      if (obj.permanentVillageId != null && obj.permanentVillageId != undefined)
        this.onChangePermanentVillage(obj.permanentVillageId);
    }
  }
 
  getMemberDetailsByAdmissionNumber(admisionNumber: any) {
    this.membershipBasicDetailsService.getMembershipBasicDetailsByAdmissionNumber(admisionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.individualMemberDetailsModel = this.responseModel.data[0];
          if (this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != undefined)
            this.saoCommunicationModel = this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0];

          if(this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined){
            this.saoCommunicationModel.admissionNumber  =  this.responseModel.data[0].admissionNumber;
          }
          if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined){
            this.saoLoanApplicatonModel.memberTypeName = this.responseModel.data[0].memberTypeName;
          }
          if(this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined){
            this.saoCommunicationModel.memberType = this.responseModel.data[0].memberTypeId;
          }
          if(this.responseModel.data[0].memberShipCommunicationDetailsDTOList.length > 0 && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != null && this.responseModel.data[0].memberShipCommunicationDetailsDTOList[0] != undefined){
            this.loadMasterDataListMemberModule(this.saoCommunicationModel);
          }
          this.saoCommunicationModel.id = null;
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

  getGroupDetailsByAdmissionNumber(admissionNumber: any) {
    this.membershipBasicDetailsService.getMemberShipGroupDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.memberShipGroupDetailsModel = this.responseModel.data[0];
            if (this.responseModel.data[0].groupCommunicationList[0] != null && this.responseModel.data[0].groupCommunicationList[0] != undefined){
              this.saoCommunicationModel = this.responseModel.data[0].groupCommunicationList[0];
              this.loadMasterDataListMemberModule(this.saoCommunicationModel);
            }
            if(this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined){
              this.saoCommunicationModel.admissionNumber  =  this.responseModel.data[0].admissionNumber;
            }
            if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined){
              this.saoLoanApplicatonModel.memberTypeName = this.responseModel.data[0].memberTypeName;
            }
            if(this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined){
              this.saoCommunicationModel.memberType = this.responseModel.data[0].memberTypeId;
            }
            
            this.saoCommunicationModel.id = null;
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

  getInstitutionByAdmissionNumber(admissionNumber: any) {
    this.membershipBasicDetailsService.getMemberIstitutionByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.memInstitutionModel = this.responseModel.data[0];
            if (this.responseModel.data[0].institutionCommunicationDTOList[0] != null && this.responseModel.data[0].institutionCommunicationDTOList[0] != undefined){
              this.saoCommunicationModel = this.responseModel.data[0].institutionCommunicationDTOList[0];
              this.loadMasterDataListMemberModule(this.saoCommunicationModel);
            }
            if(this.responseModel.data[0].admissionNumber != null && this.responseModel.data[0].admissionNumber != undefined){
              this.saoCommunicationModel.admissionNumber  =  this.responseModel.data[0].admissionNumber;
            }
            if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined){
              this.saoLoanApplicatonModel.memberTypeName = this.responseModel.data[0].memberTypeName;
            }
            if(this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined){
              this.saoCommunicationModel.memberType = this.responseModel.data[0].memberTypeId;
            }
            this.saoCommunicationModel.id = null;
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

  getCommunicationDetailsByLoanApplicationId(id: any) {
    this.saoCommunicationService.getCommunicationDetailsByLoanApplicationId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.saoCommunicationModel = this.responseModel.data[0];
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
 
  getSaoLoanApplicationDetailsById(id: any) {
    this.saoLoanApplicationService.getSaoLoanApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.saoLoanApplicatonModel = this.responseModel.data[0];
            if(this.responseModel.data[0].admissionNo != null && this.responseModel.data[0].admissionNo != undefined){
              this.saoCommunicationModel.admissionNumber  =  this.responseModel.data[0].admissionNo;
              this.admissionNumber  =  this.responseModel.data[0].admissionNo;
            }
            if(this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined){
              this.saoCommunicationModel.memberTypeName = this.responseModel.data[0].memberTypeName;
            }
            if(this.responseModel.data[0].memberTypeId != null && this.responseModel.data[0].memberTypeId != undefined){
              this.saoCommunicationModel.memberType = this.responseModel.data[0].memberTypeId;
            }
            if(this.responseModel.data[0].id != null && this.responseModel.data[0].id != undefined){
              this.loanId = this.responseModel.data[0].id;
            }
            if (this.saoLoanApplicatonModel.saoLoanCommunicationDTO != null && this.saoLoanApplicatonModel.saoLoanCommunicationDTO != undefined) {
              this.saoCommunicationModel = this.saoLoanApplicatonModel.saoLoanCommunicationDTO;
            
              this.loadMasterAddressDetails(this.saoCommunicationModel);
              this.sameAsPerAddr(this.flag);
              this.updateData();
            }
            else{
              if(this.admissionNumber != null && this.admissionNumber != undefined){
                this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
                this.getGroupDetailsByAdmissionNumber(this.admissionNumber);
                this.getInstitutionByAdmissionNumber(this.admissionNumber);
              }
          }
          }
        }
      }
    });
  }

  getStatesList() {
    this.saoCommunicationService.getstatesList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.statesList = this.responseModel.data;
        this.statesList = this.statesList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let relationshiptype = this.statesList.find((data: any) => null != data && data.value == this.saoCommunicationModel.stateId);
        if (relationshiptype != null && undefined != relationshiptype)
          this.saoCommunicationModel.stateName = relationshiptype.label;
        this.sameAsPerAddr(this.flag);
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

  getDistrictsByStateId(id: any) {
    this.saoCommunicationModel.districtId = null;
    this.saoCommunicationModel.subDistrictId = null;
    this.saoCommunicationModel.villageId = null;

    this.districtsList = [];
    this.mandalsList = [];
    this.villageList = [];
    this.saoCommunicationService.getDistrictsByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.districtsList = this.responseModel.data;
          this.districtsList = this.districtsList.filter((obj: any) => obj != null).map((district: { name: any; id: any; }) => {
            return { label: district.name, value: district.id };
          });
          let state = this.statesList.find((data: any) => null != data && this.saoCommunicationModel.stateId != null && data.value == this.saoCommunicationModel.stateId);
          if (state != null && undefined != state && state.label != null && state.label != undefined) {
            this.saoCommunicationModel.stateName = state.label;
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
    });
  }

  getAllDistrcts() {
    this.saoCommunicationService.getDistrictsList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.districtsList = this.responseModel.data;
        this.districtsList = this.districtsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let district = this.districtsList.find((data: any) => null != data && this.saoCommunicationModel.districtId  != null && data.value == this.saoCommunicationModel.districtId);
        if (district != null && undefined != district && district.label != null && district.label != undefined)
          this.saoCommunicationModel.districtName = district.label;
        this.sameAsPerAddr(this.flag);
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

  getMandalsByByDistrctId(id: any) {
    this.saoCommunicationService.getMandalsByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.mandalsList = this.responseModel.data;
        this.mandalsList = this.mandalsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let subDistrict = this.mandalsList.find((data: any) => null != data && this.saoCommunicationModel.permenentSubDistrictId  != null && data.value == this.saoCommunicationModel.subDistrictId);
        if (subDistrict != null && undefined != subDistrict)
            this.saoCommunicationModel.subDistrictName = subDistrict.label;
          this.sameAsPerAddr(this.flag);
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

  getAllMandal() {
    this.saoCommunicationService.getMandalsList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.mandalsList = this.responseModel.data;
        this.mandalsList = this.mandalsList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let subDistrict = this.mandalsList.find((data: any) => null != data && this.saoCommunicationModel.permenentSubDistrictId  != null && data.value == this.saoCommunicationModel.subDistrictId);
        if (subDistrict != null && undefined != subDistrict)
            this.saoCommunicationModel.subDistrictName = subDistrict.label;
        let permenentdistrictName = this.mandalsList.find((data: any) => null != data && this.saoCommunicationModel.permenentSubDistrictId  != null && data.value == this.saoCommunicationModel.permenentSubDistrictId);
        if (permenentdistrictName != null && undefined != permenentdistrictName)
            this.saoCommunicationModel.permenentSubDistrictName = permenentdistrictName.label;  
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

  getAllVilagesByMandalId(id: any) {
    this.saoCommunicationService.getvillagesByMandalId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.villageList = this.responseModel.data;
        this.villageList = this.villageList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let subDistrict = this.villageList.find((data: any) => null != data && this.saoCommunicationModel.permenentVillageId != null &&  data.value == this.saoCommunicationModel.villageId);
        if (subDistrict != null && undefined != subDistrict)
          this.saoCommunicationModel.villageName = subDistrict.label;

        this.sameAsPerAddr(this.flag);
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

  getAllVillages() {
    this.saoCommunicationService.getVillageList().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.villageList = this.responseModel.data;
        this.villageList = this.villageList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
        let subDistrict = this.villageList.find((data: any) => null != data && this.saoCommunicationModel.permenentVillageId != null &&  data.value == this.saoCommunicationModel.villageId);
        if (subDistrict != null && undefined != subDistrict)
          this.saoCommunicationModel.subDistrictName = subDistrict.label;
      let permenentdistrictName = this.villageList.find((data: any) => null != data && this.saoCommunicationModel.permenentVillageId != null && data.value == this.saoCommunicationModel.permenentVillageId);
        if (permenentdistrictName != null && undefined != permenentdistrictName)
          this.saoCommunicationModel.permenentVillageName = permenentdistrictName.label;
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
  
  getPermenentDistrictByPermenetStateId(id: any) {
    this.saoCommunicationService.getDistrictsByStateId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined) {
          this.permenentDistrictList = this.responseModel.data;
          this.permenentDistrictList = this.permenentDistrictList.filter((obj: any) => obj != null).map((permanantDistrict: { name: any; id: any; }) => {
            return { label: permanantDistrict.name, value: permanantDistrict.id };
          });
          let permanentState = this.permenentStatesList.find((data: any) => null != data && this.saoCommunicationModel.permenentStateId != null && data.value == this.saoCommunicationModel.permenentStateId);
          if (permanentState != null && undefined != permanentState) {
            this.saoCommunicationModel.permenentStateName = permanentState.label;
          }
          this.getPermenentMandalsByByPermenentDistrctId(this.saoCommunicationModel.permenentDistrictId);
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

  getPermenentMandalsByByPermenentDistrctId(id: any) {
    this.saoCommunicationService.getMandalsByDistrictId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
          this.permenentMandalsList = this.responseModel.data;
          this.permenentMandalsList = this.permenentMandalsList.filter((obj: any) => obj != null).map((permanantMandal: { name: any; id: any; }) => {
            return { label: permanantMandal.name, value: permanantMandal.id };
          });
          let permanentDistrict = this.permenentDistrictList.find((data: any) => null != data && this.saoCommunicationModel.permenentDistrictId != null && data.value == this.saoCommunicationModel.permenentDistrictId);
          if (permanentDistrict != null && undefined != permanentDistrict)
            this.saoCommunicationModel.permenentDistrictName = permanentDistrict.label;

          this.getPermenentVilagesByPermenetMandalId(this.saoCommunicationModel.permenentSubDistrictId);
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

  getPermenentVilagesByPermenetMandalId(id: any) {
    this.saoCommunicationService.getvillagesByMandalId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 ) {
            this.permenentVillagesList = this.responseModel.data;
            this.permenentVillagesList = this.permenentVillagesList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
              return { label: relationType.name, value: relationType.id };
            });
          let permenentdistrictName = this.permenentVillagesList.find((data: any) => null != data && this.saoCommunicationModel.permenentVillageId != null && data.value == this.saoCommunicationModel.permenentVillageId);
            if (permenentdistrictName != null && undefined != permenentdistrictName)
              this.saoCommunicationModel.permenentVillageName = permenentdistrictName.label;
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

  appendPinCodeToPermanent() {
    if (this.saoCommunicationModel != null && this.saoCommunicationModel != undefined && this.saoCommunicationModel.isSameAddress != null && this.saoCommunicationModel.isSameAddress != undefined && this.saoCommunicationModel.isSameAddress) {
      if (this.saoCommunicationModel.pinCode != null && this.saoCommunicationModel.pinCode != undefined) {
        this.saoCommunicationModel.permenentPinCode = this.saoCommunicationModel.pinCode;
      }
      if (this.saoCommunicationModel.address1 != null && this.saoCommunicationModel.address1 != undefined) {
        this.saoCommunicationModel.permenentAddress1 = this.saoCommunicationModel.address1;
      }
    }
  }

}
