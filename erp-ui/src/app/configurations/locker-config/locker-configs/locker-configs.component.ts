import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { LockerConfig } from './locker-config.model';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { LockerConfigService } from './locker-config.service';
import { LockerConfigConstants } from '../locker-config-constants';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';

@Component({
  selector: 'app-locker-configs',
  templateUrl: './locker-configs.component.html',
  styleUrls: ['./locker-configs.component.css']
})
export class LockerConfigsComponent {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[]=[];
  lockerConfigModel: LockerConfig = new LockerConfig();
  displayDialog: boolean = false;
  deleteId: any;
  orgnizationSetting: any;
  constructor(private router: Router, 
    private encryptDecryptService :EncryptDecryptService,
    private commonComponent: CommonComponent,
    private lockerConfigService:LockerConfigService,
    private datePipe: DatePipe,private commonFunctionsService: CommonFunctionsService){ }

  ngOnInit() {
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.columns = [
      { field: 'lockerTypeName', header: 'LOCKERCONFIG.LOCKER_TYPE' },
      { field: 'lockerSize', header: 'LOCKERCONFIG.LOCKER_SIZE' },
      { field: 'lockerNumber', header: 'LOCKERCONFIG.LOCKER_NO' },
      { field: 'lockerSerialNumber', header: 'LOCKERCONFIG.LOCKER_SERIAL_NO' },
      { field: 'lockerRent', header: 'LOCKERCONFIG.LOCKER_RENT' },
      { field: 'latePaymentPenaltyType', header: 'LOCKERCONFIG.LATE_PAYMENT_PENALITY_TYPE' },
      { field: 'statusName', header: 'LOCKERCONFIG.STATUS' },
    ];
    this.getAll();
  }


  getAll() {
    this.commonComponent.startSpinner();
    this.lockerConfigService.getAllLockerConfig().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data.map((item: { effectiveStartDate: string | number | Date | null; }) => {
          item.effectiveStartDate = this.datePipe.transform(item.effectiveStartDate, this.orgnizationSetting.datePipe);
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

  addData(){
    this.router.navigate([LockerConfigConstants.ADD_LOCKER_CONFIG]);
  }

  editData(rowData: any) {
    this.router.navigate([LockerConfigConstants.ADD_LOCKER_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  submit() {
    this.commonComponent.startSpinner();
    this.lockerConfigService.deleteLockerConfig(this.deleteId).subscribe(response => {
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
