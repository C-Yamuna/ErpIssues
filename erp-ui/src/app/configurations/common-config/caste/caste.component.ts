import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Caste } from './shared/caste.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CasteService } from './shared/caste.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonConfigConstants } from '../common-config-constants';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-caste',
  templateUrl: './caste.component.html',
  styleUrls: ['./caste.component.css']
})
export class CasteComponent implements OnInit {
  columns: any[] = [];
  responseModel !: Responsemodel;
  gridListData: any[] = [];
  msgs: any[] = [];
  casteModel: Caste = new Caste();
  displayDialog: boolean = false;
  subColumns: any[] = [];
  casteGridListData:any;
  tempCasteGridListData:any;
  deleteId: any;

  constructor(private router: Router,
    private commonComponent: CommonComponent,
    private casteService: CasteService,
    private encryptDecryptService: EncryptDecryptService,) { }

    ngOnInit() {
      this.columns = [
        { field: 'name', header: 'ERP.NAME' },
        { field: 'isParent', header: 'ERP.IS_PARENT' },
        { field: 'discription', header: 'ERP.DESCRIPTION' },
        { field: 'statusName', header: 'ERP.STATUS' }
      ];
      this.subColumns = [
        { field: 'name', header: 'ERP.NAME' },
        { field: 'discription', header: 'ERP.DESCRIPTION' },
        { field: 'statusName', header: 'ERP.STATUS' },
      ];
      this.getAll();
    }
    getAll() {
      this.commonComponent.startSpinner();
      this.casteService.getAllCaste().subscribe((data: any) => {
        this.responseModel = data;
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          this.gridListData = this.responseModel.data;
          this.casteGridListData = this.gridListData.filter((castetype: any) => castetype.isParent);
          this.tempCasteGridListData =  this.casteGridListData.filter((data :any) => data != null ).map((count:any) => {
            count.tempCasteGridListData = this.gridListData.filter(objTwo => null != objTwo && objTwo.parentId == count.id);
            return count;
          })
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
  
    addData() {
      this.router.navigate([CommonConfigConstants.ADD_CASTE]);
    }
  
    editData(rowData: any) {
      this.router.navigate([CommonConfigConstants.ADD_CASTE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
    }
  
    deleteCasteType(rowData: any) {
      this.displayDialog = true;
     this.deleteId = rowData.id;
    }
    delete(){
      this.commonComponent.startSpinner();
      this.casteService.deleteCaste(this.deleteId).subscribe(response => {
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
