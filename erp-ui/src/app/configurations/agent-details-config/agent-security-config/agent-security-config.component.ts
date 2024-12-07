import { Component, OnInit } from '@angular/core';
import { AgentSecurityConfig } from './shared/agent-security-config.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { AgentSecurityConfigService } from './shared/agent-security-config.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { AGENTDETAILSCONFIGCONSTANTS } from '../agent-details-config-constants';

@Component({
  selector: 'app-agent-security-config',
  templateUrl: './agent-security-config.component.html',
  styleUrls: ['./agent-security-config.component.css']
})
export class AgentSecurityConfigComponent implements OnInit {

  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  AgentSecurityConfigModel: AgentSecurityConfig = new AgentSecurityConfig();
  responseModel!: Responsemodel;
  statusList: any[] = [];
  displayDialog: boolean = false;
  deleteId: any;

  constructor(private router: Router,
    private agentSecurityConfigService: AgentSecurityConfigService,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent) { }

  ngOnInit() {
    this.columns = [
      { field: 'agentTypeName', header: 'AGENTDETAILSCONFIG.AGENT_TYPE' },
      { field: 'isSecurityDepositRequire', header: 'AGENTDETAILSCONFIG.IS_SECURITY_DEPOSIT_REQUIRED' },
      { field: 'securityType', header: 'AGENTDETAILSCONFIG.SECURITY_TYPE' },
      { field: 'securityValueRequire', header: 'AGENTDETAILSCONFIG.SECURITY_VALUE_REQUIRED' },
      { field: 'noOfSuritiesRequire', header: 'AGENTDETAILSCONFIG.NO_OF_SURETIES_REQUIRED' },
      { field: 'statusName', header: 'AGENTDETAILSCONFIG.STATUS' },
    ];
    this.getAll();
  }

  getAll() {
    this.commonComponent.startSpinner();
    this.agentSecurityConfigService.getAllAgentSecurityConfigDetails().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }

  addData() {
    this.router.navigate([AGENTDETAILSCONFIGCONSTANTS.ADD_AGENT_SECURITY_CONFIG]);
  }

  editData(rowData: any) {
    this.router.navigate([AGENTDETAILSCONFIGCONSTANTS.ADD_AGENT_SECURITY_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  delete() {
    this.commonComponent.startSpinner();
    this.agentSecurityConfigService.deleteAgentSecurityConfigDetails(this.deleteId).subscribe(response => {
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
