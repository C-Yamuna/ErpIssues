import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonConfigConstants } from '../common-config-constants';
import { DenominationTypes } from './shared/denomination-types.model';
import { DenominationTypesService } from './shared/denomination-types.service';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-denomination-types',
  templateUrl: './denomination-types.component.html',
  styleUrls: ['./denomination-types.component.css']
})
export class DenominationTypesComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  denominationModel: DenominationTypes = new DenominationTypes();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId:any;
  constructor(private router: Router, private denominationTypesService: DenominationTypesService,
    private encryptDecryptService: EncryptDecryptService,private commonComponent: CommonComponent,
  ) {
    this.columns = [
      { field: 'name', header: 'ERP.NAME' },
      { field: 'value', header: 'ERP.VALUE' },
      { field: 'isCoin', header: 'ERP.IS_COIN' },
      { field: 'description', header: 'ERP.DESCRIPTION' },
      { field: 'statusName', header: 'ERP.STATUS' },
    ];
  }
    ngOnInit(): void {
      this.getAll();
    }
    adddenomonation() {
      this.router.navigate([CommonConfigConstants.ADD_DENOMINATION_TYPE]);
    }
    getAll() {
      this.denominationTypesService.getAllDenomination().subscribe((data: any) => {
        this.responseModel = data;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.gridListData = this.responseModel.data;
        } else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        }
      });
    }
  
    editdenomination(rowData: any) {
      this.router.navigate([CommonConfigConstants.ADD_DENOMINATION_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
  
    deleteData(rowData: any) {
      this.displayDialog = true;
      this.deleteId = rowData.id;
    }
    
    submit() {
      this.commonComponent.startSpinner();
      this.denominationTypesService.deleteDenomination(this.deleteId).subscribe(response => {
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
