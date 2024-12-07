import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SaoKycService } from './shared/sao-kyc.service';
import { SaoLoanApplicationService } from '../../../shared/sao-loans/sao-loan-application.service';
import { SaoKyc } from './shared/sao-kyc.model';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { FileUpload } from 'primeng/fileupload';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { SaoLoanApplication } from '../../shared/sao-loan-application.model';
import { IndividualMemberDetailsModel } from '../membership-basic-details/shared/membership-basic-details.model';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sao-kyc',
  templateUrl: './sao-kyc.component.html',
  styleUrls: ['./sao-kyc.component.css']
})
export class SaoKycComponent {
  kycForm: FormGroup;
  gender: any[] | undefined;
  admissionnumber:any;
  applicationType: any;
  msgs: any[] = [] ;
  responseModel!: Responsemodel;
  minBalence: any;
  kycModelList: any[] = [];
  adhaarFilesList: any[] = [];
  signFilesList: any[] = [];
  panFilesList: any[] = [];
  multipleFilesList: any[] = [];
  uploadFileData: any;
  isFileUploaded: boolean = false;
  uploadFlag: boolean = true;
  submitFlag: boolean = false;
 
  documentsData: any[] = [];
  displayPosition: boolean = false;
  documentNameList: any[] = [];
  position: any;
  docFilesList: any[] = [];
  buttonDisabled: boolean = false;
  isEdit: any;
  
  filesList: any[] = [];
  orgnizationSetting: any;
  exerciseFileList: any[] = [];
  lastDot = applicationConstants.LAST_DOT;
  memberId: any;
  kycListByMemberId: any[] = [];
  typeFlag: boolean = false;
  addKycButton: boolean = false;

  addDocumentOfKycFalg: boolean = false;

  editDocumentOfKycFalg: boolean = false;

  veiwCardHide : boolean = false;
  loanId:any;
  fileName: any;
  @ViewChild('cv', { static: false })
  private cv!: Table;
  editIndex: any;
  afterEditCancleFalg: boolean = false;

  editButtonDisable : boolean = false ;
  saoLoanApplicationModel: SaoLoanApplication = new SaoLoanApplication();
  individualMemberDetailsModel: IndividualMemberDetailsModel = new IndividualMemberDetailsModel();
  saoKycModel : SaoKyc = new SaoKyc();
  memberTypeId: any;
  individualFlag: boolean = false;
  groupFlag: boolean = false;
  institutionFlag: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder,private saoKycService : SaoKycService,private saoLoanApplicationService : SaoLoanApplicationService,
    private commonComponent : CommonComponent  ,private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService ,
    private membershipBasicDetailsService: MembershipBasicDetailsService,private datePipe: DatePipe
  )
  { 
    this.kycForm = this.formBuilder.group({
     'documentNumber': new FormControl('', [Validators.required, Validators.pattern(/^[^\s]+(\s.*)?$/)]),
     'kycDocumentTypeName': new FormControl('', Validators.required),
     'kycFilePath': new FormControl(''),
    })
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    if (this.documentsData.length >= 1) {
      this.uploadFlag = true;
    }

    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined,params['admissionNumber'] != undefined) {
        this.commonComponent.startSpinner();
        this.admissionnumber = this.encryptDecryptService.decrypt(params['admissionNumber']);
        let queryParams = this.encryptDecryptService.decrypt(params['id']);
        let qParams = queryParams;
        this.loanId = qParams;
      
        this.isEdit = true;
      }
      else{
        this.updateData();
      }
    });
    this.buttonDisabled = false;
    
    this.getAllKycTypes();
    this.getMemberDetailsByApplicationId(this.loanId);
    this.kycForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.kycForm.valid) {
        this.save();
      }
    });
  }
  //@akhila
  // get all kyc details based on admission number From membership module
  getAllKycDetailsByAdmissionNumber(admisionNumber: any){
    this.saoKycService.getAllKycsDetailsByAdmissionNumber(admisionNumber).subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if(this.responseModel.data[0] != null && this.responseModel.data[0]  != undefined){
          this.kycModelList = this.responseModel.data;
          if(this.kycModelList != null && this.kycModelList != undefined){
            this.editDocumentOfKycFalg = true;
            for (let kyc of this.kycModelList) {
              let multipleFilesList = [];
              let file = new FileUploadModel();
              file.imageValue = ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath;
              let objects = kyc.kycFilePath.split('.');
              file.fileType = objects[objects.length - 1];
              let name = kyc.kycFilePath.replace(/ /g, "_");
              file.fileName = name
              multipleFilesList.push(file);
              kyc.multipartFileList = multipleFilesList;
            }
          }
        }
      }
    });
  }
  
  save() {
    this.updateData();
  }
  updateData() {
    this.saoKycModel.loanId = this.loanId;
    this.saoLoanApplicationService.changeData({
      formValid: this.documentsData.length > 0 ? true : false,
      data: this.saoKycModel,
      isDisable: this.documentsData.length <= 0 ? true : false || this.uploadFlag,
      stepperIndex: 1,
    });
  }
  getAllKycTypes() {
    this.saoKycService.getAllKYCDocTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.documentNameList = this.responseModel.data.filter((kyc : any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });
      }
    });
  }
  addKyc(event : any){
    this.getAllKycTypes();
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = true;
    this.editButtonDisable  = true;
    this.saoKycModel = new SaoKyc;
  }
  addDocument() {
    this.commonComponent.startSpinner();
    this.buttonDisabled = applicationConstants.TRUE;
    this.saoKycModel.memberId = this.memberId;
    this.filesList = [];
    this.docFilesList.map(data => {
      this.filesList.push(data);
    });

    this.saoKycModel.filesDTOList = this.filesList;

    this.msgs = [];
   

  }
  toggleEditForm(index: number , modelData :any): void {
    if (this.editIndex === index) {
      this.editIndex = index;
    } else {
      this.editIndex = index;
    }
    this.editButtonDisable  = true;
    this.buttonDisabled = true;
    this.veiwCardHide = false;
    this.editDocumentOfKycFalg = false;
    this.addDocumentOfKycFalg = false;
    this.getKycById(modelData.id);

  }
  getKycById(id : any){
    this.saoKycService.getDocumentById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.saoKycModel = this.responseModel.data[0];
              if (this.saoKycModel.kycFilePath != undefined) {
                let multipleFilesListForView = [];
                let file = new FileUploadModel();
                file.imageValue = ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.saoKycModel.kycFilePath;
                let objects = this.saoKycModel.kycFilePath.split('.');
                file.fileType = objects[objects.length - 1];
                let name = this.saoKycModel.kycFilePath.replace(/ /g, "_");
                file.fileName = name
                multipleFilesListForView.push(file);
                this.saoKycModel.multipartFileList = multipleFilesListForView;
              }
            }
          }
        }
      }
    });
  }
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileName = file.name;
    }
  }
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileName = file.name;
    }
  }
  editCancle(){
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable  = false;
    //this.getAllKycDetailsByAdmissionNumber(this.admissionnumber);
  }
  editsave(row:any){
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable  = false;
    this.saoKycService.updateDocument(this.saoKycModel).subscribe((response : any ) => {
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        this.kycModelList = this.responseModel.data;
      }
      this.addKycButton = false;
      this.buttonDisabled = false;
      //this.getAllKycDetailsByAdmissionNumber(this.admissionnumber);
  });
    
  }
  cancel(){
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    //this.getAllKycDetailsByAdmissionNumber(this.admissionnumber);
  }
  saveKyc(){
    this.saoKycModel.membershipId = this.loanId;
    
    this.saoKycService.addDocument(this.saoKycModel).subscribe((response : any ) => {
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        this.saoKycModel = this.responseModel.data[0];
      }
      this.addKycButton = false;
      this.buttonDisabled = false;
     //this.getAllKycDetailsByAdmissionNumber(this.responseModel.data[0].membershipId);
  });
      this.addDocumentOfKycFalg  = false;
      this.editButtonDisable = false;
  }
  onClick(){
    this.addDocumentOfKycFalg = true;
  }
  getDocumentNumber(kycDocumentType : any) {
    if (kycDocumentType == 1) {
      // this.saoKycModel.docNumber = this.memberModel.aadharNumber;
      // this.kycForm.get('documentNumber').setValidators([Validators.pattern(applicationConstants.AADHAR_PATTERN), Validators.maxLength(12), Validators.compose([Validators.required])]);
    }
    else if (kycDocumentType == 2) {
      // this.saoKycModel.docNumber = this.memberModel.pancardNumber;
      // this.kycForm.get('documentNumber').setValidators([Validators.pattern(applicationConstants.PAN_NUMBER_PATTERN), Validators.maxLength(10), Validators.compose([Validators.required])]);
    }
    else {
      // this.saoKycModel.docNumber = undefined;
      // this.kycForm.get('documentNumber').setValidators(Validators.compose([Validators.required]));
    }

    for (let obj of this.documentsData) {
      if (obj.kycDocumentType == kycDocumentType) {
        this.typeFlag = true;

        // this.msgs = [{ severity: 'error', detail: applicationConstants.KYC_DROPDOWN }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);

        break;
      }
      else {
        this.typeFlag = false;  
      }
    }
  }
  getDocument(kycDocumentType : any) {
    if (kycDocumentType == 1) {
      //this.kycModel.documentNumber = this.memberDetails.aadharNumber;
      // this.kycForm.get('documentNumber').setValidators([Validators.pattern(applicationConstants.AADHAR_PATTERN), Validators.maxLength(12), Validators.compose([Validators.required])]);
    }
    else if (kycDocumentType == 2) {
      //this.kycModel.documentNumber = this.memberDetails.pancardNumber;
      // this.kycForm.get('documentNumber').setValidators([Validators.pattern(applicationConstants.PAN_NUMBER_PATTERN), Validators.maxLength(10), Validators.compose([Validators.required])]);
    }
    else {
      //this.kycModel.documentNumber = undefined;
      // this.kycForm.get('documentNumber').setValidators(Validators.compose([Validators.required]));
    }
  }
  
  backToKyc() {
    this.displayPosition = false;
    this.uploadFlag = false;
    this.submitFlag = false;
    this.updateData();
  }

// uploading image
// akhila.m
  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    this.saoKycModel.filesDTOList = [];
    this.saoKycModel.kycFilePath = null;
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

        let index = this.multipleFilesList.findIndex(x => x.fileName == files.fileName);
        if (index === -1) {
          this.multipleFilesList.push(files);
          this.saoKycModel.filesDTOList.push(files); // Add to filesDTOList array
        }
        this.saoKycModel.filesDTOList[0].fileName = "SAO_KYC_" + this.loanId + "_" + file.name;
        this.saoKycModel.kycFilePath = "SAO_KYC_" + this.loanId + "_" + file.name; // This will set the last file's name as docPath
        let index1 = event.files.findIndex((x: any) => x === file);
        fileUpload.remove(event, index1);
        fileUpload.clear();
      }
      reader.readAsDataURL(file);
    }
  }
  getMemberDetailsByApplicationId(loanId:any){
    this.membershipBasicDetailsService.getMemberDetailsByLoanId(loanId).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.data[0].memberTypeName != null && this.responseModel.data[0].memberTypeName != undefined) {
            this.saoLoanApplicationModel = this.responseModel.data[0];
          }
          if (this.saoLoanApplicationModel.individualMemberDetailsDTO.dob != null && this.saoLoanApplicationModel.individualMemberDetailsDTO.dob != undefined) {
            this.saoLoanApplicationModel.individualMemberDetailsDTO.dobVal = this.datePipe.transform(this.saoLoanApplicationModel.individualMemberDetailsDTO.dob, this.orgnizationSetting.datePipe);
          }
          if (this.saoLoanApplicationModel.individualMemberDetailsDTO.admissionDate != null && this.saoLoanApplicationModel.individualMemberDetailsDTO.admissionDate != undefined) {
            this.saoLoanApplicationModel.individualMemberDetailsDTO.admissionDateVal = this.datePipe.transform(this.saoLoanApplicationModel.individualMemberDetailsDTO.admissionDate, this.orgnizationSetting.datePipe);
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
}
