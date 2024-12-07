import { Qualification } from './../../../../configurations/common-config/qualification/shared/qualification.model';
import { QualificationService } from './../../../../configurations/common-config/qualification/shared/qualification.service';
import { MembershipFamilyDetailsService } from './../../shared/membership-family-details.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { MemberBasicDetails, MembershipFamilyDetailsModel } from '../../shared/member-basic-details.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { MembershipBasicDetailsService } from '../../shared/membership-basic-details.service';
import { MemberBasicDetailsStepperService } from '../shared/membership-individual-stepper.service';
import { RelationshipTypeService } from 'src/app/configurations/common-config/relationship-type/shared/relationship-type.service';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { OperatorTypeService } from 'src/app/configurations/common-config/operator-type/shared/operator-type.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css']
})
export class FamilyDetailsComponent {
  @ViewChild('dt', { static: false }) private dt!: Table;
  @ViewChild('dd', { static: false }) private dd!: Table;
  @ViewChild('dl', { static: false }) private dl!: Table;
  @ViewChild('cv', { static: false }) private cv!: Table;
  @ViewChild('cc', { static: false }) private cc!: Table;
  @ViewChild('bd', { static: false }) private bd!: Table;

  familyForm: FormGroup;
  commomCategory: any[] = [];
  tempCommomCategory: any[] = [];
  addButton: boolean = false;
  statusList: any[] = [];
  membershipFamilyDetailsModel: MembershipFamilyDetailsModel = new MembershipFamilyDetailsModel();
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
  displayDialog: boolean = false;
  editDeleteDisable: boolean = false;
  familyColumns: any[] = [];
  memberShipFamilyDetailsDTOList: any[] = [];
  relationshipTypeList: any[] = [];
  qualificationLIst: any[] = [];
  displayVillageDialog: boolean = false;
  rowVillageId: any;
  rowId: any;
  newRow: any = null;
  memberId: any;
  landFlag: boolean = false;
  buttonsFlag: boolean = true;
  uploadFileData: any;
  isFileUploaded: boolean = false;
  multipleFilesList:  any;
  
  constructor(private commonComponent: CommonComponent, private router: Router, private formBuilder: FormBuilder, private memberBasicDetailsStepperService: MemberBasicDetailsStepperService,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService, private membershipFamilyDetailsService: MembershipFamilyDetailsService,
   private operatorTypeService: OperatorTypeService,
     private membershipBasicDetailsService: MembershipBasicDetailsService, private relationshipTypeService: RelationshipTypeService,
    private qualificationService: QualificationService, private datePipe: DatePipe, private commonFunctionsService: CommonFunctionsService,
    private fileUploadService :FileUploadService ,

  ) {
    this.familyForm = this.formBuilder.group({
      'relationTypeId': new FormControl('', Validators.required),
      'surname': new FormControl('',[Validators.pattern(applicationConstants.NEW_NAME_PATTERN), Validators.maxLength(40), Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'name': new FormControl('', [Validators.required,Validators.pattern(applicationConstants.NEW_NAME_PATTERN), Validators.maxLength(40), Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'dob': new FormControl('',Validators.required),
      'age': new FormControl('',Validators.required),
      'qualificationId': new FormControl('',Validators.required),
      'aadharNumber': new FormControl('',[Validators.required,Validators.pattern(applicationConstants.AADHAR_PATTERN)]),
      'mobileNumber': new FormControl('', [Validators.required, Validators.pattern(applicationConstants.MOBILE_PATTERN)]),
      'docFilePath': new FormControl(''),
    });

  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.addNewEntry();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.memberId = this.encryptService.decrypt(params['id']);
        if (this.memberId) {
          this.isEdit = true;
          this.getMembershipDetailsById(this.memberId);
        }
      } else {
        this.isEdit = false;
      }
      this.updateData();
    });

    this.familyForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.familyForm.valid) {
        this.save();
      }
    });
  }
  getMembershipDetailsById(id: string) {
    this.commonComponent.startSpinner();
    this.membershipBasicDetailsService.getMembershipBasicDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.memberBasicDetailsModel = this.responseModel.data[0];
        if (this.memberBasicDetailsModel.memberShipFamilyDetailsDTOList.length > 0) {
          this.memberShipFamilyDetailsDTOList = this.memberBasicDetailsModel.memberShipFamilyDetailsDTOList.map((member: any) => {
            member.memDobVal = this.datePipe.transform(member.dob, this.orgnizationSetting.datePipe);
            if (member.docFilePath != null) {
              member.multipleFilesList = this.fileUploadService.getFile(member.docFilePath, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + member.docFilePath);
            }
            return member;
          });
        }
      }
      this.updateData();
    });
  }

  updateData() {
    if (this.memberBasicDetailsModel.memberShipFamilyDetailsDTOList != null && this.memberBasicDetailsModel.memberShipFamilyDetailsDTOList != undefined &&
      this.memberBasicDetailsModel.memberShipFamilyDetailsDTOList.length > 0 && this.buttonsFlag ) {
      this.landFlag = true;
    }
    this.membershipFamilyDetailsModel.membershipId =this.memberBasicDetailsModel.id
    this.memberBasicDetailsStepperService.changeData({
      formValid: this.familyForm.valid ,
      data: this.membershipFamilyDetailsModel,
      savedId:this.memberId,
      stepperIndex: 5,
      isDisable: !this.landFlag ? true : false,
    });
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
    this.getAllRelationshipType();
    this.getQualificationType();

  }
  addNewEntry() {
    this.newRow = { relationTypeId: '', surname: '', name: '', dob: '', age: '', qualificationId: '', aadharNumber: '', amobileNumberge: '', docFilePath: '' }
  }
  onRowEditSave() {
    this.addNewEntry();
    this.editDeleteDisable = true;
    this.addButton = true;
    this.buttonsFlag  = false;
    this.landFlag =false
    this.updateData();
    this.dt._first = 0;
    this.dt.value.unshift(this.newRow);
    this.dt.initRowEdit(this.dt.value[0]);
    this.getAllRelationshipType();
    this.getQualificationType();

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

  getAllRelationshipType() {
    this.commonComponent.startSpinner();
    this.relationshipTypeService.getAllRelationshipType().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {

          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        this.relationshipTypeList = this.responseModel.data.filter((customertype: any) => customertype.status == applicationConstants.ACTIVE).map((count: any) => {
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
  getQualificationType() {
    this.commonComponent.startSpinner();
    this.qualificationService.getAllQualification().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        this.qualificationLIst = this.responseModel.data.filter((customertype: any) => customertype.status == applicationConstants.ACTIVE).map((count: any) => {
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
  onChangeQualification() {
    let Qualification = this.qualificationLIst.find((data: any) => null != data && data.value == this.membershipFamilyDetailsModel.qualificationId);
    if (Qualification != null && undefined != Qualification)
      this.membershipFamilyDetailsModel.qualificationName = Qualification.label;
  }
  onChangeAssertRelationType() {
    let relation = this.relationshipTypeList.find((data: any) => null != data && data.value == this.membershipFamilyDetailsModel.relationTypeId);
    if (relation != null && undefined != relation)
      this.membershipFamilyDetailsModel.relationTypeName = relation.label;
  }
  saveOrUpdateFamilyDetailsDetails(rowData: any) {
    rowData.pacsId = 1;
    rowData.branchId = 1;
    rowData.membershipId = this.memberBasicDetailsModel.id;
    this.addButton = false;
    this.editDeleteDisable = false;
    this.qualificationLIst.filter(data => data != null && data.value == rowData.qualificationId).map(count => {
      rowData.qualificationName = count.label;
    })
    this.relationshipTypeList.filter(data => data != null && data.value == rowData.relationTypeId).map(count => {
      rowData.relationTypeName = count.label;
    })
    if (rowData.memDobVal != undefined && rowData.memDobVal != null)
      rowData.dob = this.commonFunctionsService.getUTCEpoch(new Date(rowData.memDobVal));

    if (rowData.id != null) {
      this.membershipFamilyDetailsService.updateMembershipFamilyDetails(rowData).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.getMembershipDetailsById(rowData.membershipId);
          this.buttonsFlag  = true;
          this.landFlag =true;;
          this.updateData();

          if (null != rowData.dob)
            rowData.memDobVal = this.datePipe.transform(rowData.dob, this.orgnizationSetting.datePipe);

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
      this.membershipFamilyDetailsService.addMembershipFamilyDetails(rowData).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.getMembershipDetailsById(rowData.membershipId);
          if (null != this.responseModel.data[0].dob)
            this.responseModel.data[0].memDobVal = this.datePipe.transform(this.responseModel.data[0].dob, this.orgnizationSetting.datePipe);
          this.buttonsFlag  = true;
          this.landFlag =true;
          this.memberShipFamilyDetailsDTOList.unshift(this.responseModel.data[0]);
          this.memberShipFamilyDetailsDTOList.splice(1, 1);
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

  fileUploader(event: any, fileUpload: FileUpload,rowData:any) {
    this.isFileUploaded = applicationConstants.FALSE;
    rowData.multipleFilesList = [];
    rowData.filesDTO = null; // Initialize as a single object
    rowData.docFilePath = null;
    let file = event.files[0]; // Only one file
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let filesDTO = new FileUploadModel();
      this.uploadFileData = e.target as FileReader;
      filesDTO.fileName = file.name;
      filesDTO.fileType = file.type.split('/')[1];
      filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
      filesDTO.imageValue = this.uploadFileData.result as string;
      rowData.filesDTO = filesDTO;
      rowData.docFilePath = filesDTO.fileName;
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
    rowData.docFilePath = null;
    rowData.filesDTO = null;
    rowData.multipleFilesList = [];
  }
}
