import { Component } from '@angular/core';
import { BorrowingTransactionConstant } from '../../borrowing-transaction-constants';
import { CiAccountDetails } from '../ci-borrowing-stepper/ci-account-details/shared/ci-account-details.model';
import { CiBorrowingDocuments } from '../ci-borrowing-stepper/ci-borrowing-documents/shared/ci-borrowing-documents.model';
import { CiBorrowingAccountMapping } from '../ci-borrowing-stepper/ci-borrowing-account-mapping/shared/ci-borrowing-account-mapping.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { FormBuilder } from '@angular/forms';
import { CiAccountDetailsService } from '../ci-borrowing-stepper/ci-account-details/shared/ci-account-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { TranslateService } from '@ngx-translate/core';
import { ERP_TRANSACTION_CONSTANTS } from 'src/app/transcations/erp-transaction-constants';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-ci-view-borrowing',
  templateUrl: './ci-view-borrowing.component.html',
  styleUrls: ['./ci-view-borrowing.component.css']
})
export class CiViewBorrowingComponent {
  ciborrowingAccountDetailsModel :CiAccountDetails = new CiAccountDetails();
  ciBorrowingAccountMappingModel:CiBorrowingAccountMapping = new CiBorrowingAccountMapping();
  ciBorrowingDocumentModel:CiBorrowingDocuments = new CiBorrowingDocuments();
  borrowingaccountmapping: any[] = [];
  borrowingdocument: any[] = [];
  statusList: any[]=[];
 
  responseModel!: Responsemodel;
  msgs: any[]=[];
  editbtn: boolean = true;
  isEdit: any;
  buttonDisabled?: any;
  orgnizationSetting: any;
  countryList: any[]=[];
  memberLandDetails: any;
  ciborrowingMappingList: any[]=[];
  borrowingAccountId:any;
  borrowingdocumentlist: any[]=[];
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private commonComponent: CommonComponent, private formBuilder: FormBuilder,
    private ciAccountDetailsService : CiAccountDetailsService, private translate: TranslateService,

    private activateRoute: ActivatedRoute, private encryptService: EncryptDecryptService,private datePipe: DatePipe,
    private router: Router, private commonFunctionsService: CommonFunctionsService,
    private fileUploadService :FileUploadService,) {

    
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
        this.ciAccountDetailsService.getPreviewDataByCiBorrowingAccountId(this.borrowingAccountId).subscribe(res => {
          this.responseModel = res;
          if(this.ciborrowingAccountDetailsModel.sanctionedDate != undefined && this.ciborrowingAccountDetailsModel.sanctionedDate != null)
            this.ciborrowingAccountDetailsModel.sanctionedDate = this.commonFunctionsService.getUTCEpoch(new Date(this.ciborrowingAccountDetailsModel.sanctionedDate));
          if (this.responseModel != null && this.responseModel != undefined) {
            this.ciborrowingAccountDetailsModel = this.responseModel.data[0];
    
            if(null != this.ciborrowingAccountDetailsModel.sanctionedDate)
           this.ciborrowingAccountDetailsModel.sanctionedDate=this.datePipe.transform(this.ciborrowingAccountDetailsModel.sanctionedDate, this.orgnizationSetting.datePipe);
    
            if(null != this.ciborrowingAccountDetailsModel.applicationDate)
              this.ciborrowingAccountDetailsModel.applicationDate=this.datePipe.transform(this.ciborrowingAccountDetailsModel.applicationDate, this.orgnizationSetting.datePipe);
    
    
            if(null != this.ciborrowingAccountDetailsModel.requestedDate)
              this.ciborrowingAccountDetailsModel.requestedDate=this.datePipe.transform(this.ciborrowingAccountDetailsModel.requestedDate, this.orgnizationSetting.datePipe);
    
    
            if(null != this.ciborrowingAccountDetailsModel.borrowingDueDate)
              this.ciborrowingAccountDetailsModel.borrowingDueDate=this.datePipe.transform(this.ciborrowingAccountDetailsModel.borrowingDueDate, this.orgnizationSetting.datePipe);

            if(this.ciborrowingAccountDetailsModel.signedCopyPath != null && this.ciborrowingAccountDetailsModel.signedCopyPath != undefined)
              this.ciborrowingAccountDetailsModel.multipartFileList = this.fileUploadService.getFile(this.ciborrowingAccountDetailsModel.signedCopyPath ,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + this.ciborrowingAccountDetailsModel.signedCopyPath);
    
            if (this.ciborrowingAccountDetailsModel.ciBorrowingAccountMappedLoansDTOList != null && this.ciborrowingAccountDetailsModel.ciBorrowingAccountMappedLoansDTOList.length > 0) {
              this.ciborrowingMappingList = this.ciborrowingAccountDetailsModel.ciBorrowingAccountMappedLoansDTOList;
            }
            if (this.ciborrowingAccountDetailsModel.ciBorrowingAccountDocumentsDTOList != null && this.ciborrowingAccountDetailsModel.ciBorrowingAccountDocumentsDTOList.length > 0) {
              this.borrowingdocumentlist = this.ciborrowingAccountDetailsModel.ciBorrowingAccountDocumentsDTOList;

              this.borrowingdocumentlist  = this.borrowingdocumentlist.filter(obj => null != obj && null !=obj.status && obj.status === applicationConstants.ACTIVE ).map((kyc:any)=>{
                kyc.multipartFileList = this.fileUploadService.getFile(kyc.documentPath ,ERP_TRANSACTION_CONSTANTS.BORROWINGS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + kyc.documentPath);
                return kyc;
              });
            }
          }
        });
      } else {
        this.isEdit = false;
      }
    })
    })
    }


 
  navigateToBack() {
    this.router.navigate([BorrowingTransactionConstant.CI_BORROWINGS]);
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.CI_BORROWING_APPLICATION }];
    setTimeout(() => {
      this.router.navigate([BorrowingTransactionConstant.CI_BORROWINGS]);
    }, 1500);
  }
  editCiBorrowingDetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([BorrowingTransactionConstant.CI_ACCOUNT_DETAILS], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 1:
        this.router.navigate([BorrowingTransactionConstant.CI_BORROWING_ACCOUNT_MAPPING], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
      case 2:
        this.router.navigate([BorrowingTransactionConstant.CI_BORROWING_DOCUMENT], { queryParams: { id: this.encryptService.encrypt(rowData.id) } });
        break;
    }
  }

 

}
