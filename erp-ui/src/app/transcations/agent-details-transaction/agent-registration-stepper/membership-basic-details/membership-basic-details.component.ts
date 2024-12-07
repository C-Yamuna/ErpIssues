import { Component, OnInit } from '@angular/core';
import { MembershipBasicDetails } from './shared/membership-basic-details';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { MembershipBasicDetailsService } from './shared/membership-basic-details.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DatePipe } from '@angular/common';
import { AgentKycDetailsService } from './shared/agent-kyc-details.service';
import { AgentDetailsTransactionService } from '../../shared/agent-details-transaction.service';
import { AgentDetails } from '../basic-details/shared/basic-details.model';
import { AgentKycDetails } from './shared/agent-kyc-details.model';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { Communication } from '../communication/shared/communication.model';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-membership-basic-details',
  templateUrl: './membership-basic-details.component.html',
  styleUrls: ['./membership-basic-details.component.css']
})

export class MembershipBasicDetailsComponent implements OnInit {
  membershipForm: FormGroup;
  kycForm: FormGroup;
  membershipBasicDetailsModel: MembershipBasicDetails = new MembershipBasicDetails();
  agentDetailsModel: AgentDetails = new AgentDetails();
  agentCommunicationModel: Communication = new Communication();
  agentKycDetailsModel: AgentKycDetails = new AgentKycDetails();
  orgnizationSetting: any;
  isEdit: boolean = false;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  buttonDisabled: boolean = false;
  depositMembersList: any[] = [];
  sameAsPermanentAddress: boolean = false;
  admissionNumber: any;

  documentsData: any[] = [];
  editIndex: any;
  kycModelList: any[] = [];
  editButtonDisable: boolean = false;
  addDocumentOfKycFalg: boolean = false;
  editDocumentOfKycFalg: boolean = false;
  veiwCardHide: boolean = false;
  uploadFlag: boolean = true;
  documentNameList: any[] = [];
  multipartFileList: any[] = [];
  pacsId: any;
  branchId: any;
  agentId: any;
  uploadFileData: any;
  isFileUploaded: boolean = false;
  addKycButton: boolean = false;
  filesDTOList: any;


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private encryptDecryptService: EncryptDecryptService,
    private datePipe: DatePipe,
    private commonComponent: CommonComponent,
    private agentDetailsService: AgentDetailsTransactionService,
    private membershipBasicDetailsService: MembershipBasicDetailsService,
    private agentKycDetailsService: AgentKycDetailsService,
    private activateRoute: ActivatedRoute,
    private fileUploadService: FileUploadService) {
    this.membershipForm = this.formBuilder.group({
      'admissionNumber': new FormControl('', [Validators.required]),
      'name': new FormControl(''),
      'memberTypeName': new FormControl(''),
      'admissionDate': new FormControl(''),
      'dob': new FormControl(''),
      'age': new FormControl(''),
      'mobileNumber': new FormControl(''),
      'emailId': new FormControl(''),
      'aadharNumber': new FormControl(''),
      'panNumber': new FormControl(''),
      'isKyc': new FormControl('')
    });

    this.kycForm = this.formBuilder.group({
      'documentNumber': ['', [Validators.required]],
      'kycDocumentTypeName': ['', [Validators.required]],
      'fileUpload': new FormControl(''),
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined || params['admissionNumber'] != undefined) {
        // this.commonComponent.startSpinner();
        if (params['admissionNumber'] != undefined) {
          this.admissionNumber = this.encryptDecryptService.decrypt(params['admissionNumber']);
          this.getMemberDetailsByAdmissionNumber(this.admissionNumber);
        }
        if (params['id'] != undefined) {
          this.agentId = Number(this.encryptDecryptService.decrypt(params['id']));
          this.getAgentDetailsById(this.agentId);
        }
      }
    });
    this.kycForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.kycForm.valid) {
        this.save();
      }
    });
    this.getAllKycTypes();
  }

  updateData() {
    this.agentDetailsModel.agentKycDetailsList = this.kycModelList;
    this.agentDetailsService.changeData({
      formValid: !this.kycForm.valid ? true : false,
      data: this.agentDetailsModel,
      stepperIndex: 0,
    });
  }

  save() {
    this.updateData();
  }
  //method to get agent details by id @bhargavi
  getAgentDetailsById(id: any) {
    this.agentDetailsService.getAgentDetailsById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.admissionNumber = this.responseModel.data[0].admissionNumber;
              this.agentDetailsModel = this.responseModel.data[0];
              if (this.agentDetailsModel.agentKycDetailsList != null && this.agentDetailsModel.agentKycDetailsList != undefined && this.agentDetailsModel.agentKycDetailsList.length > 0) {
                this.kycModelList = this.agentDetailsModel.agentKycDetailsList;
                for (let kyc of this.kycModelList) {
                  kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath, ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                }
              }
              this.updateData();
            }
          } else {
            this.commonComponent.stopSpinner();
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 3000);
          }
        }
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }

  //method for deposit members details by admission number @bhargavi
  getMemberDetailsByAdmissionNumber(admissionNumber: any) {
    this.kycModelList = [];
    this.membershipBasicDetailsService.getMemberDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipBasicDetailsModel = this.responseModel.data[0];
          // this.membershipBasicDetailsModel.id = null;
          if (this.membershipBasicDetailsModel.dob != null && this.membershipBasicDetailsModel.dob != undefined) {
            this.membershipBasicDetailsModel.dob = this.datePipe.transform(this.membershipBasicDetailsModel.dob, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicDetailsModel.admissionDate != null && this.membershipBasicDetailsModel.admissionDate != undefined) {
            this.membershipBasicDetailsModel.admissionDate = this.datePipe.transform(this.membershipBasicDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          if (this.membershipBasicDetailsModel.memberShipCommunicationDetailsDTOList != null && this.membershipBasicDetailsModel.memberShipCommunicationDetailsDTOList != undefined) {
            this.agentCommunicationModel = this.membershipBasicDetailsModel.memberShipCommunicationDetailsDTOList[0];
          }
          if (this.membershipBasicDetailsModel.memberShipKycDetailsDTOList != null && this.membershipBasicDetailsModel.memberShipKycDetailsDTOList != undefined && this.membershipBasicDetailsModel.memberShipKycDetailsDTOList.length > 0) {
            this.kycModelList = this.membershipBasicDetailsModel.memberShipKycDetailsDTOList;
            for (let kyc of this.kycModelList) {
              kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath, ERP_TRANSACTION_CONSTANTS.MEMBERSHIP + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
              kyc.filesDTOList = [];
              kyc.filesDTOList = kyc.multipartFileList;
            }
            this.agentDetailsModel.agentKycDetailsList = this.membershipBasicDetailsModel.memberShipKycDetailsDTOList;
          }
          this.agentDetailsModel.agentKycDetailsList = this.kycModelList;
          this.agentDetailsModel.memberShipBasicDetailsDTO = this.membershipBasicDetailsModel;
          this.updateData();
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

  getKycById(id: any) {
    this.agentKycDetailsService.getKycDetailsById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.agentKycDetailsModel = this.responseModel.data[0];
              if (this.agentKycDetailsModel.kycFilePath != undefined) {
                let multipleFilesListForView = [];
                let file = new FileUploadModel();
                file.imageValue = ERP_TRANSACTION_CONSTANTS.AGENTDETAILS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.agentKycDetailsModel.kycFilePath;
                let objects = this.agentKycDetailsModel.kycFilePath.split('.');
                file.fileType = objects[objects.length - 1];
                let name = this.agentKycDetailsModel.kycFilePath.replace(/ /g, "_");
                file.fileName = name
                multipleFilesListForView.push(file);
                this.agentKycDetailsModel.multipartFileList = multipleFilesListForView;
              }
            }
          }
        }
      }
    });
  }

  // method for all kyc documents
  getAllKycTypes() {
    this.agentKycDetailsService.getAllKYCDocTypes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.documentNameList = this.responseModel.data;
        this.documentNameList = this.documentNameList.filter((documentType: any) => documentType != null).map((document: { name: any; id: any; }) => {
          return { label: document.name, value: document.id };
        });
      } else {
        // this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      //this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    })
  }

  // set document name
  onChangeDocumnetTypesChange() {
    let documnetTypes = this.documentNameList.find((data: any) => null != data && this.agentKycDetailsModel.kycDocumentTypeId != null && data.value == this.agentKycDetailsModel.kycDocumentTypeId);
    if (documnetTypes != null && undefined != documnetTypes)
      this.agentKycDetailsModel.kycDocumentTypeName = documnetTypes.label;
  }

  // method for file upload and path
  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.agentKycDetailsModel.multipartFileList = [];
    this.multipartFileList = [];
    this.agentKycDetailsModel.filesDTOList = null; // Initialize as a single object
    this.agentKycDetailsModel.kycFilePath = null;
    let file = event.files[0]; // Only one file
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let filesDTO = new FileUploadModel();
      this.uploadFileData = e.target as FileReader;
      filesDTO.fileName = "AGENT_DETAILS_KYC_" + this.agentId + "_" + this.commonComponent.getTimeStamp() + "_" + file.name;
      filesDTO.fileType = file.type.split('/')[1];
      filesDTO.value = (this.uploadFileData.result as string).split(',')[1];
      filesDTO.imageValue = this.uploadFileData.result as string;
      this.filesDTOList = [filesDTO];
      this.agentKycDetailsModel.filesDTOList = this.filesDTOList;
      this.agentKycDetailsModel.kycFilePath = filesDTO.fileName;
      let index1 = event.files.indexOf(file);
      if (index1 > -1) {
        fileUpload.remove(event, index1);
      }
      fileUpload.clear();
    };
    reader.readAsDataURL(file);
  }

  isImage(fileName: string): boolean {
    return /\.(jpg|jpeg|png)$/i.test(fileName); // Check if the file is an image
  }

  editsave(row: any) {
    let documnetTypes = this.documentNameList.find((data: any) => null != data && row.kycDocumentTypeId != null && data.value == row.kycDocumentTypeId);
    if (documnetTypes != null && undefined != documnetTypes)
      row.kycDocumentTypeName = documnetTypes.label;
    if (this.agentKycDetailsModel.status == null && this.agentKycDetailsModel.status == undefined)
      this.agentKycDetailsModel.status = applicationConstants.ACTIVE;
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.agentKycDetailsService.updateKycDetails(row).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.updateData();
        this.agentKycDetailsModel = this.responseModel.data;
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
      this.getAgentDetailsById(this.agentId);
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  //cancel method
  editCancel() {
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.updateData();
  }

  cancel() {
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.updateData();
  }

  saveKyc(row: any) {
    let documnetTypes = this.documentNameList.find((data: any) => null != data && row.kycDocumentTypeId != null && data.value == row.kycDocumentTypeId);
    if (documnetTypes != null && undefined != documnetTypes)
      row.kycDocumentTypeName = documnetTypes.label;
    if (this.agentKycDetailsModel.status == null && this.agentKycDetailsModel.status == undefined)
      this.agentKycDetailsModel.status = applicationConstants.ACTIVE;
    this.agentKycDetailsModel.agentId = this.agentId;
    this.agentKycDetailsModel.admissionNumber = this.membershipBasicDetailsModel.admissionNumber;
    this.agentKycDetailsModel.pacsId = 1;
    this.agentKycDetailsModel.branchId = 1;
    this.agentKycDetailsService.addKycDetails(row).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.updateData();
        this.agentKycDetailsModel = this.responseModel.data[0];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 1200);
      } else {
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
      this.addKycButton = false;
      this.buttonDisabled = false;
      this.getAgentDetailsById(this.agentId);
      this.updateData();

    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
    this.addDocumentOfKycFalg = false;
    this.editButtonDisable = false;
    this.updateData();
  }

  //delete method
  delete(rowData: any) {
    this.agentKycDetailsService.deleteKycDetails(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.kycModelList = this.responseModel.data;
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
    this.updateData();
    this.getKycById(modelData.id);
  }
}
