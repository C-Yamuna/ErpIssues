import { Component, ViewChild } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CiAccountDetails } from '../ci-account-details/shared/ci-account-details.model';
import { CiBorrowingAccountMapping } from '../ci-borrowing-account-mapping/shared/ci-borrowing-account-mapping.model';
import { CiBorrowingDocuments } from './shared/ci-borrowing-documents.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Table } from 'primeng/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { CiAccountDetailsService } from '../ci-account-details/shared/ci-account-details.service';
import { CiBorrowingAccountMappingService } from '../ci-borrowing-account-mapping/shared/ci-borrowing-account-mapping.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CiBorrowingDocumentsService } from './shared/ci-borrowing-documents.service';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { FileUpload } from 'primeng/fileupload';
import { DocumentTypesService } from 'src/app/configurations/borrowing-config/document-types/shared/document-types.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';
@Component({
  selector: 'app-ci-borrowing-documents',
  templateUrl: './ci-borrowing-documents.component.html',
  styleUrls: ['./ci-borrowing-documents.component.css']
})
export class CiBorrowingDocumentsComponent {
  @ViewChild('dt', { static: false }) private dt!: Table

  borrowingdocumentform: FormGroup;
  ciborrowingAccountDetailsModel :CiAccountDetails = new CiAccountDetails();
  ciBorrowingAccountMappingModel:CiBorrowingAccountMapping = new CiBorrowingAccountMapping();
  ciBorrowingDocumentsModel:CiBorrowingDocuments = new CiBorrowingDocuments();
  borrowingAccountId: any  
  kycModelList: any[] = [];
  adhaarFilesList: any[] = [];
  signFilesList: any[] = [];
  panFilesList: any[] = [];
  uploadFileData: any;
  isFileUploaded: boolean = applicationConstants.FALSE;
  uploadFlag: boolean = applicationConstants.TRUE;
  submitFlag: boolean = applicationConstants.FALSE;
  columns: any[]=[];
  responseModel!: Responsemodel;
  documentsData: any[] = [];
  displayPosition: boolean = applicationConstants.FALSE;
  documentNameList: any[] = [];
  position: any;
  docFilesList: any[] = [];
  buttonDisbled: boolean =applicationConstants.FALSE;
  isEdit: any;
  msgs: any[]=[];
  filesList: any[] = [];
  orgnizationSetting: any;
  exerciseFileList: any[] = [];
  lastDot = applicationConstants.LAST_DOT;
  memberId: any;
  pacsId =1;
  branchId = 1;
  kycListByMemberId: any[] = [];
  typeFlag: boolean = applicationConstants.FALSE;
  editIndex: any;
  afterEditCancleFalg: boolean = applicationConstants.FALSE;

  editButtonDisable : boolean = applicationConstants.FALSE ;
  addDocumentOfKycFalg: boolean = applicationConstants.FALSE;

  editDocumentOfKycFalg: boolean = applicationConstants.FALSE;

  veiwCardHide : boolean = applicationConstants.FALSE;
  addKycButton: boolean =applicationConstants.FALSE;
  fileName: any;
  docTypeList: any[]=[];

  multipleFilesList: any[] = [];
  filesDTOList: any[] = [];
  landFlag: boolean = applicationConstants.FALSE;
  buttonsFlag: boolean = applicationConstants.TRUE;
  displayDialog: boolean  = applicationConstants.FALSE;
  id: any;
  deleteId: any;
  showAddButton: boolean = applicationConstants.FALSE;
  documentList: any[] = [];

  constructor(private router:Router, private formBuilder:FormBuilder,
    private ciAccountDetailsService : CiAccountDetailsService,
    private ciBorrowingAccountMappingService:CiBorrowingAccountMappingService,
    private commonComponent : CommonComponent  ,private activateRoute: ActivatedRoute, 
    private encryptService: EncryptDecryptService, private documentTypeService: DocumentTypesService,
    private datePipe: DatePipe,private fileUploadService : FileUploadService,
  
    private ciBorrowingDocumentsService :CiBorrowingDocumentsService){
      this.borrowingdocumentform = this.formBuilder.group({
        'documentType': new FormControl('', Validators.required),
        'documentNumber': new FormControl('',[Validators.required, Validators.pattern(/^[^\s]+(\s.*)?$/)]),
        'nameAsPerDocument': new FormControl('',Validators.required),
        // 'kycFilePath': new FormControl(''),
      });
    }
  
    ngOnInit(): void {
      this.orgnizationSetting = this.commonComponent.orgnizationSettings()
      this.activateRoute.queryParams.subscribe(params => {
        if (params['id'] != undefined) {
          this.commonComponent.startSpinner();
          this.borrowingAccountId = Number(this.encryptService.decrypt(params['id']));
          this.isEdit = applicationConstants.TRUE;
          this.getCiAccountDetailsById(this.borrowingAccountId);
        } else {
          this.isEdit = applicationConstants.FALSE;
        }
      }) 
      this.buttonDisbled = applicationConstants.FALSE;
      this.borrowingdocumentform.valueChanges.subscribe((data: any) => {
        this.updateData();
        if (this.borrowingdocumentform.valid) {
          this.save();
        }
      });
      this.save();
      // this.getCiAccountDetailsById(this.borrowingAccountId);
      this.getAllDocumnetsTypes();
    }
    updateData() {
      if (this.documentList != null && this.documentList != undefined &&
        this.documentList.length > 0 && this.buttonsFlag ) {
        this.landFlag = applicationConstants.TRUE;
      }
      this.ciBorrowingDocumentsModel.borrowingAccountId = this.borrowingAccountId;
      this.ciAccountDetailsService.changeData({
        formValid: this.landFlag,
        data: this.ciBorrowingDocumentsModel,
        stepperIndex: 2,
        isDisable: !this.borrowingdocumentform ? applicationConstants.TRUE : applicationConstants.FALSE,
      });
    }
    save() {
      this.updateData();
    }

       /**
   * @author vinitha
   * @implements get all documents
   */
       getAllDocumnetsTypes() {
        this.documentTypeService.getAllDocumentType().subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel != null && this.responseModel != undefined) {
            if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
              if ( this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
                this.docTypeList = this.responseModel.data;
                this.docTypeList = this.responseModel.data.filter((obj: any) => obj != null && obj.status == applicationConstants.ACTIVE).map((state: any) => {
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
    getCiAccountDetailsById(id: any) {
      this.isEdit = true;
      this.ciAccountDetailsService.getPreviewDataByCiBorrowingAccountId(id).subscribe(res => {
        this.responseModel = res;
        this.commonComponent.stopSpinner();
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
          this.showAddButton = applicationConstants.FALSE;
          this.ciborrowingAccountDetailsModel = this.responseModel.data[0];
          if(null!=this.ciborrowingAccountDetailsModel.requestedDate && undefined!=this.ciborrowingAccountDetailsModel.requestedDate)
            this.ciborrowingAccountDetailsModel.requestedDate = this.datePipe.transform(this.ciborrowingAccountDetailsModel.requestedDate, this.orgnizationSetting.datePipe);
          if (this.ciborrowingAccountDetailsModel && this.ciborrowingAccountDetailsModel.ciBorrowingAccountDocumentsDTOList != null && this.ciborrowingAccountDetailsModel.ciBorrowingAccountDocumentsDTOList != undefined &&
            this.ciborrowingAccountDetailsModel.ciBorrowingAccountDocumentsDTOList.length > 0) {
              this.documentList = this.ciborrowingAccountDetailsModel.ciBorrowingAccountDocumentsDTOList;
              this.documentList  = this.documentList.filter(obj => null != obj && null !=obj.status && obj.status === applicationConstants.ACTIVE ).map((kyc:any)=>{
                kyc.multipleFilesList = this.fileUploadService.getFile(kyc.documentPath ,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.documentPath);
                this.showAddButton = applicationConstants.TRUE;
                return kyc;
              });
              if(0  == this.documentList.length)
              {
                this.ciBorrowingDocumentsModel = new CiBorrowingDocuments()
                this.addDocumentOfKycFalg = applicationConstants.TRUE;
                this.buttonDisbled = applicationConstants.TRUE;
                this.buttonsFlag  = applicationConstants.FALSE;
                this.landFlag =applicationConstants.FALSE;
              }
            
          }
          else{
            this.showAddButton = applicationConstants.FALSE;
            this.addDocumentOfKycFalg = applicationConstants.TRUE;
            this.buttonDisbled = applicationConstants.TRUE;
          }
           
        }else {
          this.showAddButton = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
        // this.buttonDisbled = true;
        this.updateData();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
  
 
  onChangeDocumnetTypesChange() {
    let documnetTypes = this.docTypeList.find((data: any) => null != data && this.ciBorrowingDocumentsModel.documentType != null &&  data.value == this.ciBorrowingDocumentsModel.documentType);
    if (documnetTypes != null && undefined != documnetTypes)
    this.ciBorrowingDocumentsModel.documentTypeName = documnetTypes.label;
  }
  
   
  saveDocument(row : any){
    let documnetTypes = this.docTypeList.find((data: any) => null != data && row.documentType != null &&  data.value == row.documentType);
    if (documnetTypes != null && undefined != documnetTypes)
      row.documentTypeName = documnetTypes.label;
    if(this.ciBorrowingDocumentsModel.status == null && this.ciBorrowingDocumentsModel.status == undefined)
      this.ciBorrowingDocumentsModel.status = applicationConstants.ACTIVE;
      this.ciBorrowingDocumentsModel.borrowingAccountId = this.borrowingAccountId;
      this.ciBorrowingDocumentsService.addCiBorrowingDocuments(row).subscribe((response : any ) => {
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        this.buttonsFlag  = applicationConstants.TRUE;
        this.landFlag =applicationConstants.TRUE;;
        this.updateData();
        this.ciBorrowingDocumentsModel = this.responseModel.data[0];
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
      this.addKycButton = applicationConstants.FALSE;
      this.buttonDisbled = applicationConstants.FALSE;
      this.getCiAccountDetailsById(this.borrowingAccountId);
      this.updateData();
      
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
      this.addDocumentOfKycFalg  = applicationConstants.FALSE;
      this.editButtonDisable = applicationConstants.FALSE;
      this.updateData();
  }
  editsave(row:any){
    let documnetTypes = this.docTypeList.find((data: any) => null != data && row.documentType != null &&  data.value == row.documentType);
    if (documnetTypes != null && undefined != documnetTypes)
      row.documentTypeName = documnetTypes.label;
    if(this.ciBorrowingDocumentsModel.status == null && this.ciBorrowingDocumentsModel.status == undefined)
      this.ciBorrowingDocumentsModel.status = applicationConstants.ACTIVE;
      this.editDocumentOfKycFalg = applicationConstants.TRUE;
      this.buttonDisbled = applicationConstants.FALSE;
      this.editButtonDisable  = applicationConstants.FALSE;
      this.ciBorrowingDocumentsService.updateCiBorrowingDocuments(row).subscribe((response : any ) => {
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        this.buttonsFlag  = applicationConstants.TRUE;
        this.editButtonDisable  = applicationConstants.FALSE;
        // this.buttonDisbled = false;
        this.landFlag =applicationConstants.TRUE;;
        this.updateData();
        this.ciBorrowingDocumentsModel = this.responseModel.data;
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
      this.addKycButton = applicationConstants.FALSE;
      this.buttonDisbled = applicationConstants.FALSE;
      this.getCiAccountDetailsById(this.borrowingAccountId);
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
  addDocument(event : any){
    // this.getAllDocumnetsTypes();
    this.multipleFilesList = [];
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisbled = applicationConstants.TRUE;
    this.buttonsFlag  = applicationConstants.FALSE;
    this.landFlag =applicationConstants.FALSE;
    this.updateData();
    this.editButtonDisable  = applicationConstants.TRUE;
    this.ciBorrowingDocumentsModel = new CiBorrowingDocuments;
  }

  
  toggleEditForm(index: number , modelData :any): void {
    if (this.editIndex === index) {
      this.editIndex = index;
    } else {
      this.editIndex = index;
    }
    this.editButtonDisable  = applicationConstants.TRUE;
    this.buttonDisbled = applicationConstants.TRUE;
    this.buttonsFlag  = applicationConstants.FALSE;
    this.landFlag =applicationConstants.FALSE;
    // this.updateData();
    this.veiwCardHide = applicationConstants.FALSE;
    this.editDocumentOfKycFalg = applicationConstants.FALSE;
    this.addDocumentOfKycFalg = applicationConstants.FALSE;
    this.getCiBorrowingDocumentsById(modelData.id);
  }
  getCiBorrowingDocumentsById(id : any){
    this.ciBorrowingDocumentsService.getCiBorrowingDocumentsById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
          this.ciBorrowingDocumentsModel = this.responseModel.data[0];
          if(this.ciBorrowingDocumentsModel.documentPath != null && this.ciBorrowingDocumentsModel.documentPath != undefined){
            this.ciBorrowingDocumentsModel.multipleFilesList = this.fileUploadService.getFile(this.ciBorrowingDocumentsModel.documentPath ,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.ciBorrowingDocumentsModel.documentPath);

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
  cancel(){
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisbled = applicationConstants.FALSE;
    this.editButtonDisable = applicationConstants.FALSE;
    this.buttonsFlag  = applicationConstants.TRUE;
    this.landFlag =applicationConstants.TRUE;
    this.updateData();
    this.getCiAccountDetailsById(this.borrowingAccountId);
  }
  editCancle(){
    this.editDocumentOfKycFalg = applicationConstants.TRUE;
    this.buttonDisbled = applicationConstants.FALSE;
    this.editButtonDisable  = applicationConstants.FALSE;
    this.buttonsFlag  = applicationConstants.TRUE;
    this.landFlag =applicationConstants.TRUE;
    this.updateData();
    this.getCiAccountDetailsById(this.borrowingAccountId);
  }
  backToKyc() {
    this.displayPosition = applicationConstants.FALSE;
    this.uploadFlag = applicationConstants.FALSE;
    this.submitFlag = applicationConstants.FALSE;
    this.updateData();
  }
  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.ciBorrowingDocumentsModel.multipleFilesList = [];
    this.multipleFilesList = [];
    this.ciBorrowingDocumentsModel.filesDTOList = null; // Initialize as a single object
    this.ciBorrowingDocumentsModel.documentPath = null;
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
      filesDTO.fileName = "CI_BORROWING" + this.borrowingAccountId + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
      filesDTO.fileType = file.type.split('/')[1];
      filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
      filesDTO.imageValue = this.uploadFileData.result as string;
      this.filesDTOList = [filesDTO]
      this.ciBorrowingDocumentsModel.filesDTOList = this.filesDTOList;
      this.ciBorrowingDocumentsModel.documentPath = filesDTO.fileName;
      let index1 = event.files.indexOf(file);
      if (index1 > -1) {
        fileUpload.remove(event, index1);
      }
      fileUpload.clear();
    };

    reader.readAsDataURL(file);
  }
fileRemoveEvent() {
  this.ciBorrowingDocumentsModel.multipleFilesList = [];
  if (this.ciBorrowingDocumentsModel.filesDTOList != null && this.ciBorrowingDocumentsModel.filesDTOList != undefined) {
    this.ciBorrowingDocumentsModel.documentPath = null;
    this.ciBorrowingDocumentsModel.filesDTOList = null;
  }
}
  kycModelDuplicateCheck(kycDocTypeId:any){
    if(this.documentList != null && this.documentList != undefined && this.documentList.length > 0){
    let duplicate = this.documentList.find((obj:any) => obj && obj.documentType === kycDocTypeId );
    if (duplicate != null && duplicate != undefined) {
      this.borrowingdocumentform.reset();
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: "duplicate Kyc Types"}];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    } 
  }
  }
  delete(rowDataId: any) {
    this.ciBorrowingDocumentsService.deleteCiBorrowingDocuments(rowDataId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.documentList = this.responseModel.data;
          this.getCiAccountDetailsById(this.borrowingAccountId);
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
      else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.data.statusMsg }];
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
  deletDilogBox(rowData:any){
    this.displayDialog = true;
    if(rowData.id != null && rowData.id != undefined){
      this.deleteId = rowData.id;
    }
  }
  cancelForDialogBox() {
    this.displayDialog = applicationConstants.FALSE;
  }
  submitDelete(){
    if(this.deleteId != null && this.deleteId != undefined){
      this.delete(this.deleteId);
    }
    
    this.displayDialog = applicationConstants.FALSE;
  }

  

}
