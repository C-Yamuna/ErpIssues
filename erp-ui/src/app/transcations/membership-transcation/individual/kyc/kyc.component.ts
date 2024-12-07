import { MemberBasicDetails, MemberKycDetailsModel } from './../../shared/member-basic-details.model';
import { MembershipKycDetailsService } from './../../shared/membership-kyc-details.service';
import { MemberBasicDetailsStepperService } from './../shared/membership-individual-stepper.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { MembershipBasicDetailsService } from '../../shared/membership-basic-details.service';
import { DocumentTypesService } from 'src/app/configurations/membership-config/document-types/shared/document-types.service';
import { KycDocumentTypesService } from 'src/app/configurations/common-config/kyc-document-types/shared/kyc-document-types.service';
import { FileUploadService } from 'src/app/shared/file-upload.service';


@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KYCComponent  implements OnInit {
  kycForm: FormGroup;
  kycModel: MemberKycDetailsModel = new MemberKycDetailsModel();
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
  memberId: any;
  pacsId =1;
  branchId = 1;
  kycListByMemberId: any[] = [];
  memberModel: MemberBasicDetails = new MemberBasicDetails();
  typeFlag: boolean = false;
  editIndex: any;
  afterEditCancleFalg: boolean = false;

  editButtonDisable : boolean = false ;
  addDocumentOfKycFalg: boolean = false;

  editDocumentOfKycFalg: boolean = false;

  veiwCardHide : boolean = false;
  addKycButton: boolean =false;
  fileName: any;
  docTypeList: any[]=[];

  multipleFilesList: any[] = [];
  filesDTOList: any[] = [];
  landFlag: boolean = false;
  buttonsFlag: boolean = true;
  displayDialog: boolean  = false;
  id: any;
  deleteId: any;
  showAddButton: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private kycService: MembershipKycDetailsService,
    private kycDocumentTypesService:KycDocumentTypesService,
    private commonComponent: CommonComponent,
    private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,
    private documentTypeService:DocumentTypesService,
    private membershipBasicDetailsService: MembershipBasicDetailsService,
    private memberBasicDetailsStepperService: MemberBasicDetailsStepperService,
    private fileUploadService : FileUploadService) {

      this.kycForm = this.formBuilder.group({
        'kycDocumentTypeId': new FormControl('', Validators.required),
        'documentNumber': new FormControl('',[Validators.required, Validators.pattern(/^[^\s]+(\s.*)?$/)]),
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
            this.memberId = Number(this.encryptService.decrypt(encrypted));
            this.getMembershipDetailsById(this.memberId);
            // this.getGroupDetailsById(this.memberId);
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
    getMembershipDetailsById(id: any) {
      this.isEdit = true;
      this.membershipBasicDetailsService.getMembershipBasicDetailsById(id).subscribe(res => {
        this.responseModel = res;
        this.commonComponent.stopSpinner();
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
          this.showAddButton = false;
          this.memberModel = this.responseModel.data[0];
          if (this.memberModel && this.memberModel.memberShipKycDetailsDTOList != null && this.memberModel.memberShipKycDetailsDTOList != undefined &&
            this.memberModel.memberShipKycDetailsDTOList.length > 0) {
              this.kycModelList = this.memberModel.memberShipKycDetailsDTOList;
              this.kycModelList  = this.kycModelList.filter(obj => null != obj && null !=obj.status && obj.status === applicationConstants.ACTIVE ).map((kyc:any)=>{
                kyc.multipleFilesList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                this.showAddButton = true;
                return kyc;
              });
              if(0  == this.kycModelList.length)
              {
                this.kycModel = new MemberKycDetailsModel()
                this.addDocumentOfKycFalg = true;
                this.buttonDisabled = true;
                this.buttonsFlag  = false;
                this.landFlag =false;
              }
          }
          else{
            this.showAddButton = false;
            this.addDocumentOfKycFalg = true;
            this.buttonDisabled = true;
          }
           
        }else {
          this.showAddButton = false;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
        // this.buttonDisabled = true;
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
      this.kycDocumentTypesService.getAllKycDocumentType().subscribe((response: any) => {
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
      this.kycModel.membershipId = this.memberId;
          this.memberBasicDetailsStepperService.changeData({
        formValid: this.kycForm.valid,
        data: this.kycModel,
        savedId: this.memberId,
        stepperIndex: 1,
        isDisable: !this.landFlag ? true : false,
      });
    }
    // navigateToBack(){
    //   this.router.navigate([]);
    // }
  
    saveKyc(row : any){
      let documnetTypes = this.docTypeList.find((data: any) => null != data && row.kycDocumentTypeId != null &&  data.value == row.kycDocumentTypeId);
      if (documnetTypes != null && undefined != documnetTypes)
        row.kycDocumentTypeName = documnetTypes.label;
      if(this.kycModel.status == null && this.kycModel.status == undefined)
        this.kycModel.status = applicationConstants.ACTIVE;
        this.kycModel.membershipId = this.memberId;
        this.kycModel.admissionNumber = this.memberModel.admissionNumber;
        this.kycModel.pacsId = 1;
        this.kycModel.branchId =1;
        this.kycService.addMembershipKycDetails(row).subscribe((response : any ) => {
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
        this.getMembershipDetailsById(this.memberId);
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
        this.kycService.updateMembershipKycDetails(row).subscribe((response : any ) => {
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
        this.getMembershipDetailsById(this.memberId);
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
      this.kycForm.reset();
      this.multipleFilesList = [];
      this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
      this.buttonDisabled = true;
      this.buttonsFlag  = false;
      this.landFlag =false;
      this.updateData();
      this.editButtonDisable  = true;
      this.kycModel = new MemberKycDetailsModel;
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
      this.kycService.getMembershipKycDetailsById(id).subscribe((data: any) => {
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
      this.getMembershipDetailsById(this.memberId);
    }
    editCancle(){
      this.editDocumentOfKycFalg = true;
      this.buttonDisabled = false;
      this.editButtonDisable  = false;
      this.buttonsFlag  = true;
      this.landFlag =true;
      this.updateData();
      this.getMembershipDetailsById(this.memberId);
    }
    backToKyc() {
      this.displayPosition = false;
      this.uploadFlag = false;
      this.submitFlag = false;
      this.updateData();
    }
    imageUploader(event: any, fileUpload: FileUpload) {
      this.isFileUploaded = applicationConstants.FALSE;
      this.kycModel.multipleFilesList = [];
      this.multipleFilesList = [];
      this.kycModel.filesDTO = null; // Initialize as a single object
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
        filesDTO.fileName = "MEMBER_KYC_" + this.memberId + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
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
      this.kycService.deleteMembershipKycDetails(rowDataId).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.kycModelList = this.responseModel.data;
            this.getMembershipDetailsById(this.memberId);
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