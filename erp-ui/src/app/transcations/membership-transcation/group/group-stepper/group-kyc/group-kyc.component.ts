import { DatePipe } from '@angular/common';
import { ApplicationInitStatus, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { StatesService } from 'src/app/transcations/term-deposits-transcation/shared/states.service';
import { MemberBasicDetailsStepperService } from '../../../individual/shared/membership-individual-stepper.service';
import { GroupKycDetailsService } from '../../../shared/group-kyc-details.service';
import { MembershipGroupDetailsService } from '../../../shared/membership-group-details.service';
import { MemberGroupBasicDetails, GroupCommunicationModel, GroupKycDeatilsModel } from '../../../shared/member-group-details-model';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { KycDocTypesService } from '../../../shared/kyc-doc-types.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { DocumentTypesService } from 'src/app/configurations/membership-config/document-types/shared/document-types.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { KycDocumentTypesService } from 'src/app/configurations/common-config/kyc-document-types/shared/kyc-document-types.service';
import { FileUploadService } from 'src/app/shared/file-upload.service';


@Component({
  selector: 'app-group-kyc',
  templateUrl: './group-kyc.component.html',
  styleUrls: ['./group-kyc.component.css']
})
export class GroupKYCComponent implements OnInit{
  memberGroupBasicDetails :MemberGroupBasicDetails = new MemberGroupBasicDetails();
  groupKycDeatilsModel:GroupKycDeatilsModel = new GroupKycDeatilsModel();
  groupKYCForm:FormGroup;
  groupKYC:any;
  date: any;
  responseModel!: Responsemodel;
  msgs: any[]=[];
  isEdit: any;
  orgnizationSetting: any;
  stateList: any[]=[];
  docTypeList:any[]=[];
  groupCommunication:any;
  statuList:any[]=[];
  sameAsPermanentAddress: boolean = false;
  kyc:any;
  checked:any;
  groupId: any;
  accountType: any;
  applicationType: any;
  minBalence: any;
  accountOpeningDateVal: any;
  documentTypeList :any [] = [];
  fileName: any;
  kycModelList: any[] = [];
  adhaarFilesList: any[] = [];
  signFilesList: any[] = [];
  panFilesList: any[] = [];
  uploadFileData: any;
  isFileUploaded: boolean = false;
  uploadFlag: boolean = true;
  submitFlag: boolean = false;
  columns: any[]= [] ;
  documentsData: any[] = [];
  displayPosition: boolean = false;
  documentNameList: any[] = [];
  position: any;
  docFilesList: any[] = [];
  buttonDisabled: boolean = false;
  filesList: any[] = [];
  exerciseFileList: any[] = [];
  lastDot = applicationConstants.LAST_DOT;
  typeFlag: boolean = false;
  addKycButton: boolean = false;
  addDocumentOfKycFalg: boolean = false;
  editDocumentOfKycFalg: boolean = false;
  veiwCardHide : boolean = false;
  editButtonDisable : boolean = false ;
  showButton :boolean = false ;
  editIndex: any;
  pacsId=1;
  branchId=1;
  multipleFilesList:any;

  buttonsFlag: boolean = true;
  displayDialog: boolean  = false;
  landFlag: boolean = false;
  deleteId: any;


  constructor(private router: Router, private formBuilder: FormBuilder, private membershipGroupDetailsService: MembershipGroupDetailsService,
    private memberBasicDetailsStepperService:MemberBasicDetailsStepperService,
    private commonComponent: CommonComponent,private groupKycDetailsService: GroupKycDetailsService,
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,private datePipe: DatePipe,private statesService:StatesService,
     private commonFunctionsService: CommonFunctionsService,private kycDocumentTypesService:KycDocumentTypesService,private fileUploadService :FileUploadService,
  ){
    this.groupKYCForm = this.formBuilder.group({
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
          this.groupId = Number(this.encryptService.decrypt(encrypted));
          this.getMembershipGroupDetailsById(this.groupId);
          // this.getGroupDetailsById(this.groupId);
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
  getMembershipGroupDetailsById(id: any) {
    this.isEdit = true;
    this.membershipGroupDetailsService.getMembershipGroupDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.memberGroupBasicDetails = this.responseModel.data[0];
        if (this.memberGroupBasicDetails && this.memberGroupBasicDetails.groupKycList != null && this.memberGroupBasicDetails.groupKycList != undefined &&
          this.memberGroupBasicDetails.groupKycList.length > 0) {
            this.showButton = true;
          this.kycModelList = this.memberGroupBasicDetails.groupKycList;
            this.kycModelList  = this.kycModelList.filter(obj => null != obj && null !=obj.status && obj.status === applicationConstants.ACTIVE).map((kyc:any)=>{
              kyc.multipleFilesList = this.fileUploadService.getFile(kyc.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
              return kyc;
            });
            if(0  == this.kycModelList.length)
            {
              this.groupKycDeatilsModel = new GroupKycDeatilsModel()
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
    let documnetTypes = this.docTypeList.find((data: any) => null != data && this.groupKycDeatilsModel.kycDocumentTypeId != null &&  data.value == this.groupKycDeatilsModel.kycDocumentTypeId);
    if (documnetTypes != null && undefined != documnetTypes)
    this.groupKycDeatilsModel.kycDocumentTypeName = documnetTypes.label;
  }

  updateData() {
    if (this.kycModelList != null && this.kycModelList != undefined &&
      this.kycModelList.length > 0 && this.buttonsFlag ) {
      this.landFlag = true;
    }
    this.groupKycDeatilsModel.groupId = this.groupId;
        this.memberBasicDetailsStepperService.changeData({
      formValid: this.groupKYCForm.valid,
      data: this.groupKycDeatilsModel,
      savedId: this.groupId,
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
    if(this.groupKycDeatilsModel.status == null && this.groupKycDeatilsModel.status == undefined)
      this.groupKycDeatilsModel.status = applicationConstants.ACTIVE;
      this.groupKycDeatilsModel.groupId = this.groupId;
      this.groupKycDeatilsModel.pacsId = 1;
      this.groupKycDeatilsModel.branchId =1;
      this.groupKycDetailsService.addGroupKycDetails(row).subscribe((response : any ) => {
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        this.buttonsFlag  = true;
        this.landFlag =true;;
        this.updateData();
        this.groupKycDeatilsModel = this.responseModel.data[0];
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
      this.getMembershipGroupDetailsById(this.groupId);
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
    if(this.groupKycDeatilsModel.status == null && this.groupKycDeatilsModel.status == undefined)
      this.groupKycDeatilsModel.status = applicationConstants.ACTIVE;
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable  = false;
    this.groupKycDetailsService.updateGroupKycDetails(row).subscribe((response : any ) => {
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        this.buttonsFlag  = true;
        this.landFlag =true;;
        this.updateData();
        this.groupKycDeatilsModel = this.responseModel.data;
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
      this.getMembershipGroupDetailsById(this.groupId);
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
    this.buttonsFlag  = false;
      this.landFlag =false;
      this.updateData();
    this.groupKycDeatilsModel = new GroupKycDeatilsModel;
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
    this.groupKycDetailsService.getGroupKycDetailsById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
          this.groupKycDeatilsModel = this.responseModel.data[0];
          if(this.groupKycDeatilsModel.kycFilePath != null && this.groupKycDeatilsModel.kycFilePath != undefined){
            this.groupKycDeatilsModel.multipleFilesList = this.fileUploadService.getFile(this.groupKycDeatilsModel.kycFilePath ,ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.groupKycDeatilsModel.kycFilePath);

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
    this.getMembershipGroupDetailsById(this.groupId);
  }
  editCancle(){
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable  = false;
    this.buttonsFlag  = true;
    this.landFlag =true;
    this.updateData();
    this.getMembershipGroupDetailsById(this.groupId);
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
    this.groupKycDeatilsModel.multipleFilesList = [];
    this.groupKycDeatilsModel.filesDTO = null; // Initialize as a single object
    this.groupKycDeatilsModel.kycFilePath = null;
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
      filesDTO.fileName = "GROUP_KYC_" + this.groupId + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
      filesDTO.fileType = file.type.split('/')[1];
      filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
      filesDTO.imageValue = this.uploadFileData.result as string;
      this.groupKycDeatilsModel.filesDTO = filesDTO;
      this.groupKycDeatilsModel.kycFilePath = filesDTO.fileName;
      let index1 = event.files.indexOf(file);
      if (index1 > -1) {
        fileUpload.remove(event, index1);
      }
      fileUpload.clear();
    };

    reader.readAsDataURL(file);
  }

  kycModelDuplicateCheck(kycDocTypeId:any){
    if(this.kycModelList != null && this.kycModelList != undefined && this.kycModelList.length > 0){
    let duplicate = this.kycModelList.find((obj:any) => obj && obj.kycDocumentTypeId === kycDocTypeId );
    if (duplicate != null && duplicate != undefined) {
      this.groupKYCForm.reset();
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: "duplicate Kyc Types"}];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    } 
  }
  }
  delete(rowDataId: any) {
    this.groupKycDetailsService.deleteGroupKycDetails(rowDataId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.kycModelList = this.responseModel.data;
          this.getMembershipGroupDetailsById(this.groupId);
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

  fileRemoveEvent() {
    this.groupKycDeatilsModel.multipleFilesList = [];
    if (this.groupKycDeatilsModel.filesDTO != null && this.groupKycDeatilsModel.filesDTO != undefined) {
      this.groupKycDeatilsModel.kycFilePath = null;
      this.groupKycDeatilsModel.filesDTO = null;
    }
  }
}