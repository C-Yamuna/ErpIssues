import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgentCommissionPolicy } from '../shared/agent-commission-policy.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { AgentCommissionPolicyService } from '../shared/agent-commission-policy.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { AGENTDETAILSCONFIGCONSTANTS } from '../../agent-details-config-constants';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';

@Component({
  selector: 'app-add-agent-commission-policy',
  templateUrl: './add-agent-commission-policy.component.html',
  styleUrls: ['./add-agent-commission-policy.component.css']
})
export class AddAgentCommissionPolicyComponent implements OnInit {
  statusList: any[] = [];
  msgs: any[] = [];
  agentCommissionPolicyform: FormGroup;
  agentCommissionPolicyModel: AgentCommissionPolicy = new AgentCommissionPolicy();
  responseModel!: Responsemodel;
  buttonDisabled: any;
  maxDate = new Date();
  minDate = new Date();
  isEdit: any;
  orgnizationSetting: any;
  agentList: any[] = [];
  taskTypeList: any[] = [];
  commissionTypeList: any[] = [];
  commissionPaymentFrequencyList: any[] = [];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private agentCommissionPolicyService: AgentCommissionPolicyService,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private encryptService: EncryptDecryptService,
    private datePipe: DatePipe,
    private commonFunctionsService: CommonFunctionsService) {
    this.agentCommissionPolicyform = this.formBuilder.group({
      'agentTypeName': new FormControl('', [Validators.required]),
      'policyCode': new FormControl('', [Validators.required]),
      'taskTypeName': new FormControl(''),
      'commissionTypeName': new FormControl(''),
      'commissionValue': new FormControl(''),
      'commissionPaymentFrequencyName': new FormControl(''),
      'effecriveStartDate': new FormControl('', [Validators.required]),
      'effectiveEndDate': new FormControl('', [Validators.required]),
      'statusName': new FormControl(''),
    })
  }

  ngOnInit() {
    this.agentList = this.commonComponent.agentType();
    this.taskTypeList = this.commonComponent.taskType();
    this.commissionTypeList = this.commonComponent.commissionType();
    this.commissionPaymentFrequencyList = this.commonComponent.commissionPaymentFrequency();
    this.statusList = this.commonComponent.status();
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.agentCommissionPolicyService.getAgentCommissionPolicyById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.agentCommissionPolicyModel = this.responseModel.data[0];

            if (this.agentCommissionPolicyModel.effecriveStartDate) {
              this.agentCommissionPolicyModel.effecriveStartDate = this.datePipe.transform(this.agentCommissionPolicyModel.effecriveStartDate, this.orgnizationSetting.datePipe);
            }
            if (this.agentCommissionPolicyModel.effectiveEndDate) {
              this.agentCommissionPolicyModel.effectiveEndDate = this.datePipe.transform(this.agentCommissionPolicyModel.effectiveEndDate, this.orgnizationSetting.datePipe);
            }
          } else {
            this.commonComponent.stopSpinner();
            this.buttonDisabled = applicationConstants.FALSE;
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
        this.agentCommissionPolicyModel.status = this.statusList[0].value;
      }
    })
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();

    if (this.agentCommissionPolicyModel.effecriveStartDate) {
      this.agentCommissionPolicyModel.effecriveStartDate = this.commonFunctionsService.getUTCEpoch(new Date(this.agentCommissionPolicyModel.effecriveStartDate));
    }

    if (this.agentCommissionPolicyModel.effectiveEndDate) {
      this.agentCommissionPolicyModel.effectiveEndDate = this.commonFunctionsService.getUTCEpoch(new Date(this.agentCommissionPolicyModel.effectiveEndDate));
    }
    if (this.isEdit) {
      this.agentCommissionPolicyService.updateAgentCommissionPolicy(this.agentCommissionPolicyModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.buttonDisabled = applicationConstants.FALSE;
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
    } else {
      this.agentCommissionPolicyService.addAgentCommissionPolicy(this.agentCommissionPolicyModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.commonComponent.stopSpinner();
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        this.buttonDisabled = applicationConstants.FALSE;
      });
    }
  }

  navigateToBack() {
    this.router.navigate([AGENTDETAILSCONFIGCONSTANTS.AGENT_COMMISSION_POLICY]);
  }

}
