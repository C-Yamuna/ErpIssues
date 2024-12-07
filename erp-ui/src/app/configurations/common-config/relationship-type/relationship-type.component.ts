import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConfigConstants } from '../common-config-constants';
import { Relationshiptype } from './shared/relationshiptype.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { RelationshipTypeService } from './shared/relationship-type.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-relationship-type',
  templateUrl: './relationship-type.component.html',
  styleUrls: ['./relationship-type.component.css']
})
export class RelationshipTypeComponent implements OnInit{
  products:[]=[];
  columns: any []=[];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  relationshiptypeModel: Relationshiptype = new Relationshiptype();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId:any;
  constructor(private router: Router, private relationshiptypeService: RelationshipTypeService,
    private encryptDecryptService: EncryptDecryptService,private commonComponent: CommonComponent,
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
  addRelationshipType(){
    this.router.navigate([CommonConfigConstants.ADD_RELATION_TYPE]); 
  }
  editRelationshipType(rowData: any) {
    this.router.navigate([CommonConfigConstants.ADD_RELATION_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }
  getAll() {
    this.relationshiptypeService.getAllRelationshipType().subscribe((data: any) => {
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
    this.relationshiptypeService.deleteRelationshipType(this.deleteId).subscribe(response => {
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
