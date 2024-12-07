import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { VoterConfig } from './shared/voter-config.model';
import { Router } from '@angular/router';
import { VoterConfigService } from './shared/voter-config.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { MembershipConfigConstants } from '../membership-config-constants';

@Component({
  selector: 'app-voter-config',
  templateUrl: './voter-config.component.html',
  styleUrls: ['./voter-config.component.css']
})
export class VoterConfigComponent {

  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[] = [];
  voterConfigModel: VoterConfig = new VoterConfig();
  displayDialog: boolean = false;
  deleteId: any;

  constructor(private router: Router,
    private voterConfigService: VoterConfigService,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent) {

  }
  ngOnInit() {
    this.columns = [
      { field: 'memberTypeName', header: 'MEMBERSHIPCONFIG.MEMBER_TYPE' },
      { field: 'amount', header: 'MEMBERSHIPCONFIG.AMOUNT' },
      { field: 'minPeriodInMonths', header: 'MEMBERSHIPCONFIG.MINIMUM_PERIOD' },
      { field: 'maxPeriodInMonths', header: 'MEMBERSHIPCONFIG.MAXIMUM_PERIOD' },
      // { field: 'remarks', header: 'MEMBERSHIPCONFIG.REMARKS' },
      { field: 'statusName', header: 'MEMBERSHIPCONFIG.STATUS' },
    ];
    this.getAll();
  }

  getAll() {
    this.commonComponent.startSpinner();
    this.voterConfigService.getAllVoterConfig().subscribe((data: any) => {
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
    this.router.navigate([MembershipConfigConstants.ADD_VOTER_CONFIG]);
  }

  editData(rowData: any) {
    this.router.navigate([MembershipConfigConstants.ADD_VOTER_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteGroupType(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  delete() {
    this.commonComponent.startSpinner();
    this.voterConfigService.deleteVoterConfig(this.deleteId).subscribe(response => {
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
