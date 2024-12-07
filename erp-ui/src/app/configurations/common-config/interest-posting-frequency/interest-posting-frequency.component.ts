import { Component } from '@angular/core';
import { Interestpostingfrequency } from './shared/interestpostingfrequency.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { InterestPostingDetailsService } from 'src/app/transcations/savings-bank-transcation/shared/interest-posting-details.service';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonConfigConstants } from '../common-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { InterestPostingFrequencyService } from './shared/interest-posting-frequency.service';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-interest-posting-frequency',
  templateUrl: './interest-posting-frequency.component.html',
  styleUrls: ['./interest-posting-frequency.component.css']
})
export class InterestPostingFrequencyComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  getAllUrl: any;
  interestpostingfrequencyModel: Interestpostingfrequency = new Interestpostingfrequency();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId:any;
  constructor(private router: Router, private interestpostingfrequencyService: InterestPostingFrequencyService,
    private encryptDecryptService: EncryptDecryptService, private commonComponent: CommonComponent,
  ) {
    this.columns = [
      { field: 'name', header: 'ERP.NAME' },
      { field: 'description', header: 'ERP.DESCRIPTION' },
      { field: 'statusName', header: 'ERP.STATUS' },
    ];

  }
  ngOnInit(): void {
    this.getAll();
  }
  addinterestpostingfrequency() {
    this.router.navigate([CommonConfigConstants.ADD_INTEREST_POSTING_FREQUENCY]);
  }
  getAll() {
    this.interestpostingfrequencyService.getAllInterestPostingFrequency().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }

  editinterestpostingfrequency(rowData: any) {
    this.router.navigate([CommonConfigConstants.ADD_INTEREST_POSTING_FREQUENCY], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  
  submit() {
    this.commonComponent.startSpinner();
    this.interestpostingfrequencyService.deleteInterestPostingFrequency(this.deleteId).subscribe(response => {
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
