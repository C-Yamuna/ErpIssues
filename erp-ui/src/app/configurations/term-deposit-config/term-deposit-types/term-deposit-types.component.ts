import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { TermDepositTypes } from './shared/term-deposit-types.model';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { TermDepositTypesService } from './shared/term-deposit-types.service';
import { TERMDEPOSITCONFIGCONSTANTS } from '../term-deposit-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-term-deposit-types',
  templateUrl: './term-deposit-types.component.html',
  styleUrls: ['./term-deposit-types.component.css']
})
export class TermDepositTypesComponent {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[] = [];
  displayDialog: boolean = false;
  TermDepositTypesModel: TermDepositTypes  = new TermDepositTypes ();
  deleteId:any;
  constructor(private router: Router,
    private termDepositTypesService: TermDepositTypesService,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent) { }

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'TERMDEPOSITS.NAME' },
      { field: 'templatepath', header: 'TERMDEPOSITS.PATH' },
      { field: 'description', header: 'TERMDEPOSITS.DESCRIPTION' },
      { field: 'statusName', header: 'TERMDEPOSITS.STATUS' },
    ];
    this.getAll();
  }

  getAll() {
    this.termDepositTypesService.getAllTermDepositTypes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
        this.gridListData = this.gridListData.map(membership => {
          return membership
        });
      }
      //  this.commonComponent.stopSpinner();
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      // this.commonComponent.stopSpinner();
    });
      
  }

  addData() {
    this.router.navigate([TERMDEPOSITCONFIGCONSTANTS.ADD_FORM_TYPE]);
  }

  editData(rowData: any) {
    this.router.navigate([TERMDEPOSITCONFIGCONSTANTS.ADD_FORM_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  submit() {
    // this.commonComponent.startSpinner();
    this.termDepositTypesService.deleteTermDepositTypes(this.deleteId).subscribe(response => {
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
