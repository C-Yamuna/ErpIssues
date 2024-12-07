import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonCategory, CommonStatusModel } from '../shared/common-category.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonCategoryService } from '../shared/common-category.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { DailyDepositConfigConstants } from '../../daily-deposit-config-constants';

@Component({
  selector: 'app-add-common-category',
  templateUrl: './add-common-category.component.html',
  styleUrls: ['./add-common-category.component.css']
})
export class AddCommonCategoryComponent {
  commomCategoryForm: FormGroup;
  commomStatus: any[] = [];
  categoriesStatusForm: FormGroup;
  statusList: any;
  columns: any[] = [];
  responseModel!: Responsemodel;
  gridList: any[] = [];
  categoriesList: any[] = [];
  msgs: any[] = [];
  isEdit: boolean = true;
  disabledButton: boolean = true;
  addButton: boolean = true;
  disable: boolean = true;
  buttonSaveDisabled: boolean = true;
  buttonDisabled: boolean = true;
  disabledStatusButton: boolean = true;
  newRow: any;
  categoryList: any[] = [];
  commonStatusDTOList: any[] = [];
  itemId: any;
  rowId: any;
  displayAddDialog: boolean = false;
  id: any;
  commonCategoryModel: CommonCategory = new CommonCategory();
  commonStatusModel: CommonStatusModel = new CommonStatusModel();
  @ViewChild('cv', { static: false })
  private cv!: Table;
  commonStatusDTODataList: any[] = [];
  categoryInfoList: any[] = [];
  orgnizationSetting: any;
  isEditCommonStatus: any;
  commonstatuslist: any[] = [];
  cmnStatusList: any = [];
  addButtonDisabled: boolean = false;
  btnEditDeleteDisable: boolean = false;
  backButtonDisables: boolean = false;
  submitButtonDisabled: boolean = false;
  inlineEditButtonDisabled: boolean = false;
  displayDialog: boolean = false;
  deleteId: any;
  constructor(private commonComponent: CommonComponent,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute, private encryptService: EncryptDecryptService,
    private activateRoute: ActivatedRoute,
    private commonCategoryService: CommonCategoryService) {

    this.commomCategoryForm = this.formBuilder.group({
      'name':new FormControl('', [Validators.required, Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS)]),
      'description': new FormControl('',),
      'status': new FormControl('', [Validators.required]),
    });
    this.categoriesStatusForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required, Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS)]),
      'description': new FormControl('',),
      'status': new FormControl('', [Validators.required]),
    });
    this.statusList = this.commonComponent.status();

  }

  ngOnInit(): void {
    this.commomStatus = [
      { field: 'name', header: 'DAILYDEPOSITSCONFIG.NAME' },
      { field: 'description', header: 'DAILYDEPOSITSCONFIG.DESCRIPTION' },
      { field: 'statusName', header: 'DAILYDEPOSITSCONFIG.STATUS' },
    ];
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
    this.statusList = this.commonComponent.status();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.isEdit = applicationConstants.TRUE;
        this.id = this.encryptService.decrypt(params['id']);
        this.getCommonStatusByCategory(this.id);
      } else {
        if (this.statusList != null && this.statusList.length > 0) {
          this.commonCategoryModel.status = this.statusList[0].value;
        }
        this.isEdit = applicationConstants.FALSE;
        this.addButtonDisabled = true;
      }
    });
  }
  addOrUpdate() {
    //this.commonComponent.startSpinner();
    this.addButtonDisabled = false;
    this.btnEditDeleteDisable = false;
    this.inlineEditButtonDisabled = false
    this.submitButtonDisabled = false;
    this.backButtonDisables = false;
    if (this.commonCategoryModel.id != null && this.commonCategoryModel.id != undefined) {
      this.commonCategoryService.updateCommonCategory(this.commonCategoryModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.id = this.responseModel.data[0].id;
            this.commonCategoryModel = this.responseModel.data[0];
            if(this.commonCategoryModel.status != applicationConstants.ACTIVE){
              this.btnEditDeleteDisable = true;
              this.addButtonDisabled = true;
            }
          }
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            // this.navigateback();
          }, 1000);
        } else {
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1000);
          this.getCommonStatusByCategory(this.id);
        }
      },
        error => {
          //this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1000);
          
        });
    } else {
      this.commonCategoryService.addCommonCategory(this.commonCategoryModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.id = this.responseModel.data[0].id;
            this.commonCategoryModel = this.responseModel.data[0];
            if(this.commonCategoryModel.status != null && this.commonCategoryModel.status != undefined && this.commonCategoryModel.status != applicationConstants.ACTIVE){
              this.btnEditDeleteDisable = true;
              this.addButtonDisabled = true;
            }
          }
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];

            // this.navigateback();
          }, 1000);
        } else {
          //this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1000);
          // this.getCommonStatusByCategory(this.id);
        }
      },
        error => {
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1000);
        });
    }
  }
  // button disables added
  getCommonStatusByCategory(id: any) {
    this.commonComponent.startSpinner();
    this.commonCategoryService.getCommonCategoryById(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
          this.commonCategoryModel = this.responseModel.data[0];
          if(this.commonCategoryModel.status != applicationConstants.ACTIVE){
            this.btnEditDeleteDisable = true;
            this.addButtonDisabled = true;
          }
          // else{
          //   this.btnEditDeleteDisable = false;
          //   this.addButtonDisabled = false;
          // }
          
          if (this.commonCategoryModel.commonStatusDTOList != null && this.commonCategoryModel.commonStatusDTOList != undefined&&this.commonCategoryModel.commonStatusDTOList.length > 0) {
            this.commonStatusDTODataList = this.commonCategoryModel.commonStatusDTOList.filter((commonstatus: any) => commonstatus.id != null && commonstatus.name != null).map((commonstatus: { name: any; id: any; }) => {
              return commonstatus;
            });
           
            this.commonstatuslist = this.commonStatusDTODataList;
            this.categoryInfoList = this.commonStatusDTODataList;
            
          }
        }
      }
    },
    error => {
      //this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 1000);
    });
  }

  //save common status List 
  saveCategoriesStatus(rowData: any) {
    //this.commonComponent.startSpinner();
    rowData.categoryId = this.id;
    this.addButtonDisabled = false;
    this.btnEditDeleteDisable = false;
    this.submitButtonDisabled = false;
    this.backButtonDisables = false;
    if (rowData.id != null && rowData.id != undefined) {
      this.commonCategoryService.updateCommonStatus(rowData).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          
          //this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.getCommonStatusByCategory(this.id);
          }, 1000);
        } else {
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1000);
        }
      },
        error => {
          //this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.addButtonDisabled = true;
            this.btnEditDeleteDisable = true;
            this.submitButtonDisabled = true;
            this.backButtonDisables = true;
          }, 1000);
        });
    } else {
      this.commonCategoryService.addCommonStatus(rowData).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.addButtonDisabled = false;
          this.btnEditDeleteDisable = false;
          this.submitButtonDisabled = false;
          this.backButtonDisables = false;
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.getCommonStatusByCategory(this.id);
          }, 1000);
        } else {
          //this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.getCommonStatusByCategory(this.id);
          }, 1000);
        }
      },
        error => {
          // this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.msgs = [];
            this.addButtonDisabled = true;
            this.btnEditDeleteDisable = true;
            this.submitButtonDisabled = true;
            this.backButtonDisables = true;
          }, 1000);
        });
    }
  }


  getAllCommonStatusByCategory(id: any) {
    this.commonStatusDTOList = [];
    this.commonCategoryService.getCommonStatusByCategoryId(id).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        if (this.responseModel.data != null && this.responseModel.data != undefined)
          this.commonStatusDTOList = this.responseModel.data;
      }
      else {
        this.msgs.push({ severity: 'error', detail: this.responseModel.statusMsg });
      }
    },
      error => {
        this.msgs.push({ severity: 'error', detail: applicationConstants.SERVER_DOWN_ERROR });
      });
  }




  //button disables added
  isAddButtonDiabled() {
    this.commonStatusModel.categoryId = this.id
    this.submitButtonDisabled = true;
    this.backButtonDisables = true;
    this.addButtonDisabled = true;
    this.btnEditDeleteDisable = true;
    this.cv._first = 0;
    this.cv.value.unshift({ categoryId: '' });
    this.cv.initRowEdit(this.cv.value[0]);
    this.getAllCommonStatusByCategory(this.id);
  }


  //navigation to back
  navigateback() {
    this.router.navigate([DailyDepositConfigConstants.COMMON_CATEGORY]);
  }


  //delete common status of category inlin delete

  submit() {
    this.commonCategoryService.deleteCommonStatus(this.deleteId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.displayDialog = false;
        this.getCommonStatusByCategory(this.id);
        this.addButtonDisabled = false;
        this.btnEditDeleteDisable = false;
        this.submitButtonDisabled = false;
        this.backButtonDisables = false;   
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.getCommonStatusByCategory(this.id);
        }, 1000);
      }
    }, error => {
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);

    });

  }
  delete(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  cancel() {
    this.displayDialog = false;
  }
  //edit common status of category inline category

  editCommonStatus(row: any) {
    this.commonStatusModel = row;
    this.commonStatusModel.categoryId = this.id;
    this.getCommonStatusByCategory(this.id);
    this.btnEditDeleteDisable = true;
    this.btnEditDeleteDisable = true;
    this.addButtonDisabled = true;
    this.backButtonDisables = true;
    this.submitButtonDisabled = true;
  }
  //cancle common status of category in line cancle
  //@jyothi.naidana
  cancelCommonStatus() {
    this.btnEditDeleteDisable = false;
    this.btnEditDeleteDisable = false;
    this.addButtonDisabled = false;
    this.backButtonDisables = false;
    this.submitButtonDisabled = false;
    this.getCommonStatusByCategory(this.id);
  }
}
