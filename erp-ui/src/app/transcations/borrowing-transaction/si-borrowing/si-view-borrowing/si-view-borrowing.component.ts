import { Component } from '@angular/core';
import { SiBorrowingAccountDetails } from '../si-borrowing-stepper/shared/siborrowing.model';
import { SiBorrowingAccountMapping } from '../si-borrowing-stepper/si-borrowing-account-mapping/shared/si-borrowing-account-mapping.model';
import { SiBorrowingDocument } from '../si-borrowing-stepper/si-borrowing-document/shared/si-borrowing-document.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SiBorrowingAccountMappingService } from '../si-borrowing-stepper/si-borrowing-account-mapping/shared/si-borrowing-account-mapping.service';
import { SiBorrowingDocumentService } from '../si-borrowing-stepper/si-borrowing-document/shared/si-borrowing-document.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SiBorrowingStepperService } from '../si-borrowing-stepper/shared/si-borrowing-stepper.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { BorrowingTransactionConstant } from '../../borrowing-transaction-constants';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-si-view-borrowing',
  templateUrl: './si-view-borrowing.component.html',
  styleUrls: ['./si-view-borrowing.component.css']
})
export class SiViewBorrowingComponent {
  orgnizationSetting:any;
  siborrowingAccountDetailsModel :SiBorrowingAccountDetails = new SiBorrowingAccountDetails();
  SiBorrowingAccountMappingModel:SiBorrowingAccountMapping = new SiBorrowingAccountMapping();
  SiBorrowingDocumentModel:SiBorrowingDocument = new SiBorrowingDocument();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  statusList: any[] = [];
  financiarbanktypeList: any[] = [];
  gridListData: any[] = [];
  borrowingaccountmapping: any[] = [];
  borrowingdocument: any[] = [];
  subColumns:any[]=[];
  coinList:any[]=[];
  siborrowingMappingList:any[]=[];
  borrowingdocumentlist:any[]=[];
  gridListLenght: Number | undefined;
  editbtn: Boolean = true;
  borrowingAccountId:any;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private router:Router, 
    private commonFunctionsService: CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,
    private siBorrowingAccountMappingService:SiBorrowingAccountMappingService,
    private siBorrowingDocumentService:SiBorrowingDocumentService,
    private SiBorrowingStepperService : SiBorrowingStepperService,
    private datePipe: DatePipe,private translate: TranslateService,private fileUploadService :FileUploadService
  ){
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
      this.SiBorrowingStepperService.getPreviewDataBySiBorrowingAccountId(this.borrowingAccountId).subscribe(res => {
        this.responseModel = res;
        if(this.siborrowingAccountDetailsModel.sanctionedDate != undefined && this.siborrowingAccountDetailsModel.sanctionedDate != null)
          this.siborrowingAccountDetailsModel.sanctionedDate = this.commonFunctionsService.getUTCEpoch(new Date(this.siborrowingAccountDetailsModel.sanctionedDate));
        if (this.responseModel != null && this.responseModel != undefined) {
          this.siborrowingAccountDetailsModel = this.responseModel.data[0];
  
          if(null != this.siborrowingAccountDetailsModel.sanctionedDate)
         this.siborrowingAccountDetailsModel.sanctionedDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.sanctionedDate, this.orgnizationSetting.datePipe);
  
          if(null != this.siborrowingAccountDetailsModel.applicationDate)
            this.siborrowingAccountDetailsModel.applicationDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.applicationDate, this.orgnizationSetting.datePipe);
  
  
          if(null != this.siborrowingAccountDetailsModel.requestedDate)
            this.siborrowingAccountDetailsModel.requestedDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.requestedDate, this.orgnizationSetting.datePipe);
  
  
          if(null != this.siborrowingAccountDetailsModel.borrowingDueDate)
            this.siborrowingAccountDetailsModel.borrowingDueDate=this.datePipe.transform(this.siborrowingAccountDetailsModel.borrowingDueDate, this.orgnizationSetting.datePipe);

          if(this.siborrowingAccountDetailsModel.signedCopyPath != null && this.siborrowingAccountDetailsModel.signedCopyPath != undefined)
            this.siborrowingAccountDetailsModel.multipartFileList = this.fileUploadService.getFile(this.siborrowingAccountDetailsModel.signedCopyPath ,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.siborrowingAccountDetailsModel.signedCopyPath);

          if (this.siborrowingAccountDetailsModel.siborrowingAccountMappedLoansDTOList != null && this.siborrowingAccountDetailsModel.siborrowingAccountMappedLoansDTOList.length > 0) {
            this.siborrowingMappingList = this.siborrowingAccountDetailsModel.siborrowingAccountMappedLoansDTOList;
          }
          if (this.siborrowingAccountDetailsModel.siborrowingAccountDocumentsDTOList != null && this.siborrowingAccountDetailsModel.siborrowingAccountDocumentsDTOList.length > 0) {
            this.borrowingdocumentlist = this.siborrowingAccountDetailsModel.siborrowingAccountDocumentsDTOList;
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
    this.router.navigate([BorrowingTransactionConstant.SI_BORROWINGS]); 
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.SI_BORROWING_APPLICATION }];
    setTimeout(() => {
      this.router.navigate([BorrowingTransactionConstant.SI_BORROWINGS]);
    }, 1500);
  }
  editborrowingdetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([BorrowingTransactionConstant.SI_ACCOUNT_DETAILS], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 1:
        this.router.navigate([BorrowingTransactionConstant.SI_BORROWING_ACCOUNT_MAPPING], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 2:
        this.router.navigate([BorrowingTransactionConstant.SI_BORROWING_DOCUMENT], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
    }
  }
  
}
