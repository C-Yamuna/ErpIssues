import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipConfigConstants } from '../membership-config-constants';
import { McrDetails } from './shared/mcr-details.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { McrDetailsService } from './shared/mcr-details.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-membership-mcr-details',
  templateUrl: './membership-mcr-details.component.html',
  styleUrls: ['./membership-mcr-details.component.css']
})
export class MembershipMcrDetailsComponent implements OnInit {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  mcrDetailsModel: McrDetails = new McrDetails();
  responseModel!: Responsemodel;
  statusList: any[] = [];
  displayDialog: boolean = false;
  orgnizationSetting: any;
  deleteId: any;

  constructor(private router: Router,
    private mcrDetailsService: McrDetailsService,
    private datePipe: DatePipe,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent) { }

  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.columns = [
      { field: 'name', header: 'MEMBERSHIPCONFIG.NAME' },
      { field: 'mcrNumber', header: 'MEMBERSHIPCONFIG.MCR_NUMBER' },
      { field: 'mcrFilePath', header: 'MEMBERSHIPCONFIG.MCR_FILE_PATH' },
      { field: 'date', header: 'MEMBERSHIPCONFIG.DATE' },
      { field: 'statusName', header: 'MEMBERSHIPCONFIG.STATUS' },
    ];
    this.getAll();
  }

  getAll() {
    this.commonComponent.startSpinner();
    this.mcrDetailsService.getAllMcrDetails().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data.map((item: { date: string | number | Date | null; }) => {
          item.date = this.datePipe.transform(item.date, this.orgnizationSetting.datePipe);
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
    this.router.navigate([MembershipConfigConstants.ADD_MCR_DETAILS]);
  }

  editData(rowData: any) {
    this.router.navigate([MembershipConfigConstants.ADD_MCR_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteMcrDetail(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  delete() {
    this.commonComponent.startSpinner();
    this.mcrDetailsService.deleteMcrDetails(this.deleteId).subscribe(response => {
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
