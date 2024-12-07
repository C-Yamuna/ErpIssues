import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { Table } from 'primeng/table';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SiLoanKyc } from '../../../shared/si-loans/si-loan-kyc.model';
import { SiLoanApplicationService } from '../../../shared/si-loans/si-loan-application.service';
import { SiLoanKycService } from '../../../shared/si-loans/si-loan-kyc.service';
import { MembershipServiceService } from 'src/app/transcations/savings-bank-transcation/savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-service.service';
import { SiLoanApplication } from '../../../shared/si-loans/si-loan-application.model';
import { InstitutionPromoterDetailsModel, MemberGroupDetailsModel, MembershipBasicRequiredDetails, MembershipInstitutionDetailsModel, promoterDetailsModel } from '../../../shared/si-loans/si-loan-membership-details.model';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-si-kyc',
  templateUrl: './si-kyc.component.html',
  styleUrls: ['./si-kyc.component.css']
})
export class SiKycComponent {
  kycForm: FormGroup;
  kyc: any;
  checked: any;
  loanAccId: any;
  accountType: any;
  applicationType: any;
  msgs: any[] = [];
  responseModel!: Responsemodel;
  minBalence: any;
  accountOpeningDateVal: any;
  documentTypeList: any[] = [];

  siLoanApplicationModel: SiLoanApplication = new SiLoanApplication();
  siLoanKycModel: SiLoanKyc = new SiLoanKyc();
  membershipBasicRequiredDetailsModel: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  promoterDetailsModel: promoterDetailsModel = new promoterDetailsModel();
  institutionPromoterDetailsModel: InstitutionPromoterDetailsModel = new InstitutionPromoterDetailsModel();

  fileName: any;
  kycModelList: any[] = [];
  adhaarFilesList: any[] = [];
  signFilesList: any[] = [];
  panFilesList: any[] = [];
  uploadFileData: any;
  isFileUploaded: boolean = false;
  uploadFlag: boolean = true;
  submitFlag: boolean = false;
  columns: any[] = [];

  documentsData: any[] = [];
  displayPosition: boolean = false;
  documentNameList: any[] = [];
  position: any;
  docFilesList: any[] = [];
  buttonDisabled: boolean = false;
  noKYCData: boolean = false;
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
  veiwCardHide: boolean = false;

  @ViewChild('cv', { static: false })
  private cv!: Table;
  editIndex: any;
  afterEditCancleFalg: boolean = false;

  editButtonDisable: boolean = false;

  multipleFilesList: any[] = [];
  filesDTOList: any[] = [];
  productName: any;
  admissionNumber: any;
  isMemberCreation: any;
  memberTypeName: any;
  promoterDetails: any[] = [];
  institutionPromoter: any[] = [];
  memberName: any;
  mobileNumer: any;
  aadharNumber: any;
  qualificationName: any;
  panNumber: any;
  memberTypeId: any;
  createLoan: any;
  displayDialog: boolean = false;
  deleteId: any;
  isSaveAndNextDisable: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private commonComponent: CommonComponent, private activateRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService,
    private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe,
    private siLoanApplicationService: SiLoanApplicationService,
    private siLoanKycService: SiLoanKycService, private membershipServiceService: MembershipServiceService,
    private fileUploadService: FileUploadService) {
      
    this.kycForm = this.formBuilder.group({
      'documentNumber': new FormControl('', [Validators.required, Validators.pattern(/^[^\s]+(\s.*)?$/)]),
      'kycDocumentTypeName': new FormControl('', Validators.required),
      'fileUpload': new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');
    if (this.documentsData.length >= 1) {
      this.uploadFlag = true;
    }
    this.columns = [
      { field: 'kycDocumentTypeName', header: 'MEMBERSHIP.KYC_DOCUMENT_NAME' },
      { field: 'documentNumber', header: 'MEMBERSHIP.KYC_DOCUMENT_NUMBER' },
      { field: 'docPath', header: 'MEMBERSHIP.KYC_DOCUMENT' }
    ];
    this.getAllKycTypes();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let rowId = this.encryptDecryptService.decrypt(params['id']);
        this.loanAccId = Number(rowId);
        this.isEdit = true;
        this.getSILoanApplicationWithKycDetailsByLoanAccId(this.loanAccId);
      }
      else if (params['createLoanFlag'] != undefined) {
        this.createLoan = params['createLoanFlag'] != undefined;
        this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');
        if (this.isMemberCreation)
          this.addKyc();
      }
      else {
        this.isEdit = false;
        this.isMemberCreation = this.commonFunctionsService.getStorageValue('b-class-member_creation');
        this.updateData();
      }

      // if (!this.isMemberCreation) {
      this.siLoanKycService.currentStep.subscribe((data: any) => {
        this.kycModelList = [];
        if (data != undefined && data != null) {
          // this.buttonDisabled = data.isDisable
          if (data.data != null && data.data != undefined) {

            if (data.data.individualMemberDetailsDTO != undefined && data.data.individualMemberDetailsDTO.memberTypeName != undefined
              && data.data.individualMemberDetailsDTO.memberTypeName === "Individual") {

              this.membershipBasicRequiredDetailsModel = data.data.individualMemberDetailsDTO;
              this.memberTypeName = data.data.individualMemberDetailsDTO.memberTypeName;
              if (data.data.individualMemberDetailsDTO.memberShipKycDetailsDTOList != null) { }
              this.kycModelList = data.data.individualMemberDetailsDTO.memberShipKycDetailsDTOList;
            }

            if (data.data.memberGroupDetailsDTO != undefined && data.data.memberGroupDetailsDTO.memberTypeName != undefined
              && data.data.memberGroupDetailsDTO.memberTypeName === "Group") {

              this.memberGroupDetailsModel = data.data.memberGroupDetailsDTO;
              this.memberTypeName = data.data.memberGroupDetailsDTO.memberTypeName;
              if (data.data.memberGroupDetailsDTO.groupKycList != null)
                this.kycModelList = data.data.memberGroupDetailsDTO.groupKycList;
            }

            if (data.data.memberInstitutionDTO != undefined && data.data.memberInstitutionDTO.memberTypeName != undefined
              && data.data.memberInstitutionDTO.memberTypeName === "Institution") {

              this.membershipInstitutionDetailsModel = data.data.memberInstitutionDTO;
              this.memberTypeName = data.data.memberInstitutionDTO.memberTypeName;
              if (data.data.memberInstitutionDTO.institutionKycDetailsDTOList != null)
                this.kycModelList = data.data.memberInstitutionDTO.institutionKycDetailsDTOList;
            }
          }
        }
        this.updateData();
      });
      // }
    });
    this.buttonDisabled = false;
    this.kycForm.valueChanges.subscribe((data: any) => {
      this.updateData();
    });
  }

  //update save
  save() {
    this.updateData();
  }

  //get all kyc types 
  getAllKycTypes() {
    this.siLoanKycService.getAllKYCTypes().subscribe((res: any) => {
      this.responseModel = res;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.documentNameList = this.responseModel.data.filter((kyc: any) => kyc.status == applicationConstants.ACTIVE).map((count: any) => {
          return { label: count.name, value: count.id }
        });
        let filteredObj = this.documentNameList.find((data: any) => null != data && this.siLoanKycModel.kycDocumentTypeId != null && data.value == this.siLoanKycModel.kycDocumentTypeId);
        if (filteredObj != null && undefined != filteredObj)
          this.siLoanKycModel.kycDocumentTypeName = filteredObj.label;
      }
    });
  }

  getSILoanApplicationWithKycDetailsByLoanAccId(loanAccId: any) {
    this.siLoanKycService.getSILoanApplicationWithKycDetailsByLoanAccId(loanAccId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined && this.responseModel.data.length > 0) {
            this.siLoanApplicationModel = this.responseModel.data[0];

            if (this.siLoanApplicationModel.admissionNo != null && this.siLoanApplicationModel.admissionNo != undefined)
              this.admissionNumber = this.siLoanApplicationModel.admissionNo;

            if (this.siLoanApplicationModel.memberTypeName != null && this.siLoanApplicationModel.memberTypeName != undefined)
              this.memberTypeName = this.siLoanApplicationModel.memberTypeName;

            if (this.siLoanApplicationModel.memberTypeId != null && this.siLoanApplicationModel.memberTypeId != undefined)
              this.memberTypeId = this.siLoanApplicationModel.memberTypeId;

            if (this.siLoanApplicationModel.individualMemberDetailsDTO != undefined && this.siLoanApplicationModel.individualMemberDetailsDTO != null) {
              this.membershipBasicRequiredDetailsModel = this.siLoanApplicationModel.individualMemberDetailsDTO;

              if (this.membershipBasicRequiredDetailsModel.dob != null && this.membershipBasicRequiredDetailsModel.dob != undefined)
                this.membershipBasicRequiredDetailsModel.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.dob, this.orgnizationSetting.datePipe);

              if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined)
                this.membershipBasicRequiredDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

              if (this.siLoanApplicationModel.individualMemberDetailsDTO.isNewMember != undefined
                && this.siLoanApplicationModel.individualMemberDetailsDTO.isNewMember != null)
                this.isMemberCreation = this.siLoanApplicationModel.individualMemberDetailsDTO.isNewMember;
            }

            if (this.siLoanApplicationModel.memberGroupDetailsDTO != undefined && this.siLoanApplicationModel.memberGroupDetailsDTO != null) {
              this.memberGroupDetailsModel = this.siLoanApplicationModel.memberGroupDetailsDTO;

              if (this.membershipBasicRequiredDetailsModel.admissionDate != null && this.membershipBasicRequiredDetailsModel.admissionDate != undefined)
                this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

              if (this.siLoanApplicationModel.memberGroupDetailsDTO.isNewMember != undefined
                && this.siLoanApplicationModel.memberGroupDetailsDTO.isNewMember != null)
                this.isMemberCreation = this.siLoanApplicationModel.memberGroupDetailsDTO.isNewMember;
            }

            if (this.siLoanApplicationModel.memberInstitutionDTO != undefined && this.siLoanApplicationModel.memberInstitutionDTO != null) {
              this.membershipInstitutionDetailsModel = this.siLoanApplicationModel.memberInstitutionDTO;

              if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined)
                this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);

              if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined)
                this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);

              if (this.siLoanApplicationModel.memberInstitutionDTO.isNewMember != undefined
                && this.siLoanApplicationModel.memberInstitutionDTO.isNewMember != null)
                this.isMemberCreation = this.siLoanApplicationModel.memberInstitutionDTO.isNewMember;
            }

            if (this.siLoanApplicationModel.siLoanKycDetailsDTOList != undefined && this.siLoanApplicationModel.siLoanKycDetailsDTOList != null) {
              this.kycModelList = this.siLoanApplicationModel.siLoanKycDetailsDTOList;

              if (this.kycModelList != null && this.kycModelList != undefined) {
                this.editDocumentOfKycFalg = true;
                for (let kyc of this.kycModelList) {
                  if (kyc.kycFilePath != null && kyc.kycFilePath != undefined) {
                    kyc.multipartFileList = this.fileUploadService.getFile(kyc.kycFilePath, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.kycFilePath);
                  }
                }
              }
              this.buttonDisabled = applicationConstants.FALSE;
              this.noKYCData = false;
            } else {
              this.buttonDisabled = applicationConstants.TRUE;
              this.noKYCData = true;
              if (this.isMemberCreation)
                this.addKyc();
            }
            this.updateData();
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

  updateData() {
    if (this.kycForm.valid) {
      this.noKYCData = false;
    } else {
      this.noKYCData = true;
    }
    if (this.kycModelList != undefined && this.kycModelList != null && this.kycModelList.length > 0)
      this.buttonDisabled = false;
    else
      this.buttonDisabled = true;

    this.siLoanApplicationService.changeData({
      formValid: this.kycForm.valid,
      data: this.siLoanApplicationModel,
      isDisable: (this.buttonDisabled && this.noKYCData) ? applicationConstants.TRUE : applicationConstants.FALSE,
      stepperIndex: 1,
    });
  }

  //image upload and document path save
  imageUploader(event: any, fileUpload: FileUpload) {
    this.isFileUploaded = applicationConstants.FALSE;
    this.multipleFilesList = [];
    this.siLoanKycModel.filesDTOList = [];
    this.siLoanKycModel.kycFilePath = null;
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
          this.siLoanKycModel.filesDTOList.push(files); // Add to filesDTOList array
        }
        let timeStamp = this.commonComponent.getTimeStamp();
        this.siLoanKycModel.filesDTOList[0].fileName = "SI_LOAN_KYC_" + this.loanAccId + "_" + timeStamp + "_" + file.name;
        this.siLoanKycModel.kycFilePath = "SI_LOAN_KYC_" + this.loanAccId + "_" + timeStamp + "_" + file.name; // This will set the last file's name as docPath
        this.isFileUploaded = applicationConstants.TRUE;
        let index1 = event.files.findIndex((x: any) => x === file);
        fileUpload.remove(event, index1);
        fileUpload.clear();
      }
      reader.readAsDataURL(file);
    }
  }

  deletDilogBox(rowData: any) {
    this.displayDialog = true;
    if (rowData.id != null && rowData.id != undefined) {
      this.deleteId = rowData.id;
    }
  }

  cancelForDialogBox() {
    this.displayDialog = false;
  }

  submitDelete() {
    if (this.deleteId != null && this.deleteId != undefined) {
      this.delete(this.deleteId);
    }
    this.displayDialog = false;
  }

  delete(rowDataId: any) {
    this.siLoanKycService.deleteSILoanKYCDetails(rowDataId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.kycModelList = this.responseModel.data;
        this.getSILoanApplicationWithKycDetailsByLoanAccId(this.loanAccId);
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      }
      else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
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

  //add save
  saveKyc(row: any) {
    this.siLoanKycModel.status = applicationConstants.ACTIVE;
    this.siLoanKycModel.siLoanApplicationId = this.loanAccId;
    this.siLoanKycModel.admissionNumber = this.admissionNumber;
    this.siLoanKycModel.memberTypeName = this.memberTypeName;
    this.siLoanKycModel.memberType = this.memberTypeId;
    this.siLoanKycModel.memberId = this.memberId;
    this.siLoanKycModel.isNewMember = this.isMemberCreation;
    this.siLoanKycService.addSILoanKYCDetails(this.siLoanKycModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.siLoanKycModel = this.responseModel.data[0];
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
      this.getSILoanApplicationWithKycDetailsByLoanAccId(this.loanAccId);
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

  //add kyc 
  addKyc() {
    this.getAllKycTypes();
    this.multipleFilesList = [];
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = true;
    this.editButtonDisable = true;
    this.siLoanKycModel = new SiLoanKyc;
    this.updateData();
  }

  //add cancle 
  cancel(modelData: any) {
    this.addDocumentOfKycFalg = !this.addDocumentOfKycFalg;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    if (this.loanAccId != undefined)
      this.getSILoanApplicationWithKycDetailsByLoanAccId(this.loanAccId);
    else
      this.memberTypeCheck();

    this.updateData();
  }

  onClick() {
    this.addDocumentOfKycFalg = true;
  }

  //click on edit and populate data on form and save & next disable purpose
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
    if (this.loanAccId != undefined)
      this.getKycById(modelData.id);
    else
      this.siLoanKycModel = modelData;

    this.updateData();
  }

  getKycById(id: any) {
    this.siLoanKycService.getSILoanKYCDetails(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.siLoanKycModel = this.responseModel.data[0];
              if (this.siLoanKycModel.kycFilePath != undefined && this.siLoanKycModel.kycFilePath != null) {
                this.siLoanKycModel.multipartFileList = this.fileUploadService.getFile(this.siLoanKycModel.kycFilePath, ERP_TRANSACTION_CONSTANTS.LOANS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.siLoanKycModel.kycFilePath);
              }
            }
          }
        }
      }
    });
  }

  //edit cancle
  editCancle(modelData: any) {
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    if (this.loanAccId != undefined)
      this.getSILoanApplicationWithKycDetailsByLoanAccId(this.loanAccId);
    else
      this.memberTypeCheck()

    this.updateData();
  }

  editsave(row: any) {
    this.siLoanKycModel.siLoanApplicationId = this.loanAccId;
    this.siLoanKycModel.admissionNumber = this.admissionNumber;
    this.siLoanKycModel.memberTypeName = this.memberTypeName;
    this.siLoanKycModel.memberType = this.memberTypeId;
    this.siLoanKycModel.memberId = this.memberId;
    if (this.documentNameList != null && this.documentNameList != undefined && this.documentNameList.length > 0) {
      let filteredObj = this.documentNameList.find((data: any) => null != data && this.siLoanKycModel.kycDocumentTypeId != null && data.value == this.siLoanKycModel.kycDocumentTypeId);
      if (filteredObj != null && undefined != filteredObj && filteredObj.label != null && filteredObj.label != undefined) {
        this.siLoanKycModel.kycDocumentTypeName = filteredObj.label;
      }
    }
    this.editDocumentOfKycFalg = true;
    this.buttonDisabled = false;
    this.editButtonDisable = false;
    this.siLoanKycService.updateSILoanKYCDetails(this.siLoanKycModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
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
      this.getSILoanApplicationWithKycDetailsByLoanAccId(this.loanAccId);
      this.updateData();
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  onChangeDocument(event: any) {
    let filteredObj = this.documentNameList.find((data: any) => null != data && event != null && data.value == event);
    if (filteredObj != null && undefined != filteredObj)
      this.siLoanKycModel.kycDocumentTypeName = filteredObj.label;
  }

  kycModelDuplicateCheck(kycModelList: any) {
    let duplicate = false;
    const uniqueIds = new Set<number>();
    const duplicateIds = new Set<number>();
    if (this.kycModelList != null && this.kycModelList != undefined && this.kycModelList.length > 0) {
      for (let item of this.kycModelList) {
        if (item != null && item != undefined && item.kycDocumentTypeId != null && item.kycDocumentTypeId != undefined) {
          if (uniqueIds.has(item.kycDocumentTypeId)) {
            duplicateIds.add(item.kycDocumentTypeId);
          } else {
            uniqueIds.add(item.kycDocumentTypeId);
          }
        }
        if (duplicateIds.size > 0) {
          duplicate = true;
          this.kycForm.reset();
          this.msgs = [];
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: "duplicate Kyc Types" }];
          setTimeout(() => {
            this.msgs = [];
          }, 1500);
        }
      }
    }
    return duplicate;
  }

  fileRemoveEvent() {
    if (this.siLoanKycModel.filesDTOList != null && this.siLoanKycModel.filesDTOList != undefined && this.siLoanKycModel.filesDTOList.length > 0) {
      let removeFileIndex = this.siLoanKycModel.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.siLoanKycModel.kycFilePath);
      if (removeFileIndex != null && removeFileIndex != undefined) {
        this.siLoanKycModel.filesDTOList[removeFileIndex] = null;
        this.siLoanKycModel.kycFilePath = null;
      }
    }
  }

  memberTypeCheck() {
    this.kycModelList = [];
    if (this.memberTypeName == "Individual") {
      this.getMembershipBasicDetailsByAdmissionNumber(this.membershipBasicRequiredDetailsModel.admissionNumber);
    } else if (this.memberTypeName == "Group") {
      this.getGroupDetailsByAdmissionNumber(this.memberGroupDetailsModel.admissionNumber);
    } else if (this.memberTypeName == "Institution") {
      this.getInstitutionDetailsByAdmissionNumber(this.membershipInstitutionDetailsModel.admissionNumber);
    }
  }

  getMembershipBasicDetailsByAdmissionNumber(admissionNumber: any) {
    this.membershipServiceService.getMembershipBasicDetailsByAdmissionNumber(admissionNumber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipBasicRequiredDetailsModel = this.responseModel.data[0];
          this.kycModelList = this.membershipBasicRequiredDetailsModel.memberShipKycDetailsDTOList;
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

  getGroupDetailsByAdmissionNumber(admissionNUmber: any) {
    this.membershipServiceService.getMemberGroupByAdmissionNumber(admissionNUmber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.memberGroupDetailsModel = this.responseModel.data[0];
          this.kycModelList = this.memberGroupDetailsModel.groupKycList;
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

  getInstitutionDetailsByAdmissionNumber(admissionNUmber: any) {
    this.membershipServiceService.getMemberIstitutionByAdmissionNumber(admissionNUmber).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.membershipInstitutionDetailsModel = this.responseModel.data[0];
          this.kycModelList = this.membershipInstitutionDetailsModel.institutionKycDetailsDTOList;
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