import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { savingsbanktransactionconstant } from '../../savingsbank-transaction-constant';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { MembershipBasicRequiredDetails, MemberGroupDetailsModel, MembershipInstitutionDetailsModel } from '../../savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { SavingBankApplicationModel } from '../../savings-bank-account-creation-stepper/savings-bank-application/shared/saving-bank-application-model';
import { SavingBankApplicationService } from '../../savings-bank-account-creation-stepper/savings-bank-application/shared/saving-bank-application.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { AmountBlockModel } from './shared/amount-model';
import { DatePipe } from '@angular/common';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { AmountBlockService } from './shared/amount-block.service';

@Component({
  selector: 'app-amount-block',
  templateUrl: './amount-block.component.html',
  styleUrls: ['./amount-block.component.css']
})
export class AmountBlockComponent {
  accountblockform: FormGroup;
  amountblock: any[] = [];
  //model classes
  savingBankApplicationModel: SavingBankApplicationModel = new SavingBankApplicationModel();
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  amountBlockModel :AmountBlockModel = new AmountBlockModel();

  responseModel!: Responsemodel;
  gridListData: any[] = [];
  orgnizationSetting: any;
  msgs: any[] = [];
  memberTypeName: any;
  admissionNumber: any;
  accountNumber: any;
  minBalence: any;
  photoCopyFlag: boolean = true;
  signatureCopyFlag: boolean = true;
  isKycApproved: any;
  groupPrmotersList: any[] =[];
  institionPromotersList: any[] =[];
  membreIndividualFlag: boolean = false;
  groupPromotersPopUpFlag: boolean = false;
  institutionPromoterFlag: boolean = false;
  memberPhotoCopyZoom: boolean = false;
  columns: any[]= [];
  groupPrmoters: any[] =[];
  sbAccId: any;
  multipleFilesList: any[] = [];
  uploadFileData: any;
  isEditDeleteButtonEnable: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private commonFunctionsService :CommonFunctionsService , private translate: TranslateService , private savingBankApplicationService : SavingBankApplicationService ,private datePipe: DatePipe,private fileUploadService :FileUploadService,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,private amountBlockService :AmountBlockService )
  { 
    this.accountblockform = this.formBuilder.group({
      'blockAmount': new FormControl('', [Validators.required, Validators.pattern(applicationConstants.AMOUNT_PATTERN_VALIDATION)]),
      'amountInWords': new FormControl('', Validators.required),
      'blockDate': new FormControl({ value: '', disabled: true }, Validators.required),
      'remarks': new FormControl(''),
     
    })
  }
  ngOnInit() {
    this.translate.use(this.commonFunctionsService.getStorageValue('language'));
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.amountblock = [
      { field: 'blockingAmount', header: 'DEMANDDEPOSITS.BLOCK_AMOUNT' },
      { field: 'Amount In Words', header: 'DEMANDDEPOSITS.BLOCK_AMOUNT_IN_WORDS' },
      { field: 'blockedDteVal', header: 'DEMANDDEPOSITS.BLOCK_DATE' },
      { field: 'unblockedDateVal', header: 'DEMANDDEPOSITS.UNBLOCK_DATE' },
      { field: 'blockComments',header:'DEMANDDEPOSITS.REMARKS'},
      { field: 'blockReqSignedCopyPath', header: 'DEMANDDEPOSITS.FILE' },
      { field: 'statusName', header: 'DEMANDDEPOSITS.STATUS' },
      
    ];
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        if (params['id'] != undefined) {
          let id = this.encryptDecryptService.decrypt(params['id']);
          this.sbAccId = Number(id);
          this.getSbAccountDetailsById(this.sbAccId);
        }
      }
    });
    this.amountBlockModel.blockedDteVal = this.commonFunctionsService.currentDate();
}
backbutton(){
  this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
}
isBasicDetails: boolean = false;
position: string = 'center';
showBasicDetailsDialog(position: string) {
  this.position = position;
  this.isBasicDetails = true;
}
edit(){}


  /**
   * @implements get by sbAccountId
   * @param id 
   * @author jyothi.naidana
   */
  getSbAccountDetailsById(id: any) {
    this.savingBankApplicationService.getSbApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {

          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.savingBankApplicationModel = this.responseModel.data[0];
            if (this.savingBankApplicationModel.memberTypeName != null && this.savingBankApplicationModel.memberTypeName != undefined) {
              this.memberTypeName = this.savingBankApplicationModel.memberTypeName;
            }
            if (this.savingBankApplicationModel.admissionNumber != null && this.savingBankApplicationModel.admissionNumber != undefined) {
              this.admissionNumber = this.savingBankApplicationModel.admissionNumber;
            }
            if (this.savingBankApplicationModel.accountNumber != null && this.savingBankApplicationModel.accountNumber != undefined) {
              this.amountBlockModel.accountNumber = this.savingBankApplicationModel.accountNumber;
              this.accountNumber = this.savingBankApplicationModel.accountNumber;
              this.getAmountBlocksByAccountNumber(this.accountNumber);
            }
            if (this.savingBankApplicationModel.minBalance != null && this.savingBankApplicationModel.minBalance != undefined) {
              this.minBalence = this.savingBankApplicationModel.minBalance;
            }

            //member individual
            if (this.savingBankApplicationModel.memberShipBasicDetailsDTO != null && this.savingBankApplicationModel.memberShipBasicDetailsDTO != undefined) {
              this.membershipBasicRequiredDetails = this.savingBankApplicationModel.memberShipBasicDetailsDTO;
              if (this.membershipBasicRequiredDetails.dob != null && this.membershipBasicRequiredDetails.dob != undefined) {
                this.membershipBasicRequiredDetails.dobVal = this.datePipe.transform(this.membershipBasicRequiredDetails.dob, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicRequiredDetails.admissionDate != null && this.membershipBasicRequiredDetails.admissionDate != undefined) {
                this.membershipBasicRequiredDetails.admissionDateVal = this.datePipe.transform(this.membershipBasicRequiredDetails.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipBasicRequiredDetails.photoCopyPath != null && this.membershipBasicRequiredDetails.photoCopyPath != undefined) {
                this.membershipBasicRequiredDetails.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.photoCopyPath, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.photoCopyPath);

              }
              else {
                this.photoCopyFlag = false;
              }
              if (this.membershipBasicRequiredDetails.signatureCopyPath != null && this.membershipBasicRequiredDetails.signatureCopyPath != undefined) {
                this.membershipBasicRequiredDetails.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.signatureCopyPath, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.signatureCopyPath);
              }
              else {
                this.signatureCopyFlag = false;
              }
              if (this.membershipBasicRequiredDetails.isStaff != null && this.membershipBasicRequiredDetails.isStaff != undefined && this.membershipBasicRequiredDetails.isStaff) {
                this.membershipBasicRequiredDetails.isStaff = applicationConstants.YES;
              }
              else {
                this.membershipBasicRequiredDetails.isStaff = applicationConstants.NO;
              }
              if (this.membershipBasicRequiredDetails.isKycApproved != null && this.membershipBasicRequiredDetails.isKycApproved != undefined && this.membershipBasicRequiredDetails.isKycApproved) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
            }
            //group
            if (this.savingBankApplicationModel.groupDetailsDTO != null && this.savingBankApplicationModel.groupDetailsDTO != undefined) {
              this.memberGroupDetailsModel = this.savingBankApplicationModel.groupDetailsDTO;
              if (this.memberGroupDetailsModel.registrationDate != null && this.memberGroupDetailsModel.registrationDate != undefined) {
                this.memberGroupDetailsModel.registrationDateVal = this.datePipe.transform(this.memberGroupDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
              }
              if (this.memberGroupDetailsModel.admissionDate != null && this.memberGroupDetailsModel.admissionDate != undefined) {
                this.memberGroupDetailsModel.admissionDateVal = this.datePipe.transform(this.memberGroupDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.memberGroupDetailsModel.isKycApproved != null && this.memberGroupDetailsModel.isKycApproved != undefined && this.memberGroupDetailsModel.isKycApproved) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
              if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined && this.memberGroupDetailsModel.groupPromoterList.length > 0) {
                this.groupPrmotersList = this.memberGroupDetailsModel.groupPromoterList;
              }
            }
            //institution
            if (this.savingBankApplicationModel.institutionDTO != null && this.savingBankApplicationModel.institutionDTO != undefined) {
              this.membershipInstitutionDetailsModel = this.savingBankApplicationModel.institutionDTO;
              if (this.membershipInstitutionDetailsModel.registrationDate != null && this.membershipInstitutionDetailsModel.registrationDate != undefined) {
                this.membershipInstitutionDetailsModel.registrationDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.registrationDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipInstitutionDetailsModel.admissionDate != null && this.membershipInstitutionDetailsModel.admissionDate != undefined) {
                this.membershipInstitutionDetailsModel.admissionDateVal = this.datePipe.transform(this.membershipInstitutionDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
              }
              if (this.membershipInstitutionDetailsModel.institutionPromoterList != null && this.membershipInstitutionDetailsModel.institutionPromoterList != undefined && this.membershipInstitutionDetailsModel.institutionPromoterList.length > 0) {
                this.institionPromotersList = this.membershipInstitutionDetailsModel.institutionPromoterList;
              }
              if (this.membershipInstitutionDetailsModel.isKycApproved != null && this.membershipInstitutionDetailsModel.isKycApproved != undefined && this.membershipInstitutionDetailsModel.isKycApproved) {
                this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
              }
              else {
                this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
              }
            }
          }
        }
      }
      else {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
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

/**
* @author jyothi.naidana
* @implements close photo dialogue
*/
close(){
  this.memberPhotoCopyZoom = false;
  this.membreIndividualFlag = false;
}

onClickMemberIndividualMoreDetails(){
this.membreIndividualFlag = true;
}

onClick(){
this.institutionPromoterFlag = true;

}
onClickOfGroupPromotes(){
this.groupPromotersPopUpFlag = true;
}

/**
* @author jyothi.naidana
* @implement onclose popup
*/
closePhotoCopy() {
this.memberPhotoCopyZoom = false;
}

/**
* @implement Image Zoom POp up
* @author jyothi.naidana
*/
onClickMemberPhotoCopy(){
this.memberPhotoCopyZoom = true;
}


closePhoto(){
this.memberPhotoCopyZoom = false;
}

/**
* @implements file upload service
* @param event
* @param fileUpload
* @implements jyothi.naidana
*/
fileUploader(event: any, fileUpload: FileUpload) {
  this.multipleFilesList = [];
  this.amountBlockModel.filesDTOList = [];
  this.amountBlockModel.blockReqSignedCopyPath = null;
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
        this.amountBlockModel.filesDTOList.push(files); // Add to filesDTOList array
      }
      let timeStamp = this.commonComponent.getTimeStamp();
      this.amountBlockModel.filesDTOList[0].fileName = "SB_AMOUNT_BLOCK" + this.sbAccId + "_" +timeStamp+ "_"+ file.name ;
      this.amountBlockModel.blockReqSignedCopyPath = "SB_AMOUNT_BLOCK" + this.sbAccId + "_" +timeStamp+"_"+ file.name; // This will set the last file's name as docPath
      let index1 = event.files.findIndex((x: any) => x === file);
      fileUpload.remove(event, index1);
      fileUpload.clear();
    }
    reader.readAsDataURL(file);
  }
}


/**
 * @implements onFile remove
 * @author jyothi.naidana
 */
fileRemoeEvent() {
  let removeFileIndex = this.amountBlockModel.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.amountBlockModel.blockReqSignedCopyPath);
  let obj = this.amountBlockModel.filesDTOList.find((obj: any) => obj && obj.fileName === this.amountBlockModel.blockReqSignedCopyPath);
  this.amountBlockModel.filesDTOList.splice(removeFileIndex, 1);
  this.amountBlockModel.blockReqSignedCopyPath = null;
}

/**
 * @implements saveOrUpdate Amount Block
 * @param obj 
 * @author jyothi.naidana
 */
saveOrUpdateAmountBlock(obj:any){
  this.isEditDeleteButtonEnable = false;
  obj.sbAccId = this.sbAccId;
  obj.accountNumber = this.accountNumber;
  if (obj.blockedDteVal != null && obj.blockedDteVal != undefined) {
    obj.blockedDate = this.commonFunctionsService.getUTCEpoch(new Date(obj.blockedDteVal));//blocked date
  }
  if (obj.unblockedDateVal != null && obj.unblockedDateVal != undefined) {
    obj.unblockedDate = this.commonFunctionsService.getUTCEpoch(new Date(obj.unblockedDateVal));//unblocked date
  }
  if (obj.id != null && obj.id != undefined) {//update
    this.amountBlockService.updateSbAmountBlock(obj).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.msgs = [];
            this.commonComponent.stopSpinner();
            this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
            this.cancelOrRefresh();//for refresh the form
            if(this.accountNumber != null && this.accountNumber != undefined){//for grid list
              this.getAmountBlocksByAccountNumber(this.accountNumber);
            }
          }
        }
      }
      else {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
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
  else {
    obj.status = applicationConstants.ACTIVE;
    this.amountBlockService.addSbAmountBlock(obj).subscribe((data: any) => {//create or save
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.msgs = [];
            this.commonComponent.stopSpinner();
            this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
            this.cancelOrRefresh();//for refresh the form
            if(this.accountNumber != null && this.accountNumber != undefined){//for grid list
              this.getAmountBlocksByAccountNumber(this.accountNumber);
            }
          }
        }
      }
      else {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
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
}
/**
 * @implements getAmountBlocksListByAccountNumber
 * @param accountNumber 
 * @author jyothi.naidana
 */
getAmountBlocksByAccountNumber(accountNumber:any){
  this.amountBlockService.getSbAmountBlockByAccountNumber(accountNumber).subscribe((data: any) => {
    this.responseModel = data;
    if (this.responseModel != null && this.responseModel != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
      if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
        this.gridListData = this.responseModel.data;
        this.gridListData = this.responseModel.data.map((sb: any) => {
          if (sb != null && sb != undefined && sb.blockedDate != null && sb.blockedDate != undefined) {
            sb.blockedDteVal = this.datePipe.transform(sb.blockedDate, this.orgnizationSetting.datePipe);
          }
          if (sb != null && sb != undefined && sb.unblockedDate!= null && sb.unblockedDate != undefined) {
            sb.unblockedDateVal = this.datePipe.transform(sb.unblockedDate, this.orgnizationSetting.datePipe);
          }
          return sb
        });
      }
    }
    else {
      this.msgs = [];
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
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

/**
* @implements cancle standared instructions saveOrUpdate
* @author jyothi.naidana
*/
cancelOrRefresh(){
  this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
  this.amountBlockModel = new AmountBlockModel();
  this.amountBlockModel.blockedDteVal = this.commonFunctionsService.currentDate();
  if(this.accountNumber != null && this.accountNumber != undefined){
    this.amountBlockModel.accountNumber = this.accountNumber;
  }
  this.isEditDeleteButtonEnable = false;
}

  /**
   * @implements getAmountBlockById (for edit)
   * @param rowData 
   * @author jyothi.naidana
   */
  getAmountBlockById(rowData: any) {
    this.isEditDeleteButtonEnable = true;
    this.amountBlockService.getSbAmountBlockById(rowData.id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.amountBlockModel = this.responseModel.data[0];
          if (this.amountBlockModel.blockedDate != null && this.amountBlockModel.blockedDate != undefined) {
            this.amountBlockModel.blockedDteVal = this.datePipe.transform(this.amountBlockModel.blockedDate, this.orgnizationSetting.datePipe);
          }
          if (this.amountBlockModel.unblockedDate != null && this.amountBlockModel.unblockedDate != undefined) {
            this.amountBlockModel.unblockedDateVal = this.datePipe.transform(this.amountBlockModel.unblockedDate, this.orgnizationSetting.datePipe);
          }
          if (this.amountBlockModel.blockReqSignedCopyPath != null && this.amountBlockModel.blockReqSignedCopyPath != undefined) {
            this.amountBlockModel.multipartFileListForAmountBlock = this.fileUploadService.getFile(this.amountBlockModel.blockReqSignedCopyPath, ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.amountBlockModel.blockReqSignedCopyPath);
          }
        }
      }
      else {
        this.msgs = [];
        this.commonComponent.stopSpinner();
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

  /**
   * @implements deleteAmountBlock
   * @param rowData 
   * @author jyothi.naidana
   */
  deleteAmountBlock(rowData:any){
    this.amountBlockService.deleteSbAmountBlock(rowData.id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.msgs = [];
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
          if(this.accountNumber != null && this.accountNumber != undefined){
            this.getAmountBlocksByAccountNumber(this.accountNumber);
          }
      }
      else {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
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



}
