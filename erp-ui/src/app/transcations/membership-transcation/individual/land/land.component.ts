import { MembershipLandDetailsService } from './../../shared/membership-land-details.service';
import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Table } from "primeng/table";
import { SoilTypesService } from "src/app/configurations/membership-config/membership-soil-types/shared/soil-types.service";
import { applicationConstants } from "src/app/shared/applicationConstants";
import { CommonComponent } from "src/app/shared/common.component";
import { EncryptDecryptService } from "src/app/shared/encrypt-decrypt.service";
import { Responsemodel } from "src/app/shared/responsemodel";
import { MemberLandDetailsModel, MemberBasicDetails } from "../../shared/member-basic-details.model";
import { MembershipBasicDetailsService } from "../../shared/membership-basic-details.service";
import { MemberBasicDetailsStepperService } from "../shared/membership-individual-stepper.service";
import { OperatorTypeService } from 'src/app/configurations/common-config/operator-type/shared/operator-type.service';
import { WaterSourceTypesService } from 'src/app/configurations/membership-config/membership-water-source-types/shared/water-source-types.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.css']
})
export class LandComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  @ViewChild('dd', { static: false }) private dd!: Table;
  @ViewChild('dl', { static: false }) private dl!: Table;
  @ViewChild('cv', { static: false }) private cv!: Table;
  @ViewChild('cc', { static: false }) private cc!: Table;
  @ViewChild('bd', { static: false }) private bd!: Table;

  landForm: FormGroup;
  commomCategory: any[] = [];
  tempCommomCategory: any[] = [];
  id = 1;
  addButton: boolean = false;
  work: any;
  statusList: any[] = [];
  cities: any[] | undefined;
  memberLandDetailsModel: MemberLandDetailsModel = new MemberLandDetailsModel();
  memberBasicDetailsModel: MemberBasicDetails = new MemberBasicDetails();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  countryList: any[] = [];
  soilTypeList: any[] = [];
  waterSourceTypeList: any[] = [];
  villageList: any[] = [];
  districtList: any[] = [];
  subDistrictList: any[] = [];
  workFlowList: any[] = [];
  editDeleteDisable: boolean = false;
  promoterColumns: any[] = [];
  newRow: any = null;
  memberLandDetailsModelList: any[] = [];
  memberId: any;
  landFlag: boolean = false;
  buttonsFlag: boolean = true;
  uploadFileData: any;
  isFileUploaded: boolean = false;
  uploadFlag: boolean = true;
  submitFlag: boolean = false;
  multipleFilesList: any[] = [];


  constructor(private commonComponent: CommonComponent, private router: Router, private formBuilder: FormBuilder, private memberBasicDetailsStepperService: MemberBasicDetailsStepperService,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService, private membershipLandDetailsService: MembershipLandDetailsService,
    private operatorTypeService: OperatorTypeService, private waterSourceTypesService: WaterSourceTypesService,
    private membershipBasicDetailsService: MembershipBasicDetailsService, private soilTypesService: SoilTypesService,private fileUploadService :FileUploadService ,

  ) {
    this.landForm = this.formBuilder.group({
      'passbookNumber': new FormControl('',[Validators.required, Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'surveyNumber': new FormControl('', [Validators.required, Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'landInUnits': new FormControl('', [Validators.required,Validators.pattern(applicationConstants.ALLOW_NUMBERS)]),
      'landInSubUnits': new FormControl('', [Validators.required,Validators.pattern(applicationConstants.ALLOW_NUMBERS)]),
      'soilTypeId': new FormControl('', Validators.required),
      'waterSourceId': new FormControl('', Validators.required),
      'uploadFilePath': new FormControl(''),
    });
  }

  ngOnInit() {
    this.addNewEntry();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted != undefined) {
        this.isEdit = true;
        this.memberId = Number(this.encryptService.decrypt(encrypted));

        // if (memberId != null && memberId != undefined) {
        this.getMembershipDetailsById(this.memberId);
        // }
      } else {
        this.isEdit = false;
        // this.memberGroupBasicDetails.groupStatus = this.statusList[0].value;
      }
      this.updateData();
    });

    this.landForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.landForm.valid) {
        this.save();
      }
    });
  }
  updateData() {
    if (this.memberBasicDetailsModel.memberShipLandDetailsDTOList != null && this.memberBasicDetailsModel.memberShipLandDetailsDTOList != undefined &&
      this.memberBasicDetailsModel.memberShipLandDetailsDTOList.length > 0 && this.buttonsFlag ) {
      this.landFlag = true;
    }
    this.memberLandDetailsModel.membershipId = this.memberId
    this.memberLandDetailsModel.landStatus = applicationConstants.ACTIVE;
    if(this.memberBasicDetailsModel.memberTypeName == applicationConstants.B_CLASS){
      this.memberBasicDetailsStepperService.changeData({
        formValid: this.memberLandDetailsModelList.length > 0 ? true : false,
        data: this.memberLandDetailsModel,
        stepperIndex: 3,
      });
    }else{
      this.memberBasicDetailsStepperService.changeData({
      formValid: this.landForm.valid,
      data: this.memberLandDetailsModel,
      savedId: this.memberId,
      stepperIndex: 3,
      isDisable: !this.landFlag ? true : false,
        });
      }
  }
  save() {
    this.updateData();
  }
  editVillageRow(row: any) {
    this.addButton = true;
    this.editDeleteDisable = true;
    this.buttonsFlag  = false;
    this.landFlag =false
    this.getAllSoilTypes();
    this.getAllWaterSoruceType();
    this.updateData();
  }
  onRowEditSave() {
    this.addNewEntry();
    this.editDeleteDisable = true;
    this.addButton = true;
    this.buttonsFlag  = false;
    this.landFlag =false
    this.dt._first = 0;
    // this.promoterDetailsForm.reset();
    this.dt.value.unshift(this.newRow);
    this.dt.initRowEdit(this.dt.value[0]);
    this.getAllSoilTypes();
     this.getAllWaterSoruceType();
    this.updateData();
  }
  onRowEditCancel() {
    this.addButton = false;
    this.editDeleteDisable = false;
    const index = this.dt.value.indexOf(this.newRow);
    // Remove the newRow from the array if it exists
    if (index > -1) {
      this.dt.value.splice(index, 1);
    }
    this.buttonsFlag  = true;
    // this.landFlag =true;
    this.updateData();
    this.addNewEntry();
    
  }
  getMembershipDetailsById(id: any) {
    this.isEdit = true;
    this.membershipBasicDetailsService.getMembershipBasicDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.memberBasicDetailsModel = this.responseModel.data[0];
        if (this.memberBasicDetailsModel &&
          this.memberBasicDetailsModel.memberShipLandDetailsDTOList &&
          this.memberBasicDetailsModel.memberShipLandDetailsDTOList.length > 0) {
          this.memberLandDetailsModelList = this.memberBasicDetailsModel.memberShipLandDetailsDTOList.map((member:any) =>{
            if(member.uploadFilePath != null && member.uploadFilePath != undefined)
              member.multipleFilesList = this.fileUploadService.getFile(member.uploadFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + member.uploadFilePath);

            return member;
          }
          );
        }
      }
      this.updateData();
    });
  }
  getAllSoilTypes() {
    this.commonComponent.startSpinner();
    this.soilTypesService.getAllSoilTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {

          this.msgs = [];
          // this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        this.soilTypeList = this.responseModel.data.filter((customertype: any) => customertype.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });

        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
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

  getAllWaterSoruceType() {
    this.commonComponent.startSpinner();
    this.waterSourceTypesService.getAllWaterSourceTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {

          this.msgs = [];
          // this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        this.waterSourceTypeList = this.responseModel.data.filter((customertype: any) => customertype.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });

        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
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
  addNewEntry() {
    this.newRow = { passbookNumber: '', surveyNumber: '', landInUnits: '', landInSubUnits: '', soilTypeId: '', waterSourceId: '' }
  }
  saveLandDetails(rowData: any) {
    rowData.pacsId = 1;
    rowData.branchId = 1;
    rowData.membershipId = this.memberBasicDetailsModel.id;
    this.addButton = false;
    this.editDeleteDisable = false;

    this.soilTypeList.filter(data => data != null && data.value == rowData.soilTypeId).map(count => {
      rowData.soilTypeName = count.label;
    })
    this.waterSourceTypeList.filter(data => data != null && data.value == rowData.waterSourceId).map(count => {
      rowData.waterSourceName = count.label;
    })
    if (rowData.id != null) {
      this.membershipLandDetailsService.updateMembershipLandDetails(rowData).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.getMembershipDetailsById(this.memberId);
          this.buttonsFlag  = true;
          this.landFlag =true;;
          this.updateData();
          let soilTypeName = this.soilTypeList.filter((data: any) => null != data && data.value == this.responseModel.data[0].soilTypeId);
          if (soilTypeName != null && undefined != soilTypeName)
            this.responseModel.data[0].soilTypeName = soilTypeName[0].label;
          let waterSourceName = this.waterSourceTypeList.filter((data: any) => null != data && this.responseModel.data[0].waterSourceId != null && data.value == this.responseModel.data[0].waterSourceId);
          if (waterSourceName != null && undefined != waterSourceName)
            this.responseModel.data[0].waterSourceName = waterSourceName[0].label;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        } else {
          this.commonComponent.stopSpinner();
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
    } else {
      this.membershipLandDetailsService.addMembershipLandDetails(rowData).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.getMembershipDetailsById(this.memberId);
          this.memberBasicDetailsModel.memberShipLandDetailsDTOList = this.responseModel.data;
          this.buttonsFlag  = true;
          this.landFlag =true;
          let soilTypeName = this.soilTypeList.filter((data: any) => null != data && data.value == this.responseModel.data[0].soilTypeId);
          if (soilTypeName != null && undefined != soilTypeName)
            this.responseModel.data[0].soilTypeName = soilTypeName[0].label;
          let waterSourceName = this.waterSourceTypeList.filter((data: any) => null != data && this.responseModel.data[0].waterSourceId != null && data.value == this.responseModel.data[0].waterSourceId);
          if (waterSourceName != null && undefined != waterSourceName)
            this.responseModel.data[0].waterSourceName = waterSourceName[0].label;
          this.memberLandDetailsModelList.unshift(this.responseModel.data[0]);
          this.memberLandDetailsModelList.splice(1, 1);
          this.updateData();
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);

        } else {
          this.commonComponent.stopSpinner();
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
    // this.updateData();
  }
 
  fileUploader(event: any, fileUpload: FileUpload,rowData:any) {
    this.isFileUploaded = applicationConstants.FALSE;
    rowData.multipleFilesList = [];
    this.multipleFilesList = [];
    rowData.filesDTO = null; // Initialize as a single object
    rowData.uploadFilePath = null;
    let file = event.files[0]; // Only one file
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let filesDTO = new FileUploadModel();
      this.uploadFileData = e.target as FileReader;
      filesDTO.fileName = "MEMBER_Land_" + this.memberId + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
      filesDTO.fileType = file.type.split('/')[1];
      filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
      filesDTO.imageValue = this.uploadFileData.result as string;
      rowData.filesDTO = filesDTO;
      rowData.uploadFilePath = filesDTO.fileName;
      let index1 = event.files.indexOf(file);
      if (index1 > -1) {
        fileUpload.remove(event, index1);
      }
      this.updateData();
      fileUpload.clear();
    };

    reader.readAsDataURL(file);
  }
  fileRemoveEvent(rowData:any) {
    rowData.uploadFilePath = null;
    rowData.filesDTO = null;
    rowData.multipleFilesList = [];
}

}
