import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SavingsBankConfigConstants } from '../sb-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { ProductTypeService } from './shared/product-type.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent {
  productType: any;
  destinationAccountType:any;
  gridListstatusList: any[] = [];
  msgs: any[] = [];
  responseModel!: Responsemodel;
  gridList: any[] = [];
  id :  any;
  displayDialog: boolean = false;
  deleteId:any;
  @ViewChild('dt', { static: false })
  datatable!: Table;
  constructor(private router:Router  ,private productTypeService : ProductTypeService , private commonComponent : CommonComponent  ,private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService){
    this.productType = [
      { field: 'name', header: 'DEMANDDEPOSITS.NAME'},
      { field: 'description', header: 'DEMANDDEPOSITS.DESCRIPTION' },
      { field: 'statusName', header: 'DEMANDDEPOSITS.STATUS' },
    ];

  }
  ngOnInit(): void {
    this.getAll();
  }
  navigateToAdd(){
    this.router.navigate([SavingsBankConfigConstants.ADD_PRODUCT_TYPE]);
  }


  getAll() {
    this.commonComponent.startSpinner();
    this.productTypeService.getAllProductTypes().subscribe((data: any) => {
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
    this.router.navigate([SavingsBankConfigConstants.ADD_PRODUCT_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } })
  }

  delete(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  submit() {
    // this.commonComponent.startSpinner();
    this.productTypeService.deleteProductTypes(this.deleteId).subscribe(response => {
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
