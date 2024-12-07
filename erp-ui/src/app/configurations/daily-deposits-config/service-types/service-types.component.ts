import { Component } from '@angular/core';
import { ServiceTypes } from './shared/service-types.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ServiceTypesService } from './shared/service-types.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Router } from '@angular/router';
import { DailyDepositConfigConstants } from '../daily-deposit-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-service-types',
  templateUrl: './service-types.component.html',
  styleUrls: ['./service-types.component.css']
})
export class ServiceTypesComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  serviceTypesModel: ServiceTypes = new ServiceTypes();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId:any;
  constructor(private router: Router, private serviceTypesService: ServiceTypesService,
    private encryptDecryptService: EncryptDecryptService,
  ) {
    this.columns = [
      { field: 'name', header: 'DAILYDEPOSITSCONFIG.NAME' },
      { field: 'cgstPercentage', header: 'DAILYDEPOSITSCONFIG.CGST' },
      { field: 'sgstPercentage', header: 'DAILYDEPOSITSCONFIG.SGST' },
      { field: 'description', header: 'DAILYDEPOSITSCONFIG.DESCRIPTION' },
      { field: 'statusName', header: 'DAILYDEPOSITSCONFIG.STATUS' },
    ];

  }
  ngOnInit(): void {
    this.getAll();
  }
  addservicetype() {
    this.router.navigate([DailyDepositConfigConstants.ADD_SERVICE_TYPE]);
  }
  getAll() {
    this.serviceTypesService.getAllServiceTypes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }

  editservicetypes(rowData: any) {
    this.router.navigate([DailyDepositConfigConstants.ADD_SERVICE_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  submit() {
    // this.commonComponent.startSpinner();
    this.serviceTypesService.deleteServiceTypes(this.deleteId).subscribe(response => {
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
