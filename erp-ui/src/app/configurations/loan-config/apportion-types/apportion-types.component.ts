import { Component } from '@angular/core';
import { ApportionTypes } from './shared/apportion-types.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { ApportionTypesService } from './shared/apportion-types.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { LoanConfigConstants } from '../loan-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-apportion-types',
  templateUrl: './apportion-types.component.html',
  styleUrls: ['./apportion-types.component.css']
})
export class ApportionTypesComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  apportionTypesModel: ApportionTypes = new ApportionTypes();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId: any;
  constructor(private router: Router, private apportionTypesService: ApportionTypesService,
    private encryptDecryptService: EncryptDecryptService, private commonComponent: CommonComponent,
  ) {
    this.columns = [
      { field: 'name', header: 'LOANS.NAME' },
      { field: 'apportionOrder', header: 'LOANS.ORDER' },
      { field: 'description', header: 'LOANS.DESCRIPTION' },
      { field: 'statusName', header: 'LOANS.STATUS' },
    ];
  }
    ngOnInit(): void {
      this.getAll();
    }
    addapportiontype() {
      this.router.navigate([LoanConfigConstants.ADD_APPORTION_TYPE]);
    }
    getAll() {
      this.apportionTypesService.getAllApportionTypes().subscribe((data: any) => {
        this.responseModel = data;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.gridListData = this.responseModel.data;
        } else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        }
      });
    }
  
    editapportiontype(rowData: any) {
      this.router.navigate([LoanConfigConstants.ADD_APPORTION_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
  
    deleteData(rowData: any) {
      this.displayDialog = true;
      this.deleteId = rowData.id;
    }
    submit() {
      this.commonComponent.startSpinner();
      this.apportionTypesService.deleteApportionTypes(this.deleteId).subscribe(response => {
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
