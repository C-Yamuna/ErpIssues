import { Component, ViewChild } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { LockerConfigConstants } from '../../locker-config-constants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonCategoryService } from '../shared/common-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { Table } from 'primeng/table';
import { CommonCategory, CommonStatusModel } from '../shared/common-category.model';
import { Responsemodel } from 'src/app/shared/responsemodel';

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
  displayAddDialog: boolean = applicationConstants.FALSE;
  id: any;
  commonCategoryModel: CommonCategory = new CommonCategory();
  commonStatusModel: CommonStatusModel = new CommonStatusModel();
  @ViewChild('cv', { static:  applicationConstants.FALSE })
  private cv!: Table;
  commonStatusDTODataList: any[] = [];
  categoryInfoList: any[] = [];
  orgnizationSetting: any;
  isEditCommonStatus: any;
  commonstatuslist: any[] = [];
  cmnStatusList: any = [];
  addButtonDisabled: boolean =  applicationConstants.FALSE;
  btnEditDeleteDisable: boolean =  applicationConstants.FALSE;
  backButtonDisables: boolean =  applicationConstants.FALSE;
  submitButtonDisabled: boolean =  applicationConstants.FALSE;
  inlineEditButtonDisabled: boolean =  applicationConstants.FALSE;
  displayDialog: boolean =  applicationConstants.FALSE;
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
      { field: 'name', header: 'LOCKERCONFIG.NAME' },
      { field: 'description', header: 'LOCKERCONFIG.DESCRIPTION' },
      { field: 'statusName', header: 'LOCKERCONFIG.STATUS' },
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
        this.addButtonDisabled = applicationConstants.TRUE;
      }
    });
  }
  addOrUpdate() {
    //this.commonComponent.startSpinner();
    this.addButtonDisabled = applicationConstants.FALSE;;
    this.btnEditDeleteDisable = applicationConstants.FALSE;;
    this.inlineEditButtonDisabled = applicationConstants.FALSE;
    this.submitButtonDisabled = applicationConstants.FALSE;;
    this.backButtonDisables = applicationConstants.FALSE;;
    if (this.commonCategoryModel.id != null && this.commonCategoryModel.id != undefined) {
      this.commonCategoryService.updateCommonCategory(this.commonCategoryModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data[0] != null && this.responseModel.data[0] != undefined) {
            this.commonCategoryModel = this.responseModel.data[0];
            if(this.commonCategoryModel.id != null && this.commonCategoryModel.id != undefined)
              this.id = this.commonCategoryModel.id;
            if(this.commonCategoryModel.status != applicationConstants.ACTIVE){
              this.btnEditDeleteDisable =applicationConstants.TRUE;
              this.addButtonDisabled = applicationConstants.TRUE;
            }
        }
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
            this.commonCategoryModel = this.responseModel.data[0];
            if(this.commonCategoryModel.id != null && this.commonCategoryModel.id != undefined)
              this.id = this.commonCategoryModel.id;
            if(this.commonCategoryModel.status != null && this.commonCategoryModel.status != undefined && this.commonCategoryModel.status != applicationConstants.ACTIVE){
              this.btnEditDeleteDisable = applicationConstants.TRUE;
              this.addButtonDisabled = applicationConstants.TRUE;
            }
          }
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];

            // this.navigateback();
          }, 1000);
        } else {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 1000);
          // this.getCommonStatusByCategory(this.id);
        }
      },
        error => {
          this.commonComponent.stopSpinner();
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
            this.btnEditDeleteDisable = applicationConstants.TRUE;
            this.addButtonDisabled = applicationConstants.TRUE;
          }
          
          if (this.commonCategoryModel.commonStatusDTOList != null && this.commonCategoryModel.commonStatusDTOList != undefined&&this.commonCategoryModel.commonStatusDTOList.length > 0) {
            this.commonStatusDTODataList = this.commonCategoryModel.commonStatusDTOList.filter((commonstatus: any) => commonstatus.id != null && commonstatus.name != null).map((commonstatus: { name: any; id: any; }) => {
              return commonstatus;
            });
           
            this.commonstatuslist = this.commonStatusDTODataList.map(x => Object.assign({}, x));
            this.categoryInfoList = this.commonStatusDTODataList.map(x => Object.assign({}, x));
            
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
    this.addButtonDisabled =  applicationConstants.FALSE;
    this.btnEditDeleteDisable =  applicationConstants.FALSE;
    this.submitButtonDisabled =  applicationConstants.FALSE;
    this.backButtonDisables =  applicationConstants.FALSE;
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
            this.addButtonDisabled = applicationConstants.TRUE;
            this.btnEditDeleteDisable = applicationConstants.TRUE;
            this.submitButtonDisabled = applicationConstants.TRUE;
            this.backButtonDisables = applicationConstants.TRUE;
          }, 1000);
        });
    } else {
      this.commonCategoryService.addCommonStatus(rowData).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.addButtonDisabled =  applicationConstants.FALSE;
          this.btnEditDeleteDisable =  applicationConstants.FALSE;
          this.submitButtonDisabled =  applicationConstants.FALSE;
          this.backButtonDisables =  applicationConstants.FALSE;
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
            this.addButtonDisabled = applicationConstants.TRUE;
            this.btnEditDeleteDisable = applicationConstants.TRUE;
            this.submitButtonDisabled = applicationConstants.TRUE;
            this.backButtonDisables = applicationConstants.TRUE;
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
    this.submitButtonDisabled = applicationConstants.TRUE;
    this.backButtonDisables = applicationConstants.TRUE;
    this.addButtonDisabled = applicationConstants.TRUE;
    this.btnEditDeleteDisable = applicationConstants.TRUE;
    this.cv._first = 0;
    this.cv.value.unshift({ categoryId: '' });
    this.cv.initRowEdit(this.cv.value[0]);
    this.getAllCommonStatusByCategory(this.id);
  }


  //navigation to back
  navigateback() {
    this.router.navigate([LockerConfigConstants.COMMON_CATEGORY]);
  }


  //delete common status of category inlin delete

  submit() {
    this.commonCategoryService.deleteCommonStatus(this.deleteId).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.displayDialog =  applicationConstants.FALSE;
        this.getCommonStatusByCategory(this.id);
        this.addButtonDisabled =  applicationConstants.FALSE;
        this.btnEditDeleteDisable =  applicationConstants.FALSE;
        this.submitButtonDisabled =  applicationConstants.FALSE;
        this.backButtonDisables =  applicationConstants.FALSE;   
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
    this.displayDialog = applicationConstants.TRUE;
    this.deleteId = rowData.id;
  }
  cancel() {
    this.displayDialog =  applicationConstants.FALSE;
  }
  //edit common status of category inline category

  editCommonStatus(row: any) {
    this.commonStatusModel = row;
    this.commonStatusModel.categoryId = this.id;
    this.getCommonStatusByCategory(this.id);
    this.btnEditDeleteDisable = applicationConstants.TRUE;
    this.btnEditDeleteDisable = applicationConstants.TRUE;
    this.addButtonDisabled = applicationConstants.TRUE;
    this.backButtonDisables = applicationConstants.TRUE;
    this.submitButtonDisabled = applicationConstants.TRUE;
  }
  //cancle common status of category in line cancle

  cancelCommonStatus() {
    this.btnEditDeleteDisable =  applicationConstants.FALSE;
    this.btnEditDeleteDisable =  applicationConstants.FALSE;
    this.addButtonDisabled =  applicationConstants.FALSE;
    this.backButtonDisables =  applicationConstants.FALSE;
    this.submitButtonDisabled =  applicationConstants.FALSE;
    this.getCommonStatusByCategory(this.id);
  }
}
