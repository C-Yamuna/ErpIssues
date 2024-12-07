import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { InvestmentsTransactionConstant } from '../investments-transaction-constants';
import { InvestmentApplicationDetailsService } from './investments-application-details/shared/investment-application-details.service';
import { InvestmentApplicationDetails } from './investments-application-details/shared/investment-application-details.model';
import { InvestmentAccountDocuments } from './investment-account-documents/shared/investment-account-documents.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-deposit-investments',
  templateUrl: './deposit-investments.component.html',
  styleUrls: ['./deposit-investments.component.css']
})
export class DepositInvestmentsComponent {

  items: MenuItem[] = [];
  activeIndex: number = 0;
  investmentApplicationDetailsModel: InvestmentApplicationDetails = new InvestmentApplicationDetails();
  investmentAccountDocumentsModel: InvestmentAccountDocuments = new InvestmentAccountDocuments();
  savedId: any;
  buttonDisabled: boolean = false;
  isEdit: boolean = false;
  flagForLabelName: boolean = false;
  completed = 0;
  responseModel!: Responsemodel;
  msgs: any[] = [];
  pacsId=1;
  branchId=1;

  orgnizationSetting: any;
  activeItem !: MenuItem;

  constructor(private router: Router,
    private investmentApplicationDetailsService: InvestmentApplicationDetailsService,
    private commonComponent:CommonComponent,
    private datePipe: DatePipe,
    private commonFunctionService: CommonFunctionsService,
    private translate: TranslateService,
    private commonFunctionsService: CommonFunctionsService,
    private encryptDecryptService: EncryptDecryptService) {

  }

  onActiveIndexChange(event: any) {
    this.activeIndex = event.index;
    this.navigateTo(this.activeIndex, this.savedId);
  }

  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.items = [
      {
        label: 'Application Details',icon: 'fa fa-clipboard', routerLink: InvestmentsTransactionConstant.INVESTMENTS_APPLICATION_DETAILS,
        command: (event: any) => {
          this.activeIndex = 0;   
        }
      },
      {
        label: 'Investment Account Documents',icon: 'fa fa-file-text-o', routerLink: InvestmentsTransactionConstant.INVESTMENTS_ACCOUNT_DOCUMENTS,
        command: (event: any) => {
          this.activeIndex = 1;
        }
      }
    ];
    this.currentStepper();
  }

  currentStepper() {
    this.investmentApplicationDetailsService.currentStep.subscribe((data: any) => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.use(this.commonFunctionService.getStorageValue('language'));
      }
      if (data != undefined) {
        this.activeIndex = data.stepperIndex
        this.changeStepperSelector();
        this.buttonDisabled = data.isDisable
        if (data.data != null) {
          if (this.activeIndex == 0) {
            this.investmentApplicationDetailsModel = data.data;
            this.savedId =  this.investmentApplicationDetailsModel.id;
          } else if (this.activeIndex == 1) {
            this.investmentAccountDocumentsModel = data.data;
            if(undefined == this.savedId)
              this.savedId=this.investmentAccountDocumentsModel.termAccId;
          }
        }
      }
    });
  }

  changeStepperSelector() {
    this.items.map((val, index) => {
      if (this.activeIndex == index) {
        val['disabled'] = false;
      } else {
        val['disabled'] = true;
      }
      return val;
    });
  }


  saveAndUpdateInvestmentApplicationDetails(investmentApplicationDetailsModel: any, activeIndex: any) {
    // this.commonComponent.startSpinner();
    // investmentApplicationDetailsModel.status = 1;
    this.investmentApplicationDetailsModel.pacsId = this.pacsId;
    this.investmentApplicationDetailsModel.branchId = this.branchId;

    if (this.investmentApplicationDetailsModel.depositDate != null) {
      this.investmentApplicationDetailsModel.depositDate = this.commonFunctionsService.getUTCEpoch(new Date(this.investmentApplicationDetailsModel.depositDate));
    }
    if (this.investmentApplicationDetailsModel.maturityDate) {
      this.investmentApplicationDetailsModel.maturityDate = this.commonFunctionsService.getUTCEpoch(new Date(this.investmentApplicationDetailsModel.maturityDate));
    }
    if (investmentApplicationDetailsModel.id != null && investmentApplicationDetailsModel.id != undefined) {
      this.investmentApplicationDetailsModel.statusName = "CREATED";
      this.investmentApplicationDetailsService.updateInvestmentApplicationDetails(investmentApplicationDetailsModel).subscribe((response: any) => {
        this.responseModel = response;
        this.commonComponent.stopSpinner();
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if(this.responseModel.data[0].id != null && this.responseModel.data[0].id != undefined){
            this.savedId = this.responseModel.data[0].id;
            if(this.savedId != null && this.savedId != undefined)
              investmentApplicationDetailsModel.id = this.savedId;
              this.activeIndex = activeIndex + 1;
          }
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateTo(this.activeIndex, this.savedId);
          this.completed = 1;
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      },
        error => {
          // this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        });
    } else {
      this.investmentApplicationDetailsModel.statusName = "CREATED";
      this.investmentApplicationDetailsService.addInvestmentApplicationDetails(investmentApplicationDetailsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if(this.responseModel.data[0].id != null && this.responseModel.data[0].id != undefined){
            this.savedId = this.responseModel.data[0].id;
            if(this.savedId != null && this.savedId != undefined)
              investmentApplicationDetailsModel.id = this.savedId;
              this.activeIndex = activeIndex + 1;
          }
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1200);
          this.navigateTo(this.activeIndex, this.savedId);
          this.completed = 1;
        } else {
          // this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      },
        error => {
          this.commonComponent.stopSpinner();
          // this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.SERVER_DOWN_ERROR }];
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        });
    }
  }


  navigateTo(activeIndex: number, savedId: any) {
    switch (activeIndex) {
      case 0:
        this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_APPLICATION_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(savedId) } });
        break;
      case 1:
        this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_ACCOUNT_DOCUMENTS], { queryParams: { id:this.encryptDecryptService.encrypt(savedId) } });
        break;
    }
  }

  prevStep(activeIndex: number) {
    this.activeIndex = activeIndex - 1;
    this.navigateTo(this.activeIndex, this.savedId);
  }

  nextStep(activeIndex: number) {
    if (activeIndex == 0) {
      this.saveAndUpdateInvestmentApplicationDetails(this.investmentApplicationDetailsModel, activeIndex);
    } else if (activeIndex == 1) {
      this.activeIndex = activeIndex + 1;
      this.navigateTo(this.activeIndex,this.savedId);
    }
  }

  back(activeIndex: any) {
    this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_TRANSACTION]);
  }

  cancel(activeIndex: any) {
    this.router.navigate([InvestmentsTransactionConstant.INVESTMENTS_TRANSACTION]);
  }

  submit(activeIndex: any) {
    this.buttonDisabled = true;
    this.router.navigate([InvestmentsTransactionConstant.VIEW_INVESTMENTS_TRANSACTION], { queryParams: { id: this.encryptDecryptService.encrypt(this.savedId),editbutton: this.encryptDecryptService.encrypt(1),isGridPage: this.encryptDecryptService.encrypt(1) } });
  }
}
