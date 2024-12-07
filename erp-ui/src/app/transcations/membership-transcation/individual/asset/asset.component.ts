import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { MemberBasicDetails, MembershipAssetsDetailsModel } from '../../shared/member-basic-details.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { MembershipBasicDetailsService } from '../../shared/membership-basic-details.service';
import { MemberBasicDetailsStepperService } from '../shared/membership-individual-stepper.service';
import { MembershipAssetsDetailsService } from '../../shared/membership-assets-details.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { AssetTypesService } from 'src/app/configurations/membership-config/membership-asset-types/shared/asset-types.service';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { OperatorTypeService } from 'src/app/configurations/common-config/operator-type/shared/operator-type.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  @ViewChild('dd', { static: false }) private dd!: Table;
  @ViewChild('dl', { static: false }) private dl!: Table;
  @ViewChild('cv', { static: false }) private cv!: Table;
  @ViewChild('cc', { static: false }) private cc!: Table;
  @ViewChild('bd', { static: false }) private bd!: Table;

  assertForm: FormGroup;
  commomCategory: any[] = [];
  tempCommomCategory: any[] = [];
  addButton: boolean = false;
  statusList: any[] = [];
  membershipAssetsDetailsModel: MembershipAssetsDetailsModel = new MembershipAssetsDetailsModel();
  memberBasicDetailsModel: MemberBasicDetails = new MemberBasicDetails();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  countryList: any[] = [];
  soilTypeList: any[] = [];
  villageList: any[] = [];
  districtList: any[] = [];
  subDistrictList: any[] = [];
  workFlowList: any[] = [];
  editDeleteDisable: boolean = false;
  assetsColumns: any[] = [];
  memberShipAssertDetailsList: any[] = [];
  assetsList: any[] = [];
  qualificationLIst: any[] = [];
  newRow: any;
  memberId: any;
  landFlag: boolean = false;
  buttonsFlag: boolean = true;

  isFileUploaded: boolean = false;
  multipartFileList:any[] = [];
  uploadFileData: any;



  constructor(private commonComponent: CommonComponent, private router: Router, private formBuilder: FormBuilder, private memberBasicDetailsStepperService: MemberBasicDetailsStepperService,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService, private membershipAssetsDetailsService: MembershipAssetsDetailsService,
    private operatorTypesService: OperatorTypeService, 
    private membershipBasicDetailsService: MembershipBasicDetailsService,private assetTypesService:AssetTypesService,
    private datePipe: DatePipe, private commonFunctionsService: CommonFunctionsService,private fileUploadService :FileUploadService ,

  ) {
    this.assertForm = this.formBuilder.group({
      'assetTypeId': new FormControl('', Validators.required),
      'assetName': new FormControl('',[Validators.required, Validators.pattern(applicationConstants.NEW_NAME_PATTERN),Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'registeredNumber': new FormControl('',[Validators.required,Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'registeredDate': new FormControl('',Validators.required),
      'initialValue': new FormControl('',[Validators.required, Validators.pattern(applicationConstants.ALLOW_NUMBERS),Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'currentValue': new FormControl('',[Validators.required, Validators.pattern(applicationConstants.ALLOW_NUMBERS),Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'depreciationPercentage': new FormControl('',[Validators.required, Validators.pattern(applicationConstants.ALLOW_NUMBERS),Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'assetFilePath': new FormControl(''),
    });
  }
  ngOnInit() {
    this.addNewEntry();
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();

    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.memberId = id;
        if (id != "" && id != null && id != undefined) {
          this.isEdit = true;
          this.membershipBasicDetailsService.getMembershipBasicDetailsById(id).subscribe(res => {
            this.responseModel = res;
            this.commonComponent.stopSpinner();
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
              this.memberBasicDetailsModel = this.responseModel.data[0];
              if (this.memberBasicDetailsModel.memberShipAssertDetailsDTOList.length > 0) {
                this.memberShipAssertDetailsList = this.memberBasicDetailsModel.memberShipAssertDetailsDTOList.map((member:any) =>{
                  member.registeredDateVal = this.datePipe.transform(member.registeredDate,this.orgnizationSetting.datePipe);
                  if(member.assetFilePath != null && member.assetFilePath != undefined)
                    member.multipartFileList = this.fileUploadService.getFile(member.assetFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + member.assetFilePath);

                  return member;
                }
                );
               }
             }
             this.updateData();
           });
         }
       } else {
         this.isEdit = false;
       }
     });
    this.assertForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.assertForm.valid) {
        this.save();
      }
    });
    this.updateData();
    this.getAllAssetTypes();
  }
  updateData() {
    if (this.memberBasicDetailsModel.memberShipAssertDetailsDTOList != null && this.memberBasicDetailsModel.memberShipAssertDetailsDTOList != undefined &&
      this.memberBasicDetailsModel.memberShipAssertDetailsDTOList.length > 0 && this.buttonsFlag ) {
      this.landFlag = true;
    }
    this.membershipAssetsDetailsModel.membershipId =this.memberBasicDetailsModel.id
    this.memberBasicDetailsStepperService.changeData({
      formValid: this.assertForm.valid ,
      data: this.membershipAssetsDetailsModel,
      savedId:this.memberId,
      stepperIndex: 6,
      isDisable: !this.landFlag ? true : false,    });
  }
  save() {
    this.updateData();
  }
  editVillageRow(row: any) {
    this.addButton = true;
    this.editDeleteDisable = true;
    this.buttonsFlag  = false;
    this.landFlag =false
    this.updateData();
    this.getAllAssetTypes();

  }
  onRowEditSave() {
    this.addNewEntry();
    this.editDeleteDisable = true;
    this.addButton = true;
    this.buttonsFlag  = false;
    this.landFlag =false
    this.updateData();
    this.dt._first = 0;
    // this.promoterDetailsForm.reset();
    this.dt.value.unshift(this.newRow);    
    this.dt.initRowEdit(this.dt.value[0]);
    this.getAllAssetTypes();
  }
  onRowEditCancel() {
    this.addButton = false;
    this.editDeleteDisable = false;
    this.buttonsFlag  = true;
    // this.landFlag =true;
    this.updateData();
    const index = this.dt.value.indexOf(this.newRow);

    // Remove the newRow from the array if it exists
    if (index > -1) {
      this.dt.value.splice(index, 1);
    }
    this.addNewEntry();
  }

  addNewEntry() {
    this.newRow = {assetTypeId: '', assetName: '', registeredNumber: '', registeredDate: '', initialValue: '', currentValue: '', depreciationPercentage: '', assetFilePath: '' }
  }
  getAllAssetTypes() {
    this.commonComponent.startSpinner();
    this.assetTypesService.getAllAssetTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {

          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        this.assetsList = this.responseModel.data.filter((obj: any) => obj != null && obj.status == applicationConstants.ACTIVE).map((count: { name: any; id: any; }) => {
          return { label: count.name, value: count.id };
        });
        let assetName = this.assetsList.find((data: any) => null != data && this.membershipAssetsDetailsModel.assetTypeId != null && data.value == this.membershipAssetsDetailsModel.assetTypeId);
        if (assetName != null && undefined != assetName)
        this.membershipAssetsDetailsModel.assetTypeName = assetName.label;
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
  onChangeAssert() {
    let assetName = this.assetsList.find((data: any) => null != data && this.membershipAssetsDetailsModel.assetTypeId != null && data.value == this.membershipAssetsDetailsModel.assetTypeId);
    if (assetName != null && undefined != assetName)
    this.membershipAssetsDetailsModel.assetTypeName = assetName.label;
  }
 
  saveOrUpdateAssetsDetails(rowData: any) {
    rowData.pacsId = 1;
    rowData.branchId = 1;
    rowData.membershipId = this.memberBasicDetailsModel.id;
    this.addButton = false;
    this.editDeleteDisable = false;

    this.assetsList.filter(data => data != null && data.value == rowData.assetTypeId).map(count => {
      rowData.assetTypeName = count.label;
    })
    if (rowData.registeredDateVal != undefined && rowData.registeredDateVal != null)
      rowData.registeredDate = this.commonFunctionsService.getUTCEpoch(new Date(rowData.registeredDateVal));
    if (rowData.id != null) {
      this.membershipAssetsDetailsService.updateMembershipAssetsDetails(rowData).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.membershipAssetsDetailsModel = response.data[0];
          this.buttonsFlag  = true;
          this.landFlag =true;
          this.updateData();
          if(null != this.membershipAssetsDetailsModel.registeredDate)
            this.membershipAssetsDetailsModel.registeredDateVal=this.datePipe.transform(this.membershipAssetsDetailsModel.registeredDate, this.orgnizationSetting.datePipe);
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
      this.membershipAssetsDetailsService.addMembershipAssetsDetails(rowData).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if(null != this.responseModel.data[0].registeredDate)
            this.responseModel.data[0].registeredDateVal=this.datePipe.transform(this.responseModel.data[0].registeredDate, this.orgnizationSetting.datePipe);
          this.buttonsFlag  = true;
          this.landFlag =true;
          this.memberShipAssertDetailsList.unshift(this.responseModel.data[0]);
          this.memberShipAssertDetailsList.splice(1, 1);
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
  }


  fileUploader(event: any, fileUpload: FileUpload ,row:any) {
    this.isFileUploaded = applicationConstants.FALSE;
    row.multipartFileList = [];
    this.multipartFileList = [];
    row.filesDTO = null; // Initialize as a single object
    row.assetFilePath = null;
    if (event.files.length !== 1) {
      console.error('Exactly one file must be selected.');
      return;
    }
    let file = event.files[0]; // Only one file
    let reader = new FileReader();
    reader.onloadend = (e) => {
      if (!e.target || !e.target.result) {
        console.error('FileReader failed to read file:', file.name);
        return;
      }
      let filesDTO = new FileUploadModel();
      this.uploadFileData = e.target as FileReader;
      filesDTO.fileName = "Member_Asset" + this.memberId + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
      filesDTO.fileType = file.type.split('/')[1];
      filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
      filesDTO.imageValue = this.uploadFileData.result as string;
      row.filesDTO = filesDTO;
      row.assetFilePath = filesDTO.fileName;
      let index1 = event.files.indexOf(file);
      if (index1 > -1) {
        fileUpload.remove(event, index1);
      }
      fileUpload.clear();
    };

    reader.readAsDataURL(file);
  }
  fileRemoveEvent(rowData:any) {
    rowData.assetFilePath = null;
    rowData.filesDTO = null;
    rowData.multipartFileList = [];
}

}
