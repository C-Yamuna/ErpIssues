import { Component } from '@angular/core';
import { Reasons } from './shared/reasons.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ReasonsService } from './shared/reasons.service';
import { DailyDepositConfigConstants } from '../daily-deposit-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-reasons',
  templateUrl: './reasons.component.html',
  styleUrls: ['./reasons.component.css']
})
export class ReasonsComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  reasonModel: Reasons = new Reasons();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId:any;
  constructor(private router: Router, private reasonService: ReasonsService,
    private encryptDecryptService: EncryptDecryptService,
  ) {
    this.columns = [
      { field: 'name', header: 'DAILYDEPOSITSCONFIG.NAME' },
      { field: 'description', header: 'DAILYDEPOSITSCONFIG.DESCRIPTION' },
      { field: 'statusName', header: 'DAILYDEPOSITSCONFIG.STATUS' },
    ];

  }
  ngOnInit(): void {
    this.getAll();
  }
  addReason() {
    this.router.navigate([DailyDepositConfigConstants.ADD_REASON]);
  }
  getAll() {
    this.reasonService.getAllReason().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }

  editReason(rowData: any) {
    this.router.navigate([DailyDepositConfigConstants.ADD_REASON], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  submit() {
    // this.commonComponent.startSpinner();
    this.reasonService.deleteReason(this.deleteId).subscribe(response => {
      this.responseModel = response;
      this.msgs = [];
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        // this.commonComponent.stopSpinner();
        this.displayDialog = false;
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.getAll();
        }, 2000);
      } else {
        this.displayDialog = false;
        // this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      // this.commonComponent.stopSpinner();
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
