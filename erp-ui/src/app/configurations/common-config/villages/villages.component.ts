import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConfigConstants } from '../common-config-constants';
import { Village } from './shared/village.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { VillagesService } from './shared/villages.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-villages',
  templateUrl: './villages.component.html',
  styleUrls: ['./villages.component.css']
})
export class VillagesComponent implements OnInit {

  columns: any []=[];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  getAllUrl: any;
  villagesModel: Village = new Village();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId:any;
  constructor(private router:Router, private villageService : VillagesService,
    private encryptDecryptService: EncryptDecryptService,  private commonComponent:CommonComponent,
  ){
    this.columns = [
      { field: 'stateName', header: 'ERP.STATES' },
      { field: 'districtName', header: 'ERP.DISTRICTS' },
      { field: 'subDistrictName', header: 'ERP.MANDAL' },
      { field: 'name', header: 'ERP.NAME'},
      // { field: 'description', header: 'ERP.DESCRIPTION' },
      { field: 'goiCode', header: 'ERP.GOI' },
     { field: 'gen village', header: 'ERP.GEN_VILLAGE' },
      { field: 'statusName', header: 'ERP.STATUS' },
    ];
  }
  
  ngOnInit(): void {
    this.getAll();
  }

  addvillage(){
    this.router.navigate([CommonConfigConstants.ADD_VILLAGES]);  
   }
  
  editvillage(rowData:any){
    this.router.navigate([CommonConfigConstants.ADD_VILLAGES],{ queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }
  getAll(){
    this.villageService.getAllVillages().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }
  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  
  submit() {
    this.commonComponent.startSpinner();
    this.villageService.deleteVillage(this.deleteId).subscribe(response => {
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
