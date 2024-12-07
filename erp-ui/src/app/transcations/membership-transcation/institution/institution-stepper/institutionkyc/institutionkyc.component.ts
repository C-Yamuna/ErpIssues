import { MemInstitutionService } from './../../../shared/mem-institution.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstiteKycDetailsModel, InstitutionBasicDetailsModel } from '../../../shared/institution-details.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { MemberBasicDetailsStepperService } from '../../../individual/shared/membership-individual-stepper.service';
import { InstitutionKycDetailsService } from '../../../shared/institution-kyc-details.service';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { KycDocumentTypesService } from 'src/app/configurations/common-config/kyc-document-types/shared/kyc-document-types.service';


@Component({
  selector: 'app-institutionkyc',
  templateUrl: './institutionkyc.component.html',
  styleUrls: ['./institutionkyc.component.css']
})
export class InstitutionkycComponent implements OnInit{
  kycForm: FormGroup;
  kycModel: InstiteKycDetailsModel = new InstiteKycDetailsModel();
  kycModelList: any[] = [];
  adhaarFilesList: any[] = [];
  signFilesList: any[] = [];
  panFilesList: any[] = [];
  uploadFileData: any;
  isFileUploaded: boolean = false;
  uploadFlag: boolean = true;
  submitFlag: boolean = false;
  columns: any[]=[];
  responseModel!: Responsemodel;
  documentsData: any[] = [];
  displayPosition: boolean = false;
  documentNameList: any[] = [];
  position: any;
  docFilesList: any[] = [];
  buttonDisabled: boolean =false;
  isEdit: any;
  msgs: any[]=[];
  filesList: any[] = [];
  orgnizationSetting: any;
  exerciseFileList: any[] = [];
  lastDot = applicationConstants.LAST_DOT;
  institutionId: any;
  pacsId =1;
  kycListByMemberId: any[] = [];
  institutionModel: InstitutionBasicDetailsModel = new InstitutionBasicDetailsModel();
  typeFlag: boolean = false;
  editIndex: any;
  afterEditCancleFalg: boolean = false;

  editButtonDisable : boolean = false ;
  addDocumentOfKycFalg: boolean = false;

  editDocumentOfKycFalg: boolean = false;

  veiwCardHide : boolean = false;
  addKycButton: boolean =false;
  fileName: any;
  docTypeList: any;
  multipleFilesList: any[]=[];
  id: any;
  displayDialog: boolean  = false;
  
  landFlag: boolean = false;
  deleteId: any;
  buttonsFlag: boolean = true;
  showButton: boolean = false;

  constructor(private router: Router,private formBuilder: FormBuilder,
    private memInistitutionsService: MemInstitutionService,
    private institutionKycDetailsService:InstitutionKycDetailsService,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,
    private documentTypeService:KycDocumentTypesService,private fileUploadService :FileUploadService,
    private memberBasicDetailsStepperService: MemberBasicDetailsStepperService) {
      this.kycForm = this.formBuilder.group({
        'kycDocumentTypeId': new FormControl('', Validators.required),
        'documentNumber': new FormControl('',Validators.required),
        'nameAsPerDocument': new FormControl('',Validators.required),
        'kycFilePath': new FormControl(''),
      });
    }
  
    ngOnInit(): void {
      if (this.documentsData.length >= 1) {
        this.uploadFlag = true;
      }
      this.activateRoute.queryParams.subscribe(params => {
        let encrypted = params['id'];
  
        if (encrypted != undefined) {
          if (encrypted) {
            this.isEdit = true;
            this.institutionId = Number(this.encryptService.decrypt(encrypted));
            this.getMembershipInstitutionDetailsById(this.institutionId);
            // this.getGroupDetailsById(this.institutionId);
            this.uploadFlag = false;
          } else {
            this.isEdit = false;
          }
        }
        this.updateData();
      });
  
      this.buttonDisabled = false;
    
      this.getAllDocumnetsTypes();
      this.updateData();
  
    }
    getMembershipInstitutionDetailsById(id: any) {
      this.isEdit = true;
      this.memInistitutionsService.getMemInstitutionById(id).subscribe(res => {
        this.responseModel = res;
        this.commonComponent.stopSpinner();
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
          this.institutionModel = this.responseModel.data[0];
          if (this.institutionModel && this.institutionModel.institutionKycDetailsDTOList != null && this.institutionModel.institutionKycDetailsDTOList != undefined &&
            this.institutionModel.institutionKycDetailsDTOList.length > 0) {
              this.showButton = true;
              this.kycModelList = this.institutionModel.institutionKycDetailsDTOList;
              this.kycModelList  = this.kycModelList.filter(obj => null != obj && null !=obj.status && obj.status === applicationConstants.ACTIVE).map((kyc:any)=>{
                kyc.multipleFilesList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                return kyc;
              });
              if(0  == this.kycModelList.length)
              {
                this.kycModel = new InstiteKycDetailsModel()
                this.addDocumentOfKycFalg = true;
                this.buttonDisabled = true;
  
              }
          }
          else{
            this.showButton = false;
            this.addDocumentOfKycFalg = true;
            this.buttonDisabled = true;
          }
           
        }else {
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
        this.updateData();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }
   
    //get all kyc documnet types 
    getAllDocumnetsTypes() {
      this.documentTypeService.getAllKycDocumentType().subscribe((response: any) => {
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
  
  // set document name
    onChangeDocumnetTypesChange() {
      let documnetTypes = this.docTypeList.find((data: any) => null != data && this.kycModel.kycDocumentTypeId != null &&  data.value == this.kycModel.kycDocumentTypeId);
      if (documnetTypes != null && undefined != documnetTypes)
      this.kycModel.kycDocumentTypeName = documnetTypes.label;
    }
  
    updateData() {
      if (this.kycModelList != null && this.kycModelList != undefined &&
        this.kycModelList.length > 0 && this.buttonsFlag ) {
        this.landFlag = true;
      }
      this.kycModel.institutionId = this.institutionId;
          this.memberBasicDetailsStepperService.changeData({
        formValid: this.kycForm.valid,
        data: this.kycModel,
        savedId: this.institutionId,
        stepperIndex: 1,
        isDisable: !this.landFlag ? true : false,
      });
    }
    navigateToBack(){
      this.router.navigate([]);
    }
  
    saveKyc(row : any){
      let documnetTypes = this.docTypeList.find((data: any) => null != data && row.kycDocumentTypeId != null &&  data.value == row.kycDocumentTypeId);
      if (documnetTypes != null && undefined != documnetTypes)
        row.kycDocumentTypeName = documnetTypes.label;
      if(this.kycModel.status == null && this.kycModel.status == undefined)
        this.kycModel.status = applicationConstants.ACTIVE;
        this.kycModel.institutionId = this.institutionId;
        this.kycModel.pacsId = 1;
        this.kycModel.branchId =1;
        this.institutionKycDetailsService.addInstitutionKycDetails(row).subscribe((response : any ) => {
        this.responseModel = response;
        if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
          this.buttonsFlag  = true;
          this.landFlag =true;;
          this.updateData();
          this.kycModel = this.responseModel.data[0];
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
        this.addKycButton = false;
        this.buttonDisabled = false;
        this.getMembershipInstitutionDetailsById(this.institutionId);
        this.updateData();
        
      }, error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
        this.addDocumentOfKycFalg  = false;
        this.editButtonDisable = false;
        this.updateData();
    }
    editsave(row:any){
      let documnetTypes = this.docTypeList.find((data: any) => null != data && row.kycDocumentTypeId != null &&  data.value == row.kycDocumentTypeId);
      if (documnetTypes != null && undefined != documnetTypes)
        row.kycDocumentTypeName = documnetTypes.label;
      if(this.kycModel.status == null && this.kycModel.status == undefined)
        this.kycModel.status = applicationConstants.ACTIVE;
      this.editDocumentOfKycFalg = true;
      this.buttonDisabled = false;
      this.editButtonDisable  = false;
      this.institutionKycDetailsService.updateInstitutionKycDetails(row).subscribe((response : any ) => {
        this.responseModel = response;
        if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
          this.buttonsFlag  = true;
          this.landFlag =true;;
          this.updateData();
          this.kycModel = this.responseModel.data;
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
        this.addKycButton = false;
        this.buttonDisabled = false;
        this.getMembershipInstitutionDetailsById(this.institutionId);
      }, error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      });
    }
    addKyc(event : any){
      // this.getAllDocumnetsTypes();
      this.multipleFilesList = [];
      this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
      this.buttonDisabled = true;
      this.editButtonDisable  = true;
      this.editButtonDisable  = true;
    this.buttonsFlag  = false;
      this.landFlag =false;
      this.updateData();
      this.kycModel = new InstiteKycDetailsModel;
    }
  
    
    toggleEditForm(index: number , modelData :any): void {
      if (this.editIndex === index) {
        this.editIndex = index;
      } else {
        this.editIndex = index;
      }
      this.editButtonDisable  = true;
      this.buttonDisabled = true;
      this.buttonsFlag  = false;
      this.landFlag =false;
      this.updateData();
      this.veiwCardHide = false;
      this.editDocumentOfKycFalg = false;
      this.addDocumentOfKycFalg = false;
      this.getKycById(modelData.id);
    }
    getKycById(id : any){
      this.institutionKycDetailsService.getInstitutionKycDetailsById(id).subscribe((data: any) => {
        this.responseModel = data;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
            this.kycModel = this.responseModel.data[0];
            if(this.kycModel.kycFilePath != null && this.kycModel.kycFilePath != undefined){
              this.kycModel.multipleFilesList = this.fileUploadService.getFile(this.kycModel.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.kycModel.kycFilePath);
  
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
      this.buttonDisabled = false;
      this.editButtonDisable = false;
      this.buttonsFlag  = true;
      this.landFlag =true;
      this.updateData();
      this.getMembershipInstitutionDetailsById(this.institutionId);
    }
    editCancle(){
      this.editDocumentOfKycFalg = true;
      this.buttonDisabled = false;
      this.editButtonDisable  = false;
      this.buttonsFlag  = true;
      this.landFlag =true;
      this.updateData();
      this.getMembershipInstitutionDetailsById(this.institutionId);
    }
    backToKyc() {
      this.displayPosition = false;
      this.uploadFlag = false;
      this.submitFlag = false;
      this.updateData();
    }
    imageUploader(event: any, fileUpload: FileUpload) {
      this.isFileUploaded = applicationConstants.FALSE;
      this.multipleFilesList = [];
      this.kycModel.multipleFilesList = [];
      this.kycModel.filesDTO = {}; // Initialize as a single object
      this.kycModel.kycFilePath = null;
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
        filesDTO.fileName = "INSTITUTION_KYC_" + this.institutionId + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
        filesDTO.fileType = file.type.split('/')[1];
        filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
        filesDTO.imageValue = this.uploadFileData.result as string;
        this.kycModel.filesDTO = filesDTO;
        this.kycModel.kycFilePath = filesDTO.fileName;
        let index1 = event.files.indexOf(file);
        if (index1 > -1) {
          fileUpload.remove(event, index1);
        }
        fileUpload.clear();
      };
  
      reader.readAsDataURL(file);
    }

    fileRemoveEvent() {
      this.kycModel.multipleFilesList = [];
      if (this.kycModel.filesDTO != null && this.kycModel.filesDTO != undefined) {
        this.kycModel.kycFilePath = null;
        this.kycModel.filesDTO = null;
      }
    }
    kycModelDuplicateCheck(kycDocTypeId:any){
      if(this.kycModelList != null && this.kycModelList != undefined && this.kycModelList.length > 0){
      let duplicate = this.kycModelList.find((obj:any) => obj && obj.kycDocumentTypeId === kycDocTypeId );
      if (duplicate != null && duplicate != undefined) {
        this.kycForm.reset();
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: "duplicate Kyc Types"}];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      } 
    }
    }
    delete(rowDataId: any) {
      this.institutionKycDetailsService.deleteInstitutionKycDetails(rowDataId).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.kycModelList = this.responseModel.data;
            this.getMembershipInstitutionDetailsById(this.institutionId);
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
      this.displayDialog = false;
    }
    submitDelete(){
      if(this.deleteId != null && this.deleteId != undefined){
        this.delete(this.deleteId);
      }
      
      this.displayDialog = false;
    }
}
  