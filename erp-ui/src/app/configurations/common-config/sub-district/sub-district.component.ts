import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConfigConstants } from '../common-config-constants';
import { Subdistrict } from './shared/subdistrict.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SubDistrictService } from './shared/sub-district.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-sub-district',
  templateUrl: './sub-district.component.html',
  styleUrls: ['./sub-district.component.css']
})
export class SubDistrictComponent implements OnInit {
  columns: any []=[];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  getAllUrl: any;
  subdistrictModel: Subdistrict = new Subdistrict();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId:any;
  constructor(private router:Router, private subdistrictService : SubDistrictService,
    private encryptDecryptService: EncryptDecryptService, private commonComponent:CommonComponent,
  ){
   

  }
 
  ngOnInit(): void {
    this.columns = [
      { field: 'stateName', header: 'ERP.STATES' },
      { field: 'districtName', header: 'ERP.DISTRICTS' },
      { field: 'name', header: 'ERP.NAME'},
      { field: 'code', header: 'ERP.CODE' },
      { field: 'shortCode', header: 'ERP.SHORT' },
      { field: 'govtCode', header: 'ERP.GOI' },
      { field: 'statusName', header: 'ERP.STATUS' },
    ];
this.getAll();
  }
  addsubdistrict(){
    this.router.navigate([CommonConfigConstants.ADD_SUB_DISTRICT]);   
  }
  editsubDistrict(rowData:any){
    this.router.navigate([CommonConfigConstants.ADD_SUB_DISTRICT],{ queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }
  getAll(){
    this.subdistrictService.getAllSubDistrict().subscribe((data: any) => {
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
    this.subdistrictService.deleteSubDistrict(this.deleteId).subscribe(response => {
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
