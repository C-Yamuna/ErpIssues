import { Component } from '@angular/core';
import { BorrowingTransactionConstant } from '../../borrowing-transaction-constants';
import { TermAccountDetails } from '../term-borrowing-stepper/term-account-details/shared/term-account-details.model';
import { TermBorrowingAccountMapping } from '../term-borrowing-stepper/term-borrowing-account-mapping/shared/term-borrowing-account-mapping.model';
import { TermBorrowingDocument } from '../term-borrowing-stepper/term-borrowing-document/shared/term-borrowing-document.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { TermAccountDetailsService } from '../term-borrowing-stepper/term-account-details/shared/term-account-details.service';
import { TermBorrowingAccountMappingService } from '../term-borrowing-stepper/term-borrowing-account-mapping/shared/term-borrowing-account-mapping.service';
import { TermBorrowingDocumentService } from '../term-borrowing-stepper/term-borrowing-document/shared/term-borrowing-document.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { TranslateService } from '@ngx-translate/core';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';

@Component({
  selector: 'app-term-view-borrowing',
  templateUrl: './term-view-borrowing.component.html',
  styleUrls: ['./term-view-borrowing.component.css']
})
export class TermViewBorrowingComponent {
  termAccountDetailsModel :TermAccountDetails = new TermAccountDetails();
  termBorrowingAccountMappingModel:TermBorrowingAccountMapping = new TermBorrowingAccountMapping();
  termBorrowingDocumentModel:TermBorrowingDocument = new TermBorrowingDocument();

  borrowingaccountmapping: any[] = [];
  borrowingdocument: any[] = [];
  statusList: any[]=[];
 
  responseModel!: Responsemodel;
  msgs: any[]=[];

  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  countryList: any[]=[];
  memberLandDetails: any;
  borrowingAccountId: any;
  editbtn: Boolean = true;
  termborrowingAccountMappingList: any[]=[];
  borrowingdocumentlist: any[]=[];
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder,
   
    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,private datePipe: DatePipe,
    private router: Router, private commonFunctionsService: CommonFunctionsService,
    private termAccountDetailsService : TermAccountDetailsService,private termBorrowingAccountMappingService:TermBorrowingAccountMappingService,
    private termBorrowingDocumentService :TermBorrowingDocumentService,private translate: TranslateService,
    private fileUploadService :FileUploadService) {

      this.borrowingaccountmapping = [
        { field: 'loanMemberAdmissionNumber', header: 'BORROWINGSTRANSACTIONS.ADMISSION_NUMBER' },
        { field: 'loanAccountNumber', header: 'BORROWINGSTRANSACTIONS.LOAN_ACCOUNT_NUMBER' },
        { field: '', header: 'BORROWINGSTRANSACTIONS.NAME' },
        { field: '', header: 'BORROWINGSTRANSACTIONS.DATE_OF_BIRTH' },
        { field: '',header:'BORROWINGSTRANSACTIONS.AADHAR_NUMBER'},
        { field: '',header:'BORROWINGSTRANSACTIONS.PURPOSE'},
        { field: 'loanAmount',header:'BORROWINGSTRANSACTIONS.REQUESTED_AMOUNT'},
       
      ];
      // this.borrowingdocument = [
      //   { field: 'documentTypeName', header: 'BORROWINGSTRANSACTIONS.DOCUMENT_TYPE' },
      //   { field: 'documentNumber', header: 'BORROWINGSTRANSACTIONS.DOCUMENT_NO' },
      //   { field: '', header: 'BORROWINGSTRANSACTIONS.FILE_PATH' },
      //   { field: '', header: 'BORROWINGSTRANSACTIONS.REMARKS' },
        
       
      // ];
  }
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use(this.commonFunctionsService.getStorageValue('language'));
      }
    this.activateRoute.queryParams.subscribe(params => {
      this.commonComponent.startSpinner();
      if (params['id'] != undefined && params['id'] != null) {
          this.borrowingAccountId = this.encryptService.decrypt(params['id']);
        if (params['editbtn'] != undefined && params['editbtn'] != null) {
          let isEditParam = this.encryptService.decrypt(params['editbtn']);
          if (isEditParam == "1") {
            this.editbtn = true;
          } else {
            this.editbtn = false;
          }
        }
        if (params['isGridPage'] != undefined && params['isGridPage'] != null) {
          let isGrid = this.encryptService.decrypt(params['isGridPage']);
          if (isGrid === "0") {
            this.isShowSubmit = applicationConstants.FALSE;
          } else {
            this.isShowSubmit = applicationConstants.TRUE;
          }
        }
        this.isEdit = true;
        this.termAccountDetailsService.getPreviewDataByBorrowingAccountId(this.borrowingAccountId).subscribe(res => {
          this.responseModel = res;
          if(this.termAccountDetailsModel.sanctionedDate != undefined && this.termAccountDetailsModel.sanctionedDate != null)
            this.termAccountDetailsModel.sanctionedDate = this.commonFunctionsService.getUTCEpoch(new Date(this.termAccountDetailsModel.sanctionedDate));
          if (this.responseModel != null && this.responseModel != undefined) {
            this.termAccountDetailsModel = this.responseModel.data[0];
    
            if(null != this.termAccountDetailsModel.sanctionedDate)
           this.termAccountDetailsModel.sanctionedDate=this.datePipe.transform(this.termAccountDetailsModel.sanctionedDate, this.orgnizationSetting.datePipe);
    
            if(null != this.termAccountDetailsModel.applicationDate)
              this.termAccountDetailsModel.applicationDate=this.datePipe.transform(this.termAccountDetailsModel.applicationDate, this.orgnizationSetting.datePipe);
    
    
            if(null != this.termAccountDetailsModel.requestedDate)
              this.termAccountDetailsModel.requestedDate=this.datePipe.transform(this.termAccountDetailsModel.requestedDate, this.orgnizationSetting.datePipe);
    
    
            if(null != this.termAccountDetailsModel.borrowingDueDate)
              this.termAccountDetailsModel.borrowingDueDate=this.datePipe.transform(this.termAccountDetailsModel.borrowingDueDate, this.orgnizationSetting.datePipe);
    
            if(this.termAccountDetailsModel.signedCopyPath != null && this.termAccountDetailsModel.signedCopyPath != undefined)
              this.termAccountDetailsModel.multipartFileList = this.fileUploadService.getFile(this.termAccountDetailsModel.signedCopyPath ,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.termAccountDetailsModel.signedCopyPath);


            if (this.termAccountDetailsModel.borrowingAccountMappedLoansDTOList != null && this.termAccountDetailsModel.borrowingAccountMappedLoansDTOList.length > 0) {
              this.termborrowingAccountMappingList = this.termAccountDetailsModel.borrowingAccountMappedLoansDTOList;
            }
            if (this.termAccountDetailsModel.borrowingAccountDocumentsDTOList != null && this.termAccountDetailsModel.borrowingAccountDocumentsDTOList.length > 0) {
              this.borrowingdocumentlist = this.termAccountDetailsModel.borrowingAccountDocumentsDTOList;
            }
            this.borrowingdocumentlist  = this.borrowingdocumentlist.filter(obj => null != obj && null !=obj.status && obj.status === applicationConstants.ACTIVE ).map((kyc:any)=>{
              kyc.multipartFileList = this.fileUploadService.getFile(kyc.documentPath ,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.documentPath);
              return kyc;
            });
          }
        });
      } else {
        this.isEdit = false;
      }
    })
    })
    }
    navigateToBack(){
      this.router.navigate([BorrowingTransactionConstant.TERM_BORROWINGS]); 
    }
    submit() {
      this.msgs = [];  
      this.msgs = [{ severity: "success", detail:  applicationConstants.TERM_BORROWING_APPLICATION }];
      setTimeout(() => {
        this.router.navigate([BorrowingTransactionConstant.TERM_BORROWINGS]);
      }, 1500);
    }
    editborrowingdetails(rowData: any, activeIndex: any) {
      switch (activeIndex) {
        case 0:
          this.router.navigate([BorrowingTransactionConstant.TERM_ACCOUNT_DETAILS], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
          break;
        case 1:
          this.router.navigate([BorrowingTransactionConstant.TERM_BORROWING_ACCOUNT_MAPPING], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
          break;
        case 2:
          this.router.navigate([BorrowingTransactionConstant.TERM_BORROWING_DOCUMENT], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
          break;
      }
    }
}
