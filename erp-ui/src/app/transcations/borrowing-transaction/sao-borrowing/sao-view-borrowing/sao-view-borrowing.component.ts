import { Component } from '@angular/core';
import { SaoAccountdetails } from '../sao-borrowing-stepper/sao-account-details/shared/sao-accountdetails.model';
import { SaoBorrowingAccountMapping } from '../sao-borrowing-stepper/sao-borrowing-account-mapping/shared/sao-borrowing-account-mapping.model';
import { SaoBorrowingDocuments } from '../sao-borrowing-stepper/sao-borrowing-documents/shared/sao-borrowing-documents.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { CiAccountDetailsService } from '../../ci-borrowing/ci-borrowing-stepper/ci-account-details/shared/ci-account-details.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { FormBuilder } from '@angular/forms';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SaoBorrowingAccountMappingService } from '../sao-borrowing-stepper/sao-borrowing-account-mapping/shared/sao-borrowing-account-mapping.service';
import { SaoBorrowingDocumentsService } from '../sao-borrowing-stepper/sao-borrowing-documents/shared/sao-borrowing-documents.service';
import { SaoAccountDetailsService } from '../sao-borrowing-stepper/sao-account-details/shared/sao-account-details.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { BorrowingTransactionConstant } from '../../borrowing-transaction-constants';
import { TranslateService } from '@ngx-translate/core';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-sao-view-borrowing',
  templateUrl: './sao-view-borrowing.component.html',
  styleUrls: ['./sao-view-borrowing.component.css']
})
export class SaoViewBorrowingComponent {
  saoAccountdetailsModel :SaoAccountdetails = new SaoAccountdetails();
  saoBorrowingAccountMappingModel:SaoBorrowingAccountMapping = new SaoBorrowingAccountMapping();
  saoBorrowingDocumentsModel:SaoBorrowingDocuments = new SaoBorrowingDocuments();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  statusList: any[] = [];
  financiarbanktypeList: any[] = [];
  gridListData: any[] = [];
  borrowingaccountmapping: any[] = [];
  borrowingdocument: any[] = [];
  subColumns:any[]=[];
  orgnizationSetting:any;
  coinList:any[]=[];
  saoborrowingMappingList:any[]=[];
  borrowingdocumentlist:any[]=[];
  gridListLenght: Number | undefined;
  editbtn: Boolean = true;
  borrowingAccountId:any;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private router:Router, 
    private commonFunctionsService: CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,
    private saoBorrowingAccountMappingService:SaoBorrowingAccountMappingService,
    private saoBorrowingDocumentsService:SaoBorrowingDocumentsService,
    private saoAccountDetailsService : SaoAccountDetailsService,
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
      this.saoAccountDetailsService.getPreviewDataBySaoBorrowingAccountId(this.borrowingAccountId).subscribe(res => {
        this.responseModel = res;
        if(this.saoAccountdetailsModel.sanctionedDate != undefined && this.saoAccountdetailsModel.sanctionedDate != null)
          this.saoAccountdetailsModel.sanctionedDate = this.commonFunctionsService.getUTCEpoch(new Date(this.saoAccountdetailsModel.sanctionedDate));
        if (this.responseModel != null && this.responseModel != undefined) {
          this.saoAccountdetailsModel = this.responseModel.data[0];
  
          if(null != this.saoAccountdetailsModel.sanctionedDate)
         this.saoAccountdetailsModel.sanctionedDate=this.datePipe.transform(this.saoAccountdetailsModel.sanctionedDate, this.orgnizationSetting.datePipe);
  
          if(null != this.saoAccountdetailsModel.applicationDate)
            this.saoAccountdetailsModel.applicationDate=this.datePipe.transform(this.saoAccountdetailsModel.applicationDate, this.orgnizationSetting.datePipe);
  
  
          if(null != this.saoAccountdetailsModel.requestedDate)
            this.saoAccountdetailsModel.requestedDate=this.datePipe.transform(this.saoAccountdetailsModel.requestedDate, this.orgnizationSetting.datePipe);
  
  
          if(null != this.saoAccountdetailsModel.borrowingDueDate)
            this.saoAccountdetailsModel.borrowingDueDate=this.datePipe.transform(this.saoAccountdetailsModel.borrowingDueDate, this.orgnizationSetting.datePipe);

          if(this.saoAccountdetailsModel.signedCopyPath != null && this.saoAccountdetailsModel.signedCopyPath != undefined)
            this.saoAccountdetailsModel.multipartFileList = this.fileUploadService.getFile(this.saoAccountdetailsModel.signedCopyPath ,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.saoAccountdetailsModel.signedCopyPath);

          if (this.saoAccountdetailsModel.saoBorrowingAccountMappedLoansDTOList != null && this.saoAccountdetailsModel.saoBorrowingAccountMappedLoansDTOList.length > 0) {
            this.saoborrowingMappingList = this.saoAccountdetailsModel.saoBorrowingAccountMappedLoansDTOList;
          }
          if (this.saoAccountdetailsModel.saoBorrowingAccountDocumentsDTOList != null && this.saoAccountdetailsModel.saoBorrowingAccountDocumentsDTOList.length > 0) {
            this.borrowingdocumentlist = this.saoAccountdetailsModel.saoBorrowingAccountDocumentsDTOList;
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
    this.router.navigate([BorrowingTransactionConstant.SAO_BORROWINGS]); 
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.SAO_BORROWING_APPLICATION }];
    setTimeout(() => {
      this.router.navigate([BorrowingTransactionConstant.SAO_BORROWINGS]);
    }, 1500);
  }
  editborrowingdetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([BorrowingTransactionConstant.SAO_ACCOUNT_DETAILS], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 1:
        this.router.navigate([BorrowingTransactionConstant.SAO_BORROWING_ACCOUNT_MAPPING], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 2:
        this.router.navigate([BorrowingTransactionConstant.SAO_BORROWING_DOCUMENT], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
    }
  }
}
