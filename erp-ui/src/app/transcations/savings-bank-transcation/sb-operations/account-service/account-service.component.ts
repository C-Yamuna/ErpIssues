import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { savingsbanktransactionconstant } from '../../savingsbank-transaction-constant';
import { MembershipBasicRequiredDetails, MemberGroupDetailsModel, MembershipInstitutionDetailsModel } from '../../savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { SavingBankApplicationModel } from '../../savings-bank-account-creation-stepper/savings-bank-application/shared/saving-bank-application-model';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SavingBankApplicationService } from '../../savings-bank-account-creation-stepper/savings-bank-application/shared/saving-bank-application.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { StandingInstructionsService } from '../standing-instruction/shared/standing-instructions.service';
import { AccountServiceService } from './shared/account-service.service';
import { AccountService } from './shared/account-service.model';
import { SavingsBankServicesService } from '../../savings-bank-account-creation-stepper/savings-bank-services/shared/savings-bank-services.service';
import { FileUploadModel } from 'src/app/layout/mainmenu/shared/file-upload-model.model';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-account-service',
  templateUrl: './account-service.component.html',
  styleUrls: ['./account-service.component.css']
})
export class AccountServiceComponent {
  statuses!: SelectItem[];
  service:any;

  servicelist:any;
  serviceform: FormGroup;
  accountservice: any[] = [];

  savingBankApplicationModel: SavingBankApplicationModel = new SavingBankApplicationModel();
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();

  accountService : AccountService = new AccountService();

  memberTypeName: any;
  accontNumber: any;
  admissionNumber: any;
  photoCopyFlag: boolean = true;
  signatureCopyFlag: boolean = true;
  isKycApproved: any;
  institionPromotersList: any[] = [];
  groupPrmotersList: any[]=[];
 
  minBalence: any;

  membreIndividualFlag: boolean = false;
  groupPromotersPopUpFlag: boolean = false;
  institutionPromoterFlag: boolean = false;
  memberPhotoCopyZoom: boolean = false;
  columns: any[]= [];
  groupPrmoters: any[] =[];

  serviceCharges: any;
  accountNumber :any;
  sbAccId: any;
  responseModel!: Responsemodel;
  orgnizationSetting: any; 
  msgs: any[] = [];
  serviceTypesList: any[]=[];
  gridList: any [] =[];
  requestedDateVal:any;
  amountInWords:any;
  currentBalence:any;
  multipleFilesList: any[] = [];
  uploadFileData: any;
  productId: any;
  serviceCofigDetailsList: any;
  isEditDeleteButtonEnable: boolean = false;;

  constructor(private router: Router, private formBuilder: FormBuilder,private savingBankApplicationService: SavingBankApplicationService, private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, private accountServiceService: AccountServiceService,  private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe, private standingInstructionsService: StandingInstructionsService,private translate: TranslateService,private fileUploadService :FileUploadService,private savingsBankServicesService :SavingsBankServicesService)
  { 
    this.serviceform = this.formBuilder.group({
      'serviceType': new FormControl('', Validators.required),
      'serviceCharges': new FormControl({ value: '', disabled: true }, Validators.required),
      'serviceChargesDebitedFrom': new FormControl({ value: '', disabled: true }, Validators.required),
      'frequency': new FormControl({ value: '', disabled: true }, Validators.required),
      'currentBalence': new FormControl({ value: '', disabled: true }, Validators.required),
      // 'recievebleAmount': new FormControl('', Validators.required),
      // 'amountInwords': new FormControl(''),
    })
  }
  ngOnInit() {
    this.translate.use(this.commonFunctionsService.getStorageValue('language'));
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.accountservice = [
      { field: 'serviceTypeName', header: 'DEMANDDEPOSITS.SERVICE_TYPE' },
      { field: 'isChargeApplicable', header: 'DEMANDDEPOSITS.IS_CHARGE_APPLICAPABLE' },
      { field: 'chargesCollectionFrequencyName', header: 'DEMANDDEPOSITS.CHARGES_COLLECTION_FREQUENCY' },
      { field: 'serviceCharges',header:'DEMANDDEPOSITS.SERVICE_CHARGES'},
      { field: 'requestDocPath', header: 'DEMANDDEPOSITS.FILE' },
      { field: 'statusName', header: 'DEMANDDEPOSITS.STATUS' },
    ];
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
          let id = this.encryptDecryptService.decrypt(params['id']);
          this.sbAccId = Number(id);
          this.getSbAccountDetailsById(this.sbAccId);
          this.getServiceChargesHistroy(this.sbAccId);
      }
    });
    this.getAllServicesTypes();
}
backbutton(){
  this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
}
  /**
   * @implements get by sbAccountId
   * @param id 
   * @author jyothi.naidana
   */
  getSbAccountDetailsById(id: any) {
    this.savingBankApplicationService.getSbApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel != null && this.responseModel != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.savingBankApplicationModel = this.responseModel.data[0];
          //account details
          if (this.savingBankApplicationModel.memberTypeName != null && this.savingBankApplicationModel.memberTypeName != undefined) {
            this.memberTypeName = this.savingBankApplicationModel.memberTypeName;
          }
          if (this.savingBankApplicationModel.admissionNumber != null && this.savingBankApplicationModel.admissionNumber != undefined) {
            this.admissionNumber = this.savingBankApplicationModel.admissionNumber;
          }
          if (this.savingBankApplicationModel.accountNumber != null && this.savingBankApplicationModel.accountNumber != undefined) {
            this.accountService.accountNumber = this.savingBankApplicationModel.accountNumber;
            this.accountNumber = this.savingBankApplicationModel.accountNumber;
            
          }
         
          if (this.savingBankApplicationModel.minBalance != null && this.savingBankApplicationModel.minBalance != undefined) {
            this.minBalence = this.savingBankApplicationModel.minBalance;
          }
          if (this.savingBankApplicationModel.productId != null && this.savingBankApplicationModel.productId != undefined) {
            this.productId = this.savingBankApplicationModel.productId;
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
 * @implements getServiceChargesByAccountNumber
 * @param accountNumber 
 * @author jyothi.naidana
 */
  getServiceChargesHistroy(id: any) {
    this.accountServiceService.getSbServicesBySbId(id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel  != null && this.responseModel  != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
            this.gridList = this.responseModel.data;
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
   * @implements getAll service Types List (Master Data)
   * @author jyothi.naidana
   */
  getAllServicesTypes() {
    this.savingsBankServicesService.getAllSbServicesTypes().subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.serviceTypesList = this.responseModel.data.filter((serviceTypes: any) => serviceTypes.status == applicationConstants.ACTIVE).map((count: any) => {
            return { label: count.name, value: count.id }
          });
        }
      }
      else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);

      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    });
  }

  /**
   * @implements getServiceChargesByAccountId
   * @param rowData 
   * @author jyothi.naidana
   */
  editAccountServiceCharges(rowData: any){
    this.isEditDeleteButtonEnable = true;
    this.accountServiceService.getSbServices(rowData.id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel  != null && this.responseModel  != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.accountService = this.responseModel.data[0];
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
 * @implements deleteAccountServiceCharges
 * @param rowData 
 * @author jyothi.naidana
 */
  deleteAccountServiceCharges(rowData : any){
    this.accountServiceService.deleteSbServices(rowData.id).subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel  != null && this.responseModel  != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
          this.msgs = [];
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
          if(this.sbAccId != null && this.sbAccId != undefined){//get history aftee delete
            this.getServiceChargesHistroy(this.sbAccId);
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
 * @implements saveAccountServiceCharges
 * @param rowData 
 * @author jyothi.naidana
 */
  saveOrUpdateAccountServiceCharge(rowData : any){
    this.isEditDeleteButtonEnable = false;
    if(this.sbAccId != null && this.sbAccId != undefined){
      rowData.sbAccId = this.sbAccId ; 
    }
    if(this.serviceTypesList != null && this.serviceTypesList != undefined && this.serviceTypesList.length > 0){
      let filteredObj = this.serviceTypesList.find((data: any) => null != data && data.value == rowData.serviceTypeId);
      if (filteredObj != null && undefined != filteredObj){
        rowData.serviceTypeName = filteredObj.label;//serviceTypeName account Type Mapping
      }
    }
    if (rowData.id != null && rowData.id != undefined) {//update
      this.accountServiceService.updateSbServices(rowData).subscribe((data: any) => {
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
              if(this.sbAccId != null && this.sbAccId != undefined){//for grid list
                this.getServiceChargesHistroy(this.sbAccId);
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
      rowData.status = applicationConstants.ACTIVE;
      this.accountServiceService.addSbServices(rowData).subscribe((data: any) => {//create or save
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
              if(this.sbAccId != null && this.sbAccId != undefined){//for grid list
                this.getServiceChargesHistroy(this.sbAccId);
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
  * @implements file upload service
  * @param event
  * @param fileUpload
  * @author jyothi.naidana
    */
  fileUploader(event: any, fileUpload: FileUpload) {
    this.multipleFilesList = [];
    this.accountService.filesDTOList = [];
    this.accountService.requestDocPath = null;
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
          this.accountService.filesDTOList.push(files); // Add to filesDTOList array
        }
        let timeStamp = this.commonComponent.getTimeStamp();
        this.accountService.filesDTOList[0].fileName = "SB_ACCOUNT_SERVICE_CHARGES" + this.sbAccId + "_" +timeStamp+ "_"+ file.name ;
        this.accountService.requestDocPath = "SB_ACCOUNT_SERVICE_CHARGES" + this.sbAccId + "_" +timeStamp+"_"+ file.name; // This will set the last file's name as docPath
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
  let removeFileIndex = this.accountService.filesDTOList.findIndex((obj: any) => obj && obj.fileName === this.accountService.requestDocPath);
  let obj = this.accountService.filesDTOList.find((obj: any) => obj && obj.fileName === this.accountService.requestDocPath);
  this.accountService.filesDTOList.splice(removeFileIndex, 1);
  this.accountService.requestDocPath = null;
}

/**
* @author jyothi.naidana
* @implements get service configuration by product Id 
* @argument productId
*/
getServiceConfigDetailsByProductIdAndServiceType(serviceTypeId : any){
  this.accountService.serviceCharges = null;
  this.accountService.frequency = null;
    this.savingsBankServicesService.getServiceChargesConfigDetailsByProductIdAndServiceTypeId(this.productId).subscribe((response : any ) =>{
      this.responseModel = response;
      if(this.responseModel != null && this.responseModel != undefined){
      if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        if(this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined){
          this.serviceCofigDetailsList = this.responseModel.data;
          let serviceConfigObj = this.serviceCofigDetailsList.find((obj:any) => obj.serviceTypeId == serviceTypeId);
          if(serviceConfigObj != null && serviceConfigObj != undefined){
            if(serviceConfigObj.serviceCharges != null && serviceConfigObj.serviceCharges != undefined){
              this.accountService.serviceCharges  = serviceConfigObj.serviceCharges ;
            }
            if(serviceConfigObj.chargesCollectionFrequencyName != null && serviceConfigObj.chargesCollectionFrequencyName != undefined){
              this.accountService.frequency  = serviceConfigObj.chargesCollectionFrequencyName ;
            }
          }
        }
      }
      else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
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

  /**
   * @implements cancle account service saveOrUpdate
   * @author jyothi.naidana
   */
  cancelOrRefresh() {
    this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
    this.accountService = new AccountService();
    // this.accountService.startDateVal = this.commonFunctionsService.currentDate();
    if (this.accountNumber != null && this.accountNumber != undefined) {
      this.accountService.accountNumber = this.accountNumber;
    }
    this.isEditDeleteButtonEnable = false;
  }
  isBasicDetails: boolean = false;
  position: string = 'center';
  showBasicDetailsDialog(position: string) {
    this.position = position;
    this.isBasicDetails = true;
  }


}
