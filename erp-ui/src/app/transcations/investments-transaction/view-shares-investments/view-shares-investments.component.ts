import { Component, OnInit } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SharesInvestments } from '../shares-investments/shared/shares-investments.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { FormBuilder } from '@angular/forms';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { SharesInvestmentsService } from '../shares-investments/shared/shares-investments.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { InvestmentsTransactionConstant } from '../investments-transaction-constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-shares-investments',
  templateUrl: './view-shares-investments.component.html',
  styleUrls: ['./view-shares-investments.component.css']
})
export class ViewSharesInvestmentsComponent implements OnInit{

  orgnizationSetting:any;
  isEdit:boolean = false;
  responseModel!: Responsemodel;
  sharesInvestmentsModel:SharesInvestments =  new SharesInvestments();
  msgs: any[] = [];
  buttonDisabled: boolean = false;
  editbutton: boolean = true;
  isShowSubmit: boolean =applicationConstants.FALSE;
  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private encryptDecryptService :EncryptDecryptService,
    private commonComponent: CommonComponent,
    private commonFunctionsService: CommonFunctionsService,
    private datePipe: DatePipe,
    private sharesInvestmentsService:SharesInvestmentsService,
    private translate: TranslateService,
    private activateRoute:ActivatedRoute){
  
  }
  //view shares investments details based on id
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.commonFunctionsService.data.subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
      } else {
        this.translate.use(this.commonFunctionsService.getStorageValue('language'));
      }
    })
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptDecryptService.decrypt(params['id']);
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
        this.isEdit = true;
        this.sharesInvestmentsService.getSharesInvestmentsById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.sharesInvestmentsModel = this.responseModel.data[0];
            if (this.sharesInvestmentsModel.sharesPurchasedDate != null) {
              this.sharesInvestmentsModel.sharesPurchasedDate = this.datePipe.transform(this.sharesInvestmentsModel.sharesPurchasedDate, this.orgnizationSetting.datePipe);
            }
            this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = []; 
            }, 2000);
          } else {
            this.commonComponent.stopSpinner();
            this.buttonDisabled = applicationConstants.FALSE;
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
      }
    }) 
  }

  navigateToBack(){
    this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_TRANSACTION]);
  }
  submit() {
    this.msgs = [];  
    this.msgs = [{ severity: "success", detail:  applicationConstants.SHARE_INVESTMENTS }];
    setTimeout(() => {
      this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_TRANSACTION]);
    }, 1500);
  }
  
  editSharesDetails(rowData: any) {
    this.router.navigate([InvestmentsTransactionConstant.SHARES_INVESTMENTS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }
}
