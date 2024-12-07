import { Component, OnInit } from '@angular/core';
import { AgentCommissionPolicy } from './shared/agent-commission-policy.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { AgentCommissionPolicyService } from './shared/agent-commission-policy.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { AGENTDETAILSCONFIGCONSTANTS } from '../agent-details-config-constants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agent-commission-policy',
  templateUrl: './agent-commission-policy.component.html',
  styleUrls: ['./agent-commission-policy.component.css']
})
export class AgentCommissionPolicyComponent implements OnInit {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  agentCommissionPolicyModel: AgentCommissionPolicy = new AgentCommissionPolicy();
  responseModel!: Responsemodel;
  statusList: any[] = [];
  displayDialog: boolean = false;
  orgnizationSetting: any;
  deleteId: any;


  constructor(private router: Router,
    private agentCommissionPolicyService: AgentCommissionPolicyService,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent, private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.columns = [
      { field: 'agentTypeName', header: 'AGENTDETAILSCONFIG.AGENT_TYPE' },
      { field: 'policyCode', header: 'AGENTDETAILSCONFIG.POLICY_CODE' },
      { field: 'taskTypeName', header: 'AGENTDETAILSCONFIG.TASK_TYPE' },
      { field: 'commissionTypeName', header: 'AGENTDETAILSCONFIG.COMMISSION_TYPE' },
      { field: 'commissionValue', header: 'AGENTDETAILSCONFIG.COMMISSION_VALUE' },
      { field: 'commissionPaymentFrequencyName', header: 'AGENTDETAILSCONFIG.COMMISSION_PAYMENT_FREQUENCY' },
      { field: 'effecriveStartDate', header: 'AGENTDETAILSCONFIG.EFFECTIVE_START_DATE' },
      { field: 'effectiveEndDate', header: 'AGENTDETAILSCONFIG.EFFECTIVE_END_DATE' },
      { field: 'statusName', header: 'AGENTDETAILSCONFIG.STATUS' },
    ];
    this.getAll();
  }

  // getAll() {
  //   this.commonComponent.startSpinner();
  //   this.agentCommissionPolicyService.getAllAgentCommissionPolicy().subscribe((data: any) => {
  //     this.responseModel = data;
  //     if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
  //       // this.gridListData = this.responseModel.data;
  //       this.gridListData = this.responseModel.data.map((item: { effecriveStartDate: string | number | Date | null; effectiveEndDate: string | number | Date | null }) => {
  //         item.effecriveStartDate = this.datePipe.transform(item.effecriveStartDate, this.orgnizationSetting.datePipe);
  //         item.effectiveEndDate = this.datePipe.transform(item.effectiveEndDate, this.orgnizationSetting.datePipe);
  //         return item;
  //       });
  //       this.commonComponent.stopSpinner();
  //     } else {
  //       this.commonComponent.stopSpinner();
  //       this.msgs = [];
  //       this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
  //     }
  //   }, error => {
  //     this.commonComponent.stopSpinner();
  //     this.msgs = [];
  //     this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
  //   });
  // }
  getAll() {
    this.commonComponent.startSpinner();
    this.agentCommissionPolicyService.getAllAgentCommissionPolicy().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data.map((item: { effecriveStartDate: string | number | Date | null; effectiveEndDate: string | number | Date | null }) => {
          item.effecriveStartDate = this.datePipe.transform(item.effecriveStartDate, this.orgnizationSetting.datePipe);
          item.effectiveEndDate = this.datePipe.transform(item.effectiveEndDate, this.orgnizationSetting.datePipe);
          return item;
        });
        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }
  addData() {
    this.router.navigate([AGENTDETAILSCONFIGCONSTANTS.ADD_AGENT_COMMISSION_POLICY]);
  }

  editData(rowData: any) {
    this.router.navigate([AGENTDETAILSCONFIGCONSTANTS.ADD_AGENT_COMMISSION_POLICY], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  delete() {
    this.commonComponent.startSpinner();
    this.agentCommissionPolicyService.deleteAgentCommissionPolicy(this.deleteId).subscribe(response => {
      this.responseModel = response;
      this.msgs = [];
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.displayDialog = false;
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.getAll();
        }, 2000);
      } else {
        this.displayDialog = false;
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
  cancel() {
    this.displayDialog = false;
  }

}
