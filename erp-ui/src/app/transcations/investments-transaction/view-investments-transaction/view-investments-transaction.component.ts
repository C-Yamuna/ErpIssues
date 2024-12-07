import { Component, OnInit } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { InvestmentApplicationDetails } from '../deposit-investments/investments-application-details/shared/investment-application-details.model';
import { InvestmentAccountDocuments } from '../deposit-investments/investment-account-documents/shared/investment-account-documents.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { InvestmentApplicationDetailsService } from '../deposit-investments/investments-application-details/shared/investment-application-details.service';
import { InvestmentsTransactionConstant } from '../investments-transaction-constants';
import { DatePipe } from '@angular/common';
import { ERP_TRANSACTION_CONSTANTS } from '../../erp-transaction-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';

@Component({
  selector: 'app-view-investments-transaction',
  templateUrl: './view-investments-transaction.component.html',
  styleUrls: ['./view-investments-transaction.component.css']
})
export class ViewInvestmentsTransactionComponent implements OnInit {
  orgnizationSetting:any;
  isEdit: boolean = false;
  msgs: any[] = [];
  buttonDisabled: boolean = false;
  responseModel !: Responsemodel;
  investmentAccountDocumentsList: any[] = [];
  investmentApplicationDetailsModel: InvestmentApplicationDetails = new InvestmentApplicationDetails();
  investmentAccountDocumentsModel: InvestmentAccountDocuments = new InvestmentAccountDocuments();
  termAccId: any;
  editbutton: boolean = true;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private encryptDecryptService: EncryptDecryptService,
    private fileUploadService: FileUploadService,
    private translate: TranslateService,
    private commonFunctionsService: CommonFunctionsService,
    private investmentApplicationDetailsService: InvestmentApplicationDetailsService) {
  }
  ngOnInit(): void {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use(this.commonFunctionsService.getStorageValue('language'));
      }
    })
    this.activateRoute.queryParams.subscribe(params => {
      this.commonComponent.startSpinner();
      if (params['id'] != undefined && params['id'] != null) {
          this.termAccId = this.encryptDecryptService.decrypt(params['id']);
        if (params['editbutton'] != undefined && params['editbutton'] != null) {
          let isEditParam = this.encryptDecryptService.decrypt(params['editbutton']);
          if (isEditParam == "1") {
            this.editbutton = true;
          } else {
            this.editbutton = false;
          }
          if (params['isGridPage'] != undefined && params['isGridPage'] != null) {
            let isGrid = this.encryptDecryptService.decrypt(params['isGridPage']);
            if (isGrid === "0") {
              this.isShowSubmit = applicationConstants.FALSE;
            } else {
              this.isShowSubmit = applicationConstants.TRUE;
            }
          }
        }
        this.isEdit = true;
        this.investmentApplicationDetailsService.getPreviewByTermAccountId(this.termAccId).subscribe(res => {
          this.responseModel = res;
          if (this.responseModel != null && this.responseModel != undefined) {
            this.investmentApplicationDetailsModel = this.responseModel.data[0];
            if (this.investmentApplicationDetailsModel.depositDate != null) {
              this.investmentApplicationDetailsModel.depositDate = this.datePipe.transform(this.investmentApplicationDetailsModel.depositDate, this.orgnizationSetting.datePipe);
            }
            if (this.investmentApplicationDetailsModel.maturityDate != null) {
              this.investmentApplicationDetailsModel.maturityDate = this.datePipe.transform(this.investmentApplicationDetailsModel.maturityDate, this.orgnizationSetting.datePipe);
            }
            if(this.investmentApplicationDetailsModel.investmentAccountDocumentsDTO != null &&  this.investmentApplicationDetailsModel.investmentAccountDocumentsDTO != undefined && 
              this.investmentApplicationDetailsModel.investmentAccountDocumentsDTO.length > 0){
              this.investmentAccountDocumentsList = this.investmentApplicationDetailsModel.investmentAccountDocumentsDTO;
              this.investmentAccountDocumentsList  = this.investmentAccountDocumentsList.filter(obj => null != obj && null !=obj.status && obj.status === applicationConstants.ACTIVE ).map((document:any)=>{
                document.multipartFileList = this.fileUploadService.getFile(document.requiredDocPath ,ERP_TRANSACTION_CONSTANTS.INVESTMENTS + ERP_TRANSACTION_CONSTANTS.FILES + "/" + document.requiredDocPath);
                return document;
              });
            }
          }
        });
      } else {
        this.isEdit = false;
      }
    })
  }

  navigateToBack() {
    this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_TRANSACTION]);
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.DEPOSIT_INVESTMENTS }];
    setTimeout(() => {
      this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_TRANSACTION]);
    }, 1500);
  }
  editDepositDetails(rowData: any, activeIndex: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_APPLICATION_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(this.termAccId) } });
        break;
      case 1:
        this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_ACCOUNT_DOCUMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(this.termAccId) } });
        break;
    }
  }

}
