import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { InstitutionBasicDetailsModel, InstituteCommunicationModel, InstiteKycDetailsModel, InstitutePromoterDetails } from '../../../shared/institution-details.model';
import { Membershiptransactionconstant } from '../../../membership-transaction-constant';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { MemberBasicDetailsStepperService } from '../../../individual/shared/membership-individual-stepper.service';
import { MembershipBasicDetailsService } from '../../../shared/membership-basic-details.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { InstitutionCommunicationService } from '../../../shared/institution-communication.service';
import { InstitutionKycDetailsService } from '../../../shared/institution-kyc-details.service';
import { InstitutionPromoterDetailsService } from '../../../shared/institution-promoter-details.service';
import { MemInstitutionService } from '../../../shared/mem-institution.service';
import { OperatorTypeService } from 'src/app/configurations/common-config/operator-type/shared/operator-type.service';
import { DatePipe } from '@angular/common';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Component({
  selector: 'app-institution-basic-details',
  templateUrl: './institution-basic-details.component.html',
  styleUrls: ['./institution-basic-details.component.css']
})
export class InstitutionBasicDetailsComponent implements OnInit{
  @ViewChild('dt', { static: false }) private dt!: Table;
  @ViewChild('dd', { static: false }) private dd!: Table;
  @ViewChild('dl', { static: false }) private dl!: Table;
  @ViewChild('cv', { static: false }) private cv!: Table;
  @ViewChild('cc', { static: false }) private cc!: Table;
  @ViewChild('bd', { static: false }) private bd!: Table;
 
  instituteBasicDetailsForm:FormGroup;
  institutepromoterDetailsForm:FormGroup;

  date: any;
  addButton: boolean = false;
  id: any;
  statusList: any[]=[];
  ginstitutionBasicDetailsModel :InstitutionBasicDetailsModel = new InstitutionBasicDetailsModel();
  instituteCommunicationModel:InstituteCommunicationModel = new InstituteCommunicationModel()
  institeKycDetailsModel:InstiteKycDetailsModel = new InstiteKycDetailsModel();
  institutePromoterDetails:InstitutePromoterDetails = new InstitutePromoterDetails();

 
  EditDeleteDisable:boolean = false;
  activeIndex: number = 0;
  buttonDisabled: boolean=false;

  completed = 0;
  branchId: any;
  saveAndContinueFlag: boolean = true;
  isEdit: any;
  responseModel!: Responsemodel;

  savedID: any;
  msgs: any[] = [];
  orgnizationSetting: any;
  communication: any;
  kyc: any;
  land: any;
  nominee: any;
  familydetails: any;
  asset: any;
  basicDetails: any;
  buttonDisbled: boolean =true;
  isSaveContinueEnable: boolean = false;
  nextDisable: boolean = false;
  serviceUrl: any;
  promoterColumns: any[] = [];
  genderList:any[]=[];
  maritalStatusList:any[]=[];
  operatorTypeList:any[]=[];
  promoterDetails:any[]=[];
  memberTypeList:any[]=[];
  productTypeList:any[]=[];
  newRow: any
  admissionNumber: any;
  subProductList:any[]=[];

  landFlag: boolean = false;
  buttonsFlag: boolean = true;
  multipleFilesList: any;
  uploadFileData: any;
  isFileUploaded: any;
  uploadSignature:boolean = false;
  rowEdit:number = 0;
  cancleButtonFlag : Boolean = true;
  constructor(public messageService: MessageService, private router: Router, private memInstitutionService: MemInstitutionService, private formBuilder:FormBuilder,
    private route: Router, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent, private translate: TranslateService,
    private operatorTypeService:OperatorTypeService,
    private memberBasicDetailsStepperService: MemberBasicDetailsStepperService,private ref: ChangeDetectorRef,
    private institutionPromoterDetailsService:InstitutionPromoterDetailsService,private encryptService: EncryptDecryptService,
   private datePipe: DatePipe,private membershipBasicDetailsService: MembershipBasicDetailsService,private fileUploadService :FileUploadService
    ,private commonFunctionsService: CommonFunctionsService,
  ) {
    this.instituteBasicDetailsForm = this.formBuilder.group({
      'subProductId':new FormControl('',Validators.required),
      'name':new FormControl('',[Validators.required,Validators.pattern(applicationConstants.NEW_NAME_PATTERN), Validators.maxLength(40), Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'registrationNumber': new FormControl('',Validators.required),
      'registrationDate': new FormControl('',Validators.required),
      'gstNumber':new FormControl('',[Validators.pattern(applicationConstants.GST_NUMBER_PATTERN) ]),
      'admissionDate': new FormControl('',Validators.required),
      'pocName': new FormControl('', [Validators.required,Validators.pattern(applicationConstants.NEW_NAME_PATTERN), Validators.maxLength(40), Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'pocNumber': new FormControl('',[Validators.required,Validators.pattern(applicationConstants.MOBILE_PATTERN), Validators.maxLength(10)]),
      'panNumber': new FormControl('',[Validators.required,Validators.pattern(applicationConstants.PAN_NUMBER_PATTERN),]),
      'tanNumber': new FormControl('',[Validators.pattern(applicationConstants.TAN_NUMBER)]),
      'resolutionNumber': new FormControl(''),

     
    })
    this.institutepromoterDetailsForm = this.formBuilder.group({
      'surname': new FormControl('',[Validators.pattern(applicationConstants.NEW_NAME_PATTERN), Validators.maxLength(40), Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'name':new FormControl('',[Validators.required,Validators.pattern(applicationConstants.NEW_NAME_PATTERN), Validators.maxLength(40), Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'operatorTypeId': new FormControl('',Validators.required),
      'dob': new FormControl('',Validators.required),
      'age': new FormControl('',Validators.required),
      'genderId': new FormControl(''),
      'martialId': new FormControl(''),
      'mobileNumber': new FormControl('',[Validators.required,Validators.pattern(applicationConstants.MOBILE_PATTERN), Validators.maxLength(10)]),
      'aadharNumber': new FormControl('',[Validators.required,Validators.pattern(applicationConstants.AADHAR_PATTERN), Validators.maxLength(12)]),
      'emailId': new FormControl('', [Validators.required, Validators.pattern(applicationConstants.EMAIL_PATTERN)]),
      'startDate': new FormControl(''),
      'authorizedSignatory': new FormControl('')
    })
  }
  ngOnInit(): void {
    this.addNewEntry();
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.statusList = this.commonComponent.status();
    this.genderList = this.commonComponent.genderList();
    this.maritalStatusList = this.commonComponent.maritalStatusList();
  
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let queryParams = params['id'].split('#');
        let id = this.encryptService.decrypt(params['id']);
  
        if (id != "" && id != null && id != undefined) {
          this.isEdit = true;
          this.getMembershipInstituionDetailsById(id); // Call the method to fetch details
        }
      } else {
        this.isEdit = false;
        // this.getMemberPreviewsDetails();
        this.generateNewAdmissionNumber();
        this.ginstitutionBasicDetailsModel.institutionStatus = this.statusList[0].value;
      }
    });
  
    this.instituteBasicDetailsForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.instituteBasicDetailsForm.valid) {
        this.save();
      }
    });
    this.getAllSubProducts();
   }
  
  updateData() {
    if (this.ginstitutionBasicDetailsModel.institutionPromoterList != null && this.ginstitutionBasicDetailsModel.institutionPromoterList != undefined &&
      this.ginstitutionBasicDetailsModel.institutionPromoterList.length > 0 && this.buttonsFlag ) {
      this.landFlag = true;
    }
    this.institutePromoterDetails.institutionId =this.ginstitutionBasicDetailsModel.id
    this.memberBasicDetailsStepperService.changeData({
      formValid: this.institutepromoterDetailsForm.valid ,
      data: this.ginstitutionBasicDetailsModel,
      savedId:this.id,
      stepperIndex: 0,
      isDisable: !this.landFlag ? true : false,
    });
  }
  

  getMembershipInstituionDetailsById(id: any): void {
    this.memInstitutionService.getMemInstitutionById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.ginstitutionBasicDetailsModel = this.responseModel.data[0];
        if (this.ginstitutionBasicDetailsModel.admissionDate != null && this.ginstitutionBasicDetailsModel.admissionDate != undefined) {
          this.ginstitutionBasicDetailsModel.admissionDateVal = this.datePipe.transform(this.ginstitutionBasicDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
        }
        if (this.ginstitutionBasicDetailsModel.registrationDate != null && this.ginstitutionBasicDetailsModel.registrationDate != undefined) {
          this.ginstitutionBasicDetailsModel.registrationDateVal = this.datePipe.transform(this.ginstitutionBasicDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
        }
        if (this.ginstitutionBasicDetailsModel.resolutionCopyPath != null && this.ginstitutionBasicDetailsModel.resolutionCopyPath != undefined) {
          this.ginstitutionBasicDetailsModel.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.ginstitutionBasicDetailsModel.resolutionCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.ginstitutionBasicDetailsModel.resolutionCopyPath  );
        }
        if (this.ginstitutionBasicDetailsModel.applicationCopyPath != null && this.ginstitutionBasicDetailsModel.applicationCopyPath != undefined) {
          this.ginstitutionBasicDetailsModel.applicationCopyList = this.fileUploadService.getFile(this.ginstitutionBasicDetailsModel.applicationCopyPath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.ginstitutionBasicDetailsModel.applicationCopyPath  );
        }
        this.institutePromoterDetails.institutionId = this.ginstitutionBasicDetailsModel.id
        if (this.ginstitutionBasicDetailsModel.institutionPromoterList != null && this.ginstitutionBasicDetailsModel.institutionPromoterList != undefined &&this.ginstitutionBasicDetailsModel.institutionPromoterList.length > 0) {
          this.promoterDetails = this.ginstitutionBasicDetailsModel.institutionPromoterList.map((member: any) => {
            member.memDobVal = this.datePipe.transform(member.dob, this.orgnizationSetting.datePipe);
            member.startDateVal = this.datePipe.transform(member.startDate, this.orgnizationSetting.datePipe);

            if (member.uploadImage != null && member.uploadImage != undefined) {
              member.multipartFileListForPhotoCopy = this.fileUploadService.getFile(member.uploadImage ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + member.uploadImage );
            }
            if (member.uploadSignature != null && member.uploadSignature != undefined) {
              member.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(member.uploadSignature ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + member.uploadSignature  );
            }
            
            if (member.authorizedSignatory != null && member.authorizedSignatory != undefined)
              this.getSignatureUpload(member);
            
             return member;
          });
            
          
        }
        this.uploadSignature = true;
      }
      this.updateData();
    });
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
        this.subProductList = this.responseModel.data.filter((customertype:any) => customertype.status == applicationConstants.ACTIVE).map((count:any) => {
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
 
  save() {
    this.updateData();
  }
  editVillageRow(row: any) {
    this.getSignatureUpload(row);
    this.addButton = true;
    this.EditDeleteDisable = true;
    this.buttonsFlag  = false;
    this.landFlag =false
    this.updateData();
    this. getAllOperatorType();
  }
  addNewEntry() {
    this.newRow = {uniqueId: this.promoterDetails.length + 1,surname: '', name: '', operatorTypeId: '',dob: '', age: '',genderId:'', martialId: '',mobileNumber:'', emailId: '',aadharNumber:'',startDate:'' }
  }
  onRowEditSave() {

    this.addNewEntry();
    this.cancleButtonFlag = true;
    let uniqueId = this.promoterDetails.length + 1;
    // this.promoterDetailsModel = new promoterDetailsModel();
    this.EditDeleteDisable = true;
    this.addButton = true;
    this.buttonsFlag  = false;
    this.landFlag =false
    this.uploadSignature = true;
    this.updateData();
    this.dt._first = 0;
    this.dt.value.unshift(this.newRow);
    this.dt.initRowEdit(this.dt.value[0]);
    this. getAllOperatorType()
  }
  onRowEditCancel() {
    this.addButton = false;
    this.EditDeleteDisable = false;
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
  getAllOperatorType() {
    this.commonComponent.startSpinner();
    this.operatorTypeService.getAllOperationTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != undefined && this.responseModel.data != null && this.responseModel.data.length > 0) {

          this.operatorTypeList = this.responseModel.data.filter((customertype: any) => customertype.status == applicationConstants.ACTIVE).map((count: any) => {
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
  savePromoterDetails(rowData: any) {
    if (rowData.memDobVal != undefined && rowData.memDobVal != null)
      rowData.dob = this.commonFunctionsService.getUTCEpoch(new Date(rowData.memDobVal));

    if (rowData.startDateVal != undefined && rowData.startDateVal != null)
      rowData.startDate = this.commonFunctionsService.getUTCEpoch(new Date(rowData.startDateVal));

    if (this.ginstitutionBasicDetailsModel.id == null && this.ginstitutionBasicDetailsModel.id == undefined) {
      rowData.pacsId = 1;
      rowData.branchId = 1;
      if (null != rowData.dob)
        rowData.memDobVal = this.datePipe.transform(rowData.dob, this.orgnizationSetting.datePipe);
      if (null != rowData.startDate)
        rowData.startDateVal = this.datePipe.transform(rowData.startDate, this.orgnizationSetting.datePipe);

      this.operatorTypeList.filter(data => data != null && data.value == rowData.operatorTypeId).map(count => {
        rowData.operatorTypeName = count.label;
      })
      this.genderList.filter(data => data != null && data.value == rowData.genderId).map(count => {
        rowData.genderTypeName = count.label;
      })

      this.maritalStatusList.filter(data => data != null && data.value == rowData.martialId).map(count => {
        rowData.maritalStatusName = count.label;
      })
      this.addButton = false;
      this.EditDeleteDisable = false;

      if (!this.ginstitutionBasicDetailsModel.institutionPromoterList) {
        this.ginstitutionBasicDetailsModel.institutionPromoterList = []; // Initialize it as an empty array
      }
      const recordIndex = this.ginstitutionBasicDetailsModel.institutionPromoterList.findIndex((promoter:any) => promoter.id === rowData.id);
      if (recordIndex === -1) {
        rowData.rowEdit = this.rowEdit++
      this.ginstitutionBasicDetailsModel.institutionPromoterList.push(rowData);
      this.promoterDetails = this.ginstitutionBasicDetailsModel.institutionPromoterList.map((x: any) => Object.assign({}, x)); 

      if(this.promoterDetails != null && this.promoterDetails.length > 0){
        this.promoterDetails = this.promoterDetails.map((member: any) => {
          member.memDobVal = this.datePipe.transform(member.dob, this.orgnizationSetting.datePipe);
          member.startDateVal = this.datePipe.transform(member.startDate, this.orgnizationSetting.datePipe);
  
          if (member.uploadImage != null && member.uploadImage != undefined) {
            member.multipartFileListForPhotoCopy = this.fileUploadService.getFile(member.uploadImage ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + member.uploadImage );
          }
          if (member.uploadSignature != null && member.uploadSignature != undefined) {
            member.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(member.uploadSignature ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + member.uploadSignature  );
          }
           return member;
        });
      }
      this.buttonsFlag = true;
      this.landFlag = true;
      this.updateData();
      }
      else{
        this.promoterDetails[recordIndex] = rowData;
        this.buttonsFlag  = true;
        if (rowData.uploadImage != null && rowData.uploadImage != undefined) {
          rowData.multipartFileListForPhotoCopy = this.fileUploadService.getFile(rowData.uploadImage ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + rowData.uploadImage );
        }
        if (rowData.uploadSignature != null && rowData.uploadSignature != undefined) {
          rowData.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(rowData.uploadSignature ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + rowData.uploadSignature  );
        }
        this.updateData();
      }
    } else {
      this.saveOrUpdatePromoterDetailsDetails(rowData);
    }
  }
  saveOrUpdatePromoterDetailsDetails(rowData: any) {
    rowData.pacsId = 1;
    rowData.branchId = 1;
    rowData.institutionId = this.ginstitutionBasicDetailsModel.id;
    this.addButton = false;
    this.EditDeleteDisable = false;
    this.operatorTypeList.filter(data => data != null && data.value == rowData.occupationId).map(count => {
      rowData.occupationName = count.label;
    })
    if (rowData.id != null) {
      this.institutionPromoterDetailsService.updateInstitutionPromoterDetails(rowData).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.buttonsFlag  = true;
          this.landFlag =true;;
          this.updateData();
          if (null != rowData.dob)
            rowData.memDobVal = this.datePipe.transform(rowData.dob, this.orgnizationSetting.datePipe);
  
          if (null != rowData.startDate)
            rowData.startDateVal = this.datePipe.transform(rowData.startDate, this.orgnizationSetting.datePipe);
  
          this.operatorTypeList.filter(data => data != null && data.value == rowData.operatorTypeId).map(count => {
            rowData.operatorTypeName = count.label;
          })
          this.genderList.filter(data => data != null && data.value == rowData.genderId).map(count => {
            rowData.genderTypeName = count.label;
          })
        
          this.maritalStatusList.filter(data => data != null && data.value == rowData.martialId).map(count => {
            rowData.maritalStatusName = count.label;
          })

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
        this.getMembershipInstituionDetailsById(rowData.institutionId);
      },
        error => {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        });
    } else {
      this.institutionPromoterDetailsService.addInstitutionPromoterDetails(rowData).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          rowData= this.responseModel.data[0]
          if (null != this.responseModel.data[0].dob)
            this.responseModel.data[0].memDobVal = this.datePipe.transform(this.responseModel.data[0].dob, this.orgnizationSetting.datePipe);
          this.buttonsFlag  = true;
          this.landFlag =true;
          this.promoterDetails.unshift(this.responseModel.data[0]);
          this.promoterDetails.splice(1, 1);
          this.updateData();
          if (null != rowData.dob)
            rowData.memDobVal = this.datePipe.transform(rowData.dob, this.orgnizationSetting.datePipe);
  
          if (null != rowData.startDate)
            rowData.startDateVal = this.datePipe.transform(rowData.startDate, this.orgnizationSetting.datePipe);
  
          this.operatorTypeList.filter(data => data != null && data.value == rowData.operatorTypeId).map(count => {
            rowData.operatorTypeName = count.label;
          })
          this.genderList.filter(data => data != null && data.value == rowData.genderId).map(count => {
            rowData.genderTypeName = count.label;
          })
        
          this.maritalStatusList.filter(data => data != null && data.value == rowData.martialId).map(count => {
            rowData.maritalStatusName = count.label;
          })
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
        this.getMembershipInstituionDetailsById(rowData.institutionId);
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
  
  generateNewAdmissionNumber(): void {
    this.admissionNumber = this.generateAdmissionNumber();
    this.ginstitutionBasicDetailsModel.admissionNumber =this.admissionNumber
  }
  generateAdmissionNumber(): string {
    // Generate a random 12-digit number
    const admissionNumber = Math.floor(100000000000 + Math.random() * 900000000000);
    return admissionNumber.toString();
  }

  fileUploader(event: any, fileUpload: FileUpload, filePathName: any) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    if (this.isEdit && this.ginstitutionBasicDetailsModel.filesDTOList == null || this.ginstitutionBasicDetailsModel.filesDTOList == undefined) {
      this.ginstitutionBasicDetailsModel.filesDTOList = [];
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
        if(filePathName == "resolutionCopyPath"){
          this.ginstitutionBasicDetailsModel.multipartFileListForPhotoCopy = [];
          this.ginstitutionBasicDetailsModel.filesDTOList.push(files);
          this.ginstitutionBasicDetailsModel.resolutionCopyPath = null;
          this.ginstitutionBasicDetailsModel.filesDTOList[this.ginstitutionBasicDetailsModel.filesDTOList.length - 1].fileName = "Institution_Resolution_Copy" + "_" + timeStamp + "_" + file.name;
          this.ginstitutionBasicDetailsModel.resolutionCopyPath = "Institution_Resolution_Copy" + "_" + timeStamp + "_" + file.name;
        }
        if(filePathName == "applicationCopyPath"){
          this.ginstitutionBasicDetailsModel.applicationCopyList = [];
          this.ginstitutionBasicDetailsModel.filesDTOList.push(files);
          this.ginstitutionBasicDetailsModel.applicationCopyPath = null;
          this.ginstitutionBasicDetailsModel.filesDTOList[this.ginstitutionBasicDetailsModel.filesDTOList.length - 1].fileName = "Institution_Resolution_Copy" + "_" + timeStamp + "_" + file.name;
          this.ginstitutionBasicDetailsModel.applicationCopyPath = "Institution_Resolution_Copy" + "_" + timeStamp + "_" + file.name;
        }
        this.updateData();
      }
      reader.readAsDataURL(file);
    }
  }
 
  fileUploadersForPromoter(event: any, fileUpload: FileUpload, filePathName: any,rowData:any) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    if(this.isEdit && rowData.filesDTOList == null || rowData.filesDTOList == undefined){
      rowData.filesDTOList = [];
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
          rowData.multipartFileListForPhotoCopy = [];
          rowData.filesDTOList.push(files);
          rowData.uploadImage = null;
          rowData.filesDTOList[rowData.filesDTOList.length - 1].fileName = "institution_Promoter_Photo_Copy" + "_" + timeStamp + "_" + file.name;
          rowData.uploadImage = "institution_Promoter_Photo_Copy" + "_" + timeStamp + "_" + file.name; 
        }
        if (filePathName === "signaturePath") {
          rowData.multipartFileListForsignatureCopyPath = [];
          rowData.filesDTOList.push(files);
          rowData.uploadSignature = null;
          rowData.filesDTOList[rowData.filesDTOList.length - 1].fileName = "Institutiom_Promoter_Signature_Copy" + "_" + timeStamp + "_" + file.name;
          rowData.uploadSignature = "Institutiom_Promoter_Signature_Copy" + "_" + timeStamp + "_" + file.name; 
        }
        
        this.updateData();
      }
      reader.readAsDataURL(file);
    }
  }
  fileRemoveEvent() {
    if (this.ginstitutionBasicDetailsModel.filesDTOList != null && this.ginstitutionBasicDetailsModel.filesDTOList != undefined && this.ginstitutionBasicDetailsModel.filesDTOList.length > 0) {
      let removeFileIndex = this.ginstitutionBasicDetailsModel.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.ginstitutionBasicDetailsModel.resolutionCopyPath);
      this.ginstitutionBasicDetailsModel.filesDTOList.splice(removeFileIndex, 1);
      this.ginstitutionBasicDetailsModel.resolutionCopyPath = null;
  }
}
  fileRemoveEventForPromoter(fileName: any, rowData: any) {
    if (rowData.filesDTOList != null && rowData.filesDTOList != undefined && rowData.filesDTOList.length > 0) {
      if (fileName == "photoCopyPath") {
        let removeFileIndex = rowData.filesDTOList.findIndex((obj: any) => obj && obj.fileName === rowData.uploadImage);
        rowData.filesDTOList.splice(removeFileIndex, 1);
        rowData.uploadImage = null;
      }
      else if (fileName == "signaturePath") {
        let removeFileIndex = rowData.filesDTOList.findIndex((obj: any) => obj && obj.fileName === rowData.uploadSignature);
        rowData.filesDTOList.splice(removeFileIndex, 1);
        rowData.uploadSignature = null;
      }
    }
  }
  getSignatureUpload(rowdata:any){
    let data =rowdata.authorizedSignatory ;
      if(data == applicationConstants.TRUE){
        this.uploadSignature = false;
      }
      else if(data == applicationConstants.FALSE){
        this.uploadSignature = true;
      }
      else{
          this.uploadSignature = true;
      }
  }
}
  
