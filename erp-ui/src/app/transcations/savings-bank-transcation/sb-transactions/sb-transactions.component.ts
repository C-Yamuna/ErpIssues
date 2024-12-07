import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';

import { ActivatedRoute, Router } from '@angular/router';
import { savingsbanktransactionconstant } from '../savingsbank-transaction-constant';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SavingBankApplicationService } from '../savings-bank-account-creation-stepper/savings-bank-application/shared/saving-bank-application.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SavingsBankCommunicationService } from '../savings-bank-account-creation-stepper/savings-bank-communication/shared/savings-bank-communication.service';
import { StatesService } from '../../term-deposits-transcation/shared/states.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { MembershipServiceService } from '../savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-service.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SavingBankApplicationModel } from '../savings-bank-account-creation-stepper/savings-bank-application/shared/saving-bank-application-model';
import { MemberGroupDetailsModel, MembershipBasicRequiredDetails, MembershipInstitutionDetailsModel } from '../savings-bank-account-creation-stepper/membership-basic-required-details/shared/membership-basic-required-details';
import { SbTransactionService } from './shared/sb-transaction.service';
import { ChequeDetails, SbTransaction, TransferTransactionDetails } from './shared/sb-transaction';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { TranslateService } from '@ngx-translate/core';

interface Transaction {
  id: number;
  particulars: string;
  withdraw: string;
  deposit: string;
  balance: string;
  amount: number;
}
@Component({
  selector: 'app-sb-transactions',
  templateUrl: './sb-transactions.component.html',
  styleUrls: ['./sb-transactions.component.css']
})
export class SbTransactionsComponent {
  transactionTypeOptions: any[] = [];
  paymentMethodOptions: any[] = [];
  selectedTransactionType: any;
  selectedPaymentMethod: any;
  // selectedDate: Date;
  showCashForm: boolean = false;
  showChequeForm: boolean = false;
  sbTransactionFrom: any;
  orgnizationSetting: any;
  responseModel!: Responsemodel;
  sbAccId: any;
  isEdit: any;
  savingBankApplicationModel: SavingBankApplicationModel = new SavingBankApplicationModel();
  membershipBasicRequiredDetails: MembershipBasicRequiredDetails = new MembershipBasicRequiredDetails();
  memberGroupDetailsModel: MemberGroupDetailsModel = new MemberGroupDetailsModel();
  membershipInstitutionDetailsModel: MembershipInstitutionDetailsModel = new MembershipInstitutionDetailsModel();
  sbTransactionModel: SbTransaction = new SbTransaction();
  chequeDetails : ChequeDetails = new ChequeDetails();
  transferTransactionDetails : TransferTransactionDetails = new TransferTransactionDetails();
  transactions: any[] = [];
  memberTypeName: any;
  paymentMethodOptionsForDepositType: any[] = [];
  depositFlag: boolean = false;
  paymentMethodOptionsForWithDrawalType: any[] = [];
  msgs: any[] = [];
  transactionColumns: any[] = [];
  columns: { field: string; header: string; }[];
  subColumns: { field: string; header: string; }[];
  pacsId: any;
  branchId: any;
  withDrawalFlag: boolean = false;
  transferForShow: boolean = false;
  addDenominationDetailsPopUp: boolean = false;
  currencyList: any[] = [];
  coinList: any[] = [];

  notesDenominationList: any[] = [];
  coinsDenominationList: any[] = [];
  confirmDialog: boolean = false;
  voucherDeiloge: boolean = false;
  transactionModelList: any[] = [];
  accountNumber: any;
  minBalence: any;
  accountType : any;
  transactionDateVal: any;
  photoCopyFlag: boolean = true;
  signatureCopyFlag: boolean = true;
  isKycApproved: any;
  institionPromotersList: any[] = [];
  membreIndividualFlag: boolean = false;
  groupPromotersPopUpFlag: boolean = false;
  institutionPromoterFlag: boolean = false;
  memberPhotoCopyZoom: boolean = false;

  admissionNumber : any;
  groupPrmoters: any[] = [];
  groupPrmotersList: any [] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private savingBankApplicationService: SavingBankApplicationService, private commonComponent: CommonComponent, private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService, private savingsBankCommunicationService: SavingsBankCommunicationService, private statesService: StatesService, private commonFunctionsService: CommonFunctionsService, private datePipe: DatePipe, private membershipServiceService: MembershipServiceService, private sbTransactionService: SbTransactionService ,private fileUploadService :FileUploadService,private translate: TranslateService) {
    this.sbTransactionFrom = this.formBuilder.group({
        'trnsactionType': new FormControl('', Validators.required),
        "transactionMode": new FormControl('', Validators.required),
        "accountNumber":new FormControl({ value: '', disabled: true }, Validators.required),
        "accountHolderName": new FormControl('', Validators.required),
        "amountInWords": new FormControl({ value: '', disabled: true }, Validators.required),
        "accountType": new FormControl({ value: '', disabled: true }, Validators.required),
        "amount": new FormControl('', Validators.required),
        "transactionDate": new FormControl({ value: '', disabled: true },Validators.required),
        //cheque
        "chequeHolderName": new FormControl('',Validators.required),
        "branch": new FormControl('',Validators.required),
        "chequeNumber": new FormControl('',Validators.required),
        "chequeValidDate": new FormControl('',Validators.required),
        "chequeAmount": new FormControl('',Validators.required),
        "narration": new FormControl('',Validators.required),

        //transaction
        "transferAccountHolderName": new FormControl('',Validators.required),
        "transferAmount": new FormControl('',Validators.required),
        "transaferBranch": new FormControl('',Validators.required),
        "transferNarration": new FormControl('',Validators.required),
    });
    this.transactionColumns = [
      { field: 'trnasactionDateVal', header: 'DEMANDDEPOSITS.TRANSACTION_DATE' },
      { field: 'particulars', header: 'DEMANDDEPOSITS.PARTICULARS' },
      { field: 'transactionModeName', header: 'DEMANDDEPOSITS.TRANSACTION_MODE' },
      { field: 'transactionTypeName', header: 'DEMANDDEPOSITS.TRANSACTION_TYPE' },
      { field: 'transactionAmount', header: 'DEMANDDEPOSITS.TRANSACTION_AMOUNT' },
      { field: 'balance', header: 'DEMANDDEPOSITS.BALENCE_AMOUNT' }
    ];
    this.transactionTypeOptions = [
      { label: 'Credit', value: 1 },
      { label: 'Debit', value: 2 }
    ];

    this.paymentMethodOptionsForDepositType = [
      { label: 'Cash', value: 1 },
      { label: 'Cheque', value: 2 }
    ];
    this.paymentMethodOptionsForWithDrawalType = [
      { label: 'Cash', value: 1 },
      { label: 'Cheque', value: 2 },
      { label: 'transafer', value: 3 }
    ];

    this.columns = [
      { field: 'transactionModeName', header: 'DEMANDDEPOSITS.TRANSACTION_MODE' },
      { field: 'transactionTypeName', header: 'DEMANDDEPOSITS.TRANSACTION_TYPE' },
      { field: 'trnasactionDateVal', header: 'DEMANDDEPOSITS.TRANSACTION_DATE' },
      { field: 'transactionAmount', header: 'DEMANDDEPOSITS.TRANSACTION_AMOUNT' },
      { field: 'statusName', header: 'DEMANDDEPOSITS.STATUS' },
    ];
    this.subColumns = [
      { field: 'coins', header: 'Coins' },
      { field: '', header: 'Count' },
      { field: '', header: 'Amount' },
    ];

    this.groupPrmoters = [ //promoter grid feilds for group and institution
      { field: 'surname', header: 'DEMANDDEPOSITS.SURNAME' },
      { field: 'name', header: 'DEMANDDEPOSITS.NAME' },
      { field: 'operatorTypeName', header: 'DEMANDDEPOSITS.OPERATION_TYPE_NAME' },
      { field: 'memDobVal', header: 'DEMANDDEPOSITS.MEMBER_DATE_OF_BIRTH' },
      { field: 'age', header: 'DEMANDDEPOSITS.AGE' },
      { field: 'genderName', header: 'DEMANDDEPOSITS.GENDER' },
      { field: 'maritalStatusName', header: 'DEMANDDEPOSITS.MARITAL_STATUS' },
      { field: 'mobileNumber', header: 'DEMANDDEPOSITS.MOBILE_NUMBER' },
      { field: 'emailId', header: 'DEMANDDEPOSITS.EMAIL' },
      { field: 'aadharNumber', header: 'DEMANDDEPOSITS.AADHAR' },
      { field: 'startDate', header: 'DEMANDDEPOSITS.START_DATE' },
    ];
  }

  // @jyothi.naidana
  ngOnInit(): void {
    this.pacsId = 1;
    this.branchId = 1;
    this.translate.use(this.commonFunctionsService.getStorageValue('language'));
    this.accountType = applicationConstants.SAVINGS_ACCOUNT;
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    // this.showForm = this.commonFunctionsService.getStorageValue(applicationConstants.B_CLASS_MEMBER_CREATION);
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        if (params['id'] != undefined) {
          let id = this.encryptDecryptService.decrypt(params['id']);
          this.sbAccId = Number(id);
          this.getSbAccountDetailsById(this.sbAccId);
        }
      }
    });
    this.sbTransactionModel.trnasactionDateVal= this.commonFunctionsService.currentDate();
    this.getTopTransactionsList();
  }


  
	// {@code on change transaction type} :
	// @implNote:set transaction mode list based on transaction type 
	// @param transaction type
	// @author jyothi.naidana
  transactionType(event: any) {
    if (event == 1) {
      this.depositFlag = true;
      this.withDrawalFlag = false;
      this.paymentMethodOptions = [
        { label: 'Cash', value: 1 },
        { label: 'Cheque', value: 2 }
      ];
      this.sbTransactionModel.transactionTypeName = 'Credit';
    } else if (event == 2) {
      this.depositFlag = false;
      this.withDrawalFlag = true;
      this.paymentMethodOptions = [
        { label: 'Cash', value: 1 },
        { label: 'Cheque', value: 2 },
        { label: 'transafer', value: 3 }
      ];
      this.sbTransactionModel.transactionTypeName = 'Debit';
    } else {
      this.showCashForm = false;
      this.showChequeForm = false;
    }
  }

  // {@code on change transaction Mode} :
	// @implNote:enable cash or withdrawal or transfer from based on transaction mode
	// @param transactionMode
	// @author jyothi.naidana
  toggleCashForm(element: any) {
    if (element == 1) {
      this.showCashForm = true;
      this.showChequeForm = false;
      this.transferForShow = false;
      this.paymentMethodOptions = this.paymentMethodOptionsForDepositType;
      this.sbTransactionModel.transactionModeName = "Cash";
    } else if (element == 2) {
      this.showCashForm = false;
      this.showChequeForm = true;
      this.transferForShow = false;
      this.paymentMethodOptions = this.paymentMethodOptionsForWithDrawalType;
      this.sbTransactionModel.transactionModeName = "Cheque";
    } else {
      this.transferForShow = true;
      this.showCashForm = false;
      this.showChequeForm = false;
      this.sbTransactionModel.transactionModeName = "transafer";
    }
  }

  // {@code back navigation} :
	// @implNote:back navigation to grid from transaction operation screen
	// @author jyothi.naidana
  back() {
    this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
  }

  // {@code get savings bank details by sbId} :
	// @implNote:get Member details from savings account details to load member card data
	// @author jyothi.naidana
  getSbAccountDetailsById(id: any) {
    this.savingBankApplicationService.getSbApplicationById(id).subscribe((data: any) => {
      this.responseModel = data;
        if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0) {
          if (this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.savingBankApplicationModel = this.responseModel.data[0];
              if (this.savingBankApplicationModel.memberTypeName != null && this.savingBankApplicationModel.memberTypeName != undefined) {
                this.memberTypeName = this.savingBankApplicationModel.memberTypeName;
              }
              if (this.savingBankApplicationModel.admissionNumber != null && this.savingBankApplicationModel.admissionNumber != undefined) {
                this.admissionNumber = this.savingBankApplicationModel.admissionNumber;
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
                  this.membershipBasicRequiredDetails.multipartFileListForPhotoCopy = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.photoCopyPath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.photoCopyPath  );
                  
                }
                else{
                  this.photoCopyFlag = false;
                }
                if (this.membershipBasicRequiredDetails.signatureCopyPath != null && this.membershipBasicRequiredDetails.signatureCopyPath != undefined) {
                    this.membershipBasicRequiredDetails.multipartFileListForsignatureCopyPath = this.fileUploadService.getFile(this.membershipBasicRequiredDetails.signatureCopyPath ,ERP_TRANSACTION_CONSTANTS.DEMANDDEPOSITS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.membershipBasicRequiredDetails.signatureCopyPath  );
                }
                else{
                  this.signatureCopyFlag = false;
                }
                if (this.membershipBasicRequiredDetails.isStaff != null && this.membershipBasicRequiredDetails.isStaff != undefined && this.membershipBasicRequiredDetails.isStaff) {
                  this.membershipBasicRequiredDetails.isStaff = applicationConstants.YES;
                }
                else{
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
                if (this.memberGroupDetailsModel.isKycApproved != null && this.memberGroupDetailsModel.isKycApproved != undefined) {
                  this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
                }
                else {
                  this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
                }
                if (this.memberGroupDetailsModel.groupPromoterList != null && this.memberGroupDetailsModel.groupPromoterList != undefined && this.memberGroupDetailsModel.groupPromoterList.length > 0) {
                  this.groupPrmotersList=this.memberGroupDetailsModel.groupPromoterList ;
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
                  this.institionPromotersList=this.membershipInstitutionDetailsModel.institutionPromoterList ;
                }
                if (this.membershipInstitutionDetailsModel.isKycApproved != null && this.membershipInstitutionDetailsModel.isKycApproved != undefined) {
                  this.isKycApproved = applicationConstants.KYC_APPROVED_NAME;
                }
                else {
                  this.isKycApproved = applicationConstants.KYC_NOT_APPROVED_NAME;
                }
              }
              if (this.savingBankApplicationModel.accountNumber != null && this.savingBankApplicationModel.accountNumber != undefined) {
                this.sbTransactionModel.accountNumber = this.savingBankApplicationModel.accountNumber;
              }
              if (this.savingBankApplicationModel.minBalance != null && this.savingBankApplicationModel.minBalance != undefined) {
                this.minBalence = this.savingBankApplicationModel.minBalance;
              }
              
              this.getTopTransactionsList();
            }
          }
          else{
            this.msgs = [];
            this.commonComponent.stopSpinner();
            this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
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


  // {@code save or update transaction details} :
	// @implNote:save or update transaction details
	// @author jyothi.naidana
  saveOrUpdateTransactionDetails() {
    this.confirmDialog = false;
    this.sbTransactionModel.sbAccId = this.sbAccId;
    this.sbTransactionModel.pacsId = this.pacsId;
    this.sbTransactionModel.branchId = this.branchId;
    if (this.sbTransactionModel.transactionMode != null && this.sbTransactionModel.transactionMode != undefined && this.sbTransactionModel.transactionMode === 2) {
      if (this.chequeDetails != null && this.chequeDetails != undefined) {
        this.sbTransactionModel.chequeTransactionDetailsDTO = this.chequeDetails;
        if(this.chequeDetails.amount != null && this.chequeDetails.amount != undefined){
          this.sbTransactionModel.transactionAmount = this.chequeDetails.amount;
        }
        if(this.chequeDetails.beneficiaryName != null && this.chequeDetails.beneficiaryName != undefined){
          this.sbTransactionModel.particulars = this.chequeDetails.beneficiaryName;
        }
      }
    }
    if(this.sbTransactionModel.transactionMode != null && this.sbTransactionModel.transactionMode != undefined && this.sbTransactionModel.transactionMode === 3){
      if(this.transferTransactionDetails != null && this.transferTransactionDetails != undefined){
        this.sbTransactionModel.transferTransactionDetailsDTO = this.transferTransactionDetails;
        if(this.transferTransactionDetails.transactionAmount != null && this.transferTransactionDetails.transactionAmount != undefined){
          this.sbTransactionModel.transactionAmount = this.transferTransactionDetails.transactionAmount;
        }
        if(this.transferTransactionDetails.beneficiaryName != null && this.transferTransactionDetails.beneficiaryName != undefined){
          this.sbTransactionModel.particulars = this.transferTransactionDetails.beneficiaryName;
        }
      }
    }
    if (this.sbTransactionModel.trnasactionDateVal != null && this.sbTransactionModel.trnasactionDateVal != undefined) {
      this.sbTransactionModel.transactionDate = this.commonFunctionsService.getUTCEpoch(new Date(this.sbTransactionModel.trnasactionDateVal));//startDate converstion
    }
    if (this.sbTransactionModel.id != null && this.sbTransactionModel.id != undefined) {
      this.sbTransactionService.updateSbTransaction(this.sbTransactionModel).subscribe((data: any) => {
        this.responseModel = data;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
              this.voucherDeiloge = true;
          }
          this.transactionModelList.push(this.responseModel.data[0]);
          
        }
        this.getTopTransactionsList();
        this.cancel();
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
      this.sbTransactionService.addSbTransaction(this.sbTransactionModel).subscribe((data: any) => {
        this.responseModel = data;
        if (this.responseModel != null && this.responseModel != undefined) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.voucherDeiloge = true;
            this.transactionModelList.push(this.responseModel.data[0]);
          }
        }
        this.getTopTransactionsList();
        
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
   * @implements onTrnansactionSubmit if withdra check insufficient balence error message and confirmation dilogue show true
   * @author jyothi.naidana 
   */
  submit() {
    if (this.sbTransactionModel != null && this.sbTransactionModel != undefined && this.sbTransactionModel.transactionType != null && this.sbTransactionModel.transactionType != undefined && this.sbTransactionModel.transactionType == 2) {
      if (this.savingBankApplicationModel.balance == null || this.savingBankApplicationModel.balance == undefined) {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: "Insuffiecient Balence In your Account" }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
      else if (this.sbTransactionModel != null && this.sbTransactionModel != undefined && this.sbTransactionModel.transactionAmount > this.savingBankApplicationModel.balance) {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: "Insuffiecient Balence In your Account" }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
      else {
        this.confirmDialog = true;
      }
    } else {
      this.confirmDialog = true;
    }
  }

  // {@code get top five transaction details} :
	// @implNote:get to five transaction details of a particular sb account
	// @author jyothi.naidana
  getTopTransactionsList() {
    this.transactions = [];
    this.sbTransactionService.getTopFiveTransactions(this.sbAccId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined) {
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.transactions = this.responseModel.data.map((sb: any) => {
              if (sb != null && sb != undefined && sb.transactionDate != null && sb.transactionDate != undefined) {
                sb.trnasactionDateVal = this.datePipe.transform(sb.transactionDate, this.orgnizationSetting.datePipe);
              }
              return sb
            });
          }
        }
        else {
          this.commonComponent.stopSpinner();
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
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

  cancleTransaction(){

  }
  
  // addDenominationDetails() {
  //   this.notesDenominationList = [];
  //   this.coinsDenominationList = [];
  //   this.addDenominationDetailsPopUp = true;
  //   this.sbTransactionService.getAllDenominationTypes().subscribe((response: any) => {
  //     this.responseModel = response;
  //     if (this.responseModel != null && this.responseModel != undefined) {
  //       if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
  //         this.responseModel.data
  //           .filter((obj: any) => (obj.status != applicationConstants.IN_ACTIVE && !obj.isCoin))
  //           .map((obj: any) => {
  //             this.notesDenominationList.push(obj);
  //           });
  //         this.responseModel.data
  //           .filter((obj: any) => (obj.status != applicationConstants.IN_ACTIVE && obj.isCoin))
  //           .map((obj: any) => {
  //             this.coinsDenominationList.push(obj);
  //           });
  //       }
  //       else {
  //         this.commonComponent.stopSpinner();
  //         this.msgs = [];
  //         this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
  //         setTimeout(() => {
  //           this.msgs = [];
  //         }, 2000);
  //       }
  //     }
  //   },
  //     error => {
  //       this.msgs = [];
  //       this.commonComponent.stopSpinner();
  //       this.msgs = [{ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR }];
  //       setTimeout(() => {
  //         this.msgs = [];
  //       }, 2000);
  //     });


  // }

  /**
   * @author jyothi.naidana
   * @implements close photo dialogue
   */
  close(){
      this.voucherDeiloge = false;
      this.memberPhotoCopyZoom = false;
      this.membreIndividualFlag = false;
      this.cancel();
      this.refreshAllforms();
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
 * @implements getSbTransactionById
 * @param rowData 
 * @author jyothi.naidana
 */
  getSbTranasactionById(rowData : any){
    this.sbTransactionService.getSbTransaction(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
        if (this.responseModel != null && this.responseModel != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data != null && this.responseModel.data != undefined && this.responseModel.data.length > 0 && this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.sbTransactionModel = this.responseModel.data[0];
            if(this.sbTransactionModel.transactionMode != null && this.sbTransactionModel.transactionMode != undefined){
              this.toggleCashForm(this.sbTransactionModel.transactionMode);
            }
            if(this.sbTransactionModel.transactionType != null && this.sbTransactionModel.transactionType != undefined){
              this.transactionType(this.sbTransactionModel.transactionType);
            }
          }
        }
        else {
          this.commonComponent.stopSpinner();
          this.msgs = [];
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
   * @implements removeTransaction
   * @param rowData 
   * @author jyothi.naidana
   */
  deleteTransaction(rowData : any){
    this.sbTransactionService.deleteTransaction(rowData.id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel != null && this.responseModel != undefined && this.responseModel.status != null && this.responseModel.status != undefined && this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.msgs = [];
          this.msgs = [{ severity: 'success', detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
        else {
          this.commonComponent.stopSpinner();
          this.msgs = [];
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
   * @implements cancle standared instructions saveOrUpdate
   * @author jyothi.naidana
   */
  cancel(){
    this.router.navigate([savingsbanktransactionconstant.SB_TRANSACTION]);
    this.sbTransactionModel = new SbTransaction();
    this.sbTransactionModel.trnasactionDateVal= this.commonFunctionsService.currentDate();
    if(this.sbAccId != null && this.sbAccId != undefined){
      this.getSbAccountDetailsById(this.sbAccId);
    }
  }

  /**
   * @implements false all forms after close vochure transfer,cash,cheque from
   * @author jyothi.naidana
   */
  refreshAllforms(){
    this.showCashForm = false;
    this.showChequeForm = false;
    this.transferForShow = false;
    this.depositFlag = false;
    this.withDrawalFlag = false;
  }

  isBasicDetails: boolean = false;
  position: string = 'center';
  showBasicDetailsDialog(position: string) {
    this.position = position;
    this.isBasicDetails = true;
  }
}
