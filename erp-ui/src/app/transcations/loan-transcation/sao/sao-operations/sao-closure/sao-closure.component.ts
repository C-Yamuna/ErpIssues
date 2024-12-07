import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Loantransactionconstant } from '../../../loan-transaction-constant';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { SaoLoanApplicationService } from '../../../shared/sao-loans/sao-loan-application.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SaoLoanApplication } from '../../shared/sao-loan-application.model';
import { IndividualMemberDetailsModel, MemInstitutionModel, MemberShipGroupDetailsModel } from '../../sao-stepper/membership-basic-details/shared/membership-basic-details.model';

@Component({
  selector: 'app-sao-closure',
  templateUrl: './sao-closure.component.html',
  styleUrls: ['./sao-closure.component.css']
})
export class SaoClosureComponent {
  orgnizationSetting: any;
  isEdit: any;
  loanId: any;
  options: any;
  data: any;
  msgs: any[] = [];
  responseModel!: Responsemodel;
  memberTypeName: any;
  showForm: boolean = false;
  saoLoanApplicationModel: SaoLoanApplication = new SaoLoanApplication();
  individualMemberDetailsModel: IndividualMemberDetailsModel = new IndividualMemberDetailsModel();
  memberShipGroupDetailsModel : MemberShipGroupDetailsModel = new MemberShipGroupDetailsModel();
  memInstitutionModel : MemInstitutionModel = new MemInstitutionModel();
  constructor(private router: Router, private formBuilder: FormBuilder, 
    private encryptService: EncryptDecryptService, private commonComponent: CommonComponent, private commonFunctionsService: CommonFunctionsService, private translate: TranslateService,
     private activateRoute: ActivatedRoute, private datePipe: DatePipe,private saoLoanApplicationService: SaoLoanApplicationService)
  {}
  isBasicDetails: boolean = false;
  isHistory: boolean = false;
  position: string = 'center';
  ngOnInit() {
    this.translate.use(this.commonFunctionsService.getStorageValue('language'));
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        // this.commonComponent.startSpinner();
        this.loanId = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        if (this.loanId != null && this.loanId != undefined) {
         // this.getSaoDisbursmentDetailsByLoanApplicationId(this.loanId);
        }
      } else {
        this.isEdit = false;
        //this.disbursementModel.statusName = this.statusList[0].value;
      }
    })

    this.getApplicationDetailsById(this.loanId);
    
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              tension: 0.4
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              tension: 0.4
          }
      ]
  };

  this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };
  }
  getApplicationDetailsById(id: any) {
    this.saoLoanApplicationService.getSaoLoanApplicationDetailsById(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.saoLoanApplicationModel = this.responseModel.data[0];
        this.memberTypeName = this.responseModel.data[0].memberTypeName;
        if (null != this.saoLoanApplicationModel.applicationDate)
          this.saoLoanApplicationModel.applicationDateVal = this.datePipe.transform(this.saoLoanApplicationModel.applicationDate, this.orgnizationSetting.datePipe);

        if (null != this.saoLoanApplicationModel.loanDueDate)
          this.saoLoanApplicationModel.loanDueDateVal = this.datePipe.transform(this.saoLoanApplicationModel.loanDueDate, this.orgnizationSetting.datePipe);

        if (this.saoLoanApplicationModel.individualMemberDetailsDTO != null && this.saoLoanApplicationModel.individualMemberDetailsDTO != undefined) {
          this.individualMemberDetailsModel = this.saoLoanApplicationModel.individualMemberDetailsDTO;
          if (this.individualMemberDetailsModel.admissionDate != null && this.individualMemberDetailsModel.admissionDate != undefined) {
            this.individualMemberDetailsModel.admissionDateVal = this.datePipe.transform(this.individualMemberDetailsModel.admissionDate, this.orgnizationSetting.datePipe);
          }
          if (this.individualMemberDetailsModel.dob != null && this.individualMemberDetailsModel.dob != undefined) {
            this.individualMemberDetailsModel.dobVal = this.datePipe.transform(this.individualMemberDetailsModel.dob, this.orgnizationSetting.datePipe);
          }
        }

        if (this.saoLoanApplicationModel.memberGroupDetailsDTO != null && this.saoLoanApplicationModel.memberGroupDetailsDTO != undefined) {
          this.memberShipGroupDetailsModel = this.saoLoanApplicationModel.memberGroupDetailsDTO;
        }

        if (this.saoLoanApplicationModel.memberInstitutionDTO != null && this.saoLoanApplicationModel.memberInstitutionDTO != undefined) {
          this.memInstitutionModel = this.saoLoanApplicationModel.memberInstitutionDTO;
        }

      }
      else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }
  back(){
    this.router.navigate([Loantransactionconstant.SAO_LOAN]);
  }
  onClick(){
    // this.institutionPromoterFlag = false;
    //   this.groupPromotersPopUpFlag = false;
  }
  showBasicDetailsDialog(position: string) {
    this.position = position;
    this.isBasicDetails = true;
    if(this.isHistory)
        this.isHistory = false
}
showHistoryDialog(position: string) {
    this.position = position;
    this.isHistory = true;
    if(this.isBasicDetails)
        this.isBasicDetails = false;
}
onClickMemberIndividualMoreDetails(){
  this.showForm = true
}
}
