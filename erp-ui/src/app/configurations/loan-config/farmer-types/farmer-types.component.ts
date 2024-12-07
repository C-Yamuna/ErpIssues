import { Component } from '@angular/core';
import { FarmerTypes } from './shared/farmer-types.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { FarmerTypesService } from './shared/farmer-types.service';
import { LoanConfigConstants } from '../loan-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-farmer-types',
  templateUrl: './farmer-types.component.html',
  styleUrls: ['./farmer-types.component.css']
})
export class FarmerTypesComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  farmerTypesModel: FarmerTypes = new FarmerTypes();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId: any;
  constructor(private router: Router, private farmerTypesService: FarmerTypesService, private commonComponent: CommonComponent,
    private encryptDecryptService: EncryptDecryptService,
  ) {
    this.columns = [
      { field: 'name', header: 'LOANS.NAME' },
      { field: 'description', header: 'LOANS.DESCRIPTION' },
      { field: 'statusName', header: 'LOANS.STATUS' },
    ];
  }
    ngOnInit(): void {
      this.getAll();
    }
    addfarmertype() {
      this.router.navigate([LoanConfigConstants.ADD_FARMER_TYPE]);
    }
    getAll() {
      this.farmerTypesService.getAllFarmerTypes().subscribe((data: any) => {
        this.responseModel = data;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.gridListData = this.responseModel.data;
        } else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        }
      });
    }
  
    editfarmertype(rowData: any) {
      this.router.navigate([LoanConfigConstants.ADD_FARMER_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
  
    delete(rowData:any){
      this.displayDialog = true;
      this.deleteId = rowData.id;
    }
    submit() {
      this.commonComponent.startSpinner();
      this.farmerTypesService.deleteFarmerTypes(this.deleteId).subscribe(response => {
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
