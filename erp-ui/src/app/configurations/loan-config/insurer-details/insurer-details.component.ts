import { Component } from '@angular/core';
import { InsurerDetails } from './shared/insurer-details.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { InsurerDetailsService } from './shared/insurer-details.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { LoanConfigConstants } from '../loan-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-insurer-details',
  templateUrl: './insurer-details.component.html',
  styleUrls: ['./insurer-details.component.css']
})
export class InsurerDetailsComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  insurerDetailsModel: InsurerDetails = new InsurerDetails();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId: any;
  constructor(private router: Router, private insurerDetailsService: InsurerDetailsService,
    private encryptDecryptService: EncryptDecryptService, private commonComponent: CommonComponent,
  ) {
    this.columns = [
      { field: 'name', header: 'LOANS.NAME' },
      { field: 'mobileNo', header: 'LOANS.MOBILE_NUMBER' },
      { field: 'email', header: 'LOANS.EMAIL' },
      { field: 'address', header: 'LOANS.ADDRESS' },
      { field: 'statusName', header: 'LOANS.STATUS' },
    ];
  }
    ngOnInit(): void {
      this.getAll();
    }
    addinsurerdetails() {
      this.router.navigate([LoanConfigConstants.ADD_INSURER_DETAILS]);
    }
    getAll() {
      this.insurerDetailsService.getAllInsurerDetails().subscribe((data: any) => {
        this.responseModel = data;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.gridListData = this.responseModel.data;
        } else {
          this.msgs = [];
          this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
        }
      });
    }
  
    editinsurerdetails(rowData: any) {
      this.router.navigate([LoanConfigConstants.ADD_INSURER_DETAILS], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
  
    deleteData(rowData: any) {
      this.displayDialog = true;
      this.deleteId = rowData.id;
    }
    submit() {
      this.commonComponent.startSpinner();
      this.insurerDetailsService.deleteInsurerDetails(this.deleteId).subscribe(response => {
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
