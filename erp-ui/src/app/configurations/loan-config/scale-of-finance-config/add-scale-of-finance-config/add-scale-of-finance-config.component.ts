import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanConfigConstants } from '../../loan-config-constants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ScaleOfFinanceConfigsService } from '../shared/scale-of-finance-configs.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { ScaleOfFinanceConfig } from '../shared/scale-of-finance-config.model';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { DatePipe } from '@angular/common';
import { CropTypesService } from '../../crop-types/shared/crop-types.service';

@Component({
  selector: 'app-add-scale-of-finance-config',
  templateUrl: './add-scale-of-finance-config.component.html',
  styleUrls: ['./add-scale-of-finance-config.component.css']
})
export class AddScaleOfFinanceConfigComponent implements OnInit{
  cities: any[] | undefined;
  date: Date | undefined;
  cropList: any[] = [];
  isEdit: boolean = false;
  responseModel!: Responsemodel;
  msgs: any[]= [];
  loancroptypeform: FormGroup;
  scaleOfFinanceConfigModel : ScaleOfFinanceConfig = new ScaleOfFinanceConfig();
  orgnizationSetting: any;
  todayDate: Date = new Date();
  financialYears:  any[] = [];
  statusList: any[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder,private commonComponent : CommonComponent ,private commonFunctionsService: CommonFunctionsService,
    private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,private scaleOfFinanceConfigService : ScaleOfFinanceConfigsService,private datePipe: DatePipe,
    private cropTypesService: CropTypesService)
  { 
    this.loancroptypeform = this.formBuilder.group({
      financialYear:['', [Validators.required]],
      cropTypeName:['', [Validators.required]],
      maxAmount:new FormControl(''), 
      effectiveStartDate:['', [Validators.required]],
      statusName:['', [Validators.required]],
     // endDate:['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.statusList = this.commonComponent.status();
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.todayDate = new Date();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let id = this.encryptDecryptService.decrypt(params['id']);
        
        this.scaleOfFinanceConfigService.getScaleOfFinanceConfigsById(id).subscribe(res => {
          this.isEdit = true;
          this.responseModel = res;
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.scaleOfFinanceConfigModel = this.responseModel.data[0];
            if (this.scaleOfFinanceConfigModel.financialYear) {
              this.scaleOfFinanceConfigModel.financialYearVal = this.datePipe.transform(this.scaleOfFinanceConfigModel.financialYear, this.orgnizationSetting.datePipe);
            }
            if (this.scaleOfFinanceConfigModel.effectiveStartDate) {
              this.scaleOfFinanceConfigModel.effStartDateVal = this.datePipe.transform(this.scaleOfFinanceConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
            }
            if (this.scaleOfFinanceConfigModel.endDate) {
              this.scaleOfFinanceConfigModel.effEndDateVal = this.datePipe.transform(this.scaleOfFinanceConfigModel.endDate, this.orgnizationSetting.datePipe);
            }
          }
          else{
            this.msgs = [];
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
              this.navigateback();
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
        if (this.statusList && this.statusList.length > 0) {
          this.scaleOfFinanceConfigModel.status = this.statusList[0].value;
        }
      }
    }),
      (error: any) => {
      this.msgs = [];
      this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
    this.getAllCropTypes();
    this.generateFinancialYears();
}
generateFinancialYears() {
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 2; i <= currentYear + 2; i++) {
    this.financialYears.push({
      label: `${i}-${i + 1}`,
      value: `${i}-${i + 1}`
    });
  }

}

navigateback(){
  this.router.navigate([LoanConfigConstants.SCALE_OF_FINANCE_CONFIG]);
  }
  submit(){
    if(this.scaleOfFinanceConfigModel.effStartDateVal != undefined && this.scaleOfFinanceConfigModel.effStartDateVal != null)
      this.scaleOfFinanceConfigModel.effectiveStartDate = this.commonFunctionsService.getUTCEpoch(new Date(this.scaleOfFinanceConfigModel.effStartDateVal));
      if(this.scaleOfFinanceConfigModel.effEndDateVal != undefined && this.scaleOfFinanceConfigModel.effEndDateVal != null)
      this.scaleOfFinanceConfigModel.endDate = this.commonFunctionsService.getUTCEpoch(new Date(this.scaleOfFinanceConfigModel.effEndDateVal));
      // if(this.scaleOfFinanceConfigModel.financialYearVal != undefined && this.scaleOfFinanceConfigModel.financialYearVal != null)
      //   this.scaleOfFinanceConfigModel.financialYear = this.commonFunctionsService.getUTCEpoch(new Date(this.scaleOfFinanceConfigModel.financialYearVal));
      this.scaleOfFinanceConfigService.addScaleOfFinanceConfigs(this.scaleOfFinanceConfigModel).subscribe((response: any) => {
      this.responseModel = response;
      
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if(null != this.scaleOfFinanceConfigModel.effectiveStartDate)
          this.scaleOfFinanceConfigModel.effStartDateVal=this.datePipe.transform(this.scaleOfFinanceConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
          if(null != this.scaleOfFinanceConfigModel.endDate)
          this.scaleOfFinanceConfigModel.effEndDateVal=this.datePipe.transform(this.scaleOfFinanceConfigModel.endDate, this.orgnizationSetting.datePipe);
          // if(null != this.scaleOfFinanceConfigModel.financialYear)
          //   this.scaleOfFinanceConfigModel.financialYearVal=this.datePipe.transform(this.scaleOfFinanceConfigModel.financialYear, this.orgnizationSetting.datePipe);
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.navigateback();
        }, 2000);
      } else {
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }
  update(){
   
    this.scaleOfFinanceConfigService.updateScaleOfFinanceConfigs(this.scaleOfFinanceConfigModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.navigateback();
        }, 2000);
      } else {
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }
  getAllCropTypes(){
    this.cropTypesService.getAllCropTypes().subscribe((response : any )=>{
      this.responseModel  = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.cropList = this.responseModel.data;
        this.cropList = this.cropList.filter((obj: any) => obj != null).map((relationType: { name: any; id: any; }) => {
          return { label: relationType.name, value: relationType.id };
        });
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
}
