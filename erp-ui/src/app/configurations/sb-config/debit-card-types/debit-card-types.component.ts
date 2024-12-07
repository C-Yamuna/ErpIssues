import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SavingsBankConfigConstants } from '../sb-config-constants';
import { DebitCardTypesService } from './shared/debit-card-types.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DebitCardsTypes } from './shared/debit-cards-types';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-debit-card-types',
  templateUrl: './debit-card-types.component.html',
  styleUrls: ['./debit-card-types.component.css']
})
export class DebitCardTypesComponent implements OnInit{
  debitCardType:any;
  debitCardTypes:any;
  statusList: any[] = [];
  msgs: any[] = [];
  debitCardsTypes: DebitCardsTypes = new DebitCardsTypes();
  responseModel!: Responsemodel;
  gridList: any[] = [];
  id : any;
  displayDialog: boolean = false;
  deleteId:any;
  constructor(private router:Router , private debitCardTypesService :DebitCardTypesService ,private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent,
  ) {
    this.debitCardType = [
      { field: 'name', header: 'NAME'},
      { field: 'description', header: 'DESCRIPTION' },
      { field: 'statusName', header: 'STATUS' },
    ];

  }
  ngOnInit(): void {
    this.getAll();
  }
  navigateToAdd(){
    this.router.navigate([SavingsBankConfigConstants.ADD_DEBIT_CARD_TYPE]);
  }

  getAll() {
    this.commonComponent.startSpinner();
    this.debitCardTypesService.getAllDebitCardTypes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridList = this.responseModel.data;
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
  navigateToEdit(rowData:any){
    this.router.navigate([SavingsBankConfigConstants.ADD_DEBIT_CARD_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } })
  }
  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  
  submit() {
    this.commonComponent.startSpinner();
    this.debitCardTypesService.deleteDebitCardTypes(this.deleteId).subscribe(response => {
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
