import { Relationshiptype } from './../../../../configurations/common-config/relationship-type/shared/relationshiptype.model';
import { CommunityService } from './../../../../configurations/common-config/community/shared/community.service';
import { OccupationTypesService } from './../../../../configurations/common-config/occupation-types/shared/occupation-types.service';
import { CasteService } from './../../../../configurations/common-config/caste/shared/caste.service';
import { QualificationService } from './../../../../configurations/common-config/qualification/shared/qualification.service';
import { Qualification } from './../../../../configurations/common-config/qualification/shared/qualification.model';
import { Occupationtypes } from './../../../../configurations/common-config/occupation-types/shared/occupationtypes.model';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Membershiptransactionconstant } from '../../membership-transaction-constant';
import { MembershipBasicDetailsService } from '../../shared/membership-basic-details.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { MemberBasicDetails } from '../../shared/member-basic-details.model';
import { CommonStatusData } from 'src/app/transcations/common-status-data.json';
import { MemberBasicDetailsStepperService } from '../shared/membership-individual-stepper.service';
import { RelationshipTypeService } from 'src/app/configurations/common-config/relationship-type/shared/relationship-type.service';
import { MemberTypeService } from 'src/app/configurations/common-config/member-type/shared/member-type.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';


@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent {
  memberBasicDetailsModel: MemberBasicDetails = new MemberBasicDetails();
  memberBasicDetailsForm: FormGroup;
  operations: any;
  operationslist: any;
  statusList!: any[];
  genderList: any[] = [];
  maritalStatusList: any[] = [];
  selectedCity: any;
  isEdit: any;
  responseModel!: Responsemodel;

  tempAge: any;
  tempDob: any;
  branchId: any;
  msgs: any[] = [];
  relationshipTypeList: any[] = [];
  memberTypeList: any[] = [];
  qualificationLIst: any[] = [];
  casteList: any[] = [];
  communityList: any[] = [];
  occupationList: any[] = [];

  memberTypes: any;
  buttonDisabled: boolean | undefined;
  admissionNumber: any;
  orgnizationSetting: any;
  subProductList: any;
  multipleFilesList: any;
  uploadFileData: any;
  isFileUploaded: any;
  show:any
;

  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder, private membershipBasicDetailsService: MembershipBasicDetailsService,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService, private memberBasicDetailsStepperService: MemberBasicDetailsStepperService,
    private router: Router, private datePipe: DatePipe, private relationshipTypeService: RelationshipTypeService, private qualificationService: QualificationService
    , private casteService: CasteService, private occupationTypesService: OccupationTypesService, private communityService: CommunityService,
    private memberTypeService: MemberTypeService, private fileUploadService :FileUploadService,
  ) {

    this.memberBasicDetailsForm = this.formBuilder.group({

      'surname': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_PATTERN), Validators.maxLength(40), Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'name': new FormControl('', [Validators.required,Validators.pattern(applicationConstants.NEW_NAME_PATTERN), Validators.maxLength(40), Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'subProductId': new FormControl('', Validators.required),
      'age': new FormControl('', Validators.required),
      'dob': new FormControl('',),
      'genderId': new FormControl('', Validators.required),
      'martialId': new FormControl('', Validators.required),
      'relationId': new FormControl('', Validators.required),
      'relativeName': new FormControl('', [Validators.required,Validators.pattern(applicationConstants.NEW_NAME_PATTERN), Validators.maxLength(40), Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'qualificationId': new FormControl('', Validators.required),
      'occupationId': new FormControl('', Validators.required),
      'aadharNumber': new FormControl('', [Validators.required,Validators.pattern(applicationConstants.AADHAR_PATTERN)]),
      'panNumber': new FormControl('',  [Validators.required,Validators.pattern(applicationConstants.PAN_NUMBER_PATTERN),]),
      'mobileNumber': new FormControl('', [Validators.required, Validators.pattern(applicationConstants.MOBILE_PATTERN)]),
      'emailId': new FormControl('', [Validators.required, Validators.pattern(applicationConstants.EMAIL_PATTERN)]),
      'casteId': new FormControl('', Validators.required),
      'communityId': new FormControl('', Validators.required),
      'mcrNumber': new FormControl(''),
      'admissionDate': new FormControl('', Validators.required),      
      'admissionFee': new FormControl(''),

    })
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.statusList = this.commonComponent.status();
    this.genderList = this.commonComponent.genderList();
    this.maritalStatusList = this.commonComponent.maritalStatusList();
    // this.show = true
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let queryParams = params['id'].split('#');
        let id = this.encryptService.decrypt(params['id']);

        if (id != "" && id != null && id != undefined) {
          this.isEdit = true;
          this.membershipBasicDetailsService.getMembershipBasicDetailsById(id).subscribe(res => {
            this.responseModel = res;
            this.commonComponent.stopSpinner();
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data && this.responseModel.data.length > 0) {
              // this.show = true
              this.memberBasicDetailsModel = this.responseModel.data[0];
             this. onChangeProduct()
              this.tempAge = this.memberBasicDetailsModel.age;

              this.memberBasicDetailsModel.memDobVal = this.datePipe.transform(this.memberBasicDetailsModel.dob, this.orgnizationSetting.datePipe);
              this.memberBasicDetailsModel.temAdmDate = this.datePipe.transform(this.memberBasicDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

              if (this.memberBasicDetailsModel.photoCopyPath != null && this.memberBasicDetailsModel.photoCopyPath != undefined) {
                this.memberBasicDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.memberBasicDetailsModel.photoCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberBasicDetailsModel.photoCopyPath);
              }
              if (this.memberBasicDetailsModel.signatureCopyPath != null && this.memberBasicDetailsModel.signatureCopyPath != undefined) {
                this.memberBasicDetailsModel.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.memberBasicDetailsModel.signatureCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberBasicDetailsModel.signatureCopyPath);
              }
              if (this.memberBasicDetailsModel.mcrDocumentCopy != null && this.memberBasicDetailsModel.mcrDocumentCopy != undefined) {
                this.memberBasicDetailsModel.multipartFileListForMCRCopyPath = this.fileUploadService.getFile(this.memberBasicDetailsModel.mcrDocumentCopy ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.memberBasicDetailsModel.mcrDocumentCopy);
              }
            }
            // this.updateData();
          });
        }
      } else {
        this.isEdit = false;
        // this.getMemberPreviewsDetails();
        this.generateNewAdmissionNumber();

        this.memberBasicDetailsModel.memStatus = this.statusList[0].value;
      }
    })
    this.getAllRelationshipType();
    this.getQualificationType();
    this.getAllCaste();
    this.getOccupationTypes();
    this.getAllSubProducts();
    this.getAllCommunityTypes();

    this.memberBasicDetailsForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.memberBasicDetailsForm.valid) {
        this.save();
      }
    });
    // this.gridList(this.societyId);
  }
  updateData() {
    this.memberBasicDetailsStepperService.changeData({
      formValid:this.memberBasicDetailsForm.valid,
      data: this.memberBasicDetailsModel,
      stepperIndex: 0,
      isDisable: this.memberBasicDetailsForm.valid? false : true,    
    });
  }
  save() {
    this.updateData();
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
  onChangeRelationTypeChange() {
    let relationshiptype = this.relationshipTypeList.find((data: any) => null != data && this.memberBasicDetailsModel.relationId != null &&  data.value == this.memberBasicDetailsModel.relationId);
    if (relationshiptype != null && undefined != relationshiptype)
    this.memberBasicDetailsModel.relationTypeName = relationshiptype.label;
  }
  getAllSubProducts() {
    this.commonComponent.startSpinner();
    this.membershipBasicDetailsService.getAllSubProduct().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        this.subProductList = this.responseModel.data.filter((customertype: any) => customertype.status == applicationConstants.ACTIVE).map((count: any) => {
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
  onChangeQualificationChange() {
    let qualification = this.qualificationLIst.find((data: any) => null != data && this.memberBasicDetailsModel.qualificationId != null && data.value == this.memberBasicDetailsModel.qualificationId);
        if (qualification != null && undefined != qualification)
          this.memberBasicDetailsModel.qualificationName = qualification.label;
  }
  getOccupationTypes() {
    this.commonComponent.startSpinner();
    this.occupationTypesService.getAllOccupationTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {

          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        this.occupationList = this.responseModel.data.filter((customertype: any) => customertype.status == applicationConstants.ACTIVE).map((count: any) => {
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
  onChangeOccupationChange() {
    let occupation = this.occupationList.find((data: any) => null != data && this.memberBasicDetailsModel.occupationId != null && data.value == this.memberBasicDetailsModel.occupationId);
    if (occupation != null && undefined != occupation)
    this.memberBasicDetailsModel.occupationName = occupation.label;
  }
  getAllCaste() {
    this.commonComponent.startSpinner();
    this.casteService.getAllCaste().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != undefined && this.responseModel.data != null && this.responseModel.data.length > 0) {

          this.casteList = this.responseModel.data.filter((customertype: any) => customertype.status == applicationConstants.ACTIVE).map((count: any) => {
            return { label: count.name, value: count.id }
          });
          this.commonComponent.stopSpinner();
        }
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
  onChangeCasteChange() {
    let caste = this.casteList.find((data: any) => null != data && this.memberBasicDetailsModel.casteId != null && data.value == this.memberBasicDetailsModel.casteId);
    if (caste != null && undefined != caste)
    this.memberBasicDetailsModel.casteName = caste.label;
  }

  getAllCommunityTypes() {
    this.commonComponent.startSpinner();
    this.communityService.getAllCommunity().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data == null || (this.responseModel.data != null && this.responseModel.data.length == 0)) {

          this.msgs = [];
          // this.msgs = [{ severity: 'error', detail: applicationConstants.RELATIONSHIP_TYPE_NO_DATA_MESSAGE }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        this.communityList = this.responseModel.data.filter((customertype: any) => customertype.status == applicationConstants.ACTIVE).map((count: any) => {
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
  onChangeCommunityChange() {
    let community = this.communityList.find((data: any) => null != data && this.memberBasicDetailsModel.communityId != null && data.value == this.memberBasicDetailsModel.communityId);
    if (community != null && undefined != community)
    this.memberBasicDetailsModel.communityName = community.label;
  }

  generateNewAdmissionNumber(): void {
    this.admissionNumber = this.generateAdmissionNumber();
    this.memberBasicDetailsModel.admissionNumber = this.admissionNumber
  }
  generateAdmissionNumber(): string {
    // Generate a random 12-digit number
    const admissionNumber = Math.floor(100000000000 + Math.random() * 900000000000);
    return admissionNumber.toString();
  }
/**
   * @implements image uploader
   * @param event 
   * @param fileUpload 
   * @author yamuna.k
   */
fileUploader(event: any, fileUpload: FileUpload, filePathName: any) {
  this.isFileUploaded = applicationConstants.FALSE;
  this.multipleFilesList = [];
  if(this.isEdit && this.memberBasicDetailsModel.filesDTOList == null || this.memberBasicDetailsModel.filesDTOList == undefined){
    this.memberBasicDetailsModel.filesDTOList = [];
  }
  let files: FileUploadModel = new FileUploadModel();
  for (let file of event.files) {
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let files = new FileUploadModel();
      this.uploadFileData = e.currentTarget;
      files.fileName = file.name;
      files.fileType = file.type.split('/')[1];
      files.value = this.uploadFileData.result.split(',')[1];
      files.imageValue = this.uploadFileData.result;
      this.multipleFilesList.push(files);
      let timeStamp = this.commonComponent.getTimeStamp();
      if (filePathName === "photoCopyPath") {
        this.memberBasicDetailsModel.multipartFileListForPhotoCopy = [];
        this.memberBasicDetailsModel.filesDTOList.push(files);
        this.memberBasicDetailsModel.photoCopyPath = null;
        this.memberBasicDetailsModel.filesDTOList[this.memberBasicDetailsModel.filesDTOList.length - 1].fileName = "Member_Photo_Copy" + "_" + timeStamp + "_" + file.name;
        this.memberBasicDetailsModel.photoCopyPath = "Member_Photo_Copy" + "_" + timeStamp + "_" + file.name; 
      }
      if (filePathName === "signatureCopyPath") {
        this.memberBasicDetailsModel.multipartFileListForsignatureCopyPath = [];
        this.memberBasicDetailsModel.filesDTOList.push(files);
        this.memberBasicDetailsModel.signatureCopyPath = null;
        this.memberBasicDetailsModel.filesDTOList[this.memberBasicDetailsModel.filesDTOList.length - 1].fileName = "Member_Signature_Copy" + "_" + timeStamp + "_" + file.name;
        this.memberBasicDetailsModel.signatureCopyPath = "Member_Signature_Copy" + "_" + timeStamp + "_" + file.name; 
      }
      if (filePathName === "mcrDocumentCopy") {
        this.memberBasicDetailsModel.multipartFileListForMCRCopyPath = [];

        this.memberBasicDetailsModel.filesDTOList.push(files);
        this.memberBasicDetailsModel.mcrDocumentCopy = null;
        this.memberBasicDetailsModel.filesDTOList[this.memberBasicDetailsModel.filesDTOList.length - 1].fileName = "MCR_Document_Copy" + "_" + timeStamp + "_" + file.name;
        this.memberBasicDetailsModel.mcrDocumentCopy = "MCR_Document_Copy" + "_" + timeStamp + "_" + file.name; 
      }
    
      this.updateData();
    }
    reader.readAsDataURL(file);
  }
}


/**
   * @implements onFileremove from file value
   * @param fileName 
   * @author k.yamuna
   */
fileRemoveEvent(fileName: any) {
  if (this.memberBasicDetailsModel.filesDTOList != null && this.memberBasicDetailsModel.filesDTOList != undefined && this.memberBasicDetailsModel.filesDTOList.length > 0) {
    if (fileName == "photoCopyPath") {
      let removeFileIndex = this.memberBasicDetailsModel.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.memberBasicDetailsModel.photoCopyPath);
      this.memberBasicDetailsModel.filesDTOList.splice(removeFileIndex, 1);
      this.memberBasicDetailsModel.photoCopyPath = null;
    }
    if (fileName == "mcrDocumentCopy") {
      let removeFileIndex = this.memberBasicDetailsModel.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.memberBasicDetailsModel.mcrDocumentCopy);
      this.memberBasicDetailsModel.filesDTOList.splice(removeFileIndex, 1);
      this.memberBasicDetailsModel.mcrDocumentCopy = null;
    }
  
  if (fileName == "signatureCopyPath") {
    let removeFileIndex = this.memberBasicDetailsModel.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.memberBasicDetailsModel.signatureCopyPath);
    this.memberBasicDetailsModel.filesDTOList.splice(removeFileIndex, 1);
    this.memberBasicDetailsModel.signatureCopyPath = null;
  }
}
}

onChangeProduct(){
  if(this.memberBasicDetailsModel.subProductId == 1){
    this.show = true
  }
  else{
    this.show = false
  }
}
}
