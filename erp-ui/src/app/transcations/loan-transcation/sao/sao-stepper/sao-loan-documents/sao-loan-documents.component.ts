import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SaoLoanApplicationService } from '../../../shared/sao-loans/sao-loan-application.service';
import { SaoLoanApplication } from '../../shared/sao-loan-application.model';
import { MembershipBasicDetailsService } from '../membership-basic-details/shared/membership-basic-details.service';
import { DatePipe } from '@angular/common';
import { SaoKycService } from '../sao-kyc/shared/sao-kyc.service';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { SaoLoanDocument } from './shared/sao-loan-document.model';
import { SaoLoanDocumentsDetailsService } from './shared/sao-loan-documents-details.service';

@Component({
  selector: 'app-sao-loan-documents',
  templateUrl: './sao-loan-documents.component.html',
  styleUrls: ['./sao-loan-documents.component.css']
})
export class SaoLoanDocumentsComponent {
  @ViewChild('dt', { static: false })
  private dt!: Table;
  documentForm: FormGroup;
  date: Date | undefined;
  documentModelList: any[] = [];
  displayDialog: boolean = false;
  admissionnumber: any;
  addButton: boolean = false;
  gridList: any[] = [];
  carrats: any[] | undefined;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: boolean = false;
  buttonDisabled: boolean = false;
  loanId: any;
  docFilesList: any[] = [];
  documentNameList: any[] = [];
  multipleFilesList: any[] = [];
  addDocumentOfKycFalg: boolean = false;
  editDocumentOfKycFalg: boolean = false;
  veiwCardHide: boolean = false;
  editButtonDisable: boolean = false;
  isFileUploaded: boolean = false;
  addDocumentButton: boolean = false;
  uploadFileData: any;
  orgnizationSetting: any;
  admissionNumber: any;
  editIndex: any;
  saoLoanDocumentModel: SaoLoanDocument = new SaoLoanDocument();
  saoLoanApplicationModel: SaoLoanApplication = new SaoLoanApplication();
  memberTypeName: any;
  memberTypeId: any;
  memberId: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private saoLoanDocumentsDetailsService: SaoLoanDocumentsDetailsService, private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent, private encryptDecryptService: EncryptDecryptService, private saoLoanApplicationService: SaoLoanApplicationService,
    private membershipBasicDetailsService: MembershipBasicDetailsService, private datePipe: DatePipe,private fileUploadService : FileUploadService) {
    this.documentForm = this.formBuilder.group({
      'documentTypeName': new FormControl(''),
      'documentNo': new FormControl(''),
      'filePath': new FormControl(''),
      'remarks': new FormControl(''),
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        this.loanId = Number(this.encryptDecryptService.decrypt(params['id']));
        this.getAllSaoLoanDocumentsDetailsByApplicationId(this.loanId);
        this.isEdit = true;
       
      } else {
        this.isEdit = false;
      }
    })
    this.updateData();
    this.getApplicationDetailsById(this.loanId);
    this.getAllDocumentTypes();
  }
  updateData() {
    this.saoLoanDocumentModel.saoLoanApplicationId = this.loanId;
    this.saoLoanApplicationService.changeData({
      formValid: !this.documentForm.valid ? true : false,
      data: this.saoLoanDocumentModel,
      isDisable: (!this.documentForm.valid),
      // isDisable:false,
      stepperIndex: 4,
    });
  }
  save() {
    this.updateData();
  }
  //@akhila
  //add document
  addDocument(event: any) {
    this.getAllDocumentTypes();
    this.multipleFilesList = [];
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = true;
    this.editButtonDisable = true;
    this.saoLoanDocumentModel = new SaoLoanDocument;
    this.updateData();
  }
  //add save
  saveDocument(row: any) {
    this.saoLoanDocumentModel.saoLoanApplicationId = this.loanId;
    this.saoLoanDocumentModel.admissionNumber = this.admissionNumber;
    this.saoLoanDocumentModel.memberTypeName  = this.memberTypeName;
    this.saoLoanDocumentModel.memberType  = this.memberTypeId;
    this.saoLoanDocumentModel.memberId  = this.memberId;
    if(this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0){
      let filteredObj = this.documentNameList.find((data: any) => null != data && data.value == this.saoLoanDocumentModel.documentTypeName);
      if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined){
        this.saoLoanDocumentModel.documentTypeName = filteredObj.label;
      }
      if (filteredObj != null && undefined != filteredObj && filteredObj.value != null && filteredObj.value != undefined){
        this.saoLoanDocumentModel.documentType = filteredObj.value;
      }
    }
    this.saoLoanDocumentsDetailsService.addSaoLoanDocumentsDetails(this.saoLoanDocumentModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.saoLoanDocumentModel = this.responseModel.data[0];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1200);
      }else {
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
      this.addDocumentButton = false;
      this.buttonDisabled = false;
      this.getAllSaoLoanDocumentsDetailsByApplicationId(this.loanId);
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
    this.addDocumentOfKycFalg = false;
    this.editButtonDisable = false;
  }
  //get document details by document id for edit purpose
  getDocumentDetailsById(id: any) {
    this.getAllDocumentTypes();
    this.saoLoanDocumentsDetailsService.getSaoLoanDocumentsDetailsById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.saoLoanDocumentModel = this.responseModel.data[0];
              if (this.saoLoanDocumentModel.filePath != undefined) {
                let multipleFilesListForView = [];
                let file = new FileUploadModel();
                file.imageValue = ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.saoLoanDocumentModel.filePath;
                let objects = this.saoLoanDocumentModel.filePath.split('.');
                file.fileType = objects[objects.length - 1];
                let name = this.saoLoanDocumentModel.filePath.replace(/ /g, "_");
                file.fileName = name
                multipleFilesListForView.push(file);
                this.saoLoanDocumentModel.multipartFileList = multipleFilesListForView;
              }
            }
          }
        }
      }
    });
  }

  toggleEditForm(index: number, modelData: any): void {
    if (this.editIndex === index) {
      this.editIndex = index;
    } else {
      this.editIndex = index;
    }
    this.editButtonDisable = true;
    this.buttonDisabled = true;
    this.veiwCardHide = false;
    this.editDocumentOfKycFalg = false;
    this.addDocumentOfKycFalg = false;
    this.getAllDocumentTypes();
    this.getDocumentDetailsById(modelData.id);

    this.updateData();

  }
  //delete document
  delete(rowData: any) {
    this.saoLoanDocumentsDetailsService.deleteSaoLoanDocumentsDetails(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.documentModelList = this.responseModel.data;
          this.getAllSaoLoanDocumentsDetailsByApplicationId(this.loanId);
      }
    });
  }
   //edit cancle
  editCancle() {
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
      this.getAllSaoLoanDocumentsDetailsByApplicationId(this.loanId);
    
    this.updateData();
  }

   //edit kyc save
   editsave(row: any) {
    this.saoLoanDocumentModel.saoLoanApplicationId = this.loanId;
    if(this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0){
      let filteredObj = this.documentNameList.find((data: any) => null != data && this.saoLoanDocumentModel.documentType != null && data.value == this.saoLoanDocumentModel.documentType);
      if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined){
        this.saoLoanDocumentModel.documentTypeName = filteredObj.label;
      }
    }
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.saoLoanDocumentsDetailsService.updateSaoLoanDocumentsDetails(this.saoLoanDocumentModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        // this.kycModelList = this.responseModel.data;
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
      }
      else {
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
     // this.addButton = false;
      this.buttonDisabled = false;
      this.updateData();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
   //add cancle 
  cancel() {
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.getAllSaoLoanDocumentsDetailsByApplicationId(this.loanId);
    this.updateData();
  }
  //image upload and document path save
  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    this.saoLoanDocumentModel.filesDTOList = [];
    this.saoLoanDocumentModel.filePath = null;
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
          this.saoLoanDocumentModel.filesDTOList.push(files); // Add to filesDTOList array
        }
        let timeStamp = this.commonComponent.getTimeStamp();
        this.saoLoanDocumentModel.filesDTOList[0].fileName = "LOAN_DOCUMENT_" + this.loanId + "_" +timeStamp+ "_"+ file.name ;
        this.saoLoanDocumentModel.filePath = "LOAN_DOCUMENT_" + this.loanId + "_" +timeStamp+"_"+ file.name; // This will set the last file's name as docPath
        let index1 = event.files.findIndex((x: any) => x === file);
        fileUpload.remove(event, index1);
        fileUpload.clear();
      }
      reader.readAsDataURL(file);
    }
  }
  getAllDocumentTypes() {
    this.saoLoanDocumentsDetailsService.getAllDocumentTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined ) {
          this.documentNameList = this.responseModel.data
          this.documentNameList = this.responseModel.data.filter((kyc: any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });
        let  nominee = this.documentNameList.find((data: any) => null != data && this.saoLoanDocumentModel.documentType  != null && data.value == this.saoLoanDocumentModel.documentType);
          if (nominee != null && undefined != nominee && nominee.label != null && nominee.label != undefined){
                this.saoLoanDocumentModel.documentTypeName = nominee.label;
            }
         }
      }
    });
  }
 

  //get all document details by loan application id
  getAllSaoLoanDocumentsDetailsByApplicationId(loanId: any) {
    this.saoLoanDocumentsDetailsService.getSaoLoanDocumentsDetailsByApplicationId(loanId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.documentModelList = this.responseModel.data;
            if (this.documentModelList.length > 0 &&  this.documentModelList != null && this.documentModelList != undefined) {
              this.editDocumentOfKycFalg = true;
              for (let kyc of this.documentModelList) {
                this.buttonDisabled = false;
                if(kyc.filePath != null && kyc.filePath != undefined){
                  kyc.multipartFileList  = this.fileUploadService.getFile(kyc.filePath ,ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.filePath);
                }
                this.updateData();
              }
            }
            else{
              this.addDocumentOfKycFalg = true;
              this.buttonDisabled = true;
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
      }, 3000);
    });
  }

  getApplicationDetailsById(id: any) {
    this.saoLoanApplicationService.getSaoLoanApplicationDetailsById(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.saoLoanApplicationModel = this.responseModel.data[0];
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
  fileRemoeEvent(){
    if(this.saoLoanDocumentModel.filesDTOList != null && this.saoLoanDocumentModel.filesDTOList != undefined && this.saoLoanDocumentModel.filesDTOList.length > 0){
     let removeFileIndex = this.saoLoanDocumentModel.filesDTOList.findIndex((obj:any) => obj && obj.fileName === this.saoLoanDocumentModel.filePath);
     if(removeFileIndex != null && removeFileIndex != undefined){
       this.saoLoanDocumentModel.filesDTOList[removeFileIndex] = null;
       this.saoLoanDocumentModel.filePath = null;
     }
    }
   }
}
