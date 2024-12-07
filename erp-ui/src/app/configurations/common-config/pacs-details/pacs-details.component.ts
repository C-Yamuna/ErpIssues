import { Component } from '@angular/core';
import { PacsDetails } from './shared/pacs-details.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { PacsDetailsService } from './shared/pacs-details.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonConfigConstants } from '../common-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-pacs-details',
  templateUrl: './pacs-details.component.html',
  styleUrls: ['./pacs-details.component.css']
})
export class PacsDetailsComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  pacsDetailsModel: PacsDetails = new PacsDetails();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  orgnizationSetting: any;
  deleteId:any;
  constructor(private router: Router, private pacsDetailsService: PacsDetailsService,
    private encryptDecryptService: EncryptDecryptService, private datePipe:DatePipe,
    private commonComponent: CommonComponent,
  ) {
    this.columns = [
      { field: 'name', header: 'ERP.NAME' },
      { field: 'pacsCode', header: 'ERP.PACS_CODE' },
      { field: 'regName', header: 'ERP.REGISTERED_NAME' },
      { field: 'stateName', header: 'ERP.STATES' },
      { field: 'districtName', header: 'ERP.DISTRICTS' },
      { field: 'subDistrictName', header: 'ERP.SUB_DISTRICTS' },
      { field: 'villageName', header: 'ERP.VILLAGES' },
      { field: 'statusName', header: 'ERP.STATUS' },
    ];
  }
    ngOnInit(): void {
      this.orgnizationSetting = this.commonComponent.orgnizationSettings()
      this.getAll();
    }
    addpacsdetails() {
      this.router.navigate([CommonConfigConstants.ADD_SOCIETY]);
    }
    getAll() {
      this.pacsDetailsService.getAllPacsDetails().subscribe((data: any) => {
        this.responseModel = data;
        this.gridListData = this.responseModel.data.map((obj: { regDate: string | number | Date | null;  }) => {
          obj.regDate=this.datePipe.transform(obj.regDate, this.orgnizationSetting.datePipe);
        
          return obj;
        })
        this.commonComponent.stopSpinner();
      });
    }
  
    editpacsdetails(rowData: any) {
      this.router.navigate([CommonConfigConstants.ADD_SOCIETY], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
  
    deleteData(rowData: any) {
      this.displayDialog = true;
      this.deleteId = rowData.id;
    }
    
    submit() {
      this.commonComponent.startSpinner();
      this.pacsDetailsService.deletePacsDetails(this.deleteId).subscribe(response => {
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
