import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { TermDepositProductDefinitionService } from '../../shared/term-deposit-product-definition.service';
import { Table } from 'primeng/table';
import { InterestPolicy } from './shared/interest-policy.model';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { GeneralConfig } from '../general-config/shared/general-config.model';

@Component({
  selector: 'app-interest-policy',
  templateUrl: './interest-policy.component.html',
  styleUrls: ['./interest-policy.component.css']
})
export class InterestPolicyComponent {
  @ViewChild('dt', { static: applicationConstants.FALSE }) private dt!: Table;
  date: Date | undefined;
  intrestpolicyList: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  interestPolicyForm: FormGroup;
  newRow :any =null;
  editDeleteDisable:boolean = applicationConstants.FALSE;
  addButton:boolean = applicationConstants.FALSE;
  interestPolicyModel :InterestPolicy = new InterestPolicy();
  generalConfigModel :GeneralConfig = new GeneralConfig();
  maxDate = new Date();
  orgnizationSetting:any;
  isEdit: any;
  fdCummId: any;
  msgs: any[]=[];
  responseModel!: Responsemodel;
  enableSaveAndNextButton: boolean = applicationConstants.FALSE;
  constructor(private formBuilder: FormBuilder,private commonComponent: CommonComponent,private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,private commonFunctionService: CommonFunctionsService,private encryptService: EncryptDecryptService,
    private termDepositProductDefinitionService:TermDepositProductDefinitionService
  )
  { 
    this.interestPolicyForm = this.formBuilder.group({
      'roi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'staffRoi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'seniorCitizenRoi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
      'penaltyRoi': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_NUMBERS_TWO_DECIMALS),Validators.required]),
    });
  }
  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      let encrypted = params['id'];
      if (encrypted!= undefined) {
        this.isEdit = applicationConstants.TRUE;
        this.fdCummId = Number(this.encryptService.decrypt(encrypted));
          this.getFdCumulativeinterestpolicyDetails(this.fdCummId);
      } else {
        this.isEdit = applicationConstants.FALSE;
      }
      this.updateData();
    });
  
    this.interestPolicyForm.valueChanges.subscribe((data: any) => {
      this.updateData();
      if (this.interestPolicyForm.valid) {
        this.save();
      }
    });
  }

  updateData() {
    this.interestPolicyModel.fdCummProductId = this.fdCummId
    this.termDepositProductDefinitionService.changeData({
      formValid: this.enableSaveAndNextButton ,
      data: this.interestPolicyModel,
      savedId:this.fdCummId,
      stepperIndex: 1,
      isDisable: !this.interestPolicyForm.valid ? applicationConstants.TRUE:applicationConstants.FALSE,
    });
  }
  save() {
    this.updateData();
  }
  
  addInlineRow() {
    this.addNewEntry();
    this.editDeleteDisable = applicationConstants.TRUE;
    this.addButton = applicationConstants.TRUE;
    this.dt._first = 0;
    // this.promoterDetailsForm.reset();
    this.dt.value.unshift(this.newRow);
    this.dt.initRowEdit(this.dt.value[0]);
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.updateData();
  }

  addNewEntry()
  {
    this.newRow = {roi: '', staffRoi: '', seniorCitizenRoi: '',penaltyRoi: ''}
  }
  
  onRowEditCancel() {
    this.addButton=applicationConstants.FALSE;
    this.editDeleteDisable = applicationConstants.FALSE;
    this.enableSaveAndNextButton = applicationConstants.TRUE;
    const index = this.dt.value.indexOf(this.newRow);
    if (index > -1) {
      this.dt.value.splice(index, 1);
    }
    this.addNewEntry();
    this.updateData();
  }

  editInlineRow(row:any) {
    this.addButton = applicationConstants.TRUE;
    this.editDeleteDisable = applicationConstants.TRUE; 
    this.enableSaveAndNextButton = applicationConstants.FALSE;  
    this.updateData();
  }

  getFdCumulativeinterestpolicyDetails(id: any) {
    this.isEdit = applicationConstants.TRUE;
    this.intrestpolicyList=[]
    this.termDepositProductDefinitionService.getFdCumulativeProductDefinitionOverviewDetailsById(id).subscribe(res => {
      this.responseModel = res;
      this.commonComponent.stopSpinner();
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS && this.responseModel.data[0] != null) {
        this.generalConfigModel = this.responseModel.data[0];
        if (this.generalConfigModel != null && this.generalConfigModel != undefined) {
          if(null!=this.generalConfigModel.effectiveStartDate && undefined!=this.generalConfigModel.effectiveStartDate)
            this.generalConfigModel.effectiveStartDate = this.datePipe.transform(this.generalConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);   
        if (this.generalConfigModel.intestPolicyConfigList != null && this.generalConfigModel.intestPolicyConfigList != undefined &&
            this.generalConfigModel.intestPolicyConfigList.length > 0) {
              this.enableSaveAndNextButton = applicationConstants.TRUE;
          this.intrestpolicyList = this.generalConfigModel.intestPolicyConfigList;
        }else{
          this.enableSaveAndNextButton = applicationConstants.FALSE;
        }
      }
      this.updateData();
      }else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      this.commonComponent.stopSpinner();
    });
  }

  saveInlineRow(rowData: any) {
  if(null!=this.interestPolicyModel.fdCummProductId && undefined!=this.interestPolicyModel.fdCummProductId)
    rowData.fdCummProductId = this.interestPolicyModel.fdCummProductId;
  this.addButton = applicationConstants.FALSE;
  this.editDeleteDisable = applicationConstants.FALSE;

   if(rowData.id != null)
    {
        this.termDepositProductDefinitionService.updateInterestPolicy(rowData).subscribe((response: any) => {
          this.responseModel = response;
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {


            if(null != rowData.fdCummProductId && undefined!=rowData.fdCummProductId)
             this.getFdCumulativeinterestpolicyDetails(rowData.fdCummProductId);
            this.commonComponent.stopSpinner();
            this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];  
            }, 2000);
          } else {
           this.commonComponent.stopSpinner();
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];  
            }, 2000);
           
          }
        },
          error => {
            this.commonComponent.stopSpinner();
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];  
            }, 2000);
          });
  } else {
     this.termDepositProductDefinitionService.addInterestPolicy(rowData).subscribe((response: any) => {
       this.responseModel = response;
       if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {

     
        this.intrestpolicyList.unshift(this.responseModel.data[0]);
        this.intrestpolicyList.splice(1, 1);
        if(null != rowData.fdCummProductId && undefined!=rowData.fdCummProductId)
          this.getFdCumulativeinterestpolicyDetails(rowData.fdCummProductId);
         this.commonComponent.stopSpinner();
         this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
         setTimeout(() => {
           this.msgs = [];  
         }, 2000);
        
       } else {
         this.commonComponent.stopSpinner();
         this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
         setTimeout(() => {
           this.msgs = [];  
         }, 2000);
       }
     },
       error => {
         this.commonComponent.stopSpinner();
         this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
         setTimeout(() => {
           this.msgs = [];  
         }, 2000);
       });
   }
   }
}
