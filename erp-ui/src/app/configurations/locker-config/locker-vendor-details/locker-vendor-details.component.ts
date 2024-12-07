import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { LockerVendorDetails } from './shared/locker-vendor-details.model';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { LockerVendorDetailsService } from './shared/locker-vendor-details.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { LockerConfigConstants } from '../locker-config-constants';

@Component({
  selector: 'app-locker-vendor-details',
  templateUrl: './locker-vendor-details.component.html',
  styleUrls: ['./locker-vendor-details.component.css']
})
export class LockerVendorDetailsComponent {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[]=[];
  lockerVendorDetailsModel: LockerVendorDetails = new LockerVendorDetails();
  displayDialog: boolean = false;
  deleteId: any;

  constructor(private router: Router, 
    private encryptDecryptService :EncryptDecryptService,
    private commonComponent: CommonComponent,
    private lockerVendorDetailsService:LockerVendorDetailsService){ }

  ngOnInit() {
    this.columns = [
      { field: 'vendorName', header: 'LOCKERCONFIG.NAME' },
      { field: 'vendorPOCName', header: 'LOCKERCONFIG.POC_NAME' },
      { field: 'vendorPOCNumber', header: 'LOCKERCONFIG.POC_NUMBER' },
      { field: 'vendorPOCEmail', header: 'LOCKERCONFIG.POC_EMAIL' },
      { field: 'vendorAddress', header: 'LOCKERCONFIG.ADDRESS' },
      { field: 'description', header: 'LOCKERCONFIG.DESCRIPTION' },
      { field: 'statusName', header: 'LOCKERCONFIG.STATUS' },
    ];
    this.getAll();
  }


  getAll(){
    this.commonComponent.startSpinner();
    this.lockerVendorDetailsService.getAllLockerVendorDetails().subscribe((data: any) => {
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

  addData(){
    this.router.navigate([LockerConfigConstants.ADD_LOCKER_VENDOR_DETAILS]);
  }

  editData(rowData: any) {
    this.router.navigate([LockerConfigConstants.ADD_LOCKER_VENDOR_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  submit() {
    this.commonComponent.startSpinner();
    this.lockerVendorDetailsService.deleteLockerVendorDetails(this.deleteId).subscribe(response => {
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
